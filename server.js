const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

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
    const newCar = await Car.create(req.body);
    await mongoose.disconnect();
    res.redirect(`/cars/${newCar._id}`);
  } catch (err) {
    res.status(500).send("<h1>Error creating car.</h1>");
  }
});

app.get("/cars/:carId", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const car = await Car.findById(req.params.carId);
    await mongoose.disconnect();
    if (!car) {
      return res.status(404).send("<h1>Car not found.</h1>");
    }
    res.render("created-car", { car });
  } catch (err) {
    res.status(500).send("<h1>Error loading car details.</h1>");
  }
});

app.get("/cars", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const cars = await Car.find({});
    res.render("cars", { cars });
    await mongoose.disconnect();
  } catch (err) {
    res.status(500).send("<h1>Error reading list.</h1>");
  }
});

app.get("/cars/update", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const cars = await Car.find({});
    res.render("update", { cars });
    await mongoose.disconnect();
  } catch (err) {
    res.status(500).send("<h1>Error reading list.</h1>");
  }
});

app.get("/cars/update/:carId", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const car = await Car.findById(req.params.carId);
    await mongoose.disconnect();
    if (!car) {
      return res.status(404).send("<h1>Car not found.</h1>");
    }
    res.render("update-car", { car });
  } catch (err) {
    res.status(500).send("<h1>Error loading car for update.</h1>");
  }
});

app.put("/cars/update/:carId", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const carId = req.params.carId;
    const updatedCar = await Car.findByIdAndUpdate(carId, req.body, {
      new: true,
    });
    await mongoose.disconnect();
    res.render("updated-car", { updatedCar });
  } catch (err) {
    res.status(500).send("<h1>Error updating car.</h1>");
  }
});

/* app.get("/cars/delete", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const cars = await Car.find({});
    res.render("delete", { cars });
    await mongoose.disconnect();
  } catch (err) {
    res.status(500).send("<h1>Error reading list.</h1>");
  }
});

app.delete("/cars/delete/:carId", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const carId = req.params.carId;
    const deletedCar = await Car.findByIdAndDelete(carId, req.body, {
      new: true,
    });
    await mongoose.disconnect();
    res.render("deleted-car", { deletedCar });
  } catch (err) {
    res.status(500).send("<h1>Error deleting car.</h1>");
  }
}); */

// Listen for requests on port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
