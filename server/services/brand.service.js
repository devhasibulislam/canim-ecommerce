/**
 * Title: Write a program using JavaScript on Brand Service
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

/* internal import */
const Brand = require("../models/brand.model");
const remove = require("../utils/remove.util");

/* add new brand */
exports.addBrand = async (req, res) => {
  const { body, file } = req;

  const brand = new Brand({
    title: body.title,
    description: body.description,
    logo: {
      url: file.path,
      public_id: file.filename,
    },
    keynotes: JSON.parse(body.keynotes),
    tags: JSON.parse(body.tags),
  });

  await brand.save();

  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "Brand created successfully",
  });
};

/* get all brands */
exports.getBrands = async (res) => {
  const brands = await Brand.find();

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Brands fetched successfully",
    data: brands,
  });
};

/* update brand */
exports.updateBrand = async (req, res) => {
  if (req.body.trashable) {
    await Brand.findByIdAndUpdate(req.params.id, req.body);
  } else {
    if (req.body.oldLogo) {
      const {
        body: { oldLogo, ...otherInformation },
        file,
      } = req;

      await remove(oldLogo);

      await Brand.findByIdAndUpdate(req.params.id, {
        title: otherInformation.title,
        description: otherInformation.description,
        keynotes: JSON.parse(otherInformation.keynotes),
        tags: JSON.parse(otherInformation.tags),
        logo: {
          url: file.path,
          public_id: file.filename,
        },
      });
    } else {
      await Brand.findByIdAndUpdate(req.params.id, {
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
    description: "Brand updated successfully",
  });
};

/* get a brand */
exports.getBrand = async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Brand fetched successfully",
    data: brand,
  });
};
