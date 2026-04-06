import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  Search, Filter, ArrowUpDown, Plus, Trash2, Archive,
  ChevronDown, ChevronUp, Building2, Package, BrainCircuit, Database, Cpu,
} from 'lucide-react';
import imgAvatar from "figma:asset/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png";
import { NewComplianceProjectModal } from './NewComplianceProjectModal';
import { FilterModal, FilterOptions } from './FilterModal';
import { SortModal, SortOptions } from './SortModal';
import { ComplianceWorkspace } from './ComplianceWorkspace';
import { DatasetComplianceWorkspace } from './DatasetComplianceWorkspace';

// ─── Law filter config ────────────────────────────────────────────────────────
type LawKey = 'EU AI Act' | 'GDPR' | 'DSA' | 'Data Act';
const LAW_BUTTONS: LawKey[] = ['EU AI Act', 'GDPR', 'DSA', 'Data Act'];

// ─── Types ────────────────────────────────────────────────────────────────────
type ComplianceLevel = 'Organization' | 'Product' | 'AI System' | 'Dataset';

interface ComplianceProject {
  id: string;
  projectName: string;
  sourceSystem: string;
  sourceSystemId: string;
  riskClassification: 'Prohibited' | 'High-Risk' | 'Limited transparency' | 'Minimal';
  progressPercentage: number;
  criticalBlockers: number;
  moderateBlockers: number;
  lastUpdated: string;
  role: string;
  complianceManager: string;
}

interface DatasetCompliance {
  id: string;
  datasetName: string;
  datasetId: string;
  dataType: string;
  complianceScore: number;
  criticalIssues: number;
  moderateIssues: number;
  lastUpdated: string;
  dataOwner: string;
}

// ─── Tab config ───────────────────────────────────────────────────────────────
const LEVEL_TABS: { id: ComplianceLevel; icon: React.ElementType; count: number }[] = [
  { id: 'Organization', icon: Building2,    count: 2 },
  { id: 'Product',      icon: Package,      count: 5 },
  { id: 'AI System',   icon: BrainCircuit, count: 4 },
  { id: 'Dataset',     icon: Database,     count: 3 },
];

// ─── Mock data ────────────────────────────────────────────────────────────────
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
    complianceManager: 'John Doe',
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
    complianceManager: 'Jane Smith',
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
    complianceManager: 'Alice Johnson',
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
    complianceManager: 'Bob Brown',
  },
];

const mockDatasets: DatasetCompliance[] = [
  {
    id: '1',
    datasetName: 'Customer Feedback Data',
    datasetId: '4',
    dataType: 'Text',
    complianceScore: 75,
    criticalIssues: 1,
    moderateIssues: 2,
    lastUpdated: '2025-01-25',
    dataOwner: 'Jane Smith',
  },
  {
    id: '2',
    datasetName: 'Product Usage Data',
    datasetId: '2',
    dataType: 'Numeric',
    complianceScore: 85,
    criticalIssues: 0,
    moderateIssues: 1,
    lastUpdated: '2025-01-26',
    dataOwner: 'Alice Johnson',
  },
  {
    id: '3',
    datasetName: 'User Interaction Data',
    datasetId: '1',
    dataType: 'Mixed',
    complianceScore: 90,
    criticalIssues: 0,
    moderateIssues: 0,
    lastUpdated: '2025-01-27',
    dataOwner: 'Bob Brown',
  },
];

// ─── Product Commercial Readiness mock data ─────────────────────────────────
interface ProductComponent {
  id: string;
  name: string;
  type: 'AI System' | 'Dataset';
  complianceProgress: number;
}

interface ProductReadiness {
  id: string;
  productName: string;
  riskLevel: 'High-Risk' | 'Limited transparency' | 'Minimal';
  linkedSystems: number;
  linkedModels: number;
  launchProgress: number;
  lastUpdated: string;
  components: ProductComponent[];
}

