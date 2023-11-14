/**
 * Title: Create brand service
 * Description: Servicing credentials based on brand
 * Author: Hasibul Islam
 * Date: 14/03/2023
 */

/* internal import */
const Brand = require("../models/brand.model");
const Product = require("../models/product.model");
const remove = require("../utils/remove.util");

/* insert new brand */
exports.createBrand = async (data) => {
  const result = await Brand.create(data);
  return result;
};

/* display all brands */
exports.displayBrands = async ({ page, limit }) => {
  const result = await Brand.find({})
    .skip((Number(page) - 1) * limit)
    .limit(limit)
    .sort("-updatedAt");

  const count = await Brand.estimatedDocumentCount();
  return { brands: result, count };
};

/* display specific brand */
exports.displayBrand = async ({ id }) => {
  return await Brand.findById(id);
};

/* update specific brand */
exports.updateBrand = async (id, data) => {
  const result = await Brand.findByIdAndUpdate(id, data, {
    runValidators: true,
    returnOriginal: false,
  });
  return result;
};

/* remove specific brand */
exports.removeBrand = async ({ id }) => {
  const result = await Brand.findByIdAndDelete(id);
  await remove(result.logo.public_id);

  // remove from product
  result.products.forEach(async (product) => {
    await Product.findByIdAndUpdate(product, { $unset: { brand: result._id } });
  });

  return result;
};
