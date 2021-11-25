const pgClient = require("../db");

module.exports = {
  sendMeetupRequest: async (req, res) => {    
    try {
      const userInviting = req.user;
      const { date, time, address, place } = req.body;
      const userInvitedObject = await pgClient.query("SELECT user_id FROM users WHERE user_name = $1", [req.params.friendName])
      const userInvited = userInvitedObject.rows[0].user_id; 
      await pgClient.query("INSERT INTO meetups (user_inviting_id, user_invited, meetup_date, meetup_time, meetup_address, meetup_place) VALUES ($1, $2, $3, $4, $5) RETURNING *", [userInviting, userInvited, date, time, address, place])
      res.status(200).json(userInvited);
      
    } catch (err) {
      console.error(err.message)
      res.status(500).json("Server error");
    }
  }
};

// check if users are already going to the same meetup  
const checkIfAlreadyGoing = async (req, res) => {
  try {
    const userInvitedObject = await pgClient.query("SELECT user_id FROM users WHERE user_name = $1", [req.params.friendName])
    const userInvited = userInvitedObject.rows[0].user_id; 
    const meetup = await pgClient.query("SELECT * FROM meetups WHERE user_invited = $1", [userInvited])
    res.status(200).json(meetup);
    
  } catch (err) {
    console.error(err.message)
    res.status(500).json("Server error");
  }
}






