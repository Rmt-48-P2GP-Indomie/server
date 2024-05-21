const express = require("express");
const authentication = require("../middlewares/authentication");
const UserController = require("../controllers/userController");
const HomeController = require("../controllers/homeController");
const MessageController = require("../controllers/MessageController");
const router = express.Router();

router.post("/register", UserController.register)
router.post("/login", UserController.login)

router.get("/", HomeController.home);
router.use(authentication);
router.get("/user", UserController.currentlyLoggedUser);

router.use("/profile", require("./profile"));

router.get("/:username/message", MessageController.getDirectMessages);
router.post("/:username/message", MessageController.sendDirectMessage);


module.exports = router;