/**
 * Title: Write a program using JavaScript on Product
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
 * Date: 10, November 2023
 */

/* external imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

/* create product schema */
const productSchema = new mongoose.Schema(
  {
    // for title
    title: {
      type: String,
      required: [true, "Please, provide a product title"],
      trim: true,
      unique: [true, "Same product already exists"],
      maxLength: [100, "Your title would be at most 100 characters"],
    },

    // for summary
    summary: {
      type: String,
      required: [true, "Please, provide product summary"],
      trim: true,
      maxLength: [500, "Your summary would be at most 500 characters"],
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

    // for gallery
    gallery: {
      type: [
        {
          url: {
            type: String,
            default: "https://placehold.co/296x200.png",
            validate: [
              validator.isURL,
              "Please, provide a valid garry photo URL",
            ],
          },
          public_id: {
            type: String,
            default: "N/A",
          },
        },
      ],
      validate: {
        validator: function (value) {
          return value.length <= 5;
        },
        message: "Won't able to add more than 5 gallery",
      },
    },

    // for feature
    features: [
      {
        title: {
          type: String,
          required: [true, "Please, provide a feature title"],
          maxLength: [100, "Your title would be at most 100 characters"],
        },
        content: {
          type: [String],
          required: [true, "Please, provide a feature content"],
          maxLength: [200, "Your content would be at most 200 characters"],
        },
      },
    ],

    // for variations
    variations: {
      colors: [String],
      sizes: [String],
    },

    // for campaigns
    campaign: {
      title: {
        type: String,
        required: [true, "Please, provide a campaign title"],
      },
      state: {
        type: String,
        required: [true, "Please, provide a campaign state"],
        enum: ["new-arrival", "discount", "sold-out", "on-sale"],
      },
    },

    // for price
    price: {
      type: Number,
      required: [true, "Please, provide a product price"],
    },

    // for category
    category: {
      type: ObjectId,
      ref: "Category",
    },

    // for brand
    brand: {
      type: ObjectId,
      ref: "Brand",
    },

    // for store
    store: {
      type: ObjectId,
      ref: "Store",
    },

    // for buyers
    buyers: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],

    // for reviews
    reviews: [
      {
        type: ObjectId,
        ref: "Review",
      },
    ],

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

/* create product schema */
const Product = mongoose.model("Product", productSchema);

/* export product schema */
module.exports = Product;
