const Public = require("./publicModel");

const add = (req, res) => {
  var validationerror = [];
  if (!req.body.title) validationerror.push("title is required.");
  if (!req.body.message) validationerror.push("message is required.");
  if (validationerror.length > 0) {
    res.send({
      status: 420,
      success: false,
      message: "Data not found!",
      error: validationerror,
    });
  } else {
    let publicObj = new Public();
    publicObj.title = req.body.title;
    publicObj.message = req.body.message;
    publicObj
      .save()
      .then((publicData) => {
        if (!publicData) {
          res.send({
            status: 404,
            success: false,
            message: "data not found",
            data: publicData,
          });
        } else {
          res.send({
            status: true,
            message: "Data Loaded!",
            data: publicData,
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
  Public.find()
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
    Public.findOne({ _id: req.body._id })
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
    Public.findOne({ _id: req.body._id })
      .then((publicData) => {
        if (!publicData) {
          res.send({
            status: 420,
            success: false,
            message: "Data not found!",
            data: publicData,
          });
        } else {
          if (req.body.title) {
            publicData.title = req.body.title;
          }
          if (req.body.message) {
            publicData.message = req.body.message;
          }
          publicData
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

const deletepublic = (req, res) => {
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
    Public.deleteOne({ _id: req.body._id })
      .then((publicData) => {
        res.send({
          status: 200,
          success: true,
          message: "Deleted successfully",
          data: publicData,
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
  deletepublic,
};
