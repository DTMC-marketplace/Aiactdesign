import { useState } from 'react';
import { ChevronDown, ChevronUp, Upload, Sparkles, File, X, Link, Check, Search, Cpu, Database } from 'lucide-react';
import uploadIcon from "figma:asset/2b8c8c69d7c131e2086198407038f3b5cfb9ae02.png";

// ─── CollapsibleSection ───────────────────────────────────────────────────────
interface CollapsibleSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}
export function CollapsibleSection({ title, description, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#FEFEFE] transition-colors"
      >
        <div className="text-left">
          <h3 className="font-['Montserrat',sans-serif] font-semibold text-lg text-[#22262A]">{title}</h3>
          {description && (
            <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mt-1">{description}</p>
          )}
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-[#565F6C] shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#565F6C] shrink-0" />}
      </button>
      {isOpen && <div className="px-6 py-6 border-t border-[#F0F1F2]">{children}</div>}
    </div>
  );
}

// ─── AssessmentBlock ──────────────────────────────────────────────────────────
interface AssessmentBlockProps {
  title: string;
  status: string;
  statusColor: 'green' | 'orange' | 'red' | 'yellow' | 'gray';
  children: React.ReactNode;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isDeactivated?: boolean;
}
export function AssessmentBlock({ title, status, statusColor, children, isCollapsed, onToggleCollapse, isDeactivated = false }: AssessmentBlockProps) {
  const colors = {
    green: 'bg-[#E8F5E9] text-[#2E7D32]',
    orange: 'bg-[#FFF3E0] text-[#E65100]',
    red: 'bg-[#FFEBEE] text-[#C62828]',
    yellow: 'bg-[#FFF9E6] text-[#F57C00]',
    gray: 'bg-[#F0F1F2] text-[#B5BCC4]',
  };
  return (
    <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm overflow-hidden">
      <button onClick={onToggleCollapse} className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#FEFEFE] transition-colors">
        <div className="flex items-center gap-4">
          <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A]">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className={`px-4 py-1.5 rounded-full font-['Montserrat',sans-serif] font-semibold text-sm ${colors[statusColor]}`}>{status}</div>
          {isCollapsed ? <ChevronDown className="w-5 h-5 text-[#565F6C] shrink-0" /> : <ChevronUp className="w-5 h-5 text-[#565F6C] shrink-0" />}
        </div>
      </button>
      {!isCollapsed && <div className="px-6 py-6 border-t border-[#F0F1F2]">{children}</div>}
    </div>
  );
}

// ─── DocumentUploadSection ────────────────────────────────────────────────────
export function DocumentUploadSection() {
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: '1', name: 'Company_Registration.pdf', uploadTime: '2 mins ago', selected: false },
    { id: '2', name: 'AI_Policy_Document.docx', uploadTime: '5 mins ago', selected: false },
    { id: '3', name: 'Compliance_Report_2024.pdf', uploadTime: '10 mins ago', selected: false },
  ]);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [currentFileLink, setCurrentFileLink] = useState('');
  const [currentFileName, setCurrentFileName] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const toggleFileSelection = (id: string) =>
    setUploadedFiles(fs => fs.map(f => f.id === id ? { ...f, selected: !f.selected } : f));

  const selectAllFiles = () => setUploadedFiles(fs => fs.map(f => ({ ...f, selected: true })));

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
      <div className="border-2 border-dashed border-[#B5BCC4] rounded-lg p-6 bg-[#FEFEFE] hover:border-[#F13D30] transition-colors">
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <div className="w-12 h-12 flex items-center justify-center">
            <img src={uploadIcon} alt="Upload" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="font-['Montserrat',sans-serif] font-medium text-sm text-[#464E58]">Click or drag and drop to add more evidence document</p>
            <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C] mt-1">PDF, DOC, JPG, XLS (Max 5GB)</p>
          </div>
          <button className="mt-1 px-4 py-1.5 bg-white border border-[#DC180A] text-[#F13D30] rounded-full font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#FEEDEC] transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" /> Choose File
          </button>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          {uploadedFiles.map(file => (
            <div key={file.id} className="flex items-center gap-4 p-4 bg-white border border-[#F0F1F2] rounded-lg hover:border-[#B5BCC4] transition-colors">
              <input type="checkbox" checked={file.selected} onChange={() => toggleFileSelection(file.id)} className="w-4 h-4 accent-[#F13D30] cursor-pointer" />
              <File className="w-5 h-5 text-[#F13D30] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A] truncate">{file.name}</p>
                <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">{file.uploadTime}</p>
              </div>
              <button onClick={() => generateLink(file.id, file.name)} className="px-3 py-1.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-xs hover:bg-[#DC180A] transition-colors flex items-center gap-1.5">
                <Link className="w-3.5 h-3.5" /> Generate link
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3">
        <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#464E58]">AI Read & Auto-fill from:</span>
        <button onClick={selectAllFiles} className="px-5 py-2 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors flex items-center gap-2 shadow-sm">
          <Sparkles className="w-4 h-4" /> All files
        </button>
        <button className="px-5 py-2 bg-white border border-[#DC180A] text-[#F13D30] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#FEEDEC] transition-colors flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> Selected files
        </button>
      </div>

      {showLinkModal && (
        <div className="fixed inset-0 bg-[#565F6C] bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Montserrat',sans-serif] font-semibold text-lg text-[#22262A]">Share Link</h3>
              <button onClick={() => setShowLinkModal(false)} className="text-[#F13D30] hover:text-[#DC180A] transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-4">Share the link to the file: <strong>{currentFileName}</strong></p>
            <div className="flex items-center gap-2">
              <input type="text" value={currentFileLink} readOnly className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC]" />
              <button onClick={copyToClipboard} className="px-4 py-2 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors flex items-center gap-1.5 whitespace-nowrap">
                {linkCopied ? <><Check className="w-4 h-4" />Copied</> : <><Link className="w-4 h-4" />Copy</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Component Registry data ──────────────────────────────────────────────────
export const COMPONENT_REGISTRY = [
  { id: 'c1', name: 'GPT-4o API',                  type: 'Third-Party API',  source: 'OpenAI' },
  { id: 'c2', name: 'Custom Llama-3 (Fine-tuned)', type: 'Fine-tuned Model', source: 'Meta' },
  { id: 'c3', name: 'Resume Dataset V1',            type: 'Dataset',          source: 'In-house' },
  { id: 'c4', name: 'Bias Detection Script',        type: 'ML Script',        source: 'In-house' },
  { id: 'c5', name: 'Claude 3.5 Sonnet API',        type: 'Third-Party API',  source: 'Anthropic' },
  { id: 'c6', name: 'Credit Risk Embeddings',       type: 'Vector Store',     source: 'In-house' },
  { id: 'c7', name: 'Sentence-BERT (HF)',            type: 'Foundation Model', source: 'HuggingFace' },
  { id: 'c8', name: 'Maintenance Sensor Dataset',   type: 'Dataset',          source: 'In-house' },
];

export const TYPE_BADGE: Record<string, string> = {
  'Foundation Model': 'bg-[#ede9fe] text-[#5b21b6]',
  'Dataset':          'bg-[#dbeafe] text-[#1e40af]',
  'ML Script':        'bg-[#d1fae5] text-[#065f46]',
  'Third-Party API':  'bg-[#fef3c7] text-[#92400e]',
  'Fine-tuned Model': 'bg-[#fce7f3] text-[#9d174d]',
  'Vector Store':     'bg-[#e0f2fe] text-[#0369a1]',
};

// ─── Dataset Registry data ────────────────────────────────────────────────────
export const DATASET_REGISTRY = [
  { id: 'd1', name: 'Resume Dataset V1',            purpose: 'Training',    source: 'In-house' },
  { id: 'd2', name: 'Maintenance Sensor Dataset',   purpose: 'Training',    source: 'In-house' },
  { id: 'd3', name: 'Customer Interaction Logs',    purpose: 'Fine-tuning', source: 'In-house' },
  { id: 'd4', name: 'Credit Risk Benchmark Set',    purpose: 'Validation',  source: 'In-house' },
  { id: 'd5', name: 'Common Crawl (Web Snapshot)',  purpose: 'Pre-training', source: 'Public' },
  { id: 'd6', name: 'HR Employee Profiles',         purpose: 'Testing',     source: 'In-house' },
  { id: 'd7', name: 'Open Images V7',               purpose: 'Training',    source: 'Public' },
  { id: 'd8', name: 'Synthetic Fraud Transactions', purpose: 'Testing',     source: 'In-house' },
];

export const PURPOSE_BADGE: Record<string, string> = {
  'Training':    'bg-[#dbeafe] text-[#1e40af]',
  'Validation':  'bg-[#d1fae5] text-[#065f46]',
  'Testing':     'bg-[#fef3c7] text-[#92400e]',
  'Fine-tuning': 'bg-[#ede9fe] text-[#5b21b6]',
  'Pre-training':'bg-[#fce7f3] text-[#9d174d]',
  'Operational': 'bg-[#e0f2fe] text-[#0369a1]',
};

// ─── ComponentLinker ──────────────────────────────────────────────────────────
export function ComponentLinker({ selectedIds, onChange }: { selectedIds: string[]; onChange: (ids: string[]) => void }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const filtered = COMPONENT_REGISTRY.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.type.toLowerCase().includes(query.toLowerCase()) ||
    c.source.toLowerCase().includes(query.toLowerCase())
  );

  const toggle = (id: string) =>
    onChange(selectedIds.includes(id) ? selectedIds.filter(x => x !== id) : [...selectedIds, id]);

  const selectedComponents = COMPONENT_REGISTRY.filter(c => selectedIds.includes(c.id));

  return (
    <div className="space-y-3">
      <div>
        <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-1">
          Q8: Which AI Components / Models power this system?
        </label>
        <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C] mb-3">
          Link components from the Component Registry. Multiple selections allowed.
        </p>
      </div>

      <div className="relative">
        <div
          className={`flex items-center gap-2 w-full px-4 py-2.5 border rounded-lg bg-white transition-colors cursor-text ${open ? 'border-[#F13D30] ring-2 ring-[#FEEDEC]' : 'border-[#B5BCC4] hover:border-[#8A9099]'}`}
          onClick={() => setOpen(true)}
        >
          <Search className="w-4 h-4 text-[#B5BCC4] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder="Search components by name, type, or source…"
            className="flex-1 bg-transparent font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none"
          />
          {query && (
            <button onMouseDown={e => { e.preventDefault(); setQuery(''); }} className="text-[#B5BCC4] hover:text-[#565F6C]">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {open && (
          <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg overflow-hidden">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 font-['Montserrat',sans-serif] text-sm text-[#B5BCC4] text-center">No components match your search</div>
            ) : (
              <ul className="max-h-56 overflow-y-auto divide-y divide-[#F0F1F2]">
                {filtered.map(comp => {
                  const isSelected = selectedIds.includes(comp.id);
                  return (
                    <li
                      key={comp.id}
                      onMouseDown={e => { e.preventDefault(); toggle(comp.id); }}
                      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${isSelected ? 'bg-[#FEEDEC]' : 'hover:bg-[#F9FAFB]'}`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-[#F13D30] border-[#F13D30]' : 'border-[#B5BCC4]'}`}>
                        {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                      <Cpu className="w-4 h-4 text-[#565F6C] shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A] truncate">{comp.name}</p>
                        <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">{comp.source}</p>
                      </div>
                      <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold font-['Montserrat',sans-serif] ${TYPE_BADGE[comp.type] ?? 'bg-[#F0F1F2] text-[#565F6C]'}`}>{comp.type}</span>
                    </li>
                  );
                })}
              </ul>
            )}
            <div className="px-4 py-2 bg-[#F9FAFB] border-t border-[#F0F1F2]">
              <p className="font-['Montserrat',sans-serif] text-xs text-[#B5BCC4]">{selectedIds.length} of {COMPONENT_REGISTRY.length} components selected</p>
            </div>
          </div>
        )}
      </div>

      {selectedComponents.length > 0 ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {selectedComponents.map(comp => (
            <span key={comp.id} className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-[#FEEDEC] border border-[#F13D30] rounded-full font-['Montserrat',sans-serif] font-medium text-xs text-[#F13D30]">
              <Cpu className="w-3 h-3" />
              {comp.name}
              <button onClick={() => toggle(comp.id)} className="hover:text-[#DC180A] ml-0.5"><X className="w-3 h-3" /></button>
            </span>
          ))}
          <button onClick={() => onChange([])} className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-['Montserrat',sans-serif] text-[#565F6C] hover:text-[#22262A] transition-colors">
            <X className="w-3 h-3" /> Clear all
          </button>
        </div>
      ) : (
        <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#B5BCC4] italic">
          No components linked yet. Search above to link components from the registry.
        </p>
      )}
    </div>
  );
}

// ─── DatasetLinker ────────────────────────────────────────────────────────────
export function DatasetLinker({ selectedIds, onChange }: { selectedIds: string[]; onChange: (ids: string[]) => void }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const filtered = DATASET_REGISTRY.filter(d =>
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.purpose.toLowerCase().includes(query.toLowerCase()) ||
    d.source.toLowerCase().includes(query.toLowerCase())
  );

  const toggle = (id: string) =>
    onChange(selectedIds.includes(id) ? selectedIds.filter(x => x !== id) : [...selectedIds, id]);

  const selectedDatasets = DATASET_REGISTRY.filter(d => selectedIds.includes(d.id));

  return (
    <div className="space-y-3">
      <div>
        <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-1">
          Q5: Which datasets are used by this AI system? <span className="text-[#F13D30]">*</span>
        </label>
        <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C] mb-3">
          Select all datasets used to train, validate, test, or operate this system. If a dataset is not listed, you can register it in the Data Hub.
        </p>
      </div>

      <div className="relative">
        <div
          className={`flex items-center gap-2 w-full px-4 py-2.5 border rounded-lg bg-white transition-colors cursor-text ${open ? 'border-[#F13D30] ring-2 ring-[#FEEDEC]' : 'border-[#B5BCC4] hover:border-[#8A9099]'}`}
          onClick={() => setOpen(true)}
        >
          <Search className="w-4 h-4 text-[#B5BCC4] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder="Search datasets by name, purpose, or source…"
            className="flex-1 bg-transparent font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none"
          />
          {query && (
            <button onMouseDown={e => { e.preventDefault(); setQuery(''); }} className="text-[#B5BCC4] hover:text-[#565F6C]">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {open && (
          <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg overflow-hidden">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 font-['Montserrat',sans-serif] text-sm text-[#B5BCC4] text-center">No datasets match your search</div>
            ) : (
              <ul className="max-h-56 overflow-y-auto divide-y divide-[#F0F1F2]">
                {filtered.map(dataset => {
                  const isSelected = selectedIds.includes(dataset.id);
                  return (
                    <li
                      key={dataset.id}
                      onMouseDown={e => { e.preventDefault(); toggle(dataset.id); }}
                      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${isSelected ? 'bg-[#FEEDEC]' : 'hover:bg-[#F9FAFB]'}`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-[#F13D30] border-[#F13D30]' : 'border-[#B5BCC4]'}`}>
                        {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                      <Database className="w-4 h-4 text-[#565F6C] shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A] truncate">{dataset.name}</p>
                        <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">{dataset.source}</p>
                      </div>
                      <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold font-['Montserrat',sans-serif] ${PURPOSE_BADGE[dataset.purpose] ?? 'bg-[#F0F1F2] text-[#565F6C]'}`}>{dataset.purpose}</span>
                    </li>
                  );
                })}
              </ul>
            )}
            <div className="px-4 py-2 bg-[#F9FAFB] border-t border-[#F0F1F2]">
              <p className="font-['Montserrat',sans-serif] text-xs text-[#B5BCC4]">{selectedIds.length} of {DATASET_REGISTRY.length} datasets selected</p>
            </div>
          </div>
        )}
      </div>

      {selectedDatasets.length > 0 ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {selectedDatasets.map(dataset => (
            <span key={dataset.id} className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-[#FEEDEC] border border-[#F13D30] rounded-full font-['Montserrat',sans-serif] font-medium text-xs text-[#F13D30]">
              <Database className="w-3 h-3" />
              {dataset.name}
              <button onClick={() => toggle(dataset.id)} className="hover:text-[#DC180A] ml-0.5"><X className="w-3 h-3" /></button>
            </span>
          ))}
          <button onClick={() => onChange([])} className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-['Montserrat',sans-serif] text-[#565F6C] hover:text-[#22262A] transition-colors">
            <X className="w-3 h-3" /> Clear all
          </button>
        </div>
      ) : (
        <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#B5BCC4] italic">
          No datasets linked yet. Search above to link datasets from the registry.
        </p>
      )}
    </div>
  );
}