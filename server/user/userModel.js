const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
//   name: { type: String, default: null },
  email: { type: String, default: null },
  password: { type: String, default: null },
  userType: { type: String, default: 2 }, // 1.admin 2.student
  createdAt: { type: Date, default: Date.now() },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model("user", userSchema);
