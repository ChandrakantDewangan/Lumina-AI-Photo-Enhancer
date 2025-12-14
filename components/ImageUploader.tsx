import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (base64: string, mimeType: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processFile = (file: File) => {
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError("Please upload a valid image file (JPEG, PNG, WebP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size too large. Please upload an image under 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // Extract base64 data (remove data:image/xxx;base64, prefix)
      const base64Data = result.split(',')[1];
      onImageSelected(base64Data, file.type);
    };
    reader.onerror = () => {
      setError("Failed to read file.");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div 
        className={`
          relative flex flex-col items-center justify-center w-full h-80 
          border-2 border-dashed rounded-2xl transition-all duration-300 ease-in-out
          ${dragActive 
            ? "border-indigo-400 bg-indigo-500/10 scale-[1.02]" 
            : "border-slate-700 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-500"
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
          <div className="mb-4 p-4 rounded-full bg-slate-800 shadow-inner">
             <Upload className={`w-8 h-8 ${dragActive ? 'text-indigo-400' : 'text-slate-400'}`} />
          </div>
          <p className="mb-2 text-xl font-semibold text-slate-200">
            Click to upload or drag & drop
          </p>
          <p className="text-sm text-slate-500 max-w-xs">
            Supported formats: JPEG, PNG, WebP (Max 10MB)
          </p>
        </div>
        
        <input 
          id="dropzone-file" 
          type="file" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          onChange={handleChange}
          accept="image/*"
        />
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-200 text-sm animate-fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-xs font-bold text-slate-300">SHARPNESS</span>
          </div>
          <p className="text-xs text-slate-500">Restores fine details and texture</p>
        </div>
        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span className="text-xs font-bold text-slate-300">LIGHTING</span>
          </div>
          <p className="text-xs text-slate-500">Studio-grade light balancing</p>
        </div>
        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            <span className="text-xs font-bold text-slate-300">COLOR</span>
          </div>
          <p className="text-xs text-slate-500">Cinematic grading & correction</p>
        </div>
      </div>
    </div>
  );
};