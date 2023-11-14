/**
 * Title: Create brand schema
 * Description: Schema that consume brand based credentials
 * Author: Hasibul Islam
 * Date: 14/03/2023
 */

/* external imports */
const mongoose = require("mongoose");
const validator = require("validator");

/* create brand schema */
const brandSchema = new mongoose.Schema(
  {
    // for title
    title: {
      type: String,
      required: [true, "Please, provide a valid brand name"],
      trim: true,
      uppercase: true,
      unique: [true, "Same brand already exists"],
      maxLength: [50, "Brand name would be at most 50 characters"],
    },

    // for tagline
    tagline: {
      type: String,
      required: [true, "Please, provide a brand tagline"],
      trim: true,
      maxLength: [100, "Brand tagline would be at most 100 characters"],
    },

    // for email
    email: {
      type: String,
      required: [true, "Please, provide a valid brand email"],
      trim: true,
      lowercase: true,
      unique: [true, "Same email already exists"],
      validate: [validator.isEmail, "Please provide a valid email address"],
    },

    // for website
    website: {
      type: String,
      required: [true, "Please, provide a valid brand website url"],
      lowercase: true,
      unique: [true, "Same website already exists"],
      validate: [validator.isURL, "Please provide a valid brand website url"],
    },

    // for description
    description: {
      type: String,
      required: [true, "Please, provide brand description"],
      trim: true,
      maxLength: [500, "Brand description would be at most 500 characters"],
    },

    // for logo
    logo: {
      url: {
        type: String,
        validate: [validator.isURL, "Please provide a valid thumbnail URL"],
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },

    // for location
    location: {
      type: String,
      trim: true,
      required: [true, "Please, provide brand location"],
      maxLength: [200, "Brand address would be at most 200 characters"],
    },

    // for products
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    // for category  time stamps
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

/* middleware for brand */
brandSchema.pre("save", function (next) {
  // Capitalize tagline
  let splitStr = this.tagline?.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  this.tagline = splitStr.join(" ");

  next();
});

/* create brand model schema */
const Brand = mongoose.model("Brand", brandSchema);

/* export brand schema */
module.exports = Brand;
