import { X, FileText, Upload as UploadIcon, Database } from 'lucide-react';
import { useState } from 'react';

interface AddDatasetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (dataset: NewDatasetData) => void;
}

export interface NewDatasetData {
  datasetName: string;
  dataType: 'Tabular' | 'Text' | 'Image' | 'Audio' | 'Video' | 'Time Series' | 'Graph' | 'Multimodal';
  storageLocation: string;
  sensitivity: 'Public' | 'Internal' | 'Confidential' | 'Restricted';
  usageStatus: 'Active' | 'Archived' | 'In Development' | 'Deprecated';
  updateFrequency: 'Real-time' | 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Static';
  ownerTeam: string;
  source: 'Internal' | 'Third-Party' | 'Synthetic' | 'Public';
  description?: string;
  uploadedFile?: File;
  datasetVersion?: string; // Version for uploaded datasets
  uploadedFileName?: string; // Original filename for uploaded datasets
}

export function AddDatasetModal({ isOpen, onClose, onAdd }: AddDatasetModalProps) {
  const [selectedOption, setSelectedOption] = useState<'manual' | 'upload' | null>(null);
  
  // Manual record fields
  const [datasetName, setDatasetName] = useState('');
  const [dataType, setDataType] = useState<NewDatasetData['dataType']>('Tabular');
  const [storageLocation, setStorageLocation] = useState('');
  const [sensitivity, setSensitivity] = useState<NewDatasetData['sensitivity']>('Internal');
  const [usageStatus, setUsageStatus] = useState<NewDatasetData['usageStatus']>('Active');
  const [updateFrequency, setUpdateFrequency] = useState<NewDatasetData['updateFrequency']>('Static');
  const [ownerTeam, setOwnerTeam] = useState('');
  const [source, setSource] = useState<NewDatasetData['source']>('Internal');
  const [description, setDescription] = useState('');
  
  // File upload fields
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadDatasetName, setUploadDatasetName] = useState('');
  const [uploadOwnerTeam, setUploadOwnerTeam] = useState('');
  const [uploadSource, setUploadSource] = useState<NewDatasetData['source']>('Internal');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadVersion, setUploadVersion] = useState(''); // Version for uploaded datasets

  if (!isOpen) return null;

  const handleReset = () => {
    setSelectedOption(null);
    setDatasetName('');
    setDataType('Tabular');
    setStorageLocation('');
    setSensitivity('Internal');
    setUsageStatus('Active');
    setUpdateFrequency('Static');
    setOwnerTeam('');
    setSource('Internal');
    setDescription('');
    setUploadedFile(null);
    setUploadDatasetName('');
    setUploadOwnerTeam('');
    setUploadSource('Internal');
    setUploadDescription('');
    setUploadVersion('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Auto-populate name from filename if empty
      if (!uploadDatasetName) {
        const nameWithoutExt = file.name.split('.').slice(0, -1).join('.');
        setUploadDatasetName(nameWithoutExt);
      }
    }
  };

  const handleAdd = () => {
    if (selectedOption === 'manual' && datasetName && storageLocation && ownerTeam) {
      onAdd({
        datasetName,
        dataType,
        storageLocation,
        sensitivity,
        usageStatus,
        updateFrequency,
        ownerTeam,
        source,
        description,
      });
      handleClose();
    } else if (selectedOption === 'upload' && uploadedFile && uploadDatasetName && uploadOwnerTeam) {
      onAdd({
        datasetName: uploadDatasetName,
        dataType: 'Tabular', // Default for uploaded files
        storageLocation: 'Uploaded - Processing',
        sensitivity: 'Internal',
        usageStatus: 'In Development',
        updateFrequency: 'Static',
        ownerTeam: uploadOwnerTeam,
        source: uploadSource,
        description: uploadDescription,
        uploadedFile,
        uploadedFileName: uploadedFile?.name,
        datasetVersion: uploadVersion,
      });
      handleClose();
    }
  };

  const isFormValid = () => {
    if (selectedOption === 'manual') {
      return datasetName.trim() !== '' && storageLocation.trim() !== '' && ownerTeam.trim() !== '';
    } else if (selectedOption === 'upload') {
      return uploadedFile !== null && uploadDatasetName.trim() !== '' && uploadOwnerTeam.trim() !== '';
    }
    return false;
  };

  const acceptedFileTypes = '.csv,.json,.pdf,.xlsx,.xls,.txt,.parquet';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#F0F1F2] flex items-center justify-between shrink-0">
          <h2 className="font-['Roboto',sans-serif] font-bold text-xl text-[#22262A]">
            Add New Dataset
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-[#F0F1F2] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#464E58]" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto flex-1">
          {!selectedOption && (
            <div className="space-y-4">
              <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#565F6C] mb-6">
                Choose how you want to add your dataset
              </p>

              {/* Option A: Manual Record */}
              <button
                onClick={() => setSelectedOption('manual')}
                className="w-full p-6 border-2 border-[#ddd6fe] rounded-lg hover:border-[#5720B7] hover:bg-[#ece9fe] transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#ece9fe] flex items-center justify-center shrink-0 group-hover:bg-[#5720B7] transition-colors">
                    <Database className="w-6 h-6 text-[#5720B7] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-['Roboto',sans-serif] font-bold text-base text-[#22262A] mb-2">
                      Manual Record
                    </h3>
                    <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#565F6C] mb-3">
                      Enter information about an existing database or dataset that's already stored in your infrastructure
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-[#DBEAFE] text-[#1E40AF] rounded-full font-['Roboto',sans-serif] font-medium text-xs">
                        Quick Entry
                      </span>
                      <span className="px-2.5 py-1 bg-[#D1FAE5] text-[#065F46] rounded-full font-['Roboto',sans-serif] font-medium text-xs">
                        Full Control
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Option B: File Upload */}
              <button
                onClick={() => setSelectedOption('upload')}
                className="w-full p-6 border-2 border-[#ddd6fe] rounded-lg hover:border-[#5720B7] hover:bg-[#ece9fe] transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#ece9fe] flex items-center justify-center shrink-0 group-hover:bg-[#5720B7] transition-colors">
                    <UploadIcon className="w-6 h-6 text-[#5720B7] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-['Roboto',sans-serif] font-bold text-base text-[#22262A] mb-2">
                      File Upload
                    </h3>
                    <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#565F6C] mb-3">
                      Upload a sample or documentation (CSV, JSON, PDF, Excel) that describes the dataset
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-[#FCE7F3] text-[#831843] rounded-full font-['Roboto',sans-serif] font-medium text-xs">
                        CSV
                      </span>
                      <span className="px-2.5 py-1 bg-[#E0E7FF] text-[#3730A3] rounded-full font-['Roboto',sans-serif] font-medium text-xs">
                        JSON
                      </span>
                      <span className="px-2.5 py-1 bg-[#FEF3C7] text-[#92400E] rounded-full font-['Roboto',sans-serif] font-medium text-xs">
                        PDF
                      </span>
                      <span className="px-2.5 py-1 bg-[#D1FAE5] text-[#065F46] rounded-full font-['Roboto',sans-serif] font-medium text-xs">
                        Excel
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Option A: Manual Record Form */}
          {selectedOption === 'manual' && (
            <div className="space-y-6">
              <button
                onClick={() => setSelectedOption(null)}
                className="font-['Roboto',sans-serif] font-semibold text-sm text-[#5720B7] hover:text-[#3f1585] transition-colors"
              >
                ← Back to options
              </button>

              <div className="space-y-4">
                {/* Dataset Name */}
                <div>
                  <label className="block mb-2">
                    <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                      Dataset Name *
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Customer Transaction Database"
                    value={datasetName}
                    onChange={(e) => setDatasetName(e.target.value)}
                    className="w-full px-4 py-3 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors"
                  />
                </div>

                {/* Data Type & Source */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">
                      <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                        Data Type *
                      </span>
                    </label>
                    <select
                      value={dataType}
                      onChange={(e) => setDataType(e.target.value as NewDatasetData['dataType'])}
                      className="w-full px-4 py-3 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors"
                    >
                      <option value="Tabular">Tabular</option>
                      <option value="Text">Text</option>
                      <option value="Image">Image</option>
                      <option value="Audio">Audio</option>
                      <option value="Video">Video</option>
                      <option value="Time Series">Time Series</option>
                      <option value="Graph">Graph</option>
                      <option value="Multimodal">Multimodal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                        Source *
                      </span>
                    </label>
                    <select
                      value={source}
                      onChange={(e) => setSource(e.target.value as NewDatasetData['source'])}
                      className="w-full px-4 py-3 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors"
                    >
                      <option value="Internal">Internal</option>
                      <option value="Third-Party">Third-Party</option>
                      <option value="Synthetic">Synthetic</option>
                      <option value="Public">Public</option>
                    </select>
                  </div>
                </div>

                {/* Storage Location */}
                <div>
                  <label className="block mb-2">
                    <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                      Storage Location *
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., AWS S3 - us-east-1, Azure Blob Storage, On-Premise Server"
                    value={storageLocation}
                    onChange={(e) => setStorageLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors"
                  />
                </div>

                {/* Sensitivity & Usage Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">
                      <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                        Sensitivity Level *
                      </span>
                    </label>
                    <select
                      value={sensitivity}
                      onChange={(e) => setSensitivity(e.target.value as NewDatasetData['sensitivity'])}
                      className="w-full px-4 py-3 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors"
                    >
                      <option value="Public">Public</option>
                      <option value="Internal">Internal</option>
                      <option value="Confidential">Confidential</option>
                      <option value="Restricted">Restricted</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                        Usage Status *
                      </span>
                    </label>
                    <select
                      value={usageStatus}
                      onChange={(e) => setUsageStatus(e.target.value as NewDatasetData['usageStatus'])}
                      className="w-full px-4 py-3 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors"
                    >
                      <option value="Active">Active</option>
                      <option value="Archived">Archived</option>
                      <option value="In Development">In Development</option>
                      <option value="Deprecated">Deprecated</option>
                    </select>
                  </div>
                </div>

                {/* Update Frequency & Owner */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">
                      <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                        Update Frequency *
                      </span>
                    </label>
                    <select
                      value={updateFrequency}
                      onChange={(e) => setUpdateFrequency(e.target.value as NewDatasetData['updateFrequency'])}
                      className="w-full px-4 py-3 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors"
                    >
                      <option value="Real-time">Real-time</option>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Static">Static</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                        Owner/Team *
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Data Team"
                      value={ownerTeam}
                      onChange={(e) => setOwnerTeam(e.target.value)}
                      className="w-full px-4 py-3 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block mb-2">
                    <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                      Description <span className="text-[#B5BCC4] font-normal">(Optional)</span>
                    </span>
                  </label>
                  <textarea
                    placeholder="Provide additional details about this dataset..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Option B: File Upload Form */}
          {selectedOption === 'upload' && (
            <div className="space-y-6">
              <button
                onClick={() => setSelectedOption(null)}
                className="font-['Roboto',sans-serif] font-semibold text-sm text-[#5720B7] hover:text-[#3f1585] transition-colors"
              >
                ← Back to options
              </button>

              <div className="space-y-4">
                {/* File Upload Area */}
                <div>
                  <label className="block mb-2">
                    <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                      Upload Dataset File *
                    </span>
                  </label>
                  <div className="border-2 border-dashed border-[#ddd6fe] rounded-lg p-8 text-center hover:border-[#5720B7] hover:bg-[#ece9fe]/30 transition-all">
                    <input
                      type="file"
                      id="dataset-file-upload"
                      accept={acceptedFileTypes}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="dataset-file-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <div className="w-12 h-12 rounded-lg bg-[#ece9fe] flex items-center justify-center mb-3">
                        {uploadedFile ? (
                          <FileText className="w-6 h-6 text-[#5720B7]" />
                        ) : (
                          <UploadIcon className="w-6 h-6 text-[#5720B7]" />
                        )}
                      </div>
                      {uploadedFile ? (
                        <div>
                          <p className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A] mb-1">
                            {uploadedFile.name}
                          </p>
                          <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C]">
                            {(uploadedFile.size / 1024).toFixed(2)} KB • Click to change
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A] mb-1">
                            Click to upload or drag and drop
                          </p>
                          <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C]">
                            CSV, JSON, PDF, Excel files (max 10MB)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Dataset Name */}
                <div>
                  <label className="block mb-2">
                    <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                      Dataset Name *
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Auto-populated from filename"
                    value={uploadDatasetName}
                    onChange={(e) => setUploadDatasetName(e.target.value)}
                    className="w-full px-4 py-3 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors"
                  />
                </div>

                {/* Source & Owner */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">
                      <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                        Source *
                      </span>
                    </label>
                    <select
                      value={uploadSource}
                      onChange={(e) => setUploadSource(e.target.value as NewDatasetData['source'])}
                      className="w-full px-4 py-3 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors"
                    >
                      <option value="Internal">Internal</option>
                      <option value="Third-Party">Third-Party</option>
                      <option value="Synthetic">Synthetic</option>
                      <option value="Public">Public</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                        Owner/Team *
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Data Team"
                      value={uploadOwnerTeam}
                      onChange={(e) => setUploadOwnerTeam(e.target.value)}
                      className="w-full px-4 py-3 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block mb-2">
                    <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                      Description <span className="text-[#B5BCC4] font-normal">(Optional)</span>
                    </span>
                  </label>
                  <textarea
                    placeholder="Provide additional details about this dataset..."
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors resize-none"
                  />
                </div>

                {/* Version */}
                <div>
                  <label className="block mb-2">
                    <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                      Version <span className="text-[#B5BCC4] font-normal">(Optional)</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 1.0.0"
                    value={uploadVersion}
                    onChange={(e) => setUploadVersion(e.target.value)}
                    className="w-full px-4 py-3 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors"
                  />
                </div>

                {/* Info Box */}
                <div className="bg-[#ece9fe] border border-[#ddd6fe] rounded-lg p-4">
                  <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#5720B7]">
                    <span className="font-semibold">Note:</span> The uploaded file will be analyzed to extract metadata and automatically populate fields like data type, sensitivity level, and update frequency.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {selectedOption && (
          <div className="px-6 py-4 border-t border-[#F0F1F2] flex items-center justify-end gap-3 shrink-0">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={!isFormValid()}
              className="px-6 py-2.5 bg-[#5720B7] text-white rounded-lg font-['Roboto',sans-serif] font-bold text-sm hover:bg-[#3f1585] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Dataset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}