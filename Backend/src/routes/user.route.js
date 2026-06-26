const express = require('express');
const {userRegistration,
  getAllRegisteredUser,
  getOneUser
} = require("../controllers/user.controller");


const router = express.Router();

router.post("/register", userRegistration);
router.get("/allusers", getAllRegisteredUser)
router.get("/oneUser", getOneUser)

module.exports = router;