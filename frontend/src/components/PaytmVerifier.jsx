import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle, HelpCircle, ArrowRight, Eye, Sparkles, Smartphone, Landmark, Info } from 'lucide-react';

export default function PaytmVerifier({ analysisData, currentImage }) {
  const [activeInspector, setActiveInspector] = useState('overview'); // 'overview', 'typography', 'utr', 'receiver_action'
  const [highlightBoxes, setHighlightBoxes] = useState(true);

  if (!analysisData) {
    return (
      <div className="glass-panel rounded-2xl p-8 text-center text-slate-400">
        <Smartphone className="w-12 h-12 text-cyan-400 mx-auto mb-3 opacity-60" />
        <h3 className="text-lg font-bold text-white mb-1">No Screenshot Loaded</h3>
        <p className="text-xs">Upload a Paytm payment screenshot or select the "Fake Paytm Screenshot" preset above to run analysis.</p>
      </div>
    );
  }

  const {
    isGenuine,
    overallAuthenticity,
    suspicionRate,
    riskLevel,
    paytmBrandCheck,
    fontAnalysis,
    transactionIdCheck,
    receiverNonReceiptDiagnosis,
    reasons
  } = analysisData;

  return (
    <div className="space-y-6">
      {/* Top Status Banner */}
      <div className={`rounded-2xl p-5 border transition-all duration-300 ${
        isGenuine
          ? 'glass-panel-success border-emerald-500/40 text-emerald-300'
          : 'glass-panel-danger border-red-500/40 text-red-300'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className={`p-3 rounded-xl ${
              isGenuine ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {isGenuine ? <ShieldCheck className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8 animate-pulse" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-black/40 border border-white/10">
                  Objective 3: Paytm Verification
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  isGenuine ? 'bg-emerald-500/30 text-emerald-300' : 'bg-red-500/30 text-red-200'
                }`}>
                  {riskLevel}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {isGenuine
                  ? 'Payment Screenshot Verified Genuine'
                  : 'Counterfeit / Fake Paytm Screenshot Detected'}
              </h2>
              <p className="text-xs opacity-90 max-w-2xl mt-0.5">
                {isGenuine
                  ? 'Official Paytm typography, valid NPCI 12-digit UTR structure, and official #00B9F5 cyan branding verified.'
                  : 'Detected signatures consistent with Prank/Spoof Paytm APK generators and image editing software.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-black/40 px-4 py-3 rounded-xl border border-white/10 shrink-0">
            <div className="text-right">
              <div className="text-[10px] font-mono uppercase text-slate-400">Authenticity</div>
              <div className="text-2xl font-black font-mono text-cyan-400">{overallAuthenticity}%</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-right">
              <div className="text-[10px] font-mono uppercase text-slate-400">Fraud Risk</div>
              <div className="text-2xl font-black font-mono text-red-400">{suspicionRate}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Receiver Non-Receipt Special Case Alert (Crucial Requirement!) */}
      <div className={`rounded-2xl p-5 border ${
        isGenuine
          ? 'bg-sky-950/30 border-sky-500/30 text-sky-200'
          : 'bg-gradient-to-r from-red-950/60 via-amber-950/40 to-slate-950/60 border-red-500/40 text-slate-200 shadow-xl'
      }`}>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Receiver Non-Receipt Diagnostic</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Sender claims Paid · Receiver got ₹0
                </span>
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-amber-300">Root Cause: </strong>
              {receiverNonReceiptDiagnosis?.probableCause}
            </p>
            <div className="mt-2.5 p-3 rounded-xl bg-black/40 border border-white/10 text-xs">
              <span className="text-cyan-400 font-bold block mb-1">Recommended Merchant Action:</span>
              <p className="text-slate-300">{receiverNonReceiptDiagnosis?.actionForMerchant}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Workbench: Visual Screenshot vs Forensic Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Visual Display (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="glass-panel rounded-2xl p-4 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                Live Visual Inspector
              </span>
              <button
                onClick={() => setHighlightBoxes(!highlightBoxes)}
                className={`text-[11px] font-mono px-2.5 py-1 rounded-md border transition cursor-pointer ${
                  highlightBoxes
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {highlightBoxes ? 'Hide Anomaly Boxes' : 'Show Anomaly Boxes'}
              </button>
            </div>

            <div className="relative mx-auto max-w-[340px] rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-950">
              <img
                src={currentImage}
                alt="Target Screenshot"
                className="w-full h-auto object-contain block select-none"
              />

              {/* Forensic Bounding Box Highlights (Active when non-genuine) */}
              {!isGenuine && highlightBoxes && (
                <>
                  {/* Amount Tamper Box */}
                  <div className="absolute top-[40%] left-[16%] w-[68%] h-[7%] border-2 border-red-500 bg-red-500/15 rounded flex items-center justify-center pointer-events-none animate-pulse">
                    <span className="absolute -top-3.5 left-2 px-1 text-[9px] font-mono font-bold bg-red-600 text-white rounded">
                      ANOMALY: Font Mismatch
                    </span>
                  </div>

                  {/* UTR Box */}
                  <div className="absolute top-[60%] left-[10%] w-[80%] h-[5%] border-2 border-amber-500 bg-amber-500/15 rounded flex items-center justify-center pointer-events-none">
                    <span className="absolute -top-3.5 right-2 px-1 text-[9px] font-mono font-bold bg-amber-600 text-white rounded">
                      MOCK UTR FORMAT
                    </span>
                  </div>

                  {/* Badge Color Check Box */}
                  <div className="absolute top-[18%] left-[38%] w-[24%] h-[14%] border-2 border-cyan-400 bg-cyan-400/10 rounded-full pointer-events-none">
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-1 text-[9px] font-mono font-bold bg-slate-900 text-cyan-400 border border-cyan-500 rounded">
                      Color Hue Delta
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="text-[11px] font-mono text-center text-slate-400 mt-3">
              {isGenuine
                ? '✓ High visual concordance with official Paytm v10 Android/iOS client.'
                : '⚠️ Red & Amber boxes highlight regions deviating from Paytm specs.'}
            </div>
          </div>
        </div>

        {/* Right: Forensic Spec Comparison Cards (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Sub-tabs */}
          <div className="flex space-x-2 border-b border-slate-800 pb-2">
            {[
              { id: 'overview', label: 'Brand & Hex Check' },
              { id: 'typography', label: 'Typography & Layout' },
              { id: 'utr', label: 'UTR / NPCI Validation' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveInspector(tab.id)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeInspector === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Brand & Hex */}
          {activeInspector === 'overview' && (
            <div className="space-y-3">
              <div className="glass-panel rounded-xl p-4 border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Paytm Official Brand Consistency Check
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Primary Brand Color</span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-5 h-5 rounded-md bg-[#00B9F5] border border-white/20 shadow" />
                      <span className="font-mono font-bold text-white">#00B9F5</span>
                      <span className="text-[11px] text-slate-400">(Official Paytm Cyan)</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Detected Badge Color</span>
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className="w-5 h-5 rounded-md border border-white/20 shadow"
                        style={{ backgroundColor: paytmBrandCheck?.detectedHex?.split(' ')[0] || '#00B9F5' }}
                      />
                      <span className="font-mono font-bold text-white">{paytmBrandCheck?.detectedHex}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300">
                  <span className="font-semibold text-white block mb-0.5">Success Badge Geometry:</span>
                  <span className={paytmBrandCheck?.logoHexValid ? 'text-emerald-400' : 'text-red-400'}>
                    {paytmBrandCheck?.badgeGeometry || 'Standard anti-aliased SVG arc'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Typography */}
          {activeInspector === 'typography' && (
            <div className="space-y-3">
              <div className="glass-panel rounded-xl p-4 border border-slate-800 space-y-3 text-xs">
                <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-cyan-400" />
                  Font &amp; Kerning Forensic Analysis
                </h4>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-400">Target Typeface:</span>
                    <span className="font-mono font-semibold text-white">
                      {fontAnalysis?.primaryFont || 'System Arial / Fallback'}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-400">Authentic Spec:</span>
                    <span className="font-mono text-cyan-400 font-semibold">Paytm Sans / Roboto Medium</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-400">Digit Kerning &amp; Alignment:</span>
                    <span className={isGenuine ? 'text-emerald-400 font-mono' : 'text-red-400 font-mono'}>
                      {fontAnalysis?.kerningAnomaly || 'Standard'}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-400">Rupee Symbol (₹) Glyph:</span>
                    <span className={isGenuine ? 'text-emerald-400' : 'text-amber-400'}>
                      {isGenuine ? 'Native Vector Glyph' : 'Raster Scaled / Spliced artifact'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: UTR */}
          {activeInspector === 'utr' && (
            <div className="space-y-3">
              <div className="glass-panel rounded-xl p-4 border border-slate-800 space-y-3 text-xs">
                <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Landmark className="w-3.5 h-3.5 text-cyan-400" />
                  NPCI 12-Digit UPI Reference Number (UTR) Check
                </h4>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Extracted UPI Ref No:</span>
                    <span className="font-mono font-bold text-sm text-cyan-300">
                      {transactionIdCheck?.upiRef}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">12-Digit Structure:</span>
                    <span className={transactionIdCheck?.validFormat ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                      {transactionIdCheck?.validFormat ? '✓ Exact 12 Digits' : '✗ Format Invalid'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">NPCI Sequence Checksum:</span>
                    <span className={isGenuine ? 'text-emerald-400' : 'text-red-400 font-medium'}>
                      {transactionIdCheck?.npciSequenceCheck || 'Validated against banking format'}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  * Note: In real-world scams, fraudsters use apps that generate random dummy digits like <code>998877665544</code> or <code>123456789012</code> which fail bank clearing network validation.
                </p>
              </div>
            </div>
          )}

          {/* Quick Reasons List */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Paytm Verification Key Findings:
            </span>
            {reasons.slice(0, 3).map((r, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-2.5 text-xs"
              >
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                  r.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                  r.severity === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                  'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {r.severity}
                </span>
                <div>
                  <div className="font-semibold text-slate-200">{r.title}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{r.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
