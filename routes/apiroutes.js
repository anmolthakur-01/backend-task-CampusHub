const router = require("express").Router();
const classController = require("../server/class/classController");
const homeworkController = require("../server/homework/homeworkController");
const noticeController = require("../server/notice/noticeController");
const publicController = require("../server/publicnotice/publicController");
const studentController = require("../server/student/studentController");
const multer = require("multer");

// Multer setup
const studentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/student-images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    var newname = file.fieldname + "-" + uniqueSuffix + file.originalname;
    req.body["studentPhoto"] = newname;
    cb(null, newname);
  },
});
const studentUpload = multer({ storage: studentStorage });

// class routes
router.post("/class/add", classController.add);
router.post("/class/getall", classController.getAll);
router.post("/class/getsingle", classController.getSingle);
router.post("/class/update", classController.update);
router.post("/class/delete", classController.deleteClass);

// homework routes
router.post("/homework/add", homeworkController.add);
router.post("/homework/getall", homeworkController.getAll);
router.post("/homework/getsingle", homeworkController.getSingle);
router.post("/homework/update", homeworkController.update);
router.post("/homework/delete", homeworkController.deletehomework);

// notice routes
router.post("/notice/add", noticeController.add);
router.post("/notice/getall", noticeController.getAll);
router.post("/notice/getsingle", noticeController.getSingle);
router.post("/notice/update", noticeController.update);
router.post("/notice/delete", noticeController.deletenotice);

// public_notice routes
router.post("/public/add", publicController.add);
router.post("/public/getall", publicController.getAll);
router.post("/public/getsingle", publicController.getSingle);
router.post("/public/update", publicController.update);
router.post("/public/delete", publicController.deletepublic);

// student routes
router.post("/student/add", studentUpload.single('studentPhoto'), studentController.add);
// router.post("/student/login", studentController.login);
router.post("/student/getall", studentController.getAll);
router.post("/student/getsingle", studentController.getSingle);
router.post("/student/update", studentController.update);
router.post("/student/delete", studentController.deletestudent);

module.exports = router;
