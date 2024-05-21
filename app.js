if(process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

const port = 3000;
const cors = require("cors")

// app.use(async (req, res, next) => {
//     await new Promise((res) => {
//         setTimeout(res, 1500)
//     })
//     next()
// })

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

module.exports = app