# Digital Wallet System

A secure and modular backend for a Digital Wallet System built using Node.js, Express, and MongoDB. This project supports user registration, login, deposits, withdrawals, transfers, fraud detection, and admin reporting APIs.

🚀 **Deployed at:**
GitHub: [https://github.com/Saurabhanitmahto/Digital-Wallet](https://github.com/Saurabhanitmahto/Digital-Wallet)

## ✅ Features

* 🔐 User Registration & Login (with JWT + bcrypt)
* 💰 Wallet Operations: Deposit, Withdraw, Transfer
* 🧾 Transaction History
* 🛡 Basic Fraud Detection (rate limiting, anomaly rules)
* 👮 Admin APIs for flags, user stats, and reports
* 🕒 Scheduled Daily Fraud Scan using node-cron
* 📧 Optional Email Alerts (via nodemailer + ethereal/mock)

## 🛠 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB + Mongoose
* **Auth:** JWT, bcrypt
* **Email:** Nodemailer (mocked with ethereal or console logs)
* **Scheduler:** node-cron
* **Docs:** Postman

## 📦 Installation

```bash
git clone https://github.com/Saurabhanitmahto/infollion-assignment-wallet
npm install
```

### 🔐 Create a .env file:

```
PORT=5025
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_ethereal_email
EMAIL_PASS=your_ethereal_password
```

### ▶ Start the server:

```bash
npm start
```

## 🧪 API Documentation

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | /api/auth/register   | Register user            |
| POST   | /api/auth/login      | Login user (JWT)         |
| POST   | /api/wallet/deposit  | Deposit virtual cash     |
| POST   | /api/wallet/withdraw | Withdraw cash            |
| POST   | /api/wallet/transfer | Transfer to another user |
| GET    | /api/wallet/history  | View transaction logs    |
| GET    | /api/admin/flags     | View flagged txns        |
| GET    | /api/admin/summary   | View total balances      |
| GET    | /api/admin/top       | Top users by balance     |

➡ Full API details in `/docs` or Postman collection.

## 🧠 Folder Structure

```
digital-wallet/
├── controllers/     # Business logic
├── middleware/      # JWT auth middleware
├── models/          # Mongoose schemas
├── routes/          # Express routers
├── utils/           # Fraud detection, emails
├── jobs/            # node-cron scheduled jobs
├── .env             # Environment variables
├── app.js           # Entry point
└── README.md        # Project readme
```

## 🛡 Fraud Detection Rules

* ❗ Multiple transfers in a short time → flagged
* ❗ Sudden large withdrawals (>50% balance) → flagged

Flagged transactions are stored/logged for admin review.

## 📬 Email Alerts (Mocked)

* Large withdrawals or rapid transfers
* Use Ethereal for testing or console logging

## 🕒 Scheduled Jobs

* Daily fraud scan at midnight via node-cron

## 📌 Future Enhancements

* Admin role-based access
* Multi-currency wallet support
* Rate limit middleware for abuse prevention

## 🤝 Contributing

Pull requests welcome! Feel free to open issues or suggest improvements.

**Built with ❤ by Saurabh Kumar**
