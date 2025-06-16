import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, X, Zap } from 'lucide-react';

interface TextInputPodProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  isProcessing: boolean;
  onProcess: () => void;
}

const TextInputPod: React.FC<TextInputPodProps> = ({
  value,
  onChange,
  placeholder,
  isProcessing,
  onProcess,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleProcess = () => {
    if (value.trim() && !isProcessing) {
      onProcess();
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Holographic Frame */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 p-0.5 transition-all duration-300 ${
        isFocused ? 'shadow-lg shadow-neon-blue/30' : ''
      }`}>
        <div className="w-full h-full rounded-xl bg-panel-dark/80 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-neon-blue animate-text-glow" />
            <h3 className="text-lg font-orbitron text-white">Input Text</h3>
          </div>
          
          {/* Process Button */}
          <motion.button
            onClick={handleProcess}
            disabled={!value.trim() || isProcessing}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-jetbrains text-sm transition-all duration-300 ${
              value.trim() && !isProcessing
                ? 'bg-neon-blue/20 hover:bg-neon-blue/30 border border-neon-blue/50 text-white hover:shadow-lg hover:shadow-neon-blue/30'
                : 'bg-gray-600/20 border border-gray-600/30 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={value.trim() && !isProcessing ? { scale: 1.05 } : {}}
            whileTap={value.trim() && !isProcessing ? { scale: 0.95 } : {}}
          >
            <Zap className={`w-4 h-4 ${isProcessing ? 'animate-pulse' : ''}`} />
            <span>{isProcessing ? 'Processing...' : 'Humanize'}</span>
          </motion.button>
        </div>

        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={isProcessing}
            className="w-full h-48 bg-dark-bg/50 border border-neon-blue/30 rounded-lg p-4 text-white placeholder-gray-400 font-jetbrains text-sm resize-none focus:outline-none focus:border-neon-blue focus:shadow-lg focus:shadow-neon-blue/20 transition-all duration-300"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                handleProcess();
              }
            }}
          />

          {/* Typing Effect Overlay */}
          {isProcessing && (
            <div className="absolute inset-0 bg-dark-bg/20 rounded-lg flex items-center justify-center">
              <motion.div
                className="flex space-x-1"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-neon-blue rounded-full" />
                <div className="w-2 h-2 bg-neon-purple rounded-full" />
                <div className="w-2 h-2 bg-neon-green rounded-full" />
              </motion.div>
            </div>
          )}

          {/* Character Count */}
          <div className="absolute bottom-2 right-2 text-xs text-gray-400 font-jetbrains">
            {value.length} chars
          </div>
        </div>

        {/* Clear Button */}
        {value && (
          <motion.button
            onClick={() => onChange('')}
            className="absolute top-22 right-8 p-2 rounded-full bg-purple-500/20 hover:bg-red-500/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4 text-red-400" />
          </motion.button>
        )}

        {/* Keyboard Shortcut Hint */}
        {value.trim() && !isProcessing && (
          <div className="mt-2 text-xs text-gray-400 font-jetbrains text-center">
            Press Ctrl+Enter to process
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TextInputPod;