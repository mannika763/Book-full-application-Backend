const express = require("express");
const { login, logout, signup,submitbookform } = require("../controllers/auth.controller.js");
const protectRoute = require('../middleware/protectRoute.js')

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/submit-form",protectRoute, submitbookform);


module.exports = router;
