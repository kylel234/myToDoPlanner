const jwt = require('jsonwebtoken');
require('dotenv').config(); // access dotenv variable

// this middleware used to authorize user

module.exports = function(req, res, next) {

    const jwtoken = req.header("jwt_token"); // get token

    // verifies if it isn't token
    if (!jwtoken) {
        return res.status(403).json({ msg: "Authorization Denied" });
    }

    try {
        const payload = jwt.verify(jwtoken, process.env.jwtSecret); // checks if token is verified, then provides payload(user id)
        req.user = payload.user;
        next(); // countinues on in routes if token verified
    } catch(err) {
        console.log(err.message);
        res.status(401).json({ msg: "Invalid Token" });
    }
};