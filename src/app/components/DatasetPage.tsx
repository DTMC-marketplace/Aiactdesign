import { useState } from 'react';
import { PageHeader } from './PageHeader';
import { Search, Filter, ArrowUpDown, Download, Upload, Plus, ChevronRight, Trash2, Link, X, ChevronDown, AlertTriangle, Edit2, Check } from 'lucide-react';
import { ImportModal } from './ImportModal';
import { ExportModal } from './ExportModal';
import { FilterModal, FilterOptions } from './FilterModal';
import { SortModal, SortOptions } from './SortModal';
import { AddDatasetModal, NewDatasetData } from './AddDatasetModal';
import { DatasetDrawer } from './DatasetDrawer';

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
  // Extended fields for drawer
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

const mockDatasets: Dataset[] = [
  {
    id: '1',
    datasetName: 'Customer Support Conversations',
    dataType: 'Text',
    storageLocation: 'AWS S3 - us-east-1',
    sensitivity: 'Confidential',
    usageStatus: 'Active',
    updateFrequency: 'Daily',
    lastUpdate: '2025-03-14',
    ownerTeam: 'Product Team',
    linkedModelsCount: 3,
    source: 'Internal',
    description: 'Conversations from customer support interactions, used for training and improving customer service models.',
    dataOwner: 'Jane Doe',
    sourceOrigin: 'Internal (Proprietary)',
    storageLocationType: 'Domestic Server',
    storageLocationDetails: 'Server 1, Data Center A',
    personalDataPII: true,
    sensitiveCategories: true,
    dataRightsLicense: 'Internal Use Only',
    intendedUse: ['Training', 'Testing/Validation'],
    linkedModelIds: ['model1', 'model2', 'model3'],
    schemaStructure: 'JSON',
  },
  {
    id: '2',
    datasetName: 'Resume Database',
    dataType: 'Text',
    storageLocation: 'Azure Blob Storage',
    sensitivity: 'Restricted',
    usageStatus: 'Active',
    updateFrequency: 'Weekly',
    lastUpdate: '2025-03-10',
    ownerTeam: 'HR Department',
    linkedModelsCount: 2,
    source: 'Internal',
    description: 'Resumes of job applicants, used for candidate screening and recruitment models.',
    dataOwner: 'John Smith',
    sourceOrigin: 'Internal (Proprietary)',
    storageLocationType: 'Domestic Server',
    storageLocationDetails: 'Server 2, Data Center A',
    personalDataPII: true,
    sensitiveCategories: true,
    dataRightsLicense: 'Internal Use Only',
    intendedUse: ['Training', 'Testing/Validation'],
    linkedModelIds: ['model4', 'model5'],
    schemaStructure: 'JSON',
  },
  {
    id: '3',
    datasetName: 'Equipment Sensor Logs',
    dataType: 'Time Series',
    storageLocation: 'On-Premise Server',
    sensitivity: 'Internal',
    usageStatus: 'Active',
    updateFrequency: 'Real-time',
    lastUpdate: '2025-03-15',
    ownerTeam: 'Operations Team',
    linkedModelsCount: 1,
    source: 'Internal',
    description: 'Sensor data from equipment, used for predictive maintenance and monitoring models.',
    dataOwner: 'Alice Johnson',
    sourceOrigin: 'Internal (Proprietary)',
    storageLocationType: 'On-Premise',
    storageLocationDetails: 'Server 3, Data Center B',
    personalDataPII: false,
    sensitiveCategories: false,
    dataRightsLicense: 'Internal Use Only',
    intendedUse: ['Training', 'Testing/Validation'],
    linkedModelIds: ['model6'],
    schemaStructure: 'CSV',
  },
  {
    id: '4',
    datasetName: 'Credit Score Historical Data',
    dataType: 'Tabular',
    storageLocation: 'Google Cloud Storage',
    sensitivity: 'Restricted',
    usageStatus: 'In Development',
    updateFrequency: 'Monthly',
    lastUpdate: '2025-03-01',
    ownerTeam: 'Risk Analytics',
    linkedModelsCount: 0,
    source: 'Third-Party',
    description: 'Historical credit scores, used for risk assessment and credit scoring models.',
    dataOwner: 'Bob Brown',
    sourceOrigin: 'Third-Party (Purchased)',
    storageLocationType: 'EU-based Cloud',
    storageLocationDetails: 'Bucket 1, Google Cloud',
    personalDataPII: true,
    sensitiveCategories: true,
    dataRightsLicense: 'Third-Party License',
    intendedUse: ['Training', 'Testing/Validation'],
    linkedModelIds: [],
    schemaStructure: 'CSV',
  },
  {
    id: '5',
    datasetName: 'Product Image Catalog',
    dataType: 'Image',
    storageLocation: 'Cloudinary CDN',
    sensitivity: 'Public',
    usageStatus: 'Active',
    updateFrequency: 'Weekly',
    lastUpdate: '2025-03-12',
    ownerTeam: 'Marketing Team',
    linkedModelsCount: 2,
    source: 'Internal',
    description: 'Images of products, used for visual recognition and product catalog models.',
    dataOwner: 'Charlie White',
    sourceOrigin: 'Internal (Proprietary)',
    storageLocationType: 'Domestic Server',
    storageLocationDetails: 'Server 4, Data Center A',
    personalDataPII: false,
    sensitiveCategories: false,
    dataRightsLicense: 'Internal Use Only',
    intendedUse: ['Training', 'Testing/Validation'],
    linkedModelIds: ['model7', 'model8'],
    schemaStructure: 'JSON',
  },
  {
    id: '6',
    datasetName: 'Synthetic Training Dataset',
    dataType: 'Multimodal',
    storageLocation: 'AWS S3 - eu-west-1',
    sensitivity: 'Internal',
    usageStatus: 'Active',
    updateFrequency: 'Static',
    lastUpdate: '2025-02-20',
    ownerTeam: 'ML Research',
    linkedModelsCount: 5,
    source: 'Synthetic',
    description: 'Synthetic data generated for training machine learning models.',
    dataOwner: 'David Green',
    sourceOrigin: 'Synthetic (AI-generated)',
    storageLocationType: 'EU-based Cloud',
    storageLocationDetails: 'Bucket 2, AWS S3',
    personalDataPII: false,
    sensitiveCategories: false,
    dataRightsLicense: 'Internal Use Only',
    intendedUse: ['Training', 'Testing/Validation'],
    linkedModelIds: ['model9', 'model10', 'model11', 'model12', 'model13'],
    schemaStructure: 'JSON',
  },
  {
    id: '7',
    datasetName: 'Public Market Data',
    dataType: 'Time Series',
    storageLocation: 'External API',
    sensitivity: 'Public',
    usageStatus: 'Active',
    updateFrequency: 'Real-time',
    lastUpdate: '2025-03-15',
    ownerTeam: 'Finance Team',
    linkedModelsCount: 1,
    source: 'Public',
    description: 'Market data from external sources, used for financial analysis and forecasting models.',
    dataOwner: 'Eve Black',
    sourceOrigin: 'Open Source (Public)',
    storageLocationType: 'Non-EU Cloud (US/Other)',
    storageLocationDetails: 'API Endpoint 1, External Provider',
    personalDataPII: false,
    sensitiveCategories: false,
    dataRightsLicense: 'Public Domain',
    intendedUse: ['Training', 'Testing/Validation'],
    linkedModelIds: ['model14'],
    schemaStructure: 'CSV',
  },
  {
    id: '8',
    datasetName: 'Legacy Customer Database',
    dataType: 'Tabular',
    storageLocation: 'On-Premise Server',
    sensitivity: 'Confidential',
    usageStatus: 'Archived',
    updateFrequency: 'Static',
    lastUpdate: '2024-12-31',
    ownerTeam: 'Data Team',
    linkedModelsCount: 0,
    source: 'Internal',
    description: 'Legacy customer data, archived for historical reference.',
    dataOwner: 'Frank Gray',
    sourceOrigin: 'Internal (Proprietary)',
    storageLocationType: 'On-Premise',
    storageLocationDetails: 'Server 5, Data Center B',
    personalDataPII: true,
    sensitiveCategories: true,
    dataRightsLicense: 'Internal Use Only',
    intendedUse: ['Training', 'Testing/Validation'],
    linkedModelIds: [],
    schemaStructure: 'CSV',
  },
];

