import { ArrowLeft } from 'lucide-react';
import imgAvatar from "figma:asset/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png";

interface DatasetComplianceWorkspaceProps {
  datasetId: string;
  datasetName: string;
  dataType: string;
  complianceScore: number;
  onBack: () => void;
}

type LawKey = 'EU AI Act' | 'GDPR' | 'DSA' | 'Data Act';

// Dataset-level compliance articles
const datasetArticles = [
  { id: 'art-10',     law: 'EU AI Act' as LawKey, article: 'Art. 10',      title: 'Training, Validation & Testing Data',     desc: 'Governance practices for data quality, relevance, and statistical representativeness.',                                                  progress: 60 },
  { id: 'gdpr-art5',  law: 'GDPR'      as LawKey, article: 'GDPR Art. 5',  title: 'Principles of Personal Data Processing',  desc: 'Lawfulness, fairness, transparency, purpose limitation, data minimisation, accuracy and integrity.',                                    progress: 80 },
  { id: 'gdpr-art35', law: 'GDPR'      as LawKey, article: 'GDPR Art. 35', title: 'Data Protection Impact Assessment',        desc: 'Conduct DPIAs for high-risk processing involving AI-generated or AI-consumed datasets.',                                               progress: 45 },
];

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

export function DatasetComplianceWorkspace({
  datasetId,
  datasetName,
  dataType,
  complianceScore,
  onBack,
}: DatasetComplianceWorkspaceProps) {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FAFBFC]">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#F0F1F2] px-8 pt-5 pb-5 shrink-0">
        {/* Top row: back button + breadcrumb + avatar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1 hover:bg-[#ece9fe] rounded transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#5720B7]" />
            </button>
            <span className="font-['Roboto',sans-serif] font-semibold text-sm text-[#5720B7]">
              Compliance V2 / Dataset / {datasetName}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full border border-[#B5BCC4] overflow-hidden shrink-0">
            <img src={imgAvatar} alt="User" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Dataset Info */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-['Roboto',sans-serif] font-bold text-2xl text-[#22262A] tracking-[-0.24px] mb-1">
              {datasetName}
            </h1>
            <p className="font-['Roboto',sans-serif] font-normal text-base text-[#464E58]">
              Dataset compliance tracking for {dataType}
            </p>
          </div>
          <div className="bg-[#ece9fe] rounded-lg px-6 py-4 border border-[#ddd6fe]">
            <p className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider mb-1">
              Compliance Score
            </p>
            <p className="font-['Roboto',sans-serif] font-bold text-3xl text-[#5720B7]">
              {complianceScore}%
            </p>
          </div>
        </div>
      </div>

      {/* ── Scrollable Content ───────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto px-8 py-8">
          {/* Dataset Overview Card */}
          <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6 mb-6">
            <h3 className="font-['Roboto',sans-serif] font-bold text-lg text-[#22262A] mb-4">
              Dataset Overview
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider mb-2">
                  Dataset ID
                </p>
                <p className="font-['Roboto',sans-serif] font-medium text-sm text-[#22262A]">
                  {datasetId}
                </p>
              </div>
              <div>
                <p className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider mb-2">
                  Data Type
                </p>
                <p className="font-['Roboto',sans-serif] font-medium text-sm text-[#22262A]">
                  {dataType}
                </p>
              </div>
              <div>
                <p className="font-['Roboto',sans-serif] font-semibold text-xs text-[#565F6C] uppercase tracking-wider mb-2">
                  Last Updated
                </p>
                <p className="font-['Roboto',sans-serif] font-medium text-sm text-[#22262A]">
                  Mar 10, 2026
                </p>
              </div>
            </div>
          </div>

          {/* Compliance Requirements */}
          <div className="mb-6">
            <h3 className="font-['Roboto',sans-serif] font-bold text-lg text-[#22262A] mb-2">
              Compliance Requirements
            </h3>
            <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#565F6C] mb-4">
              Data governance and quality obligations for this dataset
            </p>
          </div>

          <div className="space-y-4">
            {datasetArticles.map(a => (
              <ArticleCard key={a.id} {...a} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
