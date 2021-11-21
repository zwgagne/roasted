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
  // get a user's profile
  getUserProfile: async (req, res) => {
    try {
      const user = await pgClient.query("SELECT user_name, user_email FROM users WHERE user_id = $1", [req.params.id]);
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

      //2. Get the user's user_id and user_name
      const user = await pgClient.query("SELECT user_id, user_name FROM users WHERE user_id = $1", [req.user]);
      const userId = user.rows[0].user_id
      const oldName = user.rows[0].user_name

      //3. Check if user_name already exists
      const names = await pgClient.query("SELECT * FROM users WHERE user_name = $1", [name]);
      if (names.rows.length !== 0) {
        //3.1. If name is unchanged, do nothing
        if (oldName === name) {
          return res.status(200).json()
          //3.2. If name exists, deny change
        } else {
          return res.status(401).json("Ce nom d'utilisateur n'est pas disponible")
        }
      }

      //4. Update user
      await pgClient.query("UPDATE users SET user_name = $1 WHERE user_id = $2", [name, userId])
      res.status(200).json("Vos modifications ont été enregistrées")

    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server error");
    }
  },

  getPublicProfile: async (req, res) => {
    try {
      const userName = req.params.userName;

      // aller chercher id du userName
      const user = await pgClient.query("SELECT user_name, user_id FROM users WHERE user_name = $1", [userName]);
      // aller chercher array friends de req.user
      const userInfo = await pgClient.query("SELECT user_friends FROM users WHERE user_id = $1", [req.user]);
      if (userInfo.rows[0].user_friends == null) {
        res.status(200).json({ infos: user.rows[0].user_name })
      } else {
        const isFriend = userInfo.rows[0].user_friends.includes(user.rows[0].user_id);
        res.status(200).json({ infos: user.rows[0].user_name, isFriend })
      }

    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server error");
    }
  }
}



