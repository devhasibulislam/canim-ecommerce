/**
 * Title: Write a program using JavaScript on Index
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 09, November 2023
 */

/* external imports */
const mongoose = require("mongoose");
require("dotenv").config();

/* internal imports */
const app = require("./app");
const consoleMessage = require("./utils/console.util");
const port = process.env.PORT || 3000;

/* database connection */
mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => consoleMessage.successMessage("Connected to MongoDB."))
  .catch((error) => consoleMessage.errorMessage(error.message));

/* establish server port */
app.listen(port, () => {
  consoleMessage.warningMessage(`Server is running on port ${port}.`);
});
