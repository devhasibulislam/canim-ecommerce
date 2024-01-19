/**
 * Title: Write a program using JavaScript on Review Route
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
const reviewController = require("../controllers/review.controller");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add to review
router.post(
  "/add-review",
  verify,
  authorize("buyer"),
  reviewController.addReview
);

// get from review
router.get(
  "/get-reviews",
  reviewController.getReviews
);

// update review
router.patch(
  "/update-review/:id",
  verify,
  authorize("buyer"),
  reviewController.updateReview
);

// delete review
router.delete(
  "/delete-review/:id",
  verify,
  authorize("seller"),
  reviewController.deleteReview
);

/* export review router */
module.exports = router;
