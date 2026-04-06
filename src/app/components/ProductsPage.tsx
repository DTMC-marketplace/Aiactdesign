import { useState, useMemo } from 'react';
import {
  Plus, X, Search, Shield, AlertTriangle, CheckCircle,
  ChevronRight, Link2, FileText, History,
  Users, ExternalLink, Package, Zap,
  Filter as FilterIcon, TrendingUp, Eye,
  BookOpen, GitBranch, Activity, Pencil, Check,
  Cpu, Database,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';
type ProductStatus = 'Active' | 'In Review' | 'Deprecated' | 'Draft';

interface FrameworkScore { name: string; score: number; articles: string; }
interface AuditEntry    { id: string; date: string; user: string; change: string; }

interface ConnectedComponents {
  aiSystems: string[];
  aiModels:  string[];
  datasets:  string[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  riskLevel: RiskLevel;
  riskScore: number;
  regulatoryCategory: string;
  complianceScore: number;
  frameworks: FrameworkScore[];
  owner: string;
  ownerEmail: string;
  team: string;
  deploymentDate: string;
  lastReviewed: string;
  hasTechnicalDocs: boolean;
  technicalDocsUrl: string;
  connectedComponents: ConnectedComponents;
  status: ProductStatus;
  auditLog: AuditEntry[];
}

// ─── Colour helpers (minimal palette) ────────────────────────────────────────
// Brand purple: #5720B7 / light: #ece9fe / border: #E5E7EB / text: #22262A / muted: #6B7280
function riskPill(level: RiskLevel) {
  // pill style matching the reference image
  const map: Record<RiskLevel, string> = {
    Critical: 'bg-[#FEE2E2] text-[#991B1B]',
    High:     'bg-[#FED7AA] text-[#92400E]',
    Medium:   'bg-[#FEF9C3] text-[#854D0E]',
    Low:      'bg-[#DCFCE7] text-[#166534]',
  };
  return map[level];
}
function riskLabel(level: RiskLevel) {
  const map: Record<RiskLevel, string> = {
    Critical: 'Critical-Risk', High: 'High-Risk', Medium: 'Medium-Risk', Low: 'Low-Risk',
  };
  return map[level];
}
function complianceColor(score: number) {
  if (score >= 75) return 'text-[#166534]';
  if (score >= 50) return 'text-[#854D0E]';
  return 'text-[#991B1B]';
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1', name: 'Sola Recruitment AI',
    description: 'End-to-end AI-powered recruitment platform using NLP and computer vision to screen, rank, and shortlist candidates from CVs and video interviews.',
    category: 'HR & Workforce', version: 'v3.2.1',
    riskLevel: 'High', riskScore: 72,
    regulatoryCategory: 'EU AI Act — Annex III (Employment)',
    complianceScore: 65,
    frameworks: [
      { name: 'EU AI Act', score: 65, articles: 'Art. 9, 10, 13, 14' },
      { name: 'GDPR',      score: 74, articles: 'Art. 5, 6, 22, 35'  },
      { name: 'DSA',       score: 58, articles: 'Art. 17, 22'         },
    ],
    owner: 'Sarah Chen', ownerEmail: 's.chen@company.com', team: 'AI Platform',
    deploymentDate: 'Jun 12, 2024', lastReviewed: 'Feb 28, 2026',
    hasTechnicalDocs: true, technicalDocsUrl: '#',
    connectedComponents: {
      aiSystems: ['Resume Scoring Model v3.2', 'Video Interview Analyzer', 'Candidate Data Pipeline'],
      aiModels:  [],
      datasets:  [],
    },
    status: 'Active',
    auditLog: [
      { id: 'a1a', date: 'Jun 12, 2024', user: 'Sarah Chen',   change: 'Product registered. Initial risk: High.' },
      { id: 'a1b', date: 'Nov 5, 2024',  user: 'James Okafor', change: 'EU AI Act Annex III confirmed. Technical documentation uploaded.' },
      { id: 'a1c', date: 'Feb 28, 2026', user: 'Sarah Chen',   change: 'Annual review. Compliance score 58% → 65%. DPIA signed off.' },
    ],
  },
  {
    id: 'p2', name: 'DocuVerify Intelligence',
    description: 'Automated document verification and fraud detection using deep learning to authenticate identity documents, contracts, and financial records.',
    category: 'Compliance & Legal', version: 'v1.4.0',
    riskLevel: 'High', riskScore: 68,
    regulatoryCategory: 'EU AI Act — Annex III (Law Enforcement)',
    complianceScore: 42,
    frameworks: [
      { name: 'EU AI Act', score: 38, articles: 'Art. 9, 10, 12, 13' },
      { name: 'GDPR',      score: 51, articles: 'Art. 5, 6, 9, 35'   },
      { name: 'DSA',       score: 40, articles: 'Art. 17, 27'         },
    ],
    owner: 'James Okafor', ownerEmail: 'j.okafor@company.com', team: 'Trust & Safety',
    deploymentDate: 'Jan 8, 2025', lastReviewed: 'Jan 15, 2026',
    hasTechnicalDocs: false, technicalDocsUrl: '',
    connectedComponents: {
      aiSystems: ['DocuVerify Core Model v1.4', 'Fraud Signal Database'],
      aiModels:  [],
      datasets:  [],
    },
    status: 'In Review',
    auditLog: [
      { id: 'a2a', date: 'Jan 8, 2025',  user: 'James Okafor', change: 'Product registered. Initial risk: High (Annex III).' },
      { id: 'a2b', date: 'Jan 15, 2026', user: 'DPO Review',   change: 'Technical docs flagged missing. Status set to "In Review".' },
    ],
  },
  {
    id: 'p3', name: 'SmartHire Analytics',
    description: 'Workforce analytics and succession planning using predictive modelling to identify high-potential employees and skill gaps.',
    category: 'HR & Workforce', version: 'v2.1.3',
    riskLevel: 'Medium', riskScore: 44,
    regulatoryCategory: 'EU AI Act — General Purpose AI',
    complianceScore: 78,
    frameworks: [
      { name: 'EU AI Act', score: 80, articles: 'Art. 50, 51, 52' },
      { name: 'GDPR',      score: 82, articles: 'Art. 5, 6, 13'   },
      { name: 'DSA',       score: 69, articles: 'Art. 14'          },
    ],
    owner: 'Priya Kumar', ownerEmail: 'p.kumar@company.com', team: 'People Analytics',
    deploymentDate: 'Mar 22, 2024', lastReviewed: 'Mar 1, 2026',
    hasTechnicalDocs: true, technicalDocsUrl: '#',
    connectedComponents: {
      aiSystems: ['Employee Performance Model v2.1', 'Skill Graph Engine'],
      aiModels:  [],
      datasets:  [],
    },
    status: 'Active',
    auditLog: [
      { id: 'a3a', date: 'Mar 22, 2024', user: 'Priya Kumar', change: 'Product registered. Classification: Medium Risk.' },
      { id: 'a3b', date: 'Sep 10, 2024', user: 'Alex Nguyen', change: 'DPIA completed. Score 71% → 78%.' },
      { id: 'a3c', date: 'Mar 1, 2026',  user: 'Priya Kumar', change: 'Bi-annual review. No material changes.' },
    ],
  },
  {
    id: 'p4', name: 'AccessControl Vision',
    description: 'Biometric physical access control using real-time facial recognition to manage building access across all corporate facilities.',
    category: 'Security & Surveillance', version: 'v4.0.2',
    riskLevel: 'Critical', riskScore: 91,
    regulatoryCategory: 'EU AI Act — Annex III (Biometrics)',
    complianceScore: 23,
    frameworks: [
      { name: 'EU AI Act', score: 20, articles: 'Art. 9–15' },
      { name: 'GDPR',      score: 28, articles: 'Art. 9, 22, 35' },
      { name: 'DSA',       score: 24, articles: 'Art. 17, 22, 27' },
    ],
    owner: 'Wei Zhang', ownerEmail: 'w.zhang@company.com', team: 'Physical Security',
    deploymentDate: 'Oct 3, 2023', lastReviewed: 'Nov 20, 2025',
    hasTechnicalDocs: false, technicalDocsUrl: '',
    connectedComponents: {
      aiSystems: ['Facial Recognition Engine v4.0', 'Access Log Database', 'CCTV Integration Layer'],
      aiModels:  [],
      datasets:  [],
    },
    status: 'In Review',
    auditLog: [
      { id: 'a4a', date: 'Oct 3, 2023',  user: 'Wei Zhang',  change: 'Product registered. Provisional risk: High.' },
      { id: 'a4b', date: 'Apr 15, 2025', user: 'Legal Team', change: 'Reclassified to Critical — EU AI Act Annex III Biometrics.' },
      { id: 'a4c', date: 'Nov 20, 2025', user: 'DPO Review', change: 'Status "In Review". Score 23%. Action required within 30 days.' },
    ],
  },
  {
    id: 'p5', name: 'MarketPulse AI',
    description: 'Real-time market intelligence using NLP to analyse news, filings, and social signals for investment decision support.',
    category: 'Finance & Analytics', version: 'v5.3.0',
    riskLevel: 'Low', riskScore: 18,
    regulatoryCategory: 'EU AI Act — Minimal Risk',
    complianceScore: 91,
    frameworks: [
      { name: 'EU AI Act', score: 95, articles: 'Art. 69' },
      { name: 'GDPR',      score: 90, articles: 'Art. 5, 6' },
      { name: 'DSA',       score: 88, articles: 'Art. 14'   },
    ],
    owner: 'Alex Nguyen', ownerEmail: 'a.nguyen@company.com', team: 'Data & Insights',
    deploymentDate: 'Feb 1, 2023', lastReviewed: 'Mar 5, 2026',
    hasTechnicalDocs: true, technicalDocsUrl: '#',
    connectedComponents: {
      aiSystems: ['NLP Sentiment Engine v5.3', 'Market Data Feed'],
      aiModels:  [],
      datasets:  [],
    },
    status: 'Active',
    auditLog: [
      { id: 'a5a', date: 'Feb 1, 2023', user: 'Alex Nguyen', change: 'Product registered. Minimal Risk classification.' },
      { id: 'a5b', date: 'Mar 5, 2026', user: 'Alex Nguyen', change: 'Annual review. Score maintained at 91%.' },
    ],
  },
  {
    id: 'p6', name: 'DataLens Profiler',
    description: 'Customer data profiling and segmentation using unsupervised ML to create behavioural clusters for personalised marketing.',
    category: 'Marketing & CX', version: 'v2.8.1',
    riskLevel: 'Medium', riskScore: 51,
    regulatoryCategory: 'EU AI Act — General Purpose AI',
    complianceScore: 58,
    frameworks: [
      { name: 'EU AI Act', score: 55, articles: 'Art. 50, 51'       },
      { name: 'GDPR',      score: 62, articles: 'Art. 5, 6, 13, 22' },
      { name: 'DSA',       score: 57, articles: 'Art. 22, 27'       },
    ],
    owner: 'Lisa Park', ownerEmail: 'l.park@company.com', team: 'Growth & Marketing',
    deploymentDate: 'Aug 14, 2024', lastReviewed: 'Feb 10, 2026',
    hasTechnicalDocs: true, technicalDocsUrl: '#',
    connectedComponents: {
      aiSystems: ['Customer Segmentation Model v2.8', 'CDP Integration Layer'],
      aiModels:  [],
      datasets:  [],
    },
    status: 'Active',
    auditLog: [
      { id: 'a6a', date: 'Aug 14, 2024', user: 'Lisa Park', change: 'Product registered. Medium Risk.' },
      { id: 'a6b', date: 'Feb 10, 2026', user: 'Lisa Park', change: 'Score 50% → 58% after GDPR Art. 22 review.' },
    ],
  },
  {
    id: 'p7', name: 'PredictiveCare Platform',
    description: 'Patient outcome modelling for hospital ICUs — forecasts deterioration and recommends triage prioritisation using clinical data.',
    category: 'Healthcare', version: 'v1.0.5',
    riskLevel: 'Critical', riskScore: 88,
    regulatoryCategory: 'EU AI Act — Annex III (Medical Devices)',
    complianceScore: 34,
    frameworks: [
      { name: 'EU AI Act', score: 30, articles: 'Art. 9–15'      },
      { name: 'GDPR',      score: 40, articles: 'Art. 9, 22, 35' },
      { name: 'DSA',       score: 33, articles: 'Art. 17'         },
    ],
    owner: 'Mike Rosso', ownerEmail: 'm.rosso@company.com', team: 'Health AI',
    deploymentDate: 'Dec 1, 2025', lastReviewed: 'Feb 5, 2026',
    hasTechnicalDocs: true, technicalDocsUrl: '#',
    connectedComponents: {
      aiSystems: ['ICU Outcome Model v1.0', 'Clinical Data Warehouse', 'EHR Integration Layer'],
      aiModels:  [],
      datasets:  [],
    },
    status: 'In Review',
    auditLog: [
      { id: 'a7a', date: 'Dec 1, 2025', user: 'Mike Rosso', change: 'Product registered. Critical Risk — EU AI Act Annex III (Medical Devices).' },
      { id: 'a7b', date: 'Feb 5, 2026', user: 'DPO Review', change: 'Initial audit: 34%. Art. 9 risk plan required.' },
    ],
  },
];

const RISK_FILTER_OPTIONS   = ['All Risk Levels', 'Critical', 'High', 'Medium', 'Low'];
const STATUS_FILTER_OPTIONS = ['All Statuses', 'Active', 'In Review', 'Deprecated', 'Draft'];

// ─── Shared drawer edit controls ─────────────────────────────────────────────
function EditBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="ml-auto p-1 rounded hover:bg-[#ece9fe] text-[#9CA3AF] hover:text-[#5720B7] transition-colors" title="Edit section">
      <Pencil className="w-3 h-3" />
    </button>
  );
}
function SaveCancelBtns({ onSave, onCancel }: { onSave: () => void; onCancel: () => void }) {
  return (
    <div className="ml-auto flex items-center gap-1">
      <button onClick={onCancel} className="p-1 rounded hover:bg-[#FEE2E2] text-[#9CA3AF] hover:text-[#991B1B] transition-colors" title="Discard"><X className="w-3 h-3" /></button>
      <button onClick={onSave}   className="p-1 rounded hover:bg-[#DCFCE7] text-[#9CA3AF] hover:text-[#166534] transition-colors" title="Save"><Check className="w-3 h-3" /></button>
    </div>
  );
}

