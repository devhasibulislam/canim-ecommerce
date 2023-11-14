/**
 * Title: Server error handler
 * Description: Able to handle whole server error weather create from any where
 * Author: Hasibul Islam
 * Date: 11/03/2023
 */

function error(err, req, res, next) {
  // here req and next can't be visible

  res.send({
    acknowledgement: false,
    message: err.name,
    description: err.message,
  });
}

module.exports = error;
