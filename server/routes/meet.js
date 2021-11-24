const router = require("express").Router();
const authorization = require("../middleware/authorization");
const meetController = require("../controllers/meetController");
 
module.exports = {
    createMeetup: async (req, res) => {
      try {
        const { content } = req.body;
        if (content == "") {
          return res.status(500).json("Server error");
        }
        const author = req.user;
        await pgClient.query("INSERT INTO posts (post_content, post_author_id) VALUES ($1, $2) RETURNING *", [content, author]);
        res.status(200).json("Meetup créé!");
  
  
  
      } catch (err) {
        console.error(err.message)
        res.status(500).json("Server error");
      }
  
    },

