/**
 * Title: Driver segment of this project
 * Description: All driver level task execute here
 * Author: Hasibul Islam
 * Date: 10/03/2023
 */

/* external import */
const mongoose = require("mongoose");

/* internal imports */
const app = require("./app");
const consoleMessage = require("./utils/console.util");

/* database connection */
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.ATLAS_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => consoleMessage.successMessage("DB connection established."))
  .catch((error) => consoleMessage.errorMessage(error.message));

/* establish server port */
app.listen(process.env.PORT, () => {
  consoleMessage.successMessage(`App listening on ${process.env.PORT}.`);
});
