/**
 * Title: Write a program using JavaScript on Purchase Service
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
 * Date: 09, January 2024
 */

const Purchase = require("../models/purchase.model");

// get all purchases
async function getAllPurchases(res) {
  const purchases = await Purchase.find().populate([
    "customer",
    "products.product",
  ]);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Purchases fetched successfully",
    data: purchases,
  });
}

// update purchase status
async function updatePurchaseStatus(req, res) {
  await Purchase.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        status: req.body.status,
      },
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Purchase status updated successfully",
  });
}

module.exports = {
  getAllPurchases,
  updatePurchaseStatus,
};
