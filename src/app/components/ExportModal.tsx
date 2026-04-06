import { Download, FileText } from 'lucide-react';
import { Modal } from './Modal';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: () => void;
  systemCount: number;
}

export function ExportModal({ isOpen, onClose, onExport, systemCount }: ExportModalProps) {
  const handleExport = () => {
    onExport();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export AI Systems" maxWidth="sm">
      <div className="space-y-6">
        {/* Icon and Message */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#FEEDEC] rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-[#F13D30]" />
          </div>
          <h3 className="font-['Montserrat',sans-serif] font-semibold text-lg text-[#22262A] mb-2">
            Download AI System List
          </h3>
          <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#565F6C]">
            Export all AI systems with the information displayed on this page as a CSV file.
          </p>
        </div>

        {/* Details */}
        <div className="bg-[#F9FAFB] border border-[#F0F1F2] rounded-lg p-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#565F6C]">
                Total systems:
              </span>
              <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                {systemCount}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#565F6C]">
                Format:
              </span>
              <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                CSV
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#565F6C]">
                Includes:
              </span>
              <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                All columns
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="flex-1 px-4 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    </Modal>
  );
}
