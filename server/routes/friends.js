const router = require("express").Router();
const authorization = require("../middleware/authorization");
const friendsController = require("../controllers/friendsController");

router.get("/send-request/:friendName", authorization, friendsController.sendFriendRequest)
router.get("/search-friend/:userName", friendsController.searchFriend)
router.get("/accept/:friendName", authorization, friendsController.acceptFriendRequest)
router.get("/decline/:friendName", authorization, friendsController.declineFriendRequest)
router.get("/get-all-friends", authorization, friendsController.getAllFriends)
router.get("/get-pending-friend-requests", authorization, friendsController.getPendingFriendRequests)
router.get("/get-all-friends-posts", authorization, friendsController.getAllFriendsPosts)


module.exports = router;
