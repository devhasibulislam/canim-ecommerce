/**
 * Title: Control Single photo
 * Description: Control photo at upload and update scheme
 * Author: Hasibul Islam
 * Date: 11/03/2023
 */

/* internal import */
const removePhoto = require("../services/photo.service");

/* upload an image */
const uploadPhoto = async (req, res, next) => {
  try {
    const result = req.file;

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "Photo uploaded successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* update an image */
const updatePhoto = async (req, res, next) => {
  try {
    // query parameter is: api/user/avatar?public_id=xxxxxxxxxxx
    await removePhoto(req.query.public_id);
    const result = req.file;

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Photo updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* export cloudinary uploader and updater */
module.exports = { uploadPhoto, updatePhoto };
