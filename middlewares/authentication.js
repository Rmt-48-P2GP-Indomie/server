const { verifyToken } = require("../helper/jwt");
const { User } = require("../models")
const authentication = async (req, res, next) => {
    try {
        let access_token = req.headers.authorization
        if(!access_token) {
            throw { name: "Token is Invalid!" }
        }
        let [bearer, token] = access_token.split(" ")
        if(bearer !== "Bearer") {
            throw { name: "Token is Invalid!" }
        }
        let payload = verifyToken(token)
        let user = await User.findByPk(payload.id)
        if(!user) {
            throw { name: "Token is Invalid!" }
        }

        req.user = {
            id: user.id,
            role: user.role
        }
        next()
    } catch (error) {
        next(error)
    }
};

module.exports = authentication