const router = require("express").Router();
const authorization = require("../middleware/authorization");
const postsController = require("../controllers/postsController");

router.post("/create", authorization, postsController.createPost);
router.get("/user-posts", authorization, postsController.getUserPosts);
router.get("/friends-posts", authorization, postsController.getFriendsPosts);

module.exports = router;
