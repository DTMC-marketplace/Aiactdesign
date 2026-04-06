import { X, ChevronDown, AlertTriangle, Edit2, Check } from 'lucide-react';
import { useState } from 'react';

interface Dataset {
  id: string;
  datasetName: string;
  dataType: 'Tabular' | 'Text' | 'Image' | 'Audio' | 'Video' | 'Time Series' | 'Graph' | 'Multimodal';
  storageLocation: string;
  sensitivity: 'Public' | 'Internal' | 'Confidential' | 'Restricted';
  usageStatus: 'Active' | 'Archived' | 'In Development' | 'Deprecated';
  updateFrequency: 'Real-time' | 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Static';
  lastUpdate: string;
  ownerTeam: string;
  linkedModelsCount: number;
  source: 'Internal' | 'Third-Party' | 'Synthetic' | 'Public';
  description: string;
  dataOwner: string;
  sourceOrigin: 'Internal (Proprietary)' | 'Third-Party (Purchased)' | 'Open Source (Public)' | 'Synthetic (AI-generated)';
  storageLocationType: 'Domestic Server' | 'EU-based Cloud' | 'Non-EU Cloud (US/Other)' | 'On-Premise';
  storageLocationDetails: string;
  personalDataPII: boolean;
  sensitiveCategories: boolean;
  dataRightsLicense: string;
  intendedUse: Array<'Training' | 'Testing/Validation' | 'Fine-tuning' | 'Benchmarking'>;
  linkedModelIds: string[];
  schemaStructure?: string;
  datasetVersion?: string; // Version for uploaded datasets
  uploadedFileName?: string; // Original filename for uploaded datasets
}

interface DatasetDrawerProps {
  dataset: Dataset;
  onClose: () => void;
  onUpdate: (updatedDataset: Dataset) => void;
}

