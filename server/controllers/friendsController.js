const pgClient = require("../db");

module.exports = {
  sendFriendRequest: async (req, res) => {
    try {

      const { friendName } = req.body;
      //1. Get info of user asking
      const user = await pgClient.query("SELECT user_id, user_friends, friends_pending FROM users WHERE user_id = $1", [req.user]);
      const userId = user.rows[0].user_id;
      const isFriend = user.rows[0].user_friends;
      const isInPending = user.rows[0].friends_pending;

      //2. Get info of user asked
      const friend = await pgClient.query("SELECT user_id FROM users WHERE user_name = $1", [friendName]);
      const friendId = friend.rows[0].user_id;

      // (preventing user from requesting himself as a friend)
      if (friendId === userId) {
        return res.status(200).json("Vous ne pouvez pas ajouter cet utilisateur")
      }

      //3. Check if users are already friends
      if (isFriend !== null) {
        const alreadyFriend = isFriend.find(friend => friend === friendId);
        if (alreadyFriend !== undefined) {
          return res.status(200).json("Vous êtes déjà amis avec ce buveur")
        }
      }

      //4. Check if user asking has already been requested by user asked
      if (isInPending !== null) {
        const isAlreadyInPending = isInPending.find(friend => friend === friendId)
        if (isAlreadyInPending !== undefined) {
          await pgClient.query("UPDATE users SET friends_pending = array_remove(friends_pending, $1) WHERE user_id = $2", [friendId, userId])
          await pgClient.query("UPDATE users SET friends_pending = array_remove(friends_pending, $1) WHERE user_id = $2", [userId, friendId])
          await pgClient.query("UPDATE users SET user_friends = array_append(user_friends, $1) WHERE user_id = $2", [friendId, userId])
          await pgClient.query("UPDATE users SET user_friends = array_append(user_friends, $1) WHERE user_id = $2", [userId, friendId])
          return res.status(200).json("Demande acceptée")
        }
      }

      //5. Check if user asking has already requested user asked
      const pending = await pgClient.query("SELECT friends_pending FROM users WHERE user_id = $1", [friendId]);
      const isPending = pending.rows[0].friends_pending;
      if (isPending !== null) {
        const alreadyPending = isPending.find(friend => friend === userId);
        if (alreadyPending !== undefined) {
          return res.status(200).json("Votre demande est en attente")
        }
      }

      //6. Add friendRequest to friends_pending of user asked
      await pgClient.query("UPDATE users SET friends_pending = array_append(friends_pending, $1) WHERE user_id = $2", [userId, friendId])
      res.status(200).json("Demande envoyée")

    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }
  },

  acceptFriendRequest: async (req, res) => {
    try {
      const { friendName } = req.body;
      //1. Get info of user accepting
      const user = await pgClient.query("SELECT user_id, user_friends FROM users WHERE user_id = $1", [req.user]);
      const userId = user.rows[0].user_id;
      const isFriend = user.rows[0].user_friends;

      //2. Get info of user accepted
      const friend = await pgClient.query("SELECT user_id FROM users WHERE user_name = $1", [friendName]);
      const friendId = friend.rows[0].user_id;

      //3. Check if users are already friends
      if (isFriend !== null) {
        const alreadyFriend = isFriend.find(friend => friend === friendId)
        if (alreadyFriend !== undefined) {
          return res.status(200).json("Vous êtes déjà amis avec ce buveur")
        }
      }

      //4. Update tables
      await pgClient.query("UPDATE users SET friends_pending = array_remove(friends_pending, $1) WHERE user_id = $2", [friendId, userId])
      await pgClient.query("UPDATE users SET user_friends = array_append(user_friends, $1) WHERE user_id = $2", [friendId, userId])
      await pgClient.query("UPDATE users SET user_friends = array_append(user_friends, $1) WHERE user_id = $2", [userId, friendId])
      res.status(200).json("Demande acceptée")

    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }
  },

  declineFriendRequest: async (req, res) => {
    try {
      //1. Get info of user declining
      const { friendName } = req.body;
      const user = await pgClient.query("SELECT user_id FROM users WHERE user_id = $1", [req.user]);
      const userId = user.rows[0].user_id;

      //2. Get info of user declined
      const friend = await pgClient.query("SELECT user_id FROM users WHERE user_name = $1", [friendName]);
      const friendId = friend.rows[0].user_id;

      //3. Update tables
      await pgClient.query("UPDATE users SET friends_pending = array_remove(friends_pending, $1) WHERE user_id = $2", [friendId, userId])
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