const mockProductReadiness: ProductReadiness[] = [
  {
    id: '1',
    productName: 'Sola Recruitment AI',
    riskLevel: 'High-Risk',
    linkedSystems: 3,
    linkedModels: 2,
    launchProgress: 65,
    lastUpdated: '2026-02-28',
    components: [
      { id: '1', name: 'Resume Screening AI', type: 'AI System', complianceProgress: 45 },
      { id: '2', name: 'Credit Scoring Model', type: 'AI System', complianceProgress: 65 },
      { id: '4', name: 'Customer Service Chatbot', type: 'AI System', complianceProgress: 90 },
      { id: '1', name: 'Customer Feedback Data', type: 'Dataset', complianceProgress: 75 },
      { id: '2', name: 'Product Usage Data', type: 'Dataset', complianceProgress: 85 },
    ],
  },
  {
    id: '2',
    productName: 'DocuVerify Intelligence',
    riskLevel: 'Limited transparency',
    linkedSystems: 2,
    linkedModels: 1,
    launchProgress: 82,
    lastUpdated: '2026-03-10',
    components: [
      { id: '3', name: 'Predictive Maintenance System', type: 'AI System', complianceProgress: 100 },
      { id: '4', name: 'Customer Service Chatbot', type: 'AI System', complianceProgress: 90 },
      { id: '3', name: 'User Interaction Data', type: 'Dataset', complianceProgress: 90 },
    ],
  },
  {
    id: '3',
    productName: 'Customer Support Bot',
    riskLevel: 'Minimal',
    linkedSystems: 1,
    linkedModels: 1,
    launchProgress: 95,
    lastUpdated: '2026-03-12',
    components: [
      { id: '4', name: 'Customer Service Chatbot', type: 'AI System', complianceProgress: 90 },
      { id: '1', name: 'Customer Feedback Data', type: 'Dataset', complianceProgress: 75 },
    ],
  },
  {
    id: '4',
    productName: 'Fraud Detection Platform',
    riskLevel: 'High-Risk',
    linkedSystems: 4,
    linkedModels: 3,
    launchProgress: 48,
    lastUpdated: '2026-03-08',
    components: [
      { id: '1', name: 'Resume Screening AI', type: 'AI System', complianceProgress: 45 },
      { id: '2', name: 'Credit Scoring Model', type: 'AI System', complianceProgress: 65 },
      { id: '3', name: 'Predictive Maintenance System', type: 'AI System', complianceProgress: 100 },
      { id: '4', name: 'Customer Service Chatbot', type: 'AI System', complianceProgress: 90 },
      { id: '1', name: 'Customer Feedback Data', type: 'Dataset', complianceProgress: 75 },
      { id: '2', name: 'Product Usage Data', type: 'Dataset', complianceProgress: 85 },
      { id: '3', name: 'User Interaction Data', type: 'Dataset', complianceProgress: 90 },
    ],
  },
  {
    id: '5',
    productName: 'Analytics Dashboard',
    riskLevel: 'Minimal',
    linkedSystems: 2,
    linkedModels: 1,
    launchProgress: 100,
    lastUpdated: '2026-03-01',
    components: [
      { id: '3', name: 'Predictive Maintenance System', type: 'AI System', complianceProgress: 100 },
      { id: '4', name: 'Customer Service Chatbot', type: 'AI System', complianceProgress: 90 },
      { id: '2', name: 'Product Usage Data', type: 'Dataset', complianceProgress: 85 },
    ],
  },
];

// ─── Product-level articles ───────────────────────────────────────────────────
const productArticles = [
  { id: 'art-11', law: 'EU AI Act' as LawKey, article: 'Art. 11', title: 'Technical Documentation',        desc: 'Maintain up-to-date technical documentation for each AI product placed on the EU/EEA market.', progress: 40 },
  { id: 'art-13', law: 'EU AI Act' as LawKey, article: 'Art. 13', title: 'Transparency & User Information', desc: 'Ensure deployed AI products include clear instructions of use and transparency disclosures.',    progress: 70 },
  { id: 'art-47', law: 'EU AI Act' as LawKey, article: 'Art. 47', title: 'Instructions of Use',             desc: 'Providers must supply clear, accurate instructions of use for each product version.',              progress: 55 },
  { id: 'art-49', law: 'EU AI Act' as LawKey, article: 'Art. 49', title: 'Declaration of Conformity',       desc: 'Draw up a DoC confirming the AI product meets all applicable EU AI Act requirements.',           progress: 30 },
  { id: 'art-51', law: 'EU AI Act' as LawKey, article: 'Art. 51', title: 'Registration in the EU Database', desc: 'Register high-risk AI products in the EU public database before placing on the market.',         progress: 15 },
];

// ─── Dataset-level articles ───────────────────────────────────────────────────
const datasetArticles = [
  { id: 'art-10',     law: 'EU AI Act' as LawKey, article: 'Art. 10',      title: 'Training, Validation & Testing Data',     desc: 'Governance practices for data quality, relevance, and statistical representativeness.',                                                  progress: 60 },
  { id: 'gdpr-art5',  law: 'GDPR'      as LawKey, article: 'GDPR Art. 5',  title: 'Principles of Personal Data Processing',  desc: 'Lawfulness, fairness, transparency, purpose limitation, data minimisation, accuracy and integrity.',                                    progress: 80 },
  { id: 'gdpr-art35', law: 'GDPR'      as LawKey, article: 'GDPR Art. 35', title: 'Data Protection Impact Assessment',        desc: 'Conduct DPIAs for high-risk processing involving AI-generated or AI-consumed datasets.',                                               progress: 45 },
];