export function DatasetDrawer({ dataset, onClose, onUpdate }: DatasetDrawerProps) {
  const [editedDataset, setEditedDataset] = useState<Dataset>(dataset);
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const handleSave = (section: string) => {
    onUpdate(editedDataset);
    setEditingSection(null);
  };

  const handleCancel = (section: string) => {
    setEditedDataset(dataset);
    setEditingSection(null);
  };

  const toggleIntendedUse = (use: Dataset['intendedUse'][number]) => {
    if (editedDataset.intendedUse.includes(use)) {
      setEditedDataset({
        ...editedDataset,
        intendedUse: editedDataset.intendedUse.filter(u => u !== use),
      });
    } else {
      setEditedDataset({
        ...editedDataset,
        intendedUse: [...editedDataset.intendedUse, use],
      });
    }
  };

  const showDPIAWarning = dataset.personalDataPII || dataset.sensitiveCategories;

  return (
    <div className="bg-white border-t-4 border-[#5720B7] p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-['Roboto',sans-serif] font-bold text-xl text-[#22262A] mb-2">
            {dataset.datasetName}
          </h3>
          <div className="flex items-center gap-2">
            <span className="inline-flex px-2.5 py-1 rounded-full bg-[#DBEAFE] text-[#1E40AF] font-['Roboto',sans-serif] font-medium text-xs">
              {dataset.dataType}
            </span>
            {dataset.linkedModelsCount > 0 && (
              <span className="inline-flex px-2.5 py-1 rounded-full bg-[#ece9fe] text-[#5720B7] font-['Roboto',sans-serif] font-medium text-xs">
                {dataset.linkedModelsCount} Linked Model{dataset.linkedModelsCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-[#F0F1F2] rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-[#464E58]" />
        </button>
      </div>

      {/* DPIA Warning */}
      {showDPIAWarning && (
        <div className="bg-[#FEF3C7] border-l-4 border-[#F59E0B] rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
            <div>
              <p className="font-['Roboto',sans-serif] font-semibold text-sm text-[#92400E]">
                Data Protection Impact Assessment (DPIA) Required
              </p>
              <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#92400E] mt-1">
                This dataset contains {dataset.personalDataPII && 'personal data (PII)'}
                {dataset.personalDataPII && dataset.sensitiveCategories && ' and '}
                {dataset.sensitiveCategories && 'sensitive categories'}. A DPIA should be flagged in the Compliance module.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Section 1: Identity & Ownership */}
      <div className="border border-[#F0F1F2] rounded-lg overflow-hidden">
        <div className="bg-[#F9FAFB] px-6 py-4 flex items-center justify-between border-b border-[#F0F1F2]">
          <h4 className="font-['Roboto',sans-serif] font-bold text-sm text-[#22262A]">
            Section 1: Identity & Ownership
          </h4>
          {editingSection !== 'identity' && (
            <button
              onClick={() => setEditingSection('identity')}
              className="p-1.5 hover:bg-[#ece9fe] rounded transition-colors"
            >
              <Edit2 className="w-4 h-4 text-[#5720B7]" />
            </button>
          )}
        </div>
        <div className="p-6 space-y-4">
          {/* Dataset Name */}
          <div>
            <label className="block mb-2">
              <span className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase">
                Dataset Name
              </span>
            </label>
            {editingSection === 'identity' ? (
              <input
                type="text"
                value={editedDataset.datasetName}
                onChange={(e) => setEditedDataset({ ...editedDataset, datasetName: e.target.value })}
                className="w-full px-4 py-2 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe]"
              />
            ) : (
              <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]">
                {dataset.datasetName}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2">
              <span className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase">
                Description
              </span>
            </label>
            {editingSection === 'identity' ? (
              <textarea
                value={editedDataset.description}
                onChange={(e) => setEditedDataset({ ...editedDataset, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] resize-none"
              />
            ) : (
              <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]">
                {dataset.description || 'No description provided'}
              </p>
            )}
          </div>

          {/* Owner/Team */}
          <div>
            <label className="block mb-2">
              <span className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase">
                Owner/Team
              </span>
            </label>
            {editingSection === 'identity' ? (
              <input
                type="text"
                value={editedDataset.ownerTeam}
                onChange={(e) => setEditedDataset({ ...editedDataset, ownerTeam: e.target.value })}
                className="w-full px-4 py-2 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe]"
              />
            ) : (
              <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]">
                {dataset.ownerTeam}
              </p>
            )}
          </div>

          {/* Data Owner (Individual) */}
          <div>
            <label className="block mb-2">
              <span className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase">
                Data Owner (Individual)
              </span>
            </label>
            {editingSection === 'identity' ? (
              <input
                type="text"
                value={editedDataset.dataOwner}
                onChange={(e) => setEditedDataset({ ...editedDataset, dataOwner: e.target.value })}
                className="w-full px-4 py-2 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe]"
              />
            ) : (
              <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]">
                {dataset.dataOwner || 'Not specified'}
              </p>
            )}
          </div>

          {editingSection === 'identity' && (
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleSave('identity')}
                className="px-4 py-2 bg-[#5720B7] text-white rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#3f1585] transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => handleCancel('identity')}
                className="px-4 py-2 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Section 2: The "What" and "Where" (Technical) */}
      <div className="border border-[#F0F1F2] rounded-lg overflow-hidden">
        <div className="bg-[#F9FAFB] px-6 py-4 flex items-center justify-between border-b border-[#F0F1F2]">
          <h4 className="font-['Roboto',sans-serif] font-bold text-sm text-[#22262A]">
            Section 2: The "What" and "Where" (Technical)
          </h4>
          {editingSection !== 'technical' && (
            <button
              onClick={() => setEditingSection('technical')}
              className="p-1.5 hover:bg-[#ece9fe] rounded transition-colors"
            >
              <Edit2 className="w-4 h-4 text-[#5720B7]" />
            </button>
          )}
        </div>
        <div className="p-6 space-y-4">
          {/* Data Type */}
          <div>
            <label className="block mb-2">
              <span className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase">
                Data Type
              </span>
            </label>
            {editingSection === 'technical' ? (
              <select
                value={editedDataset.dataType}
                onChange={(e) => setEditedDataset({ ...editedDataset, dataType: e.target.value as Dataset['dataType'] })}
                className="w-full px-4 py-2 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe]"
              >
                <option value="Text">Text</option>
                <option value="Image">Image</option>
                <option value="Audio">Audio</option>
                <option value="Video">Video</option>
                <option value="Tabular">Tabular (CSV/SQL)</option>
                <option value="Multimodal">Multimodal</option>
                <option value="Time Series">Time Series</option>
                <option value="Graph">Graph</option>
              </select>
            ) : (
              <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]">
                {dataset.dataType}
              </p>
            )}
          </div>

          {/* Source Origin */}
          <div>
            <label className="block mb-2">
              <span className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase">
                Source Origin
              </span>
            </label>
            {editingSection === 'technical' ? (
              <select
                value={editedDataset.sourceOrigin}
                onChange={(e) => setEditedDataset({ ...editedDataset, sourceOrigin: e.target.value as Dataset['sourceOrigin'] })}
                className="w-full px-4 py-2 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe]"
              >
                <option value="Internal (Proprietary)">Internal (Proprietary)</option>
                <option value="Third-Party (Purchased)">Third-Party (Purchased)</option>
                <option value="Open Source (Public)">Open Source (Public)</option>
                <option value="Synthetic (AI-generated)">Synthetic (AI-generated)</option>
              </select>
            ) : (
              <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]">
                {dataset.sourceOrigin}
              </p>
            )}
          </div>

          {/* Storage Location */}
          <div>
            <label className="block mb-2">
              <span className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase">
                Storage Location <span className="text-[#5720B7]">(Critical for EU AI Act/GDPR)</span>
              </span>
            </label>
            {editingSection === 'technical' ? (
              <>
                <select
                  value={editedDataset.storageLocationType}
                  onChange={(e) => setEditedDataset({ ...editedDataset, storageLocationType: e.target.value as Dataset['storageLocationType'] })}
                  className="w-full px-4 py-2 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] mb-2"
                >
                  <option value="Domestic Server">Domestic Server</option>
                  <option value="EU-based Cloud">EU-based Cloud</option>
                  <option value="Non-EU Cloud (US/Other)">Non-EU Cloud (US/Other)</option>
                  <option value="On-Premise">On-Premise</option>
                </select>
                <input
                  type="text"
                  placeholder="Storage details..."
                  value={editedDataset.storageLocationDetails}
                  onChange={(e) => setEditedDataset({ ...editedDataset, storageLocationDetails: e.target.value })}
                  className="w-full px-4 py-2 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe]"
                />
              </>
            ) : (
              <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]">
                {dataset.storageLocationType}
                {dataset.storageLocationDetails && ` - ${dataset.storageLocationDetails}`}
              </p>
            )}
          </div>

          {/* Dataset Version (for uploaded datasets) */}
          {(dataset.datasetVersion || dataset.uploadedFileName || editingSection === 'technical') && (
            <>
              {dataset.uploadedFileName && (
                <div>
                  <label className="block mb-2">
                    <span className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase">
                      Uploaded File
                    </span>
                  </label>
                  <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]">
                    {dataset.uploadedFileName}
                  </p>
                </div>
              )}
              <div>
                <label className="block mb-2">
                  <span className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase">
                    Dataset Version
                  </span>
                </label>
                {editingSection === 'technical' ? (
                  <input
                    type="text"
                    placeholder="e.g., 1.0.0"
                    value={editedDataset.datasetVersion || ''}
                    onChange={(e) => setEditedDataset({ ...editedDataset, datasetVersion: e.target.value })}
                    className="w-full px-4 py-2 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe]"
                  />
                ) : (
                  <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]">
                    {dataset.datasetVersion || 'Not specified'}
                  </p>
                )}
              </div>
            </>
          )}

          {editingSection === 'technical' && (
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleSave('technical')}
                className="px-4 py-2 bg-[#5720B7] text-white rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#3f1585] transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => handleCancel('technical')}
                className="px-4 py-2 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Section 3: Risk & Privacy (Compliance Triggers) */}
      <div className="border border-[#F0F1F2] rounded-lg overflow-hidden">
        <div className="bg-[#F9FAFB] px-6 py-4 flex items-center justify-between border-b border-[#F0F1F2]">
          <h4 className="font-['Roboto',sans-serif] font-bold text-sm text-[#22262A]">
            Section 3: Risk & Privacy (Compliance Triggers)
          </h4>
          {editingSection !== 'privacy' && (
            <button
              onClick={() => setEditingSection('privacy')}
              className="p-1.5 hover:bg-[#ece9fe] rounded transition-colors"
            >
              <Edit2 className="w-4 h-4 text-[#5720B7]" />
            </button>
          )}
        </div>
        <div className="p-6 space-y-4">
          {/* Sensitivity Level */}
          <div>
            <label className="block mb-2">
              <span className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase">
                Sensitivity Level
              </span>
            </label>
            {editingSection === 'privacy' ? (
              <select
                value={editedDataset.sensitivity}
                onChange={(e) => setEditedDataset({ ...editedDataset, sensitivity: e.target.value as Dataset['sensitivity'] })}
                className="w-full px-4 py-2 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe]"
              >
                <option value="Public">Public</option>
                <option value="Internal">Internal</option>
                <option value="Confidential">Confidential</option>
                <option value="Restricted">Restricted</option>
              </select>
            ) : (
              <span className={`inline-flex px-2.5 py-1 rounded-full font-['Roboto',sans-serif] font-medium text-xs ${
                dataset.sensitivity === 'Public' ? 'bg-[#D1FAE5] text-[#065F46]' :
                dataset.sensitivity === 'Internal' ? 'bg-[#FEF3C7] text-[#92400E]' :
                dataset.sensitivity === 'Confidential' ? 'bg-[#FED7AA] text-[#9A3412]' :
                'bg-[#FEE2E2] text-[#991B1B]'
              }`}>
                {dataset.sensitivity}
              </span>
            )}
          </div>

          {/* Personal Data (PII) */}
          <div>
            <label className="flex items-center justify-between">
              <span className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase">
                Personal Data (PII)
              </span>
              {editingSection === 'privacy' ? (
                <input
                  type="checkbox"
                  checked={editedDataset.personalDataPII}
                  onChange={(e) => setEditedDataset({ ...editedDataset, personalDataPII: e.target.checked })}
                  className="w-5 h-5 accent-[#5720B7] rounded"
                />
              ) : null}
            </label>
            {editingSection !== 'privacy' && (
              <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58] mt-2">
                {dataset.personalDataPII ? (
                  <span className="inline-flex px-2.5 py-1 rounded-full bg-[#FEE2E2] text-[#991B1B] font-medium text-xs">
                    Yes - Contains names, emails, or IDs
                  </span>
                ) : (
                  <span className="inline-flex px-2.5 py-1 rounded-full bg-[#D1FAE5] text-[#065F46] font-medium text-xs">
                    No
                  </span>
                )}
              </p>
            )}
            {editingSection === 'privacy' && (
              <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#B5BCC4] mt-1">
                Contains names, emails, or IDs?
              </p>
            )}
          </div>

          {/* Sensitive Categories */}
          <div>
            <label className="flex items-center justify-between">
              <span className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase">
                Sensitive Categories
              </span>
              {editingSection === 'privacy' ? (
                <input
                  type="checkbox"
                  checked={editedDataset.sensitiveCategories}
                  onChange={(e) => setEditedDataset({ ...editedDataset, sensitiveCategories: e.target.checked })}
                  className="w-5 h-5 accent-[#5720B7] rounded"
                />
              ) : null}
            </label>
            {editingSection !== 'privacy' && (
              <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58] mt-2">
                {dataset.sensitiveCategories ? (
                  <span className="inline-flex px-2.5 py-1 rounded-full bg-[#FEE2E2] text-[#991B1B] font-medium text-xs">
                    Yes - Health, racial, religious, or political data
                  </span>
                ) : (
                  <span className="inline-flex px-2.5 py-1 rounded-full bg-[#D1FAE5] text-[#065F46] font-medium text-xs">
                    No
                  </span>
                )}
              </p>
            )}
            {editingSection === 'privacy' && (
              <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#B5BCC4] mt-1">
                Contains health, racial, religious, or political data?
              </p>
            )}
          </div>

          {/* Data Rights/License */}
          <div>
            <label className="block mb-2">
              <span className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase">
                Data Rights/License
              </span>
            </label>
            {editingSection === 'privacy' ? (
              <input
                type="text"
                placeholder="e.g., Commercial Use, CC BY-SA, Internal Use Only"
                value={editedDataset.dataRightsLicense}
                onChange={(e) => setEditedDataset({ ...editedDataset, dataRightsLicense: e.target.value })}
                className="w-full px-4 py-2 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe]"
              />
            ) : (
              <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]">
                {dataset.dataRightsLicense || 'Not specified'}
              </p>
            )}
          </div>

          {editingSection === 'privacy' && (
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleSave('privacy')}
                className="px-4 py-2 bg-[#5720B7] text-white rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#3f1585] transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => handleCancel('privacy')}
                className="px-4 py-2 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Section 4: Usage & Maintenance */}
      <div className="border border-[#F0F1F2] rounded-lg overflow-hidden">
        <div className="bg-[#F9FAFB] px-6 py-4 flex items-center justify-between border-b border-[#F0F1F2]">
          <h4 className="font-['Roboto',sans-serif] font-bold text-sm text-[#22262A]">
            Section 4: Usage & Maintenance
          </h4>
          {editingSection !== 'maintenance' && (
            <button
              onClick={() => setEditingSection('maintenance')}
              className="p-1.5 hover:bg-[#ece9fe] rounded transition-colors"
            >
              <Edit2 className="w-4 h-4 text-[#5720B7]" />
            </button>
          )}
        </div>
        <div className="p-6 space-y-4">
          {/* Usage Status */}
          <div>
            <label className="block mb-2">
              <span className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase">
                Usage Status
              </span>
            </label>
            {editingSection === 'maintenance' ? (
              <select
                value={editedDataset.usageStatus}
                onChange={(e) => setEditedDataset({ ...editedDataset, usageStatus: e.target.value as Dataset['usageStatus'] })}
                className="w-full px-4 py-2 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe]"
              >
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
                <option value="In Development">In Development</option>
                <option value="Deprecated">Deprecated</option>
              </select>
            ) : (
              <span className={`inline-flex px-2.5 py-1 rounded-full font-['Roboto',sans-serif] font-medium text-xs ${
                dataset.usageStatus === 'Active' ? 'bg-[#D1FAE5] text-[#065F46]' :
                dataset.usageStatus === 'Archived' ? 'bg-[#F3F4F6] text-[#4B5563]' :
                dataset.usageStatus === 'In Development' ? 'bg-[#DBEAFE] text-[#1E40AF]' :
                'bg-[#FEE2E2] text-[#991B1B]'
              }`}>
                {dataset.usageStatus}
              </span>
            )}
          </div>

          {/* Update Frequency */}
          <div>
            <label className="block mb-2">
              <span className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase">
                Update Frequency
              </span>
            </label>
            {editingSection === 'maintenance' ? (
              <select
                value={editedDataset.updateFrequency}
                onChange={(e) => setEditedDataset({ ...editedDataset, updateFrequency: e.target.value as Dataset['updateFrequency'] })}
                className="w-full px-4 py-2 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe]"
              >
                <option value="Real-time">Real-time</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Static">Static</option>
              </select>
            ) : (
              <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]">
                {dataset.updateFrequency}
              </p>
            )}
          </div>

          {/* Last Update */}
          <div>
            <label className="block mb-2">
              <span className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase">
                Last Update
              </span>
            </label>
            <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]">
              {new Date(dataset.lastUpdate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </p>
          </div>

          {editingSection === 'maintenance' && (
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleSave('maintenance')}
                className="px-4 py-2 bg-[#5720B7] text-white rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#3f1585] transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => handleCancel('maintenance')}
                className="px-4 py-2 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Section 5: Usage in AI Lifecycle */}
      <div className="border border-[#F0F1F2] rounded-lg overflow-hidden">
        <div className="bg-[#F9FAFB] px-6 py-4 flex items-center justify-between border-b border-[#F0F1F2]">
          <h4 className="font-['Roboto',sans-serif] font-bold text-sm text-[#22262A]">
            Section 5: Usage in AI Lifecycle
          </h4>
          {editingSection !== 'usage' && (
            <button
              onClick={() => setEditingSection('usage')}
              className="p-1.5 hover:bg-[#ece9fe] rounded transition-colors"
            >
              <Edit2 className="w-4 h-4 text-[#5720B7]" />
            </button>
          )}
        </div>
        <div className="p-6 space-y-4">
          {/* Intended Use */}
          <div>
            <label className="block mb-2">
              <span className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase">
                Intended Use
              </span>
            </label>
            {editingSection === 'usage' ? (
              <div className="space-y-2">
                {(['Training', 'Testing/Validation', 'Fine-tuning', 'Benchmarking'] as const).map((use) => (
                  <label key={use} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editedDataset.intendedUse.includes(use)}
                      onChange={() => toggleIntendedUse(use)}
                      className="w-4 h-4 accent-[#5720B7] rounded"
                    />
                    <span className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]">
                      {use}
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {dataset.intendedUse.length > 0 ? (
                  dataset.intendedUse.map((use) => (
                    <span key={use} className="inline-flex px-2.5 py-1 rounded-full bg-[#DBEAFE] text-[#1E40AF] font-['Roboto',sans-serif] font-medium text-xs">
                      {use}
                    </span>
                  ))
                ) : (
                  <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#B5BCC4]">
                    Not specified
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Linked Models */}
          <div>
            <label className="block mb-2">
              <span className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase">
                Linked Models ({dataset.linkedModelIds.length})
              </span>
            </label>
            {dataset.linkedModelIds.length > 0 ? (
              <div className="space-y-2">
                {dataset.linkedModelIds.map((modelId) => (
                  <div key={modelId} className="flex items-center gap-2 px-4 py-2 bg-[#F9FAFB] rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-[#5720B7]" />
                    <span className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]">
                      Model {modelId}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#B5BCC4]">
                No models linked to this dataset
              </p>
            )}
          </div>

          {editingSection === 'usage' && (
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleSave('usage')}
                className="px-4 py-2 bg-[#5720B7] text-white rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#3f1585] transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => handleCancel('usage')}
                className="px-4 py-2 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}