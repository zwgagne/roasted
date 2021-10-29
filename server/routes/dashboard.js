const router = require("express").Router();
const pgClient = require("../db");
const authorization = require("../middleware/authorization");




router.get("/", authorization, async (req, res) => {
  try {

    const user = await pgClient.query("SELECT user_name FROM users WHERE user_id = $1", [req.user]);

    res.json(user.rows[0])

  } catch (err) {
    console.error(err.message)
    res.status(500).json("Server error");
  }
})

router.get("/edit", authorization, async (req, res) => {
  try {

    const user = await pgClient.query("SELECT user_name, user_email FROM users WHERE user_id = $1", [req.user]);

    res.json(user.rows[0])

  } catch (err) {
    console.error(err.message)
    res.status(500).json("Server error");
  }
})

module.exports = router;
