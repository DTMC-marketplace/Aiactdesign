import { useState } from 'react';
import { PageHeader } from './PageHeader';
import { Search, Filter, ArrowUpDown, Plus, Trash2, Archive } from 'lucide-react';
import { NewComplianceProjectModal } from './NewComplianceProjectModal';
import { FilterModal, FilterOptions } from './FilterModal';
import { SortModal, SortOptions } from './SortModal';
import { ComplianceWorkspace } from './ComplianceWorkspace';

interface ComplianceProject {
  id: string;
  projectName: string;
  sourceSystem: string;
  sourceSystemId: string; // Link to AI Inventory
  riskClassification: 'Prohibited' | 'High-Risk' | 'Limited transparency' | 'Minimal';
  progressPercentage: number;
  criticalBlockers: number;
  moderateBlockers: number;
  lastUpdated: string;
  role: string;
}

// Mock data
const mockProjects: ComplianceProject[] = [
  {
    id: '1',
    projectName: 'Credit_Scorer_v2.0',
    sourceSystem: 'Credit Scoring AI',
    sourceSystemId: '4',
    riskClassification: 'High-Risk',
    progressPercentage: 65,
    criticalBlockers: 2,
    moderateBlockers: 1,
    lastUpdated: '2025-01-25',
    role: 'Provider, Deployer, Product manufacturer, Distributor, Importer',
  },
  {
    id: '2',
    projectName: 'Resume_Screener_Compliance',
    sourceSystem: 'Resume Screening AI',
    sourceSystemId: '2',
    riskClassification: 'High-Risk',
    progressPercentage: 45,
    criticalBlockers: 3,
    moderateBlockers: 2,
    lastUpdated: '2025-01-26',
    role: 'Deployer',
  },
  {
    id: '3',
    projectName: 'ChatBot_Transparency_Check',
    sourceSystem: 'Customer Service Chatbot',
    sourceSystemId: '1',
    riskClassification: 'Limited transparency',
    progressPercentage: 90,
    criticalBlockers: 0,
    moderateBlockers: 1,
    lastUpdated: '2025-01-27',
    role: 'Deployer',
  },
  {
    id: '4',
    projectName: 'Predictive_Maintenance_Review',
    sourceSystem: 'Predictive Maintenance System',
    sourceSystemId: '3',
    riskClassification: 'Minimal',
    progressPercentage: 100,
    criticalBlockers: 0,
    moderateBlockers: 0,
    lastUpdated: '2025-01-20',
    role: 'Provider',
  },
];

function getRiskColor(risk: ComplianceProject['riskClassification']) {
  const colors = {
    'Prohibited': 'bg-[#FEE2E2] text-[#991B1B]',
    'High-Risk': 'bg-[#FED7AA] text-[#9A3412]',
    'Limited transparency': 'bg-[#FEF3C7] text-[#92400E]',
    'Minimal': 'bg-[#D1FAE5] text-[#065F46]',
  };
  return colors[risk];
}

export function CompliancePage() {
  const [projects] = useState<ComplianceProject[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    riskClassifications: [],
    progressRange: { min: 0, max: 100 },
    hasBlockers: 'all',
  });
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: 'lastUpdated',
    direction: 'desc',
  });
  const [selectedWorkspaceProject, setSelectedWorkspaceProject] = useState<string | null>(null);

  // Mock AI Systems data (would normally come from AI Inventory)
  const availableAISystems = [
    { id: '1', name: 'Customer Service Chatbot', riskClassification: 'Limited transparency', status: 'In production' },
    { id: '2', name: 'Resume Screening AI', riskClassification: 'High-risk', status: 'Testing' },
    { id: '3', name: 'Predictive Maintenance System', riskClassification: 'Minimal', status: 'In production' },
    { id: '4', name: 'Credit Scoring Model', riskClassification: 'Not assessed', status: 'Planned' },
    { id: '5', name: 'Fraud Detection System', riskClassification: 'High-risk', status: 'In production' },
    { id: '6', name: 'Inventory Forecasting AI', riskClassification: 'Minimal', status: 'Testing' },
  ];

  const handleGoToWorkspace = (projectId: string) => {
    setSelectedWorkspaceProject(projectId);
  };

  const handleViewInventorySystem = (systemId: string) => {
    console.log('Navigate to AI Inventory system:', systemId);
    alert(`Navigate to AI Inventory to view system ${systemId}`);
  };

  const handleCreateProject = (selectedSystemIds: string[], projectName: string) => {
    console.log('Creating compliance project for systems:', selectedSystemIds);
    console.log('Project name:', projectName);
    alert(`Compliance project created for ${selectedSystemIds.length} AI system${selectedSystemIds.length !== 1 ? 's' : ''}!`);
    setIsNewProjectModalOpen(false);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = projects.map(p => p.id);
      setSelectedProjects(allIds);
    } else {
      setSelectedProjects([]);
    }
  };

  const handleSelectProject = (projectId: string) => {
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter(id => id !== projectId));
    } else {
      setSelectedProjects([...selectedProjects, projectId]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedProjects.length === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedProjects.length} project${selectedProjects.length !== 1 ? 's' : ''}?`)) {
      console.log('Deleting projects:', selectedProjects);
      alert(`${selectedProjects.length} project${selectedProjects.length !== 1 ? 's' : ''} deleted!`);
      setSelectedProjects([]);
    }
  };

  const handleArchiveSelected = () => {
    if (selectedProjects.length === 0) return;
    if (confirm(`Are you sure you want to archive ${selectedProjects.length} project${selectedProjects.length !== 1 ? 's' : ''}?`)) {
      console.log('Archiving projects:', selectedProjects);
      alert(`${selectedProjects.length} project${selectedProjects.length !== 1 ? 's' : ''} archived!`);
      setSelectedProjects([]);
    }
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(projects.length / itemsPerPage);
    const pages: (number | string)[] = [];
    const maxVisible = 6;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
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

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const activeProjects = projects.filter(p => p.progressPercentage < 100);
  const nonCompliantProjects = projects.filter(p => p.criticalBlockers > 0 || p.moderateBlockers > 0);

  // If a workspace is selected, show the workspace view
  if (selectedWorkspaceProject) {
    const project = projects.find(p => p.id === selectedWorkspaceProject);
    if (project) {
      return (
        <ComplianceWorkspace
          projectId={project.id}
          projectName={project.projectName}
          aiSystemName={project.sourceSystem}
          regulatoryProfile={['High-Risk (Annex III)', 'Biometrics']}
          complianceScore={project.progressPercentage}
          role={project.role}
          onBack={() => setSelectedWorkspaceProject(null)}
        />
      );
    }
  }

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FAFBFC]">
      <PageHeader
        breadcrumb="Compliance"
        title="Active Projects"
        subtitle="Monitor and manage compliance assessments for your AI systems"
        actions={
          <button 
            className="px-6 py-2.5 bg-[#ece9fe] text-[#5720B7] rounded-lg font-['Montserrat',sans-serif] font-bold text-sm hover:bg-[#ddd6fe] transition-colors flex items-center gap-2 shadow-md"
            onClick={() => setIsNewProjectModalOpen(true)}
          >
            <Plus className="w-5 h-5" />
            New Compliance Project
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto px-8 py-8">
          {/* Alert Banner */}
          {nonCompliantProjects.length > 0 && (
            <div className="bg-[#ece9fe] border-l-4 border-[#5720B7] rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#5720B7] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <div>
                  <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                    {nonCompliantProjects.length} project{nonCompliantProjects.length !== 1 ? 's' : ''} {nonCompliantProjects.length !== 1 ? 'are' : 'is'} not compliant
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Stats */}
              <div className="flex items-center gap-6">
                <div>
                  <p className="font-['Montserrat',sans-serif] font-semibold text-lg text-[#22262A]">
                    {projects.length}
                  </p>
                  <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">
                    Total Projects
                  </p>
                </div>
                <div className="h-10 w-px bg-[#F0F1F2]" />
                <div>
                  <p className="font-['Montserrat',sans-serif] font-semibold text-lg text-[#F13D30]">
                    {activeProjects.length}
                  </p>
                  <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">
                    Active
                  </p>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B5BCC4]" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 border border-[#E5E7EB] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-1 focus:ring-[#F13D30]"
                  />
                </div>

                {/* Filter Button */}
                <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm text-[#464E58] hover:bg-[#F0F1F2] transition-colors flex items-center gap-2" onClick={() => setIsFilterModalOpen(true)}>
                  <Filter className="w-4 h-4" />
                  Filter
                </button>

                {/* Sort Button */}
                <button className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm text-[#464E58] hover:bg-[#F0F1F2] transition-colors flex items-center gap-2" onClick={() => setIsSortModalOpen(true)}>
                  <ArrowUpDown className="w-4 h-4" />
                  Sort
                </button>
              </div>
            </div>
          </div>

          {/* Projects Table */}
          <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm overflow-hidden">
            {/* Delete/Archive Bar - shown when projects selected */}
            {selectedProjects.length > 0 && (
              <div className="bg-[#FEEDEC] border-b border-[#F0F1F2] px-6 py-3 flex items-center justify-between">
                <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  {selectedProjects.length} project{selectedProjects.length !== 1 ? 's' : ''} selected
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleArchiveSelected}
                    className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm text-[#464E58] hover:bg-[#F0F1F2] transition-colors flex items-center gap-2"
                  >
                    <Archive className="w-4 h-4" />
                    Archive
                  </button>
                  <button
                    onClick={handleDeleteSelected}
                    className="px-4 py-2 bg-[#DC180A] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#991B1B] transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FAFBFC] border-b border-[#F0F1F2]">
                  <tr>
                    <th className="px-6 py-4 text-left w-12">
                      <input
                        type="checkbox"
                        checked={selectedProjects.length === projects.length && projects.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30]"
                      />
                    </th>
                    <th className="px-6 py-4 text-left font-['Montserrat',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider">
                      Project Name
                    </th>
                    <th className="px-6 py-4 text-left font-['Montserrat',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider">
                      Source System
                    </th>
                    <th className="px-6 py-4 text-left font-['Montserrat',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider">
                      Risk Classification
                    </th>
                    <th className="px-6 py-4 text-left font-['Montserrat',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left font-['Montserrat',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-4 text-left font-['Montserrat',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider">
                      Blockers
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F1F2]">
                  {projects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((project) => (
                    <tr
                      key={project.id}
                      onClick={() => handleGoToWorkspace(project.id)}
                      className="hover:bg-[#FEEDEC] transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedProjects.includes(project.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleSelectProject(project.id);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30]"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                            {project.projectName}
                          </p>
                          <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#B5BCC4] mt-0.5">
                            Updated {new Date(project.lastUpdated).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewInventorySystem(project.sourceSystemId);
                          }}
                          className="group"
                        >
                          <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A] group-hover:text-[#F13D30] transition-colors">
                            {project.sourceSystem}
                          </span>
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full font-['Montserrat',sans-serif] font-medium text-xs ${getRiskColor(project.riskClassification)}`}>
                          {project.riskClassification}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A]">
                          {project.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                              {project.progressPercentage}%
                            </span>
                            <span className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">
                              Complete
                            </span>
                          </div>
                          <div className="w-full h-2 bg-[#ece9fe] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#5720B7] rounded-full transition-all duration-300"
                              style={{ width: `${project.progressPercentage}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {(() => {
                          const totalBlockers = project.criticalBlockers + project.moderateBlockers;
                          return totalBlockers > 0 ? (
                            <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#5720B7]">
                              {totalBlockers} {totalBlockers === 1 ? 'item' : 'items'} to complete
                            </span>
                          ) : (
                            <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#065F46]">
                              No Blocker
                            </span>
                          );
                        })()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {projects.length === 0 && (
              <div className="py-12 text-center">
                <p className="font-['Montserrat',sans-serif] font-medium text-base text-[#565F6C]">
                  No compliance projects found
                </p>
                <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#B5BCC4] mt-2">
                  Click "New Project" to get started
                </p>
              </div>
            )}
          </div>

          {/* Footer with Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#565F6C]">
              Showing {projects.length} project{projects.length !== 1 ? 's' : ''}
            </p>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className={`px-4 py-2 ${
                        currentPage === page 
                          ? 'bg-[#ece9fe] text-[#5720B7] border border-[#ddd6fe]' 
                          : 'bg-white border border-[#B5BCC4] text-[#464E58] hover:bg-[#ece9fe]'
                      } rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm transition-colors`}
                    >
                      {page}
                    </button>
                  ) : (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-2 font-['Montserrat',sans-serif] font-semibold text-sm text-[#B5BCC4]"
                    >
                      {page}
                    </span>
                  )
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Compliance Project Modal */}
      <NewComplianceProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        availableSystems={availableAISystems}
        onCreateProject={handleCreateProject}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        currentFilters={filterOptions}
        onApply={setFilterOptions}
      />

      {/* Sort Modal */}
      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
        currentSort={sortOptions}
        onApply={setSortOptions}
      />
    </div>
  );
}