import { useState } from 'react';
import { PageHeader } from './PageHeader';
import { Search, Filter, ArrowUpDown, Download, Upload, Plus, ChevronRight, Trash2 } from 'lucide-react';
import { ImportModal } from './ImportModal';
import { ExportModal } from './ExportModal';
import { FilterModal, FilterOptions } from './FilterModal';
import { SortModal, SortOptions } from './SortModal';
import { AddAIModelModal, NewAIModelData } from './AddAIModelModal';

interface AIModel {
  id: string;
  modelName: string;
  sourceProvider: string;
  type: 'Foundation Model' | 'Fine-tuned Model' | 'Custom Model' | 'Pre-trained Model' | 'Open Source';
  connectionStatus: 'Connected' | 'Disconnected' | 'Pending' | 'Error';
  dateAdded: string;
}

const mockModels: AIModel[] = [
  {
    id: '1',
    modelName: 'GPT-4 Turbo',
    sourceProvider: 'OpenAI',
    type: 'Foundation Model',
    connectionStatus: 'Connected',
    dateAdded: '2025-01-15',
  },
  {
    id: '2',
    modelName: 'Claude 3.5 Sonnet',
    sourceProvider: 'Anthropic',
    type: 'Foundation Model',
    connectionStatus: 'Connected',
    dateAdded: '2025-01-18',
  },
  {
    id: '3',
    modelName: 'Custom Sentiment Analyzer',
    sourceProvider: 'Internal Team',
    type: 'Custom Model',
    connectionStatus: 'Connected',
    dateAdded: '2025-01-10',
  },
  {
    id: '4',
    modelName: 'BERT Base',
    sourceProvider: 'Hugging Face',
    type: 'Pre-trained Model',
    connectionStatus: 'Pending',
    dateAdded: '2025-01-20',
  },
  {
    id: '5',
    modelName: 'Llama 3.1 70B',
    sourceProvider: 'Meta / Hugging Face',
    type: 'Open Source',
    connectionStatus: 'Connected',
    dateAdded: '2025-01-12',
  },
  {
    id: '6',
    modelName: 'Gemini Pro',
    sourceProvider: 'Google',
    type: 'Foundation Model',
    connectionStatus: 'Disconnected',
    dateAdded: '2025-01-08',
  },
  {
    id: '7',
    modelName: 'Custom Document Classifier',
    sourceProvider: 'Internal Team',
    type: 'Fine-tuned Model',
    connectionStatus: 'Connected',
    dateAdded: '2025-01-22',
  },
  {
    id: '8',
    modelName: 'Mistral 7B',
    sourceProvider: 'Mistral AI',
    type: 'Open Source',
    connectionStatus: 'Error',
    dateAdded: '2025-01-14',
  },
];

function getConnectionStatusColor(status: AIModel['connectionStatus']) {
  const colors = {
    'Connected': 'bg-[#D1FAE5] text-[#065F46]',
    'Disconnected': 'bg-[#F3F4F6] text-[#4B5563]',
    'Pending': 'bg-[#FEF3C7] text-[#92400E]',
    'Error': 'bg-[#FEE2E2] text-[#991B1B]',
  };
  return colors[status];
}

function getTypeColor(type: AIModel['type']) {
  const colors = {
    'Foundation Model': 'bg-[#DBEAFE] text-[#1E40AF]',
    'Fine-tuned Model': 'bg-[#E0E7FF] text-[#3730A3]',
    'Custom Model': 'bg-[#FCE7F3] text-[#831843]',
    'Pre-trained Model': 'bg-[#FEF3C7] text-[#92400E]',
    'Open Source': 'bg-[#D1FAE5] text-[#065F46]',
  };
  return colors[type];
}

