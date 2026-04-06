import { Upload, Download, FileSpreadsheet } from 'lucide-react';
import { useState } from 'react';
import { Modal } from './Modal';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
}

export function ImportModal({ isOpen, onClose, onImport }: ImportModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setSelectedFile(file);
      } else {
        alert('Please upload a CSV file');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setSelectedFile(file);
      } else {
        alert('Please upload a CSV file');
      }
    }
  };

  const handleImport = () => {
    if (selectedFile) {
      onImport(selectedFile);
      setSelectedFile(null);
      onClose();
    }
  };

  const handleDownloadTemplate = () => {
    // Create CSV template
    const headers = [
      'AI System Name',
      'Owner',
      'Status',
      'Role',
      'Provider Type',
      'Deployment Context',
      'EU / EEA Relevance',
    ];
    const csvContent = headers.join(',') + '\\n';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai_systems_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import AI Systems" maxWidth="md">
      <div className="space-y-6">
        {/* Download Template */}
        <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-4">
          <div className="flex items-start gap-3">
            <FileSpreadsheet className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#1E40AF] mb-2">
                Need a template?
              </p>
              <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#1E40AF] mb-3">
                Download our CSV template to ensure your data is formatted correctly.
              </p>
              <button
                onClick={handleDownloadTemplate}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#3B82F6] text-[#3B82F6] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#EFF6FF] transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Template
              </button>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div>
          <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
            Upload CSV File
          </label>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-[#F13D30] bg-[#FEEDEC]'
                : 'border-[#B5BCC4] bg-[#F9FAFB]'
            }`}
          >
            <Upload className={`w-12 h-12 mx-auto mb-4 ${dragActive ? 'text-[#F13D30]' : 'text-[#B5BCC4]'}`} />
            
            {selectedFile ? (
              <div className="space-y-2">
                <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  {selectedFile.name}
                </p>
                <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-[#F13D30] font-['Montserrat',sans-serif] font-semibold text-sm hover:underline"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <>
                <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                  Drag and drop your CSV file here
                </p>
                <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#565F6C] mb-4">
                  or
                </p>
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" />
                  Browse Files
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </>
            )}
          </div>
          <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C] mt-2">
            Supported format: CSV (max 10MB)
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={!selectedFile}
            className="flex-1 px-4 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Import
          </button>
        </div>
      </div>
    </Modal>
  );
}