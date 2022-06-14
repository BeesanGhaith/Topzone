const mongoose = require("mongoose");

// connecting mongoose
mongoose.connect("mongodb://localhost:27017/topzone").then(
  () => {
    console.log("DB Ready To Use");
  },
  (err) => {
    console.log(err);
  }
);