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
    seller: JSON.parse(body.seller),
  });

  await store.save();

  await User.findByIdAndUpdate(store.seller, {
    $set: { store: store._id },
  });

  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "Store created successfully",
  });
};

/* get all stores */
exports.getStores = async (req, res) => {
  const stores = await Store.find();

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Stores fetched successfully",
    data: stores,
  });
};

/* update store */
exports.updateStore = async (req, res) => {
  if (req.body.trashable) {
    await Store.findByIdAndUpdate(req.params.id, req.body);
  } else {
    if (req.body.oldThumbnail) {
      const {
        body: { oldThumbnail, ...otherInformation },
        file,
      } = req;

      await remove(oldThumbnail);

      await Store.findByIdAndUpdate(req.params.id, {
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
      await Store.findByIdAndUpdate(req.params.id, {
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
    description: "Store updated successfully",
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
