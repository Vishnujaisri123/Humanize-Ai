import { useState, useCallback } from 'react';
import { AISettings, ProcessingState, TextData } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

export const useAIProcessor = () => {
  const [processing, setProcessing] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    stage: 'analyzing',
  });

  const [textData, setTextData] = useState<TextData>({
    original: '',
    humanized: '',
    confidence: 0,
    changes: 0,
  });

  const simulateAIProcessing = useCallback(async (
    text: string,
    tone: string,
    settings: AISettings
  ): Promise<TextData> => {
    setProcessing({ isProcessing: true, progress: 0, stage: 'analyzing' });

    try {
      // Simulate processing stages with real API call
      const stages = [
        { stage: 'analyzing' as const, duration: 500 },
        { stage: 'transforming' as const, duration: 1000 },
        { stage: 'optimizing' as const, duration: 300 },
      ];

      // Show processing stages
      for (let i = 0; i < stages.length; i++) {
        const { stage, duration } = stages[i];
        setProcessing(prev => ({ ...prev, stage, progress: (i / (stages.length + 1)) * 100 }));
        await new Promise(resolve => setTimeout(resolve, duration));
      }

      // Make actual API call to backend
      const response = await fetch(`${API_BASE_URL}/humanize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          tone,
          settings: {
            temperature: settings.temperature,
            topP: settings.topP,
            maxTokens: settings.maxTokens,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to humanize text');
      }

      const result = await response.json();

      // Final stage
      setProcessing(prev => ({ ...prev, stage: 'complete', progress: 100 }));
      await new Promise(resolve => setTimeout(resolve, 300));

      const textResult: TextData = {
        original: result.original,
        humanized: result.humanized,
        confidence: result.confidence,
        changes: result.changes,
      };

      setTextData(textResult);
      setProcessing({ isProcessing: false, progress: 100, stage: 'complete' });
      
      return textResult;

    } catch (error) {
      console.error('AI Processing Error:', error);
      
      // Show error state
      setProcessing({ isProcessing: false, progress: 0, stage: 'analyzing' });
      
      // Create fallback result with error message
      const errorResult: TextData = {
        original: text,
        humanized: `Error: ${error instanceof Error ? error.message : 'Failed to process text'}. Please check your OpenAI API key and try again.`,
        confidence: 0,
        changes: 0,
      };

      setTextData(errorResult);
      return errorResult;
    }
  }, []);

  return {
    processing,
    textData,
    simulateAIProcessing,
    setTextData,
  };
};