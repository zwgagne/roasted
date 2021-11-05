const pgClient = require("../db");

module.exports = {
  sendFriendRequest: async (req, res) => {
    try {

      const { friendRequest } = req.body;
      //1. Get user_name of asker
      const user = await pgClient.query("SELECT user_name FROM users WHERE user_id = $1", [req.user]);
      const userName = user.rows[0].user_name

      //2. Add the friendRequest to friends_pending of asked
      await pgClient.query("UPDATE users SET friends_pending = array_append(friends_pending, $1) WHERE user_name = $2", [userName, friendRequest])


      res.status(200).json("Demande envoyée")

    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }
  },

  acceptFriendRequest: async (req, res) => {
    try {
      const { acceptedFriend } = req.body;
      const user = await pgClient.query("SELECT user_name FROM users WHERE user_id = $1", [req.user]);
      const userName = user.rows[0].user_name

      await pgClient.query("UPDATE users SET friends_pending = array_remove(friends_pending, $1) WHERE user_name = $2", [acceptedFriend, userName])
      await pgClient.query("UPDATE users SET user_friends = array_append(user_friends, $1) WHERE user_name = $2", [acceptedFriend, userName])
      await pgClient.query("UPDATE users SET user_friends = array_append(user_friends, $1) WHERE user_name = $2", [userName, acceptedFriend])
      res.status(200).json("Demande acceptée")
    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }
  },

  declineFriendRequest: async (req, res) => {
    try {
      const { acceptedFriend } = req.body;
      const user = await pgClient.query("SELECT user_id FROM users WHERE user_id = $1", [req.user]);
      const userName = user.rows[0].user_name

      await pgClient.query("UPDATE users SET friends_pending = array_remove(friends_pending, $1) WHERE user_name = $2", [acceptedFriend, userName])
      res.status(200).json("Demande refusée")
    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }
  },


  searchFriend: async (req, res) => {
    try {

      const users = await pgClient.query("SELECT user_name FROM users");
      res.status(200).json(users)

    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }
  }

}