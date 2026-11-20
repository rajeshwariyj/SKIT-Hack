import React, { useState } from 'react';
import { FileText, AlertTriangle, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, Filter, Info, ShieldAlert } from 'lucide-react';

export default function ExplainableReasons({ reasons = [], isGenuine, riskLevel }) {
  const [filter, setFilter] = useState('ALL'); // 'ALL', 'CRITICAL', 'HIGH', 'PASS'
  const [expandedId, setExpandedId] = useState(reasons[0]?.id || null);

  const filteredReasons = reasons.filter((r) => {
    if (filter === 'ALL') return true;
    if (filter === 'CRITICAL') return r.severity === 'CRITICAL';
    if (filter === 'HIGH') return r.severity === 'HIGH' || r.severity === 'WARNING';
    if (filter === 'PASS') return r.severity === 'PASS';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className={`rounded-2xl p-5 border transition-all duration-300 ${
        isGenuine
          ? 'glass-panel-success border-emerald-500/40 text-emerald-200'
          : 'glass-panel-danger border-red-500/40 text-red-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className={`p-3 rounded-xl ${isGenuine ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-black/40 border border-white/10">
                  Objective 5: Reason for Detection
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-black/40 border border-white/10">
                  {reasons.length} Evidence Vectors Logged
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Forensic Explainable AI (XAI) Audit Log
              </h2>
              <p className="text-xs opacity-90 max-w-2xl mt-0.5">
                Detailed technical breakdown clarifying why the content was classified as {isGenuine ? 'GENUINE' : 'SUSPICIOUS / FRAUDULENT'}.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-black/40 px-3 py-2 rounded-xl border border-white/10 text-xs">
            <span className="text-slate-400">Risk Severity:</span>
            <span className={`font-mono font-bold ${isGenuine ? 'text-emerald-400' : 'text-red-400'}`}>
              {riskLevel || 'ANALYZED'}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter Evidence:
          </span>
          {['ALL', 'CRITICAL', 'HIGH', 'PASS'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
                filter === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat === 'ALL' ? `All (${reasons.length})` : cat}
            </button>
          ))}
        </div>

        <span className="text-[11px] font-mono text-slate-500">
          Click any card to expand full forensic breakdown
        </span>
      </div>

      {/* Reasons List */}
      <div className="space-y-3">
        {filteredReasons.map((item, index) => {
          const isExpanded = expandedId === item.id || (!expandedId && index === 0);
          const isCritical = item.severity === 'CRITICAL';
          const isHigh = item.severity === 'HIGH' || item.severity === 'WARNING';
          const isPass = item.severity === 'PASS';

          return (
            <div
              key={item.id || index}
              className={`glass-panel rounded-xl border transition-all duration-200 overflow-hidden ${
                isCritical ? 'border-red-500/30 bg-red-950/10' :
                isHigh ? 'border-amber-500/30 bg-amber-950/10' :
                'border-emerald-500/30 bg-emerald-950/10'
              }`}
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg shrink-0 ${
                    isCritical ? 'bg-red-500/20 text-red-400' :
                    isHigh ? 'bg-amber-500/20 text-amber-400' :
                    'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {isPass ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isCritical ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        isHigh ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {item.severity}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{item.category}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-0.5">{item.title}</h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                    {isExpanded ? 'Collapse' : 'Details'}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-white/5 space-y-3 text-xs">
                  <div className="text-slate-300 leading-relaxed pl-11">
                    {item.description}
                  </div>

                  {/* Forensic Context Box */}
                  <div className="ml-11 p-3 rounded-lg bg-black/40 border border-white/10 text-[11px] text-slate-400 space-y-1">
                    <span className="text-cyan-400 font-semibold block flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" /> Technical Explanation:
                    </span>
                    <p>
                      {isCritical
                        ? 'This indicator carries high evidentiary weight. Fraudsters commonly alter these specific visual elements using layer overlays in mobile image editors.'
                        : isHigh
                        ? 'High probability of post-capture modification. Deviates from the standard cryptographic and layout pipeline of verified mobile applications.'
                        : 'Matches official reference baseline with zero detectable digital anomalies in this segment.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
