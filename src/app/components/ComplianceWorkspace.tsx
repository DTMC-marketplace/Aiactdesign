import { useState } from 'react';
import { PageHeader } from './PageHeader';
import { Filter, Search, FileText, User, ArrowLeft, MessageSquare, UserCog, ArrowRight, ArrowUpDown, X, Plus } from 'lucide-react';
import { ComplianceTaskDetail } from './ComplianceTaskDetail';

interface ComplianceTask {
  id: string;
  taskName: string;
  category: 'Risk' | 'Data' | 'Security' | 'Legal' | 'Privacy' | 'Governance' | 'Trust';
  status: 'To-Do' | 'In Progress' | 'Blocked' | 'Done';
  linkedArticles: string[];
  assignee: {
    name: string;
    avatar: string;
  };
  hasEvidence: boolean;
  roles: string[]; // Roles applicable for this compliance item
  skillName?: string; // Added: Link to assessment skill
  assessmentFramework?: string; // Added: Link to assessment framework
}

interface ComplianceWorkspaceProps {
  projectId: string;
  projectName: string;
  aiSystemName: string;
  regulatoryProfile: string[];
  complianceScore: number;
  role: string;
  onBack: () => void;
}

// Mock team members
const teamMembers = [
  { name: 'Sarah Chen', avatar: 'SC' },
  { name: 'Michael Torres', avatar: 'MT' },
  { name: 'Emma Wilson', avatar: 'EW' },
  { name: 'James Park', avatar: 'JP' },
];

