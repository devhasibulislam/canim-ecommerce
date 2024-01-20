/**
 * Title: Write a program using JavaScript on User Route
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
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");
const verify = require("../middleware/verify.middleware");

/* internal import */
const userController = require("../controllers/user.controller");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// sign up an user
router.post("/sign-up", upload.single("avatar"), userController.signUp);

// sign in an user
router.post("/sign-in", userController.signIn);

// reset user password
router.patch("/forgot-password", userController.forgotPassword);

// login persistance
router.get("/me", verify, userController.persistLogin);

// get all users
router.get("/all-users", verify, authorize("admin"), userController.getUsers);

// get single user
router.get("/get-user/:id", verify, authorize("admin"), userController.getUser);

// update user information
router.patch(
  "/update-information",
  verify,
  authorize("admin", "seller", "buyer"),
  upload.single("avatar"),
  userController.updateUser
);

// delete user information
router.delete(
  "/delete-user/:id",
  verify,
  authorize("admin", "seller", "buyer"),
  userController.deleteUser
);

// seller request and approve
router
  .route("/seller-review")
  .get(verify, authorize("admin"), userController.getSellers)
  .patch(verify, authorize("admin"), userController.reviewSeller);

/* export user router */
module.exports = router;
