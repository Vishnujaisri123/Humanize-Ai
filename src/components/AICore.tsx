import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Cpu } from 'lucide-react';
import { ProcessingState } from '../types';

interface AICoreProps {
  processing: ProcessingState;
  onCoreClick: () => void;
}

const AICore: React.FC<AICoreProps> = ({ processing, onCoreClick }) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Neural Network Background */}
      <div className="absolute inset-0 animate-neural-pulse rounded-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 backdrop-blur-sm" />
      
      {/* Rotating Rings */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-full h-full rounded-full border-2 border-neon-blue/30 border-dashed" />
      </motion.div>
      
      <motion.div
        className="absolute inset-2"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-full h-full rounded-full border border-neon-green/40" />
      </motion.div>

      {/* Core Button */}
      <motion.button
        onClick={onCoreClick}
        className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-glow-blue via-neon-purple to-plasma-green p-1 shadow-lg hover:shadow-2xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={processing.isProcessing ? { 
          boxShadow: [
            '0 0 20px rgba(59, 130, 246, 0.5)',
            '0 0 40px rgba(139, 92, 246, 0.8)',
            '0 0 20px rgba(59, 130, 246, 0.5)',
          ]
        } : {}}
        transition={{ duration: 1, repeat: processing.isProcessing ? Infinity : 0 }}
      >
        <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center">
          {processing.isProcessing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Cpu className="w-12 h-12 text-neon-blue" />
            </motion.div>
          ) : (
            <Brain className="w-12 h-12 text-neon-blue animate-pulse-glow" />
          )}
        </div>
      </motion.button>

      {/* Processing State Indicator */}
      {processing.isProcessing && (
        <motion.div
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-panel-dark/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-neon-blue/30">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-neon-blue animate-pulse" />
              <span className="text-neon-blue text-sm font-jetbrains capitalize">
                {processing.stage}...
              </span>
            </div>
            <div className="w-32 h-1 bg-dark-bg rounded-full mt-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-blue to-neon-green"
                initial={{ width: '0%' }}
                animate={{ width: `${processing.progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AICore;