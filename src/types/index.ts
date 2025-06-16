export interface ToneOption {
  id: string;
  name: string;
  description: string;
  color: string;
  angle: number;
}

export interface AISettings {
  temperature: number;
  topP: number;
  maxTokens: number;
}

export interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  stage: 'analyzing' | 'transforming' | 'optimizing' | 'complete';
}

export interface TextData {
  original: string;
  humanized: string;
  confidence: number;
  changes: number;
}

export interface FileUpload {
  id: string;
  name: string;
  content: string;
  type: string;
  size: number;
}