function getSensitivityColor(sensitivity: Dataset['sensitivity']) {
  const colors = {
    'Public': 'bg-[#D1FAE5] text-[#065F46]',
    'Internal': 'bg-[#FEF3C7] text-[#92400E]',
    'Confidential': 'bg-[#FED7AA] text-[#9A3412]',
    'Restricted': 'bg-[#FEE2E2] text-[#991B1B]',
  };
  return colors[sensitivity];
}

function getUsageStatusColor(status: Dataset['usageStatus']) {
  const colors = {
    'Active': 'bg-[#D1FAE5] text-[#065F46]',
    'Archived': 'bg-[#F3F4F6] text-[#4B5563]',
    'In Development': 'bg-[#DBEAFE] text-[#1E40AF]',
    'Deprecated': 'bg-[#FEE2E2] text-[#991B1B]',
  };
  return colors[status];
}

function getSourceColor(source: Dataset['source']) {
  const colors = {
    'Internal': 'bg-[#DBEAFE] text-[#1E40AF]',
    'Third-Party': 'bg-[#E0E7FF] text-[#3730A3]',
    'Synthetic': 'bg-[#FCE7F3] text-[#831843]',
    'Public': 'bg-[#D1FAE5] text-[#065F46]',
  };
  return colors[source];
}

