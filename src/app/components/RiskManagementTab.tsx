import { useState } from 'react';
import {
  Plus, X, Bot, Send, Sparkles, Shield, AlertTriangle,
  ChevronRight, Info, Filter, Trash2,
  CheckCircle, Clock, Zap, Lightbulb, TrendingUp,
  Link2, FileText, History, Save, ExternalLink,
  Cpu, Upload, GitBranch,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type ImpactArea = 'Fairness' | 'Privacy' | 'Security' | 'Transparency' | 'Safety' | 'Compliance' | 'Robustness' | 'Other';
type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';
type RiskStatus = 'Needs Mitigation' | 'Pending Tests' | 'Acceptable';
type FilterTab = 'All' | RiskStatus;
type EvidenceType = 'pdf' | 'link' | 'jira' | 'github';

interface EvidenceItem {
  id: string;
  name: string;
  type: EvidenceType;
  url: string;
  addedBy: string;
  addedAt: string;
}

interface AuditEntry {
  id: string;
  date: string;
  user: string;
  change: string;
}

interface AIRisk {
  id: string;
  name: string;
  impactArea: ImpactArea;
  context: string;
  severity: number;
  likelihood: number;
  preRisk: RiskLevel;
  status: RiskStatus;
  residualRisk: RiskLevel;
  mitigationNotes: string;
  // Extended fields
  systemComponent: string;
  safeByDesign: string;
  technicalControls: string;
  userInformation: string;
  evidence: EvidenceItem[];
  testingMetrics: string;
  auditLog: AuditEntry[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function calcRiskLevel(s: number, l: number): RiskLevel {
  const score = s * l;
  if (score >= 20) return 'Critical';
  if (score >= 12) return 'High';
  if (score >= 6)  return 'Medium';
  return 'Low';
}

function riskBadge(level: RiskLevel) {
  const map: Record<RiskLevel, string> = {
    Critical: 'bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]',
    High:     'bg-[#FED7AA] text-[#9A3412] border border-[#FDBA74]',
    Medium:   'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]',
    Low:      'bg-[#D1FAE5] text-[#065F46] border border-[#A7F3D0]',
  };
  return map[level];
}

function statusBadge(status: RiskStatus) {
  const map: Record<RiskStatus, string> = {
    'Needs Mitigation': 'bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]',
    'Pending Tests':    'bg-[#DBEAFE] text-[#1E40AF] border border-[#BFDBFE]',
    'Acceptable':       'bg-[#D1FAE5] text-[#065F46] border border-[#A7F3D0]',
  };
  return map[status];
}

function statusIcon(status: RiskStatus) {
  if (status === 'Needs Mitigation') return <AlertTriangle className="w-3 h-3" />;
  if (status === 'Pending Tests')    return <Clock className="w-3 h-3" />;
  return <CheckCircle className="w-3 h-3" />;
}

function ImpactBadge({ area }: { area: ImpactArea }) {
  const map: Record<ImpactArea, string> = {
    Fairness:     'bg-[#ede9fe] text-[#5b21b6]',
    Privacy:      'bg-[#dbeafe] text-[#1e40af]',
    Security:     'bg-[#fce7f3] text-[#9d174d]',
    Transparency: 'bg-[#fef3c7] text-[#92400e]',
    Safety:       'bg-[#fee2e2] text-[#991b1b]',
    Compliance:   'bg-[#d1fae5] text-[#065f46]',
    Robustness:   'bg-[#e0f2fe] text-[#0369a1]',
    Other:        'bg-[#f3f4f6] text-[#4b5563]',
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full font-['Roboto',sans-serif] font-medium text-xs ${map[area]}`}>
      {area}
    </span>
  );
}

function RatingDots({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full ${i < value ? 'bg-[#F13D30]' : 'bg-[#E5E7EB]'}`}
        />
      ))}
      <span className="ml-1 font-['Roboto',sans-serif] font-semibold text-xs text-[#464E58]">{value}/5</span>
    </div>
  );
}

