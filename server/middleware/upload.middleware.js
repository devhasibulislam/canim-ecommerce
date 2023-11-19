/**
 * Title: Write a program using JavaScript on Upload Middleware
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

/* external imports */
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
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
  params: async (_, file) => {
    return {
      folder: "ciseco-template",
      public_id: `${Date.now()}_${file.originalname
        .replace(/[^\w\s.-]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase()}`,
    };
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (_, file, cb) => {
    const supportedImage = /jpg|png|jpeg/i;
    const extension = path.extname(file.originalname);

    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Must be a png/jpg/jpeg formate"));
    }
  },
});

module.exports = upload;
