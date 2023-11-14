/**
 * Title: Sub-Category schema
 * Description: Schema that consume sub-category based credentials
 * Author: Hasibul Islam
 * Date: 12/03/2023
 */

/* external imports */
const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

/* create subcategory schema */
const subcategorySchema = new mongoose.Schema(
  {
    // for title
    title: {
      type: String,
      required: [true, "Please, provide a subcategory name"],
      trim: true,
      unique: [true, "Same subcategory already exists"],
      maxLength: [100, "Subcategory name would be at most 100 characters"],
    },

    // for description
    description: {
      type: String,
      required: [true, "Please, provide subcategory description"],
      trim: true,
      maxLength: [
        500,
        "Subcategory description would be at most 500 characters",
      ],
    },

    // for thumbnail
    thumbnail: {
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

    // for tags
    tags: {
      type: [{ type: String, trim: true }],
      validate: {
        validator: function (value) {
          return value.length <= 5;
        },
        message: "Won't able to add more than 5 tags",
      },
    },

    // for categories
    category: {
      type: ObjectId,
      ref: "Category",
    },

    // for products
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],

    // for subcategory  time stamps
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

/* middleware for subcategory */
subcategorySchema.pre("save", function (next) {
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

/* create subcategory model schema */
const Subcategory = mongoose.model("Subcategory", subcategorySchema);

/* export subcategory schema */
module.exports = Subcategory;
