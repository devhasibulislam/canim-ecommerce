/**
 * Title: Subcategory route
 * Description: Routing credentials based on subcategory
 * Author: Hasibul Islam
 * Date: 12/03/2023
 */

/* external import */
const express = require("express");

/* internal imports */
const subcategoryController = require("../controllers/subcategory.controller");
const photoController = require("../controllers/photo.controller");

/* middleware imports */
const upload = require("../middlewares/upload.middleware");

/* router level imports */
const router = express.Router();

/* router method integration */
// upload & update store thumbnail
router
  .route("/thumbnail")
  .post(upload.single("thumbnail"), photoController.uploadPhoto)
  .patch(upload.single("thumbnail"), photoController.updatePhoto);

// insert new category
router.post("/create", subcategoryController.createSubcategory);

// display all category
router.get("/all", subcategoryController.displaySubcategories);

// display, update and remove specific category
router
  .route("/:id")
  .get(subcategoryController.displaySubcategory)
  .patch(subcategoryController.updateSubcategory)
  .delete(subcategoryController.removeSubcategory);

/* export review router */
module.exports = router;
