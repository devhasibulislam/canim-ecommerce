/**
 * Title: Create brand route
 * Description: Routing credentials based on brand
 * Author: Hasibul Islam
 * Date: 14/03/2023
 */

/* external import */
const express = require("express");

/* internal import */
const brandController = require("../controllers/brand.controller");
const photoController = require("../controllers/photo.controller");
const upload = require("../middlewares/upload.middleware");

/* router level connection */
const router = express.Router();

/* router method integration */
// upload & update brand logo
router
  .route("/logo")
  .post(upload.single("logo"), photoController.uploadPhoto)
  .patch(upload.single("logo"), photoController.updatePhoto);

// insert new category
router.post("/create", brandController.createBrand);

// display all category
router.get("/all", brandController.displayBrands);

// display, update and remove specific category
router
  .route("/:id")
  .get(brandController.displayBrand)
  .patch(brandController.updateBrand)
  .delete(brandController.removeBrand);

/* export brand router */
module.exports = router;
