const mongoose = require('mongoose');
const User = require('../models/user');
const walletpay = require('../models/wallet');

// Deposit money
exports.depositMoney = async (req, res) => {
  const { amount, currency = 'INR' } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid deposit amount' });
  }

  const currentBalance = req.user.balances.get(currency) || 0;
  req.user.balances.set(currency, currentBalance + amount);
  await req.user.save();

  await walletpay.create({
    sender: null,
    receiver: req.user._id,
    amount,
    currency,
    type: 'deposit'
  });

  res.json({ message: 'Deposit successful', balance: req.user.balances.get(currency) });
};

// Withdraw money
exports.withdrawMoney = async (req, res) => {
  const { amount, currency = 'INR' } = req.body;
  const balance = req.user.balances.get(currency) || 0;

  if (!amount || amount <= 0 || amount > balance) {
    return res.status(400).json({ message: 'Invalid or insufficient balance' });
  }

  req.user.balances.set(currency, balance - amount);
  await req.user.save();

  await walletpay.create({
    sender: req.user._id,
    receiver: null,
    amount,
    currency,
    type: 'withdraw'
  });

  res.json({ message: 'Withdraw successful', balance: req.user.balances.get(currency) });
};

// Transfer money
exports.transferMoney = async (req, res) => {
  const { email, amount, currency = 'INR' } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  const receiver = await User.findOne({ email });
  if (!receiver || receiver._id.equals(req.user._id)) {
    return res.status(400).json({ message: 'Invalid receiver' });
  }

  const senderBalance = req.user.balances.get(currency) || 0;
  if (amount > senderBalance) {
    return res.status(400).json({ message: 'Not enough balance' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    req.user.balances.set(currency, senderBalance - amount);
    const receiverBalance = receiver.balances.get(currency) || 0;
    receiver.balances.set(currency, receiverBalance + amount);

    await req.user.save({ session });
    await receiver.save({ session });

    await walletpay.create([{
      sender: req.user._id,
      receiver: receiver._id,
      amount,
      currency,
      type: 'transfer'
    }], { session });

    await session.commitTransaction();
    session.endSession();

    res.json({ message: 'Transfer successful' });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: 'Transfer failed' });
  }
};

// Get transaction history
exports.getTransactionHistory = async (req, res) => {
  try {
    const transactions = await walletpay.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }]
    }).sort({ timestamp: -1 });

    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load history' });
  }
};
