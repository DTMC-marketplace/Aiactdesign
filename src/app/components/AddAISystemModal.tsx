import { Upload, FileText, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Modal } from './Modal';

interface AddAISystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (system: NewAISystemData) => void;
}

export interface NewAISystemData {
  name: string;
  owner: string;
  status: 'Planned' | 'Testing' | 'In production' | 'Retired';
  role: 'Provider' | 'Deployer' | 'Distributor' | 'Importer';
  providerType: 'In-house' | 'External' | 'Mixed' | 'Unknown';
  deploymentContext: 'Workplace' | 'Education' | 'Healthcare' | 'Law enforcement' | 'Consumer' | 'Other';
  euEeaRelevance: 'Yes' | 'No' | 'Planned' | 'Unknown';
}

export function AddAISystemModal({ isOpen, onClose, onAdd }: AddAISystemModalProps) {
  const [document, setDocument] = useState<File | null>(null);
  const [formData, setFormData] = useState<NewAISystemData>({
    name: '',
    owner: '',
    status: 'Planned',
    role: 'Deployer',
    providerType: 'Unknown',
    deploymentContext: 'Workplace',
    euEeaRelevance: 'Unknown',
  });

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocument(e.target.files[0]);
    }
  };

  const handleAutoFill = () => {
    // Simulate AI auto-fill - in production, this would call an AI service
    alert('AI auto-fill feature would process the document and populate fields. This is a demo.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onAdd(formData);
      // Reset form
      setFormData({
        name: '',
        owner: '',
        status: 'Planned',
        role: 'Deployer',
        providerType: 'Unknown',
        deploymentContext: 'Workplace',
        euEeaRelevance: 'Unknown',
      });
      setDocument(null);
      onClose();
    }
  };

  const handleChange = (field: keyof NewAISystemData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New AI System" maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tip */}
        <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-4">
          <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#1E40AF]">
            <span className="font-semibold">Tip:</span> Only AI system name is mandatory to create the record. Other questions are for the assessment, which could be provided later.
          </p>
        </div>

        {/* Document Upload (Optional) */}
        <div className="border border-[#F0F1F2] rounded-lg p-4 bg-[#F9FAFB]">
          <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-3">
            <span className="text-[#565F6C]">(Optional)</span> Upload Document for AI Auto-fill
          </label>
          <div className="flex gap-3">
            <label className="flex-1 flex items-center gap-3 px-4 py-3 bg-white border border-[#B5BCC4] rounded-lg cursor-pointer hover:bg-[#F0F1F2] transition-colors">
              <FileText className="w-5 h-5 text-[#565F6C]" />
              <div className="flex-1 min-w-0">
                {document ? (
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] truncate block">
                    {document.name}
                  </span>
                ) : (
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#B5BCC4]">
                    Choose file...
                  </span>
                )}
              </div>
              <Upload className="w-4 h-4 text-[#565F6C]" />
              <input
                type="file"
                onChange={handleDocumentChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
              />
            </label>
            <button
              type="button"
              onClick={handleAutoFill}
              disabled={!document}
              className="px-4 py-3 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              AI Read & Auto-fill
            </button>
          </div>
          <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C] mt-2">
            Supported formats: PDF, DOC, DOCX, TXT
          </p>
        </div>

        {/* Mandatory Field */}
        <div>
          <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
            AI System Name <span className="text-[#F13D30]">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter AI system name"
            className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC] transition-colors"
          />
        </div>

        {/* Optional Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
              Owner (Person / Team)
            </label>
            <input
              type="text"
              value={formData.owner}
              onChange={(e) => handleChange('owner', e.target.value)}
              placeholder="Enter owner"
              className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC] transition-colors"
            />
          </div>

          <div>
            <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC] transition-colors"
            >
              <option value="Planned">Planned</option>
              <option value="Testing">Testing</option>
              <option value="In production">In production</option>
              <option value="Retired">Retired</option>
            </select>
          </div>

          <div>
            <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC] transition-colors"
            >
              <option value="Provider">Provider</option>
              <option value="Deployer">Deployer</option>
              <option value="Distributor">Distributor</option>
              <option value="Importer">Importer</option>
            </select>
          </div>

          <div>
            <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
              Provider Type
            </label>
            <select
              value={formData.providerType}
              onChange={(e) => handleChange('providerType', e.target.value)}
              className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC] transition-colors"
            >
              <option value="In-house">In-house</option>
              <option value="External">External</option>
              <option value="Mixed">Mixed</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>

          <div>
            <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
              Deployment Context
            </label>
            <select
              value={formData.deploymentContext}
              onChange={(e) => handleChange('deploymentContext', e.target.value)}
              className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC] transition-colors"
            >
              <option value="Workplace">Workplace</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Law enforcement">Law enforcement</option>
              <option value="Consumer">Consumer</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
              EU / EEA Relevance
            </label>
            <select
              value={formData.euEeaRelevance}
              onChange={(e) => handleChange('euEeaRelevance', e.target.value)}
              className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC] transition-colors"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Planned">Planned</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-[#F0F1F2]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}