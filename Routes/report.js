const express = require("express");
const router = express.Router();
const reportController = require("../Controllers/reportController");


router.get("/:status", reportController.getByStatus);


module.exports = router;
