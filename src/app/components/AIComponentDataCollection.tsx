import { useState } from 'react';
import { PageHeader } from './PageHeader';
import {
  ChevronDown,
  ChevronUp,
  Upload,
  Sparkles,
  File,
  X,
  Link,
  Check,
  ArrowLeft,
} from 'lucide-react';
import uploadIcon from "figma:asset/2b8c8c69d7c131e2086198407038f3b5cfb9ae02.png";

// ─── Purple / Roboto design tokens ────────────────────────────────────────────
const F = "font-['Roboto',sans-serif]";
const PRIMARY    = '#5720B7';
const PRIMARY_DK = '#4c1d95';
const PRIMARY_LT = '#ece9fe';

const inputClass =
  `w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg ${F} font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe]`;
const labelClass =
  `block ${F} font-semibold text-sm text-[#22262A] mb-2`;
const hintClass =
  `${F} font-normal text-xs text-[#565F6C] mt-1`;
const radioClass =
  `w-4 h-4 accent-[#5720B7] border-[#B5BCC4]`;
const btnPrimary =
  `px-6 py-2.5 bg-[#ece9fe] text-[#5720B7] rounded-lg ${F} font-bold text-sm hover:bg-[#ddd6fe] transition-all flex items-center gap-2 border border-[#ddd6fe]`;
const btnSecondary =
  `px-6 py-2.5 bg-[#ece9fe] border border-[#ddd6fe] text-[#5720B7] rounded-lg ${F} font-semibold text-sm hover:bg-[#ddd6fe] transition-colors`;

// ─── CollapsibleSection ───────────────────────────────────────────────────────
interface CollapsibleSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, description, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#FAFAFA] transition-colors"
      >
        <div className="text-left">
          <h3 className={`${F} font-semibold text-lg text-[#22262A]`}>{title}</h3>
          {description && (
            <p className={`${F} font-normal text-sm text-[#464E58] mt-1`}>{description}</p>
          )}
        </div>
        {isOpen
          ? <ChevronUp className="w-5 h-5 text-[#565F6C] shrink-0" />
          : <ChevronDown className="w-5 h-5 text-[#565F6C] shrink-0" />}
      </button>
      {isOpen && (
        <div className="px-6 py-6 border-t border-[#F0F1F2]">{children}</div>
      )}
    </div>
  );
}