// Mock tasks based on the provided list
const mockTasks: ComplianceTask[] = [
  {
    id: '1',
    taskName: 'Risk Management System',
    category: 'Risk',
    status: 'Done',
    linkedArticles: ['Art. 9'],
    assignee: teamMembers[0],
    hasEvidence: true,
    roles: ['Provider'],
  },
  {
    id: '2',
    taskName: 'Data Governance',
    category: 'Data',
    status: 'Done',
    linkedArticles: ['Art. 10'],
    assignee: teamMembers[0],
    hasEvidence: true,
    roles: ['Provider'],
  },
  {
    id: '3',
    taskName: 'Technical documentation',
    category: 'Legal',
    status: 'In Progress',
    linkedArticles: ['Art. 11', 'Annex IV'],
    assignee: teamMembers[1],
    hasEvidence: true,
    roles: ['Provider', 'Product manufacturer'],
  },
  {
    id: '4',
    taskName: 'Version Control',
    category: 'Data',
    status: 'Done',
    linkedArticles: ['Art. 12'],
    assignee: teamMembers[1],
    hasEvidence: true,
    roles: ['Provider'],
  },
  {
    id: '5',
    taskName: 'Event log (immutable)',
    category: 'Data',
    status: 'Done',
    linkedArticles: ['Art. 12', 'Art. 19'],
    assignee: teamMembers[1],
    hasEvidence: true,
    roles: ['Provider'],
  },
  {
    id: '6',
    taskName: 'Instructions for Use (IFU)',
    category: 'Legal',
    status: 'To-Do',
    linkedArticles: ['Art. 13'],
    assignee: teamMembers[3],
    hasEvidence: false,
    roles: ['Product manufacturer'],
  },
  {
    id: '7',
    taskName: 'Human Oversight',
    category: 'Risk',
    status: 'In Progress',
    linkedArticles: ['Art. 14', 'Art. 26'],
    assignee: teamMembers[0],
    hasEvidence: false,
    roles: ['Provider'],
  },
  {
    id: '8',
    taskName: 'Accuracy, Robustness and Cybersecurity',
    category: 'Security',
    status: 'In Progress',
    linkedArticles: ['Art. 15'],
    assignee: teamMembers[2],
    hasEvidence: true,
    roles: ['Provider', 'Product manufacturer'],
  },
  {
    id: '9',
    taskName: 'Quality management system',
    category: 'Legal',
    status: 'Done',
    linkedArticles: ['Art. 17'],
    assignee: teamMembers[1],
    hasEvidence: true,
    roles: ['Provider', 'Product manufacturer'],
  },
  {
    id: '10',
    taskName: 'Authorized Representative',
    category: 'Legal',
    status: 'To-Do',
    linkedArticles: ['Art. 22'],
    assignee: teamMembers[3],
    hasEvidence: false,
    roles: ['Authorized representative'],
  },
  {
    id: '11',
    taskName: 'Obligations of Importer',
    category: 'Legal',
    status: 'To-Do',
    linkedArticles: ['Art. 23'],
    assignee: teamMembers[0],
    hasEvidence: false,
    roles: ['Importer'],
  },
  {
    id: '12',
    taskName: 'Obligations of Distributor',
    category: 'Legal',
    status: 'To-Do',
    linkedArticles: ['Art. 24'],
    assignee: teamMembers[2],
    hasEvidence: false,
    roles: ['Distributor'],
  },
  {
    id: '13',
    taskName: 'Obligations of Deployer',
    category: 'Legal',
    status: 'In Progress',
    linkedArticles: ['Art. 26'],
    assignee: teamMembers[0],
    hasEvidence: false,
    roles: ['Deployer'],
  },
  {
    id: '14',
    taskName: 'Fundamental Rights Impact Assessment',
    category: 'Risk',
    status: 'To-Do',
    linkedArticles: ['Art. 27'],
    assignee: teamMembers[0],
    hasEvidence: false,
    roles: ['Deployer'],
  },
  {
    id: '15',
    taskName: 'Declaration of conformity Archive',
    category: 'Legal',
    status: 'Done',
    linkedArticles: ['Art. 47', 'Annex V'],
    assignee: teamMembers[3],
    hasEvidence: true,
    roles: ['Provider', 'Product manufacturer'],
  },
  {
    id: '16',
    taskName: 'CE marking',
    category: 'Legal',
    status: 'Done',
    linkedArticles: ['Art. 48'],
    assignee: teamMembers[1],
    hasEvidence: true,
    roles: ['Provider', 'Product manufacturer'],
  },
  {
    id: '17',
    taskName: 'Public authority (or deployer registration)',
    category: 'Legal',
    status: 'To-Do',
    linkedArticles: ['Art. 49(3)'],
    assignee: teamMembers[2],
    hasEvidence: false,
    roles: ['Deployer'],
  },
  {
    id: '18',
    taskName: 'Registration',
    category: 'Legal',
    status: 'In Progress',
    linkedArticles: ['Art. 49', 'Annex VIII'],
    assignee: teamMembers[1],
    hasEvidence: true,
    roles: ['Provider', 'Product manufacturer'],
  },
  {
    id: '19',
    taskName: 'Post-market monitoring plan',
    category: 'Risk',
    status: 'Blocked',
    linkedArticles: ['Art. 72'],
    assignee: teamMembers[2],
    hasEvidence: false,
    roles: ['Provider', 'Product manufacturer'],
  },
  {
    id: '20',
    taskName: 'Reporting of Serious Incidents',
    category: 'Risk',
    status: 'To-Do',
    linkedArticles: ['Art. 73'],
    assignee: teamMembers[0],
    hasEvidence: false,
    roles: ['Provider'],
  },
  {
    id: '21',
    taskName: 'Post-incident investigation',
    category: 'Risk',
    status: 'To-Do',
    linkedArticles: ['Art. 73.6'],
    assignee: teamMembers[1],
    hasEvidence: false,
    roles: ['Provider'],
  },
  {
    id: '22',
    taskName: 'Transparency obligations',
    category: 'Legal',
    status: 'To-Do',
    linkedArticles: ['Art. 50', 'Art. 52'],
    assignee: teamMembers[0],
    hasEvidence: false,
    roles: ['Provider', 'Deployer'],
  },
];

function getCategoryColor(category: ComplianceTask['category']) {
  const colors = {
    'Risk': 'bg-[#FEE2E2] text-[#991B1B]',
    'Data': 'bg-[#DBEAFE] text-[#1E40AF]',
    'Security': 'bg-[#FEF3C7] text-[#92400E]',
    'Legal': 'bg-[#E9D5FF] text-[#6B21A8]',
    'Privacy': 'bg-[#FEE2E2] text-[#991B1B]',
    'Governance': 'bg-[#DBEAFE] text-[#1E40AF]',
    'Trust': 'bg-[#FEF3C7] text-[#92400E]',
  };
  return colors[category];
}

