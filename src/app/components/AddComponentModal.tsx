import { useState } from 'react';
import { Modal } from './Modal';
import { Package } from 'lucide-react';

export interface NewComponentData {
  name: string;
  type: 'Foundation Model' | 'Dataset' | 'ML Script' | 'Third-Party API' | 'Fine-tuned Model' | 'Vector Store';
  source: 'In-house' | 'OpenAI' | 'Meta' | 'HuggingFace' | 'Anthropic' | 'Google' | 'Microsoft' | 'Other';
}

interface AddComponentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (component: NewComponentData) => void;
}

const COMPONENT_TYPES: NewComponentData['type'][] = [
  'Foundation Model',
  'Fine-tuned Model',
  'Third-Party API',
  'Dataset',
  'ML Script',
  'Vector Store',
];

const SOURCES: NewComponentData['source'][] = [
  'In-house',
  'OpenAI',
  'Anthropic',
  'Meta',
  'HuggingFace',
  'Google',
  'Microsoft',
  'Other',
];

const typeDescriptions: Record<NewComponentData['type'], string> = {
  'Foundation Model': 'Large pre-trained model used as a base (e.g. GPT-4, Llama)',
  'Fine-tuned Model': 'A foundation model further trained on specific data',
  'Third-Party API': 'External AI service consumed via API',
  'Dataset': 'Training, validation, or evaluation data',
  'ML Script': 'Custom preprocessing, evaluation or inference code',
  'Vector Store': 'Embedding database for retrieval-augmented generation',
};

const inputClass = "w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors bg-white";
const labelClass = "block font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A] mb-2";

export function AddComponentModal({ isOpen, onClose, onAdd }: AddComponentModalProps) {
  const [formData, setFormData] = useState<NewComponentData>({
    name: '',
    type: 'Foundation Model',
    source: 'In-house',
  });
  const [errors, setErrors] = useState<{ name?: string }>({});

  const handleChange = <K extends keyof NewComponentData>(field: K, value: NewComponentData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'name') setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrors({ name: 'Component name is required' });
      return;
    }
    onAdd({ ...formData, name: formData.name.trim() });
    setFormData({ name: '', type: 'Foundation Model', source: 'In-house' });
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setFormData({ name: '', type: 'Foundation Model', source: 'In-house' });
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Component" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Tip banner */}
        <div className="bg-[#ece9fe] border border-[#ddd6fe] rounded-lg p-4 flex items-start gap-3">
          <Package className="w-4 h-4 text-[#5720B7] shrink-0 mt-0.5" />
          <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#5720B7]">
            Register an AI component such as a model, dataset, API or script used by one or more AI systems in your inventory.
          </p>
        </div>

        {/* Component Name */}
        <div>
          <label className={labelClass}>
            Component Name <span className="text-[#5720B7]">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="e.g. GPT-4o API, Resume Dataset V1, Custom Llama-3"
            className={`${inputClass} ${errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
            autoFocus
          />
          {errors.name && (
            <p className="mt-1.5 font-['Roboto',sans-serif] font-normal text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Component Type */}
        <div>
          <label className={labelClass}>Component Type</label>
          <div className="grid grid-cols-2 gap-2">
            {COMPONENT_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleChange('type', type)}
                className={`relative px-3 py-2.5 rounded-lg border text-left transition-all ${
                  formData.type === type
                    ? 'bg-[#ece9fe] border-[#5720B7] ring-1 ring-[#5720B7]'
                    : 'bg-white border-[#E5E7EB] hover:border-[#5720B7] hover:bg-[#ece9fe]/40'
                }`}
              >
                <span className={`font-['Roboto',sans-serif] font-semibold text-xs block ${formData.type === type ? 'text-[#5720B7]' : 'text-[#22262A]'}`}>
                  {type}
                </span>
                <span className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C] mt-0.5 block leading-tight">
                  {typeDescriptions[type]}
                </span>
                {formData.type === type && (
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#5720B7] flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                      <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Source / Vendor */}
        <div>
          <label className={labelClass}>Source / Vendor</label>
          <div className="flex flex-wrap gap-2">
            {SOURCES.map((source) => (
              <button
                key={source}
                type="button"
                onClick={() => handleChange('source', source)}
                className={`px-4 py-2 rounded-full border font-['Roboto',sans-serif] font-semibold text-sm transition-all ${
                  formData.source === source
                    ? 'bg-[#5720B7] text-white border-[#5720B7] shadow-sm'
                    : 'bg-white text-[#464E58] border-[#E5E7EB] hover:border-[#5720B7] hover:text-[#5720B7]'
                }`}
              >
                {source}
              </button>
            ))}
          </div>
          {formData.source === 'Other' && (
            <input
              type="text"
              placeholder="Specify vendor name…"
              className={`${inputClass} mt-3`}
            />
          )}
        </div>

        {/* Summary preview */}
        {formData.name.trim() && (
          <div className="bg-[#F9FAFB] border border-[#F0F1F2] rounded-lg px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ece9fe] flex items-center justify-center shrink-0">
              <Package className="w-4 h-4 text-[#5720B7]" />
            </div>
            <div className="min-w-0">
              <p className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A] truncate">{formData.name}</p>
              <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C]">
                {formData.type} · {formData.source}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2 border-t border-[#F0F1F2]">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2.5 bg-[#5720B7] text-white rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#4c1d95] transition-colors shadow-sm"
          >
            Add Component
          </button>
        </div>
      </form>
    </Modal>
  );
}
