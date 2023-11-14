/**
 * Title: Store controller
 * Description: Controller that consume store based credentials
 * Author: Hasibul Islam
 * Date: 15/03/2023
 */

/* internal import */
const storeService = require("../services/store.service");

/* insert new store */
exports.createStore = async (req, res, next) => {
  try {
    const result = await storeService.createStore(req.body);

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "Successfully created new store credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* display all store */
exports.displayStores = async (req, res, next) => {
  try {
    const result = await storeService.displayStores(req.query);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      count: result.length,
      description: "Successfully fetch all stores credentials",
      count: result.count,
      data: result.stores,
    });
  } catch (error) {
    next(error);
  }
};

/* display specific store */
exports.displayStore = async (req, res, next) => {
  try {
    const result = await storeService.displayStore(req.params);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Successfully fetch specific store credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* update specific store */
exports.updateStore = async (req, res, next) => {
  try {
    const result = await storeService.updateStore(req.params.id, req.body);

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Successfully update specific store credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* remove specific store */
exports.removeStore = async (req, res, next) => {
  try {
    const result = await storeService.removeStore(req.params);

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Successfully remove specific store credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
