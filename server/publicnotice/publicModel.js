const mongoose = require("mongoose");

const publicSchema = mongoose.Schema({
  title: { type: String, default: null },
  message: { type: String, default: null },
  createdAt: { type: Date, default: Date.now() },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model("public", publicSchema);