export function AIModelPage() {
  const [models, setModels] = useState<AIModel[]>(mockModels);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedModelIds, setSelectedModelIds] = useState<string[]>([]);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(models.length / itemsPerPage);

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [isAddAIModelModalOpen, setIsAddAIModelModalOpen] = useState(false);

  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    riskClassifications: [],
    progressRange: { min: 0, max: 100 },
    hasBlockers: 'all',
  });

  const handleAddNew = () => {
    setIsAddAIModelModalOpen(true);
  };

  const handleViewDatabase = () => {
    alert('Navigating to Model Database page...');
    // In the future, this will navigate to a dedicated model database page
  };

  const handleAddModel = (newModelData: NewAIModelData) => {
    const newModel: AIModel = {
      id: String(models.length + 1),
      modelName: newModelData.modelName,
      sourceProvider: newModelData.sourceProvider,
      type: newModelData.type,
      connectionStatus: newModelData.connectionStatus,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setModels([...models, newModel]);
  };

  const handleImport = (file: File) => {
    alert(`File "${file.name}" imported successfully!`);
  };

  const handleExport = () => {
    const headers = ['Model Name', 'Source / Provider', 'Type', 'Connection Status', 'Date Added'];
    const rows = models.map(m => [m.modelName, m.sourceProvider, m.type, m.connectionStatus, m.dateAdded]);
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai_models_export.csv';
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
    const currentPageModels = models.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    if (e.target.checked) {
      const newSelections = [...selectedModelIds, ...currentPageModels.map(m => m.id).filter(id => !selectedModelIds.includes(id))];
      setSelectedModelIds(newSelections);
    } else {
      const currentPageIds = currentPageModels.map(m => m.id);
      setSelectedModelIds(selectedModelIds.filter(id => !currentPageIds.includes(id)));
    }
  };

  const handleToggleSelect = (e: React.ChangeEvent<HTMLInputElement>, modelId: string) => {
    e.stopPropagation();
    if (e.target.checked) {
      setSelectedModelIds([...selectedModelIds, modelId]);
    } else {
      setSelectedModelIds(selectedModelIds.filter(id => id !== modelId));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedModelIds.length === 0) return;
    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedModelIds.length} selected model${selectedModelIds.length > 1 ? 's' : ''}? This action cannot be undone.`);
    if (confirmDelete) {
      setModels(models.filter(m => !selectedModelIds.includes(m.id)));
      setSelectedModelIds([]);
      alert(`${selectedModelIds.length} model${selectedModelIds.length > 1 ? 's' : ''} deleted successfully!`);
    }
  };

  const isAllCurrentPageSelected = () => {
    const currentPageModels = models.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return currentPageModels.length > 0 && currentPageModels.every(m => selectedModelIds.includes(m.id));
  };

  const isSomeCurrentPageSelected = () => {
    const currentPageModels = models.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return currentPageModels.some(m => selectedModelIds.includes(m.id)) && !isAllCurrentPageSelected();
  };

  const handleRowClick = (modelId: string) => {
    alert(`Model detail view for model ${modelId} would open here`);
  };

  const thClass = "px-6 py-4 text-left font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider";
  const tdTextClass = "font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]";

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FAFBFC]">
      <PageHeader
        breadcrumb="AI Model"
        title="AI Model"
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
        <div className="max-w-[1400px] mx-auto px-8 py-8">
          {/* Alert Banner */}
          <div className="bg-[#ece9fe] border-l-4 border-[#5720B7] rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#5720B7] flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <div>
                <p className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                  {models.filter(m => m.connectionStatus === 'Disconnected' || m.connectionStatus === 'Error' || m.connectionStatus === 'Pending').length} models need attention
                </p>
                <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58] mt-1">
                  Review and fix connection issues for models with "Disconnected", "Error", or "Pending" status
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
                    placeholder="Search AI models..."
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
                    <th className={thClass}>Model Name</th>
                    <th className={thClass}>Source / Provider</th>
                    <th className={thClass}>Type</th>
                    <th className={thClass}>Connection Status</th>
                    <th className={thClass}>Date Added</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F1F2]">
                  {models.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((model) => (
                    <tr
                      key={model.id}
                      onClick={() => handleRowClick(model.id)}
                      className="hover:bg-[#ece9fe] cursor-pointer transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedModelIds.includes(model.id)}
                          onChange={(e) => handleToggleSelect(e, model.id)}
                          className="w-4 h-4 accent-[#5720B7] rounded"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">{model.modelName}</span>
                          <ChevronRight className="w-4 h-4 text-[#B5BCC4] group-hover:text-[#5720B7] transition-colors" />
                        </div>
                      </td>
                      <td className="px-6 py-4"><span className={tdTextClass}>{model.sourceProvider}</span></td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full font-['Roboto',sans-serif] font-medium text-xs ${getTypeColor(model.type)}`}>
                          {model.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full font-['Roboto',sans-serif] font-medium text-xs ${getConnectionStatusColor(model.connectionStatus)}`}>
                          {model.connectionStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={tdTextClass}>
                          {new Date(model.dateAdded).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {models.length === 0 && (
              <div className="py-12 text-center">
                <p className="font-['Roboto',sans-serif] font-medium text-base text-[#565F6C]">No AI models found</p>
                <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#B5BCC4] mt-2">Click "Add New" to get started</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between">
            <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#565F6C]">
              Showing {models.length} AI model{models.length !== 1 ? 's' : ''}
              {selectedModelIds.length > 0 && (
                <span className="ml-2 text-[#5720B7] font-medium">({selectedModelIds.length} selected)</span>
              )}
            </p>
            <div className="flex gap-2 items-center">
              {selectedModelIds.length > 0 && (
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
      <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} onExport={handleExport} systemCount={models.length} />
      <FilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} onApply={handleFilter} currentFilters={currentFilters} />
      <SortModal isOpen={isSortModalOpen} onClose={() => setIsSortModalOpen(false)} onApply={handleSort} />
      <AddAIModelModal 
        isOpen={isAddAIModelModalOpen} 
        onClose={() => setIsAddAIModelModalOpen(false)} 
        onAdd={handleAddModel}
        onViewDatabase={handleViewDatabase}
      />
    </div>
  );
}