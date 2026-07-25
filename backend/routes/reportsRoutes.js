const express = require("express");

const router = express.Router();


const {
  getReportSummary
} = require("../controllers/reportController");


const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");




// ===================================
// REPORT SUMMARY
// ADMIN + STAFF ONLY
// ===================================

router.get(

  "/summary",

  authMiddleware,

  roleMiddleware(
    "admin",
    "staff"
  ),

  getReportSummary

);




module.exports = router;