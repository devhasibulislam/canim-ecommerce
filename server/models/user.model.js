/**
 * Title: Write a program using JavaScript on User Models
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
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

/* create user schema */
const userSchema = new mongoose.Schema(
  {
    // for full name
    name: {
      type: String,
      required: [true, "Please, provide your full name"],
      trim: true,
      maxLength: [100, "Your name would be at most 100 characters"],
    },

    // for email
    email: {
      type: String,
      required: [true, "Please, provide your email address"],
      validate: [validator.isEmail, "Provide a valid email address"],
      unique: [true, "Email already exist. Please, provide new"],
    },

    // for password
    password: {
      type: String,
      required: [true, "Please, provide a strong password"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minUppercase: 1,
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          }),
        message:
          "Password {VALUE} should contain minimum 1 => uppercase, lowercase, number and symbol",
      },
      minLength: [8, "Password should be at least 8 characters"],
      maxLength: [20, "Password should be at most 20 characters"],
    },

    // for avatar
    avatar: {
      url: {
        type: String,
        validate: [validator.isURL, "Please provide a valid avatar URL"],
        default: "https://placehold.co/300x300.png",
      },
      public_id: {
        type: String,
        default: "N/A",
      },
    },

    // for contact number
    phone: {
      type: String,
      required: [
        true,
        "Please, provide your phone number, i.e.: +8801xxxxxxxxx",
      ],
      validate: {
        validator: (value) =>
          validator.isMobilePhone(value, "bn-BD", { strictMode: true }),
        message:
          "Phone number {VALUE} is not valid. Please, retry like +8801xxxxxxxxx",
      },
      unique: true,
    },

    // for role
    role: {
      type: String,
      enum: ["admin", "buyer", "seller"],
      default: "buyer",
    },

    // for account status
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // for cart
    cart: [
      {
        type: ObjectId,
        ref: "Cart",
      },
    ],

    // for wishlist
    favorites: [
      {
        type: ObjectId,
        ref: "Favorite",
      },
    ],

    // for reviews
    reviews: [
      {
        type: ObjectId,
        ref: "Review",
      },
    ],

    // for purchases
    purchases: [
      {
        type: ObjectId,
        ref: "Purchase",
      },
    ],

    // for store creation
    store: {
      type: ObjectId,
      ref: "Store",
    },

    // for brand creation
    brand: {
      type: ObjectId,
      ref: "Brand",
    },

    // for category creation
    category: {
      type: ObjectId,
      ref: "Category",
    },

    // for buying products
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],

    // for address
    address: {
      type: String,
      default: "N/A",
      trim: true,
      maxLength: [500, "Your address would be at most 500 characters"],
    },

    // for user account time stamps
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

/* encrypted user account password */
userSchema.methods.encryptedPassword = function (password) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

/* middleware to encrypt password */
userSchema.pre("save", async function (next) {
  try {
    // initialize encrypted password
    if (!this.isModified("password")) {
      return next();
    }

    // encrypt password
    this.password = this.encryptedPassword(this.password);
  } catch (error) {
    next(error);
  }
});

/* compare passwords as sign in proportion */
userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

/* create user model schema */
const User = mongoose.model("User", userSchema);

/* export user schema */
module.exports = User;
