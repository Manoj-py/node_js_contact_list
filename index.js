const express = require("express");
const path = require("path");
const port = 8000;
const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "assets")));

// const contactList = [
//   { name: "Manoj", number: "9066562565" },
//   { name: "Mounisha", number: "7975742470" },
//   { name: "Roopa", number: "9686896375" },
// ];

app.get("/", function (req, res) {
  Contact.find({}).then((contactList) => {
    res.render("home", {
      title: "Contacts Manager",
      contact_list: contactList,
    });
  });
});

app.get("/profile", function (req, res) {
  res.render("profile");
});

app.get("/delete-contact", async function (req, res) {
  const id = req.query.id;
  const deleted = await Contact.findByIdAndDelete(id);
  return res.redirect("back");
});

app.post("/create-contact", function (req, res) {
  Contact.create(
    {
      name: req.body.name,
      number: req.body.number,
    },
    res.redirect("back")
  );
});

app.listen(port, function (err) {
  if (err) {
    console.log("An Error occured in connecting to the server");
  } else {
    console.log("The Server Is Up And Running");
  }
});
