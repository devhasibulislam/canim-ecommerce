/**
 * Title: Write a program using JavaScript on Category Service
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

/* internal import */
const Category = require("../models/category.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");

/* add new category */
exports.addCategory = async (req, res) => {
  const { body, file } = req;

  const category = new Category({
    title: body.title,
    description: body.description,
    thumbnail: {
      url: file.path,
      public_id: file.filename,
    },
    keynotes: JSON.parse(body.keynotes),
    tags: JSON.parse(body.tags),
    creator: req.user._id,
  });

  const result = await category.save();

  await User.findByIdAndUpdate(result.creator, {
    $set: {
      category: result._id,
    },
  });

  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "Category created successfully",
  });
};

/* get all categories */
exports.getCategories = async (res) => {
  const categories = await Category.find();

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Categories fetched successfully",
    data: categories,
  });
};

/* get a category */
exports.getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Category fetched successfully",
    data: category,
  });
};

/* update category */
exports.updateCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  let updatedCategory = req.body;

  if (!req.body.thumbnail && req.file) {
    await remove(category.thumbnail.public_id);

    updatedCategory.thumbnail = {
      url: req.file.path,
      public_id: req.file.filename,
    };
  }

  updatedCategory.keynotes = JSON.parse(req.body.keynotes);
  updatedCategory.tags = JSON.parse(req.body.tags);

  await Category.findByIdAndUpdate(req.params.id, updatedCategory);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Category updated successfully",
  });
};

/* delete category */
exports.deleteCategory = async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  await remove(category.thumbnail.public_id);

  await Product.updateMany(
    { category: req.params.id },
    { $unset: { category: "" } }
  );
  await User.findByIdAndUpdate(category.creator, {
    $unset: { category: "" },
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Category deleted successfully",
  });
};
