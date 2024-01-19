/**
 * Title: Write a program using JavaScript on Brand Service
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
const Brand = require("../models/brand.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");

/* add new brand */
exports.addBrand = async (req, res) => {
  const { body, file } = req;

  const brand = new Brand({
    title: body.title,
    description: body.description,
    logo: {
      url: file.path,
      public_id: file.filename,
    },
    keynotes: JSON.parse(body.keynotes),
    tags: JSON.parse(body.tags),
    creator: req.user._id,
  });

  const result = await brand.save();

  await User.findByIdAndUpdate(result.creator, {
    $set: { brand: result._id },
  });

  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "Brand created successfully",
  });
};

/* get all brands */
exports.getBrands = async (res) => {
  const brands = await Brand.find();

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Brands fetched successfully",
    data: brands,
  });
};

/* get a brand */
exports.getBrand = async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Brand fetched successfully",
    data: brand,
  });
};

/* update brand */
exports.updateBrand = async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  let updatedBrand = req.body;

  if (!req.body.logo && req.file) {
    await remove(brand.logo.public_id);

    updatedBrand.logo = {
      url: req.file.path,
      public_id: req.file.filename,
    };
  }

  updatedBrand.keynotes = JSON.parse(req.body.keynotes);
  updatedBrand.tags = JSON.parse(req.body.tags);

  await Brand.findByIdAndUpdate(req.params.id, updatedBrand);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Brand updated successfully",
  });
};

/* delete brand */
exports.deleteBrand = async (req, res) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);
  await remove(brand.logo.public_id);

  await Product.updateMany({ brand: req.params.id }, { $unset: { brand: "" } });
  await User.findByIdAndUpdate(brand.creator, {
    $unset: { brand: "" },
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Brand deleted successfully",
  });
};
