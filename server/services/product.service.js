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

/* add new product */
exports.addProduct = async (req, res) => {
  const { features, campaign, variations, ...otherInformation } = req.body;
  let thumbnail = null;
  let gallery = [];

  const parsedFeatures = JSON.parse(features);
  const parsedCampaign = JSON.parse(campaign);
  const parsedVariations = JSON.parse(variations);

  if (req.files.thumbnail) {
    thumbnail = {
      url: req.files.thumbnail[0].path,
      public_id: req.files.thumbnail[0].filename,
    };
  }

  if (req.files) {
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
  ]);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Products fetched successfully",
    data: products,
  });
};

/* update product */
exports.updateProduct = async (req, res) => {
  let productInformation = {};

  const {
    body: {
      oldThumbnail,
      oldGallery,
      features,
      campaign,
      variations,
      ...otherInformation
    },
    files,
  } = req;

  if (req.body.trashable) {
    await Product.findByIdAndUpdate(req.params.id, req.body);
  } else {
    if (oldThumbnail) {
      await remove(oldThumbnail);
      productInformation.thumbnail = {
        url: files.thumbnail[0].path,
        public_id: files.thumbnail[0].filename,
      };
    }

    if (oldGallery?.length > 0) {
      for (let i = 0; i < oldGallery.length; i++) {
        await remove(oldGallery[i]);
      }
      productInformation.gallery = files.gallery.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
    }

    productInformation = {
      ...otherInformation,
      features: JSON.parse(features),
      campaign: JSON.parse(campaign),
      variations: JSON.parse(variations),
      ...productInformation,
    };

    await Product.findByIdAndUpdate(req.params.id, productInformation);
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Product updated successfully",
  });
};

/* get a single product */
exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate([
    "category",
    "brand",
    "store",
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
