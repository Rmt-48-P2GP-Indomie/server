const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/profileController")
const profileAuthorization = require("../middlewares/profileAuthorization")
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage
})

router.get("/", ProfileController.getAllListProfiles);
router.get("/:username", ProfileController.getProfileByUsername);
router.post("/", upload.single("file"), ProfileController.createProfile)



module.exports = router;
