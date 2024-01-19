/**
 * Title: Write a program using JavaScript on Brand Route
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
const brandController = require("../controllers/brand.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new brand
router.post(
  "/add-brand",
  verify,
  authorize("admin", "seller"),
  upload.single("logo"),
  brandController.addBrand
);

// get all brands
router.get("/get-brands", brandController.getBrands);

// get a brand
router.get("/get-brand/:id", brandController.getBrand);

// update brand
router.patch(
  "/update-brand/:id",
  verify,
  authorize("admin", "seller"),
  upload.single("logo"),
  brandController.updateBrand
);

// delete brand
router.delete(
  "/delete-brand/:id",
  verify,
  authorize("admin", "seller"),
  brandController.deleteBrand
);

module.exports = router;
