const Student = require("./studentModel");
const User = require("../user/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const privateKey = "@#97$787@5#8#$";

const add = (req, res) => {
  // var validationerror = [];
  // if (!req.body.studentName) validationerror.push("studentName is required.");
  // if (!req.body.fatherName) validationerror.push("fatherName is required.");
  // if (!req.body.motherName) validationerror.push("motherName is required.");
  // if (!req.body.studentClass) validationerror.push("studentClass is required.");
  // if (!req.body.email) validationerror.push("email is required.");
  // if (!req.body.password) validationerror.push("password is required.");
  // if (!req.body.contactNumber)
  //   validationerror.push("contactNumber is required.");
  // if (!req.body.gender) validationerror.push("gender is required.");
  // if (!req.body.dateOfBirth) validationerror.push("dateOfBirth is required.");
  // if (!req.body.studentId) validationerror.push("studentId is required.");
  // if (!req.body.studentPhoto) validationerror.push("studentPhoto is required.");
  // if (validationerror.length > 0) {
  //   res.send({
  //     status: 420,
  //     success: false,
  //     message: "Data not found!",
  //     error: validationerror,
  //   });
  // }
  if (
    !req.body.studentName ||
    !req.body.fatherName ||
    !req.body.motherName ||
    !req.body.studentClass ||
    !req.body.email ||
    !req.body.password ||
    !req.body.contactNumber ||
    !req.body.gender ||
    !req.body.dateOfBirth ||
    !req.body.studentId ||
    !req.body.studentPhoto
  ) {
    res.send({
      status: 420,
      success: false,
      message: "All fields are required!",
    });
    
  }

  User.findOne({ email: req.body.email })
    .then((studentData) => {
      if (!studentData) {
        let userObj = new User();
        userObj.email = req.body.email;
        userObj.userType = 2;
        userObj.password = bcrypt.hashSync(req.body.password, saltRounds);
        userObj.save()
        .then((studentSave) => {
          let studentObj = new Student();
          studentObj.studentName = req.body.studentName;
          studentObj.fatherName = req.body.fatherName;
          studentObj.motherName = req.body.motherName;
          studentObj.studentClass = req.body.studentClass;
          studentObj.email = req.body.email;
          studentObj.password = bcrypt.hashSync(req.body.password, saltRounds);
          studentObj.contactNumber = req.body.contactNumber;
          studentObj.gender = req.body.gender;
          studentObj.dateOfBirth = req.body.dateOfBirth;
          studentObj.studentId = req.body.studentId;
          studentObj.studentPhoto = "student-images/" + req.body.studentPhoto;
          studentObj.userId = req.body.userId;
          studentObj
            .save()
            .then((studentData) => {
              if (!studentData) {
                res.send({
                  status: 420,
                  success: false,
                  message: "Failed to save student data!",
                });
              } else {
                res.send({
                  status: 200,
                  success: true,
                  message: "Student data saved successfully!",
                  data: studentData,
                });
              }
            })
            .catch((err) => {
              res.send({
                status: false,
                message: "Internal server error!",
                error: err.message,
              });
            });
        });
      } else {
        res.send({
          status: false,
          message: "Record is already exist",
        });
      }
    })
    .catch((err) => {
      res.send({
        status: false,
        message: "Internal server error!",
        error: err.message,
      });
    });
};

const login = (req, res) => {
  var validationerror = [];
  if (!req.body.email) validationerror.push("email is required");
  if (!req.body.password) validationerror.push("password is required");
  if (validationerror.length > 0) {
    res.send({
      status: 404,
      success: false,
      message: "validationerror error occur",
      error: validationerror,
    });
  } else {
    User.findOne({ email: req.body.email })
      .then((userdata) => {
        if (!userdata) {
          res.send({
            status: 420,
            success: false,
            message: "invalid email",
          });
        } else {
          bcrypt.compare(
            req.body.password,
            userdata.password,
            (err, result) => {
              if (!result) {
                res.send({
                  status: 420,
                  success: false,
                  message: "invalid password",
                });
              } else {
                var tokenObj = {
                  _id: userdata._id,
                  email: userdata.email,
                  userType: userdata.userType,
                };
                var token = jwt.sign(tokenObj, privateKey);
                res.send({
                  status: 200,
                  success: true,
                  message: "Login Successfully !!",
                  token: token,
                  data: userdata,
                });
              }
            }
          );
        }
      })
      .catch((err) => {
        res.send({
          status: 500,
          success: false,
          message: "Internal server error",
          error: err.message,
        });
      });
  }
};

const getAll = (req, res) => {
  Student.find()
    .then((data) => {
      if (!data) {
        res.send({
          status: 420,
          success: false,
          message: "Data not found!",
          data: data,
        });
      } else {
        res.send({
          status: 200,
          success: true,
          message: "Data founded successfully",
          data: data,
        });
      }
    })
    .catch((err) => {
      res.send({
        status: 500,
        success: false,
        message: "Internal server error!",
        data: err.message,
      });
    });
};

const getSingle = (req, res) => {
  var validationerror = [];
  if (!req.body._id) validationerror.push("_id is required.");
  if (validationerror.length > 0) {
    res.send({
      status: 420,
      success: false,
      message: "Data not found!",
      error: validationerror,
    });
  } else {
    Student.findOne({ _id: req.body._id })
      .then((data) => {
        if (!data) {
          res.send({
            status: 420,
            success: false,
            message: "Data not found!",
          });
        } else {
          res.send({
            status: 200,
            success: true,
            message: "Data loaded",
            data: data,
          });
        }
      })
      .catch((err) => {
        res.send({
          status: 500,
          success: false,
          message: "Internal server error!",
          error: err.message,
        });
      });
  }
};

const update = (req, res) => {
  var validationerror = [];
  if (!req.body._id) validationerror.push("_id is required.");
  if (validationerror.length > 0) {
    res.send({
      status: 420,
      success: false,
      message: "Data not found!",
      error: validationerror,
    });
  } else {
    Student.findOne({ _id: req.body._id })
      .then((studentData) => {
        if (!studentData) {
          res.send({
            status: 420,
            success: false,
            message: "Data not found!",
            data: studentData,
          });
        } else {
          if (req.body.studentName) {
            studentData.studentName = req.body.studentName;
          }
          if (req.body.fatherName) {
            studentData.fatherName = req.body.fatherName;
          }
          if (req.body.motherName) {
            studentData.motherName = req.body.motherName;
          }
          if (req.body.studentClass) {
            studentData.studentClass = req.body.studentClass;
          }
          if (req.body.email) {
            studentData.email = req.body.email;
          }
          if (req.body.contactNumber) {
            studentData.contactNumber = req.body.contactNumber;
          }
          if (req.body.dateOfBirth) {
            studentData.dateOfBirth = req.body.dateOfBirth;
          }
          if (req.body.gender) {
            studentData.gender = req.body.gender;
          }
          if (req.body.studentId) {
            studentData.studentId = req.body.studentId;
          }
          if (req.body.studentPhoto) {
            studentData.studentPhoto =
              "student-images/" + req.body.studentPhoto;
          }
          studentData
            .save()
            .then((data) => {
              res.send({
                status: 200,
                success: true,
                message: "Data updated successfully",
                data: data,
              });
            })
            .catch((err) => {
              res.send({
                status: 500,
                success: false,
                message: "Internal server error!",
                error: err.message,
              });
            });
        }
      })
      .catch((err) => {
        res.send({
          status: 500,
          success: false,
          message: "Internal server error!",
          error: err.message,
        });
      });
  }
};

const deletestudent = (req, res) => {
  var validationerror = [];
  if (!req.body._id) validationerror.push("_id is required.");
  if (validationerror.length > 0) {
    res.send({
      status: 420,
      success: false,
      message: "Data not found!",
      error: validationerror,
    });
  } else {
    Student.deleteOne({ _id: req.body._id })
      .then((studentData) => {
        res.send({
          status: 200,
          success: true,
          message: "Deleted successfully",
          data: studentData,
        });
      })
      .catch((err) => {
        res.send({
          status: 500,
          success: false,
          message: "Internal server error!",
          error: err.message,
        });
      });
  }
};

module.exports = {
  add,
  login,
  getAll,
  getSingle,
  update,
  deletestudent,
};
