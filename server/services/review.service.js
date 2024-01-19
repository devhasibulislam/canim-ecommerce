/**
 * Title: Write a program using JavaScript on Review Service
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
const Product = require("../models/product.model");
const Review = require("../models/review.model");
const User = require("../models/user.model");

/* add to review */
exports.addReview = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { product, rating, comment } = req.body;

  const productExists = await Product.exists({
    _id: product,
    buyers: user._id,
  });

  if (!productExists) {
    return res.status(400).json({
      acknowledgement: false,
      message: "Bad Request",
      description: "Purchase this to place a review",
    });
  }

  const review = await Review.create({
    reviewer: user._id,
    product: product,
    rating: rating,
    comment: comment,
  });

  await Product.findByIdAndUpdate(product, {
    $push: { reviews: review._id },
  });

  await User.findByIdAndUpdate(user._id, {
    $push: { reviews: review._id },
  });

  res.status(201).json({
    acknowledgement: true,
    message: "Ok",
    description: "Review added successfully",
  });
};

/* get from review */
exports.getReviews = async (res) => {
  const reviews = await Review.find().sort({ updatedAt: 1 });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Review fetched successfully",
    data: reviews,
  });
};

/* update review */
exports.updateReview = async (req, res) => {
  await Review.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Review updated successfully",
  });
};

/* delete review */
exports.deleteReview = async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  await Product.findByIdAndUpdate(review.product, {
    $pull: { reviews: review._id },
  });

  await User.findByIdAndUpdate(review.reviewer, {
    $pull: { reviews: review._id },
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Review deleted successfully",
  });
};
