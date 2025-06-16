import { useState, useCallback } from 'react';
import { FileUpload } from '../types';

export const useFileHandler = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = useCallback((files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          const newFile: FileUpload = {
            id: Date.now() + Math.random().toString(36),
            name: file.name,
            content,
            type: file.type,
            size: file.size,
          };
          setUploadedFiles(prev => [...prev, newFile]);
        };
        reader.readAsText(file);
      }
    });
  }, []);

  const exportFile = useCallback((content: string, filename: string, format: 'txt' | 'md') => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const removeFile = useCallback((id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  }, []);

  return {
    uploadedFiles,
    isDragging,
    setIsDragging,
    handleFileUpload,
    exportFile,
    removeFile,
  };
};