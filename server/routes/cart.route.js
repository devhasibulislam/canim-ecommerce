/**
 * Title: Write a program using JavaScript on Cart Route
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
 * Date: 09, January 2024
 */

/* external import */
const express = require("express");

/* middleware imports */
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* internal import */
const cartController = require("../controllers/cart.controller");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add to cart
router.post(
  "/add-to-cart",
  verify,
  authorize("buyer"),
  cartController.addToCart
);

// get from cart
router.get(
  "/get-from-cart",
  verify,
  authorize("admin"),
  cartController.getFromCart
);

// update cart
router.patch(
  "/update-cart/:id",
  verify,
  authorize("buyer"),
  cartController.updateCart
);

// delete cart
router.delete(
  "/delete-cart/:id",
  verify,
  authorize("buyer"),
  cartController.deleteCart
);

/* export cart router */
module.exports = router;
