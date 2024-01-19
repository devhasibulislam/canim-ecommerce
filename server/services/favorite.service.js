/**
 * Title: Write a program using JavaScript on Favorite Service
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
 * Date: 09, January 2024
 */

/* internal imports */
const Favorite = require("../models/favorite.model");
const User = require("../models/user.model");

/* add to favorite */
exports.addToFavorite = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { product } = req.body;

  const favorite = await Favorite.create({
    user: user._id,
    product: product,
  });

  await User.findByIdAndUpdate(user._id, {
    $push: { favorites: favorite._id },
  });

  res.status(201).json({
    acknowledgement: true,
    message: "Ok",
    description: "Product added to favorite successfully",
  });
};

/* get favorite */
exports.getFavorite = async (res) => {
  const favorites = await Favorite.find().populate("product");

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Favorite retrieved successfully",
    data: favorites,
  });
};

/* delete favorite */
exports.deleteFromFavorite = async (req, res) => {
  const favorite = await Favorite.findByIdAndDelete(req.params.id);

  await User.findByIdAndUpdate(favorite.user, {
    $pull: { favorites: favorite._id },
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Product deleted from favorite successfully",
  });
};
