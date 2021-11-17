const pgClient = require("../db");

module.exports = {
  sendFriendRequest: async (req, res) => {
    try {

      const { friendName } = req.body;
      //1. Get user_name of user asking
      const user = await pgClient.query("SELECT user_name, user_friends FROM users WHERE user_id = $1", [req.user]);
      const userName = user.rows[0].user_name;
      if (friendName === userName) {
        return res.status(200).json("Vous ne pouvez pas être amis avec cet utilisateur")
      }

      //2. Check if users are already friends
      const isFriend = user.rows[0].user_friends;
      if (isFriend !== null) {
        const alreadyFriend = isFriend.find(friend => friend === friendName)
        if (alreadyFriend !== undefined) {
          return res.status(200).json("Vous êtes déjà amis avec ce buveur")
        }
      }

      //3. Check if user asking has already requested user asked
      const pending = await pgClient.query("SELECT friends_pending FROM users WHERE user_name = $1", [friendName]);
      const isPending = pending.rows[0].friends_pending;
      if (isPending !== null) {
        const alreadyPending = isPending.find(friend => friend === userName);
        if (alreadyPending !== undefined) {
          return res.status(200).json("Votre demande est encore en attente")
        }
      }

      //4. Add friendRequest to friends_pending of user asked
      await pgClient.query("UPDATE users SET friends_pending = array_append(friends_pending, $1) WHERE user_name = $2", [userName, friendName])

      res.status(200).json("Demande envoyée")

    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }
  },

  acceptFriendRequest: async (req, res) => {
    try {
      const { friendName } = req.body;
      const user = await pgClient.query("SELECT user_name, user_friends FROM users WHERE user_id = $1", [req.user]);
      const userName = user.rows[0].user_name

      //3. Check if user asking has already accepted user asked
      const isFriend = user.rows[0].user_friends;
      if (isFriend !== null) {
        const alreadyFriend = isFriend.find(friend => friend === friendName)
        if (alreadyFriend !== undefined) {
          return res.status(200).json("Vous êtes déjà amis avec ce buveur")
        }
      }

      await pgClient.query("UPDATE users SET friends_pending = array_remove(friends_pending, $1) WHERE user_name = $2", [friendName, userName])
      await pgClient.query("UPDATE users SET user_friends = array_append(user_friends, $1) WHERE user_name = $2", [friendName, userName])
      await pgClient.query("UPDATE users SET user_friends = array_append(user_friends, $1) WHERE user_name = $2", [userName, friendName])
      res.status(200).json("Demande acceptée")
    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }
  },

  declineFriendRequest: async (req, res) => {
    try {
      const { friendName } = req.body;
      const user = await pgClient.query("SELECT user_name FROM users WHERE user_id = $1", [req.user]);
      const userName = user.rows[0].user_name


      await pgClient.query("UPDATE users SET friends_pending = array_remove(friends_pending, $1) WHERE user_name = $2", [friendName, userName])
      res.status(200).json("Demande refusée")
    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }
  },

  getAllFriends: async (req, res) => {
    try {
      const user = await pgClient.query("SELECT user_friends FROM users WHERE user_id = $1", [req.user]);
      const friends = user.rows[0].user_friends;
      if (friends === null) {
        return res.status(200).json("Vous n'avez pas d'amis")
      }
      res.status(200).json(friends)
    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }
  },

  getAllFriendsPosts: async (req, res) => {
    try {
      const user = await pgClient.query("SELECT user_friends FROM users WHERE user_id = $1", [req.user]);
      const friends = user.rows[0].user_friends;
      if (friends === null) {
        return res.status(200).json("Vous n'avez pas d'amis")
      }
      const posts = await pgClient.query("SELECT * FROM posts WHERE user_name = ANY($1)", [friends]);
      res.status(200).json(posts.rows)
    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }
  },

  searchFriend: async (req, res) => {
    try {
      console.log(req);
      const friendName = req.params.userName;
      const user = await pgClient.query("SELECT user_name FROM users WHERE user_name LIKE $1", [`%${friendName}%`]);
      res.status(200).json({usernames: user.rows})
    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    } 

  }

}