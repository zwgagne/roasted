const router = require("express").Router();
const authorization = require("../middleware/authorization");
const postsController = require("../controllers/postsController");

router.post("/create", authorization, postsController.createPost);

module.exports = router;
