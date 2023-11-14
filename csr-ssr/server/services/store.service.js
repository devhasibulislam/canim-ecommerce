/**
 * Title: Store service
 * Description: Service that consume store based credentials
 * Author: Hasibul Islam
 * Date: 15/03/2023
 */

/* internal import */
const Store = require("../models/store.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");

/* insert new store */
exports.createStore = async (data) => {
  const result = await Store.create(data);
  await User.findByIdAndUpdate(result.seller, { $set: { store: result._id } });

  return result;
};

/* display all store */
exports.displayStores = async ({ page, limit }) => {
  const result = await Store.find({})
    .skip((Number(page) - 1) * limit)
    .limit(limit)
    .sort("-updatedAt").populate({
      path: "seller",
      select: "name",
    });

  const count = await Store.estimatedDocumentCount();
  return { stores: result, count };
};

/* display specific store */
exports.displayStore = async ({ id }) => {
  return await Store.findById(id);
};

/* update specific store */
exports.updateStore = async (id, data) => {
  return await Store.findByIdAndUpdate(id, data, {
    returnOriginal: false,
    runValidators: true,
  });
};

/* remove specific store */
exports.removeStore = async ({ id }) => {
  const result = await Store.findByIdAndDelete(id);
  await remove(result.thumbnail.public_id);

  await User.findByIdAndUpdate(result.seller, {
    $unset: { store: result._id },
  });

  return result;
};
