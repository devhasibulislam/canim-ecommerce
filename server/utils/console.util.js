/**
 * Title: Write a program using JavaScript on Console Util
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
 * Date: 09, November 2023
 */

/* external import */
const colors = require("colors");

/* set colors as theme */
colors.setTheme({
  success: "cyan",
  error: "red",
  warning: "yellow",
});

exports.successMessage = (message) => {
  console.log(`[Success] - ${message}`.success);
};

exports.warningMessage = (message) => {
  console.log(`[Warning] - ${message}`.warning.italic);
};

exports.errorMessage = (message) => {
  console.log(`[Error] - ${message}`.error.bold.italic);
};
