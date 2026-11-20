# 🛡️ ForensicGuard AI — 3D Cyber Screenshot Fraud & Forensic Detection Dashboard

> **An advanced, AI-powered 3D interactive cyber-forensic dashboard engineered to detect fake screenshots of payment transactions, forged documents, tampered videos, and visual manipulation indicators.**

---

## 🎯 5 Core Project Objectives Implemented

| # | Project Objective | Forensic Implementation |
|---|---|---|
| **1** | **Blur Image Detection** | **Laplacian Variance Convolution Kernel** (`[0, 1, 0; 1, -4, 1; 0, 1, 0]`) to detect sharpness vs. optical/motion blur. Generates real-time **Sobel edge gradient heatmaps** on an HTML5 Canvas with adjustable sensitivity to identify whether blur was deliberately applied to conceal forgery. |
| **2** | **Image, Video & Document Detection** | **Error Level Analysis (ELA)** engine running directly in the browser to compute per-pixel recompression differentials at 90% quality; isolates multi-generation JPEG splicing, noise pattern anomalies, and extracts **EXIF & binary software signatures** (e.g. Adobe Photoshop, Canva, PicsArt, mock APK generators). Supports video frame-by-frame temporal continuity scanning. |
| **3** | **Payment Screenshot Verification (Paytm Engine)** | Specialized Paytm inspector verifying: <br>• **Brand Cyan Hex Conformity** (`#00B9F5` vs fake `#0070BA` app blue)<br>• **Typography & Kerning Analysis** (detects Arial/Calibri fallback fonts vs Paytm Sans)<br>• **12-Digit NPCI UPI Reference Number (UTR)** structural check & dummy pattern detection<br>• **Rupee (`₹`) Glyph Alignment & Drop Shadow Artifacts**<br>• **"Sender Claims Paid, Receiver Got ₹0" Diagnostic**: explains the exact APK spoofing mechanism and gives actionable merchant guidance. |
| **4** | **Detection Percentage** | **Dual 3D Radial Gauges** quantifying **Overall Authenticity (%)** vs **Suspicious Manipulation (%)**, backed by a 5-dimension forensic breakdown (Font Integrity %, Splicing/ELA %, Metadata Clearance %, Layout Conformity %, Sharpness Index %). |
| **5** | **Reason for Detection (Explainable AI / XAI)** | **Itemized, severity-tagged forensic audit logs** (`CRITICAL`, `HIGH`, `PASS`) explaining *exactly why* the content is classified as genuine or suspicious, complete with coordinate bounding box highlights and a downloadable/printable **Official Forensic Audit Report (JSON & Print)**. |

---

## 🚀 3D Animated & User-Friendly Features

1. **3D WebGL Holographic Shield & Cyber Constellation**: Interactive Three.js 3D viewport featuring a rotating wireframe cyber-shield, orbiting scanning rings, and mouse-parallax particle constellations reacting dynamically to the threat level (Emerald for Safe, Cyan for Ready, Red for Critical Fraud).
2. **Interactive 3D Tilt Drag & Drop Zone**: Interactive card with perspective-1000 mouse tracking, scanning laser animations, and file format validation.
3. **1-Click Instant Test Presets (Zero Upload Required)**:
   - 🚨 *Fake Paytm Screenshot (₹15,000 Scam)*: Spliced amount font, mock UTR (`998877665544`), off-brand blue.
   - 🛡️ *Genuine Paytm Screenshot (₹2,450 Verified)*: Verified Paytm typography, official cyan `#00B9F5`, valid 12-digit UTR.
   - 🔍 *Severely Blurred Cheque / Receipt*: Defocus blur failing legal thresholds (Variance: 28.5).
   - 📄 *Tampered Settlement Document*: Altered amount with ELA highlight and Photoshop XMP tag.
4. **Official Audit Export**: Generates printable forensic certificates and JSON audit trails for compliance or legal disputes.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Glassmorphism + Modern Dark Cyberpunk theme
- **3D Graphics**: Three.js (WebGL icosahedron, orbiting rings, particle constellation, mouse parallax)
- **Computer Vision & Forensics**: In-browser Discrete Laplacian Kernel, Sobel Edge Gradient, Error Level Analysis (ELA) canvas diffing, Binary Header/XMP Inspection.
- **Icons**: Lucide React
- **Celebration Feedback**: Canvas Confetti (triggers on genuine transaction verification)

---

## 💻 How to Run the Frontend

```bash
# 1. Navigate to the frontend folder
cd frontend

# 2. Install dependencies (already installed)
npm install

# 3. Start the local development server
npm run dev
```

Visit the URL displayed in the terminal (typically `http://localhost:5173`) in your web browser.

---

## 📁 Folder Structure

```
frontend/
├── index.html                   # HTML entry point with fonts & metadata
├── vite.config.js               # Vite 8 + Tailwind CSS v4 configuration
├── package.json                 # Dependencies & build scripts
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Main orchestrator & state manager
│   ├── index.css                # Tailwind imports & 3D utility classes
│   ├── components/
│   │   ├── ThreeBackground.jsx  # Interactive Three.js 3D WebGL scene
│   │   ├── Header.jsx           # Cyberpunk header & objective tabs
│   │   ├── UploadZone.jsx       # 3D tilt drag-and-drop & preset buttons
│   │   ├── PaytmVerifier.jsx    # Objective 3: Paytm payment verification
│   │   ├── BlurDetector.jsx     # Objective 1: Blur & Laplacian edge map
│   │   ├── ForensicELAViewer.jsx# Objective 2: ELA & document/video tamper
│   │   ├── PercentageScorecard.jsx # Objective 4: Detection percentage gauges
│   │   ├── ExplainableReasons.jsx  # Objective 5: Explainable AI reasons log
│   │   └── ReportModal.jsx      # Official Forensic Audit Report certificate
│   ├── data/
│   │   └── demoPresets.js       # Pre-rendered test presets for all 5 objectives
│   └── utils/
│       └── forensicEngine.js    # Real in-browser forensic analysis algorithms
└── dist/                        # Production build output
```
