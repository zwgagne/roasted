const router = require("express").Router();
const meetController = require("../controllers/meetController");
const authorization = require("../middleware/authorization");

router.post("/send-meetup-request/:friendName", authorization, meetController.sendMeetupRequest)
router.get("/get-meetup", authorization, meetController.getMeetupsInfo)


module.exports = router;
