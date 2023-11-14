/**
 * Title: Product route
 * Description: Routing credentials based on store
 * Author: Hasibul Islam
 * Date: 15/03/2023
 */

/* external import */
const express = require("express");

/* internal import */
const storeController = require("../controllers/store.controller");
const photoController = require("../controllers/photo.controller");
const upload = require("../middlewares/upload.middleware");

/* router level connection */
const router = express.Router();

/* router method integration */
// upload & update store thumbnail
router
  .route("/thumbnail")
  .post(upload.single("thumbnail"), photoController.uploadPhoto)
  .patch(upload.single("thumbnail"), photoController.updatePhoto);

// insert new store
router.post("/create", storeController.createStore);

// display all stores
router.get("/all", storeController.displayStores);

// display, update and remove specific store
router
  .route("/:id")
  .get(storeController.displayStore)
  .patch(storeController.updateStore)
  .delete(storeController.removeStore);

/* export router */
module.exports = router;
