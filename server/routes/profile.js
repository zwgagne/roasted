const router = require("express").Router();
const profileController = require("../controllers/profileController");
const authorization = require("../middleware/authorization");
const validation = require("../middleware/validation");


router.get("/", authorization, profileController.profile)
router.get("/edit", authorization, profileController.getEditProfilePage)
router.get("/public/:userName", authorization, profileController.getPublicProfile)
router.post("/edit", authorization, validation, profileController.saveChanges)




module.exports = router;
