import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// Components
import ParticleField from "./components/ParticleField";
import AICore from "./components/AICore";
import TextInputPod from "./components/TextInputPod";
import ToneSelector from "./components/ToneSelector";
import OutputDisplay from "./components/OutputDisplay";
import FileUploadZone from "./components/FileUploadZone";
import AISettings from "./components/AISettings";

// Hooks
import { useFileHandler } from "./hooks/useFileHandler";

// Types
import { AISettings as AISettingsType } from "./types";

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [selectedTone, setSelectedTone] = useState<string>("professional");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [aiSettings, setAiSettings] = useState<AISettingsType>({
    temperature: 0.7,
    topP: 0.9,
    maxTokens: 1000,
  });
  const [processing, setProcessing] = useState<{ isProcessing: boolean }>({
    isProcessing: false,
  });
  const [textData, setTextData] = useState<{
    humanized: string;
    original: string;
  }>({
    humanized: "",
    original: "",
  });

  const {
    uploadedFiles,
    isDragging,
    setIsDragging,
    handleFileUpload,
    exportFile,
    removeFile,
  } = useFileHandler();

  const simulateAIProcessing = useCallback(
    async (text: string, tone: string, settings: AISettingsType) => {
      try {
        setProcessing({ isProcessing: true });
        setTextData({ humanized: "", original: text });

        const prompt = `Humanize the following text in a ${tone} tone:\n\n${text}`;
        const response = await fetch("http://localhost:5000/api/humanize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        const data = await response.json();
        if (data.result) {
          setTextData({ humanized: data.result.trim(), original: text });
        } else {
          setTextData({
            humanized: "[Error: No result returned]",
            original: text,
          });
        }
      } catch (error) {
        setTextData({
          humanized: "[Error processing request]",
          original: text,
        });
        console.error("AI Processing Error:", error);
      } finally {
        setProcessing({ isProcessing: false });
      }
    },
    []
  );

  const handleProcess = useCallback(async () => {
    if (!inputText.trim()) return;
    await simulateAIProcessing(inputText, selectedTone, aiSettings);
  }, [inputText, selectedTone, aiSettings, simulateAIProcessing]);

  const handleProcessFile = useCallback(
    async (content: string) => {
      if (!content.trim()) return;
      setInputText(content);
      await simulateAIProcessing(content, selectedTone, aiSettings);
    },
    [selectedTone, aiSettings, simulateAIProcessing]
  );

  const handleCopy = useCallback(() => {
    if (textData.humanized) {
      navigator.clipboard.writeText(textData.humanized);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  }, [textData.humanized]);

  const handleExport = useCallback(
    (format: "txt" | "md") => {
      if (textData.humanized) {
        const filename = `humanized-text-${Date.now()}`;
        exportFile(textData.humanized, filename, format);
      }
    },
    [textData.humanized, exportFile]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    },
    [setIsDragging]
  );

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileUpload(e.dataTransfer.files);
    },
    [setIsDragging, handleFileUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleFileUpload(e.target.files);
      }
    },
    [handleFileUpload]
  );

  const handleSelectFile = useCallback((content: string) => {
    setInputText(content);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-hidden relative">
      {/* Background Effects */}
      <ParticleField />

      {/* Neural Network Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue via-transparent to-neon-purple" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        className="relative z-10 p-6 border-b border-neon-blue/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center space-x-3">
          <Sparkles className="w-8 h-8 text-neon-blue animate-pulse-glow" />
          <h1 className="text-3xl font-orbitron font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent animate-text-glow">
            Humanizer AI
          </h1>
          <Sparkles className="w-8 h-8 text-neon-purple animate-pulse-glow" />
        </div>
        <p className="text-center text-gray-400 mt-2 font-jetbrains">
          Transform robotic text into natural, human-like language
        </p>
      </motion.header>

      {/* Main Interface */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Input & Upload */}
          <div className="space-y-6">
            <TextInputPod
              value={inputText}
              onChange={setInputText}
              placeholder="Paste your machine-generated text here..."
              isProcessing={processing.isProcessing}
              onProcess={handleProcess}
            />
            <FileUploadZone
              isDragging={isDragging}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onFileSelect={handleFileSelect}
              uploadedFiles={uploadedFiles}
              onRemoveFile={removeFile}
              onSelectFile={handleSelectFile}
              onProcessFile={handleProcessFile}
              isProcessing={processing.isProcessing}
            />
          </div>

          {/* Center Column - AICore */}
          <div className="flex flex-col items-center space-y-8">
            <div className="relative">
              <AICore processing={processing} onCoreClick={handleProcess} />
            </div>
            <ToneSelector
              selectedTone={selectedTone}
              onToneChange={setSelectedTone}
            />
            <AISettings
              settings={aiSettings}
              onSettingsChange={setAiSettings}
            />
          </div>

          {/* Right Column - Output */}
          <div className="space-y-6">
            <OutputDisplay
              textData={textData}
              onExport={handleExport}
              onCopy={handleCopy}
              isCopied={isCopied}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        className="relative z-10 p-6 border-t border-neon-blue/20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <p className="text-gray-400 text-sm font-jetbrains">
          Powered by Advanced AI • Built for the Future
        </p>
      </motion.footer>
    </div>
  );
}

export default App;
