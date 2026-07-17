# Nirantar Health 
**AI-Powered Continuity of Care Platform for Migrant Workers**

Nirantar Health is a digital platform that enables health camps to register migrant workers, maintain portable medical records, schedule follow-ups, and allow authorized healthcare providers to retrieve patient history during future visits.

## The Problem
Migrant workers frequently migrate between cities and worksites, making continuous healthcare difficult. Health camps conducted by NGOs, employers, and government agencies often maintain temporary paper records that are difficult to access later. As a result, medical history, chronic conditions, vaccinations, and follow-up treatments are lost, leading to repeated tests, interrupted care, and poor health outcomes.

## The Solution
Nirantar Health solves this by providing:
1. **Worker Module (Health Passport)**: A portable digital Health ID and QR code that workers can carry on their phone or as a printed card.
2. **Doctor Module & AI Assistant**: Doctors scan the QR code to instantly access the patient's medical history. An AI Clinical Assistant summarizes past visits, flags high-risk indicators (like hypertension or allergies), and lists active medications to avoid dangerous drug interactions.
3. **NGO / Government Dashboard**: Provides macro-level analytics on diseases, vaccinations, and camp effectiveness.

## Core Features (Hackathon MVP)
- **Role-Based Workflows**: Separate, secure dashboards for Workers, Doctors, and NGOs.
- **Instant QR Generation**: Auto-assigns unique Worker IDs and generates scannable QR codes upon registration.
- **Integrated QR Scanner**: In-app camera scanner for doctors to quickly retrieve patient files.
- **AI Clinical Assistant (Mockup)**: Demonstrates how AI can analyze past records to warn doctors of potential issues before they prescribe treatment.
- **Continuity of Care Tracking**: Records vitals, diagnosis, and prescriptions to ensure care carries over from camp to camp.

## Tech Stack
- **Frontend**: React, Vite
- **Routing**: React Router
- **Database**: Supabase (PostgreSQL)
- **Styling**: Custom CSS (Responsive, Modern UI)
- **QR Tech**: `react-qr-code`, `html5-qrcode`

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser.
