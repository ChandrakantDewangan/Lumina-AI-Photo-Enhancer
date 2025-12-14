import React, { useState, useEffect } from 'react';
import { Key } from 'lucide-react';

interface ApiKeySelectorProps {
  onKeySelected: () => void;
}

export const ApiKeySelector: React.FC<ApiKeySelectorProps> = ({ onKeySelected }) => {
  const [checking, setChecking] = useState(true);

  const checkKey = async () => {
    if (window.aistudio && window.aistudio.hasSelectedApiKey) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (hasKey) {
        onKeySelected();
      }
    }
    setChecking(false);
  };

  useEffect(() => {
    checkKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio && window.aistudio.openSelectKey) {
      try {
        await window.aistudio.openSelectKey();
        // Assume success after dialog interaction per guidelines
        onKeySelected();
      } catch (error) {
        console.error("Key selection failed", error);
        // Reset checking state to allow retry if needed
        setChecking(false); 
      }
    } else {
        // Fallback for dev environments where window.aistudio might not be mocked
        console.warn("window.aistudio not available");
        onKeySelected(); 
    }
  };

  if (checking) return null;

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl max-w-md w-full mx-auto animate-fade-in">
      <div className="p-4 bg-indigo-500/20 rounded-full mb-6">
        <Key className="w-8 h-8 text-indigo-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-3 text-center">Premium Access Required</h2>
      <p className="text-slate-400 text-center mb-8">
        To use the Gemini 3 Pro Image model for professional enhancement, please select a valid API Key.
      </p>
      
      <button
        onClick={handleSelectKey}
        className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Connect Google Cloud Project
      </button>
      
      <a 
        href="https://ai.google.dev/gemini-api/docs/billing" 
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-6 text-xs text-slate-500 hover:text-indigo-400 underline transition-colors"
      >
        Learn more about Gemini API billing
      </a>
    </div>
  );
};