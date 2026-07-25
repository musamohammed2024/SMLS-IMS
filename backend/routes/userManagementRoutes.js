const express = require("express");
const router = express.Router();


const {
  getUserById,
  updateUserProfile,
  changePassword,
} = require("../controllers/userController");



const authMiddleware = require("../middleware/authMiddleware");




// ==========================
// GET USER
// Requires authentication
// ==========================

router.get(
  "/:id",
  authMiddleware,
  getUserById
);




// ==========================
// UPDATE PROFILE
// Requires authentication
// Controller handles ownership/admin checks
// ==========================

router.put(
  "/:id",
  authMiddleware,
  updateUserProfile
);




// ==========================
// CHANGE PASSWORD
// Requires authentication
// Controller handles ownership/admin checks
// ==========================

router.put(
  "/:id/password",
  authMiddleware,
  changePassword
);



module.exports = router;