/**
 * Title: Token verification
 * Description: Capable to persist a user for a longer time
 * Author: Hasibul Islam
 * Date: 11/03/2023
 */

/* external imports */
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

async function verify(req, res, next) {
  try {
    // catch the token from user header
    const token = req.headers?.authorization?.split(" ")[1];

    // no token explicitly give error
    if (!token) {
      return res.status(401).json({
        acknowledgement: false,
        message: "Unauthorized",
        description:
          "The client request has not been completed because it lacks valid authentication credentials",
        data: "No token found to persist an existing user for long time",
      });
    }

    // fetching token set the user on request
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );
    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
}

/* export token verification */
module.exports = verify;
