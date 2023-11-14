/**
 * Title: User service
 * Description: Servicing credentials based on user
 * Author: Hasibul Islam
 * Date: 11/03/2023
 */

/* internal import */
const Product = require("../models/product.model");
const Store = require("../models/store.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");
const token = require("../utils/token.util");

/* find by email */
async function findByEmail(email) {
  return await User.findOne({ email });
}

/* sign up an user */
exports.signUp = async (data) => {
  return await User.create(data);
};

/* sign in an user */
exports.signIn = async ({ email, password }) => {
  const result = await findByEmail(email);

  if (!result) {
    return {
      acknowledgement: false,
      message: "Not Found",
      description: "Entered a wrong email address",
    };
  }

  const isPasswordValid = result.comparePassword(password, result.password);

  if (isPasswordValid === false) {
    return {
      acknowledgement: false,
      message: "Not Acceptable",
      description: "Entered incorrect password",
    };
  }

  if (result.status === "inactive") {
    return {
      acknowledgement: false,
      message: "Unauthorized",
      description: "Account status is inactive",
    };
  }

  const accessToken = token(result);

  return { ...result.toObject(), accessToken };
};

/* forgot account of an user account */
exports.forgotPassword = async ({ email, password }) => {
  const result = await findByEmail(email);

  if (!result) {
    return {
      acknowledgement: false,
      message: "Not Found",
      description: "Entered a wrong email address",
    };
  }

  const hashedPassword = result.encryptedPassword(password);
  await User.findOneAndUpdate(
    { email },
    { $set: { password: hashedPassword } },
    { runValidators: true, returnOriginal: false }
  );

  return result;
};

// login persistency
exports.persistLogin = async ({ _id }) => {
  const user = await User.findById(_id).populate({
    path: "cart.product",
    select: "title thumbnail price",
  });
  return user;
};

// display all users
exports.displayUsers = async ({ page, limit }) => {
  const result = await User.find({})
    .skip((Number(page) - 1) * limit)
    .limit(limit)
    .sort("-updatedAt")
    .populate({
      path: "store",
      select: "title",
    });

  const count = await User.estimatedDocumentCount();
  return { users: result, count };
};

// display specific user
exports.displayUser = async ({ id }) => {
  return await User.findById(id);
};

/**
 * update specific user credentials
 * permanently disable user credentials
 */
exports.updateUser = async (id, data) => {
  if (Object.keys(data).includes("cart")) {
    return await User.findByIdAndUpdate(
      id,
      {
        $push: data,
      }, // receive data as: {"cart": "AN_OBJECT_ID"}
      {
        runValidators: true,
        returnOriginal: false,
      }
    );
  }

  if (Object.keys(data).includes("discard")) {
    return await User.findByIdAndUpdate(
      id,
      {
        $pull: { cart: data.discard },
      }, // receive data as: {"cart": "AN_OBJECT_ID"}
      {
        runValidators: true,
        returnOriginal: false,
      }
    );
  }

  // { status: "inactive" } for permanent disable account
  return await User.findByIdAndUpdate(id, data, {
    runValidators: true,
    returnOriginal: false,
  });
};

// remove specific user
exports.removeUser = async (id) => {
  const result = await User.findByIdAndDelete(id);
  await remove(result.avatar.public_id);

  // remove from store
  await Store.findByIdAndUpdate(result.store, {
    $unset: { seller: result._id },
    $set: { status: "inactive" },
  });

  // remove from product review
  const products = await Product.find({
    review: { $elemMatch: { reviewer: result._id } },
  });
  products.forEach(async (product) => {
    await Product.findByIdAndUpdate(product._id, {
      $pull: { review: { reviewer: result._id } },
      $set: { status: "inactive" },
    });
  });

  return result;
};
