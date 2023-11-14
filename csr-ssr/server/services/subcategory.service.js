/**
 * Title: Subcategory service
 * Description: Servicing credentials based on subcategory
 * Author: Hasibul Islam
 * Date: 13/03/2023
 */

/* internal import */
const Category = require("../models/category.model");
const Product = require("../models/product.model");
const Subcategory = require("../models/subcategory.model");
const remove = require("../utils/remove.util");

/* insert new category */
exports.createSubcategory = async (data) => {
  const result = await Subcategory.create(data);
  await Category.findByIdAndUpdate(result.category, {
    $push: { subcategories: result._id },
  });

  return result;
};

/* display all category */
exports.displaySubcategories = async ({ page, limit }) => {
  const result = await Subcategory.find({})
    .skip((Number(page) - 1) * limit)
    .limit(limit)
    .sort("-updatedAt")
    .populate({
      path: "category",
      select: "title",
    });

  const count = await Subcategory.estimatedDocumentCount();
  return { subcategories: result, count };
};

/* display specific category */
exports.displaySubcategory = async ({ id }) => {
  return await Subcategory.findById(id);
};

/* update specific category */
exports.updateSubcategory = async (id, data) => {
  return await Subcategory.findByIdAndUpdate(id, data, {
    runValidators: true,
    returnOriginal: false,
  });
};

/* remove specific category */
exports.removeSubcategory = async ({ id }) => {
  const result = await Subcategory.findByIdAndDelete(id);
  await remove(result.thumbnail.public_id);

  // remove from product
  result.products.forEach(async (product) => {
    await Product.findByIdAndUpdate(product, {
      $unset: { subcategory: result._id },
    });
  });

  // remove from category
  await Category.findByIdAndUpdate(result.category, {
    $pull: { subcategories: result._id },
  });

  return result;
};
