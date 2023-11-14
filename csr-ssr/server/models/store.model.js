/**
 * Title: Create store schema
 * Description: Schema that consume store based credentials
 * Author: Hasibul Islam
 * Date: 15/03/2023
 */

/* external import */
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
      maxLength: [100, "store name would be at most 100 characters"],
    },

    // for description
    description: {
      type: String,
      required: [true, "Please, provide store description"],
      trim: true,
      maxLength: [1000, "store description would be at most 1000 characters"],
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

    // for seller
    seller: {
      type: ObjectId,
      ref: "User",
    },

    // for status
    status: {
      type: String,
      enum: {
        values: ["active", "inactive"],
        message: "Invalid status, choose active/inactive",
      },
      default: "active",
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
