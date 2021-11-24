const router = require("express").Router();
const meetController = require("../controllers/meetController");
const authorization = require("../middleware/authorization");

router.post("/send-meetup-request/:friendName", meetController.sendMeetupRequest)


module.exports = router;
