const bcrypt = require("bcrypt");
const pgClient = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");


module.exports = {
  createUser: async (req, res, next) => {
    try {

      //1. Destructure the req.body
      const { name, email, password } = req.body;

      //2. Check if user exists
      const user = await pgClient.query("SELECT * FROM users WHERE user_email = $1", [email]);

      if (user.rows.length !== 0) {
        return res.status(401).json("User already exists")
      }

      //3. Bcrypt
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);

      //4. Insert user
      const newUser = await pgClient.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, hash])

      //5. Generate JWT token
      const token = jwtGenerator(newUser.rows[0].user_id);
      res.status(200).json({ token });

    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server error");
    }
  },

  loginUser: async (req, res, next) => {
    try {

      //1. Destructure the req.body
      const { email, password } = req.body;

      //2. Check if user exists
      const user = await pgClient.query("SELECT * FROM users WHERE user_email = $1", [email]);

      if (user.rows.length === 0) {
        return res.status(401).json("Email or password is incorrect")
      }

      //3. Check if req password = database password
      const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

      if (!validPassword) {
        return res.status(401).json("Email or password is incorrect")
      }

      const token = jwtGenerator(user.rows[0].user_id);
      res.status(200).json({ token });

    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server error");
    }
  },

  checkToken: async (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server error");
    }
  }
}