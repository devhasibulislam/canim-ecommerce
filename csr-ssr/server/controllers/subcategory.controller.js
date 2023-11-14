/**
 * Title: Subcategory controller
 * Description: Controlling credentials based on subcategory
 * Author: Hasibul Islam
 * Date: 13/03/2023
 */

/* internal import */
const subcategoryService = require("../services/subcategory.service");

/* insert new subcategory */
exports.createSubcategory = async (req, res, next) => {
  try {
    const result = await subcategoryService.createSubcategory(req.body);

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "Successfully created new subcategory credentials",
      count: result.count,
      data: result.subcategories,
    });
  } catch (error) {
    next(error);
  }
};

/* display all subcategory */
exports.displaySubcategories = async (req, res, next) => {
  try {
    const result = await subcategoryService.displaySubcategories(req.query);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      count: result.length,
      description: "Successfully fetch all subcategory credentials",
      count: result.count,
      data: result.subcategories,
    });
  } catch (error) {
    next(error);
  }
};

/* display specific subcategory */
exports.displaySubcategory = async (req, res, next) => {
  try {
    const result = await subcategoryService.displaySubcategory(req.params);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Successfully fetch specific subcategory credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* update specific subcategory */
exports.updateSubcategory = async (req, res, next) => {
  try {
    const result = await subcategoryService.updateSubcategory(
      req.params.id,
      req.body
    );

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Successfully update specific subcategory credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* remove specific subcategory */
exports.removeSubcategory = async (req, res, next) => {
  try {
    const result = await subcategoryService.removeSubcategory(req.params);

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Successfully remove specific subcategory credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
