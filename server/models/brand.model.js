/**
 * Title: Write a program using JavaScript on Brand
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 11, November 2023
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
        validate: [validator.isURL, "Please provide a valid logo URL"],
        default: "https://placehold.co/296x200.png",
      },
      public_id: {
        type: String,
        default: "N/A",
      },
    },

    // for products
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    // for keynotes
    keynotes: [
      {
        type: String,
        trim: true,
      },
    ],

    // for tags
    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // for trashable
    trashable: {
      type: Boolean,
      default: false,
    },

    // for brand  time stamps
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
  // Capitalize title
  let splitStr = this.title?.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  this.title = splitStr.join(" ");

  // replace space with hyphen and lowercase
  const newTags = [];
  this.tags.forEach((tag) =>
    newTags.push(tag.replace(" ", "-")?.toLowerCase())
  );
  this.tags = newTags;

  next();
});

/* create brand model schema */
const Brand = mongoose.model("Brand", brandSchema);

/* export brand schema */
module.exports = Brand;