// ─── DocumentUploadSection ────────────────────────────────────────────────────
function DocumentUploadSection() {
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: '1', name: 'Component_ModelCard.pdf',  uploadTime: '2 mins ago', selected: false },
    { id: '2', name: 'Vendor_DataSheet.docx',    uploadTime: '5 mins ago', selected: false },
  ]);
  const [showLinkModal,   setShowLinkModal]   = useState(false);
  const [currentFileLink, setCurrentFileLink] = useState('');
  const [currentFileName, setCurrentFileName] = useState('');
  const [linkCopied,      setLinkCopied]      = useState(false);

  const toggleFileSelection = (id: string) =>
    setUploadedFiles(fs => fs.map(f => f.id === id ? { ...f, selected: !f.selected } : f));

  const selectAllFiles = () =>
    setUploadedFiles(fs => fs.map(f => ({ ...f, selected: true })));

  const generateLink = (fileId: string, fileName: string) => {
    setCurrentFileLink(`${window.location.origin}/api/documents/${fileId}`);
    setCurrentFileName(fileName);
    setShowLinkModal(true);
    setLinkCopied(false);
  };

  const copyToClipboard = () => {
    const ta = document.createElement('textarea');
    ta.value = currentFileLink;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); setLinkCopied(true); setTimeout(() => setLinkCopied(false), 2000); }
    finally { document.body.removeChild(ta); }
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div className="border-2 border-dashed border-[#B5BCC4] rounded-lg p-6 bg-[#FEFEFE] hover:border-[#5720B7] transition-colors">
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <div className="w-12 h-12 flex items-center justify-center">
            <img src={uploadIcon} alt="Upload" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className={`${F} font-medium text-sm text-[#464E58]`}>
              Click or drag and drop to add evidence documents
            </p>
            <p className={`${F} font-normal text-xs text-[#565F6C] mt-1`}>
              PDF, DOC, JPG, XLS (Max 5GB)
            </p>
          </div>
          <button className={`mt-1 px-4 py-1.5 bg-white border border-[#5720B7] text-[#5720B7] rounded-full ${F} font-semibold text-sm hover:bg-[#ece9fe] transition-colors flex items-center gap-2`}>
            <Upload className="w-4 h-4" />
            Choose File
          </button>
        </div>
      </div>

      {/* File list */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          {uploadedFiles.map(file => (
            <div key={file.id} className="flex items-center gap-4 p-4 bg-white border border-[#F0F1F2] rounded-lg hover:border-[#B5BCC4] transition-colors">
              <input
                type="checkbox"
                checked={file.selected}
                onChange={() => toggleFileSelection(file.id)}
                className="w-4 h-4 accent-[#5720B7] cursor-pointer"
              />
              <File className="w-5 h-5 text-[#5720B7] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className={`${F} font-medium text-sm text-[#22262A] truncate`}>{file.name}</p>
                <p className={`${F} font-normal text-xs text-[#565F6C]`}>{file.uploadTime}</p>
              </div>
              <button
                onClick={() => generateLink(file.id, file.name)}
                className={`px-3 py-1.5 bg-[#5720B7] text-white rounded-lg ${F} font-semibold text-xs hover:bg-[#4c1d95] transition-colors flex items-center gap-1.5`}
              >
                <Link className="w-3.5 h-3.5" />
                Generate link
              </button>
            </div>
          ))}
        </div>
      )}

      {/* AI auto-fill */}
      <div className="flex items-center gap-3">
        <span className={`${F} font-medium text-sm text-[#464E58]`}>AI Read & Auto-fill from:</span>
        <button
          onClick={selectAllFiles}
          className={`px-5 py-2 bg-[#5720B7] text-white rounded-lg ${F} font-semibold text-sm hover:bg-[#4c1d95] transition-colors flex items-center gap-2 shadow-sm`}
        >
          <Sparkles className="w-4 h-4" />All files
        </button>
        <button className={`px-5 py-2 bg-white border border-[#5720B7] text-[#5720B7] rounded-lg ${F} font-semibold text-sm hover:bg-[#ece9fe] transition-colors flex items-center gap-2`}>
          <Sparkles className="w-4 h-4" />Selected files
        </button>
      </div>

      {/* Link modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`${F} font-semibold text-lg text-[#22262A]`}>Share Link</h3>
              <button onClick={() => setShowLinkModal(false)} className="text-[#5720B7] hover:text-[#4c1d95]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className={`${F} font-normal text-sm text-[#464E58] mb-4`}>
              Share the link to: <strong>{currentFileName}</strong>
            </p>
            <div className="flex items-center gap-2">
              <input type="text" value={currentFileLink} readOnly className={inputClass} />
              <button
                onClick={copyToClipboard}
                className={`px-4 py-2 bg-[#5720B7] text-white rounded-lg ${F} font-semibold text-sm hover:bg-[#4c1d95] transition-colors flex items-center gap-1.5 whitespace-nowrap`}
              >
                {linkCopied
                  ? <><Check className="w-4 h-4" />Copied</>
                  : <><Link className="w-4 h-4" />Copy</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CheckboxCardGroup ────────────────────────────────────────────────────────
function CheckboxCardGroup({
  options, selected, onChange, cols = 2,
}: { options: string[]; selected: string[]; onChange: (v: string[]) => void; cols?: 2 | 3 }) {
  const toggle = (opt: string) =>
    onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt]);
  return (
    <div className={`grid gap-3 ${cols === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
      {options.map(opt => (
        <label
          key={opt}
          className={`flex items-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
            selected.includes(opt) ? 'border-[#5720B7] bg-[#ece9fe]' : 'border-[#F0F1F2] bg-white hover:bg-[#F9FAFB]'
          }`}
        >
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => toggle(opt)}
            className="w-4 h-4 accent-[#5720B7] border-[#B5BCC4] rounded"
          />
          <span className={`${F} font-normal text-sm text-[#22262A]`}>{opt}</span>
        </label>
      ))}
    </div>
  );
}

// ─── RadioCardGroup ───────────────────────────────────────────────────────────
function RadioCardGroup({
  options, value, onChange, name, cols = 2,
}: { options: string[]; value: string; onChange: (v: string) => void; name: string; cols?: 1 | 2 | 3 }) {
  const gridClass = cols === 1 ? 'flex flex-col gap-3' : cols === 3 ? 'grid grid-cols-3 gap-3' : 'grid grid-cols-2 gap-3';
  return (
    <div className={gridClass}>
      {options.map(opt => (
        <label
          key={opt}
          className={`flex items-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
            value === opt ? 'border-[#5720B7] bg-[#ece9fe]' : 'border-[#F0F1F2] bg-white hover:bg-[#F9FAFB]'
          }`}
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className={radioClass}
          />
          <span className={`${F} font-normal text-sm text-[#22262A]`}>{opt}</span>
        </label>
      ))}
    </div>
  );
}

// ─── InlineRadioGroup ─────────────────────────────────────────────────────────
function InlineRadioGroup({
  options, value, onChange, name,
}: { options: string[]; value: string; onChange: (v: string) => void; name: string }) {
  return (
    <div className="flex gap-4 flex-wrap">
      {options.map(opt => (
        <label key={opt} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className={radioClass}
          />
          <span className={`${F} font-normal text-sm text-[#22262A]`}>{opt}</span>
        </label>
      ))}
    </div>
  );
}

// ─── Banners ──────────────────────────────────────────────────────────────────
function InfoBanner({ article, text }: { article: string; text: React.ReactNode }) {
  return (
    <div className="bg-[#ece9fe] border border-[#ddd6fe] rounded-lg p-4 flex items-start gap-3">
      <span className={`inline-flex px-2 py-0.5 bg-[#5720B7] text-white ${F} font-bold text-xs rounded shrink-0 mt-0.5`}>
        {article}
      </span>
      <p className={`${F} font-normal text-sm text-[#4c1d95]`}>{text}</p>
    </div>
  );
}

function WarnBanner({ text }: { text: React.ReactNode }) {
  return (
    <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-lg p-4 flex items-start gap-3">
      <span className="text-[#EA580C] font-bold text-sm shrink-0 mt-0.5">!</span>
      <p className={`${F} font-normal text-sm text-[#9A3412]`}>{text}</p>
    </div>
  );
}

function DangerBanner({ text }: { text: React.ReactNode }) {
  return (
    <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-4 flex items-start gap-3">
      <span className="text-[#DC2626] font-bold text-sm shrink-0 mt-0.5">!</span>
      <p className={`${F} font-normal text-sm text-[#991B1B]`}>{text}</p>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
interface AIComponentDataCollectionProps {
  componentId: string;
  componentName: string;
  onBack: () => void;
}

export function AIComponentDataCollection({ componentName, onBack }: AIComponentDataCollectionProps) {

  // Section 2 — Component Identity & Source
  const [s1Name,    setS1Name]    = useState(componentName);
  const [s1Version, setS1Version] = useState('');
  const [s1Type,    setS1Type]    = useState('');
  const [s1Source,  setS1Source]  = useState('');
  const [s1Vendor,  setS1Vendor]  = useState('');
  const [s1License, setS1License] = useState('');

  // Section 3 — Technical Capabilities
  const [s2InputMod,  setS2InputMod]  = useState<string[]>([]);
  const [s2OutputMod, setS2OutputMod] = useState<string[]>([]);
  const [s2GPAI,      setS2GPAI]      = useState('');

  // Section 4 — Data Governance & Training
  const [s3TrainingData,  setS3TrainingData]  = useState('');
  const [s3BiasExamined,  setS3BiasExamined]  = useState('');
  const [s3Copyright,     setS3Copyright]     = useState('');

  // Section 5 — Accuracy & Cybersecurity
  const [s4Benchmarking,    setS4Benchmarking]    = useState('');
  const [s4ErrorRate,       setS4ErrorRate]       = useState('');
  const [s4SecurityTesting, setS4SecurityTesting] = useState('');
  const [s4Vulnerabilities, setS4Vulnerabilities] = useState('');

  const [activeTab] = useState<'Profile'>('Profile');

  const handleSave = (section: string) => alert(`${section} saved successfully!`);

  const COMPONENT_TYPES = [
    'Foundational Model (LLM, Vision, etc.)',
    'Machine Learning Model (Classification, Regression)',
    'Third-Party API',
    'Software Library / Agent Script',
    'Dataset',
  ];
  const SOURCE_OPTIONS = [
    'In-house developed (from scratch)',
    'Open-source (Downloaded weights)',
    'Commercial Vendor / API',
  ];
  const LICENSE_OPTIONS = [
    'Commercial / Proprietary',
    'Open Source (MIT, Apache 2.0, etc.)',
    'Open Weights (Llama license, etc.)',
    'Unknown',
  ];
  const MODALITY_OPTIONS = ['Text', 'Image', 'Audio', 'Video', 'Tabular Data', 'Code'];
  const OUTPUT_OPTIONS   = ['Text', 'Image', 'Audio', 'Video', 'Decisions/Scores', 'Code'];
  const TRAINING_DATA_OPTIONS = [
    'Internal proprietary data',
    'Publicly scraped internet data',
    'Purchased / Licensed datasets',
    'Unknown (Vendor does not disclose)',
  ];
  const BIAS_OPTIONS = [
    'Yes, fully documented',
    'Partial / Vendor claims testing',
    'No',
    'Unknown',
  ];
  const BENCHMARK_OPTIONS = [
    'Yes, internal benchmarking',
    'Yes, vendor-provided benchmarks',
    'No',
  ];
  const SECURITY_OPTIONS = [
    'Yes, internal testing',
    'Yes, third-party audit',
    'No',
  ];

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FAFBFC]">
      <PageHeader
        breadcrumb="AI Inventory > Component Registry"
        title={s1Name || componentName}
        actions={
          <button
            onClick={onBack}
            className={`px-4 py-2 bg-[#ece9fe] border border-[#ddd6fe] text-[#5720B7] rounded-full ${F} font-semibold text-sm hover:bg-[#ddd6fe] transition-colors flex items-center gap-2`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </button>
        }
      />

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-[#F0F1F2]">
        <div className="max-w-[1000px] mx-auto px-8">
          <div className="flex gap-8">
            <button
              className={`relative px-1 py-4 ${F} font-semibold text-sm transition-colors ${
                activeTab === 'Profile'
                  ? 'text-[#5720B7] border-b-2 border-[#5720B7]'
                  : 'text-[#B5BCC4] hover:text-[#464E58]'
              }`}
            >
              Profile
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1000px] mx-auto px-8 py-8 space-y-6">

          {/* 1. Document & Evidence Upload */}
          <CollapsibleSection
            title="1. Document & Evidence Upload"
            description="Upload documents for AI-powered auto-fill"
            defaultOpen
          >
            <DocumentUploadSection />
          </CollapsibleSection>

          {/* 2. Component Identity & Source */}
          <CollapsibleSection
            title="2. Component Identity & Source"
            description="Basic tracking for the specific model, API or dataset"
            defaultOpen
          >
            <div className="space-y-6">

              <div>
                <label className={labelClass}>
                  Q1: Component Name <span className="text-[#5720B7]">*</span>
                </label>
                <input
                  type="text"
                  value={s1Name}
                  onChange={e => setS1Name(e.target.value)}
                  placeholder="e.g. GPT-4o, Custom Llama-3, Resume-Parser-v2"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Q2: Component Version</label>
                <input
                  type="text"
                  value={s1Version}
                  onChange={e => setS1Version(e.target.value)}
                  placeholder="e.g. 2024-05-13, v3.1, gpt-4o-2024-11-20"
                  className={inputClass}
                />
              </div>

              <div className="space-y-3">
                <label className={labelClass}>
                  Q3: Component Type <span className="text-[#5720B7]">*</span>
                </label>
                <RadioCardGroup options={COMPONENT_TYPES} value={s1Type} onChange={setS1Type} name="s1type" cols={1} />
              </div>

              <div className="space-y-3">
                <label className={labelClass}>
                  Q4: Source / Origin <span className="text-[#5720B7]">*</span>
                </label>
                <RadioCardGroup options={SOURCE_OPTIONS} value={s1Source} onChange={setS1Source} name="s1source" cols={1} />
              </div>

              <div>
                <label className={labelClass}>Q5: Vendor / Creator Name</label>
                <input
                  type="text"
                  value={s1Vendor}
                  onChange={e => setS1Vendor(e.target.value)}
                  placeholder="e.g. OpenAI, Meta, Internal Data Science Team"
                  className={inputClass}
                />
                <p className={hintClass}>Leave blank if fully in-house.</p>
              </div>

              <div className="space-y-3">
                <label className={labelClass}>Q6: Licensing Model</label>
                <RadioCardGroup options={LICENSE_OPTIONS} value={s1License} onChange={setS1License} name="s1license" cols={2} />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={onBack}
                  className={btnSecondary}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSave('Component Identity')}
                  className={btnPrimary}
                >
                  Confirm and Save
                </button>
              </div>
            </div>
          </CollapsibleSection>

          {/* 3. Technical Capabilities */}
          <CollapsibleSection
            title="3. Technical Capabilities"
            description="What does this specific component do?"
          >
            <div className="space-y-6">

              <div className="space-y-3">
                <label className={labelClass}>
                  Q1: Modalities (Inputs supported) <span className="text-[#5720B7]">*</span>
                </label>
                <p className={hintClass}>Multiple selections allowed</p>
                <CheckboxCardGroup options={MODALITY_OPTIONS} selected={s2InputMod} onChange={setS2InputMod} cols={3} />
              </div>

              <div className="space-y-3">
                <label className={labelClass}>
                  Q2: Modalities (Outputs generated) <span className="text-[#5720B7]">*</span>
                </label>
                <p className={hintClass}>Multiple selections allowed</p>
                <CheckboxCardGroup options={OUTPUT_OPTIONS} selected={s2OutputMod} onChange={setS2OutputMod} cols={3} />
              </div>

              <div className="space-y-3">
                <label className={labelClass}>
                  Q3: Is this a General-Purpose AI (GPAI) model? <span className="text-[#5720B7]">*</span>
                </label>
                <p className={hintClass}>Crucial for GPAI Provider rules under the EU AI Act.</p>
                <InlineRadioGroup options={['Yes', 'No', 'Unknown']} value={s2GPAI} onChange={setS2GPAI} name="s2gpai" />
                {s2GPAI === 'Yes' && (
                  <WarnBanner
                    text={<>GPAI models are subject to additional obligations under <strong>Chapter V of the EU AI Act</strong>, including transparency requirements and, for systemic-risk models, adversarial testing.</>}
                  />
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => handleSave('Technical Capabilities')}
                  className={btnPrimary}
                >
                  Confirm and Save
                </button>
              </div>
            </div>
          </CollapsibleSection>

          {/* 4. Data Governance & Training */}
          <CollapsibleSection
            title="4. Data Governance & Training"
            description="How was this component built and taught? (Article 10 focus)"
          >
            <div className="space-y-6">

              <InfoBanner
                article="Art. 10"
                text="Questions in this section map to Article 10 of the EU AI Act — Data and data governance requirements."
              />

              <div className="space-y-3">
                <label className={labelClass}>
                  Q1: What data was used to train this component? <span className="text-[#5720B7]">*</span>
                </label>
                <RadioCardGroup options={TRAINING_DATA_OPTIONS} value={s3TrainingData} onChange={setS3TrainingData} name="s3training" cols={1} />
              </div>

              <div className="space-y-3">
                <label className={labelClass}>
                  Q2: Has the training data been examined for biases? <span className="text-[#5720B7]">*</span>
                </label>
                <p className={hintClass}>Required under Article 10(2)(f) of the EU AI Act.</p>
                <RadioCardGroup options={BIAS_OPTIONS} value={s3BiasExamined} onChange={setS3BiasExamined} name="s3bias" cols={2} />
                {s3BiasExamined === 'No' && (
                  <DangerBanner
                    text={<>Bias examination is required for high-risk AI systems under <strong>Art. 10(2)(f)</strong>. Consider scheduling a bias audit.</>}
                  />
                )}
              </div>

              <div className="space-y-3">
                <label className={labelClass}>Q3: Are copyrighted materials included in the training data?</label>
                <p className={hintClass}>Important for GPAI transparency obligations.</p>
                <InlineRadioGroup options={['Yes', 'No', 'Unknown']} value={s3Copyright} onChange={setS3Copyright} name="s3copyright" />
                {s3Copyright === 'Yes' && (
                  <WarnBanner
                    text={<>GPAI model providers must publish a summary of training data including copyrighted works under <strong>Art. 53(1)(d)</strong> and the <strong>EU AI Act Code of Practice</strong>.</>}
                  />
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => handleSave('Data Governance')}
                  className={btnPrimary}
                >
                  Confirm and Save
                </button>
              </div>
            </div>
          </CollapsibleSection>

          {/* 5. Accuracy & Cybersecurity */}
          <CollapsibleSection
            title="5. Accuracy & Cybersecurity"
            description="How reliable and safe is this component? (Article 15 focus)"
          >
            <div className="space-y-6">

              <InfoBanner
                article="Art. 15"
                text="Questions in this section map to Article 15 of the EU AI Act — Accuracy, robustness and cybersecurity."
              />

              <div className="space-y-3">
                <label className={labelClass}>
                  Q1: Has this component undergone formal accuracy evaluation / benchmarking? <span className="text-[#5720B7]">*</span>
                </label>
                <RadioCardGroup options={BENCHMARK_OPTIONS} value={s4Benchmarking} onChange={setS4Benchmarking} name="s4benchmark" cols={1} />
              </div>

              <div>
                <label className={labelClass}>Q2: Known Error Rate / Accuracy Metric</label>
                <input
                  type="text"
                  value={s4ErrorRate}
                  onChange={e => setS4ErrorRate(e.target.value)}
                  placeholder="e.g. 94% accuracy on internal validation set; 2% hallucination rate"
                  className={inputClass}
                />
                <p className={hintClass}>Optional — provide any known accuracy figures or error rates.</p>
              </div>

              <div className="space-y-3">
                <label className={labelClass}>
                  Q3: Has this component undergone security testing? <span className="text-[#5720B7]">*</span>
                </label>
                <p className={hintClass}>e.g. Red-Teaming, Penetration testing, adversarial robustness evaluation.</p>
                <RadioCardGroup options={SECURITY_OPTIONS} value={s4SecurityTesting} onChange={setS4SecurityTesting} name="s4security" cols={1} />
              </div>

              <div>
                <label className={labelClass}>Q4: Known Vulnerabilities or Limitations</label>
                <textarea
                  rows={4}
                  value={s4Vulnerabilities}
                  onChange={e => setS4Vulnerabilities(e.target.value)}
                  placeholder="e.g. Model is susceptible to prompt injection attacks; performance drops on non-English text; known hallucination rate of ~3% on rare medical terminology."
                  className={`${inputClass} resize-y`}
                />
                <p className={hintClass}>Describe any known weaknesses, failure modes or attack surfaces.</p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={onBack}
                  className={btnSecondary}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSave('Accuracy & Cybersecurity')}
                  className={btnPrimary}
                >
                  Confirm and Save
                </button>
              </div>
            </div>
          </CollapsibleSection>

        </div>
      </div>
    </div>
  );
}