const jwt = require('jsonwebtoken');
require('dotenv').config(); // access dotenv variable

function generateToken(user_id) {
    const payload = {
        user: {
            id: user_id
        }
    };

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: 60 * 60 * 60}) // sign the token, expriesin uses seconds so 60 * 60= 1 hr in sec
}

module.exports = generateToken;