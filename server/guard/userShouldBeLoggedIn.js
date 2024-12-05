const pool = require("../config/db");
var jwt = require("jsonwebtoken");
const supersecret = process.env.SUPER_SECRET;

function userShouldBeLoggedIn(req, res, next) {
  const token = req.headers["authorization"]?.replace(/^Bearer\s/, "");

  if (!token) {
    res.status(401).send({ message: "please provide a token" });
  } else {
    // verify the token to see if it is valid. we pass in the token and the supersecret
    // for the callback function, we get an error and/or the decoded token
    jwt.verify(token, supersecret, async function (err, decoded) {
      // if there is an error it means that the token is not valid
      if (err) res.status(401).send({ message: err.message });
      else {
        //everything is awesome you can continue
        req.user_id = decoded.user_id;
        next();
      }
    });
  }
}

module.exports = userShouldBeLoggedIn;
