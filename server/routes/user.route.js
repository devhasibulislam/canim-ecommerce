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
router.post("/signup", upload.single("avatar"), userController.signUp);

// sign in an user
router.post("/signin", userController.signIn);

// reset user password
router.patch("/forgot-password", userController.forgotPassword);

// login persistance
router.get("/me", verify, userController.persistLogin);

// get all users
router.get("/list-users", verify, authorize("admin"), userController.getUsers);

// update user
router.patch(
  "/update-user/:id",
  verify,
  authorize("admin", "seller", "buyer"),
  userController.updateUser
);

/* export user router */
module.exports = router;
