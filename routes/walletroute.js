const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // ✅ import auth middleware

const {
  depositMoney,
  withdrawMoney,
  transferMoney,
  getTransactionHistory
} = require('../controllers/walletcontroller');

// Protect all wallet routes
router.post('/deposit', auth, depositMoney);
router.post('/withdraw', auth, withdrawMoney);
router.post('/transfer', auth, transferMoney);
router.get('/transactions', auth, getTransactionHistory);

module.exports = router;
