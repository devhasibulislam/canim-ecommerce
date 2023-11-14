/**
 * Title: Create brand controller
 * Description: Controlling credentials based on brand
 * Author: Hasibul Islam
 * Date: 14/03/2023
 */

/* internal import */
const brandService = require("../services/brand.service");

/* insert new brand */
exports.createBrand = async (req, res, next) => {
  try {
    const result = await brandService.createBrand(req.body);

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "Successfully created new brand credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* display all brands */
exports.displayBrands = async (req, res, next) => {
  try {
    const result = await brandService.displayBrands(req.query);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      count: result.length,
      description: "Successfully fetch all brand credentials",
      count: result.count,
      data: result.brands,
    });
  } catch (error) {
    next(error);
  }
};

/* display specific brand */
exports.displayBrand = async (req, res, next) => {
  try {
    const result = await brandService.displayBrand(req.params);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Successfully fetch specific brand credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* update specific brand */
exports.updateBrand = async (req, res, next) => {
  try {
    const result = await brandService.updateBrand(req.params.id, req.body);

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Successfully update specific brand credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* remove specific brand */
exports.removeBrand = async (req, res, next) => {
  try {
    const result = await brandService.removeBrand(req.params);

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Successfully remove specific brand credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
