/**
 * Title: Product controller
 * Description: Controlling credentials based on product
 * Author: Hasibul Islam
 * Date: 13/03/2023
 */

/* internal import */
const productService = require("../services/product.service");

// product gallery upload
exports.galleryUpload = async (req, res, next) => {
  try {
    const result = req.files;

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "Gallery upload successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// product gallery update
exports.galleryUpdate = async (req, res, next) => {
  try {
    await productService.galleryUpdate(req.query);
    const result = req.files;

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Gallery update successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* create new product */
exports.createProduct = async (req, res, next) => {
  try {
    const result = await productService.createProduct(req.body);

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "Successfully created new product credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* display all product */
exports.displayProducts = async (req, res, next) => {
  try {
    const result = await productService.displayProducts(req.query);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Successfully fetch all product credentials",
      count: result.count,
      data: result.products,
    });
  } catch (error) {
    next(error);
  }
};

/* display specific product */
exports.displayProduct = async (req, res, next) => {
  try {
    const result = await productService.displayProduct(req.params);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Successfully fetch specific product credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* update specific product */
exports.updateProduct = async (req, res, next) => {
  try {
    const result = await productService.updateProduct(req.params.id, req.body);

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Successfully update specific product credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* remove specific product */
exports.removeProduct = async (req, res, next) => {
  try {
    const result = await productService.removeProduct(req.params);

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Successfully remove specific product credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
