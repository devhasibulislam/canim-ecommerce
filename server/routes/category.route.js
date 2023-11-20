/**
 * Title: Write a program using JavaScript on Category Route
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
 * Date: 11, November 2023
 */

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const categoryController = require("../controllers/category.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new category
router.post(
  "/add-category",
  verify,
  authorize("admin", "seller"),
  upload.single("thumbnail"),
  categoryController.addCategory
);

// get all categories
router.get("/list-categories", categoryController.getCategories);

// update category
router.patch(
  "/update-category/:id",
  verify,
  authorize("admin", "seller"),
  upload.single("thumbnail"),
  categoryController.updateCategory
);

// get a category
router.get("/get-category/:id", categoryController.getCategory);

module.exports = router;
