/**
 * Title: Category controller
 * Description: Controlling credentials based on category
 * Author: Hasibul Islam
 * Date: 11/03/2023
 */

/* internal import */
const categoryService = require("../services/category.service");

/* insert new category */
exports.createCategory = async (req, res, next) => {
  try {
    const result = await categoryService.createCategory(req.body);

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "Successfully created new category credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* display all category */
exports.displayCategories = async (req, res, next) => {
  try {
    const result = await categoryService.displayCategories(req.query);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      count: result.length,
      description: "Successfully fetch all category's credentials",
      count: result.count,
      data: result.categories,
    });
  } catch (error) {
    next(error);
  }
};

/* display specific category */
exports.displayCategory = async (req, res, next) => {
  try {
    const result = await categoryService.displayCategory(req.params);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Successfully fetch specific category credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* update specific category */
exports.updateCategory = async (req, res, next) => {
  try {
    const result = await categoryService.updateCategory(
      req.params.id,
      req.body
    );

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Successfully update specific category credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* remove specific category */
exports.removeCategory = async (req, res, next) => {
  try {
    const result = await categoryService.removeCategory(req.params);

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Successfully remove specific category credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
