const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // DB connection

dotenv.config(); // Load .env vars

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

app.use('/api/auth', require('./routes/authroute'));
app.use('/api/wallet', require('./routes/walletroute'));
app.use('/api/admin', require('./routes/adminroute'));

// Example Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});