const { comparepassword } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");
const { User } = require("../models");

class UserController {
    static async register(req, res, next) {
        try {
            const data = await User.create(req.body);
            res.status(201).json({ id: data.id, username: data.username, email: data.email });
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            let { email, username, password } = req.body
            let user

            if(email) {
                user = await User.findOne({
                    where: {
                        email
                    }
                })
            }
            if(username) {
                user = await User.findOne({
                    where: {
                        username
                    }
                })
            }

            if (!user) throw { name: "ErrorInvalidUsernameOrEmailOrPassword" }
            let comparationPassword = comparepassword(password, user.password)
            if(!user || !comparationPassword) throw { name: "ErrorInvalidUsernameOrEmailOrPassword" }
            let token = createToken({
                id: user.id
            })
            res.status(200).json({
                message: "Login Success!",
                access_token: token
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController