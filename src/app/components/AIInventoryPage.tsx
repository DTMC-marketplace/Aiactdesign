import { useState } from 'react';
import { PageHeader } from './PageHeader';
import { Search, Filter, ArrowUpDown, Download, Upload, Plus, ChevronRight, Trash2 } from 'lucide-react';
import { ImportModal } from './ImportModal';
import { ExportModal } from './ExportModal';
import { AddAISystemModal, NewAISystemData } from './AddAISystemModal';
import { FilterModal, FilterOptions } from './FilterModal';
import { SortModal, SortOptions } from './SortModal';
import { AISystemDataCollection } from './AISystemDataCollection';

interface AISystem {
  id: string;
  name: string;
  owner: string;
  status: 'Planned' | 'Testing' | 'In production' | 'Retired';
  role: 'Provider' | 'Deployer' | 'Distributor' | 'Importer';
  riskClassification: 'Prohibited' | 'High-risk' | 'Limited transparency' | 'Minimal' | 'Not assessed' | 'Not in scope';
  complianceStatus: 'Not started' | 'In progress' | 'Compliant' | 'Non-compliant' | 'Not in scope';
  lastUpdated: string;
  providerType: 'In-house' | 'External' | 'Mixed' | 'Unknown';
}

const mockSystems: AISystem[] = [
  {
    id: '1',
    name: 'Customer Service Chatbot',
    owner: 'Product Team',
    status: 'In production',
    role: 'Deployer',
    riskClassification: 'Limited transparency',
    complianceStatus: 'Compliant',
    lastUpdated: '2025-01-15',
    providerType: 'External',
  },
  {
    id: '2',
    name: 'Resume Screening AI',
    owner: 'HR Department',
    status: 'Testing',
    role: 'Provider',
    riskClassification: 'High-risk',
    complianceStatus: 'In progress',
    lastUpdated: '2025-01-18',
    providerType: 'In-house',
  },
  {
    id: '3',
    name: 'Predictive Maintenance System',
    owner: 'Operations Team',
    status: 'In production',
    role: 'Deployer',
    riskClassification: 'Minimal',
    complianceStatus: 'Compliant',
    lastUpdated: '2025-01-10',
    providerType: 'Mixed',
  },
  {
    id: '4',
    name: 'Credit Scoring Model',
    owner: 'Risk Analytics',
    status: 'Planned',
    role: 'Provider',
    riskClassification: 'Not assessed',
    complianceStatus: 'Not started',
    lastUpdated: '2025-01-05',
    providerType: 'In-house',
  },
];

function getStatusColor(status: AISystem['status']) {
  const colors = {
    'Planned': 'bg-[#E5E7EB] text-[#6B7280]',
    'Testing': 'bg-[#FEF3C7] text-[#92400E]',
    'In production': 'bg-[#D1FAE5] text-[#065F46]',
    'Retired': 'bg-[#F3F4F6] text-[#4B5563]',
  };
  return colors[status];
}

function getRiskColor(risk: AISystem['riskClassification']) {
  const colors = {
    'Prohibited': 'bg-[#FEE2E2] text-[#991B1B]',
    'High-risk': 'bg-[#FED7AA] text-[#9A3412]',
    'Limited transparency': 'bg-[#FEF3C7] text-[#92400E]',
    'Minimal': 'bg-[#D1FAE5] text-[#065F46]',
    'Not assessed': 'bg-[#E5E7EB] text-[#6B7280]',
    'Not in scope': 'bg-[#F3F4F6] text-[#4B5563]',
  };
  return colors[risk];
}

function getComplianceColor(compliance: AISystem['complianceStatus']) {
  const colors = {
    'Not started': 'bg-[#E5E7EB] text-[#6B7280]',
    'In progress': 'bg-[#DBEAFE] text-[#1E40AF]',
    'Compliant': 'bg-[#D1FAE5] text-[#065F46]',
    'Non-compliant': 'bg-[#FEE2E2] text-[#991B1B]',
    'Not in scope': 'bg-[#F3F4F6] text-[#4B5563]',
  };
  return colors[compliance];
}

