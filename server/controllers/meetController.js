const pgClient = require("../db");

module.exports = {
  sendMeetupRequest: async (req, res) => {    
    try {
      res.status(200).json("Allo");
      // const userInvited = req.params.friendName;
      // const userInviting = req.user;
      // const { date, time, address, place };

      // await pgClient.query("INSERT INTO meetups (user_inviting, user_invited, meetup_date, meetup_time, meetup_address, meetup_place) VALUES ($1, $2, $3, $4, $5) RETURNING *", [userInviting, userInvited, date, time, address, place])
      // res.status(200).json("Meetup créé");
      
    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }
  }
};
