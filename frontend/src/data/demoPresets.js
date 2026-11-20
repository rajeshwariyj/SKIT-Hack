/**
 * High-fidelity Demo Presets for Instant Testing
 * Covers all 5 Project Objectives:
 * 1. Blur Detection
 * 2. Document / Photo / Video Tampering
 * 3. Paytm Payment Verification (Genuine vs Fake)
 * 4. Percentage Breakdown
 * 5. Explainable Forensic Reasons
 */

// Generate realistic SVG Data URLs for standalone zero-dependency testing
function createPaytmSvg(isFake) {
  const amount = isFake ? '15,000' : '2,450';
  const upiRef = isFake ? '998877665544' : '432489102456';
  const primaryBlue = isFake ? '#0070BA' : '#00B9F5'; // Fake apps often use PayPal blue instead of Paytm cyan!
  const statusFont = isFake ? 'Arial, sans-serif' : 'system-ui, -apple-system, Roboto, sans-serif';
  const subtitle = isFake ? 'Paid to Merchant Store' : 'Paid Successfully to Cafe Coffee Day';
  const dateStr = isFake ? '18 Nov 2024, 10:45 AM' : '19 Nov 2024, 02:15 PM';

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="450" height="750" viewBox="0 0 450 750">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0a101d"/>
        <stop offset="100%" stop-color="#050811"/>
      </linearGradient>
      <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${primaryBlue}"/>
        <stop offset="100%" stop-color="${isFake ? '#004c80' : '#0090c0'}"/>
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.5"/>
      </filter>
    </defs>

    <!-- Phone Container -->
    <rect width="450" height="750" rx="36" fill="url(#bgGrad)"/>
    <rect x="10" y="10" width="430" height="730" rx="28" fill="#ffffff"/>

    <!-- Android Status Bar -->
    <rect x="10" y="10" width="430" height="34" fill="#f8fafc"/>
    <text x="35" y="32" font-family="${isFake ? 'Courier New' : 'sans-serif'}" font-size="13" font-weight="600" fill="#1e293b">${isFake ? '02:15' : '14:15'}</text>
    <circle cx="395" cy="27" r="4" fill="#64748b"/>
    <rect x="405" y="22" width="18" height="10" rx="2" fill="#64748b"/>

    <!-- App Header -->
    <rect x="10" y="44" width="430" height="60" fill="#ffffff" border-bottom="1px solid #e2e8f0"/>
    <text x="35" y="80" font-family="sans-serif" font-size="20" font-weight="700" fill="#0f172a">←</text>
    <text x="65" y="80" font-family="sans-serif" font-size="16" font-weight="700" fill="#002970">Paytm</text>
    <text x="115" y="80" font-family="sans-serif" font-size="12" font-weight="600" fill="#00b9f5">Payments Bank</text>
    <text x="385" y="80" font-family="sans-serif" font-size="13" font-weight="600" fill="#0284c7">Help</text>

    <!-- Success Checkmark Badge -->
    <g transform="translate(225, 170)">
      <circle cx="0" cy="0" r="42" fill="url(#badgeGrad)" filter="url(#shadow)"/>
      <path d="M-16 -2 L-4 12 L18 -12" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <!-- Payment Status Text -->
    <text x="225" y="245" text-anchor="middle" font-family="${statusFont}" font-size="20" font-weight="700" fill="#0f172a">
      Paid Successfully
    </text>
    <text x="225" y="270" text-anchor="middle" font-family="${statusFont}" font-size="14" font-weight="500" fill="#64748b">
      ${subtitle}
    </text>

    <!-- Amount Display (Notice font manipulation in fake!) -->
    <g transform="translate(225, 330)">
      <text x="0" y="0" text-anchor="middle" font-family="${isFake ? 'Arial Black, Impact, sans-serif' : 'system-ui, Roboto, sans-serif'}" font-size="${isFake ? '38' : '36'}" font-weight="800" fill="${isFake ? '#0f172a' : '#111827'}">
        ₹ ${amount}
      </text>
      ${isFake ? '<rect x="-95" y="-35" width="190" height="42" fill="rgba(255, 0, 0, 0.08)" stroke="#ef4444" stroke-dasharray="3 3"/>' : ''}
    </g>

    <text x="225" y="370" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="500" fill="#64748b">
      ${dateStr}
    </text>

    <!-- Transaction Details Card -->
    <g transform="translate(30, 400)">
      <rect width="390" height="230" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
      
      <text x="20" y="35" font-family="sans-serif" font-size="13" font-weight="600" fill="#334155">Transaction Details</text>
      
      <text x="20" y="70" font-family="sans-serif" font-size="12" fill="#64748b">UPI Reference No (UTR)</text>
      <text x="370" y="70" text-anchor="end" font-family="${isFake ? 'Courier, monospace' : 'sans-serif'}" font-size="12" font-weight="700" fill="${isFake ? '#dc2626' : '#0f172a'}">${upiRef}</text>
      
      <line x1="20" y1="88" x2="370" y2="88" stroke="#f1f5f9" stroke-width="1"/>

      <text x="20" y="115" font-family="sans-serif" font-size="12" fill="#64748b">To</text>
      <text x="370" y="115" text-anchor="end" font-family="sans-serif" font-size="12" font-weight="600" fill="#0f172a">${isFake ? 'merchant@fakeupi' : 'ccd.store@paytm'}</text>

      <line x1="20" y1="133" x2="370" y2="133" stroke="#f1f5f9" stroke-width="1"/>

      <text x="20" y="160" font-family="sans-serif" font-size="12" fill="#64748b">From Bank Account</text>
      <text x="370" y="160" text-anchor="end" font-family="sans-serif" font-size="12" font-weight="600" fill="#0f172a">State Bank of India - 4409</text>

      <line x1="20" y1="178" x2="370" y2="178" stroke="#f1f5f9" stroke-width="1"/>

      <text x="20" y="205" font-family="sans-serif" font-size="12" fill="#64748b">Payment Mode</text>
      <text x="370" y="205" text-anchor="end" font-family="sans-serif" font-size="12" font-weight="600" fill="#0284c7">UPI</text>
    </g>

    <!-- Share / Repeat Button -->
    <rect x="40" y="660" width="370" height="46" rx="23" fill="#00b9f5"/>
    <text x="225" y="688" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff">Share Receipt</text>

    ${isFake ? `
      <!-- Forensic Warning Overlay Label -->
      <rect x="20" y="705" width="410" height="26" rx="6" fill="#fef2f2" stroke="#f87171"/>
      <text x="225" y="722" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#b91c1c">
        ⚠️ FORENSIC ANOMALY: Spliced Amount Font &amp; Mock UTR Sequence
      </text>
    ` : ''}
  </svg>
  `;

  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.trim());
}

// Generate Blurred Receipt SVG
function createBlurredReceiptSvg() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="450" height="600" viewBox="0 0 450 600">
    <defs>
      <filter id="heavyBlur">
        <feGaussianBlur stdDeviation="7.5"/>
      </filter>
    </defs>
    <rect width="450" height="600" fill="#1e293b"/>
    <g filter="url(#heavyBlur)">
      <rect x="40" y="40" width="370" height="520" rx="12" fill="#ffffff"/>
      <text x="225" y="100" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="800" fill="#000000">OFFICIAL BANK RECEIPT</text>
      <text x="70" y="160" font-family="sans-serif" font-size="16" fill="#333333">Account No: 987654321098</text>
      <text x="70" y="200" font-family="sans-serif" font-size="16" fill="#333333">Branch: Mumbai Central</text>
      <text x="70" y="250" font-family="sans-serif" font-size="24" font-weight="bold" fill="#000000">Amount Paid: Rs. 45,000.00</text>
      <text x="70" y="300" font-family="sans-serif" font-size="14" fill="#666666">Txn ID: BNK-2024-9988110</text>
      <rect x="70" y="340" width="200" height="60" fill="#e2e8f0"/>
      <text x="170" y="375" text-anchor="middle" font-family="serif" font-size="18" fill="#1e293b">AUTHORIZED SIGNATURE</text>
      <circle cx="340" cy="450" r="50" fill="none" stroke="#dc2626" stroke-width="4"/>
      <text x="340" y="455" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#dc2626">BANK STAMP</text>
    </g>
  </svg>
  `;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.trim());
}

