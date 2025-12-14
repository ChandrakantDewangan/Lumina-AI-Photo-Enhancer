export interface EnhancedImageResult {
  originalBase64: string;
  enhancedBase64: string;
  mimeType: string;
}

export enum AppState {
  IDLE = 'IDLE',
  SELECTING_KEY = 'SELECTING_KEY',
  UPLOADING = 'UPLOADING',
  PROCESSING = 'PROCESSING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

// Augment window for the AI Studio key selection
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}
