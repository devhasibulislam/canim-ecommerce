/**
 * Title: Write a program using JavaScript on Purchase Route
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
const purchaseController = require("../controllers/purchase.controller");

/* router level connection */
const router = express.Router();

/* router methods integration */

// get all purchases
router.get(
  "/get-all-purchases",
  verify,
  authorize("admin"),
  purchaseController.getAllPurchases
);

// update purchase status
router.patch(
  "/update-purchase-status/:id",
  verify,
  authorize("admin"),
  purchaseController.updatePurchaseStatus
);

/* export purchase router */
module.exports = router;
