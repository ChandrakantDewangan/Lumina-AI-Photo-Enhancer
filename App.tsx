import React, { useState } from 'react';
import { AppState, EnhancedImageResult } from './types';
import { enhanceImage } from './services/geminiService';
import { ApiKeySelector } from './components/ApiKeySelector';
import { ImageUploader } from './components/ImageUploader';
import { ProcessingState } from './components/ProcessingState';
import { ComparisonSlider } from './components/ComparisonSlider';
import { Sparkles, Aperture, Github } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.SELECTING_KEY);
  const [result, setResult] = useState<EnhancedImageResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleKeySelected = () => {
    setAppState(AppState.IDLE);
  };

  const handleImageSelected = async (base64Data: string, mimeType: string) => {
    setAppState(AppState.PROCESSING);
    setErrorMessage(null);

    try {
      const enhancedBase64 = await enhanceImage(base64Data, mimeType);
      
      const enhancedDataUrl = `data:${mimeType};base64,${enhancedBase64}`;
      const originalDataUrl = `data:${mimeType};base64,${base64Data}`;

      setResult({
        originalBase64: originalDataUrl,
        enhancedBase64: enhancedDataUrl,
        mimeType
      });
      setAppState(AppState.COMPLETE);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || "Something went wrong during enhancement. Please try again.");
      setAppState(AppState.ERROR);
    }
  };

  const resetApp = () => {
    setResult(null);
    setErrorMessage(null);
    setAppState(AppState.IDLE);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
      {/* Header */}
      <header className="border-b border-slate-800/60 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={resetApp}>
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-2 rounded-lg">
              <Aperture className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Lumina AI
            </h1>
          </div>
          <div className="text-xs font-medium px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            Powered by Gemini 3 Pro
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center">
        
        {/* Intro Text (only show when not processing or complete) */}
        {(appState === AppState.IDLE || appState === AppState.SELECTING_KEY) && (
          <div className="text-center mb-12 max-w-2xl animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Turn your photos into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                masterpieces.
              </span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Professional-grade AI enhancement that preserves identity while correcting lighting, color, and detail. Studio quality in seconds.
            </p>
          </div>
        )}

        <div className="w-full max-w-5xl">
          {appState === AppState.SELECTING_KEY && (
            <ApiKeySelector onKeySelected={handleKeySelected} />
          )}

          {appState === AppState.IDLE && (
            <ImageUploader onImageSelected={handleImageSelected} />
          )}

          {appState === AppState.PROCESSING && (
             <ProcessingState />
          )}

          {appState === AppState.ERROR && (
            <div className="text-center py-12 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-6">
                <Sparkles className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Enhancement Failed</h3>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">{errorMessage}</p>
              <button 
                onClick={resetApp}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {appState === AppState.COMPLETE && result && (
            <ComparisonSlider 
              original={result.originalBase64}
              enhanced={result.enhancedBase64}
              onReset={resetApp}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Lumina AI Enhancer. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
              <Github className="w-4 h-4" /> Source
            </a>
            <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
            <span>Gemini API Demo</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;