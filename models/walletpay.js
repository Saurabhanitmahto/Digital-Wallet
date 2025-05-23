// models/walletpay.js

const mongoose = require('mongoose');

const walletPaySchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' },
  isDeleted: { type: Boolean, default: false }, // ✅ Soft delete field
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('walletpay', walletPaySchema);
