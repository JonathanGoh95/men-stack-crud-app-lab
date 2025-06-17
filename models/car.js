const mongoose = require("mongoose"); // Import Mongoose

const { model, Schema } = mongoose;

const carSchema = new Schema({
  make: String,
  model: String,
  colour: String,
  year: Number,
});

const Car = model("Car", carSchema);

module.exports = Car;
