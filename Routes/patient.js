const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const patientController = require("../Controllers/patientcontroller");


router.post("/register", auth, patientController.register);
router.post("/:id/create_report",auth, patientController.createReport);
router.get("/:id/all_reports", patientController.getReports);

module.exports = router;
