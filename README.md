
# 🌱 SDG Receipt Scanner

> AI-powered carbon footprint tracker for shopping receipts aligned with **UN Sustainable Development Goals (SDGs)**.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://sdg-receipt-scanner-69gb62vsm-mokiths-projects.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)

---

## 🧩 Overview

**SDG Receipt Scanner** is a web application that lets users upload shopping receipts and automatically scans them using **AI-based OCR and NLP** to estimate the **carbon footprint** of purchased items. It aligns the environmental insights with relevant **Sustainable Development Goals (SDGs)** to promote conscious consumption.

---

## ⚙️ Features

✅ Upload receipts (image or PDF)
✅ Extract items using AI-powered OCR (Tesseract / Google Vision)
✅ Match products to emission datasets (kg CO₂ per unit)
✅ Visualize the carbon footprint using dynamic charts
✅ View SDG alignment (e.g., SDG 12 – Responsible Consumption)
✅ Save and manage past receipts
✅ Responsive, clean UI with glassmorphism design

---

## 🏗️ Tech Stack

**Frontend:** React 18 + TypeScript + Tailwind CSS + Chart.js
**Backend (optional):** Node.js / Flask (for OCR & AI inference)
**AI/OCR:** Tesseract.js / Hugging Face transformers
**Database:** MongoDB / Firebase
**Hosting:** Vercel

---

## 🚀 Quick Start

### 1️⃣ Clone the repository

```bash
git clone https://github.com/mokith/sdg-receipt-scanner.git
cd sdg-receipt-scanner
```

### 2️⃣ Install dependencies

```bash
npm install
# or
pnpm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧠 How It Works

1. **Image Upload** – User uploads a photo or scanned receipt.
2. **OCR Extraction** – The system extracts text using an OCR model.
3. **NLP Mapping** – The text is parsed to identify product names and categories.
4. **Emission Calculation** – Each product is mapped to a CO₂ emission factor dataset.
5. **Visualization** – A dynamic dashboard displays total emissions and category-wise breakdowns.
6. **SDG Mapping** – Results are linked to SDGs like 12 (Responsible Consumption), 13 (Climate Action), etc.

---

## 📊 Sample Output

| Product | Quantity | CO₂ (kg) | SDG Alignment |
| ------- | -------- | -------- | ------------- |
| Milk    | 2 L      | 3.2      | SDG 12        |
| Chicken | 1.2 Kg   | 9.5      | SDG 13        |
| Rice    | 5 Kg     | 6.8      | SDG 2         |
| Apples  | 1 Kg     | 1.2      | SDG 3         |

---

## 🧭 SDG Relevance

| SDG Goal   | Description              | Example Action                    |
| ---------- | ------------------------ | --------------------------------- |
| **SDG 12** | Responsible Consumption  | Reduce high-emission purchases    |
| **SDG 13** | Climate Action           | Track and offset carbon footprint |
| **SDG 2**  | Zero Hunger              | Choose sustainable food sources   |
| **SDG 3**  | Good Health & Well-being | Promote eco-friendly diets        |

---

## 🎨 UI & Design System

* **Design Language:** Modern Glassmorphism
* **Typography:** Inter (Google Fonts)
* **Animations:** Framer Motion
* **Charts:** Recharts / Chart.js
* **Responsive Layout:** Tailwind grid system

---

## 🧪 Future Enhancements

🔹 Integration with **barcode scanners**
🔹 Automatic **emission factor updates** from open datasets
🔹 Add **multilingual support** for global users
🔹 Generate **PDF sustainability reports**

---

## 👨‍💻 Author

**Moki**
*Computer Science Student | Developer | Sustainability Enthusiast*

🌐 [Live Demo](https://sdg-receipt-scanner-69gb62vsm-mokiths-projects.vercel.app)
📧 Email: *[your email here]*
💻 GitHub: [MOKI1110](https://github.com/MOKI1110)

---

## 📜 License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute it with attribution.

---
