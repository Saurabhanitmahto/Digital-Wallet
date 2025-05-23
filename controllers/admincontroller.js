const User = require('../models/user');
const walletpay = require('../models/wallet');

// Get total balances of all users
exports.getTotalBalances = async (req, res) => {
  try {
    const users = await User.find();
    const totals = {};

    users.forEach(user => {
      for (let [currency, value] of user.balances) {
        totals[currency] = (totals[currency] || 0) + value;
      }
    });

    res.json({ total: totals });
  } catch (err) {
    res.status(500).json({ message: 'Error calculating totals' });
  }
};

// Get top users by balance and transaction count
exports.getTopUsers = async (req, res) => {
  try {
    const users = await User.find();

    const topByBalance = users.map(u => ({
      name: u.name,
      email: u.email,
      balance: [...u.balances.values()].reduce((a, b) => a + b, 0)
    }))
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 5);

    const txCounts = await walletpay.aggregate([
      { $match: { sender: { $ne: null } } },
      { $group: { _id: "$sender", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const topByTx = await Promise.all(txCounts.map(async tx => {
      const user = await User.findById(tx._id);
      return {
        name: user?.name || 'N/A',
        email: user?.email || 'N/A',
        transactions: tx.count
      };
    }));

    res.json({ topByBalance, topByTx });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching top users' });
  }
};
