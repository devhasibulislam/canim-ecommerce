/**
 * Title: Secret token credentials
 * Description: Token that consume user minification credentials that help in persisting user
 * Author: Hasibul Islam
 * Date: 11/03/2023
 */

/* external import */
const jwt = require("jsonwebtoken");

function token({ _id, name, email, role, status }) {
  // grab specific user info to generate jwt token
  const accessToken = jwt.sign(
    {
      _id: _id,
      name: name,
      email: email,
      role: role,
      status: status,
    },
    process.env.TOKEN_SECRET
  );

  return accessToken;
}

/* export token utility */
module.exports = token;