// ─── Organization-level articles ─────────────────────────────────────────────
const orgArticles = [
  { id: 'art-4',  law: 'EU AI Act' as LawKey, article: 'Art. 4',  title: 'AI Literacy',               desc: 'Ensure staff and stakeholders have adequate AI literacy and training.',                                                progress: 75 },
  { id: 'art-17', law: 'EU AI Act' as LawKey, article: 'Art. 17', title: 'Quality Management System',  desc: 'Establish and maintain a quality management system for AI governance across the organisation.',                       progress: 60 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getRiskColor(risk: ComplianceProject['riskClassification']) {
  const colors = {
    'Prohibited':           'bg-[#FEE2E2] text-[#991B1B]',
    'High-Risk':            'bg-[#FED7AA] text-[#9A3412]',
    'Limited transparency': 'bg-[#FEF3C7] text-[#92400E]',
    'Minimal':              'bg-[#D1FAE5] text-[#065F46]',
  };
  return colors[risk];
}

// ─── ArticleCard ──────────────────────────────────────────────────────────────
function ArticleCard({ article, title, desc, progress }: {
  article: string; title: string; desc: string; progress: number;
}) {
  return (
    <div className="border border-[#F0F1F2] rounded-lg p-6 hover:border-[#5720B7] transition-colors cursor-pointer bg-white">
      {/* Row 1: title (left) · article badge (right) — same height */}
      <div className="flex items-center justify-between gap-4 mb-1">
        <h4 className="font-['Roboto',sans-serif] font-semibold text-base text-[#22262A]">{title}</h4>
        <div className="px-3 py-1 rounded-lg bg-[#ece9fe] shrink-0">
          <span className="font-['Roboto',sans-serif] font-bold text-xs text-[#5720B7] whitespace-nowrap">{article}</span>
        </div>
      </div>
      {/* Row 2: description */}
      <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#565F6C] mb-4">{desc}</p>
      {/* Row 3: progress bar (left) · percentage (right) — same height */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-2 bg-[#ece9fe] rounded-full overflow-hidden">
          <div className="h-full bg-[#5720B7] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#5720B7] shrink-0 w-10 text-right">{progress}%</span>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function CompliancePageV2() {
  const [projects] = useState<ComplianceProject[]>(mockProjects);
  const [datasets] = useState<DatasetCompliance[]>(mockDatasets);
  const [productReadiness] = useState<ProductReadiness[]>(mockProductReadiness);
  const [searchTerm, setSearchTerm] = useState('');
  const [productSearchTerm, setProductSearchTerm] = useState('');
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
  const [activeLevel, setActiveLevel] = useState<ComplianceLevel>('Organization');
  const [activeLaws, setActiveLaws] = useState<Set<LawKey>>(new Set());
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>([]);
  const [datasetSearchTerm, setDatasetSearchTerm] = useState('');
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);

  const toggleLaw = (law: LawKey) => {
    setActiveLaws(prev => {
      const next = new Set(prev);
      next.has(law) ? next.delete(law) : next.add(law);
      return next;
    });
  };

  const handleComponentClick = (component: ProductComponent, e: React.MouseEvent) => {
    e.stopPropagation();
    if (component.type === 'AI System') {
      // Find the matching project
      const matchingProject = projects.find(p => p.sourceSystem === component.name);
      if (matchingProject) {
        setSelectedWorkspaceProject(matchingProject.id);
      } else {
        alert(`Navigate to AI System: ${component.name}`);
      }
    } else {
      // Find the matching dataset
      const matchingDataset = datasets.find(d => d.datasetName === component.name);
      if (matchingDataset) {
        setSelectedDataset(matchingDataset.id);
      } else {
        alert(`Navigate to Dataset: ${component.name}`);
      }
    }
  };

  const toggleProductExpansion = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedProductId(prev => prev === productId ? null : productId);
  };

  // Filter articles by active laws; show all when none selected
  const filterByLaw = <T extends { law: LawKey }>(items: T[]) =>
    activeLaws.size === 0 ? items : items.filter(a => activeLaws.has(a.law));

  const visibleOrgArticles     = filterByLaw(orgArticles);
  const visibleProductArticles = filterByLaw(productArticles);
  const visibleDatasetArticles = filterByLaw(datasetArticles);

  const availableAISystems = [
    { id: '1', name: 'Customer Service Chatbot',     riskClassification: 'Limited transparency', status: 'In production' },
    { id: '2', name: 'Resume Screening AI',           riskClassification: 'High-risk',            status: 'Testing' },
    { id: '3', name: 'Predictive Maintenance System', riskClassification: 'Minimal',              status: 'In production' },
    { id: '4', name: 'Credit Scoring Model',          riskClassification: 'Not assessed',         status: 'Planned' },
    { id: '5', name: 'Fraud Detection System',        riskClassification: 'High-risk',            status: 'In production' },
    { id: '6', name: 'Inventory Forecasting AI',      riskClassification: 'Minimal',              status: 'Testing' },
  ];

  const handleGoToWorkspace = (projectId: string) => setSelectedWorkspaceProject(projectId);
  const handleViewInventorySystem = (systemId: string) => alert(`Navigate to AI Inventory to view system ${systemId}`);
  const handleCreateProject = (selectedSystemIds: string[], projectName: string) => {
    console.log('Creating compliance project for systems:', selectedSystemIds, projectName);
    alert(`Compliance project created for ${selectedSystemIds.length} AI system${selectedSystemIds.length !== 1 ? 's' : ''}!`);
    setIsNewProjectModalOpen(false);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProjects(e.target.checked ? projects.map(p => p.id) : []);
  };
  const handleSelectProject = (projectId: string) => {
    setSelectedProjects(prev =>
      prev.includes(projectId) ? prev.filter(id => id !== projectId) : [...prev, projectId]
    );
  };
  const handleDeleteSelected = () => {
    if (!selectedProjects.length) return;
    if (confirm(`Delete ${selectedProjects.length} project(s)?`)) {
      alert(`${selectedProjects.length} project(s) deleted!`);
      setSelectedProjects([]);
    }
  };
  const handleArchiveSelected = () => {
    if (!selectedProjects.length) return;
    if (confirm(`Archive ${selectedProjects.length} project(s)?`)) {
      alert(`${selectedProjects.length} project(s) archived!`);
      setSelectedProjects([]);
    }
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(projects.length / itemsPerPage);
    const pages: (number | string)[] = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, '...', totalPages - 1, totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, 2, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  };

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const activeProjects = projects.filter(p => p.progressPercentage < 100);
  const nonCompliantProjects = projects.filter(p => p.criticalBlockers > 0 || p.moderateBlockers > 0);

  // Workspace view
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

  // Dataset workspace view
  if (selectedDataset) {
    const dataset = datasets.find(d => d.id === selectedDataset);
    if (dataset) {
      return (
        <DatasetComplianceWorkspace
          datasetId={dataset.datasetId}
          datasetName={dataset.datasetName}
          dataType={dataset.dataType}
          complianceScore={dataset.complianceScore}
          onBack={() => setSelectedDataset(null)}
        />
      );
    }
  }

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FAFBFC]">
      {/* ── Custom Split Header ──────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#F0F1F2] px-8 pt-5 pb-0 shrink-0">
        {/* Top row: breadcrumb nav + avatar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => window.history.back()} className="p-1 hover:bg-[#ece9fe] rounded transition-colors">
              <ArrowLeft className="w-5 h-5 text-[#5720B7]" />
            </button>
            <button onClick={() => window.history.forward()} className="p-1 hover:bg-[#F0F1F2] rounded transition-colors">
              <ArrowRight className="w-5 h-5 text-[#B5BCC4]" />
            </button>
            <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#5720B7]">Compliance V2</span>
          </div>
          <div className="w-10 h-10 rounded-full border border-[#B5BCC4] overflow-hidden shrink-0">
            <img src={imgAvatar} alt="User" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Split content: left = title/subtitle, divider, right = law filters */}
        <div className="flex items-stretch gap-0 pb-5">
          {/* Left: title + subtitle */}
          <div className="flex-1 pr-8 min-w-0">
            <h1 className="font-['Roboto',sans-serif] font-bold text-2xl text-[#22262A] tracking-[-0.24px] mb-1">
              Compliance Tracker
            </h1>
            <p className="font-['Roboto',sans-serif] font-normal text-base text-[#464E58]">
              Compliance obligations are tracked across multiple levels — select a level tab below to view and manage your to-do items
            </p>
          </div>

          {/* Vertical divider */}
          <div className="w-px bg-[#F0F1F2] shrink-0 self-stretch" />

          {/* Right: Law activate buttons */}
          <div className="pl-8 flex flex-col justify-center min-w-[260px]">
            <p className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider mb-2.5">
              Activate Laws
            </p>
            <div className="flex flex-wrap gap-2">
              {LAW_BUTTONS.map(law => (
                <button
                  key={law}
                  onClick={() => toggleLaw(law)}
                  className={`px-3 py-1.5 rounded-full font-['Roboto',sans-serif] font-semibold text-xs border transition-all ${
                    activeLaws.has(law)
                      ? 'bg-[#5720B7] text-white border-[#5720B7] shadow-sm'
                      : 'bg-white text-[#565F6C] border-[#E5E7EB] hover:border-[#5720B7] hover:text-[#5720B7]'
                  }`}
                >
                  {law}
                </button>
              ))}
            </div>
            {activeLaws.size > 0 && (
              <button
                onClick={() => setActiveLaws(new Set())}
                className="font-['Roboto',sans-serif] font-medium text-xs text-[#5720B7] hover:underline mt-2 text-left"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Level Tab Bar ────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#F0F1F2] shrink-0">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex">
            {LEVEL_TABS.map(({ id, icon: Icon, count }) => (
              <button
                key={id}
                onClick={() => setActiveLevel(id)}
                className={`relative flex items-center gap-2 px-5 py-4 font-['Roboto',sans-serif] font-semibold text-sm transition-colors whitespace-nowrap ${
                  activeLevel === id
                    ? 'text-[#5720B7] border-b-2 border-[#5720B7]'
                    : 'text-[#B5BCC4] hover:text-[#464E58] border-b-2 border-transparent'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {id}
                <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold transition-colors ${
                  activeLevel === id
                    ? 'bg-[#ece9fe] text-[#5720B7]'
                    : 'bg-[#F0F1F2] text-[#B5BCC4]'
                }`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scrollable Content ───────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto px-8 py-8">

          {/* ── Organization tab ─────────────────────────────────────────────── */}
          {activeLevel === 'Organization' && (
            <div>
              <div className="mb-6">
                <h3 className="font-['Roboto',sans-serif] font-bold text-lg text-[#22262A]">
                  Organizational level compliance
                </h3>
                <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#565F6C] mt-0.5">
                  Cross-cutting obligations applying to the whole organisation
                </p>
              </div>

              <div className="space-y-4">
                {visibleOrgArticles.map(a => (
                  <ArticleCard key={a.id} {...a} />
                ))}
              </div>
            </div>
          )}

          {/* ── Product tab ───────────────────────────────────────────────────── */}
          {activeLevel === 'Product' && (
            <div>
              <div className="mb-6">
                <h3 className="font-['Roboto',sans-serif] font-bold text-lg text-[#22262A]">
                  Product Commercial Readiness
                </h3>
                <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#565F6C] mt-0.5">
                  Monitor product launch readiness and compliance status across your product portfolio
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                {/* Total Products */}
                <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
                  <p className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider mb-2">
                    Total Products
                  </p>
                  <p className="font-['Roboto',sans-serif] font-bold text-4xl text-[#22262A] mb-1">
                    {productReadiness.length}
                  </p>
                  <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C]">
                    Registered in portfolio
                  </p>
                </div>

                {/* High-Risk Products */}
                <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
                  <p className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider mb-2">
                    High-Risk Products
                  </p>
                  <p className="font-['Roboto',sans-serif] font-bold text-4xl text-[#5720B7] mb-1">
                    {productReadiness.filter(p => p.riskLevel === 'High-Risk').length}
                  </p>
                  <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C]">
                    Requiring enhanced oversight
                  </p>
                </div>

                {/* Average Launch Readiness */}
                <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
                  <p className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider mb-2">
                    Avg Launch Readiness
                  </p>
                  <p className="font-['Roboto',sans-serif] font-bold text-4xl text-[#22262A] mb-1">
                    {Math.round(productReadiness.reduce((sum, p) => sum + p.launchProgress, 0) / productReadiness.length)}%
                  </p>
                  <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C]">
                    Across all products
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B5BCC4]" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={productSearchTerm}
                      onChange={e => setProductSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-[#E5E7EB] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-1 focus:ring-[#5720B7]"
                    />
                  </div>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#FAFBFC] border-b border-[#F0F1F2]">
                      <tr>
                        {['Product Name', 'Risk Level', 'Components', 'Launch Progress'].map(col => (
                          <th key={col} className="px-6 py-4 text-left font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0F1F2]">
                      {productReadiness
                        .filter(p => !productSearchTerm || p.productName.toLowerCase().includes(productSearchTerm.toLowerCase()))
                        .map(product => (
                        <React.Fragment key={product.id}>
                          <tr
                            onClick={(e) => toggleProductExpansion(product.id, e)}
                            className={`transition-all cursor-pointer ${
                              expandedProductId && expandedProductId !== product.id
                                ? 'opacity-40 pointer-events-none'
                                : 'hover:bg-[#ece9fe]'
                            }`}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={(e) => toggleProductExpansion(product.id, e)}
                                  className="p-1 hover:bg-[#ddd6fe] rounded transition-colors"
                                >
                                  {expandedProductId === product.id ? (
                                    <ChevronUp className="w-4 h-4 text-[#5720B7]" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 text-[#5720B7]" />
                                  )}
                                </button>
                                <div>
                                  <p className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                                    {product.productName}
                                  </p>
                                  <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#B5BCC4] mt-0.5">
                                    Updated {new Date(product.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-2.5 py-1 rounded-full font-['Roboto',sans-serif] font-medium text-xs ${getRiskColor(product.riskLevel)}`}>
                                {product.riskLevel}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5">
                                  <BrainCircuit className="w-4 h-4 text-[#5720B7]" />
                                  <span className="font-['Roboto',sans-serif] font-medium text-sm text-[#22262A]">{product.linkedSystems}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Cpu className="w-4 h-4 text-[#5720B7]" />
                                  <span className="font-['Roboto',sans-serif] font-medium text-sm text-[#22262A]">{product.linkedModels}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">{product.launchProgress}%</span>
                                  <span className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C]">Ready</span>
                                </div>
                                <div className="w-full h-2 bg-[#ece9fe] rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-[#5720B7] rounded-full transition-all duration-300" 
                                    style={{ width: `${product.launchProgress}%` }} 
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                          {/* Collapsible Drawer */}
                          {expandedProductId === product.id && (
                            <tr key={`${product.id}-drawer`}>
                              <td colSpan={4} className="px-6 py-4 bg-[#FAFBFC] border-t border-[#F0F1F2]">
                                <div className="space-y-4">
                                  <p className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A] mb-3">
                                    Component Compliance Status
                                  </p>
                                  <div className="grid grid-cols-2 gap-3">
                                    {product.components.map((component, idx) => (
                                      <button
                                        key={`${component.id}-${idx}`}
                                        onClick={(e) => handleComponentClick(component, e)}
                                        className="bg-white rounded-lg border border-[#F0F1F2] p-4 hover:border-[#5720B7] hover:bg-[#ece9fe] transition-all text-left"
                                      >
                                        <div className="flex items-start justify-between mb-2">
                                          <div className="flex items-center gap-2">
                                            {component.type === 'AI System' ? (
                                              <BrainCircuit className="w-4 h-4 text-[#5720B7]" />
                                            ) : (
                                              <Database className="w-4 h-4 text-[#5720B7]" />
                                            )}
                                            <span className="font-['Roboto',sans-serif] font-medium text-xs text-[#565F6C]">
                                              {component.type}
                                            </span>
                                          </div>
                                          <span className="font-['Roboto',sans-serif] font-semibold text-xs text-[#5720B7]">
                                            {component.complianceProgress}%
                                          </span>
                                        </div>
                                        <p className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                                          {component.name}
                                        </p>
                                        <div className="w-full h-1.5 bg-[#ece9fe] rounded-full overflow-hidden">
                                          <div
                                            className="h-full bg-[#5720B7] rounded-full transition-all duration-300"
                                            style={{ width: `${component.complianceProgress}%` }}
                                          />
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>

                {productReadiness.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="font-['Roboto',sans-serif] font-medium text-base text-[#565F6C]">No products found</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── AI System tab ─────────────────────────────────────────────────── */}
          {activeLevel === 'AI System' && (
            <div>
              <div className="mb-6">
                <h3 className="font-['Roboto',sans-serif] font-bold text-lg text-[#22262A]">
                  Compliance projects
                </h3>
                <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#565F6C] mt-0.5">
                  Per-system compliance assessments linked to your AI Inventory
                </p>
              </div>

              {/* Alert Banner */}
              {nonCompliantProjects.length > 0 && (
                <div className="bg-[#ece9fe] border-l-4 border-[#5720B7] rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#5720B7] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <p className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                      {nonCompliantProjects.length} project{nonCompliantProjects.length !== 1 ? 's' : ''}{' '}
                      {nonCompliantProjects.length !== 1 ? 'are' : 'is'} not compliant
                    </p>
                  </div>
                </div>
              )}

              {/* Action Bar */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-4 mb-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="font-['Roboto',sans-serif] font-semibold text-lg text-[#22262A]">{projects.length}</p>
                      <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C]">Total Projects</p>
                    </div>
                    <div className="h-10 w-px bg-[#F0F1F2]" />
                    <div>
                      <p className="font-['Roboto',sans-serif] font-semibold text-lg text-[#5720B7]">{activeProjects.length}</p>
                      <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C]">Active</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B5BCC4]" />
                      <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-64 border border-[#E5E7EB] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-1 focus:ring-[#5720B7]"
                      />
                    </div>
                    <button
                      onClick={() => setIsFilterModalOpen(true)}
                      className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm text-[#464E58] hover:bg-[#ece9fe] transition-colors flex items-center gap-2"
                    >
                      <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button
                      onClick={() => setIsSortModalOpen(true)}
                      className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm text-[#464E58] hover:bg-[#ece9fe] transition-colors flex items-center gap-2"
                    >
                      <ArrowUpDown className="w-4 h-4" /> Sort
                    </button>
                  </div>
                </div>
              </div>

              {/* Projects Table */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm overflow-hidden">
                {selectedProjects.length > 0 && (
                  <div className="bg-[#ece9fe] border-b border-[#F0F1F2] px-6 py-3 flex items-center justify-between">
                    <p className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                      {selectedProjects.length} project{selectedProjects.length !== 1 ? 's' : ''} selected
                    </p>
                    <div className="flex items-center gap-3">
                      <button onClick={handleArchiveSelected} className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm text-[#464E58] hover:bg-[#ece9fe] transition-colors flex items-center gap-2">
                        <Archive className="w-4 h-4" /> Archive
                      </button>
                      <button onClick={handleDeleteSelected} className="px-4 py-2 bg-[#5720B7] text-white rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#4a1b99] transition-colors flex items-center gap-2">
                        <Trash2 className="w-4 h-4" /> Delete
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
                            className="w-4 h-4 text-[#5720B7] border-[#B5BCC4] rounded focus:ring-[#5720B7]"
                          />
                        </th>
                        {['AI System', 'Risk Classification', 'Role', 'Compliance Manager', 'Progress', 'Blockers'].map(col => (
                          <th key={col} className="px-6 py-4 text-left font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0F1F2]">
                      {projects
                        .filter(p => !searchTerm || p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) || p.sourceSystem.toLowerCase().includes(searchTerm.toLowerCase()))
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map(project => (
                        <tr
                          key={project.id}
                          onClick={() => handleGoToWorkspace(project.id)}
                          className="hover:bg-[#ece9fe] transition-colors cursor-pointer"
                        >
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedProjects.includes(project.id)}
                              onChange={e => { e.stopPropagation(); handleSelectProject(project.id); }}
                              onClick={e => e.stopPropagation()}
                              className="w-4 h-4 text-[#5720B7] border-[#B5BCC4] rounded focus:ring-[#5720B7]"
                            />
                          </td>
                          {/* AI System — first data column */}
                          <td className="px-6 py-4">
                            <button onClick={e => { e.stopPropagation(); handleViewInventorySystem(project.sourceSystemId); }} className="group text-left">
                              <p className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A] group-hover:text-[#5720B7] transition-colors">
                                {project.sourceSystem}
                              </p>
                              <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#B5BCC4] mt-0.5">
                                Updated {new Date(project.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </p>
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2.5 py-1 rounded-full font-['Roboto',sans-serif] font-medium text-xs ${getRiskColor(project.riskClassification)}`}>
                              {project.riskClassification}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-['Roboto',sans-serif] font-medium text-sm text-[#22262A]">{project.role}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-['Roboto',sans-serif] font-medium text-sm text-[#22262A]">{project.complianceManager}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">{project.progressPercentage}%</span>
                                <span className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C]">Complete</span>
                              </div>
                              <div className="w-full h-2 bg-[#ece9fe] rounded-full overflow-hidden">
                                <div className="h-full bg-[#5720B7] rounded-full transition-all duration-300" style={{ width: `${project.progressPercentage}%` }} />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {project.criticalBlockers + project.moderateBlockers > 0 ? (
                              <span className="font-['Roboto',sans-serif] font-medium text-sm text-[#5720B7]">
                                {project.criticalBlockers + project.moderateBlockers} item{project.criticalBlockers + project.moderateBlockers !== 1 ? 's' : ''} to complete
                              </span>
                            ) : (
                              <span className="font-['Roboto',sans-serif] font-medium text-sm text-[#065F46]">No Blocker</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {projects.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="font-['Roboto',sans-serif] font-medium text-base text-[#565F6C]">No compliance projects found</p>
                    <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#B5BCC4] mt-2">Click "New Project" to get started</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-between">
                <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#565F6C]">
                  Showing {projects.length} project{projects.length !== 1 ? 's' : ''}
                </p>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => setCurrentPage(p => p - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#ece9fe] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <div className="flex items-center gap-2">
                    {renderPageNumbers().map((page, i) =>
                      typeof page === 'number' ? (
                        <button
                          key={`page-${page}`}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg font-['Roboto',sans-serif] font-semibold text-sm transition-colors ${
                            currentPage === page
                              ? 'bg-[#ece9fe] text-[#5720B7] border border-[#ddd6fe]'
                              : 'bg-white border border-[#B5BCC4] text-[#464E58] hover:bg-[#ece9fe]'
                          }`}
                        >
                          {page}
                        </button>
                      ) : (
                        <span key={`ellipsis-${i}`} className="px-2 font-['Roboto',sans-serif] font-semibold text-sm text-[#B5BCC4]">{page}</span>
                      )
                    )}
                  </div>
                  <button
                    onClick={() => setCurrentPage(p => p + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#ece9fe] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Dataset tab ───────────────────────────────────────────────────── */}
          {activeLevel === 'Dataset' && (
            <div>
              <div className="mb-6">
                <h3 className="font-['Roboto',sans-serif] font-bold text-lg text-[#22262A]">
                  Dataset Compliance Tracking
                </h3>
                <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#565F6C] mt-0.5">
                  Per-dataset compliance tracking linked to your Dataset Inventory
                </p>
              </div>

              {/* Action Bar */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-4 mb-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="font-['Roboto',sans-serif] font-semibold text-lg text-[#22262A]">{datasets.length}</p>
                      <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C]">Total Datasets</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B5BCC4]" />
                      <input
                        type="text"
                        placeholder="Search datasets..."
                        value={datasetSearchTerm}
                        onChange={e => setDatasetSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-64 border border-[#E5E7EB] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-1 focus:ring-[#5720B7]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Datasets Table */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#FAFBFC] border-b border-[#F0F1F2]">
                      <tr>
                        {['Dataset Name', 'Data Type', 'Data Owner', 'Compliance Score', 'Issues'].map(col => (
                          <th key={col} className="px-6 py-4 text-left font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0F1F2]">
                      {datasets
                        .filter(d => !datasetSearchTerm || d.datasetName.toLowerCase().includes(datasetSearchTerm.toLowerCase()))
                        .map(dataset => (
                        <tr
                          key={dataset.id}
                          onClick={() => setSelectedDataset(dataset.id)}
                          className="hover:bg-[#ece9fe] transition-colors cursor-pointer"
                        >
                          <td className="px-6 py-4">
                            <p className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">
                              {dataset.datasetName}
                            </p>
                            <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#B5BCC4] mt-0.5">
                              Updated {new Date(dataset.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-['Roboto',sans-serif] font-medium text-sm text-[#22262A]">{dataset.dataType}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-['Roboto',sans-serif] font-medium text-sm text-[#22262A]">{dataset.dataOwner}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">{dataset.complianceScore}%</span>
                                <span className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C]">Complete</span>
                              </div>
                              <div className="w-full h-2 bg-[#ece9fe] rounded-full overflow-hidden">
                                <div className="h-full bg-[#5720B7] rounded-full transition-all duration-300" style={{ width: `${dataset.complianceScore}%` }} />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {dataset.criticalIssues + dataset.moderateIssues > 0 ? (
                              <span className="font-['Roboto',sans-serif] font-medium text-sm text-[#5720B7]">
                                {dataset.criticalIssues + dataset.moderateIssues} issue{dataset.criticalIssues + dataset.moderateIssues !== 1 ? 's' : ''}
                              </span>
                            ) : (
                              <span className="font-['Roboto',sans-serif] font-medium text-sm text-[#065F46]">No Issues</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {datasets.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="font-['Roboto',sans-serif] font-medium text-base text-[#565F6C]">No datasets found</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── Modals ────────────────────────────────────────────────────────────── */}
      <NewComplianceProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        availableSystems={availableAISystems}
        onCreateProject={handleCreateProject}
      />
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        currentFilters={filterOptions}
        onApply={setFilterOptions}
      />
      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
        currentSort={sortOptions}
        onApply={setSortOptions}
      />
    </div>
  );
}