// Generate Tampered Document SVG (With pasted stamp & Photoshop signature)
function createTamperedDocumentSvg() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="650" viewBox="0 0 500 650">
    <rect width="500" height="650" fill="#0f172a"/>
    <rect x="25" y="25" width="450" height="600" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    
    <!-- Document Header -->
    <text x="250" y="80" text-anchor="middle" font-family="Georgia, serif" font-size="20" font-weight="700" fill="#0f172a">CERTIFICATE OF CLEARANCE &amp; SETTLEMENT</text>
    <line x1="50" y1="95" x2="450" y2="95" stroke="#94a3b8" stroke-width="1.5"/>

    <text x="60" y="140" font-family="Arial, sans-serif" font-size="14" fill="#334155">Reference ID: FIN-2024-88910</text>
    <text x="60" y="170" font-family="Arial, sans-serif" font-size="14" fill="#334155">Issue Date: 12 October 2024</text>
    
    <text x="60" y="220" font-family="Arial, sans-serif" font-size="14" fill="#1e293b">This is to certify that all outstanding liabilities totaling</text>
    
    <!-- Tampered Amount Region (Mismatch in background noise & font) -->
    <rect x="58" y="235" width="210" height="34" fill="#ffffff" stroke="#ef4444" stroke-dasharray="4 2"/>
    <text x="65" y="260" font-family="'Courier New', Courier, monospace" font-size="19" font-weight="bold" fill="#b91c1c">INR 1,20,000.00</text>
    <text x="280" y="260" font-family="Arial, sans-serif" font-size="14" fill="#1e293b">have been verified.</text>

    <text x="60" y="320" font-family="Arial, sans-serif" font-size="13" fill="#64748b">Audited by: Regional Clearance Authority</text>
    <text x="60" y="350" font-family="Arial, sans-serif" font-size="13" fill="#64748b">Status: CLEARED AND SETTLED</text>

    <!-- Cloned / Pasted Stamp (Different rotation, compression artifact) -->
    <g transform="translate(340, 460) rotate(-14)">
      <circle cx="0" cy="0" r="54" fill="rgba(239, 68, 68, 0.08)" stroke="#dc2626" stroke-width="3" stroke-dasharray="6 3"/>
      <circle cx="0" cy="0" r="46" fill="none" stroke="#dc2626" stroke-width="1"/>
      <text x="0" y="-8" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="900" fill="#dc2626">GOVT VERIFIED</text>
      <text x="0" y="12" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" font-weight="700" fill="#dc2626">OFFICIAL SEAL</text>
      <text x="0" y="26" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" fill="#dc2626">★ NEW DELHI ★</text>
    </g>

    <g transform="translate(80, 520)">
      <line x1="0" y1="0" x2="160" y2="0" stroke="#475569" stroke-width="1"/>
      <text x="80" y="20" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#64748b">Authorized Signatory</text>
    </g>
  </svg>
  `;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.trim());
}

export const DEMO_PRESETS = [
  {
    id: 'fake_paytm',
    name: 'Fake Paytm Screenshot (Fraud Attempt)',
    category: 'Payment Verification',
    badge: 'CRITICAL FRAUD',
    badgeColor: 'border-red-500 text-red-400 bg-red-950/40',
    description: 'Sender claims ₹15,000 sent via Paytm. Receiver got 0 SMS/credit. Analysis detects mock generator template, wrong color hue (#0070BA), and invalid UTR.',
    dataUrl: createPaytmSvg(true),
    fileName: 'Paytm_Payment_Successful_15000.png',
    fileType: 'image/png',
    presetType: 'fake_paytm',
    blurVariance: 285.4,
    softwareTag: 'Adobe Photoshop 2024 / PicsArt Spoof',
    upiRef: '998877665544',
    amount: '₹15,000',
    sender: 'Vikram Joshi (Claiming Success)',
    receiver: 'Sharma Electronics Store',
    genuineScore: 12,
    fakeScore: 88,
    reasonsCount: 5,
    blurStatus: 'Sharp (310 Var)',
    isPaymentScreen: true
  },
  {
    id: 'genuine_paytm',
    name: 'Genuine Paytm Screenshot (Verified)',
    category: 'Payment Verification',
    badge: 'VERIFIED GENUINE',
    badgeColor: 'border-emerald-500 text-emerald-400 bg-emerald-950/40',
    description: 'Official Paytm transaction of ₹2,450. Authentic Paytm cyan branding (#00B9F5), validated 12-digit Bank RRN/UTR, and zero compression anomalies.',
    dataUrl: createPaytmSvg(false),
    fileName: 'Paytm_Genuine_Receipt_2450.png',
    fileType: 'image/png',
    presetType: 'genuine_paytm',
    blurVariance: 320.1,
    softwareTag: null,
    upiRef: '432489102456',
    amount: '₹2,450',
    sender: 'Aditi Rao',
    receiver: 'Cafe Coffee Day',
    genuineScore: 96,
    fakeScore: 4,
    reasonsCount: 4,
    blurStatus: 'Sharp (345 Var)',
    isPaymentScreen: true
  },
  {
    id: 'blurred_receipt',
    name: 'Severely Blurred Bank Cheque/Receipt',
    category: 'Blur Image Detection',
    badge: 'CRITICALLY BLURRED',
    badgeColor: 'border-amber-500 text-amber-400 bg-amber-950/40',
    description: 'Defocus and motion blur render critical text and account numbers unreadable. Fails legal forensic threshold (Score: 24/100).',
    dataUrl: createBlurredReceiptSvg(),
    fileName: 'Bank_Cheque_Deposit_Slip_Blurred.jpg',
    fileType: 'image/jpeg',
    presetType: 'blurred_document',
    blurVariance: 28.5,
    softwareTag: null,
    upiRef: 'BNK-2024-9988110',
    amount: '₹45,000',
    sender: 'Unknown',
    receiver: 'Mumbai Central Bank',
    genuineScore: 41,
    fakeScore: 59,
    reasonsCount: 4,
    blurStatus: 'Critically Blurred (28 Var)',
    isPaymentScreen: false
  },
  {
    id: 'tampered_document',
    name: 'Altered Settlement Document (ELA Tampered)',
    category: 'Document & Photo Tampering',
    badge: 'TAMPERED DOCUMENT',
    badgeColor: 'border-purple-500 text-purple-400 bg-purple-950/40',
    description: 'Altered clearance certificate with spliced financial amount and copied government seal. ELA highlights 3.8x compression variance.',
    dataUrl: createTamperedDocumentSvg(),
    fileName: 'Clearance_Settlement_Certificate_2024.png',
    fileType: 'image/png',
    presetType: 'tampered_doc',
    blurVariance: 210.0,
    softwareTag: 'Adobe Photoshop 24.2 (Macintosh)',
    upiRef: 'FIN-2024-88910',
    amount: '₹1,20,000',
    sender: 'Regional Clearance Authority',
    receiver: 'Enterprise Client',
    genuineScore: 23,
    fakeScore: 77,
    reasonsCount: 5,
    blurStatus: 'Clear (240 Var)',
    isPaymentScreen: false
  }
];
