const pgClient = require("../db");

module.exports = {
  sendMeetupRequest: async (req, res) => {
    try {
      const userInviting = req.user;
      const { date, time, address, place } = req.body;
      const dateTime = date + "T" + time
      const userInvitedObject = await pgClient.query("SELECT user_id FROM users WHERE user_name = $1", [req.params.friendName])
      const userInvited = userInvitedObject.rows[0].user_id;
      await pgClient.query("INSERT INTO meetups (user_inviting_id, user_invited, meetup_date, meetup_time, meetup_address, meetup_place) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [userInviting, userInvited, dateTime, dateTime, address, place])
      res.status(200).json(userInvited);

      const userInvitingPoints = await pgClient.query("SELECT user_points FROM users WHERE user_id = $1", [userInviting]);

    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }
  },

  getMeetupRequest: async (req, res) => {
    try {
      const userInvited = req.user;
      const userInvitingObject = await pgClient.query("SELECT user_inviting_id FROM meetups WHERE user_invited = $1", [userInvited])
      const userInviting = userInvitingObject.rows[0].user_inviting_id;
      const meetup = await pgClient.query("SELECT * FROM meetups WHERE user_invited = $1 AND user_inviting_id = $2", [userInvited, userInviting])
      res.status(200).json(meetup);

    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }
  },
  getMeetupRequestSent: async (req, res) => {
    try {
      const userInvited = req.user;
      const meetup = await pgClient.query("SELECT * FROM meetups WHERE user_invited = $1", [userInvited])
      res.status(200).json(meetup);

    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }
  },

};









