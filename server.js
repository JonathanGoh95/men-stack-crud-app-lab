const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const mongoose = require("mongoose");
const Car = require("./models/car");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/new", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Car.create(req.body);
    res.send("<h1>Car Created.</h1>");
    await mongoose.disconnect();
  } catch (err) {
    res.status(500).send("<h1>Error creating car.</h1>");
  }
});

// Listen for requests on port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
