/**
 * Title: Write a program using JavaScript on Product Service
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
const Product = require("../models/product.model");
const Category = require("../models/category.model");
const Store = require("../models/store.model");
const Brand = require("../models/brand.model");
const remove = require("../utils/remove.util");
const Review = require("../models/review.model");
const User = require("../models/user.model");

/* add new product */
exports.addProduct = async (req, res) => {
  const { features, campaign, variations, ...otherInformation } = req.body;
  let thumbnail = null;
  let gallery = [];

  const parsedFeatures = JSON.parse(features);
  const parsedCampaign = JSON.parse(campaign);
  const parsedVariations = JSON.parse(variations);

  if (req.files.thumbnail.length) {
    thumbnail = {
      url: req.files.thumbnail[0].path,
      public_id: req.files.thumbnail[0].filename,
    };
  }

  if (req.files.gallery.length) {
    gallery = req.files.gallery.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));
  }

  const product = await Product.create({
    ...otherInformation,
    features: parsedFeatures,
    campaign: parsedCampaign,
    variations: parsedVariations,
    thumbnail,
    gallery,
  });

  // add product id to category, brand and store
  await Category.findByIdAndUpdate(product.category, {
    $push: { products: product._id },
  });
  await Brand.findByIdAndUpdate(product.brand, {
    $push: { products: product._id },
  });
  await Store.findByIdAndUpdate(product.store, {
    $push: { products: product._id },
  });

  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "Product created successfully",
  });
};

/* get all products */
exports.getProducts = async (res) => {
  const products = await Product.find().populate([
    "category",
    "brand",
    "store",
    {
      path: "reviews",
      options: { sort: { updatedAt: -1 } },
      populate: [
        "reviewer",
        {
          path: "product",
          populate: ["brand", "category", "store"],
        },
      ],
    },
    "buyers",
  ]);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Products fetched successfully",
    data: products,
  });
};

/* get a single product */
exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate([
    "category",
    "brand",
    "store",
    {
      path: "reviews",
      options: { sort: { updatedAt: -1 } },
      populate: [
        "reviewer",
        {
          path: "product",
          populate: ["brand", "category", "store"],
        },
      ],
    },
  ]);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Product fetched successfully",
    data: product,
  });
};

/* filtered products */
exports.getFilteredProducts = async (req, res) => {
  try {
    let filter = {};

    if (req.body && Object.keys(req.body).length > 0) {
      if (req.body.categories && req.body.categories.length > 0) {
        filter.category = { $in: req.body.categories };
      }

      if (req.body.brands && req.body.brands.length > 0) {
        filter.brand = { $in: req.body.brands };
      }

      if (req.body.stores && req.body.stores.length > 0) {
        filter.store = { $in: req.body.stores };
      }
    }

    const products = await Product.find(filter).populate([
      "category",
      "brand",
      "store",
    ]);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "Filtered products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      acknowledgement: false,
      message: "Internal Server Error",
      description: "Failed to fetch filtered products",
      error: error.message,
    });
  }
};

/* update product */
exports.updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const updatedProduct = req.body;

  if (!req.body.thumbnail && req.files && req.files.thumbnail?.length > 0) {
    remove(product.thumbnail.public_id);

    updatedProduct.thumbnail = {
      url: req.files.thumbnail[0].path,
      public_id: req.files.thumbnail[0].filename,
    };
  }

  if (
    !req.body.gallery?.length > 0 &&
    req.files &&
    req.files.gallery?.length > 0
  ) {
    for (let i = 0; i < product.gallery.length; i++) {
      await remove(product.gallery[i].public_id);
    }

    updatedProduct.gallery = req.files.gallery.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));
  }

  updatedProduct.features = JSON.parse(req.body.features);
  updatedProduct.campaign = JSON.parse(req.body.campaign);
  updatedProduct.variations = JSON.parse(req.body.variations);

  await Product.findByIdAndUpdate(req.params.id, { $set: updatedProduct });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Product updated successfully",
  });
};

/* delete product */
exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  // delete product thumbnail & gallery
  if (product.thumbnail) {
    await remove(product.thumbnail.public_id);
  }

  if (product.gallery && product.gallery.length > 0) {
    for (let i = 0; i < product.gallery.length; i++) {
      await remove(product.gallery[i].public_id);
    }
  }

  // also delete from category, brand & store
  await Category.findByIdAndUpdate(product.category, {
    $pull: { products: product._id },
  });
  await Brand.findByIdAndUpdate(product.brand, {
    $pull: { products: product._id },
  });
  await Store.findByIdAndUpdate(product.store, {
    $pull: { products: product._id },
  });

  // delete this product from users products array
  await User.updateMany(
    { products: product._id },
    { $pull: { products: product._id } }
  );

  // delete reviews that belong to this product also remove those reviews from users reviews array
  await Review.deleteMany({ product: product._id });
  await User.updateMany(
    { reviews: { $in: product.reviews } },
    { $pull: { reviews: { $in: product.reviews } } }
  );

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Product deleted successfully",
  });
};