export function DatasetPage() {
  const [datasets, setDatasets] = useState<Dataset[]>(mockDatasets);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDatasetIds, setSelectedDatasetIds] = useState<string[]>([]);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(datasets.length / itemsPerPage);

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [isAddDatasetModalOpen, setIsAddDatasetModalOpen] = useState(false);
  
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);

  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    riskClassifications: [],
    progressRange: { min: 0, max: 100 },
    hasBlockers: 'all',
  });

  const handleAddNew = () => {
    setIsAddDatasetModalOpen(true);
  };

  const handleAddDataset = (newDatasetData: NewDatasetData) => {
    const newDataset: Dataset = {
      id: String(datasets.length + 1),
      datasetName: newDatasetData.datasetName,
      dataType: newDatasetData.dataType,
      storageLocation: newDatasetData.storageLocation,
      sensitivity: newDatasetData.sensitivity,
      usageStatus: newDatasetData.usageStatus,
      updateFrequency: newDatasetData.updateFrequency,
      lastUpdate: new Date().toISOString().split('T')[0],
      ownerTeam: newDatasetData.ownerTeam,
      linkedModelsCount: 0,
      source: newDatasetData.source,
      // Extended fields for drawer
      description: '',
      dataOwner: '',
      sourceOrigin: 'Internal (Proprietary)',
      storageLocationType: 'Domestic Server',
      storageLocationDetails: '',
      personalDataPII: false,
      sensitiveCategories: false,
      dataRightsLicense: '',
      intendedUse: [],
      linkedModelIds: [],
      schemaStructure: '',
    };
    setDatasets([...datasets, newDataset]);
  };

  const handleImport = (file: File) => {
    alert(`File "${file.name}" imported successfully!`);
  };

  const handleExport = () => {
    const headers = ['Dataset Name', 'Data Type', 'Storage Location', 'Sensitivity', 'Usage Status', 'Update Frequency', 'Last Update', 'Owner/Team', 'Linked Models', 'Source'];
    const rows = datasets.map(d => [d.datasetName, d.dataType, d.storageLocation, d.sensitivity, d.usageStatus, d.updateFrequency, d.lastUpdate, d.ownerTeam, d.linkedModelsCount, d.source]);
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'datasets_export.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleFilter = (filters: FilterOptions) => {
    console.log('Applying filters:', filters);
    alert('Filters applied! (Demo)');
  };

  const handleSort = (sortOptions: SortOptions) => {
    alert(`Sorted by ${sortOptions.field} (${sortOptions.direction})`);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const handleToggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPageDatasets = datasets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    if (e.target.checked) {
      const newSelections = [...selectedDatasetIds, ...currentPageDatasets.map(d => d.id).filter(id => !selectedDatasetIds.includes(id))];
      setSelectedDatasetIds(newSelections);
    } else {
      const currentPageIds = currentPageDatasets.map(d => d.id);
      setSelectedDatasetIds(selectedDatasetIds.filter(id => !currentPageIds.includes(id)));
    }
  };

  const handleToggleSelect = (e: React.ChangeEvent<HTMLInputElement>, datasetId: string) => {
    e.stopPropagation();
    if (e.target.checked) {
      setSelectedDatasetIds([...selectedDatasetIds, datasetId]);
    } else {
      setSelectedDatasetIds(selectedDatasetIds.filter(id => id !== datasetId));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedDatasetIds.length === 0) return;
    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedDatasetIds.length} selected dataset${selectedDatasetIds.length > 1 ? 's' : ''}? This action cannot be undone.`);
    if (confirmDelete) {
      setDatasets(datasets.filter(d => !selectedDatasetIds.includes(d.id)));
      setSelectedDatasetIds([]);
      alert(`${selectedDatasetIds.length} dataset${selectedDatasetIds.length > 1 ? 's' : ''} deleted successfully!`);
    }
  };

  const isAllCurrentPageSelected = () => {
    const currentPageDatasets = datasets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return currentPageDatasets.length > 0 && currentPageDatasets.every(d => selectedDatasetIds.includes(d.id));
  };

  const isSomeCurrentPageSelected = () => {
    const currentPageDatasets = datasets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return currentPageDatasets.some(d => selectedDatasetIds.includes(d.id)) && !isAllCurrentPageSelected();
  };

  const handleRowClick = (datasetId: string) => {
    const dataset = datasets.find(d => d.id === datasetId);
    if (dataset) {
      setSelectedDataset(dataset);
    }
  };

  const handleUpdateDataset = (updatedDataset: Dataset) => {
    setDatasets(datasets.map(d => d.id === updatedDataset.id ? updatedDataset : d));
    setSelectedDataset(updatedDataset);
  };

  const thClass = "px-6 py-4 text-left font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider";
  const tdTextClass = "font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]";

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FAFBFC]">
      <PageHeader
        breadcrumb="Dataset"
        title="Dataset"
        actions={
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="px-4 py-2 bg-[#ece9fe] border border-[#ddd6fe] text-[#5720B7] rounded-full font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#ddd6fe] transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Import
            </button>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="px-4 py-2 bg-[#ece9fe] border border-[#ddd6fe] text-[#5720B7] rounded-full font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#ddd6fe] transition-colors flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Export
            </button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto px-8 py-8">
          {/* Alert Banner */}
          <div className="bg-[#ece9fe] border-l-4 border-[#5720B7] rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#5720B7] flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <div>
                <p className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                  {datasets.filter(d => d.sensitivity === 'Restricted' || d.sensitivity === 'Confidential').length} datasets contain sensitive data
                </p>
                <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58] mt-1">
                  Ensure proper access controls and compliance measures are in place for restricted and confidential datasets
                </p>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handleAddNew}
                className="px-6 py-2.5 bg-[#ece9fe] text-[#5720B7] rounded-lg font-['Roboto',sans-serif] font-bold text-sm hover:bg-[#ddd6fe] transition-all flex items-center gap-2 border border-[#ddd6fe]"
              >
                <Plus className="w-5 h-5" />
                Add New
              </button>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B5BCC4]" />
                  <input
                    type="text"
                    placeholder="Search datasets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors"
                  />
                </div>
                <button
                  onClick={() => setIsFilterModalOpen(true)}
                  className="px-4 py-2 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button
                  onClick={() => setIsSortModalOpen(true)}
                  className="px-4 py-2 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors flex items-center gap-2"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  Sort
                </button>
              </div>
            </div>
          </div>

          {/* Click Reminder */}
          <div className="bg-[#ece9fe] border border-[#ddd6fe] rounded-lg p-3 mb-4 flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-[#5720B7]" />
            <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#5720B7]">
              <span className="font-semibold">Tip:</span> Click on any row to view details and update information
            </p>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F9FAFB] border-b border-[#F0F1F2]">
                  <tr>
                    <th className="px-6 py-4 w-12">
                      <input
                        type="checkbox"
                        checked={isAllCurrentPageSelected()}
                        ref={(el) => { if (el) el.indeterminate = isSomeCurrentPageSelected(); }}
                        onChange={handleToggleSelectAll}
                        className="w-4 h-4 accent-[#5720B7] rounded"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </th>
                    <th className={thClass}>Dataset Name</th>
                    <th className={thClass}>Data Type</th>
                    <th className={thClass}>Storage Location</th>
                    <th className={thClass}>Sensitivity</th>
                    <th className={thClass}>Usage Status</th>
                    <th className={thClass}>Update Frequency</th>
                    <th className={thClass}>Last Update</th>
                    <th className={thClass}>Owner/Team</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F1F2]">
                  {datasets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).flatMap((dataset) => {
                    const rows = [
                      <tr
                        key={dataset.id}
                        onClick={() => handleRowClick(dataset.id)}
                        className={`hover:bg-[#ece9fe] cursor-pointer transition-colors group ${
                          selectedDataset && selectedDataset.id !== dataset.id ? 'opacity-40' : ''
                        }`}
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedDatasetIds.includes(dataset.id)}
                            onChange={(e) => handleToggleSelect(e, dataset.id)}
                            className="w-4 h-4 accent-[#5720B7] rounded"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                                  {dataset.datasetName}
                                </span>
                                <ChevronRight className="w-4 h-4 text-[#B5BCC4] group-hover:text-[#5720B7] transition-colors" />
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-['Roboto',sans-serif] font-medium ${getSourceColor(dataset.source)}`}>
                                  {dataset.source}
                                </span>
                                {dataset.linkedModelsCount > 0 && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#ece9fe] text-[#5720B7] rounded text-xs font-['Roboto',sans-serif] font-medium">
                                    <Link className="w-3 h-3" />
                                    {dataset.linkedModelsCount} model{dataset.linkedModelsCount !== 1 ? 's' : ''}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4"><span className={tdTextClass}>{dataset.dataType}</span></td>
                        <td className="px-6 py-4"><span className={tdTextClass}>{dataset.storageLocation}</span></td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-full font-['Roboto',sans-serif] font-medium text-xs ${getSensitivityColor(dataset.sensitivity)}`}>
                            {dataset.sensitivity}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-full font-['Roboto',sans-serif] font-medium text-xs ${getUsageStatusColor(dataset.usageStatus)}`}>
                            {dataset.usageStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4"><span className={tdTextClass}>{dataset.updateFrequency}</span></td>
                        <td className="px-6 py-4">
                          <span className={tdTextClass}>
                            {new Date(dataset.lastUpdate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                        </td>
                        <td className="px-6 py-4"><span className={tdTextClass}>{dataset.ownerTeam}</span></td>
                      </tr>
                    ];

                    if (selectedDataset && selectedDataset.id === dataset.id) {
                      rows.push(
                        <tr key={`drawer-${dataset.id}`}>
                          <td colSpan={9} className="p-0">
                            <DatasetDrawer
                              dataset={selectedDataset}
                              onClose={() => setSelectedDataset(null)}
                              onUpdate={handleUpdateDataset}
                            />
                          </td>
                        </tr>
                      );
                    }

                    return rows;
                  })}
                </tbody>
              </table>
            </div>

            {datasets.length === 0 && (
              <div className="py-12 text-center">
                <p className="font-['Roboto',sans-serif] font-medium text-base text-[#565F6C]">No datasets found</p>
                <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#B5BCC4] mt-2">Click "Add New" to get started</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between">
            <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#565F6C]">
              Showing {datasets.length} dataset{datasets.length !== 1 ? 's' : ''}
              {selectedDatasetIds.length > 0 && (
                <span className="ml-2 text-[#5720B7] font-medium">({selectedDatasetIds.length} selected)</span>
              )}
            </p>
            <div className="flex gap-2 items-center">
              {selectedDatasetIds.length > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  className="px-4 py-2 bg-white border border-[#5720B7] text-[#5720B7] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#ece9fe] transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete selected
                </button>
              )}
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-500 rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <div className="flex items-center gap-2">
                {renderPageNumbers().map((page, index) => (
                  typeof page === 'number' ? (
                    <button
                      key={`page-${page}`}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-['Roboto',sans-serif] font-semibold text-sm transition-colors ${
                        currentPage === page
                          ? 'bg-[#ece9fe] text-[#5720B7] border border-[#ece9fe]'
                          : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ) : (
                    <span key={`ellipsis-${index}`} className="px-2 text-gray-400 font-['Roboto',sans-serif] font-semibold text-sm">
                      {page}
                    </span>
                  )
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-500 rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <ImportModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} onImport={handleImport} />
      <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} onExport={handleExport} systemCount={datasets.length} />
      <FilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} onApply={handleFilter} currentFilters={currentFilters} />
      <SortModal isOpen={isSortModalOpen} onClose={() => setIsSortModalOpen(false)} onApply={handleSort} />
      <AddDatasetModal 
        isOpen={isAddDatasetModalOpen} 
        onClose={() => setIsAddDatasetModalOpen(false)} 
        onAdd={handleAddDataset}
      />
    </div>
  );
}