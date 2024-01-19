/**
 * Title: Write a program using JavaScript on Cart Service
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
const Cart = require("../models/cart.model");
const User = require("../models/user.model");

/* add to cart */
exports.addToCart = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { product, quantity } = req.body;

  const cart = await Cart.create({
    user: user._id,
    product: product,
    quantity: quantity,
  });

  await User.findByIdAndUpdate(user._id, {
    $push: { cart: cart._id },
  });

  res.status(201).json({
    acknowledgement: true,
    message: "Ok",
    description: "Product added to cart successfully",
  });
};

/* get from cart */
exports.getCart = async (res) => {
  const cart = await Cart.find();

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Cart fetched successfully",
    data: cart,
  });
};

/* update cart */
exports.updateCart = async (req, res) => {
  await Cart.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Cart updated successfully",
  });
};

/* delete cart */
exports.deleteCart = async (req, res) => {
  const cart = await Cart.findByIdAndDelete(req.params.id);

  await User.findByIdAndUpdate(cart.user, {
    $pull: { cart: cart._id },
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Cart deleted successfully",
  });
};
