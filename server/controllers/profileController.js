const pgClient = require("../db");

module.exports = {
  profile: async (req, res) => {
    try {

      const user = await pgClient.query("SELECT user_name FROM users WHERE user_id = $1", [req.user]);

      res.json(user.rows[0])

    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }
  },

  getEditProfilePage: async (req, res) => {
    try {

      const user = await pgClient.query("SELECT user_name, user_email FROM users WHERE user_id = $1", [req.user]);

      res.json(user.rows[0])

    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }
  },

  saveChanges: async (req, res) => {
    try {

      //1. Destructure the req.body
      const { name } = req.body;

      //2. Get the user's user_id
      const user = await pgClient.query("SELECT user_id FROM users WHERE user_id = $1", [req.user]);
      const userId = user.rows[0].user_id

      //4. Update user
      await pgClient.query("UPDATE users SET user_name = $1 WHERE user_id = $2", [name, userId])
      res.status(200).json("Vos modifications ont été enregistrées")

    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server error");
    }
  }
}



