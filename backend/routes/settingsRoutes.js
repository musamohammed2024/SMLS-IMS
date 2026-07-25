const express = require("express");

const router = express.Router();


const {
  getSettings,
  updateProfile,
  updatePreferences,
} = require("../controllers/settingsController");



const authMiddleware = require("../middleware/authMiddleware");




// ==========================
// GET USER SETTINGS
// Requires authentication
// Controller should verify ownership/admin
// ==========================

router.get(
  "/:userId",
  authMiddleware,
  getSettings
);





// ==========================
// UPDATE PROFILE
// Requires authentication
// Controller should verify ownership/admin
// ==========================

router.put(
  "/profile/:userId",
  authMiddleware,
  updateProfile
);





// ==========================
// UPDATE PREFERENCES
// Requires authentication
// Controller should verify ownership/admin
// ==========================

router.put(
  "/preferences/:userId",
  authMiddleware,
  updatePreferences
);




module.exports = router;