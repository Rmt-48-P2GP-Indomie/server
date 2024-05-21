const { Op } = require("sequelize");
const { Profile, User } = require("../models");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

class ProfileController {
    static async getAllListProfiles(req, res, next) {
        try {
            let { fullname } = req.query;
            let queryOption = {
              where: {},
              include: [
                { model: User, as: "User", attributes: { exclude: ["password", "phoneNumber", "address"] } },
              ],
            };
      
            if (fullname) {
              queryOption.where.fullname = { [Op.iLike]: `%${fullname}%` };
            }
            
            const getAllProfiles = await Profile.findAll(queryOption);
            res.status(200).json(getAllProfiles);
          } catch (error) {
            console.log(error);
            next(error);
          }
    }

    static async createProfile(req, res, next) {
        try {
            const { fullname, bio } = req.body;

            if (!req.file) {
              throw {
                name: "CustomError",
                status: 400,
                message: "Image is required!",
              };
            }
      
            const findUser = await Profile.findOne({
              where: { UserId: req.user.id },
            });
            if (findUser) {
              throw {
                name: "CustomError",
                status: 403,
                message: "Profile has already been created!",
              };
            }
      
            // let randomName =
            //   Math.random().toString(36).substring(2, 15) +
            //   Math.random().toString(36).substring(2, 15);
      
            // const mimeType = req.file.mimetype;
            // const data = Buffer.from(req.file.buffer).toString("base64");
            // const dataURI = `data:${mimeType};base64,${data}`;
            // const result = await cloudinary.uploader.upload(dataURI, {

            //   public_id: randomName,
            // });

            const base64String = req.file.buffer.toString("base64")
            const dataUrl = `data:${req.file.mimetype};base64,${base64String}`
            console.log(dataUrl)

            const result = await cloudinary.uploader.upload(dataUrl, {
                public_id: req.file.originalname,
                folder: "GP-Ngobrol"
            })
      
            await Profile.create({
              UserId: req.user.id,
              fullname,
              profileImageUrl: result.secure_url,
              bio,
            });
      
            res.status(201).json({ message: "Profile created!." });
          } catch (error) {
            console.log(error);
            next(error);
          }
    }

    static async getProfileByUsername(req, res, next) {
        try {
            const { username } = req.params;
            const findProfileByUsername = await User.findOne({
              where: { username: username },
              include: "Profile",
            });
            if (!findProfileByUsername) {
              throw {
                name: "CustomError",
                status: 404,
                message: "Profile not Found!",
              };
            }
      
            res.status(200).json(findProfileByUsername.Profile);
          } catch (error) {
            console.log(error);
            next(error);
          }
    }
}

module.exports = ProfileController;