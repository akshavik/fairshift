# FairShift — A Decent Work Platform (UN SDG 8)

[![UN SDG 8](https://img.shields.io/badge/UN%20SDG%208-Decent%20Work%20%26%20Economic%20Growth-teal.svg)](https://sdgs.un.org/goals/goal8)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](https://quick-cerulean-ooevllk.tmp.now)
[![Tamil & English](https://img.shields.io/badge/Language-English%20%7C%20தமிழ்-emerald.svg)]()

> **FairShift** is a multilingual, mobile-first workforce fairness and safety platform designed for employee-intensive organisations. It bridges the gap between daily attendance tracking, transparent salary calculations, confidential grievance/safety reporting, and employer workforce intelligence under **United Nations Sustainable Development Goal 8 (SDG 8)**.

---

## 🌟 Live Deployments

- **Live Web Application (Vercel):** [https://quick-cerulean-ooevllk.tmp.now](https://quick-cerulean-ooevllk.tmp.now)
- **Local Dev Server:** `http://localhost:5173/`

---

## 📱 Core Modules (Stitch UI Aligned)

### 1. SafeVoice™ Reporting Rail (`screens/fd8a22de5c1948f0b4b5f8235db730e4`)
- **Statutory Audit Rail:** Protected under Tamil Nadu Labor Act Sec 17 (`TN-ACT-SEC17`) with guaranteed impartial review and zero contractor interference.
- **4 Grievance Categories:** Safety Hazard, Unfair Treatment & Harassment, Wage & Overtime Discrepancy, Drinking Water & Amenities.
- **Dual Identity Protection Tiers:**
  - **Full Anonymous Shield:** Cryptographically decodes worker metadata; generates a unique **6-digit private access PIN** to monitor updates privately.
  - **Confidential Tier:** Encrypted reporting visible solely to statutory welfare ombudsmen.
- **Location Geofencing:** Auto-detected worksite beacons (e.g. `Pier 4 — West Scaffolding Face, Level 3 (Beacon #902)`).
- **Severity Levels:** Urgent Stop-Work Condition ⚠️ vs Standard Moderate.
- **Evidence Attachments:** Voice-note audio recorder simulator (Tamil & English supported) + photo evidence upload.
- **PIN Tracker:** Real-time milestone tracker (Submitted ➔ Under Review 4h SLA ➔ Assigned ➔ Action in Progress ➔ Resolved).

### 2. Attendance & Working Hours Rail (`screens/d65c799288af4b1e8c1a0b1179d35885`)
- Live check-in/check-out timestamps and shift duration calculation (3h 48m recorded vs 8.0h scheduled).
- **QR Code Camera Scanner Simulator:** Authenticates shift punches against site geofence beacons.
- **Overtime Review Flags:** Automatically isolates hours exceeding 8.0h for supervisory review.
- Attendance history roster with status badges (Present, Overtime Approved 2.0x, Incomplete Check-Out Warning).

### 3. PayClarity™ Transparent Wage Rail (`screens/9cbe22e72b0e4997bcfc01ff71552ea9`)
- Transparent wage breakdown:
  - Base Daily Wage
  - Site Hazard Allowance
  - Food & Commute Allowance
  - Approved Overtime Pay calculated at configurable statutory multipliers (2.0x / 1.5x)
  - Statutory Deductions: Employee Provident Fund (EPF 12%), ESIC (0.75%), Professional Tax
  - Net Take-Home Salary
- **Interactive What-If Overtime Simulator:** Sliders to calculate exact rupee impact of additional overtime hours.
- Printable official payslip download with itemized ledger.

### 4. Employer / Admin Oversight Rail (`screens/f581f676db1f4cf2904da4a651aefd52`)
- **Executive Dashboard:** Active worker counts, shift hours, 4-Hour SLA compliance tracking, category distribution charts.
- **Incident Triage Queue:** Filter, assign to safety officers, update statuses, post public progress notes, and record protected internal notes.
- **Fatigue & Operational Alerts Engine:** Automated rules for >10.5h continuous hours, back-to-back shifts (<8h rest), and missing punches.
- **Configurable Pay Policy:** Administrator control over daily base rates, overtime multiplier ratios, and hazard allowances.
- **Audit Ledger:** Immutable chronological history of all administrative actions.

---

## 🏗️ Multi-Industry Demonstrations

FairShift dynamically adapts between two industries using configurable settings:

| Parameter | Industry A: Construction | Industry B: Higher Education Campus |
| :--- | :--- | :--- |
| **Organisation** | Chennai Metro Rail Infrastructure Consortium (Line 4) | SRM Institute of Science & Technology |
| **Worker Persona** | **AKSHAVI K**, Lead Rigging & Scaffolding Specialist | **Priya S.**, Senior Facilities Housekeeping Lead |
| **Worksites** | Pier 4 Scaffolding, Underground Shaft B2, Casting Yard East | Central Library, Tech Park Hostels Block C, Auditorium |
| **Key Hazards** | Structural scaffolding defects, crane blindspots, extreme heat | High-voltage 440V conduits, chemical wash spills |
| **Overtime Multiplier** | 2.0x (Factories Act heavy risk standard) | 1.5x (Commercial / Service standard) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/akshavik/fairshift.git
cd fairshift

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Vercel Deployment
```bash
# Deploy to Vercel
npx vercel --prod
```

---

## 🎯 PRD Demonstration Script (10 Evaluation Steps)

FairShift contains an interactive built-in walkthrough (`🎯 Demo Guide` in the top bar):
1. **Open construction worker portal** (AKSHAVI K, Rigging Specialist)
2. **Review attendance & hours calculation** (3h 48m recorded, geofence beacon #902)
3. **Submit scaffolding hazard report** (SafeVoice™ rail with voice-note & photo evidence)
4. **Track incident via 6-digit access PIN** (e.g. `839-204`)
5. **Switch to employer portal** (Executive workforce metrics & 4h SLA tracking)
6. **Assign report & update status** (Assigned to Chief Safety Engineer Senthil Murugan)
7. **Review fatigue alerts** (Human review for >10.5h continuous operation)
8. **Inspect transparent pay breakdown** (Basic + Hazard + 2.0x Overtime - EPF/ESI)
9. **Switch industry to college/university** (SRM Campus Facilities & Security)
10. **Verify campus hazard workflow** (Identical core reporting with university roles)

---

## 📄 License
This project is licensed under the MIT License.
