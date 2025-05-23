const express = require('express');
const router = express.Router();

// Middleware, verify if the user is logged in
const protect = require('../middleware/auth');

//controller logic
const { getProfile } = require('../controllers/profilecontroller');

//user profile
router.get('/profile', protect, getProfile);

module.exports = router;