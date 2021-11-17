const router = require("express").Router();
const authorization = require("../middleware/authorization");
const friendsController = require("../controllers/friendsController");

router.post("/send-request", authorization, friendsController.sendFriendRequest)
router.get("/search-friend/:userName", friendsController.searchFriend)
router.post("/accept", authorization, friendsController.acceptFriendRequest)
router.post("/decline", authorization, friendsController.declineFriendRequest)
router.get("/get-all-friends", authorization, friendsController.getAllFriends)
router.get("/get-all-friends-posts", authorization, friendsController.getAllFriendsPosts)


module.exports = router;
