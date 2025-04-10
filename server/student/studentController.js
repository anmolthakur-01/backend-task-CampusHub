const Student = require("./studentModel");

const add = (req, res) => {
  var validationerror = [];
  if (!req.body.studentName) validationerror.push("studentName is required.");
  if (!req.body.fatherName) validationerror.push("fatherName is required.");
  if (!req.body.motherName) validationerror.push("motherName is required.");
  if (!req.body.studentClass) validationerror.push("studentClass is required.");
  if (!req.body.studentEmail) validationerror.push("studentEmail is required.");
  if (!req.body.contectNumber)
    validationerror.push("contectNumber is required.");
  if (!req.body.gender) validationerror.push("gender is required.");
  if (!req.body.dateOfBirth) validationerror.push("dateOfBirth is required.");
  if (!req.body.studentId) validationerror.push("studentId is required.");
  if (!req.body.studentPhoto) validationerror.push("studentPhoto is required.");
  if (validationerror.length > 0) {
    res.send({
      status: 420,
      success: false,
      message: "Data not found!",
      error: validationerror,
    });
  } else {
    let studentObj = new Student();
    studentObj.studentName = req.body.studentName;
    studentObj.fatherName = req.body.fatherName;
    studentObj.motherName = req.body.motherName;
    studentObj.studentClass = req.body.studentClass;
    studentObj.studentEmail = req.body.studentEmail;
    studentObj.contectNumber = req.body.contectNumber;
    studentObj.gender = req.body.gender;
    studentObj.dateOfBirth = req.body.dateOfBirth;
    studentObj.studentId = req.body.studentId;
    studentObj.studentPhoto = req.body.studentPhoto;
    studentObj
      .save()
      .then((studentData) => {
        if (!studentData) {
          res.send({
            status: 404,
            success: false,
            message: "data not found",
            data: studentData,
          });
        } else {
          res.send({
            status: true,
            message: "Data Loaded!",
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
          if (req.body.studentEmail) {
            studentData.studentEmail = req.body.studentEmail;
          }
          if (req.body.contectNumber) {
            studentData.contectNumber = req.body.contectNumber;
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
            studentData.studentPhoto = req.body.studentPhoto;
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
  getAll,
  getSingle,
  update,
  deletestudent,
};
