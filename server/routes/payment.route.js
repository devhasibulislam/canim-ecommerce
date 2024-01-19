/**
 * Title: Write a program using JavaScript on Payment Route
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
 * Date: 19, January 2024
 */

/* external import */
const express = require("express");

/* middleware imports */
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* internal import */
const paymentController = require("../controllers/payment.controller");

/* router level connection */
const router = express.Router();

/* router methods integration */

// create payment
router.post(
  "/create-payment",
  verify,
  authorize("buyer"),
  paymentController.createPayment
);

/* export router */
module.exports = router;
