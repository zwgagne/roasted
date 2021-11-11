const router = require("express").Router();
const authorization = require("../middleware/authorization");
const friendsController = require("../controllers/friendsController");

router.post("/send-request", authorization, friendsController.sendFriendRequest)
router.get("/search-friend", authorization, friendsController.searchFriend)
router.post("/accept", authorization, friendsController.acceptFriendRequest)
router.post("/decline", authorization, friendsController.declineFriendRequest)

module.exports = router;
