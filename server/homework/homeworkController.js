const Homework = require("./homeworkModel");

const add = (req, res) => {
  var validationerror = [];
  if (!req.body.title) 
    validationerror.push("title is required.");
  if (!req.body.homeworkFor) 
    validationerror.push("homeworkFor is required.");
  if (!req.body.description) 
    validationerror.push("description is required.");
  if (!req.body.dateOfSubmission) 
    validationerror.push("dateOfSubmission is required.");
  if (validationerror.length > 0) {
    res.send({
      status: 420,
      success: false,
      message: "Data not found!",
      error: validationerror,
    });
  } else {
    let homeworkObj = new Homework();
    homeworkObj.title = req.body.title;
    homeworkObj.homeworkFor = req.body.homeworkFor;
    homeworkObj.description = req.body.description;
    homeworkObj.dateOfSubmission = req.body.dateOfSubmission;
    homeworkObj.save()
      .then((homeworkData) => {
        if (!homeworkData) {
          res.send({
            status: 404,
            success: false,
            message: "data not found",
            data: homeworkData,
          });
        } else {
          res.send({
            status: true,
            message: "Data Loaded!",
            data: homeworkData,
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
  Homework.find()
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
    Homework.findOne({ _id: req.body._id })
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
    Homework.findOne({ _id: req.body._id })
      .then((homeworkData) => {
        if (!homeworkData) {
          res.send({
            status: 420,
            success: false,
            message: "Data not found!",
            data: homeworkData,
          });
        } else {
          if (req.body.title) {
            homeworkData.title = req.body.title;
          }
          if (req.body.homeworkFor) {
            homeworkData.homeworkFor = req.body.homeworkFor;
          }
          if (req.body.description) {
            homeworkData.description = req.body.description;
          }
          if (req.body.dateOfSubmission) {
            homeworkData.dateOfSubmission = req.body.dateOfSubmission;
          }
          homeworkData
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

const deletehomework = (req, res) => {
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
    Homework.deleteOne({ _id: req.body._id })
      .then((homeworkData) => {
        res.send({
          status: 200,
          success: true,
          message: "Deleted successfully",
          data: homeworkData,
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
  deletehomework
};          