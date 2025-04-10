const Notice = require("./noticeModel");

const add = (req, res) => {
  var validationerror = [];
  if (!req.body.title) 
    validationerror.push("title is required.");
  if (!req.body.noticeFor) 
    validationerror.push("noticeFor is required.");
  if (!req.body.message) 
    validationerror.push("message is required.");
  if (validationerror.length > 0) {
    res.send({
      status: 420,
      success: false,
      message: "Data not found!",
      error: validationerror,
    });
  } else {
    let noticeObj = new Notice();
    noticeObj.title = req.body.title;
    noticeObj.noticeFor = req.body.noticeFor;
    noticeObj.message = req.body.message;
    noticeObj.save()
      .then((noticeData) => {
        if (!noticeData) {
          res.send({
            status: 404,
            success: false,
            message: "data not found",
            data: noticeData,
          });
        } else {
          res.send({
            status: true,
            message: "Data Loaded!",
            data: noticeData,
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
  Notice.find()
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
    Notice.findOne({ _id: req.body._id })
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
    Notice.findOne({ _id: req.body._id })
      .then((noticeData) => {
        if (!noticeData) {
          res.send({
            status: 420,
            success: false,
            message: "Data not found!",
            data: noticeData,
          });
        } else {
          if (req.body.title) {
            noticeData.title = req.body.title;
          }
          if (req.body.noticeFor) {
            noticeData.noticeFor = req.body.noticeFor;
          }
          if (req.body.message) {
            noticeData.message = req.body.message;
          }
          noticeData
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

const deletenotice = (req, res) => {
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
    Notice.deleteOne({ _id: req.body._id })
      .then((noticeData) => {
        res.send({
          status: 200,
          success: true,
          message: "Deleted successfully",
          data: noticeData,
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
  deletenotice
};          