import React from 'react';
import { motion } from 'framer-motion';
import { Upload, File, X, Zap } from 'lucide-react';
import { FileUpload } from '../types';

interface FileUploadZoneProps {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadedFiles: FileUpload[];
  onRemoveFile: (id: string) => void;
  onSelectFile: (content: string) => void;
  onProcessFile: (content: string) => void;
  isProcessing: boolean;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  uploadedFiles,
  onRemoveFile,
  onSelectFile,
  onProcessFile,
  isProcessing,
}) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      {/* Upload Zone */}
      <div
        className={`relative rounded-xl border-2 border-dashed transition-all duration-300 ${
          isDragging
            ? 'border-neon-blue bg-neon-blue/10 scale-105'
            : 'border-neon-blue/30 hover:border-neon-blue/50'
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="p-8 text-center">
          <motion.div
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-neon-blue/20 flex items-center justify-center"
            animate={{ 
              scale: isDragging ? [1, 1.1, 1] : 1,
              boxShadow: isDragging ? [
                '0 0 20px rgba(0, 212, 255, 0.3)',
                '0 0 40px rgba(0, 212, 255, 0.6)',
                '0 0 20px rgba(0, 212, 255, 0.3)',
              ] : '0 0 20px rgba(0, 212, 255, 0.3)',
            }}
            transition={{ duration: 0.5, repeat: isDragging ? Infinity : 0 }}
          >
            <Upload className="w-8 h-8 text-neon-blue" />
          </motion.div>

          <h3 className="text-lg font-orbitron text-white mb-2">
            Drop Files Here
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Support for .txt, .md files
          </p>

          <input
            type="file"
            accept=".txt,.md"
            multiple
            onChange={onFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-neon-blue/20 hover:bg-neon-blue/30 border border-neon-blue/50 rounded-lg cursor-pointer transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span className="text-white text-sm font-jetbrains">Select Files</span>
          </label>
        </div>

        {/* Particle Animation for Drag */}
        {isDragging && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-neon-blue rounded-full"
                style={{
                  left: `${20 + (i * 10)}%`,
                  top: '50%',
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <motion.div
          className="mt-4 space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {uploadedFiles.map((file) => (
            <motion.div
              key={file.id}
              className="flex items-center justify-between p-3 bg-panel-dark/60 backdrop-blur-sm rounded-lg border border-neon-blue/20"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <div 
                className="flex items-center space-x-3 flex-1 cursor-pointer"
                onClick={() => onSelectFile(file.content)}
              >
                <File className="w-4 h-4 text-neon-blue" />
                <div>
                  <div className="text-white text-sm font-jetbrains">
                    {file.name}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {(file.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Process File Button */}
                <motion.button
                  onClick={() => onProcessFile(file.content)}
                  disabled={isProcessing}
                  className={`p-2 rounded-lg transition-colors ${
                    !isProcessing
                      ? 'bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/50'
                      : 'bg-gray-600/20 border border-gray-600/30 cursor-not-allowed'
                  }`}
                  whileHover={!isProcessing ? { scale: 1.1 } : {}}
                  whileTap={!isProcessing ? { scale: 0.9 } : {}}
                  title="Process this file"
                >
                  <Zap className={`w-4 h-4 ${isProcessing ? 'text-gray-400 animate-pulse' : 'text-neon-green'}`} />
                </motion.button>
                
                {/* Remove File Button */}
                <button
                  onClick={() => onRemoveFile(file.id)}
                  className="p-1 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors"
                  title="Remove file"
                >
                  <X className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default FileUploadZone;