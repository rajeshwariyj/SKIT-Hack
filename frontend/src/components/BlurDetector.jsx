import React, { useState, useEffect } from 'react';
import { Eye, AlertCircle, CheckCircle, Sliders, Activity, Info, Camera, Sparkles, RefreshCw } from 'lucide-react';
import { generateEdgeMapDataUrl } from '../utils/forensicEngine';

export default function BlurDetector({ sharpnessData, currentImage, onTestPreset }) {
  const [viewMode, setViewMode] = useState('edges'); // 'edges', 'original', 'split'
  const [sensitivity, setSensitivity] = useState(1.4);
  const [edgeMapUrl, setEdgeMapUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [simulatedBlur, setSimulatedBlur] = useState(0);

  // Generate edge map safely into a data URL
  useEffect(() => {
    if (!currentImage) return;

    setIsGenerating(true);
    const img = new Image();
    // Do NOT set crossOrigin on data: URLs as it taints the canvas
    if (!currentImage.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }

    img.onload = () => {
      const url = generateEdgeMapDataUrl(img, sensitivity);
      setEdgeMapUrl(url);
      setIsGenerating(false);
    };

    img.onerror = () => {
      setIsGenerating(false);
    };

    img.src = currentImage;
  }, [currentImage, sensitivity]);

  // Derived metrics with dynamic simulated blur adjustment
  const baseVariance = sharpnessData?.variance ?? 180;
  const currentVariance = Math.max(8, Math.round(baseVariance / (1 + simulatedBlur * 0.95)));
  const currentScore = Math.min(100, Math.round((currentVariance / 380) * 100));
  const isBlurred = currentVariance < 140;

  let classification = 'Sharp & In-Focus';
  if (currentVariance < 60) classification = 'Critically Blurred';
  else if (currentVariance < 140) classification = 'Soft / Motion Blurred';
  else if (currentVariance < 280) classification = 'Moderate Sharpness';

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className={`rounded-2xl p-5 border transition-all duration-300 ${
        isBlurred
          ? 'glass-panel-warning border-amber-500/40 text-amber-200'
          : 'glass-panel-success border-emerald-500/40 text-emerald-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className={`p-3 rounded-xl ${isBlurred ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
              <Eye className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-black/40 border border-white/10">
                  Objective 1: Blur Image Detection
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  isBlurred ? 'bg-amber-500/30 text-amber-300' : 'bg-emerald-500/30 text-emerald-300'
                }`}>
                  {classification}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {isBlurred ? 'Blur Detected (Degraded Forensic Detail)' : 'Crisp & In-Focus (High Detail Integrity)'}
              </h2>
              <p className="text-xs opacity-90 max-w-2xl mt-0.5">
                {isBlurred
                  ? 'High blur variance obscures text micro-edges, digital stamp artifacts, and compression seams.'
                  : 'High-frequency edge transitions are preserved. Font kerning and pixel interpolation can be reliably inspected.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-black/40 px-4 py-3 rounded-xl border border-white/10 shrink-0">
            <div className="text-right">
              <div className="text-[10px] font-mono uppercase text-slate-400">Clarity Index</div>
              <div className="text-2xl font-black font-mono text-cyan-400">{currentScore} / 100</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-right">
              <div className="text-[10px] font-mono uppercase text-slate-400">Laplacian Var</div>
              <div className="text-2xl font-black font-mono text-slate-200">{currentVariance}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual View (7 Cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-4 border border-slate-800 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                Sobel Edge Gradient Analyzer
              </span>
            </div>

            {/* View Mode Switcher Buttons */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('edges')}
                className={`px-3 py-1 rounded transition cursor-pointer ${
                  viewMode === 'edges' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sobel Edge Map
              </button>
              <button
                type="button"
                onClick={() => setViewMode('original')}
                className={`px-3 py-1 rounded transition cursor-pointer ${
                  viewMode === 'original' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Original Image
              </button>
              <button
                type="button"
                onClick={() => setViewMode('split')}
                className={`px-3 py-1 rounded transition cursor-pointer ${
                  viewMode === 'split' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Side-by-Side
              </button>
            </div>
          </div>

          {/* Media Viewport */}
          <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 min-h-[380px] flex items-center justify-center p-3">
            {viewMode === 'original' && (
              <img
                src={currentImage}
                alt="Target Document"
                style={{ filter: simulatedBlur > 0 ? `blur(${simulatedBlur}px)` : 'none' }}
                className="max-h-[460px] max-w-full object-contain rounded-lg shadow-xl"
              />
            )}

            {viewMode === 'edges' && (
              <div className="relative flex items-center justify-center w-full">
                {edgeMapUrl ? (
                  <img
                    src={edgeMapUrl}
                    alt="Sobel Edge Map"
                    style={{ filter: simulatedBlur > 0 ? `blur(${simulatedBlur}px)` : 'none' }}
                    className="max-h-[460px] max-w-full object-contain rounded-lg shadow-2xl"
                  />
                ) : (
                  <div className="text-xs text-slate-400 flex items-center gap-2 py-16">
                    <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
                    <span>Rendering Sobel Edge Map...</span>
                  </div>
                )}
                <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-black/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-400">
                  Sobel Frequency: {currentVariance > 140 ? 'CRISP (HIGH ENERGY)' : 'LOW (BLURRED)'}
                </div>
              </div>
            )}

            {viewMode === 'split' && (
              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-400 block text-center uppercase tracking-wider">
                    Original Image
                  </span>
                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-1 flex items-center justify-center">
                    <img
                      src={currentImage}
                      alt="Original"
                      style={{ filter: simulatedBlur > 0 ? `blur(${simulatedBlur}px)` : 'none' }}
                      className="max-h-[360px] w-full object-contain rounded"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-cyan-400 block text-center uppercase tracking-wider">
                    Sobel Edge Map
                  </span>
                  <div className="rounded-lg border border-cyan-900/40 bg-slate-900/60 p-1 flex items-center justify-center">
                    {edgeMapUrl ? (
                      <img
                        src={edgeMapUrl}
                        alt="Sobel Edge Map"
                        style={{ filter: simulatedBlur > 0 ? `blur(${simulatedBlur}px)` : 'none' }}
                        className="max-h-[360px] w-full object-contain rounded"
                      />
                    ) : (
                      <div className="text-xs text-slate-500 py-12">Rendering...</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Controls Bar */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Slider 1: Sobel Edge Sensitivity */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-400 font-mono text-[11px]">
                  <span>Sobel Edge Sensitivity:</span>
                  <span className="text-cyan-400 font-bold">{sensitivity.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.1"
                  value={sensitivity}
                  onChange={(e) => setSensitivity(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Slider 2: Interactive Blur Simulator */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-400 font-mono text-[11px]">
                  <span>Interactive Blur Simulation:</span>
                  <span className={simulatedBlur > 0 ? 'text-amber-400 font-bold' : 'text-slate-400 font-bold'}>
                    {simulatedBlur}px Blur
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={simulatedBlur}
                  onChange={(e) => setSimulatedBlur(parseInt(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] font-mono text-slate-400">
              <span>Cyan/Magenta highlight high-frequency optical contrast.</span>
              {simulatedBlur > 0 && (
                <button
                  type="button"
                  onClick={() => setSimulatedBlur(0)}
                  className="text-amber-400 hover:underline cursor-pointer"
                >
                  Reset Blur (0px)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Metrics Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              Clarity &amp; Sharpness Metrics
            </h4>

            {/* Gauge Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Clarity Index:</span>
                <span className="font-mono font-bold text-cyan-400">{currentScore}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden relative">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    currentScore > 70 ? 'bg-gradient-to-r from-emerald-500 to-cyan-400' :
                    currentScore > 40 ? 'bg-gradient-to-r from-amber-500 to-yellow-400' :
                    'bg-gradient-to-r from-red-600 to-red-400'
                  }`}
                  style={{ width: `${currentScore}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0 (Heavy Blur)</span>
                <span>50 (Threshold)</span>
                <span>100 (Razor Sharp)</span>
              </div>
            </div>

            {/* Micro Details List */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Laplacian Variance:</span>
                <span className="font-mono font-bold text-slate-200">{currentVariance}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Blur Type Diagnostic:</span>
                <span className="font-mono text-slate-200">
                  {currentVariance < 50 ? 'Severe Defocus Blur' : currentVariance < 140 ? 'Directional Motion Blur' : 'Uniform Optical Focus'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Forensic Detail Integrity:</span>
                <span className={isBlurred ? 'text-amber-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                  {isBlurred ? 'Pixel interpolation hidden by blur' : 'Clear sub-pixel font boundaries'}
                </span>
              </div>
            </div>

            {/* Why Blur Matters in Fraud */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs space-y-1">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                Why Scammers Deliberately Blur Screenshots:
              </span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Fraudsters intentionally apply slight motion blur or take low-angle out-of-focus camera photos of phones to hide mismatched fonts, pasted UTR bounding boxes, and JPEG compression boundaries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
