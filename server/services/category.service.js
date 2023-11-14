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
  });

  await category.save();

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

/* update category */
exports.updateCategory = async (req, res) => {
  if (req.body.trashable) {
    await Category.findByIdAndUpdate(req.params.id, req.body);
  } else {
    if (req.body.oldThumbnail) {
      const {
        body: { oldThumbnail, ...otherInformation },
        file,
      } = req;

      await remove(oldThumbnail);

      await Category.findByIdAndUpdate(req.params.id, {
        title: otherInformation.title,
        description: otherInformation.description,
        keynotes: JSON.parse(otherInformation.keynotes),
        tags: JSON.parse(otherInformation.tags),
        thumbnail: {
          url: file.path,
          public_id: file.filename,
        },
      });
    } else {
      await Category.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        keynotes: JSON.parse(req.body.keynotes),
        tags: JSON.parse(req.body.tags),
      });
    }
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Category updated successfully",
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
