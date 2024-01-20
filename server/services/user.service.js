/**
 * Title: Write a program using JavaScript on User Service
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

/* internal imports */
const Brand = require("../models/brand.model");
const Cart = require("../models/cart.model");
const Category = require("../models/category.model");
const Favorite = require("../models/favorite.model");
const Product = require("../models/product.model");
const Purchase = require("../models/purchase.model");
const Review = require("../models/review.model");
const Store = require("../models/store.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");
const token = require("../utils/token.util");

/* sign up an user */
exports.signUp = async (req, res) => {
  const { body, file } = req;

  // Create a new user instance
  const user = new User({
    name: body.name,
    email: body.email,
    password: body.password,
    phone: body.phone,
  });

  if (file) {
    user.avatar = {
      url: file.path,
      public_id: file.filename,
    };
  }

  await user.save();

  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "User created successfully",
  });

  return user;
};

/* sign in an user */
exports.signIn = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "User not found",
    });
  } else {
    const isPasswordValid = user.comparePassword(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(401).json({
        acknowledgement: false,
        message: "Unauthorized",
        description: "Invalid password",
      });
    } else {
      if (user.status === "inactive") {
        res.status(401).json({
          acknowledgement: false,
          message: "Unauthorized",
          description: "Your seller account in a review state",
        });
      } else {
        const accessToken = token({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        });

        res.status(200).json({
          acknowledgement: true,
          message: "OK",
          description: "Login successful",
          accessToken,
        });
      }
    }
  }
};

/* reset user password */
exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "User not found",
    });
  } else {
    const hashedPassword = user.encryptedPassword(req.body.password);

    await User.findOneAndUpdate(
      { email: req.body.email },
      { password: hashedPassword },
      { runValidators: false, returnOriginal: false }
    );

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Password reset successful",
    });
  }
};

/* login persistance */
exports.persistLogin = async (req, res) => {
  const user = await User.findById(req.user._id).populate([
    {
      path: "cart",
      populate: [
        { path: "product", populate: ["brand", "category", "store"] },
        "user",
      ],
    },
    {
      path: "reviews",
      populate: ["product", "reviewer"],
    },
    {
      path: "favorites",
      populate: [
        {
          path: "product",
          populate: ["brand", "category", "store"],
        },
        "user",
      ],
    },
    {
      path: "purchases",
      populate: ["customer", "products.product"],
    },
    "store",
    "brand",
    "category",
    "products",
  ]);

  if (!user) {
    res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "User not found",
    });
  } else {
    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Login successful",
      data: user,
    });
  }
};

/* get all users */
exports.getUsers = async (res) => {
  const users = await User.find().populate("store");

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: "Users retrieved successfully",
    data: users,
  });
};

/* get single user */
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id).populate("store");

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: `${user.name}'s information retrieved successfully`,
    data: user,
  });
};

/* update user information */
exports.updateUser = async (req, res) => {
  const existingUser = await User.findById(req.user._id);
  const user = req.body;

  if (!req.body.avatar && req.file) {
    await remove(existingUser.avatar.public_id);

    user.avatar = {
      url: req.file.path,
      public_id: req.file.filename,
    };
  }

  const updatedUser = await User.findByIdAndUpdate(
    existingUser._id,
    { $set: user },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: `${updatedUser.name}'s information updated successfully`,
  });
};

/* delete user information */
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  // remove user avatar
  await remove(user.avatar.public_id);

  // remove user cart
  if (user.cart.length > 0) {
    user.cart.forEach(async (cart) => {
      await Cart.findByIdAndDelete(cart._id);
    });
  }

  // remove user favorites
  if (user.favorites.length > 0) {
    user.favorites.forEach(async (favorite) => {
      await Favorite.findByIdAndDelete(favorite._id);
    });
  }

  // remove user reviews
  if (user.reviews.length > 0) {
    user.reviews.forEach(async (review) => {
      await Review.findByIdAndDelete(review._id);
    });
  }

  // remove user purchases
  if (user.purchases.length > 0) {
    user.purchases.forEach(async (purchase) => {
      await Purchase.findByIdAndDelete(purchase._id);
    });
  }

  // remove store
  if (user.store) {
    const store = await Store.findByIdAndDelete(user.store);

    // remove store thumbnail
    await remove(store.thumbnail.public_id);

    // remove store products
    store.products.forEach(async (prod) => {
      const product = await Product.findByIdAndDelete(prod);

      // remove product thumbnail
      await remove(product.thumbnail.public_id);

      // remove product gallery
      product.gallery.forEach(async (gallery) => {
        await remove(gallery.public_id);
      });

      // remove product reviews
      product.reviews.forEach(async (review) => {
        await Review.findByIdAndDelete(review._id);
      });
    });
  }

  // remove category
  if (user.category) {
    const category = await Category.findByIdAndDelete(user.category);

    // remove category thumbnail
    await remove(category.thumbnail.public_id);

    // remove category products
    category.products.forEach(async (prod) => {
      const product = await Product.findByIdAndDelete(prod);

      // remove product thumbnail
      await remove(product.thumbnail.public_id);

      // remove product gallery
      product.gallery.forEach(async (gallery) => {
        await remove(gallery.public_id);
      });

      // remove product reviews
      product.reviews.forEach(async (review) => {
        await Review.findByIdAndDelete(review._id);
      });
    });
  }

  // remove brand
  if (user.brand) {
    const brand = await Brand.findByIdAndDelete(user.brand);

    // remove brand logo
    await remove(brand.logo.public_id);

    // remove brand products
    brand.products.forEach(async (prod) => {
      const product = await Product.findByIdAndDelete(prod);

      // remove product thumbnail
      await remove(product.thumbnail.public_id);

      // remove product gallery
      product.gallery.forEach(async (gallery) => {
        await remove(gallery.public_id);
      });

      // remove product reviews
      product.reviews.forEach(async (review) => {
        await Review.findByIdAndDelete(review._id);
      });
    });
  }

  // remove user from product's buyers array
  if (user.products.length > 0) {
    await Product.updateMany(
      {},
      {
        $pull: {
          buyers: user._id,
        },
      }
    );
  }

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: `${user.name}'s information deleted successfully`,
  });
};

// seller request & approve
exports.getSellers = async (res) => {
  const users = await User.find({ role: "seller", status: "inactive" });

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: "Sellers retrieved successfully",
    data: users,
  });
};

exports.reviewSeller = async (req, res) => {
  await User.findByIdAndUpdate(req.query.id, {
    $set: req.body,
  });

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: "Seller reviewed successfully",
  });
};
