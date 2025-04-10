const mongoose = require("mongoose");

const classSchema = mongoose.Schema({
  className: { type: String, default: null },
  section: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model("class", classSchema);
