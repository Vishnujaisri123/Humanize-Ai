import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Thermometer, Target, Hash } from 'lucide-react';
import { AISettings as AISettingsType } from '../types';

interface AISettingsProps {
  settings: AISettingsType;
  onSettingsChange: (settings: AISettingsType) => void;
}

const AISettings: React.FC<AISettingsProps> = ({ settings, onSettingsChange }) => {
  const updateSetting = (key: keyof AISettingsType, value: number) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <Settings className="w-5 h-5 text-neon-purple animate-text-glow" />
        <h3 className="text-lg font-orbitron text-white">AI Parameters</h3>
      </div>

      {/* Settings Panel */}
      <div className="bg-panel-dark/60 backdrop-blur-sm rounded-xl p-6 border border-neon-purple/30">
        {/* Temperature */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-neon-blue" />
              <label className="text-white font-jetbrains text-sm">Temperature</label>
            </div>
            <span className="text-neon-blue font-jetbrains text-sm">
              {settings.temperature.toFixed(1)}
            </span>
          </div>
          <motion.input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={settings.temperature}
            onChange={(e) => updateSetting('temperature', parseFloat(e.target.value))}
            className="w-full h-2 bg-dark-bg rounded-lg appearance-none cursor-pointer slider"
            whileHover={{ scale: 1.02 }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Focused</span>
            <span>Creative</span>
          </div>
        </div>

        {/* Top P */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-neon-green" />
              <label className="text-white font-jetbrains text-sm">Top P</label>
            </div>
            <span className="text-neon-green font-jetbrains text-sm">
              {settings.topP.toFixed(2)}
            </span>
          </div>
          <motion.input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={settings.topP}
            onChange={(e) => updateSetting('topP', parseFloat(e.target.value))}
            className="w-full h-2 bg-dark-bg rounded-lg appearance-none cursor-pointer slider"
            whileHover={{ scale: 1.02 }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Precise</span>
            <span>Diverse</span>
          </div>
        </div>

        {/* Max Tokens */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Hash className="w-4 h-4 text-neon-purple" />
              <label className="text-white font-jetbrains text-sm">Max Tokens</label>
            </div>
            <span className="text-neon-purple font-jetbrains text-sm">
              {settings.maxTokens}
            </span>
          </div>
          <motion.input
            type="range"
            min="100"
            max="2000"
            step="50"
            value={settings.maxTokens}
            onChange={(e) => updateSetting('maxTokens', parseInt(e.target.value))}
            className="w-full h-2 bg-dark-bg rounded-lg appearance-none cursor-pointer slider"
            whileHover={{ scale: 1.02 }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Short</span>
            <span>Long</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AISettings;