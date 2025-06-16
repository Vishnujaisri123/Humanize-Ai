import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, ChevronRight } from 'lucide-react';
import { ToneOption } from '../types';

interface ToneSelectorProps {
  selectedTone: string;
  onToneChange: (tone: string) => void;
}

const toneOptions: ToneOption[] = [
  { id: 'professional', name: 'Professional', description: 'Formal and polished', color: '#3b82f6', angle: 0 },
  { id: 'friendly', name: 'Friendly', description: 'Warm and approachable', color: '#10b981', angle: 72 },
  { id: 'conversational', name: 'Conversational', description: 'Natural and relaxed', color: '#f59e0b', angle: 144 },
  { id: 'poetic', name: 'Poetic', description: 'Creative and expressive', color: '#8b5cf6', angle: 216 },
  { id: 'simplified', name: 'Simplified', description: 'Clear and easy', color: '#ef4444', angle: 288 },
];

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onToneChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <Palette className="w-5 h-5 text-neon-purple animate-text-glow" />
        <h3 className="text-lg font-orbitron text-white">Tone Style</h3>
      </div>

      {/* 3D Wheel Container */}
      <div className="relative w-64 h-64 mx-auto">
        {/* Central Hub */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-neon-purple to-neon-blue rounded-full flex items-center justify-center shadow-lg z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isExpanded ? 180 : 0 }}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </motion.button>

        {/* Tone Options */}
        {toneOptions.map((tone, index) => {
          const isSelected = selectedTone === tone.id;
          const radius = isExpanded ? 100 : 60;
          const angle = (tone.angle * Math.PI) / 180;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.button
              key={tone.id}
              onClick={() => onToneChange(tone.id)}
              className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                isSelected
                  ? 'shadow-lg shadow-neon-blue/50 scale-110'
                  : 'hover:scale-105'
              }`}
              style={{
                backgroundColor: tone.color,
                boxShadow: isSelected ? `0 0 20px ${tone.color}` : `0 0 10px ${tone.color}40`,
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
              animate={{
                x: isExpanded ? x : x * 0.6,
                y: isExpanded ? y : y * 0.6,
                scale: isSelected ? 1.2 : 1,
              }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: isSelected ? 1.3 : 1.1 }}
            >
              {tone.name.charAt(0)}
            </motion.button>
          );
        })}
      </div>

      {/* Selected Tone Info */}
      <motion.div
        className="mt-6 text-center"
        key={selectedTone}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-panel-dark/60 backdrop-blur-sm rounded-lg p-4 border border-neon-blue/30">
          <h4 className="text-neon-blue font-orbitron text-lg mb-1">
            {toneOptions.find(t => t.id === selectedTone)?.name}
          </h4>
          <p className="text-gray-400 text-sm">
            {toneOptions.find(t => t.id === selectedTone)?.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ToneSelector;