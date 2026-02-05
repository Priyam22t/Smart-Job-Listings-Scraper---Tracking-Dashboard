# Smart Job Listings Scraper & Tracking Dashboard

## Overview
Smart Job Listings Scraper & Tracking Dashboard is an end-to-end job aggregation and management platform built using Playwright, Node.js, TypeScript, and vanilla JavaScript. The project automates the process of collecting public job listings from multiple sources and presents them in a modern, interactive dashboard designed to streamline job searching and application tracking.

This project focuses on real-world browser automation, structured data extraction, and frontend usability without relying on frameworks, paid APIs, or AI services.

---

## Features

### Backend (Scraper)
- Automated job scraping using Playwright
- Scrapes public job listings from:
  - LinkedIn (no login required)
  - Indeed (public job pages)
  - Company career pages
- Extracts structured job data:
  - Job title
  - Company name
  - Location
  - Job link
  - Source
- Safe scraping techniques:
  - Pagination limited to first 2–3 pages
  - Delays and waits to reduce blocking
- Combines all results into a single jobs.json file

---

### Frontend (Dashboard)
- Built using HTML, CSS, and vanilla JavaScript
- Responsive and modern UI
- Displays jobs as interactive cards
- Advanced filtering:
  - Keyword search
  - Source filter (LinkedIn / Indeed / Company)
  - Location filter
- Analytics panel:
  - Total job count
  - Jobs per source
  - Applied jobs count
  - Remote jobs count
- Job tracking workflow:
  - Mark jobs as Applied
  - Ignore unwanted jobs
  - Persistent state using localStorage
- Job alerts:
  - Save alert keywords
  - Highlight matching jobs on future visits
- Direct navigation to original job pages
- Sticky and clean navigation bar for improved UX

---

## Project Structure

browser-automations/
├── scrapers/
│   ├── indeed.ts
│   ├── linkedin.ts
│   └── company.ts
│
├── public/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── jobs.json
│
├── index.ts
├── package.json
├── tsconfig.json
└── README.md

---

## Tech Stack
- Node.js
- TypeScript
- Playwright
- HTML / CSS / JavaScript
- No frameworks
- No paid APIs
- No AI services

---

## How It Works
1. Playwright navigates public job listing pages.
2. Job data is extracted using stable DOM selectors.
3. Results from all sources are merged and saved into jobs.json.
4. The frontend loads job data using fetch().
5. Users filter, track, and manage jobs through the dashboard.

---

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm
- VS Code (recommended)

### Install Dependencies
npm install  
npx playwright install

### Run the Scraper
npx ts-node index.ts

This generates or updates the jobs.json file.

---

## Run the Dashboard

### Option 1: VS Code Live Server (Recommended)
1. Install the Live Server extension
2. Right-click public/index.html
3. Select "Open with Live Server"

### Option 2: Local Server
npx serve public

Then open:
http://localhost:3000

---

## Why This Project Matters
- Demonstrates real-world browser automation skills
- Shows understanding of scraping limitations and safety
- Implements structured data extraction and filtering
- Builds a usable job tracking product, not just a script
- Emphasizes clean architecture and scalability
- Avoids shortcuts like frameworks or paid APIs

---

## Possible Enhancements
- Express backend with REST API
- Scheduled scraping with cron jobs
- Export applied jobs to CSV
- Authentication and user profiles
- Cloud deployment

---

## License
MIT License
