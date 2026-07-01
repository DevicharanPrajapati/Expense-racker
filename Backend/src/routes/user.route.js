const express = require('express');
const {userRegistration,
  updateProfile,
  logout,
  login,
  profile,
  updatePassword,
} = require("../controllers/user.controller");
const verifyToken = require('../middleware/auth.middleware');


const router = express.Router();

router.post("/register", userRegistration);
router.post("/login", login)
router.get("/profile",verifyToken, profile)
router.put("/updateProfile", verifyToken, updateProfile)
router.put("/updatePassword", verifyToken, updatePassword)
router.delete("/logout", verifyToken, logout)


module.exports = router;