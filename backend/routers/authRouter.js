const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const { verifyToken } = require("../middleware/auth");
const { register, login, checkPassword, forgotPassword, resetPassword, facebookAuthCallback, googleAuthCallback } = require('../controller/auth/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', verifyToken, resetPassword);
router.post('/check-password', verifyToken, checkPassword)
// Google Auth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), googleAuthCallback);

// Facebook Auth
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get("/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), facebookAuthCallback);
module.exports = router;
