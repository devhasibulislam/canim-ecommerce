/**
 * Title: Write a program using JavaScript on Payment Service
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
 * Date: 19, January 2024
 */

const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const Purchase = require("../models/purchase.model");
const User = require("../models/user.model");

/* external import */
require("dotenv").config();

/* stripe setup */
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// create payment
exports.createPayment = async (req, res) => {
  const lineItems = req.body.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.thumbnail],
          description: item.description,
          metadata: {
            id: item.pid,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.ORIGIN_URL}`,
    cancel_url: `${process.env.ORIGIN_URL}`,
  });

  // create purchase for user
  const purchase = await Purchase.create({
    customer: req.user._id,
    customerId: session.id,
    orderId: session.id,
    totalAmount: session.amount_total,
    products: req.body.map((item) => ({
      product: item.pid,
      quantity: item.quantity,
    })),
  });

  // add purchase._id to user's purchases array, add pid from req.body array of object to user's products array and empty user's cart array
  await User.findByIdAndUpdate(req.user._id, {
    $push: { purchases: purchase._id },
    $set: { cart: [] },
  });

  // add pid from req.body array of object to user's products array
  req.body.forEach(async (item) => {
    await User.findByIdAndUpdate(req.user._id, {
      $push: { products: item.pid },
    });
  });

  // remove all carts that cart._id match with cid from req.body's array of object
  req.body.forEach(async (cart) => {
    await Cart.findByIdAndDelete(cart.cid);
  });

  // add user to products buyers array
  req.body.forEach(async (product) => {
    await Product.findByIdAndUpdate(product.pid, {
      $push: { buyers: req.user._id },
    });
  });

  res.status(201).json({
    acknowledgement: true,
    message: "Ok",
    description: "Payment created successfully",
    url: session.url,
  });
};
