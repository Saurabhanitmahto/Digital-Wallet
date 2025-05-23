// controllers/admincontroller.js

const Flag = require('../models/flags'); // adjust path if needed
const Walletpay = require('../models/wallet'); // adjust path if needed
const User = require('../models/user'); // adjust path if needed


exports.getFlags = async (req, res) => {
  try {
    const flags = await Flag.find().populate('user').populate('transaction');
    res.status(200).json(flags);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch flags' });
  }
};

exports.getTotalBalances = async (req, res) => {
  try {
    const users = await User.find();
    const totalBalance = users.reduce((sum, user) => sum + (user.balance || 0), 0);
    res.status(200).json({ totalBalance });
  } catch (err) {
    res.status(500).json({ error: 'Failed to calculate total balances' });
  }
};

exports.getTopUsers = async (req, res) => {
  try {
    const topUsers = await User.find().sort({ balance: -1 }).limit(5);
    res.status(200).json(topUsers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch top users' });
  }
};

exports.softDeleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Option 1: If using a soft-delete field (like isDeleted)
      const user = await User.findByIdAndUpdate(
        userId,
        { isDeleted: true },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User soft-deleted successfully', user });
    } catch (err) {
      res.status(500).json({ error: 'Failed to soft-delete user' });
    }
  };
  

exports.softDeleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;

    const transaction = await Wallet.findByIdAndUpdate(
      transactionId,
      { isDeleted: true },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({ message: 'Transaction soft-deleted successfully', transaction });
  } catch (err) {
    res.status(500).json({ error: 'Failed to soft-delete transaction' });
  }
};

