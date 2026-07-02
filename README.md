# Nirantar Health Card - Offline QR Portal

**Nirantar Health** is a zero-connectivity patient ledger designed for last-mile healthcare. It compresses vital medical data, encrypts it using AES-256, and embeds it directly into a high-density QR code. This allows healthcare clinics to scan and decrypt worker records completely offline, serving as a vital fail-safe for the Ayushman Bharat Digital Mission (ABHA) in deep rural regions or high-transit construction camps.

## Features

- **Volunteer Portal (Card Generator):** Interview a migrant worker, select vital metrics (age, blood group, chronic conditions, allergies), and compile a high-density, encrypted QR health card.
- **Clinician Portal (Card Scanner):** Scan a worker's health card using a standard local phone camera to instantly view patient history without any database lookup.
- **Compression Matrix:** Stores records as tokenized variables (e.g., `DIA,HYP` for Diabetes and Hypertension) rather than verbose JSON, ensuring the QR code remains scannable.
- **AES Symmetrical Shield:** Encrypts serialized tokens locally to protect patient details from general public scans, while remaining decryptable by authorized clinician apps.
- **Zero-Network Architecture:** Fully client-side operation relying purely on the browser. No backend or active internet connection is required.

## Technology Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Encryption:** [Crypto-JS](https://github.com/brix/crypto-js) (AES)
- **QR Generation:** [qrcode.js](https://github.com/soldair/node-qrcode) 
- **QR Scanning:** [html5-qrcode](https://github.com/mebjas/html5-qrcode)

## How to Run

Because this is a zero-connectivity client-side application, running it is incredibly simple:

1. Clone the repository:
   ```bash
   git clone https://github.com/Ariha1510/hralth_card_app.git
   ```
OR use the netlify link: [nirantar-health-card.netlify.app](https://nirantar-health-card.netlify.app)

## File Structure

- `index.html` - The main application UI containing the Dashboard, Generator, and Scanner views.
- `app.js` - Core logic for data compression, AES encryption/decryption, QR generation, and camera scanning.
- `styles.css` - Custom styling and responsive UI layout.
- `nirantar-health-card.html` - Supplemental views and printable card layouts.
