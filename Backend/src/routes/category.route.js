const express = require('express');
const {createCategory} = require('../controllers/category.controller');
const verifyToken = require('../middleware/auth.middleware');


const router = express.Router();

router.post("/addCategory", verifyToken, createCategory);


module.exports = router;