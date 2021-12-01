const pgClient = require("../db");

module.exports = {
  createPost: async (req, res) => {
    try {
      const { content } = req.body;
      if (content == "") {
        return res.status(500).json("Server error");
      }
      const author = req.user;
      await pgClient.query("INSERT INTO posts (post_content, post_author_id) VALUES ($1, $2) RETURNING *", [content, author]);
      res.status(200).json("Publication partagée");
     
      // add 10 points to the user who posted
      await pgClient.query("UPDATE users SET user_points = user_points + 10 WHERE user_id = $1", [author]);
      

    

    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }

  },

  getUserPosts: async (req, res) => {
    try {
      const post = await pgClient.query("SELECT post_content, post_author_id, created_at, post_id, user_name FROM users, posts WHERE post_author_id =$1 AND user_id = $1 ORDER BY created_at DESC", [req.user]);
      res.status(200).json(post);
    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }

  },

  getFriendsPosts: async (req, res) => {
    try {
      const post = await pgClient.query("SELECT post_content, post_author_id, created_at, post_id, user_name FROM users, posts WHERE post_author_id =$1 AND user_id = $1 ORDER BY created_at DESC", [req.user]);
      res.status(200).json(post);
    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }

  },
}