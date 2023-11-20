/**
 * Title: Write a program using JavaScript on Restrict Middleware
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
 * Date: 20, November 2023
 */

const User = require("../models/user.model");

async function restrict(req, res, next) {
  try {
    const user = await User.findById(req.user._id);
    if (user.store) {
      return res.status(405).json({
        acknowledgement: false,
        message: "Not Allowed",
        description:
          "Already having store is not allow to create another store",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = restrict;
