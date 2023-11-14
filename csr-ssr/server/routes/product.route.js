/**
 * Title: Product route
 * Description: Routing credentials based on product
 * Author: Hasibul Islam
 * Date: 13/03/2023
 */

/* external import */
const express = require("express");

/* internal import */
const photoController = require("../controllers/photo.controller");
const productController = require("../controllers/product.controller");
const upload = require("../middlewares/upload.middleware");

/* router level import */
const router = express.Router();

/* router method integration */
// upload & update product thumbnail
router
  .route("/thumbnail")
  .post(upload.single("thumbnail"), photoController.uploadPhoto)
  .patch(upload.single("thumbnail"), photoController.updatePhoto);

// upload & update product gallery
router
  .route("/gallery")
  .post(upload.array("gallery", 5), productController.galleryUpload)
  .patch(upload.array("gallery", 5), productController.galleryUpdate);

// insert new product
router.post("/create", productController.createProduct);

// display all product
router.get("/all", productController.displayProducts);

// display, update and remove specific product
router
  .route("/:id")
  .get(productController.displayProduct)
  .patch(productController.updateProduct)
  .delete(productController.removeProduct);

/* export product router */
module.exports = router;
