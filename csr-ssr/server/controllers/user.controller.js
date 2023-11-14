/**
 * Title: User controller
 * Description: Controlling credentials based on user
 * Author: Hasibul Islam
 * Date: 11/03/2023
 */

/* internal imports */
const userService = require("../services/user.service");

/* sign up an user */
exports.signUp = async (req, res, next) => {
  try {
    const result = await userService.signUp(req.body);

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description:
        "Successfully register new user credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* sign in an user */
exports.signIn = async (req, res, next) => {
  try {
    const result = await userService.signIn(req.body);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

/* forgot password of an user account */
exports.forgotPassword = async (req, res, next) => {
  try {
    const result = await userService.forgotPassword(req.body);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

// login persistency
exports.persistLogin = async (req, res, next) => {
  try {
    const result = await userService.persistLogin(req.user);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Successfully fetch user credentials for persistency",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// display all users
exports.displayUsers = async (req, res, next) => {
  try {
    const result = await userService.displayUsers(req.query);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Successfully fetch all user credentials",
      count: result.count,
      data: result.users,
    });
  } catch (error) {
    next(error);
  }
};

// display specific user
exports.displayUser = async (req, res, next) => {
  try {
    const result = await userService.displayUser(req.params);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Successfully fetch the user credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// update specific user
exports.updateUser = async (req, res, next) => {
  try {
    const result = await userService.updateUser(req.params.id, req.body);

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description:
        "Successfully updated user credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// remove specific user
exports.removeUser = async (req, res, next) => {
  try {
    const result = await userService.removeUser(req.params.id);

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description:
        "Successfully remove user credentials",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
