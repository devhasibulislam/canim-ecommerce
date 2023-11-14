/**
 * Title: Category route
 * Description: Routing credentials based on category
 * Author: Hasibul Islam
 * Date: 11/03/2023
 */

/* external import */
const express = require("express");

/* internal imports */
const categoryController = require("../controllers/category.controller");
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
router.post("/create", categoryController.createCategory);

// display all category
router.get("/all", categoryController.displayCategories);

// display, update and remove specific category
router
  .route("/:id")
  .get(categoryController.displayCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.removeCategory);

/* export review router */
module.exports = router;
