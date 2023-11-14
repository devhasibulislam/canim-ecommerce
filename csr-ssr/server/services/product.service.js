/**
 * Title: Product service
 * Description: Servicing credentials based on service
 * Author: Hasibul Islam
 * Date: 13/03/2023
 */

/* internal import */
const Brand = require("../models/brand.model");
const Product = require("../models/product.model");
const Subcategory = require("../models/subcategory.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");

// remove gallery
async function galleryRemove(gallery) {
  gallery.forEach(async (gal) => await remove(gal.public_id));
}

// product gallery update
exports.galleryUpdate = async ({ pid }) => {
  const product = await Product.findById(pid);
  if (product.gallery.length) galleryRemove(product.gallery);
};

/* insert new product */
exports.createProduct = async (data) => {
  const result = await Product.create(data);
  await Subcategory.findByIdAndUpdate(result.subcategory, {
    $push: { products: result._id },
  });
  await Brand.findByIdAndUpdate(result.brand, {
    $push: { products: result._id },
  });
  return result;
};

/* display all products */
exports.displayProducts = async ({ page, limit }) => {
  const result = await Product.find({})
    .skip((Number(page) - 1) * limit)
    .limit(limit)
    .sort("-updatedAt")
    .populate([
      {
        path: "subcategory",
        select: "title",
      },
      {
        path: "brand",
        select: "title",
      },
      {
        path: "store",
        select: "title",
      },
    ]);

  const count = await Product.estimatedDocumentCount();
  return { products: result, count };
};

/* display specific product */
exports.displayProduct = async ({ id }) => {
  return await Product.findById(id).populate([
    {
      path: "subcategory",
      select: "title description tags thumbnail",
      populate: {
        path: "category",
        select: "title",
      },
    },
    {
      path: "brand",
      select: "title description tags logo location",
    },
    {
      path: "store",
      select: "title description tags thumbnail",
      populate: {
        path: "seller",
        select: "name",
      },
    },
    {
      path: "review.reviewer",
      select: "name avatar",
    },
  ]);
};

/* update specific product */
exports.updateProduct = async (id, data) => {
  if (Object.keys(data).includes("review")) {
    return await Product.findByIdAndUpdate(
      id,
      { $push: { review: data.review } },
      {
        returnOriginal: false,
        runValidators: true,
      }
    );
  }

  return await Product.findByIdAndUpdate(id, data, {
    returnOriginal: false,
    runValidators: true,
  });
};

/* remove specific product */
exports.removeProduct = async ({ id }) => {
  const result = await Product.findByIdAndDelete(id);
  if (result.gallery.length) {
    // remove thumbnail
    remove(result.thumbnail.public_id);

    // remove gallery
    galleryRemove(result.gallery);
  }

  // remove from user cart
  const users = await User.find({
    cart: { $elemMatch: { product: result._id } },
  });
  users.forEach(
    async (user) =>
      await User.findByIdAndUpdate(user._id, {
        $pull: { cart: { product: result._id } },
      })
  );

  // remove from subcategory
  await Subcategory.findByIdAndUpdate(result.subcategory, {
    $pull: { products: result._id },
  });

  // remove from brand
  await Brand.findByIdAndUpdate(result.brand, {
    $pull: { products: result._id },
  });

  return result;
};

/**
 * How to search in array of object in MongoDB?
 * https://www.tutorialspoint.com/how-to-search-in-array-of-object-in-mongodb
 */