// ─── Product Drawer ───────────────────────────────────────────────────────────
function ProductDrawer({ product, onClose, onUpdate }: {
  product: Product;
  onClose: () => void;
  onUpdate: (updates: Partial<Product>) => void;
}) {
  const missingDocs = (product.riskLevel === 'Critical' || product.riskLevel === 'High') && !product.hasTechnicalDocs;

  const sectionTitle = "font-['Montserrat',sans-serif] font-bold text-xs text-[#6B7280] uppercase tracking-widest flex items-center gap-2";
  const chip         = "px-2 py-0.5 rounded text-xs font-['Roboto',sans-serif] font-medium bg-[#F3F4F6] text-[#6B7280]";
  const inputCls     = "w-full px-2.5 py-1.5 border border-[#E5E7EB] rounded-lg font-['Roboto',sans-serif] text-sm text-[#22262A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#5720B7] focus:ring-1 focus:ring-[#ece9fe] transition-colors bg-white";

  // ── Overview edit state ──
  const [editingOverview,     setEditingOverview]     = useState(false);
  const [draftDescription,    setDraftDescription]    = useState(product.description);
  const [draftCategory,       setDraftCategory]       = useState(product.category);
  const [draftVersion,        setDraftVersion]        = useState(product.version);
  const [draftDeploymentDate, setDraftDeploymentDate] = useState(product.deploymentDate);
  const [draftLastReviewed,   setDraftLastReviewed]   = useState(product.lastReviewed);

  const cancelOverview = () => {
    setDraftDescription(product.description); setDraftCategory(product.category);
    setDraftVersion(product.version); setDraftDeploymentDate(product.deploymentDate);
    setDraftLastReviewed(product.lastReviewed); setEditingOverview(false);
  };
  const saveOverview = () => {
    const changes: string[] = [];
    if (draftDescription    !== product.description)    changes.push('Description updated');
    if (draftCategory       !== product.category)       changes.push(`Category → "${draftCategory}"`);
    if (draftVersion        !== product.version)        changes.push(`Version → ${draftVersion}`);
    if (draftDeploymentDate !== product.deploymentDate) changes.push(`Deployed → ${draftDeploymentDate}`);
    onUpdate({
      description: draftDescription, category: draftCategory,
      version: draftVersion, deploymentDate: draftDeploymentDate, lastReviewed: draftLastReviewed,
      auditLog: changes.length ? [...product.auditLog, { id: `a${Date.now()}`, date: 'Mar 10, 2026', user: 'You', change: `Overview edited: ${changes.join('; ')}.` }] : product.auditLog,
    });
    setEditingOverview(false);
  };

  // ── Owner edit state ──
  const [editingOwner,    setEditingOwner]    = useState(false);
  const [draftOwner,      setDraftOwner]      = useState(product.owner);
  const [draftOwnerEmail, setDraftOwnerEmail] = useState(product.ownerEmail);
  const [draftTeam,       setDraftTeam]       = useState(product.team);

  const cancelOwner = () => {
    setDraftOwner(product.owner); setDraftOwnerEmail(product.ownerEmail);
    setDraftTeam(product.team); setEditingOwner(false);
  };
  const saveOwner = () => {
    const changes: string[] = [];
    if (draftOwner      !== product.owner)      changes.push(`Owner → "${draftOwner}"`);
    if (draftOwnerEmail !== product.ownerEmail) changes.push(`Email → ${draftOwnerEmail}`);
    if (draftTeam       !== product.team)       changes.push(`Team → "${draftTeam}"`);
    onUpdate({
      owner: draftOwner, ownerEmail: draftOwnerEmail, team: draftTeam,
      auditLog: changes.length ? [...product.auditLog, { id: `a${Date.now()}`, date: 'Mar 10, 2026', user: 'You', change: `Ownership updated: ${changes.join('; ')}.` }] : product.auditLog,
    });
    setEditingOwner(false);
  };

  // ── Connected Components edit state ──
  const [editingConn, setEditingConn] = useState(false);
  const cc = product.connectedComponents ?? { aiSystems: [], aiModels: [], datasets: [] };
  const [draftAiSystems, setDraftAiSystems] = useState<string[]>(cc.aiSystems ?? []);
  const [draftAiModels,  setDraftAiModels]  = useState<string[]>(cc.aiModels  ?? []);
  const [draftDatasets,  setDraftDatasets]  = useState<string[]>(cc.datasets  ?? []);
  const [newAiSystem, setNewAiSystem] = useState('');
  const [newAiModel,  setNewAiModel]  = useState('');
  const [newDataset,  setNewDataset]  = useState('');

  const cancelConn = () => {
    setDraftAiSystems(cc.aiSystems ?? []); setDraftAiModels(cc.aiModels ?? []);
    setDraftDatasets(cc.datasets   ?? []); setNewAiSystem(''); setNewAiModel(''); setNewDataset('');
    setEditingConn(false);
  };
  const saveConn = () => {
    onUpdate({
      connectedComponents: { aiSystems: draftAiSystems, aiModels: draftAiModels, datasets: draftDatasets },
      auditLog: [...product.auditLog, { id: `a${Date.now()}`, date: 'Mar 10, 2026', user: 'You', change: `Connected Components updated: ${draftAiSystems.length} AI Systems, ${draftAiModels.length} AI Models, ${draftDatasets.length} Datasets.` }],
    });
    setNewAiSystem(''); setNewAiModel(''); setNewDataset(''); setEditingConn(false);
  };
  const addItem    = (list: string[], setList: (v: string[]) => void, val: string) => { if (val.trim()) setList([...list, val.trim()]); };
  const removeItem = (list: string[], setList: (v: string[]) => void, idx: number)  => setList(list.filter((_, i) => i !== idx));

  // display values (use draft when in edit mode so UI is live)
  const displayDescription  = editingOverview ? draftDescription    : product.description;
  const displayCategory     = editingOverview ? draftCategory       : product.category;
  const displayVersion      = editingOverview ? draftVersion        : product.version;
  const displayDeployDate   = editingOverview ? draftDeploymentDate : product.deploymentDate;
  const displayLastReviewed = editingOverview ? draftLastReviewed   : product.lastReviewed;
  const displayOwner        = editingOwner    ? draftOwner          : product.owner;
  const displayOwnerEmail   = editingOwner    ? draftOwnerEmail     : product.ownerEmail;
  const displayTeam         = editingOwner    ? draftTeam           : product.team;
  const displayAiSystems    = editingConn     ? draftAiSystems      : (cc.aiSystems ?? []);
  const displayAiModels     = editingConn     ? draftAiModels       : (cc.aiModels  ?? []);
  const displayDatasets     = editingConn     ? draftDatasets       : (cc.datasets  ?? []);

  return (
    <div className="bg-[#F9FAFB] border-t border-b border-[#E5E7EB]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3.5 bg-white border-b border-[#E5E7EB] sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#ece9fe] rounded-lg flex items-center justify-center shrink-0">
            <Package className="w-4 h-4 text-[#5720B7]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A]">{product.name}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-['Roboto',sans-serif] font-semibold ${riskPill(product.riskLevel)}`}>
                {riskLabel(product.riskLevel)}
              </span>
              {missingDocs && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#854D0E] text-xs font-['Roboto',sans-serif] font-semibold">
                  <AlertTriangle className="w-3 h-3" /> Docs Missing
                </span>
              )}
            </div>
            <span className="font-['Roboto',sans-serif] text-xs text-[#6B7280]">{product.regulatoryCategory} · {product.version}</span>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F3F4F6] transition-colors">
          <X className="w-4 h-4 text-[#6B7280]" />
        </button>
      </div>

      <div className="px-6 py-5 space-y-5">

        {/* ── Overview + Owner ── */}
        <div className="grid grid-cols-3 gap-4">
          {/* Overview */}
          <div className={`col-span-2 bg-white rounded-xl border p-4 transition-colors ${editingOverview ? 'border-[#5720B7] ring-1 ring-[#ece9fe]' : 'border-[#E5E7EB]'}`}>
            <div className={`${sectionTitle} mb-3`}>
              <BookOpen className="w-3.5 h-3.5" /> Overview
              {editingOverview
                ? <SaveCancelBtns onSave={saveOverview} onCancel={cancelOverview} />
                : <EditBtn onClick={() => setEditingOverview(true)} />}
            </div>
            {editingOverview ? (
              <div className="space-y-2">
                <textarea value={draftDescription} onChange={e => setDraftDescription(e.target.value)} rows={3}
                  className={`${inputCls} resize-none`} placeholder="Description…" />
                <div className="flex gap-2 flex-wrap">
                  <input value={draftCategory}       onChange={e => setDraftCategory(e.target.value)}
                    className="px-2 py-0.5 rounded border border-[#E5E7EB] text-xs font-['Roboto',sans-serif] text-[#22262A] focus:outline-none focus:border-[#5720B7] bg-white w-36" placeholder="Category" />
                  <input value={draftVersion}        onChange={e => setDraftVersion(e.target.value)}
                    className="px-2 py-0.5 rounded border border-[#E5E7EB] text-xs font-['Roboto',sans-serif] text-[#22262A] focus:outline-none focus:border-[#5720B7] bg-white w-24" placeholder="Version" />
                  <input value={draftDeploymentDate} onChange={e => setDraftDeploymentDate(e.target.value)}
                    className="px-2 py-0.5 rounded border border-[#E5E7EB] text-xs font-['Roboto',sans-serif] text-[#22262A] focus:outline-none focus:border-[#5720B7] bg-white w-36" placeholder="Deployed date" />
                  <input value={draftLastReviewed}   onChange={e => setDraftLastReviewed(e.target.value)}
                    className="px-2 py-0.5 rounded border border-[#E5E7EB] text-xs font-['Roboto',sans-serif] text-[#22262A] focus:outline-none focus:border-[#5720B7] bg-white w-36" placeholder="Reviewed date" />
                </div>
              </div>
            ) : (
              <>
                <p className="font-['Roboto',sans-serif] text-sm text-[#22262A] leading-relaxed mb-3">{displayDescription}</p>
                <div className="flex gap-2 flex-wrap">
                  <span className={chip}>{displayCategory}</span>
                  <span className={chip}>{displayVersion}</span>
                  <span className={chip}>Deployed {displayDeployDate}</span>
                  <span className={chip}>Reviewed {displayLastReviewed}</span>
                </div>
              </>
            )}
          </div>

          {/* Owner */}
          <div className={`bg-white rounded-xl border p-4 transition-colors ${editingOwner ? 'border-[#5720B7] ring-1 ring-[#ece9fe]' : 'border-[#E5E7EB]'}`}>
            <div className={`${sectionTitle} mb-3`}>
              <Users className="w-3.5 h-3.5" /> Owner
              {editingOwner
                ? <SaveCancelBtns onSave={saveOwner} onCancel={cancelOwner} />
                : <EditBtn onClick={() => setEditingOwner(true)} />}
            </div>
            {editingOwner ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-9 h-9 rounded-full bg-[#5720B7] flex items-center justify-center shrink-0">
                    <span className="font-['Montserrat',sans-serif] font-bold text-xs text-white">
                      {draftOwner.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase() || '?'}
                    </span>
                  </div>
                  <input value={draftOwner} onChange={e => setDraftOwner(e.target.value)}
                    className={`${inputCls} flex-1`} placeholder="Owner name" />
                </div>
                <input value={draftTeam}       onChange={e => setDraftTeam(e.target.value)}       className={inputCls} placeholder="Team" />
                <input value={draftOwnerEmail} onChange={e => setDraftOwnerEmail(e.target.value)} className={inputCls} placeholder="Email" type="email" />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#5720B7] flex items-center justify-center shrink-0">
                    <span className="font-['Montserrat',sans-serif] font-bold text-xs text-white">
                      {displayOwner.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-['Roboto',sans-serif] font-bold text-sm text-[#22262A]">{displayOwner}</p>
                    <p className="font-['Roboto',sans-serif] text-xs text-[#6B7280]">{displayTeam}</p>
                  </div>
                </div>
                <div className="text-xs font-['Roboto',sans-serif] text-[#6B7280]">{displayOwnerEmail}</div>
              </>
            )}
          </div>
        </div>

        {/* ── Compliance Frameworks ── */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-white rounded-xl border border-[#E5E7EB] p-4">
            <p className={`${sectionTitle} mb-3`}><Shield className="w-3.5 h-3.5" /> Compliance by Framework</p>
            {/* Overall */}
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[#E5E7EB]">
              <div className="relative w-12 h-12 shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                  <circle cx="18" cy="18" r="14" fill="none"
                    stroke="#5720B7" strokeWidth="4"
                    strokeDasharray={`${product.complianceScore * 0.88} 88`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-['Montserrat',sans-serif] font-bold text-[10px] text-[#5720B7]">{product.complianceScore}%</span>
                </div>
              </div>
              <div>
                <p className="font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A]">Overall — {product.complianceScore}% Complete</p>
                <p className="font-['Roboto',sans-serif] text-xs text-[#6B7280]">{product.regulatoryCategory}</p>
              </div>
            </div>
            <div className="space-y-3">
              {product.frameworks.map(fw => (
                <div key={fw.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#22262A]">{fw.name}</span>
                      <span className="font-['Roboto',sans-serif] text-[10px] text-[#6B7280]">{fw.articles}</span>
                    </div>
                    <span className={`font-['Roboto',sans-serif] font-bold text-sm ${complianceColor(fw.score)}`}>{fw.score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-[#5720B7] transition-all" style={{ width: `${fw.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Risk */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
              <p className={`${sectionTitle} mb-3`}><Zap className="w-3.5 h-3.5" /> Risk Score</p>
              <div className="text-center py-2">
                <p className="font-['Montserrat',sans-serif] font-bold text-4xl text-[#22262A] mb-1">{product.riskScore}</p>
                <span className={`inline-flex px-3 py-1 rounded-full font-['Roboto',sans-serif] font-semibold text-xs ${riskPill(product.riskLevel)}`}>
                  {riskLabel(product.riskLevel)}
                </span>
              </div>
            </div>
            {/* Technical Docs */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
              <p className={`${sectionTitle} mb-3`}><FileText className="w-3.5 h-3.5" /> Technical Docs</p>
              {product.hasTechnicalDocs ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-['Roboto',sans-serif] font-semibold text-[#166534]">
                    <CheckCircle className="w-4 h-4" /> Linked to AI Inventory
                  </div>
                  <a href={product.technicalDocsUrl} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-['Roboto',sans-serif] text-[#5720B7] hover:underline">
                    <ExternalLink className="w-3.5 h-3.5" /> Open documentation
                  </a>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-['Roboto',sans-serif] font-semibold text-[#991B1B]">
                    <AlertTriangle className="w-4 h-4" /> Missing — Action Required
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5720B7] text-white text-xs font-['Roboto',sans-serif] font-semibold hover:bg-[#4C1D95] transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Upload Docs
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Connected Components ── */}
        <div className={`bg-white rounded-xl border p-4 transition-colors ${editingConn ? 'border-[#5720B7] ring-1 ring-[#ece9fe]' : 'border-[#E5E7EB]'}`}>
          <div className={`${sectionTitle} mb-3`}>
            <GitBranch className="w-3.5 h-3.5" /> Connected Components
            {editingConn
              ? <SaveCancelBtns onSave={saveConn} onCancel={cancelConn} />
              : <EditBtn onClick={() => setEditingConn(true)} />}
          </div>

          <div className="space-y-3">
            {/* AI Systems */}
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Activity className="w-3 h-3 text-[#5720B7]" />
                <span className="font-['Roboto',sans-serif] font-semibold text-[10px] text-[#6B7280] uppercase tracking-wide">AI Systems</span>
                <span className="px-1.5 py-0.5 rounded bg-[#ece9fe] text-[#5720B7] text-[10px] font-bold">{displayAiSystems.length}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {displayAiSystems.map((sys, i) => (
                  editingConn ? (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-[#E5E7EB] bg-[#F9FAFB] text-xs font-['Roboto',sans-serif] text-[#22262A]">
                      <Activity className="w-2.5 h-2.5 text-[#6B7280]" />{sys}
                      <button onClick={() => removeItem(draftAiSystems, setDraftAiSystems, i)} className="text-[#9CA3AF] hover:text-[#991B1B] ml-0.5"><X className="w-2.5 h-2.5" /></button>
                    </span>
                  ) : (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] hover:border-[#5720B7] transition-colors cursor-pointer group">
                      <Activity className="w-3 h-3 text-[#6B7280] group-hover:text-[#5720B7]" />
                      <span className="font-['Roboto',sans-serif] text-xs text-[#22262A] group-hover:text-[#5720B7]">{sys}</span>
                    </div>
                  )
                ))}
                {displayAiSystems.length === 0 && !editingConn && <p className="font-['Roboto',sans-serif] text-xs text-[#9CA3AF] italic">None linked.</p>}
                {editingConn && (
                  <div className="flex items-center gap-1">
                    <input value={newAiSystem} onChange={e => setNewAiSystem(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { addItem(draftAiSystems, setDraftAiSystems, newAiSystem); setNewAiSystem(''); } }}
                      placeholder="Add AI System…"
                      className="px-2 py-0.5 rounded border border-dashed border-[#D1D5DB] text-xs font-['Roboto',sans-serif] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#5720B7] bg-white w-44" />
                    <button onClick={() => { addItem(draftAiSystems, setDraftAiSystems, newAiSystem); setNewAiSystem(''); }}
                      className="p-0.5 rounded bg-[#ece9fe] text-[#5720B7] hover:bg-[#ddd6fe]"><Plus className="w-3 h-3" /></button>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-[#F3F4F6]" />

            {/* AI Models */}
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Cpu className="w-3 h-3 text-[#5720B7]" />
                <span className="font-['Roboto',sans-serif] font-semibold text-[10px] text-[#6B7280] uppercase tracking-wide">AI Models</span>
                <span className="px-1.5 py-0.5 rounded bg-[#ece9fe] text-[#5720B7] text-[10px] font-bold">{displayAiModels.length}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {displayAiModels.map((m, i) => (
                  editingConn ? (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-[#E5E7EB] bg-[#F9FAFB] text-xs font-['Roboto',sans-serif] text-[#22262A]">
                      <Cpu className="w-2.5 h-2.5 text-[#6B7280]" />{m}
                      <button onClick={() => removeItem(draftAiModels, setDraftAiModels, i)} className="text-[#9CA3AF] hover:text-[#991B1B] ml-0.5"><X className="w-2.5 h-2.5" /></button>
                    </span>
                  ) : (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] hover:border-[#5720B7] transition-colors cursor-pointer group">
                      <Cpu className="w-3 h-3 text-[#6B7280] group-hover:text-[#5720B7]" />
                      <span className="font-['Roboto',sans-serif] text-xs text-[#22262A] group-hover:text-[#5720B7]">{m}</span>
                    </div>
                  )
                ))}
                {displayAiModels.length === 0 && !editingConn && <p className="font-['Roboto',sans-serif] text-xs text-[#9CA3AF] italic">None linked.</p>}
                {editingConn && (
                  <div className="flex items-center gap-1">
                    <input value={newAiModel} onChange={e => setNewAiModel(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { addItem(draftAiModels, setDraftAiModels, newAiModel); setNewAiModel(''); } }}
                      placeholder="Add AI Model…"
                      className="px-2 py-0.5 rounded border border-dashed border-[#D1D5DB] text-xs font-['Roboto',sans-serif] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#5720B7] bg-white w-44" />
                    <button onClick={() => { addItem(draftAiModels, setDraftAiModels, newAiModel); setNewAiModel(''); }}
                      className="p-0.5 rounded bg-[#ece9fe] text-[#5720B7] hover:bg-[#ddd6fe]"><Plus className="w-3 h-3" /></button>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-[#F3F4F6]" />

            {/* Datasets */}
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Database className="w-3 h-3 text-[#5720B7]" />
                <span className="font-['Roboto',sans-serif] font-semibold text-[10px] text-[#6B7280] uppercase tracking-wide">Datasets</span>
                <span className="px-1.5 py-0.5 rounded bg-[#ece9fe] text-[#5720B7] text-[10px] font-bold">{displayDatasets.length}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {displayDatasets.map((d, i) => (
                  editingConn ? (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-[#E5E7EB] bg-[#F9FAFB] text-xs font-['Roboto',sans-serif] text-[#22262A]">
                      <Database className="w-2.5 h-2.5 text-[#6B7280]" />{d}
                      <button onClick={() => removeItem(draftDatasets, setDraftDatasets, i)} className="text-[#9CA3AF] hover:text-[#991B1B] ml-0.5"><X className="w-2.5 h-2.5" /></button>
                    </span>
                  ) : (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] hover:border-[#5720B7] transition-colors cursor-pointer group">
                      <Database className="w-3 h-3 text-[#6B7280] group-hover:text-[#5720B7]" />
                      <span className="font-['Roboto',sans-serif] text-xs text-[#22262A] group-hover:text-[#5720B7]">{d}</span>
                    </div>
                  )
                ))}
                {displayDatasets.length === 0 && !editingConn && <p className="font-['Roboto',sans-serif] text-xs text-[#9CA3AF] italic">None linked.</p>}
                {editingConn && (
                  <div className="flex items-center gap-1">
                    <input value={newDataset} onChange={e => setNewDataset(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { addItem(draftDatasets, setDraftDatasets, newDataset); setNewDataset(''); } }}
                      placeholder="Add Dataset…"
                      className="px-2 py-0.5 rounded border border-dashed border-[#D1D5DB] text-xs font-['Roboto',sans-serif] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#5720B7] bg-white w-44" />
                    <button onClick={() => { addItem(draftDatasets, setDraftDatasets, newDataset); setNewDataset(''); }}
                      className="p-0.5 rounded bg-[#ece9fe] text-[#5720B7] hover:bg-[#ddd6fe]"><Plus className="w-3 h-3" /></button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Audit Trail ── */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
          <p className={`${sectionTitle} mb-3`}><History className="w-3.5 h-3.5" /> Audit Trail
            <span className="ml-auto normal-case tracking-normal font-normal text-[#9CA3AF]">Read only</span>
          </p>
          <div className="relative">
            <div className="absolute left-[15px] top-0 bottom-4 w-px bg-[#E5E7EB]" />
            <div className="space-y-0">
              {(product.auditLog ?? []).map((entry, idx) => (
                <div key={entry.id} className="flex gap-3 pb-4 last:pb-0">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${idx === 0 ? 'bg-[#ece9fe] border-[#5720B7]' : 'bg-white border-[#E5E7EB]'}`}>
                    <History className={`w-3.5 h-3.5 ${idx === 0 ? 'text-[#5720B7]' : 'text-[#9CA3AF]'}`} />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-['Roboto',sans-serif] font-bold text-xs text-[#22262A]">{entry.user}</span>
                      <span className="font-['Roboto',sans-serif] text-[10px] text-[#9CA3AF]">· {entry.date}</span>
                    </div>
                    <p className="font-['Roboto',sans-serif] text-xs text-[#6B7280] leading-relaxed">{entry.change}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-3 opacity-40">
                <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#E5E7EB] flex items-center justify-center shrink-0 bg-white z-10">
                  <TrendingUp className="w-3.5 h-3.5 text-[#9CA3AF]" />
                </div>
                <p className="font-['Roboto',sans-serif] text-xs text-[#9CA3AF] italic pt-2">Future changes appear here automatically.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Product Rows ─────────────────────────────────────────────────────────────
function ProductRows({ products, expandedId, onToggle, onUpdate }: {
  products: Product[];
  expandedId: string | null;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Product>) => void;
}) {
  const rows: JSX.Element[] = [];

  products.forEach(product => {
    const isExpanded  = expandedId === product.id;
    const isDimmed    = expandedId !== null && !isExpanded;
    const missingDocs = (product.riskLevel === 'Critical' || product.riskLevel === 'High') && !product.hasTechnicalDocs;

    rows.push(
      <tr
        key={product.id}
        onClick={() => onToggle(product.id)}
        className={`cursor-pointer border-b border-[#F3F4F6] transition-all ${
          isExpanded ? 'bg-[#F5F3FF]' : 'bg-white hover:bg-[#FAFAF9]'
        } ${isDimmed ? 'opacity-40' : ''}`}
      >
        {/* Checkbox */}
        <td className="px-4 py-4 w-10" onClick={e => e.stopPropagation()}>
          <input type="checkbox" className="w-4 h-4 rounded border-[#D1D5DB] accent-[#5720B7] cursor-pointer" />
        </td>

        {/* AI System / Product Name */}
        <td className="px-4 py-4">
          <div className="flex items-center gap-1">
            <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-90 text-[#5720B7]' : 'text-[#D1D5DB]'}`} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Roboto',sans-serif] font-bold text-sm text-[#22262A]">{product.name}</span>
                {missingDocs && <AlertTriangle className="w-3.5 h-3.5 text-[#D97706] shrink-0" title="Missing technical documentation" />}
              </div>
              <p className="font-['Roboto',sans-serif] text-xs text-[#9CA3AF] mt-0.5">
                Updated {product.lastReviewed}
              </p>
            </div>
          </div>
        </td>

        {/* Risk Classification */}
        <td className="px-4 py-4">
          <span className={`inline-flex px-3 py-1 rounded-full font-['Roboto',sans-serif] font-semibold text-xs ${riskPill(product.riskLevel)}`}>
            {riskLabel(product.riskLevel)}
          </span>
        </td>

        {/* Role / Category */}
        <td className="px-4 py-4">
          <span className="font-['Roboto',sans-serif] text-sm text-[#22262A]">{product.category}</span>
        </td>

        {/* Owner */}
        <td className="px-4 py-4">
          <span className="font-['Roboto',sans-serif] text-sm text-[#22262A]">{product.owner}</span>
        </td>

        {/* Progress */}
        <td className="px-4 py-4 min-w-[160px]">
          <div className="flex items-center gap-2">
            <span className={`font-['Roboto',sans-serif] font-bold text-sm ${complianceColor(product.complianceScore)}`}>
              {product.complianceScore}%
            </span>
            <span className="font-['Roboto',sans-serif] text-sm text-[#6B7280]">Complete</span>
          </div>
          <div className="mt-1.5 w-32 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-[#5720B7] transition-all" style={{ width: `${product.complianceScore}%` }} />
          </div>
        </td>

        {/* Technical Link */}
        <td className="px-4 py-4">
          {product.hasTechnicalDocs ? (
            <Link2 className="w-4 h-4 text-[#5720B7]" title="Linked to AI Inventory" />
          ) : (
            <Link2 className="w-4 h-4 text-[#D1D5DB]" title="No documentation linked" />
          )}
        </td>
      </tr>
    );

    if (isExpanded) {
      rows.push(
        <tr key={`${product.id}-drawer`}>
          <td colSpan={7} className="p-0">
            <ProductDrawer
              product={product}
              onClose={() => onToggle(product.id)}
              onUpdate={updates => onUpdate(product.id, updates)}
            />
          </td>
        </tr>
      );
    }
  });

  return <>{rows}</>;
}

// ─── New Product Modal ────────────────────────────────────────────────────────
function NewProductModal({ onClose, onAdd }: { onClose: () => void; onAdd: (p: Product) => void }) {
  const [name,        setName]        = useState('');
  const [description, setDescription] = useState('');
  const [category,    setCategory]    = useState('');
  const [version,     setVersion]     = useState('v1.0.0');
  const [riskLevel,   setRiskLevel]   = useState<RiskLevel>('Medium');
  const [owner,       setOwner]       = useState('');
  const [team,        setTeam]        = useState('');
  const [status,      setStatus]      = useState<ProductStatus>('Draft');

  const inputClass = "w-full px-3 py-2 border border-[#E5E7EB] rounded-lg font-['Roboto',sans-serif] text-sm text-[#22262A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors";
  const labelClass = "block font-['Roboto',sans-serif] font-semibold text-xs text-[#6B7280] mb-1.5 uppercase tracking-wide";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({
      id: `p${Date.now()}`, name, description, category, version, riskLevel,
      riskScore: riskLevel === 'Critical' ? 85 : riskLevel === 'High' ? 65 : riskLevel === 'Medium' ? 45 : 15,
      regulatoryCategory: 'Pending Classification',
      complianceScore: 0,
      frameworks: [
        { name: 'EU AI Act', score: 0, articles: 'TBD' },
        { name: 'GDPR',      score: 0, articles: 'TBD' },
        { name: 'DSA',       score: 0, articles: 'TBD' },
      ],
      owner, ownerEmail: '', team,
      deploymentDate: '—', lastReviewed: 'Mar 10, 2026',
      hasTechnicalDocs: false, technicalDocsUrl: '',
      connectedComponents: {
        aiSystems: [],
        aiModels:  [],
        datasets:  [],
      },
      status,
      auditLog: [{ id: `a${Date.now()}`, date: 'Mar 10, 2026', user: 'You', change: `Product registered. Initial classification: ${riskLevel} Risk.` }],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-[580px] max-h-[90vh] flex flex-col overflow-hidden border border-[#E5E7EB]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#ece9fe] rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-[#5720B7]" />
            </div>
            <div>
              <h2 className="font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A]">Register New Product</h2>
              <p className="font-['Roboto',sans-serif] text-xs text-[#6B7280]">Add a product to the AI Registry</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F3F4F6] transition-colors">
            <X className="w-4 h-4 text-[#6B7280]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div>
            <label className={labelClass}>Product Name *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="e.g. Sola Recruitment AI" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3}
              placeholder="Briefly describe what this product does…" className={`${inputClass} resize-none`} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Category</label>
              <input type="text" value={category} onChange={e => setCategory(e.target.value)}
                placeholder="e.g. HR & Workforce" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Version</label>
              <input type="text" value={version} onChange={e => setVersion(e.target.value)}
                placeholder="v1.0.0" className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Owner</label>
              <input type="text" value={owner} onChange={e => setOwner(e.target.value)}
                placeholder="e.g. Sarah Chen" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Team</label>
              <input type="text" value={team} onChange={e => setTeam(e.target.value)}
                placeholder="e.g. AI Platform" className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Risk Level</label>
              <div className="flex gap-2 flex-wrap mt-1">
                {(['Critical', 'High', 'Medium', 'Low'] as RiskLevel[]).map(r => (
                  <button key={r} type="button" onClick={() => setRiskLevel(r)}
                    className={`px-3 py-1 rounded-full font-['Roboto',sans-serif] font-semibold text-xs transition-all ${riskLevel === r ? riskPill(r) + ' ring-2 ring-offset-1 ring-[#5720B7]/30' : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select value={status} onChange={e => setStatus(e.target.value as ProductStatus)} className={inputClass}>
                {(['Draft', 'In Review', 'Active', 'Deprecated'] as ProductStatus[]).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </form>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E5E7EB]">
          <button type="button" onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#E5E7EB] font-['Roboto',sans-serif] font-semibold text-sm text-[#6B7280] hover:bg-[#F3F4F6] transition-colors">
            Cancel
          </button>
          <button type="submit" onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-[#5720B7] text-white font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#4C1D95] transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Register Product
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function ProductsPage() {
  const [products,     setProducts]     = useState<Product[]>(INITIAL_PRODUCTS);
  const [expandedId,   setExpandedId]   = useState<string | null>(null);
  const [searchQuery,  setSearchQuery]  = useState('');
  const [riskFilter,   setRiskFilter]   = useState('All Risk Levels');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [isModalOpen,  setIsModalOpen]  = useState(false);

  const handleUpdateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const highRiskActionRequired = products.filter(
    p => (p.riskLevel === 'Critical' || p.riskLevel === 'High') && !p.hasTechnicalDocs
  ).length;

  const filtered = useMemo(() => products.filter(p => {
    const q = searchQuery.toLowerCase();
    return (
      (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.owner.toLowerCase().includes(q)) &&
      (riskFilter   === 'All Risk Levels' || p.riskLevel === riskFilter) &&
      (statusFilter === 'All Statuses'    || p.status    === statusFilter)
    );
  }), [products, searchQuery, riskFilter, statusFilter]);

  const thClass = "px-4 py-3 text-left font-['Roboto',sans-serif] font-semibold text-xs text-[#6B7280] uppercase tracking-wider whitespace-nowrap";

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="px-8 py-6 max-w-[1400px]">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A]">Products</h1>
              <span className="font-['Roboto',sans-serif] text-xs text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded border border-[#E5E7EB]">Registry</span>
            </div>
            <p className="font-['Roboto',sans-serif] text-sm text-[#6B7280]">
              Track AI product compliance across EU AI Act, GDPR, and DSA.
            </p>
          </div>
          <button onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#5720B7] text-white rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#4C1D95] transition-colors">
            <Plus className="w-4 h-4" /> New Product
          </button>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Total */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] px-5 py-4 flex items-center gap-4">
            <div className="w-11 h-11 bg-[#ece9fe] rounded-xl flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-[#5720B7]" />
            </div>
            <div className="flex-1">
              <p className="font-['Montserrat',sans-serif] font-bold text-3xl text-[#22262A]">{products.length}</p>
              <p className="font-['Roboto',sans-serif] text-sm text-[#6B7280]">Total AI Products</p>
            </div>
            <div className="text-right text-xs font-['Roboto',sans-serif] text-[#9CA3AF] space-y-0.5">
              <p>{products.filter(p => p.status === 'Active').length} Active</p>
              <p>{products.filter(p => p.status === 'In Review').length} In Review</p>
              <p>{products.filter(p => p.status === 'Draft').length} Draft</p>
            </div>
          </div>

          {/* High-Risk Action Required — white bg */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] px-5 py-4 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${highRiskActionRequired > 0 ? 'bg-[#FEF3C7]' : 'bg-[#DCFCE7]'}`}>
              {highRiskActionRequired > 0
                ? <AlertTriangle className="w-5 h-5 text-[#D97706]" />
                : <CheckCircle   className="w-5 h-5 text-[#166534]" />}
            </div>
            <div className="flex-1">
              <p className="font-['Montserrat',sans-serif] font-bold text-3xl text-[#22262A]">{highRiskActionRequired}</p>
              <p className="font-['Roboto',sans-serif] text-sm text-[#6B7280]">High-Risk — Action Required</p>
            </div>
            <p className="font-['Roboto',sans-serif] text-xs text-[#9CA3AF] max-w-[140px] text-right leading-relaxed">
              {highRiskActionRequired > 0
                ? 'Missing technical documentation'
                : 'All documentation in order'}
            </p>
          </div>
        </div>

        {/* ── Search & Filters ── */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-2 flex-1 max-w-[340px] bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 focus-within:border-[#5720B7] transition-all">
            <Search className="w-4 h-4 text-[#9CA3AF] shrink-0" />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products…"
              className="flex-1 bg-transparent font-['Roboto',sans-serif] text-sm text-[#22262A] placeholder:text-[#9CA3AF] outline-none" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}>
                <X className="w-3.5 h-3.5 text-[#9CA3AF]" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-lg px-3 py-2">
            <FilterIcon className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
            <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)}
              className="bg-transparent font-['Roboto',sans-serif] text-sm text-[#22262A] outline-none cursor-pointer">
              {RISK_FILTER_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-lg px-3 py-2">
            <Eye className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="bg-transparent font-['Roboto',sans-serif] text-sm text-[#22262A] outline-none cursor-pointer">
              {STATUS_FILTER_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <span className="ml-auto font-['Roboto',sans-serif] text-xs text-[#9CA3AF]">
            {filtered.length} of {products.length}
          </span>
        </div>

        {/* ── Table ── */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" className="w-4 h-4 rounded border-[#D1D5DB] accent-[#5720B7]" />
                </th>
                <th className={thClass}>AI System</th>
                <th className={thClass}>Risk Classification</th>
                <th className={thClass}>Category</th>
                <th className={thClass}>Compliance Manager</th>
                <th className={thClass}>Progress</th>
                <th className={thClass}>Link</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <Package className="w-8 h-8 text-[#E5E7EB] mx-auto mb-2" />
                    <p className="font-['Roboto',sans-serif] text-sm text-[#6B7280]">No products match your filters</p>
                  </td>
                </tr>
              ) : (
                <ProductRows
                  products={filtered}
                  expandedId={expandedId}
                  onToggle={id => setExpandedId(prev => prev === id ? null : id)}
                  onUpdate={handleUpdateProduct}
                />
              )}
            </tbody>
          </table>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-[#E5E7EB] flex items-center justify-between bg-[#FAFAFA]">
            <p className="font-['Roboto',sans-serif] text-xs text-[#6B7280]">
              Showing <span className="font-semibold text-[#22262A]">{filtered.length}</span> of{' '}
              <span className="font-semibold text-[#22262A]">{products.length}</span> products
            </p>
            {expandedId && (
              <p className="font-['Roboto',sans-serif] text-xs text-[#5720B7]">
                Click the row again or press ✕ to close the detail panel.
              </p>
            )}
          </div>
        </div>

      </div>

      {isModalOpen && (
        <NewProductModal
          onClose={() => setIsModalOpen(false)}
          onAdd={p => setProducts(prev => [p, ...prev])}
        />
      )}
    </div>
  );
}