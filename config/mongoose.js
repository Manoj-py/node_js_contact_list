const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/contact_list_db");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to the db"));
db.once("open", function () {
  console.log("sucessfully contected to db");
});
