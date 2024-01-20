/**
 * Title: Write a program using JavaScript on Store Service
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

/* internal imports */
const Product = require("../models/product.model");
const Store = require("../models/store.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");

/* add new store */
exports.addStore = async (req, res) => {
  const { body, file } = req;

  const store = new Store({
    title: body.title,
    description: body.description,
    thumbnail: {
      url: file.path,
      public_id: file.filename,
    },
    keynotes: JSON.parse(body.keynotes),
    tags: JSON.parse(body.tags),
    owner: req.user._id,
  });

  const result = await store.save();

  await User.findByIdAndUpdate(result.owner, {
    $set: { store: result._id },
  });

  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "Store created successfully",
  });
};

/* get all stores */
exports.getStores = async (res) => {
  const stores = await Store.find().populate([
    "owner",
    {
      path: "products",
      populate: ["category", "brand", "store"],
    },
  ]);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Stores fetched successfully",
    data: stores,
  });
};

/* get a store */
exports.getStore = async (req, res) => {
  const store = await Store.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Store fetched successfully",
    data: store,
  });
};

/* update store */
exports.updateStore = async (req, res) => {
  const store = await Store.findByIdAndUpdate(req.params.id, req.body);
  const updatedStore = req.body;

  if (!req.body.thumbnail && req.file) {
    await remove(store.thumbnail.public_id);

    updatedStore.thumbnail = {
      url: req.file.path,
      public_id: req.file.filename,
    };
  }

  updatedStore.keynotes = JSON.parse(req.body.keynotes);
  updatedStore.tags = JSON.parse(req.body.tags);

  await Store.findByIdAndUpdate(req.params.id, updatedStore);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Store updated successfully",
  });
};

/* delete store */
exports.deleteStore = async (req, res) => {
  const store = await Store.findByIdAndDelete(req.params.id);
  await remove(store.thumbnail.public_id);

  await Product.updateMany({ store: req.params.id }, { $unset: { store: "" } });
  await User.findByIdAndUpdate(store.owner, {
    $unset: { store: "" },
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Store deleted successfully",
  });
};
