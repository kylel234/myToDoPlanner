const express = require('express');
const router = express.Router();
const pool = require("../db.js"); // gives access to run queries, as db.js code connects db to server
const bcrypt = require('bcrypt');
const generateJWT = require('../utils/generateJWT');
const authorize = require("../middleware/authorize");
const verifyUserInfo = require("../middleware/verifyUserInfo");

// register

router.post("/register", verifyUserInfo, async(req, res) => {
    // destructure user registration info/req.body
    const {username, email, password} = req.body;

    try {

        // $1 is variable for email and the first argument, check user exists via email since email is unique
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        // checks to make sure that another user doesnt exist
        if (user.rows.length !== 0) {
            res.status(401).json("This User Already Exists");
        }

        // encrypts/bcrypts password, check bcrypt documentation
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const encryptPass = await bcrypt.hash(password, salt);

        // stores the now encrypted password to this new user, returning * will get this data to show in the table
        const newUser = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, encryptPass]);
        
        // generate jwtoken for new user
        const jwtoken = generateJWT(newUser.rows[0].user_id);

        res.json({ jwtoken });
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// login
router.post("/login", verifyUserInfo, async (req, res) => {
    // destructure user login info/req.body
    const {email, password} = req.body;

    try {

        // $1 is variable for email and the first argument, check user exists via email since email is unique
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        // checks that the password or email matches user
        if (user.rows.length === 0) {
            res.status(401).json("Incorrect password or email");
        }

        // checks that encrypted pass matches the one stored in the db for that user
        const checkPass = await bcrypt.compare(password, user.rows[0].password);
        
        if (!checkPass) {
            return res.status(401).json("Incorrect password");
        }
        
        // generate jwtoken for user after everything has been verified
        const jwtoken = generateJWT(user.rows[0].user_id);

        res.json({ jwtoken });
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// verifies user still authenticated

router.post("/verify", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
});

module.exports = router;