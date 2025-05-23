const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminmiddleware');

const admin = require('../controllers/admincontroller');

// Flagged transactions
router.get('/flags', auth, adminOnly, admin.getFlags);

// Total balances
router.get('/total-balances', auth, adminOnly, admin.getTotalBalances);

// Top users
router.get('/top-users', auth, adminOnly, admin.getTopUsers);

// Soft delete user
//router.delete('/user/:id', auth, adminOnly, admin.softDeleteUser);

// Soft delete transaction
//router.delete('/transaction/:id', auth, adminOnly, admin.softDeleteTransaction);

module.exports = router;
