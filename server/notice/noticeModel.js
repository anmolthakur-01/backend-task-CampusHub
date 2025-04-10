const mongoose = require("mongoose");

const noticeSchema = mongoose.Schema({
  title: { type: String, default: null },
  noticeFor: { type: String, default: null },
  message: { type: String, default: null },
  createdAt: { type: Date, default: Date.now() },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model("notice", noticeSchema);
