const pgClient = require("../db");

module.exports = {
  sendMeetupRequest: async (req, res) => {
    try {
      const userInviting = req.user;
      const { date, time, address, place } = req.body;
      const userInvitedName = req.params.friendName;
      const dateTime = date + "T" + time
      const userInvitedObject = await pgClient.query("SELECT user_id, user_name FROM users WHERE user_name = $1", [userInvitedName])
      const userInvitingObject = await pgClient.query("SELECT user_name FROM users WHERE user_id = $1", [req.user])
      const userInvited = userInvitedObject.rows[0].user_id;
      const userInvitingName = userInvitingObject.rows[0].user_name;
      await pgClient.query("INSERT INTO meetups (user_inviting_id, user_invited, meetup_date, meetup_time, meetup_address, meetup_place, user_inviting_name, user_invited_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [userInviting, userInvited, dateTime, dateTime, address, place, userInvitingName, userInvitedName])
      await pgClient.query("UPDATE users SET user_points = user_points + 25 WHERE user_id = $1", [req.user])
      res.status(200).json(userInvited);

    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }
  },

  getMeetupsInfo: async (req, res) => {
    try {
      const meetupsICreated = await pgClient.query("SELECT * FROM meetups WHERE user_inviting_id = $1", [req.user])
      const meetupsImInvitedTo = await pgClient.query("SELECT * FROM meetups WHERE user_invited = $1", [req.user])
      const userFriends = await pgClient.query("SELECT user_friends FROM users WHERE user_id = $1", [req.user]);
      const friends = userFriends.rows[0].user_friends;
      const meetupsMyFriendsCreated = await pgClient.query("SELECT * FROM meetups WHERE user_inviting_id = ANY($1) OR user_invited = ANY($1) EXCEPT SELECT * FROM meetups WHERE user_invited = ($2) OR user_inviting_id = ($2)", [friends, req.user])
      const meetupInfos = { meetupsICreated: meetupsICreated.rows, meetupsImInvitedTo: meetupsImInvitedTo.rows, meetupsMyFriendsCreated: meetupsMyFriendsCreated.rows }
      res.status(200).json(meetupInfos);

    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }
  }

};









