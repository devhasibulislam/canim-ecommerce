/**
 * Title: File uploader
 * Description: Uploader that can upload single/multiple image file to the cloud
 * Author: Hasibul Islam
 * Date: 11/03/2023
 */

/* external imports */
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

/* cloudinary config */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: process.env.DB_NAME,
      public_id:
        crypto.randomBytes(8).toString("hex") +
        "-" +
        Date.now() +
        "-" +
        file.originalname.split(" ").join("_"),
    };
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /jpg|png|jpeg|webp/i;
    const extension = path.extname(file.originalname);

    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Must be a png/jpg/jpeg formate"));
    }
  },
});

module.exports = upload;
