
# 🧾 Bank Statement to Excel Converter

This tool allows users to upload bank statements (PDF), extract transaction data using OCR (OpenAI), and export the results to Excel or CSV format.

## ⚙️ Tech Stack

- **Frontend:** React.js
- **Backend:** Express.js (Node.js)
- **OCR:** OpenAI Vision API
- **Payments:** Stripe (prepayment model)

## 🚀 Features

- Upload scanned or digital bank statements
- Automatically detect and extract:
  - Date
  - Description
  - Amount
  - Balance
- Export data to `.xlsx` or `.csv`
- Prepaid credits system using Stripe

## 🔄 Roadmap

- [x] File upload support
- [ ] OCR with OpenAI Vision
- [ ] Excel export
- [ ] Stripe prepayment system
- [ ] Dashboard with credit balance
- [ ] Final UI/UX polish

## 📦 Installation

```bash
# Backend
cd server
npm install

# Frontend
cd client
npm install
```

## 🧪 Development

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd client
npm start
```

## 📄 License

**This project is proprietary. No reproduction or redistribution is allowed without explicit permission.**
