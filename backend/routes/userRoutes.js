const express = require("express");

const router = express.Router();



const {

  createUser,

  getUsers,

  getUserById,

  updateUserProfile,

  changePassword,

  deleteUser,

} = require("../controllers/userController");



const authMiddleware =
  require("../middleware/authMiddleware");


const roleMiddleware =
  require("../middleware/roleMiddleware");






// ==========================
// CREATE USER
// ADMIN ONLY
// ==========================

router.post(

  "/",

  authMiddleware,

  roleMiddleware("admin"),

  createUser

);








// ==========================
// GET ALL USERS
// ADMIN ONLY
// ==========================

router.get(

  "/",

  authMiddleware,

  roleMiddleware("admin"),

  getUsers

);








// ==========================
// GET USER BY ID
// USER OR ADMIN
// Controller checks ownership
// ==========================

router.get(

  "/:id",

  authMiddleware,

  getUserById

);








// ==========================
// UPDATE USER PROFILE
// USER OR ADMIN
// Controller checks ownership
// ==========================

router.put(

  "/:id",

  authMiddleware,

  updateUserProfile

);








// ==========================
// CHANGE PASSWORD
// USER OR ADMIN
// Controller checks ownership
// ==========================

router.put(
  "/:id/password",
  authMiddleware,
  changePassword
);








// ==========================
// DELETE USER
// ADMIN ONLY
// ==========================

router.delete(

  "/:id",

  authMiddleware,

  roleMiddleware("admin"),

  deleteUser

);






module.exports = router;