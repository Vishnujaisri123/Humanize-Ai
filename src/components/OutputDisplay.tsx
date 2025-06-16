import React from "react";
import { motion } from "framer-motion";
import { FileOutput, Copy, Download, Check, AlertCircle } from "lucide-react";
import { TextData } from "../types";

interface OutputDisplayProps {
  textData: TextData;
  onExport: (format: "txt" | "md") => void;
  onCopy: () => void;
  isCopied: boolean;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({
  textData,
  onExport,
  onCopy,
  isCopied,
}) => {
  const isError = textData.humanized.startsWith("Error:");

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* Holographic Frame */}
      <div
        className={`absolute inset-0 rounded-xl p-0.5 ${
          isError
            ? "bg-gradient-to-r from-red-500/20 to-red-600/20"
            : "bg-gradient-to-r from-neon-green/20 to-neon-purple/20"
        }`}
      >
        <div className="w-full h-full rounded-xl bg-panel-dark/80 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {isError ? (
              <AlertCircle className="w-5 h-5 text-red-400 animate-pulse" />
            ) : (
              <FileOutput className="w-5 h-5 text-neon-green animate-text-glow" />
            )}
            <h3 className="text-lg font-orbitron text-white">
              {isError ? "Processing Error" : "Humanized Output"}
            </h3>
          </div>

          {/* Stats */}
          {textData.humanized && !isError && (
            <div className="flex space-x-4 text-sm font-jetbrains">
              <div className="text-neon-green">
                Confidence: {textData.confidence}%
              </div>
              <div className="text-neon-blue">Changes: {textData.changes}</div>
            </div>
          )}
        </div>

        {/* Output Text */}
        <div className="relative">
          <div
            className={`w-full h-48 border rounded-lg p-4 overflow-y-auto ${
              isError
                ? "bg-red-900/20 border-red-500/30"
                : "bg-dark-bg/50 border-neon-green/30"
            }`}
          >
            {textData.humanized ? (
              <motion.div
                className={`font-jetbrains text-sm leading-relaxed ${
                  isError ? "text-red-300" : "text-white"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {textData.humanized}
              </motion.div>
            ) : (
              <div className="text-gray-400 font-jetbrains text-sm italic">
                Processed text will appear here...
              </div>
            )}
          </div>

          {/* Word Count */}
          {textData.humanized && !isError && (
            <div className="absolute bottom-2 right-2 text-xs text-gray-400 font-jetbrains">
              {textData.humanized.length} chars
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {textData.humanized && !isError && (
          <div className="flex space-x-3 mt-4">
            <motion.button
              onClick={onCopy}
              className="flex items-center space-x-2 px-4 py-2 bg-neon-blue/20 hover:bg-neon-blue/30 border border-neon-blue/50 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isCopied ? (
                <Check className="w-4 h-4 text-neon-green" />
              ) : (
                <Copy className="w-4 h-4 text-neon-blue" />
              )}
              <span className="text-white text-sm font-jetbrains">
                {isCopied ? "Copied!" : "Copy"}
              </span>
            </motion.button>

            <motion.button
              onClick={() => onExport("txt")}
              className="flex items-center space-x-2 px-4 py-2 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/50 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4 text-neon-green" />
              <span className="text-white text-sm font-jetbrains">TXT</span>
            </motion.button>

            <motion.button
              onClick={() => onExport("md")}
              className="flex items-center space-x-2 px-4 py-2 bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple/50 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4 text-neon-purple" />
              <span className="text-white text-sm font-jetbrains">MD</span>
            </motion.button>
          </div>
        )}

        {/* Setup Instructions for Errors */}
        {isError && (
          <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
            <h4 className="text-red-300 font-orbitron text-sm mb-2">
              Setup Required:
            </h4>
            <ol className="text-red-200 text-xs font-jetbrains space-y-1 list-decimal list-inside">
              <li>
                Get your OpenAI API key from{" "}
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-blue hover:underline"
                >
                  platform.openai.com
                </a>
              </li>
              <li>
                Create a{" "}
                <code className="bg-red-800/30 px-1 rounded">.env</code> file in
                the project root
              </li>
              <li>
                Add:{" "}
                <code className="bg-red-800/30 px-1 rounded">
                  OPENAI_API_KEY=your_key_here
                </code>
              </li>
              <li>Restart the development server</li>
            </ol>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default OutputDisplay;
