const router = require("express").Router();
const meetController = require("../controllers/meetController");
const authorization = require("../middleware/authorization");

router.post("/send-meetup-request/:friendName", authorization, meetController.sendMeetupRequest)
router.get("/get-meetup-info", authorization, meetController.getMeetupRequest)
router.get("/get-sent-meetup-info", authorization, meetController.getMeetupRequestSent)


module.exports = router;
