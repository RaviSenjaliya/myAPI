const mongoose = require("mongoose");

const userAddress = mongoose.model(
  "userAddress",
  new mongoose.Schema({
    address1: String,
    address2: String,
    city: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  })
);

module.exports = userAddress;
