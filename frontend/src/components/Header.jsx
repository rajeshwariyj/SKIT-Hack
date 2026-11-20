import React from 'react';
import { ShieldCheck, AlertTriangle, Eye, Sparkles, FileText, Download, RefreshCw, Cpu } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenReport, onReset, threatLevel, onOpenPresets }) {
  const objectives = [
    { id: 'paytm', label: '1. Paytm Payment Verification', icon: ShieldCheck, desc: 'Fake screenshot & UTR diagnosis' },
    { id: 'blur', label: '2. Blur Image Detection', icon: Eye, desc: 'Laplacian & MTF sharpness analysis' },
    { id: 'tamper', label: '3. Image, Video & Doc Detection', icon: AlertTriangle, desc: 'ELA, Noise, & Splicing forensics' },
    { id: 'percentages', label: '4. Detection Percentage', icon: Sparkles, desc: 'Authenticity & suspicion metrics' },
    { id: 'reasons', label: '5. Reason for Detection', icon: FileText, desc: 'Explainable AI root cause logs' },
  ];

  return (
    <header className="relative z-20 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0">
      {/* Top micro-bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-800/40">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-[11px]">
            <Cpu className="w-3 h-3 animate-spin text-cyan-400" />
            AI FORENSIC ENGINE v3.4
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            NEURAL MODELS: ACTIVE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPresets}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-900/40 hover:bg-sky-800/60 text-sky-300 border border-sky-500/30 text-xs font-medium transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            Load Sample Presets
          </button>
          <button
            onClick={onOpenReport}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 text-xs font-medium transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            Export Audit Report
          </button>
          <button
            onClick={onReset}
            title="Reset analysis"
            className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Header Brand */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/25">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-cyan-400 group-hover:scale-110 transition duration-300" />
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                Forensic<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">Guard</span>
                <span className="text-xs px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono font-normal">
                  3D AI
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 max-w-xl">
              Next-Gen Screenshot Fraud Detection, Paytm Payment Verification, Document Tamper &amp; Blur Analysis
            </p>
          </div>
        </div>

        {/* Live Threat Indicator */}
        <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 px-4 py-2 rounded-xl">
          <div className="text-right">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Analysis Status</div>
            <div className={`text-xs font-bold font-mono ${
              threatLevel === 'CRITICAL' ? 'text-red-400' :
              threatLevel === 'WARNING' ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {threatLevel === 'CRITICAL' ? '🚨 FRAUDULENT TAMPERING DETECTED' :
               threatLevel === 'WARNING' ? '⚠️ SUSPICIOUS PATTERNS IDENTIFIED' :
               '🛡️ SYSTEM VERIFIED / READY'}
            </div>
          </div>
          <div className={`w-3 h-3 rounded-full ${
            threatLevel === 'CRITICAL' ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-pulse' :
            threatLevel === 'WARNING' ? 'bg-amber-500 shadow-lg shadow-amber-500/50 animate-pulse' :
            'bg-emerald-500 shadow-lg shadow-emerald-500/50'
          }`} />
        </div>
      </div>

      {/* Navigation Tabs (Aligned directly with the 5 Project Objectives) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {objectives.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-sky-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
