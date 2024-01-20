/**
 * Title: Write a program using JavaScript on Store Model
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
 * Date: 11, November 2023
 */

/* external imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

/* create store schema */
const storeSchema = new mongoose.Schema(
  {
    // for title
    title: {
      type: String,
      required: [true, "Please, provide a valid store name"],
      trim: true,
      unique: [true, "Same store already exists"],
      maxLength: [100, "Your title would be at most 100 characters"],
    },

    // for description
    description: {
      type: String,
      required: [true, "Please, provide store description"],
      trim: true,
      maxLength: [500, "Your description would be at most 500 characters"],
    },

    // for thumbnail
    thumbnail: {
      url: {
        type: String,
        validate: [validator.isURL, "Please provide a valid thumbnail URL"],
        default: "https://placehold.co/296x200.png",
      },
      public_id: {
        type: String,
        default: "N/A",
      },
    },

    // for owner
    owner: {
      type: ObjectId,
      ref: "User",
    },

    // for products
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],

    // for status
    status: {
      type: String,
      enum: {
        values: ["active", "inactive"],
        message: "Invalid status, choose active/inactive",
      },
      default: "active",
    },

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

/* middleware for store */
storeSchema.pre("save", function (next) {
  // replace space with hyphen and lowercase
  const newTags = [];
  this.tags.forEach((tag) =>
    newTags.push(tag.replace(" ", "-")?.toLowerCase())
  );
  this.tags = newTags;

  next();
});

/* create store schema model */
const Store = mongoose.model("Store", storeSchema);

/* export store schema */
module.exports = Store;