function evidenceIcon(type: EvidenceType) {
  if (type === 'pdf')    return <FileText className="w-3.5 h-3.5 text-[#F13D30]" />;
  if (type === 'github') return <GitBranch className="w-3.5 h-3.5 text-[#22262A]" />;
  if (type === 'jira')   return <Cpu className="w-3.5 h-3.5 text-[#1E40AF]" />;
  return <Link2 className="w-3.5 h-3.5 text-[#5B21B6]" />;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const INITIAL_RISKS: AIRisk[] = [
  {
    id: 'r1', name: 'Algorithmic Bias in Screening', impactArea: 'Fairness',
    context: 'Resume screening AI may disproportionately reject candidates from underrepresented groups due to biased training data.',
    severity: 5, likelihood: 4, preRisk: 'Critical', status: 'Needs Mitigation', residualRisk: 'High',
    mitigationNotes: 'Implement fairness-aware re-ranking; run Fairlearn audit quarterly.',
    systemComponent: 'Resume Scoring Model v3.2 — Ranking Algorithm',
    safeByDesign: 'Redesigning the training pipeline to include balanced datasets with proportional representation across demographic groups. Considering federated learning approach to reduce centralization of sensitive data.',
    technicalControls: "Implemented post-processing fairness constraints using Fairlearn's ThresholdOptimizer. Added demographic parity metric to CI/CD pipeline. Alert triggers if >5% disparity detected across protected groups.",
    userInformation: "Added a 'How decisions are made' section to the candidate-facing portal. Rejection emails now include a summary of the primary screening criteria used in evaluation.",
    evidence: [
      { id: 'e1a', name: 'EU AI Act Art. 10 Compliance Checklist.pdf', type: 'pdf', url: '#', addedBy: 'Sarah Chen', addedAt: 'Mar 3, 2026' },
      { id: 'e1b', name: 'FAIRNESS-42: Implement Fairlearn Bias Audit', type: 'jira', url: '#', addedBy: 'James Okafor', addedAt: 'Feb 28, 2026' },
    ],
    testingMetrics: 'Fairness audit conducted on a holdout dataset of 10,000 resumes (stratified by gender, ethnicity). Demographic parity difference < 0.05 required. Current baseline: 0.14 — FAIL. Re-test scheduled post-retraining.',
    auditLog: [
      { id: 'a1a', date: 'Feb 12, 2026', user: 'Sarah Chen', change: 'Risk entry created. Initial Severity set to 5, Likelihood set to 4 (Pre-Risk: Critical).' },
      { id: 'a1b', date: 'Feb 28, 2026', user: 'James Okafor', change: 'Added Mitigation Notes referencing the Fairlearn audit framework and quarterly review schedule.' },
      { id: 'a1c', date: 'Mar 8, 2026', user: 'Sarah Chen', change: 'Status confirmed as "Needs Mitigation" after internal review. No residual risk downgrade approved yet.' },
    ],
  },
  {
    id: 'r2', name: 'Personal Data Leakage', impactArea: 'Privacy',
    context: 'Processing of sensitive personal data (CV, contact info) without adequate encryption or access controls.',
    severity: 4, likelihood: 3, preRisk: 'High', status: 'Pending Tests', residualRisk: 'Medium',
    mitigationNotes: 'AES-256 encryption in transit & at rest. RBAC audit in progress.',
    systemComponent: 'Data Storage Layer — CV Processing Pipeline',
    safeByDesign: 'Architecture review conducted to minimise PII collection surface. Non-essential fields (e.g., date of birth, photo) removed from the input schema at ingestion.',
    technicalControls: 'AES-256 encryption applied to all CV data in transit (TLS 1.3) and at rest. RBAC with principle of least privilege enforced across all data access roles. Secrets manager integrated for DB credentials.',
    userInformation: 'Updated Privacy Notice (v3.0) to clearly explain what data is collected, how long it is retained, and data subject rights under GDPR Art. 15–22. Consent flow revised for mobile applicants.',
    evidence: [
      { id: 'e2a', name: 'PR #347: AES-256 Encryption for CV Data Storage', type: 'github', url: '#', addedBy: 'Alex Nguyen', addedAt: 'Mar 1, 2026' },
      { id: 'e2b', name: 'SEC-89: RBAC Audit Implementation', type: 'jira', url: '#', addedBy: 'Alex Nguyen', addedAt: 'Mar 2, 2026' },
    ],
    testingMetrics: 'Penetration test conducted by CyberSec Partners Ltd. (Q1 2026). Synthetic PII profiles (n=500) used as test dataset. AES-256 verified. 2 RBAC edge-case gaps identified — patches in SEC-91 and SEC-93.',
    auditLog: [
      { id: 'a2a', date: 'Feb 15, 2026', user: 'Alex Nguyen', change: 'Risk entry created. Initial Severity: 4, Likelihood: 3 (Pre-Risk: High).' },
      { id: 'a2b', date: 'Mar 2, 2026', user: 'Alex Nguyen', change: 'Status changed from "Needs Mitigation" to "Pending Tests" following encryption deployment to staging.' },
    ],
  },
  {
    id: 'r3', name: 'Explainability Gap', impactArea: 'Transparency',
    context: 'Candidates are not informed how decisions were made; no recourse mechanism is documented.',
    severity: 4, likelihood: 4, preRisk: 'High', status: 'Needs Mitigation', residualRisk: 'Medium',
    mitigationNotes: 'Draft rejection-reason template; integrate SHAP explanations in API output.',
    systemComponent: 'Decision Output API v1.4',
    safeByDesign: 'Switched from a black-box ensemble model to a more interpretable gradient boosting model with native feature importance scores. Interpretability is now a core architectural requirement.',
    technicalControls: 'SHAP (SHapley Additive exPlanations) integrated into the API output. Top 3 decision factors included in each API response payload. LIME used as secondary validation for spot-checks.',
    userInformation: 'Rejection letter template updated to include top 3 reasons for non-selection in plain language. Candidates can request a full explanation via the DPO portal (Art. 22 GDPR recourse path documented).',
    evidence: [
      { id: 'e3a', name: 'TRANSP-15: SHAP Explanation API Integration', type: 'jira', url: '#', addedBy: 'Priya Kumar', addedAt: 'Mar 7, 2026' },
    ],
    testingMetrics: 'SHAP explanations validated on a sample of 500 decisions. Feature attribution consistency score: 0.92. Human-readable summaries reviewed by 3 compliance officers — 1 revision requested for clarity.',
    auditLog: [
      { id: 'a3a', date: 'Feb 20, 2026', user: 'Priya Kumar', change: 'Risk entry created. Initial Severity: 4, Likelihood: 4 (Pre-Risk: High).' },
      { id: 'a3b', date: 'Mar 7, 2026', user: 'Priya Kumar', change: 'Mitigation Notes updated with SHAP integration plan. Jira ticket TRANSP-15 linked as evidence.' },
    ],
  },
  {
    id: 'r4', name: 'Data Retention Violations', impactArea: 'Compliance',
    context: 'CV data retained beyond the stated purpose under GDPR Art. 5(1)(e).',
    severity: 3, likelihood: 2, preRisk: 'Medium', status: 'Acceptable', residualRisk: 'Low',
    mitigationNotes: 'Auto-delete pipeline configured for 90-day TTL. DPO signed off.',
    systemComponent: 'Data Lifecycle Manager — Storage Module',
    safeByDesign: 'Data architecture redesigned with purpose limitation as a core principle. Data is segmented into retention tiers at ingestion — each tier has its own TTL and access policy.',
    technicalControls: 'Automated 90-day TTL deletion pipeline configured in the data warehouse. Daily verification job confirms deletion completion. Audit-only logs retained indefinitely in a separate append-only store.',
    userInformation: 'Privacy Notice updated with explicit retention periods per data category. Consent checkboxes updated to reflect the revised retention policy. DPO communications template created for data subject requests.',
    evidence: [
      { id: 'e4a', name: 'DPO Sign-off — Data Retention Policy v2.1.pdf', type: 'pdf', url: '#', addedBy: 'Maria L. (DPO)', addedAt: 'Jan 15, 2026' },
      { id: 'e4b', name: 'GDPR-45: 90-day TTL Auto-delete Pipeline', type: 'jira', url: '#', addedBy: 'Mike Rosso', addedAt: 'Jan 12, 2026' },
    ],
    testingMetrics: 'TTL deletion verified by running audit queries against the data warehouse on Mar 1, 2026. Result: 0 records older than 90 days in active storage. Spot-check on 200 legacy records confirmed full deletion.',
    auditLog: [
      { id: 'a4a', date: 'Jan 10, 2026', user: 'Mike Rosso', change: 'Risk entry created. Initial Severity: 3, Likelihood: 3 (Pre-Risk: Medium).' },
      { id: 'a4b', date: 'Jan 15, 2026', user: 'Maria L. (DPO)', change: 'Status changed from "Needs Mitigation" to "Acceptable". DPO sign-off attached (PDF evidence). Likelihood revised from 3 to 2.' },
      { id: 'a4c', date: 'Feb 28, 2026', user: 'Mike Rosso', change: 'Confirmed 90-day TTL pipeline is operational in production. Deletion verification report added to evidence.' },
    ],
  },
  {
    id: 'r5', name: 'Adversarial Input Vulnerability', impactArea: 'Security',
    context: 'Candidates may manipulate the model using keyword injection to bypass the screening logic.',
    severity: 3, likelihood: 3, preRisk: 'Medium', status: 'Pending Tests', residualRisk: 'Low',
    mitigationNotes: 'Red-team exercise scheduled Q2. Input sanitisation layer added.',
    systemComponent: 'Input Validation Layer — Text Pre-processor v2.0',
    safeByDesign: 'Model architecture reviewed to reduce reliance on keyword matching. Semantic embedding approach reduces susceptibility to keyword stuffing. Adversarial robustness is now part of the model selection criteria.',
    technicalControls: 'Input sanitisation middleware added to the API gateway. Regex-based injection detection patterns deployed. Rate limiting applied to prevent automated adversarial probing of the model.',
    userInformation: '',
    evidence: [
      { id: 'e5a', name: 'SEC-112: Q2 Red Team Exercise Planning', type: 'jira', url: '#', addedBy: 'Wei Zhang', addedAt: 'Mar 3, 2026' },
    ],
    testingMetrics: 'Red-team exercise scheduled for Q2 2026. Preliminary fuzzing tests conducted on 50 adversarial inputs — 3 bypasses detected and patched (SEC-114, SEC-115, SEC-116). Full test suite pending.',
    auditLog: [
      { id: 'a5a', date: 'Mar 3, 2026', user: 'Wei Zhang', change: 'Risk entry created. Initial Severity: 3, Likelihood: 3 (Pre-Risk: Medium). Red-team exercise planned for Q2.' },
    ],
  },
  {
    id: 'r6', name: 'Model Drift in Production', impactArea: 'Robustness',
    context: "The model's accuracy may degrade over time as applicant pool characteristics shift.",
    severity: 4, likelihood: 3, preRisk: 'High', status: 'Pending Tests', residualRisk: 'Medium',
    mitigationNotes: 'Evidently AI monitoring dashboard configured; alert threshold at 5% PSI.',
    systemComponent: 'Production Model v3.2 — Prediction Engine',
    safeByDesign: 'Model retraining schedule updated to a monthly cadence to proactively adapt to distribution shifts. Canary deployments introduced so new model versions are validated before full rollout.',
    technicalControls: 'Evidently AI monitoring dashboard configured with PSI (Population Stability Index) threshold of 5%. Automated retraining pipeline triggers when threshold is exceeded. Model versioning enforced in ML registry.',
    userInformation: '',
    evidence: [
      { id: 'e6a', name: 'Evidently AI Dashboard — Model Drift Monitor', type: 'link', url: '#', addedBy: 'Lisa Park', addedAt: 'Feb 22, 2026' },
    ],
    testingMetrics: 'PSI monitoring active since Feb 22, 2026. Current PSI score: 0.031 (PASS — threshold: 0.05). Benchmark dataset: Q4 2025 applicant pool (n=12,500 records). Next scheduled evaluation: Apr 1, 2026.',
    auditLog: [
      { id: 'a6a', date: 'Feb 22, 2026', user: 'Lisa Park', change: 'Risk entry created with Evidently AI monitoring. Initial Severity: 4, Likelihood: 3 (Pre-Risk: High).' },
      { id: 'a6b', date: 'Mar 8, 2026', user: 'Lisa Park', change: 'Alert threshold set to 5% PSI on the monitoring dashboard. Automated retraining pipeline linked and verified.' },
    ],
  },
];

const COPILOT_INSIGHTS = [
  {
    id: 'i1', type: 'warning' as const,
    title: 'Critical Risk Unmitigated',
    body: 'Algorithmic Bias in Screening is rated Critical and has no active mitigation plan. Recommend running AI Fairness 360 audit within 14 days per EU AI Act Art. 10.',
  },
  {
    id: 'i2', type: 'suggestion' as const,
    title: 'Residual Risk Elevation',
    body: '"Explainability Gap" currently has a High residual risk. Under Art. 13 (Transparency), deployers must provide meaningful information about system logic to affected persons.',
  },
  {
    id: 'i3', type: 'info' as const,
    title: 'Pending Tests Aging',
    body: '2 risks are in "Pending Tests" for >30 days. Consider escalating to the risk owner or updating the status to prevent compliance gaps.',
  },
  {
    id: 'i4', type: 'success' as const,
    title: 'Data Retention Resolved',
    body: 'The Data Retention Violations risk is marked Acceptable with DPO sign-off — this is well-documented and audit-ready.',
  },
];

const FILTER_TABS: FilterTab[] = ['All', 'Needs Mitigation', 'Pending Tests', 'Acceptable'];
const IMPACT_AREAS: ImpactArea[] = ['Fairness', 'Privacy', 'Security', 'Transparency', 'Safety', 'Compliance', 'Robustness', 'Other'];
const STATUS_OPTIONS: RiskStatus[] = ['Needs Mitigation', 'Pending Tests', 'Acceptable'];
const RISK_LEVELS: RiskLevel[] = ['Critical', 'High', 'Medium', 'Low'];

// ─── Risk Drawer Content ──────────────────────────────────────────────────────
interface DrawerProps {
  risk: AIRisk;
  onUpdate: (updates: Partial<AIRisk>) => void;
  onClose: () => void;
}

function RiskDrawerContent({ risk, onUpdate, onClose }: DrawerProps) {
  const [systemComponent, setSystemComponent] = useState(risk.systemComponent ?? '');
  const [safeByDesign, setSafeByDesign] = useState(risk.safeByDesign ?? '');
  const [technicalControls, setTechnicalControls] = useState(risk.technicalControls ?? '');
  const [userInformation, setUserInformation] = useState(risk.userInformation ?? '');
  const [testingMetrics, setTestingMetrics] = useState(risk.testingMetrics ?? '');
  const [severity, setSeverity] = useState(risk.severity ?? 3);
  const [likelihood, setLikelihood] = useState(risk.likelihood ?? 3);
  const [newEvidenceUrl, setNewEvidenceUrl] = useState('');
  const [newEvidenceName, setNewEvidenceName] = useState('');
  const [localEvidence, setLocalEvidence] = useState<EvidenceItem[]>(risk.evidence ?? []);
  const [saved, setSaved] = useState(false);

  const preRisk = calcRiskLevel(severity, likelihood);
  const score = severity * likelihood;

  const handleSave = () => {
    onUpdate({
      systemComponent, safeByDesign, technicalControls, userInformation,
      testingMetrics, severity, likelihood,
      preRisk: calcRiskLevel(severity, likelihood),
      evidence: localEvidence,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addEvidence = () => {
    if (!newEvidenceName.trim() || !newEvidenceUrl.trim()) return;
    const item: EvidenceItem = {
      id: `e-${Date.now()}`, name: newEvidenceName, type: 'link',
      url: newEvidenceUrl, addedBy: 'You', addedAt: 'Mar 10, 2026',
    };
    setLocalEvidence(prev => [...prev, item]);
    setNewEvidenceName('');
    setNewEvidenceUrl('');
  };

  const removeEvidence = (id: string) => setLocalEvidence(prev => prev.filter(e => e.id !== id));

  const sectionLabel = "font-['Montserrat',sans-serif] font-bold text-xs text-[#22262A] uppercase tracking-widest mb-3 flex items-center gap-2";
  const textareaClass = "w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg font-['Roboto',sans-serif] text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC] transition-colors resize-none leading-relaxed";
  const inputClass = "w-full px-3 py-2 border border-[#E5E7EB] rounded-lg font-['Roboto',sans-serif] text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC] transition-colors";
  const stepBadge = "w-6 h-6 rounded-full flex items-center justify-center font-['Roboto',sans-serif] font-bold text-xs text-white shrink-0";

  return (
    <div className="bg-[#FAFBFC] border-t border-b border-[#F0F1F2]">
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-6 py-3.5 bg-white border-b border-[#F0F1F2] sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#FEEDEC] rounded-lg flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-[#F13D30]" />
          </div>
          <div>
            <h3 className="font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A]">{risk.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <ImpactBadge area={risk.impactArea} />
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-['Roboto',sans-serif] font-semibold text-xs ${statusBadge(risk.status)}`}>
                {statusIcon(risk.status)}{risk.status}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleSave}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-['Roboto',sans-serif] font-semibold text-sm transition-all ${saved ? 'bg-[#D1FAE5] text-[#065F46]' : 'bg-[#F13D30] text-white hover:bg-[#DC180A]'} shadow-sm`}>
            {saved ? <><CheckCircle className="w-3.5 h-3.5" />Saved</> : <><Save className="w-3.5 h-3.5" />Save Changes</>}
          </button>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F0F1F2] transition-colors" title="Close">
            <X className="w-4 h-4 text-[#565F6C]" />
          </button>
        </div>
      </div>

      <div className="px-6 py-5 space-y-6">

        {/* ── SECTION 1: Full Description ── */}
        <section className="bg-white rounded-xl border border-[#F0F1F2] p-5 shadow-sm">
          <div className={sectionLabel}>
            <span className="w-5 h-5 bg-[#FEEDEC] rounded flex items-center justify-center text-[#F13D30]">1</span>
            Full Description &amp; System Link
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wide mb-1.5">Full Risk Description</label>
              <p className="font-['Roboto',sans-serif] text-sm text-[#22262A] leading-relaxed bg-[#F9FAFB] px-3 py-2.5 rounded-lg border border-[#F0F1F2]">
                {risk.context}
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wide mb-1.5">
                  System / Component Link
                </label>
                <input type="text" value={systemComponent} onChange={e => setSystemComponent(e.target.value)}
                  placeholder="e.g. Camera Vision Module v2.1"
                  className={inputClass} />
                <p className="mt-1 font-['Roboto',sans-serif] text-[10px] text-[#B5BCC4]">Which exact part of the AI model this risk applies to.</p>
              </div>
              {/* Severity & Likelihood inside drawer */}
              <div className="bg-[#F9FAFB] rounded-lg border border-[#F0F1F2] p-3 space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wide">Severity</label>
                    <RatingDots value={severity} />
                  </div>
                  <div className="flex gap-1.5">
                    {[1,2,3,4,5].map(n => (
                      <button key={n} type="button" onClick={() => setSeverity(n)}
                        className={`w-8 h-8 rounded-lg font-['Roboto',sans-serif] font-bold text-sm border transition-all ${severity === n ? 'bg-[#F13D30] text-white border-[#F13D30]' : 'bg-white text-[#464E58] border-[#E5E7EB] hover:border-[#F13D30]'}`}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wide">Likelihood</label>
                    <RatingDots value={likelihood} />
                  </div>
                  <div className="flex gap-1.5">
                    {[1,2,3,4,5].map(n => (
                      <button key={n} type="button" onClick={() => setLikelihood(n)}
                        className={`w-8 h-8 rounded-lg font-['Roboto',sans-serif] font-bold text-sm border transition-all ${likelihood === n ? 'bg-[#F13D30] text-white border-[#F13D30]' : 'bg-white text-[#464E58] border-[#E5E7EB] hover:border-[#F13D30]'}`}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-[#F0F1F2]">
                  <Zap className="w-3.5 h-3.5 text-[#F13D30] shrink-0" />
                  <span className="font-['Roboto',sans-serif] text-xs text-[#464E58]">
                    Score: <strong>{severity} × {likelihood} = {score}</strong>
                  </span>
                  <span className={`ml-auto inline-flex px-2 py-0.5 rounded-full font-['Roboto',sans-serif] font-semibold text-xs ${riskBadge(preRisk)}`}>{preRisk}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: Mitigation Workspace (Art. 9 Hierarchy) ── */}
        <section className="bg-white rounded-xl border border-[#F0F1F2] p-5 shadow-sm">
          <div className={sectionLabel}>
            <span className="w-5 h-5 bg-[#FEF3C7] rounded flex items-center justify-center text-[#92400E]">2</span>
            Mitigation Workspace — Art. 9 Hierarchy
          </div>
          <p className="font-['Roboto',sans-serif] text-xs text-[#565F6C] mb-4 leading-relaxed">
            Document your mitigation strategy following the Art. 9 risk management hierarchy. Work through each step systematically.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`${stepBadge} bg-[#F13D30]`}>1</span>
                <div>
                  <p className="font-['Roboto',sans-serif] font-bold text-xs text-[#22262A]">Safe by Design</p>
                  <p className="font-['Roboto',sans-serif] text-[10px] text-[#B5BCC4]">Architectural changes</p>
                </div>
              </div>
              <textarea
                value={safeByDesign}
                onChange={e => setSafeByDesign(e.target.value)}
                rows={7}
                placeholder="Describe architectural or design changes that eliminate this risk at the source…"
                className={textareaClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`${stepBadge} bg-[#F46258]`}>2</span>
                <div>
                  <p className="font-['Roboto',sans-serif] font-bold text-xs text-[#22262A]">Technical Controls</p>
                  <p className="font-['Roboto',sans-serif] text-[10px] text-[#B5BCC4]">Failsafes &amp; guardrails</p>
                </div>
              </div>
              <textarea
                value={technicalControls}
                onChange={e => setTechnicalControls(e.target.value)}
                rows={7}
                placeholder="Describe technical safeguards, monitoring systems, and guardrails implemented…"
                className={textareaClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`${stepBadge} bg-[#F78B83]`}>3</span>
                <div>
                  <p className="font-['Roboto',sans-serif] font-bold text-xs text-[#22262A]">User Information</p>
                  <p className="font-['Roboto',sans-serif] text-[10px] text-[#B5BCC4]">Warnings &amp; disclosures</p>
                </div>
              </div>
              <textarea
                value={userInformation}
                onChange={e => setUserInformation(e.target.value)}
                rows={7}
                placeholder="Describe warnings, disclosures, and user-facing information added to documentation or the product…"
                className={textareaClass}
              />
            </div>
          </div>
        </section>

        {/* ── SECTION 3: Verification & Evidence ── */}
        <section className="bg-white rounded-xl border border-[#F0F1F2] p-5 shadow-sm">
          <div className={sectionLabel}>
            <span className="w-5 h-5 bg-[#DBEAFE] rounded flex items-center justify-center text-[#1E40AF]">3</span>
            Verification &amp; Evidence
          </div>
          <div className="grid grid-cols-2 gap-5">
            {/* Evidence Upload/Link Zone */}
            <div>
              <label className="block font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wide mb-2">
                Evidence Links &amp; Attachments
              </label>
              <div className="space-y-1.5 mb-3">
                {(localEvidence ?? []).map(ev => (
                  <div key={ev.id} className="flex items-center gap-2 px-3 py-2 bg-[#F9FAFB] rounded-lg border border-[#F0F1F2] group">
                    {evidenceIcon(ev.type)}
                    <div className="flex-1 min-w-0">
                      <p className="font-['Roboto',sans-serif] font-semibold text-xs text-[#22262A] truncate">{ev.name}</p>
                      <p className="font-['Roboto',sans-serif] text-[10px] text-[#B5BCC4]">Added by {ev.addedBy} · {ev.addedAt}</p>
                    </div>
                    <a href={ev.url} target="_blank" rel="noreferrer"
                      className="p-1 rounded hover:bg-[#E5E7EB] transition-colors opacity-0 group-hover:opacity-100" title="Open">
                      <ExternalLink className="w-3 h-3 text-[#565F6C]" />
                    </a>
                    <button onClick={() => removeEvidence(ev.id)}
                      className="p-1 rounded hover:bg-[#FEE2E2] transition-colors opacity-0 group-hover:opacity-100" title="Remove">
                      <X className="w-3 h-3 text-[#991B1B]" />
                    </button>
                  </div>
                ))}
                {localEvidence.length === 0 && (
                  <p className="font-['Roboto',sans-serif] text-xs text-[#B5BCC4] italic px-3 py-2">No evidence attached yet.</p>
                )}
              </div>
              {/* Add evidence */}
              <div className="border border-dashed border-[#E5E7EB] rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2 text-[#B5BCC4]">
                  <Upload className="w-3.5 h-3.5" />
                  <p className="font-['Roboto',sans-serif] font-semibold text-xs">Add Evidence Link</p>
                </div>
                <input type="text" value={newEvidenceName} onChange={e => setNewEvidenceName(e.target.value)}
                  placeholder="Label (e.g. Penetration Test Report Q1 2026)" className={`${inputClass} text-xs`} />
                <div className="flex gap-2">
                  <input type="text" value={newEvidenceUrl} onChange={e => setNewEvidenceUrl(e.target.value)}
                    placeholder="URL or Jira / GitHub link" className={`${inputClass} text-xs flex-1`} />
                  <button onClick={addEvidence}
                    className="px-3 py-2 bg-[#F13D30] text-white rounded-lg font-['Roboto',sans-serif] font-semibold text-xs hover:bg-[#DC180A] transition-colors shrink-0">
                    Add
                  </button>
                </div>
              </div>
            </div>
            {/* Testing Metrics */}
            <div>
              <label className="block font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wide mb-2">
                Testing Metrics &amp; Dataset
              </label>
              <p className="font-['Roboto',sans-serif] text-[10px] text-[#B5BCC4] mb-2 leading-relaxed">
                What dataset and methodology was used to verify this risk is mitigated? Connects to your Article 10 data module.
              </p>
              <textarea
                value={testingMetrics}
                onChange={e => setTestingMetrics(e.target.value)}
                rows={8}
                placeholder="Describe the testing methodology, dataset used, metrics collected, and results (pass/fail criteria)…"
                className={textareaClass}
              />
            </div>
          </div>
        </section>

        {/* ── SECTION 4: Audit Trail ── */}
        <section className="bg-white rounded-xl border border-[#F0F1F2] p-5 shadow-sm">
          <div className={sectionLabel}>
            <span className="w-5 h-5 bg-[#D1FAE5] rounded flex items-center justify-center text-[#065F46]">4</span>
            Audit Trail
            <span className="ml-auto font-['Roboto',sans-serif] text-[10px] font-normal text-[#B5BCC4] normal-case tracking-normal">
              Immutable — read only
            </span>
          </div>
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-4 w-px bg-[#F0F1F2]" />
            <div className="space-y-0">
              {(risk.auditLog ?? []).map((entry, idx) => (
                <div key={entry.id} className="flex gap-3 pb-4 last:pb-0 relative">
                  <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${idx === 0 ? 'bg-[#FEEDEC] border-[#F9B3AE]' : 'bg-white border-[#E5E7EB]'}`}>
                    <History className={`w-4 h-4 ${idx === 0 ? 'text-[#F13D30]' : 'text-[#B5BCC4]'}`} />
                  </div>
                  <div className="flex-1 pt-1.5">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="font-['Roboto',sans-serif] font-bold text-xs text-[#22262A]">{entry.user}</span>
                      <span className="font-['Roboto',sans-serif] text-[10px] text-[#B5BCC4]">·</span>
                      <span className="font-['Roboto',sans-serif] text-[10px] text-[#B5BCC4]">{entry.date}</span>
                    </div>
                    <p className="font-['Roboto',sans-serif] text-xs text-[#565F6C] leading-relaxed">{entry.change}</p>
                  </div>
                </div>
              ))}
              {/* "You" future entry placeholder */}
              <div className="flex gap-3 pt-1 opacity-40">
                <div className="w-9 h-9 rounded-full border-2 border-dashed border-[#E5E7EB] flex items-center justify-center shrink-0 bg-[#F9FAFB] z-10">
                  <TrendingUp className="w-4 h-4 text-[#B5BCC4]" />
                </div>
                <div className="flex-1 pt-2">
                  <p className="font-['Roboto',sans-serif] text-xs text-[#B5BCC4] italic">Future changes will be logged here automatically when you save.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

// ─── New Risk Modal ────────────────────────────────────────────────────────────
interface NewRiskModalProps {
  onClose: () => void;
  onAdd: (risk: AIRisk) => void;
}

function NewRiskModal({ onClose, onAdd }: NewRiskModalProps) {
  const [name, setName] = useState('');
  const [impactArea, setImpactArea] = useState<ImpactArea>('Fairness');
  const [context, setContext] = useState('');
  const [severity, setSeverity] = useState(3);
  const [likelihood, setLikelihood] = useState(3);
  const [status, setStatus] = useState<RiskStatus>('Needs Mitigation');
  const [residualRisk, setResidualRisk] = useState<RiskLevel>('Medium');
  const [mitigationNotes, setMitigationNotes] = useState('');
  const preRisk = calcRiskLevel(severity, likelihood);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const now = 'Mar 10, 2026';
    onAdd({
      id: `r${Date.now()}`, name, impactArea, context, severity, likelihood,
      preRisk, status, residualRisk, mitigationNotes,
      systemComponent: '', safeByDesign: '', technicalControls: '',
      userInformation: '', evidence: [], testingMetrics: '',
      auditLog: [{ id: `a${Date.now()}`, date: now, user: 'You', change: `Risk entry created. Initial Severity: ${severity}, Likelihood: ${likelihood} (Pre-Risk: ${preRisk}).` }],
    });
    onClose();
  };

  const labelClass = "block font-['Roboto',sans-serif] font-semibold text-xs text-[#464E58] mb-1.5 uppercase tracking-wide";
  const inputClass = "w-full px-3 py-2 border border-[#E5E7EB] rounded-lg font-['Roboto',sans-serif] text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC] transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[680px] max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0F1F2]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#FEEDEC] rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#F13D30]" />
            </div>
            <div>
              <h2 className="font-['Montserrat',sans-serif] font-bold text-base text-[#22262A]">Log New AI Risk</h2>
              <p className="font-['Roboto',sans-serif] text-xs text-[#565F6C]">Add a risk entry to the Risk Ledger</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F5F6F8] transition-colors">
            <X className="w-5 h-5 text-[#565F6C]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <div>
            <label className={labelClass}>Risk Name *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="e.g. Algorithmic Bias in Screening" className={inputClass} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Impact Area</label>
              <select value={impactArea} onChange={e => setImpactArea(e.target.value as ImpactArea)} className={inputClass}>
                {IMPACT_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select value={status} onChange={e => setStatus(e.target.value as RiskStatus)} className={inputClass}>
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Context / Description</label>
            <textarea value={context} onChange={e => setContext(e.target.value)} rows={3}
              placeholder="Describe the risk scenario and its potential impact…" className={`${inputClass} resize-none`} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Severity (1–5)</label>
              <div className="flex gap-2 mt-1">
                {[1,2,3,4,5].map(n => (
                  <button key={n} type="button" onClick={() => setSeverity(n)}
                    className={`w-9 h-9 rounded-lg font-['Roboto',sans-serif] font-bold text-sm border transition-all ${severity === n ? 'bg-[#F13D30] text-white border-[#F13D30] shadow-sm' : 'bg-white text-[#464E58] border-[#E5E7EB] hover:border-[#F13D30]'}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass}>Likelihood (1–5)</label>
              <div className="flex gap-2 mt-1">
                {[1,2,3,4,5].map(n => (
                  <button key={n} type="button" onClick={() => setLikelihood(n)}
                    className={`w-9 h-9 rounded-lg font-['Roboto',sans-serif] font-bold text-sm border transition-all ${likelihood === n ? 'bg-[#F13D30] text-white border-[#F13D30] shadow-sm' : 'bg-white text-[#464E58] border-[#E5E7EB] hover:border-[#F13D30]'}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#F9FAFB] rounded-lg px-4 py-3 border border-[#F0F1F2]">
            <Zap className="w-4 h-4 text-[#F13D30] shrink-0" />
            <span className="font-['Roboto',sans-serif] text-sm text-[#464E58]">
              Pre-Mitigation Score: <strong>{severity} × {likelihood} = {severity * likelihood}</strong>
            </span>
            <span className={`ml-auto inline-flex px-2.5 py-1 rounded-full font-['Roboto',sans-serif] font-semibold text-xs ${riskBadge(preRisk)}`}>{preRisk}</span>
          </div>
          <div>
            <label className={labelClass}>Residual Risk (post-mitigation)</label>
            <div className="flex gap-2 flex-wrap mt-1">
              {RISK_LEVELS.map(rl => (
                <button key={rl} type="button" onClick={() => setResidualRisk(rl)}
                  className={`px-4 py-1.5 rounded-full font-['Roboto',sans-serif] font-semibold text-xs border transition-all ${residualRisk === rl ? riskBadge(rl) + ' shadow-sm' : 'bg-white text-[#B5BCC4] border-[#E5E7EB] hover:border-[#464E58]'}`}>
                  {rl}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelClass}>Mitigation Notes</label>
            <textarea value={mitigationNotes} onChange={e => setMitigationNotes(e.target.value)} rows={3}
              placeholder="Describe planned or completed mitigations…" className={`${inputClass} resize-none`} />
          </div>
        </form>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#F0F1F2]">
          <button type="button" onClick={onClose}
            className="px-5 py-2 rounded-lg border border-[#E5E7EB] font-['Roboto',sans-serif] font-semibold text-sm text-[#464E58] hover:bg-[#F5F6F8] transition-colors">
            Cancel
          </button>
          <button type="submit" onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-[#F13D30] text-white font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> Log Risk
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── AI Copilot Sidebar ───────────────────────────────────────────────────────
interface CopilotMessage { id: string; role: 'user' | 'assistant'; content: string; }

const CANNED: Record<string, string> = {
  bias: 'The Algorithmic Bias risk is currently Critical and unmitigated. I recommend running a Fairlearn audit and applying fairness-aware post-processing before the next deployment window.',
  gdpr: 'The Data Retention Violations risk is marked Acceptable with DPO sign-off. Under GDPR Art. 5(1)(e), your 90-day TTL policy is compliant — ensure it is documented in your ROPA.',
  default: "I've reviewed the Risk Ledger. You have {critical} Critical and {pending} Pending Tests risks that need attention. Would you like me to draft a mitigation roadmap?",
};

function CopilotSidebar({ isOpen, onToggle, pendingCount, criticalCount }: { isOpen: boolean; onToggle: () => void; pendingCount: number; criticalCount: number }) {
  const [messages, setMessages] = useState<CopilotMessage[]>([]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    const lower = input.toLowerCase();
    let reply = CANNED.default.replace('{critical}', String(criticalCount)).replace('{pending}', String(pendingCount));
    if (lower.includes('bias') || lower.includes('fair')) reply = CANNED.bias;
    if (lower.includes('gdpr') || lower.includes('retention')) reply = CANNED.gdpr;
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: input },
      { id: (Date.now() + 1).toString(), role: 'assistant', content: reply },
    ]);
    setInput('');
  };

  if (!isOpen) {
    return (
      <button onClick={onToggle}
        className="fixed right-4 bottom-8 z-30 w-12 h-12 bg-[#F13D30] rounded-full shadow-xl flex items-center justify-center hover:bg-[#DC180A] transition-colors"
        title="Open AI Copilot">
        <Bot className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FCD7D4] rounded-full border-2 border-white animate-pulse" />
      </button>
    );
  }

  const iconMap = {
    warning:    { icon: AlertTriangle, bg: 'bg-[#FEF3C7]', text: 'text-[#92400E]', border: 'border-[#FDE68A]' },
    suggestion: { icon: Lightbulb,    bg: 'bg-[#EDE9FE]',  text: 'text-[#5B21B6]', border: 'border-[#DDD6FE]' },
    info:       { icon: Info,         bg: 'bg-[#DBEAFE]',  text: 'text-[#1E40AF]', border: 'border-[#BFDBFE]' },
    success:    { icon: CheckCircle,  bg: 'bg-[#D1FAE5]',  text: 'text-[#065F46]', border: 'border-[#A7F3D0]' },
  };

  return (
    <div className="w-[300px] shrink-0 flex flex-col border-l border-[#F0F1F2] bg-white h-full overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#F0F1F2] bg-[#FAFBFC]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#FEEDEC] rounded-lg flex items-center justify-center">
            <Bot className="w-4 h-4 text-[#F13D30]" />
          </div>
          <div>
            <p className="font-['Montserrat',sans-serif] font-bold text-xs text-[#22262A]">AI Copilot</p>
            <p className="font-['Roboto',sans-serif] text-[10px] text-[#B5BCC4]">Risk Intelligence</p>
          </div>
          <span className="ml-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
        <button onClick={onToggle} className="p-1.5 rounded-lg hover:bg-[#F0F1F2] transition-colors" title="Collapse">
          <ChevronRight className="w-4 h-4 text-[#565F6C]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <p className="font-['Roboto',sans-serif] font-semibold text-[10px] uppercase tracking-widest text-[#B5BCC4] px-1">Automated Insights</p>
        {COPILOT_INSIGHTS.map(insight => {
          const { icon: Icon, bg, text, border } = iconMap[insight.type];
          return (
            <div key={insight.id} className={`rounded-lg p-3 border ${bg} ${border}`}>
              <div className="flex items-start gap-2">
                <Icon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${text}`} />
                <div>
                  <p className={`font-['Roboto',sans-serif] font-semibold text-xs ${text} mb-0.5`}>{insight.title}</p>
                  <p className="font-['Roboto',sans-serif] text-[11px] text-[#464E58] leading-relaxed">{insight.body}</p>
                </div>
              </div>
            </div>
          );
        })}

        {messages.length > 0 && (
          <div className="pt-2 space-y-2">
            <p className="font-['Roboto',sans-serif] font-semibold text-[10px] uppercase tracking-widest text-[#B5BCC4] px-1">Conversation</p>
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] rounded-lg px-3 py-2 text-xs font-['Roboto',sans-serif] leading-relaxed ${msg.role === 'user' ? 'bg-[#F13D30] text-white rounded-br-none' : 'bg-[#F5F6F8] text-[#22262A] rounded-bl-none border border-[#F0F1F2]'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        )}

        {messages.length === 0 && (
          <div className="mt-2 space-y-2">
            <p className="font-['Roboto',sans-serif] font-semibold text-[10px] uppercase tracking-widest text-[#B5BCC4] px-1">Ask Copilot</p>
            {['What are my highest priority risks?', 'How can I reduce bias risk?', 'Am I GDPR compliant?'].map(q => (
              <button key={q} onClick={() => setInput(q)}
                className="w-full text-left px-3 py-2 rounded-lg border border-[#F0F1F2] bg-[#F9FAFB] hover:bg-[#FEEDEC] hover:border-[#F9B3AE] transition-colors">
                <span className="font-['Roboto',sans-serif] text-xs text-[#464E58]">{q}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="px-3 py-3 border-t border-[#F0F1F2]">
        <div className="flex items-center gap-2 bg-[#F5F6F8] rounded-xl px-3 py-2 border border-[#E5E7EB] focus-within:border-[#F13D30] transition-all">
          <Sparkles className="w-3.5 h-3.5 text-[#F13D30] shrink-0" />
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask about your risks…"
            className="flex-1 bg-transparent font-['Roboto',sans-serif] text-xs text-[#22262A] placeholder:text-[#B5BCC4] outline-none" />
          <button onClick={send} className="w-6 h-6 bg-[#F13D30] rounded-lg flex items-center justify-center hover:bg-[#DC180A] transition-colors">
            <Send className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Risk Rows (extracted sub-component to avoid flatMap-in-JSX parse errors) ──
function RiskRows({ filtered, expandedRow, onToggleRow, onDelete, onUpdate }: {
  filtered: AIRisk[];
  expandedRow: string | null;
  onToggleRow: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<AIRisk>) => void;
}) {
  const rows: JSX.Element[] = [];

  filtered.forEach(risk => {
    const isExpanded = expandedRow === risk.id;
    const isDimmed = expandedRow !== null && !isExpanded;

    rows.push(
      <tr
        key={risk.id}
        onClick={() => onToggleRow(risk.id)}
        className={`cursor-pointer transition-all group ${isExpanded ? 'bg-[#FFF8F7] border-l-2 border-l-[#F13D30]' : 'hover:bg-[#FAFBFC]'} ${isDimmed ? 'opacity-40' : ''}`}
      >
        <td className="px-4 py-3.5">
          <div className="flex items-center gap-1.5">
            <ChevronRight className={`w-3.5 h-3.5 text-[#B5BCC4] transition-transform duration-200 shrink-0 ${isExpanded ? 'rotate-90 text-[#F13D30]' : ''}`} />
            <span className={`font-['Roboto',sans-serif] font-semibold text-sm transition-colors ${isExpanded ? 'text-[#F13D30]' : 'text-[#22262A] group-hover:text-[#F13D30]'}`}>
              {risk.name}
            </span>
          </div>
        </td>
        <td className="px-4 py-3.5"><ImpactBadge area={risk.impactArea} /></td>
        <td className="px-4 py-3.5 max-w-[220px]">
          <p className="font-['Roboto',sans-serif] text-xs text-[#464E58] truncate" title={risk.context}>{risk.context}</p>
        </td>
        <td className="px-4 py-3.5">
          <span className={`inline-flex px-2.5 py-1 rounded-full font-['Roboto',sans-serif] font-semibold text-xs ${riskBadge(risk.preRisk)}`}>{risk.preRisk}</span>
        </td>
        <td className="px-4 py-3.5">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-['Roboto',sans-serif] font-semibold text-xs ${statusBadge(risk.status)}`}>
            {statusIcon(risk.status)}{risk.status}
          </span>
        </td>
        <td className="px-4 py-3.5">
          <span className={`inline-flex px-2.5 py-1 rounded-full font-['Roboto',sans-serif] font-semibold text-xs ${riskBadge(risk.residualRisk)}`}>{risk.residualRisk}</span>
        </td>
        <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
          <button onClick={() => onDelete(risk.id)}
            className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-[#FEE2E2] transition-all">
            <Trash2 className="w-3.5 h-3.5 text-[#991B1B]" />
          </button>
        </td>
      </tr>
    );

    if (isExpanded) {
      rows.push(
        <tr key={`${risk.id}-drawer`}>
          <td colSpan={7} className="p-0">
            <RiskDrawerContent
              risk={risk}
              onUpdate={updates => onUpdate(risk.id, updates)}
              onClose={() => onToggleRow(risk.id)}
            />
          </td>
        </tr>
      );
    }
  });

  return <>{rows}</>;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function RiskManagementTab({ systemName }: { systemName: string }) {
  const [risks, setRisks] = useState<AIRisk[]>(INITIAL_RISKS);
  const [filterTab, setFilterTab] = useState<FilterTab>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(true);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filtered = filterTab === 'All' ? risks : risks.filter(r => r.status === filterTab);
  const counts = {
    all: risks.length,
    'Needs Mitigation': risks.filter(r => r.status === 'Needs Mitigation').length,
    'Pending Tests':    risks.filter(r => r.status === 'Pending Tests').length,
    'Acceptable':       risks.filter(r => r.status === 'Acceptable').length,
  };
  const criticalCount = risks.filter(r => r.preRisk === 'Critical').length;

  const handleUpdateRisk = (id: string, updates: Partial<AIRisk>) => {
    setRisks(prev => prev.map(r => {
      if (r.id !== id) return r;
      const changes: string[] = [];
      if (updates.severity !== undefined && updates.severity !== r.severity)
        changes.push(`Severity changed from ${r.severity} to ${updates.severity}`);
      if (updates.likelihood !== undefined && updates.likelihood !== r.likelihood)
        changes.push(`Likelihood changed from ${r.likelihood} to ${updates.likelihood}`);
      if (updates.systemComponent !== undefined && updates.systemComponent !== r.systemComponent)
        changes.push('System/Component Link updated');
      if (updates.safeByDesign !== undefined && updates.safeByDesign !== r.safeByDesign)
        changes.push('Safe by Design notes updated');
      if (updates.technicalControls !== undefined && updates.technicalControls !== r.technicalControls)
        changes.push('Technical Controls updated');
      if (updates.userInformation !== undefined && updates.userInformation !== r.userInformation)
        changes.push('User Information updated');
      if (updates.testingMetrics !== undefined && updates.testingMetrics !== r.testingMetrics)
        changes.push('Testing Metrics updated');
      if (updates.evidence !== undefined)
        changes.push('Evidence list updated');
      const newLog: AuditEntry[] = changes.length > 0 ? [{
        id: `a${Date.now()}`, date: 'Mar 10, 2026', user: 'You',
        change: changes.join('. ') + '.',
      }] : [];
      return { ...r, ...updates, auditLog: [...r.auditLog, ...newLog] };
    }));
  };

  const thClass = "px-4 py-3 text-left font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider whitespace-nowrap";

  return (
    <div className="flex h-full overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#FAFBFC]">
        <div className="px-8 py-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A] mb-1">Risk Management</h1>
              <p className="font-['Roboto',sans-serif] text-sm text-[#565F6C]">
                Risk ledger for <span className="font-semibold text-[#22262A]">{systemName}</span> — log, track, and mitigate AI risks per EU AI Act Art. 9.
              </p>
            </div>
            <button onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Roboto',sans-serif] font-bold text-sm hover:bg-[#DC180A] transition-colors shadow-sm shrink-0">
              <Plus className="w-4 h-4" /> New AI Risk
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Risks',      value: risks.length,              color: 'text-[#22262A]',  bg: 'bg-white' },
              { label: 'Needs Mitigation', value: counts['Needs Mitigation'], color: 'text-[#991B1B]',  bg: 'bg-[#FEE2E2]' },
              { label: 'Pending Tests',    value: counts['Pending Tests'],    color: 'text-[#1E40AF]',  bg: 'bg-[#DBEAFE]' },
              { label: 'Acceptable',       value: counts['Acceptable'],       color: 'text-[#065F46]',  bg: 'bg-[#D1FAE5]' },
            ].map(s => (
              <div key={s.label} className={`${s.bg} rounded-xl border border-[#F0F1F2] px-4 py-3 shadow-sm`}>
                <p className={`font-['Montserrat',sans-serif] font-bold text-2xl ${s.color}`}>{s.value}</p>
                <p className="font-['Roboto',sans-serif] text-xs text-[#565F6C] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-white border border-[#F0F1F2] rounded-xl p-1 mb-4 w-fit shadow-sm">
            {FILTER_TABS.map(tab => (
              <button key={tab} onClick={() => setFilterTab(tab)}
                className={`px-4 py-1.5 rounded-lg font-['Roboto',sans-serif] font-semibold text-sm transition-all ${filterTab === tab ? 'bg-[#F13D30] text-white shadow-sm' : 'text-[#565F6C] hover:bg-[#F5F6F8]'}`}>
                {tab}
                {tab !== 'All' && (
                  <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${filterTab === tab ? 'bg-white/20 text-white' : 'bg-[#F0F1F2] text-[#565F6C]'}`}>
                    {counts[tab]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Hint when a row is expanded */}
          {expandedRow && (
            <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-[#FEEDEC] rounded-lg border border-[#F9B3AE] w-fit">
              <Info className="w-3.5 h-3.5 text-[#F13D30] shrink-0" />
              <p className="font-['Roboto',sans-serif] text-xs text-[#F13D30]">
                Click the active row again or press <kbd className="font-mono font-bold">✕</kbd> in the drawer to close.
              </p>
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-xl border border-[#F0F1F2] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F9FAFB] border-b border-[#F0F1F2]">
                  <tr>
                    <th className={thClass}>Risk Name</th>
                    <th className={thClass}>Impact Area</th>
                    <th className={thClass}>Context</th>
                    <th className={thClass}>Pre-Mitigation Risk</th>
                    <th className={thClass}>Status</th>
                    <th className={thClass}>Residual Risk</th>
                    <th className="px-4 py-3 w-10" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F1F2]">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center">
                        <p className="font-['Roboto',sans-serif] font-medium text-sm text-[#565F6C]">No risks in this category</p>
                        <p className="font-['Roboto',sans-serif] text-xs text-[#B5BCC4] mt-1">Use "+ New AI Risk" to log the first entry.</p>
                      </td>
                    </tr>
                  ) : (
                    <RiskRows
                      filtered={filtered}
                      expandedRow={expandedRow}
                      onToggleRow={id => setExpandedRow(prev => prev === id ? null : id)}
                      onDelete={id => setRisks(prev => prev.filter(r => r.id !== id))}
                      onUpdate={handleUpdateRisk}
                    />
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 bg-[#F9FAFB] border-t border-[#F0F1F2] flex items-center justify-between">
              <p className="font-['Roboto',sans-serif] text-xs text-[#565F6C]">
                Showing <span className="font-semibold text-[#22262A]">{filtered.length}</span> of <span className="font-semibold text-[#22262A]">{risks.length}</span> risks
              </p>
              <div className="flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-[#B5BCC4]" />
                <span className="font-['Roboto',sans-serif] text-xs text-[#B5BCC4]">
                  {filterTab === 'All' ? 'All statuses shown' : `Filtered by: ${filterTab}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copilot Sidebar */}
      <CopilotSidebar
        isOpen={isCopilotOpen}
        onToggle={() => setIsCopilotOpen(p => !p)}
        pendingCount={counts['Pending Tests']}
        criticalCount={criticalCount}
      />

      {/* New Risk Modal */}
      {isModalOpen && (
        <NewRiskModal
          onClose={() => setIsModalOpen(false)}
          onAdd={risk => setRisks(prev => [risk, ...prev])}
        />
      )}
    </div>
  );
}
