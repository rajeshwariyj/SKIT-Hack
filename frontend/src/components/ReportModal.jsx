import React from 'react';
import { X, Download, Printer, ShieldCheck, ShieldAlert, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ReportModal({ isOpen, onClose, reportData, currentFile }) {
  if (!isOpen || !reportData) return null;

  const {
    isGenuine,
    overallAuthenticity,
    suspicionRate,
    riskLevel,
    reasons = [],
    sharpnessData = {},
    metadata = {}
  } = reportData;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(
      {
        caseId: `CASE-${Date.now().toString(36).toUpperCase()}`,
        generatedAt: new Date().toISOString(),
        targetFile: currentFile?.fileName || 'evidence_screenshot.png',
        authenticityPercentage: overallAuthenticity,
        suspicionPercentage: suspicionRate,
        riskLevel,
        isGenuine,
        blurAnalysis: sharpnessData,
        metadata,
        evidenceReasons: reasons
      },
      null,
      2
    );

    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ForensicAuditReport_${currentFile?.fileName || 'Analysis'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Official Header */}
        <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${isGenuine ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
              {isGenuine ? <ShieldCheck className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-cyan-400 tracking-widest">
                OFFICIAL DIGITAL FORENSIC AUDIT REPORT
              </div>
              <h2 className="text-xl font-black text-white">ForensicGuard AI Verification Certificate</h2>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                Case ID: FG-{Math.random().toString(36).substring(2, 9).toUpperCase()} · Date: {new Date().toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              Print
            </button>
            <button
              onClick={handleDownloadJson}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white shadow-lg shadow-cyan-600/30 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download JSON
            </button>
          </div>
        </div>

        {/* Executive Verdict Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-slate-400 font-mono text-[10px] uppercase block">Overall Verdict</span>
            <span className={`text-base font-black font-mono mt-1 block ${isGenuine ? 'text-emerald-400' : 'text-red-400'}`}>
              {isGenuine ? 'VERIFIED GENUINE' : 'FRAUDULENT / TAMPERED'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-slate-400 font-mono text-[10px] uppercase block">Authenticity Index</span>
            <span className="text-base font-black font-mono text-cyan-400 mt-1 block">
              {overallAuthenticity}% Authentic
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-slate-400 font-mono text-[10px] uppercase block">Suspicion / Risk Rate</span>
            <span className="text-base font-black font-mono text-red-400 mt-1 block">
              {suspicionRate}% Manipulation
            </span>
          </div>
        </div>

        {/* 5 Objectives Audit Summary */}
        <div className="space-y-3 text-xs">
          <h3 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider">
            Findings Across 5 Project Objectives:
          </h3>

          <div className="space-y-2">
            {/* Obj 1 */}
            <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800 flex justify-between items-center">
              <div>
                <span className="font-bold text-white block">1. Blur &amp; Clarity Detection:</span>
                <span className="text-slate-400 text-[11px]">{sharpnessData.classification || 'Sharp'} (Score: {sharpnessData.score || 75}/100)</span>
              </div>
              <span className={`font-mono font-bold ${sharpnessData.isBlurred ? 'text-amber-400' : 'text-emerald-400'}`}>
                {sharpnessData.isBlurred ? 'BLURRED' : 'PASSED'}
              </span>
            </div>

            {/* Obj 2 */}
            <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800 flex justify-between items-center">
              <div>
                <span className="font-bold text-white block">2. Image, Video &amp; Document Splicing:</span>
                <span className="text-slate-400 text-[11px]">{metadata?.softwareSignature || 'Uniform compression'}</span>
              </div>
              <span className={`font-mono font-bold ${metadata?.hasPhotoshopTag ? 'text-red-400' : 'text-emerald-400'}`}>
                {metadata?.hasPhotoshopTag ? 'SPLICED' : 'UNIFORM'}
              </span>
            </div>

            {/* Obj 3 */}
            <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800 flex justify-between items-center">
              <div>
                <span className="font-bold text-white block">3. Paytm Payment &amp; UTR Verification:</span>
                <span className="text-slate-400 text-[11px]">Brand hex, font kerning, and 12-digit UTR evaluation</span>
              </div>
              <span className={`font-mono font-bold ${isGenuine ? 'text-emerald-400' : 'text-red-400'}`}>
                {isGenuine ? 'VALID PAYTM SPEC' : 'FAKE / SPOOF APP'}
              </span>
            </div>

            {/* Obj 4 */}
            <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800 flex justify-between items-center">
              <div>
                <span className="font-bold text-white block">4. Detection Percentage Distribution:</span>
                <span className="text-slate-400 text-[11px]">Authentic: {overallAuthenticity}% | Suspicious: {suspicionRate}%</span>
              </div>
              <span className="font-mono text-cyan-400 font-bold">COMPUTED</span>
            </div>

            {/* Obj 5 */}
            <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800 flex justify-between items-center">
              <div>
                <span className="font-bold text-white block">5. Reasons for Detection:</span>
                <span className="text-slate-400 text-[11px]">{reasons.length} specific forensic anomalies documented below</span>
              </div>
              <span className="font-mono text-indigo-400 font-bold">{reasons.length} LOGGED</span>
            </div>
          </div>
        </div>

        {/* Itemized Reasons List */}
        <div className="space-y-2 text-xs">
          <h4 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider">
            Detailed Reason Explanations:
          </h4>
          {reasons.map((r, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex gap-2 items-start">
              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded mt-0.5 ${
                r.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                r.severity === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {r.severity}
              </span>
              <div>
                <span className="font-bold text-slate-200 block">{r.title}</span>
                <span className="text-slate-400 text-[11px]">{r.description}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-slate-500 font-mono">
          <span>Target Evidence: {currentFile?.fileName || 'Screenshot.png'}</span>
          <span>Verified by ForensicGuard Neural Core Engine</span>
        </div>
      </div>
    </div>
  );
}
