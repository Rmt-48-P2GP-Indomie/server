const { hashSync, compareSync} = require("bcryptjs")

module.exports = {
    hashPassword: (password) => hashSync(password),
    comparepassword: (passwordSelected, passwordDb) => compareSync(passwordSelected, passwordDb)
}

