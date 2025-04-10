const mongoose = require("mongoose");

const homeworkSchema = mongoose.Schema({
  title: { type: String, default: null },
  homeworkFor: { type: String, default: null },
  description: { type: String, default: null },
  dateOfSubmission: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model("homework", homeworkSchema);
