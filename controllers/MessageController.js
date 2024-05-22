const { Op } = require("sequelize");
const { ChatMessage, User, Profile } = require("../models");
const axios = require("axios");

class MessageController {
  static async getDirectMessages(req, res, next) {
    try {
      const { username } = req.params;

      if (!username) {
        throw { name: "CustomError", status: 404, message: "User not Found." };
      }

      const findReceivedUser = await User.findOne({
        where: { username: username },
      });
      if (!findReceivedUser) {
        throw { name: "CustomError", status: 404, message: "User not Found." };
      }

      let chatMessages = await ChatMessage.findAll({
        where: {
          [Op.or]: [
            { SenderId: req.user.id, ReceiverId: findReceivedUser.id },
            { SenderId: findReceivedUser.id, ReceiverId: req.user.id },
          ],
        },
        include: [
          {
            model: User,
            as: "Sender",
            attributes: ["username"],
            include: [
              {
                model: Profile,
                as: "Profile",
                attributes: ["profileImageUrl", "fullname"],
              },
            ],
          },
        ],
        order: [["createdAt", "ASC"]],
      });

      // handling duplicate data
      chatMessages = chatMessages.reduce((akumulator, item) => {
        if (
          !akumulator.some(
            (obj) =>
              obj.id === item.id &&
              obj.SenderId === item.SenderId &&
              obj.ReceiverId === item.ReceiverId
          )
        ) {
          akumulator.push(item);
        }
        return akumulator;
      }, []);

      // message belongs to
      let addBelongsTo = chatMessages.map((el) => {
        if (el.SenderId == req.user.id) {
          el.dataValues.messageBelongsToLoggedUser = true;
          return el;
        } else {
          el.dataValues.messageBelongsToLoggedUser = false;
          return el;
        }
      });

      res.status(200).json(addBelongsTo);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async sendDirectMessage(req, res,  next) {
    try {
      const { username } = req.params;
      let { text } = req.body;
      console.log(text)
      if (!text) {
        throw {
          name: "CustomError",
          status: 400,
          message: "Message is required.",
        };
      }
      const findReceivedUser = await User.findOne({
        where: { username: username },
      });
      if (!findReceivedUser) {
        throw { name: "CustomError", status: 404, message: "User not Found." };
      }

      const sendChatMessages = await ChatMessage.create({
        text,
        SenderId: req.user.id,
        ReceiverId: findReceivedUser.id,
      });

      res.status(201).json(sendChatMessages);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = MessageController;