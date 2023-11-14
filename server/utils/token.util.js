/**
 * Title: Write a program using JavaScript on Token Util
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https:/instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 09, November 2023
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
