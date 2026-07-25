const express = require("express");
const router = express.Router();


const upload = require("../middleware/upload");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


const {
  getAllFaculty,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} = require("../controllers/facultyController");




// ===================================
// VIEW ALL FACULTY
// ADMIN + STAFF + VIEWER
// ===================================

router.get(
  "/",
  authMiddleware,
  roleMiddleware(
    "admin",
    "staff",
    "viewer"
  ),
  getAllFaculty
);




// ===================================
// VIEW SINGLE FACULTY
// ADMIN + STAFF + VIEWER
// ===================================

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(
    "admin",
    "staff",
    "viewer"
  ),
  getFacultyById
);




// ===================================
// CREATE FACULTY
// ADMIN ONLY
// ===================================

router.post(
  "/",
  authMiddleware,
  roleMiddleware(
    "admin"
  ),
  upload.single("photo"),
  createFaculty
);




// ===================================
// UPDATE FACULTY
// ADMIN ONLY
// ===================================

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(
    "admin"
  ),
  upload.single("photo"),
  updateFaculty
);




// ===================================
// DELETE FACULTY
// ADMIN ONLY
// ===================================

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(
    "admin"
  ),
  deleteFaculty
);



module.exports = router;