function getStatusColor(status: ComplianceTask['status']) {
  const colors = {
    'To-Do': 'bg-[#F0F1F2] text-[#565F6C]',
    'In Progress': 'bg-[#DBEAFE] text-[#1E40AF]',
    'Blocked': 'bg-[#FEE2E2] text-[#991B1B]',
    'Done': 'bg-[#D1FAE5] text-[#065F46]',
  };
  return colors[status];
}

export function ComplianceWorkspace({
  projectId,
  projectName,
  aiSystemName,
  regulatoryProfile,
  complianceScore,
  role,
  onBack,
}: ComplianceWorkspaceProps) {
  const [tasks, setTasks] = useState<ComplianceTask[]>(mockTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterEvidence, setFilterEvidence] = useState<string>('all');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [assigneeModalOpen, setAssigneeModalOpen] = useState(false);
  const [selectedTaskForNote, setSelectedTaskForNote] = useState<string | null>(null);
  const [selectedTaskForAssignee, setSelectedTaskForAssignee] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [sortField, setSortField] = useState<'taskName' | 'category' | 'status' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [tempSortField, setTempSortField] = useState<'taskName' | 'category' | 'status' | null>(null);
  const [tempSortDirection, setTempSortDirection] = useState<'asc' | 'desc'>('asc');
  const [tempFilterCategory, setTempFilterCategory] = useState<string>('all');
  const [tempFilterStatus, setTempFilterStatus] = useState<string>('all');
  const [tempFilterEvidence, setTempFilterEvidence] = useState<string>('all');
  const [tempFilterAssignee, setTempFilterAssignee] = useState<string>('all');
  
  // New assignee input states
  const [showNewAssigneeForm, setShowNewAssigneeForm] = useState(false);
  const [newAssigneeName, setNewAssigneeName] = useState('');
  const [newAssigneeEmail, setNewAssigneeEmail] = useState('');

  // Risk Management assessment state
  const [selectedTaskForRiskAssessment, setSelectedTaskForRiskAssessment] = useState<string | null>(null);

  const handleInvestigate = (taskId: string) => {
    setSelectedTaskForRiskAssessment(taskId);
  };

  const handleOpenSortModal = () => {
    setTempSortField(sortField);
    setTempSortDirection(sortDirection);
    setShowSortModal(true);
  };

  const handleCloseSortModal = () => {
    setShowSortModal(false);
  };

  const handleApplySort = () => {
    setSortField(tempSortField);
    setSortDirection(tempSortDirection);
    setShowSortModal(false);
  };

  const handleClearSort = () => {
    setSortField(null);
    setSortDirection('asc');
    setShowSortModal(false);
  };

  const handleStatusChange = (taskId: string, newStatus: ComplianceTask['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  // Mock existing notes for tasks
  const mockNotes: Record<string, Array<{ text: string; by: string; when: string }>> = {
    '1': [
      { text: 'Completed initial review of data governance requirements', by: 'Sarah Chen', when: '2 days ago' },
      { text: 'All checklist items verified and approved', by: 'Michael Torres', when: '1 day ago' },
    ],
    '2': [
      { text: 'Started technical file documentation for EU AI Act', by: 'Michael Torres', when: '3 hours ago' },
    ],
    '3': [
      { text: 'Roadmap draft created, awaiting stakeholder feedback', by: 'Sarah Chen', when: '1 week ago' },
    ],
  };

  const handleOpenNoteModal = (taskId: string) => {
    setSelectedTaskForNote(taskId);
    setNoteModalOpen(true);
    setNoteText('');
  };

  const handleSaveNote = () => {
    console.log('Save note for task:', selectedTaskForNote, 'Note:', noteText);
    // In real implementation, save the note to the task
    setNoteModalOpen(false);
    setNoteText('');
    setSelectedTaskForNote(null);
  };

  const handleOpenAssigneeModal = (taskId: string) => {
    setSelectedTaskForAssignee(taskId);
    setAssigneeModalOpen(true);
  };

  const handleSaveAssignee = (newAssignee: typeof teamMembers[0]) => {
    if (selectedTaskForAssignee) {
      setTasks(tasks.map(task => 
        task.id === selectedTaskForAssignee ? { ...task, assignee: newAssignee } : task
      ));
    }
    setAssigneeModalOpen(false);
    setSelectedTaskForAssignee(null);
  };

  const handleOpenFilterModal = () => {
    setTempFilterCategory(filterCategory);
    setTempFilterStatus(filterStatus);
    setTempFilterEvidence(filterEvidence);
    setTempFilterAssignee(filterAssignee);
    setShowFilterModal(true);
  };

  const handleApplyFilters = () => {
    setFilterCategory(tempFilterCategory);
    setFilterStatus(tempFilterStatus);
    setFilterEvidence(tempFilterEvidence);
    setFilterAssignee(tempFilterAssignee);
    setShowFilterModal(false);
  };

  const handleClearFilters = () => {
    setTempFilterCategory('all');
    setTempFilterStatus('all');
    setTempFilterEvidence('all');
    setTempFilterAssignee('all');
    setFilterCategory('all');
    setFilterStatus('all');
    setFilterEvidence('all');
    setFilterAssignee('all');
    setShowFilterModal(false);
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.taskName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesEvidence = filterEvidence === 'all' || (filterEvidence === 'uploaded' && task.hasEvidence) || (filterEvidence === 'missing' && !task.hasEvidence);
    const matchesAssignee = filterAssignee === 'all' || task.assignee.name === filterAssignee;
    
    // Handle multiple roles (comma-separated in role string)
    const projectRoles = role.split(',').map(r => r.trim());
    const matchesRole = task.roles.some(taskRole => projectRoles.includes(taskRole));
    
    return matchesSearch && matchesCategory && matchesStatus && matchesEvidence && matchesAssignee && matchesRole;
  });

  // Calculate status counts (also filtered by role)
  const projectRoles = role.split(',').map(r => r.trim());
  const statusCounts = {
    'To-Do': tasks.filter(t => t.status === 'To-Do' && t.roles.some(taskRole => projectRoles.includes(taskRole))).length,
    'In Progress': tasks.filter(t => t.status === 'In Progress' && t.roles.some(taskRole => projectRoles.includes(taskRole))).length,
    'Blocked': tasks.filter(t => t.status === 'Blocked' && t.roles.some(taskRole => projectRoles.includes(taskRole))).length,
    'Done': tasks.filter(t => t.status === 'Done' && t.roles.some(taskRole => projectRoles.includes(taskRole))).length,
  };

  // Get current task for assignee modal
  const currentTaskForAssignee = tasks.find(t => t.id === selectedTaskForAssignee);

  // Get selected task for risk assessment
  const selectedTask = selectedTaskForRiskAssessment 
    ? tasks.find(t => t.id === selectedTaskForRiskAssessment)
    : null;

  // If viewing risk assessment, show that instead
  if (selectedTask) {
    return (
      <ComplianceTaskDetail
        taskId={selectedTask.id}
        taskName={selectedTask.taskName}
        article={selectedTask.linkedArticles[0]}
        category={selectedTask.category}
        onBack={() => setSelectedTaskForRiskAssessment(null)}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FAFBFC]">
      <PageHeader
        breadcrumb={
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="p-1 hover:bg-[#F0F1F2] rounded transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#565F6C]" />
            </button>
            <span className="text-[#565F6C]">Compliance</span>
            <span className="text-[#B5BCC4]">/</span>
            <span className="text-[#22262A]">{projectName}</span>
          </div>
        }
        title={projectName}
        subtitle={
          <div className="flex items-center gap-4">
            <span className="font-['Roboto',sans-serif] font-medium text-sm text-[#565F6C]">
              AI System: <span className="text-[#22262A] font-semibold">{aiSystemName}</span>
            </span>
            <span className="text-[#B5BCC4]">•</span>
            <span className="font-['Roboto',sans-serif] font-medium text-sm text-[#565F6C]">
              Role: <span className="text-[#22262A] font-semibold">{role}</span>
            </span>
          </div>
        }
      />

      {/* Top Info Bar */}
      <div className="bg-white border-b border-[#F0F1F2] px-8 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Regulatory Profile */}
            <div>
              <p className="font-['Roboto',sans-serif] font-medium text-xs text-[#565F6C] mb-2">
                Regulatory Profile
              </p>
              <div className="flex items-center gap-2">
                {regulatoryProfile.map((profile, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-[#ece9fe] text-[#5720B7] rounded-full font-['Roboto',sans-serif] font-semibold text-xs"
                  >
                    {profile}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="h-12 w-px bg-[#F0F1F2]" />
            
            {/* Compliance Score */}
            <div>
              <p className="font-['Roboto',sans-serif] font-medium text-xs text-[#565F6C] mb-2">
                Overall Compliance Score
              </p>
              <div className="flex items-center gap-3">
                <div className="relative w-32 h-2 bg-[#F0F1F2] rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-[#5720B7] rounded-full"
                    style={{ width: `${complianceScore}%` }}
                  />
                </div>
                <span className="font-['Roboto',sans-serif] font-bold text-lg text-[#5720B7]">
                  {complianceScore}%
                </span>
              </div>
            </div>
          </div>

          {/* Status Summary */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="font-['Roboto',sans-serif] font-bold text-xl text-[#565F6C]">
                {statusCounts['To-Do']}
              </p>
              <p className="font-['Roboto',sans-serif] font-medium text-xs text-[#565F6C]">
                To-Do
              </p>
            </div>
            <div className="text-center">
              <p className="font-['Roboto',sans-serif] font-bold text-xl text-[#5720B7]">
                {statusCounts['In Progress']}
              </p>
              <p className="font-['Roboto',sans-serif] font-medium text-xs text-[#565F6C]">
                In Progress
              </p>
            </div>
            <div className="text-center">
              <p className="font-['Roboto',sans-serif] font-bold text-xl text-[#991B1B]">
                {statusCounts['Blocked']}
              </p>
              <p className="font-['Roboto',sans-serif] font-medium text-xs text-[#565F6C]">
                Blocked
              </p>
            </div>
            <div className="text-center">
              <p className="font-['Roboto',sans-serif] font-bold text-xl text-[#065F46]">
                {statusCounts['Done']}
              </p>
              <p className="font-['Roboto',sans-serif] font-medium text-xs text-[#565F6C]">
                Done
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto px-8 py-8">
          {/* Action Bar */}
          <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-['Roboto',sans-serif] font-bold text-lg text-[#22262A]">
                Compliance Items ({filteredTasks.length})
              </h2>

              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B5BCC4]" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 border border-[#E5E7EB] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-1 focus:ring-[#5720B7]"
                  />
                </div>

                {/* Search Button */}
                <button
                  onClick={() => console.log('Search clicked')}
                  className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#464E58] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#ece9fe] transition-colors flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>

                {/* Sort Button */}
                <button
                  onClick={handleOpenSortModal}
                  className={`px-4 py-2 border rounded-lg font-['Roboto',sans-serif] font-semibold text-sm transition-colors flex items-center gap-2 ${
                    sortField !== null
                      ? 'bg-[#5720B7] text-white border-[#5720B7]'
                      : 'bg-white text-[#464E58] border-[#E5E7EB] hover:bg-[#ece9fe]'
                  }`}
                >
                  <ArrowUpDown className="w-4 h-4" />
                  Sort
                </button>

                {/* Filter Toggle */}
                <button
                  onClick={handleOpenFilterModal}
                  className={`px-4 py-2 border rounded-lg font-['Roboto',sans-serif] font-semibold text-sm transition-colors flex items-center gap-2 ${
                    filterCategory !== 'all' || filterStatus !== 'all' || filterEvidence !== 'all' || filterAssignee !== 'all'
                      ? 'bg-[#5720B7] text-white border-[#5720B7]'
                      : 'bg-white text-[#464E58] border-[#E5E7EB] hover:bg-[#ece9fe]'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Tasks Table */}
          <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FAFBFC] border-b border-[#F0F1F2]">
                  <tr>
                    <th className="px-6 py-4 text-left font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider">
                      Task Name
                    </th>
                    <th className="px-6 py-4 text-left font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider">
                      Linked Article
                    </th>
                    <th className="px-6 py-4 text-left font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider">
                      Evidence
                    </th>
                    <th className="px-6 py-4 text-left font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider">
                      Assignee
                    </th>
                    <th className="px-6 py-4 text-left font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F1F2]">
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-[#ece9fe] transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                          {task.taskName}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full font-['Roboto',sans-serif] font-medium text-xs ${getCategoryColor(task.category)}`}>
                          {task.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={task.status}
                          onChange={(e) => handleStatusChange(task.id, e.target.value as ComplianceTask['status'])}
                          className={`px-3 py-1.5 rounded-lg font-['Roboto',sans-serif] font-medium text-xs border border-transparent focus:outline-none focus:border-[#5720B7] focus:ring-1 focus:ring-[#5720B7] ${getStatusColor(task.status)}`}
                        >
                          <option value="To-Do">To-Do</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Blocked">Blocked</option>
                          <option value="Done">Done</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          {task.linkedArticles.map((article, index) => (
                            <button
                              key={index}
                              className="px-2.5 py-1 bg-[#ece9fe] text-[#5720B7] rounded-md font-['Roboto',sans-serif] font-semibold text-xs hover:bg-[#ddd6fe] transition-colors"
                            >
                              {article}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FileText 
                            className={`w-5 h-5 ${task.hasEvidence ? 'text-[#065F46]' : 'text-[#991B1B]'}`}
                          />
                          <span className={`font-['Roboto',sans-serif] font-medium text-xs ${task.hasEvidence ? 'text-[#065F46]' : 'text-[#991B1B]'}`}>
                            {task.hasEvidence ? 'Uploaded' : 'Missing'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#5720B7] flex items-center justify-center">
                            <span className="font-['Roboto',sans-serif] font-bold text-xs text-white">
                              {task.assignee.avatar}
                            </span>
                          </div>
                          <span className="font-['Roboto',sans-serif] font-medium text-sm text-[#22262A]">
                            {task.assignee.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {/* Edit Assignee Icon Button */}
                          <button
                            onClick={() => handleOpenAssigneeModal(task.id)}
                            className="p-2 rounded-lg border border-[#E5E7EB] text-[#565F6C] hover:bg-[#ece9fe] hover:border-[#5720B7] transition-colors"
                            title="Edit Assignee"
                          >
                            <UserCog className="w-4 h-4" />
                          </button>
                          
                          {/* Note Icon Button */}
                          <button
                            onClick={() => handleOpenNoteModal(task.id)}
                            className="p-2 rounded-lg border border-[#E5E7EB] text-[#565F6C] hover:bg-[#ece9fe] hover:border-[#5720B7] transition-colors"
                            title="Add Note"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          
                          {/* Enter/Investigate Icon Button */}
                          <button
                            onClick={() => handleInvestigate(task.id)}
                            className="p-2 rounded-lg bg-[#5720B7] text-white hover:bg-[#4a1b99] transition-colors"
                            title="Investigate"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredTasks.length === 0 && (
              <div className="py-12 text-center">
                <p className="font-['Roboto',sans-serif] font-medium text-base text-[#565F6C]">
                  No tasks found
                </p>
                <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#B5BCC4] mt-2">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A]">
                Filter Compliance Items
              </h2>
              <button
                onClick={() => setShowFilterModal(false)}
                className="p-1 hover:bg-[#F0F1F2] rounded transition-colors"
              >
                <X className="w-5 h-5 text-[#565F6C]" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2">
                  <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#565F6C]">
                    Category
                  </span>
                </label>
                <select
                  value={tempFilterCategory}
                  onChange={(e) => setTempFilterCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A] focus:outline-none focus:border-[#F13D30] focus:ring-1 focus:ring-[#F13D30]"
                >
                  <option value="all">All Categories</option>
                  <option value="Risk">Risk</option>
                  <option value="Data">Data</option>
                  <option value="Security">Security</option>
                  <option value="Legal">Legal</option>
                  <option value="Privacy">Privacy</option>
                  <option value="Governance">Governance</option>
                  <option value="Trust">Trust</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">
                  <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#565F6C]">
                    Status
                  </span>
                </label>
                <select
                  value={tempFilterStatus}
                  onChange={(e) => setTempFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A] focus:outline-none focus:border-[#F13D30] focus:ring-1 focus:ring-[#F13D30]"
                >
                  <option value="all">All Statuses</option>
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Blocked">Blocked</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">
                  <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#565F6C]">
                    Evidence
                  </span>
                </label>
                <select
                  value={tempFilterEvidence}
                  onChange={(e) => setTempFilterEvidence(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A] focus:outline-none focus:border-[#F13D30] focus:ring-1 focus:ring-[#F13D30]"
                >
                  <option value="all">All Evidence</option>
                  <option value="uploaded">Uploaded</option>
                  <option value="missing">Missing</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">
                  <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#565F6C]">
                    Assignee
                  </span>
                </label>
                <select
                  value={tempFilterAssignee}
                  onChange={(e) => setTempFilterAssignee(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A] focus:outline-none focus:border-[#F13D30] focus:ring-1 focus:ring-[#F13D30]"
                >
                  <option value="all">All Assignees</option>
                  {teamMembers.map((member) => (
                    <option key={member.name} value={member.name}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-[#F0F1F2] text-[#565F6C] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#E5E7EB] transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={handleApplyFilters}
                className="px-4 py-2 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sort Modal */}
      {showSortModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-[500px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A]">
                Sort Compliance Items
              </h2>
              <button
                onClick={() => setShowSortModal(false)}
                className="p-1 hover:bg-[#F0F1F2] rounded transition-colors"
              >
                <X className="w-5 h-5 text-[#565F6C]" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2">
                  <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#565F6C]">
                    Sort By
                  </span>
                </label>
                <select
                  value={tempSortField || 'taskName'}
                  onChange={(e) => setTempSortField(e.target.value as 'taskName' | 'category' | 'status')}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A] focus:outline-none focus:border-[#F13D30] focus:ring-1 focus:ring-[#F13D30]"
                >
                  <option value="taskName">Task Name</option>
                  <option value="category">Category</option>
                  <option value="status">Status</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">
                  <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#565F6C]">
                    Direction
                  </span>
                </label>
                <select
                  value={tempSortDirection}
                  onChange={(e) => setTempSortDirection(e.target.value as 'asc' | 'desc')}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A] focus:outline-none focus:border-[#F13D30] focus:ring-1 focus:ring-[#F13D30]"
                >
                  <option value="asc">Ascending (A-Z, 1-9)</option>
                  <option value="desc">Descending (Z-A, 9-1)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={handleClearSort}
                className="px-4 py-2 bg-[#F0F1F2] text-[#565F6C] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#E5E7EB] transition-colors"
              >
                Clear Sort
              </button>
              <button
                onClick={handleApplySort}
                className="px-4 py-2 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
              >
                Apply Sort
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assignee Modal */}
      {assigneeModalOpen && currentTaskForAssignee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-[500px] max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A]">
                Change Assignee
              </h2>
              <button
                onClick={() => {
                  setAssigneeModalOpen(false);
                  setShowNewAssigneeForm(false);
                  setNewAssigneeName('');
                  setNewAssigneeEmail('');
                }}
                className="p-1 hover:bg-[#F0F1F2] rounded transition-colors"
              >
                <X className="w-5 h-5 text-[#565F6C]" />
              </button>
            </div>

            <p className="font-['Montserrat',sans-serif] font-medium text-sm text-[#565F6C] mb-4">
              Select a new assignee for: <span className="text-[#22262A] font-semibold">{currentTaskForAssignee.taskName}</span>
            </p>

            {!showNewAssigneeForm ? (
              <>
                <div className="space-y-2 mb-4">
                  {teamMembers.map((member) => (
                    <button
                      key={member.name}
                      onClick={() => handleSaveAssignee(member)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        currentTaskForAssignee.assignee.name === member.name
                          ? 'bg-[#FEEDEC] border-[#F13D30]'
                          : 'bg-white border-[#E5E7EB] hover:bg-[#FAFBFC] hover:border-[#B5BCC4]'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#F13D30] flex items-center justify-center">
                        <span className="font-['Montserrat',sans-serif] font-bold text-sm text-white">
                          {member.avatar}
                        </span>
                      </div>
                      <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                        {member.name}
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowNewAssigneeForm(true)}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed border-[#B5BCC4] text-[#565F6C] hover:border-[#F13D30] hover:text-[#F13D30] transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-['Montserrat',sans-serif] font-semibold text-sm">
                    Add New Assignee
                  </span>
                </button>
              </>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">
                    <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#565F6C]">
                      Name <span className="text-[#DC180A]">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    value={newAssigneeName}
                    onChange={(e) => setNewAssigneeName(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-1 focus:ring-[#F13D30]"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block mb-2">
                    <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#565F6C]">
                      Email <span className="text-[#DC180A]">*</span>
                    </span>
                  </label>
                  <input
                    type="email"
                    value={newAssigneeEmail}
                    onChange={(e) => setNewAssigneeEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-1 focus:ring-[#F13D30]"
                    placeholder="Enter email address"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setShowNewAssigneeForm(false);
                      setNewAssigneeName('');
                      setNewAssigneeEmail('');
                    }}
                    className="flex-1 px-4 py-2 bg-[#F0F1F2] text-[#565F6C] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#E5E7EB] transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      if (newAssigneeName && newAssigneeEmail) {
                        const initials = newAssigneeName
                          .split(' ')
                          .map(n => n[0])
                          .join('')
                          .toUpperCase()
                          .slice(0, 2);
                        const newMember = { name: newAssigneeName, avatar: initials };
                        handleSaveAssignee(newMember);
                        setShowNewAssigneeForm(false);
                        setNewAssigneeName('');
                        setNewAssigneeEmail('');
                      }
                    }}
                    disabled={!newAssigneeName || !newAssigneeEmail}
                    className="flex-1 px-4 py-2 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors disabled:bg-[#B5BCC4] disabled:cursor-not-allowed"
                  >
                    Add Assignee
                  </button>
                </div>
              </div>
            )}

            {!showNewAssigneeForm && (
              <div className="flex items-center justify-end mt-6">
                <button
                  onClick={() => {
                    setAssigneeModalOpen(false);
                    setShowNewAssigneeForm(false);
                    setNewAssigneeName('');
                    setNewAssigneeEmail('');
                  }}
                  className="px-4 py-2 bg-[#F0F1F2] text-[#565F6C] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#E5E7EB] transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Note Modal */}
      {noteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A]">
                Internal Notes
              </h2>
              <button
                onClick={() => setNoteModalOpen(false)}
                className="p-1 hover:bg-[#F0F1F2] rounded transition-colors"
              >
                <X className="w-5 h-5 text-[#565F6C]" />
              </button>
            </div>

            {/* Existing Notes Section */}
            {selectedTaskForNote && mockNotes[selectedTaskForNote] && mockNotes[selectedTaskForNote].length > 0 && (
              <div className="mb-6">
                <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#565F6C] mb-3">
                  Existing Notes
                </h3>
                <div className="space-y-3">
                  {mockNotes[selectedTaskForNote].map((note, index) => (
                    <div key={index} className="p-4 bg-[#FAFBFC] rounded-lg border border-[#F0F1F2]">
                      <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] mb-2">
                        {note.text}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-['Montserrat',sans-serif] font-semibold text-[#565F6C]">
                          By: {note.by}
                        </span>
                        <span className="text-[#B5BCC4]">•</span>
                        <span className="font-['Montserrat',sans-serif] font-normal text-[#B5BCC4]">
                          {note.when}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Note Section */}
            <div>
              <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#565F6C] mb-3">
                Add New Note
              </h3>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="w-full h-32 border border-[#E5E7EB] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-1 focus:ring-[#F13D30] p-4"
                placeholder="Enter your internal note here..."
              />
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setNoteModalOpen(false)}
                className="px-4 py-2 bg-[#F0F1F2] text-[#565F6C] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#E5E7EB] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}