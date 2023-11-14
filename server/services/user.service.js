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
const User = require("../models/user.model");
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
      path: "cart.product",
      select: "_id title summary price thumbnail",
      populate: ["category", "brand", "store"],
    },
    "store",
  ]);

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: "Login successful",
    data: user,
  });
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

/* update user */
exports.updateUser = async (req, res) => {
  if (req.body.quantity) {
    await User.findByIdAndUpdate(req.params.id, {
      $push: {
        cart: {
          product: req.body.product,
          quantity: req.body.quantity,
        },
      },
    });
  } else await User.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: "User updated successfully",
  });
};
