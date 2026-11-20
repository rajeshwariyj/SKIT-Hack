import React, { useState, useRef } from 'react';
import { Upload, FileImage, Film, FileText, Sparkles, CheckCircle2, FolderOpen } from 'lucide-react';

export default function UploadZone({ onFileUpload, onSelectPreset, presets, currentFile, isAnalyzing }) {
  const [isDragging, setIsDragging] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef(null);
  const cardRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    const isVideo = file.type.startsWith('video/');
    const reader = new FileReader();

    if (isVideo) {
      const url = URL.createObjectURL(file);
      onFileUpload({
        file,
        dataUrl: url,
        fileName: file.name,
        fileType: file.type,
        isVideo: true,
      });
    } else {
      reader.onload = (e) => {
        onFileUpload({
          file,
          dataUrl: e.target.result,
          fileName: file.name,
          fileType: file.type,
          isVideo: false,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // 3D Tilt effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (y / rect.height) * -10,
      y: (x / rect.width) * 10,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const openPickerWithAccept = (acceptType) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = acceptType;
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* 3D Tilt Card Upload Container */}
      <div
        className="perspective-1000 w-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={cardRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => openPickerWithAccept('image/*,video/*,.pdf')}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          className={`relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-7 transition-all duration-300 transform-style-3d ${
            isDragging
              ? 'border-cyan-400 bg-cyan-950/40 shadow-2xl shadow-cyan-500/30'
              : 'border-slate-700/80 hover:border-cyan-500/60 bg-slate-900/60 hover:bg-slate-900/80 shadow-xl'
          }`}
        >
          {/* Laser scanning beam line */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            <div className={`w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00e5ff] ${
              isAnalyzing ? 'animate-scan' : 'group-hover:animate-scan opacity-40'
            }`} />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*,.pdf"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="flex flex-col items-center justify-center text-center space-y-3.5 relative z-10">
            {/* Animated 3D Floating Icon */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-sky-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                {currentFile?.isVideo ? (
                  <Film className="w-8 h-8 text-cyan-400 animate-pulse" />
                ) : (
                  <Upload className="w-8 h-8 text-cyan-400 group-hover:-translate-y-1 transition duration-300" />
                )}
              </div>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500"></span>
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Upload Transaction Screenshot, Document or Video
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Drag and drop your Paytm screenshot, bank receipt, or invoice here, or click to browse files.
              </p>
            </div>

            {/* Explicit Clickable Upload Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openPickerWithAccept('image/*,video/*,.pdf');
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 transition cursor-pointer"
              >
                <FolderOpen className="w-4 h-4" />
                <span>Browse &amp; Upload File</span>
              </button>
            </div>

            {/* Clickable Quick Format Selector Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] font-mono text-slate-400">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openPickerWithAccept('image/*');
                }}
                className="flex items-center gap-1 px-3 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 hover:text-cyan-300 transition cursor-pointer"
              >
                <FileImage className="w-3.5 h-3.5 text-cyan-400" /> PNG / JPG
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openPickerWithAccept('video/*');
                }}
                className="flex items-center gap-1 px-3 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 hover:text-sky-300 transition cursor-pointer"
              >
                <Film className="w-3.5 h-3.5 text-sky-400" /> Video
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openPickerWithAccept('.pdf,image/*');
                }}
                className="flex items-center gap-1 px-3 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 hover:text-indigo-300 transition cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-400" /> Receipts / Docs
              </button>
            </div>

            {currentFile && (
              <div className="mt-2 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Active Target: {currentFile.fileName}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Load Test Presets (Objective Demos) */}
      <div className="glass-panel rounded-xl p-3.5 border border-slate-800">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <span className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Quick Test Cases (1-Click Instant Forensic Demos)
          </span>
          <span className="text-[11px] font-mono text-cyan-400">Click any preset to test immediately</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {presets.map((preset) => {
            const isSelected = currentFile?.presetType === preset.presetType;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPreset(preset);
                }}
                className={`text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/50 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-500/30'
                    : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${preset.badgeColor}`}>
                    {preset.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{preset.category}</span>
                </div>
                <div className="text-xs font-bold text-slate-200 truncate">{preset.name}</div>
                <div className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{preset.description}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
