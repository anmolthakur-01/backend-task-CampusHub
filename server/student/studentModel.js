const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref:"user", default: null},
  studentName: { type: String, default: null },
  fatherName: { type: String, default: null },
  motherName: { type: String, default: null },
  studentClass: { type: String, default: null },
  studentEmail: { type: String, default: null },
  password: { type: String, default: null },
  contactNumber: { type: String, default: null },
  gender: { type: String, default: null },
  dateOfBirth: { type: String, default: null },
  studentId: { type: String, default: null },
  studentPhoto: { type: String, default: "no_image.jpg" },
  createdAt: { type: Date, default: Date.now() },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model("student", studentSchema);
