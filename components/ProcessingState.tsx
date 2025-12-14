import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export const ProcessingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in text-center">
      <div className="relative">
        <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 rounded-full animate-pulse"></div>
        <div className="relative bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
           <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
        </div>
      </div>
      
      <h3 className="mt-8 text-2xl font-bold text-white">Enhancing your photo</h3>
      <p className="mt-2 text-slate-400 max-w-md">
        Applying AI color grading, denoising, and detail restoration. This usually takes about 10-20 seconds.
      </p>

      <div className="mt-8 flex flex-col gap-3 w-full max-w-xs">
        <div className="flex items-center gap-3 text-sm text-slate-500">
           <Sparkles className="w-4 h-4 text-amber-400" /> 
           <span>Analyzing exposure levels...</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500">
           <Sparkles className="w-4 h-4 text-emerald-400" /> 
           <span>Refining skin texture...</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500">
           <Sparkles className="w-4 h-4 text-purple-400" /> 
           <span>Finalizing cinematic grade...</span>
        </div>
      </div>
    </div>
  );
};