export function AIInventoryPage() {
  const [systems, setSystems] = useState<AISystem[]>(mockSystems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSystemIds, setSelectedSystemIds] = useState<string[]>([]);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(systems.length / itemsPerPage);

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  const handleRowClick = (systemId: string) => {
    setSelectedSystem(systemId);
  };

  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  const handleAddSystem = (newSystem: NewAISystemData) => {
    const system: AISystem = {
      id: String(systems.length + 1),
      name: newSystem.name,
      owner: newSystem.owner || 'Unassigned',
      status: newSystem.status,
      role: newSystem.role,
      riskClassification: 'Not assessed',
      complianceStatus: 'Not started',
      lastUpdated: new Date().toISOString().split('T')[0],
      providerType: newSystem.providerType,
    };
    setSystems([...systems, system]);
  };

  const handleImport = (file: File) => {
    alert(`File "${file.name}" imported successfully!`);
  };

  const handleExport = () => {
    const headers = ['AI System Name', 'Owner', 'Status', 'Role', 'Risk Classification', 'Compliance Status', 'Last Updated', 'Provider Type'];
    const rows = systems.map(s => [s.name, s.owner, s.status, s.role, s.riskClassification, s.complianceStatus, s.lastUpdated, s.providerType]);
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai_systems_export.csv';
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

  const handleBackToList = () => setSelectedSystem(null);

  const handleSaveSystem = (data: any) => {
    console.log('Saving system data:', data);
    alert('System data saved!');
  };

  const handleToggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPageSystems = systems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    if (e.target.checked) {
      const newSelections = [...selectedSystemIds, ...currentPageSystems.map(s => s.id).filter(id => !selectedSystemIds.includes(id))];
      setSelectedSystemIds(newSelections);
    } else {
      const currentPageIds = currentPageSystems.map(s => s.id);
      setSelectedSystemIds(selectedSystemIds.filter(id => !currentPageIds.includes(id)));
    }
  };

  const handleToggleSelect = (e: React.ChangeEvent<HTMLInputElement>, systemId: string) => {
    e.stopPropagation();
    if (e.target.checked) {
      setSelectedSystemIds([...selectedSystemIds, systemId]);
    } else {
      setSelectedSystemIds(selectedSystemIds.filter(id => id !== systemId));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedSystemIds.length === 0) return;
    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedSystemIds.length} selected system${selectedSystemIds.length > 1 ? 's' : ''}? This action cannot be undone.`);
    if (confirmDelete) {
      setSystems(systems.filter(s => !selectedSystemIds.includes(s.id)));
      setSelectedSystemIds([]);
      alert(`${selectedSystemIds.length} system${selectedSystemIds.length > 1 ? 's' : ''} deleted successfully!`);
    }
  };

  const isAllCurrentPageSelected = () => {
    const currentPageSystems = systems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return currentPageSystems.length > 0 && currentPageSystems.every(s => selectedSystemIds.includes(s.id));
  };

  const isSomeCurrentPageSelected = () => {
    const currentPageSystems = systems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return currentPageSystems.some(s => selectedSystemIds.includes(s.id)) && !isAllCurrentPageSelected();
  };

  if (selectedSystem) {
    const system = systems.find(s => s.id === selectedSystem);
    if (system) {
      return (
        <AISystemDataCollection
          systemId={system.id}
          systemName={system.name}
          onBack={handleBackToList}
          onSave={handleSaveSystem}
        />
      );
    }
  }

  const thClass = "px-6 py-4 text-left font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider";
  const tdTextClass = "font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]";

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FAFBFC]">
      <PageHeader
        breadcrumb="AI Inventory"
        title="AI Inventory"
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
                  {systems.filter(s => s.complianceStatus === 'Not started' || s.complianceStatus === 'In progress').length} systems need attention
                </p>
                <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58] mt-1">
                  Complete the compliance assessment for systems with "Not started" or "In progress" status
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
                    placeholder="Search AI systems..."
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
                    <th className={thClass}>AI System Name</th>
                    <th className={thClass}>Owner</th>
                    <th className={thClass}>Status</th>
                    <th className={thClass}>Role</th>
                    <th className={thClass}>Risk Classification</th>
                    <th className={thClass}>Compliance Status</th>
                    <th className={thClass}>Last Updated</th>
                    <th className={thClass}>Provider Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F1F2]">
                  {systems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((system) => (
                    <tr
                      key={system.id}
                      onClick={() => handleRowClick(system.id)}
                      className="hover:bg-[#ece9fe] cursor-pointer transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedSystemIds.includes(system.id)}
                          onChange={(e) => handleToggleSelect(e, system.id)}
                          className="w-4 h-4 accent-[#5720B7] rounded"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">{system.name}</span>
                          <ChevronRight className="w-4 h-4 text-[#B5BCC4] group-hover:text-[#5720B7] transition-colors" />
                        </div>
                      </td>
                      <td className="px-6 py-4"><span className={tdTextClass}>{system.owner}</span></td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full font-['Roboto',sans-serif] font-medium text-xs ${getStatusColor(system.status)}`}>
                          {system.status}
                        </span>
                      </td>
                      <td className="px-6 py-4"><span className={tdTextClass}>{system.role}</span></td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full font-['Roboto',sans-serif] font-medium text-xs ${getRiskColor(system.riskClassification)}`}>
                          {system.riskClassification}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full font-['Roboto',sans-serif] font-medium text-xs ${getComplianceColor(system.complianceStatus)}`}>
                          {system.complianceStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={tdTextClass}>
                          {new Date(system.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      </td>
                      <td className="px-6 py-4"><span className={tdTextClass}>{system.providerType}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {systems.length === 0 && (
              <div className="py-12 text-center">
                <p className="font-['Roboto',sans-serif] font-medium text-base text-[#565F6C]">No AI systems found</p>
                <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#B5BCC4] mt-2">Click "Add New" to get started</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between">
            <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#565F6C]">
              Showing {systems.length} AI system{systems.length !== 1 ? 's' : ''}
              {selectedSystemIds.length > 0 && (
                <span className="ml-2 text-[#5720B7] font-medium">({selectedSystemIds.length} selected)</span>
              )}
            </p>
            <div className="flex gap-2 items-center">
              {selectedSystemIds.length > 0 && (
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
      <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} onExport={handleExport} systemCount={systems.length} />
      <AddAISystemModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddSystem} />
      <FilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} onApply={handleFilter} />
      <SortModal isOpen={isSortModalOpen} onClose={() => setIsSortModalOpen(false)} onApply={handleSort} />
    </div>
  );
}
