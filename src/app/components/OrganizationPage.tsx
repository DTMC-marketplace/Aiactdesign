import { useState } from "react";
import { PageHeader } from "./PageHeader";
import {
  ChevronDown,
  ChevronUp,
  Upload,
  FileText,
  Sparkles,
  File,
  HelpCircle,
  Link,
  X,
  Check,
  Lock,
  AlertTriangle,
  CircleDot,
} from "lucide-react";
import uploadIcon from "figma:asset/2b8c8c69d7c131e2086198407038f3b5cfb9ae02.png";

// ─── Field Status System ──────────────────────────────────────────────────────
type FieldStatus = "default" | "attention" | "locked";

function StatusControls({
  status,
  onChange,
}: {
  status: FieldStatus;
  onChange: (s: FieldStatus) => void;
}) {
  return (
    <div className="flex items-center gap-0 shrink-0">
      <button
        type="button"
        onClick={() => onChange("default")}
        title="Default — editable"
        className={`flex items-center gap-1 px-2 py-0.5 rounded-l-full border-y border-l text-xs font-['Roboto',sans-serif] transition-all ${
          status === "default"
            ? "bg-[#F0F1F2] border-[#B5BCC4] text-[#464E58] font-medium"
            : "bg-white border-[#E5E7EB] text-[#B5BCC4] hover:bg-[#F0F1F2] hover:text-[#464E58]"
        }`}
      >
        <CircleDot className="w-3 h-3" />
        <span className="hidden sm:inline">Field</span>
      </button>
      <button
        type="button"
        onClick={() => onChange("attention")}
        title="Attention — needs review"
        className={`flex items-center gap-1 px-2 py-0.5 border text-xs font-['Roboto',sans-serif] transition-all ${
          status === "attention"
            ? "bg-[#FFFBEB] border-[#F59E0B] text-[#B45309] font-medium"
            : "bg-white border-[#E5E7EB] text-[#B5BCC4] hover:bg-[#FFFBEB] hover:text-[#B45309]"
        }`}
      >
        <AlertTriangle className="w-3 h-3" />
        <span className="hidden sm:inline">Attention</span>
      </button>
      <button
        type="button"
        onClick={() => onChange("locked")}
        title="Locked — protected from AI autofill"
        className={`flex items-center gap-1 px-2 py-0.5 rounded-r-full border-y border-r text-xs font-['Roboto',sans-serif] transition-all ${
          status === "locked"
            ? "bg-[#ece9fe] border-[#5720B7] text-[#5720B7] font-medium"
            : "bg-white border-[#E5E7EB] text-[#B5BCC4] hover:bg-[#ece9fe] hover:text-[#5720B7]"
        }`}
      >
        <Lock className="w-3 h-3" />
        <span className="hidden sm:inline">Locked</span>
      </button>
    </div>
  );
}

function FieldStatusLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 bg-[#FAFBFC] border border-[#E5E7EB] rounded-lg">
      <span className="font-['Roboto',sans-serif] text-xs font-semibold text-[#464E58] shrink-0">Field status:</span>
      <div className="flex items-center gap-1.5">
        <CircleDot className="w-3.5 h-3.5 text-[#B5BCC4]" />
        <span className="font-['Roboto',sans-serif] text-xs font-medium text-[#464E58]">Field</span>
        <span className="font-['Roboto',sans-serif] text-xs text-[#B5BCC4]">— default, editable</span>
      </div>
      <div className="w-px h-4 bg-[#E5E7EB] hidden sm:block" />
      <div className="flex items-center gap-1.5">
        <AlertTriangle className="w-3.5 h-3.5 text-[#F59E0B]" />
        <span className="font-['Roboto',sans-serif] text-xs font-medium text-[#B45309]">Attention</span>
        <span className="font-['Roboto',sans-serif] text-xs text-[#B5BCC4]">— AI-filled, needs review</span>
      </div>
      <div className="w-px h-4 bg-[#E5E7EB] hidden sm:block" />
      <div className="flex items-center gap-1.5">
        <Lock className="w-3.5 h-3.5 text-[#5720B7]" />
        <span className="font-['Roboto',sans-serif] text-xs font-medium text-[#5720B7]">Locked</span>
        <span className="font-['Roboto',sans-serif] text-xs text-[#B5BCC4]">— confirmed, protected from autofill</span>
      </div>
    </div>
  );
}

function getFieldBorderClass(status: FieldStatus): string {
  if (status === "attention") return "border-[#F59E0B] bg-[#FFFBEB] focus:border-[#F59E0B] focus:ring-[#FEF3C7]";
  if (status === "locked")    return "border-[#5720B7] bg-[#faf5ff] cursor-not-allowed";
  return "border-[#B5BCC4] bg-white focus:border-[#5720B7] focus:ring-[#ece9fe]";
}

interface CollapsibleSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({
  title,
  description,
  children,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#ece9fe] transition-colors"
      >
        <div className="text-left">
          <h3 className="font-['Roboto',sans-serif] font-semibold text-lg text-[#22262A]">
            {title}
          </h3>
          {description && (
            <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58] mt-1">
              {description}
            </p>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#5720B7] shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#5720B7] shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 py-6 border-t border-[#F0F1F2]">
          {children}
        </div>
      )}
    </div>
  );
}

function DocumentUploadSection() {
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{
      id: string;
      name: string;
      uploadTime: string;
      selected: boolean;
    }>
  >([
    {
      id: "1",
      name: "Company_Registration.pdf",
      uploadTime: "2 mins ago",
      selected: false,
    },
    {
      id: "2",
      name: "AI_Policy_Document.docx",
      uploadTime: "5 mins ago",
      selected: false,
    },
    {
      id: "3",
      name: "Compliance_Report_2024.pdf",
      uploadTime: "10 mins ago",
      selected: false,
    },
  ]);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [currentFileLink, setCurrentFileLink] = useState("");
  const [currentFileName, setCurrentFileName] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);

  const toggleFileSelection = (id: string) => {
    setUploadedFiles((files) =>
      files.map((file) =>
        file.id === id
          ? { ...file, selected: !file.selected }
          : file,
      ),
    );
  };

  const selectAllFiles = () => {
    setUploadedFiles((files) =>
      files.map((file) => ({ ...file, selected: true })),
    );
  };

  const generateLink = (fileId: string, fileName: string) => {
    const link = `${window.location.origin}/api/documents/${fileId}`;
    setCurrentFileLink(link);
    setCurrentFileName(fileName);
    setShowLinkModal(true);
    setLinkCopied(false);
  };

  const copyToClipboard = () => {
    const textarea = document.createElement("textarea");
    textarea.value = currentFileLink;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const closeLinkModal = () => {
    setShowLinkModal(false);
    setCurrentFileLink("");
    setCurrentFileName("");
    setLinkCopied(false);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-[#B5BCC4] rounded-lg p-6 bg-[#FEFEFE] hover:border-[#5720B7] transition-colors">
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src={uploadIcon}
              alt="Upload"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="font-['Roboto',sans-serif] font-medium text-sm text-[#464E58]">
              Click or drag and drop to add more evidence
              document
            </p>
            <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C] mt-1">
              PDF, DOC, JPG, XLS (Max 5GB)
            </p>
          </div>
          <button className="mt-1 px-4 py-1.5 bg-[#ece9fe] border border-[#ddd6fe] text-[#5720B7] rounded-full font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#ddd6fe] transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Choose File
          </button>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-4 p-4 bg-white border border-[#F0F1F2] rounded-lg hover:border-[#B5BCC4] transition-colors"
            >
              <input
                type="checkbox"
                checked={file.selected}
                onChange={() => toggleFileSelection(file.id)}
                className="w-4 h-4 accent-[#5720B7] cursor-pointer"
              />
              <File className="w-5 h-5 text-[#5720B7] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-['Roboto',sans-serif] font-medium text-sm text-[#22262A] truncate">
                  {file.name}
                </p>
                <p className="font-['Roboto',sans-serif] font-normal text-xs text-[#565F6C]">
                  {file.uploadTime}
                </p>
              </div>
              <button
                onClick={() => generateLink(file.id, file.name)}
                className="px-3 py-1.5 bg-[#ece9fe] text-[#5720B7] rounded-lg font-['Roboto',sans-serif] font-semibold text-xs hover:bg-[#ddd6fe] transition-colors flex items-center gap-1.5"
              >
                <Link className="w-3.5 h-3.5" />
                Generate link
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3">
        <span className="font-['Roboto',sans-serif] font-medium text-sm text-[#464E58]">
          AI Read & Auto-fill from:
        </span>
        <button
          onClick={selectAllFiles}
          className="px-5 py-2 bg-[#ece9fe] text-[#5720B7] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#ddd6fe] transition-colors flex items-center gap-2 shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          All files
        </button>
        <button className="px-5 py-2 bg-[#ece9fe] border border-[#ddd6fe] text-[#5720B7] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#ddd6fe] transition-colors flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Selected files
        </button>
      </div>

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-[#565F6C] bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Roboto',sans-serif] font-semibold text-lg text-[#22262A]">
                Share Link
              </h3>
              <button
                onClick={closeLinkModal}
                className="text-[#5720B7] hover:text-[#4c1d95] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58] mb-4">
              Share the link to the file:{" "}
              <strong>{currentFileName}</strong>
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={currentFileLink}
                readOnly
                className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-[#ece9fe] text-[#5720B7] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#ddd6fe] transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                {linkCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Link className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FormField({
  label,
  placeholder,
  required = false,
}: {
  label: string;
  placeholder: string;
  required?: boolean;
}) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<FieldStatus>("default");

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <label className="font-['Roboto',sans-serif] font-medium text-sm text-[#22262A]">
          {label}
          {required && <span className="text-[#5720B7] ml-1">*</span>}
        </label>
        <StatusControls status={status} onChange={setStatus} />
      </div>
      <div className="relative">
        {/* Left status stripe */}
        {status !== "default" && (
          <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg z-10 ${status === "attention" ? "bg-[#F59E0B]" : "bg-[#5720B7]"}`} />
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => !( status === "locked") && setValue(e.target.value)}
          readOnly={status === "locked"}
          placeholder={placeholder}
          className={`w-full pl-4 pr-10 py-2.5 border rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:ring-2 transition-colors ${status !== "default" ? "pl-5" : "pl-4"} ${getFieldBorderClass(status)}`}
        />
        {/* Right status icon */}
        {status === "attention" && (
          <AlertTriangle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F59E0B] pointer-events-none" />
        )}
        {status === "locked" && (
          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5720B7] pointer-events-none" />
        )}
      </div>
      {status === "attention" && (
        <p className="font-['Roboto',sans-serif] text-xs text-[#B45309] flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" /> AI-filled — please review before proceeding
        </p>
      )}
      {status === "locked" && (
        <p className="font-['Roboto',sans-serif] text-xs text-[#5720B7] flex items-center gap-1">
          <Lock className="w-3 h-3" /> Field locked — protected from AI autofill
        </p>
      )}
    </div>
  );
}

function TextAreaField({
  label,
  placeholder,
  required = false,
}: {
  label: string;
  placeholder: string;
  required?: boolean;
}) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<FieldStatus>("default");

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <label className="font-['Roboto',sans-serif] font-medium text-sm text-[#22262A]">
          {label}
          {required && <span className="text-[#5720B7] ml-1">*</span>}
        </label>
        <StatusControls status={status} onChange={setStatus} />
      </div>
      <div className="relative">
        {status !== "default" && (
          <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg z-10 ${status === "attention" ? "bg-[#F59E0B]" : "bg-[#5720B7]"}`} />
        )}
        <textarea
          value={value}
          onChange={(e) => !(status === "locked") && setValue(e.target.value)}
          readOnly={status === "locked"}
          placeholder={placeholder}
          rows={4}
          className={`w-full px-4 py-2.5 border rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:ring-2 transition-colors resize-none ${getFieldBorderClass(status)}`}
        />
        {status === "attention" && (
          <AlertTriangle className="absolute right-3 top-3 w-4 h-4 text-[#F59E0B] pointer-events-none" />
        )}
        {status === "locked" && (
          <Lock className="absolute right-3 top-3 w-4 h-4 text-[#5720B7] pointer-events-none" />
        )}
      </div>
      {status === "attention" && (
        <p className="font-['Roboto',sans-serif] text-xs text-[#B45309] flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" /> AI-filled — please review before proceeding
        </p>
      )}
      {status === "locked" && (
        <p className="font-['Roboto',sans-serif] text-xs text-[#5720B7] flex items-center gap-1">
          <Lock className="w-3 h-3" /> Field locked — protected from AI autofill
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  options,
  required = false,
}: {
  label: string;
  options: string[];
  required?: boolean;
}) {
  const [selected, setSelected] = useState("");
  const [status, setStatus] = useState<FieldStatus>("default");

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <label className="font-['Roboto',sans-serif] font-medium text-sm text-[#22262A]">
          {label}
          {required && <span className="text-[#5720B7] ml-1">*</span>}
        </label>
        <StatusControls status={status} onChange={setStatus} />
      </div>
      <div className="relative">
        {status !== "default" && (
          <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg z-10 ${status === "attention" ? "bg-[#F59E0B]" : "bg-[#5720B7]"}`} />
        )}
        {status === "locked" ? (
          /* Locked: show value as read-only display */
          <div className={`w-full px-4 py-2.5 border rounded-lg font-['Roboto',sans-serif] font-normal text-sm flex items-center justify-between ${getFieldBorderClass(status)}`}>
            <span className={selected ? "text-[#22262A]" : "text-[#B5BCC4]"}>
              {selected || "No selection"}
            </span>
            <Lock className="w-4 h-4 text-[#5720B7] shrink-0" />
          </div>
        ) : (
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:ring-2 transition-colors appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27 fill=%27none%27%3e%3cpath d=%27M5 7.5L10 12.5L15 7.5%27 stroke=%27%23565F6C%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3e%3c/svg%3e')] bg-no-repeat bg-[center_right_0.75rem] bg-[length:1.25rem] pr-10 ${getFieldBorderClass(status)}`}
          >
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )}
        {status === "attention" && (
          <AlertTriangle className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F59E0B] pointer-events-none" />
        )}
      </div>
      {status === "attention" && (
        <p className="font-['Roboto',sans-serif] text-xs text-[#B45309] flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" /> AI-filled — please review before proceeding
        </p>
      )}
      {status === "locked" && (
        <p className="font-['Roboto',sans-serif] text-xs text-[#5720B7] flex items-center gap-1">
          <Lock className="w-3 h-3" /> Field locked — protected from AI autofill
        </p>
      )}
    </div>
  );
}

function CheckboxGroup({
  label,
  options,
  helperText,
  required = false,
}: {
  label: string;
  options: string[];
  helperText?: string;
  required?: boolean;
}) {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label className="font-['Roboto',sans-serif] font-medium text-sm text-[#22262A]">
          {label}
          {required && (
            <span className="text-[#5720B7] ml-1">*</span>
          )}
        </label>
        {helperText && (
          <div className="relative">
            <HelpCircle
              className="w-4 h-4 text-[#B5BCC4] cursor-help"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            />
            {hovering && (
              <div className="absolute right-0 top-6 z-50 w-80 p-3 bg-[#464E58] text-white rounded-lg shadow-lg text-xs font-['Roboto',sans-serif] whitespace-pre-line">
                {helperText}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="space-y-2 pl-1">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#5720B7] cursor-pointer"
            />
            <span className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

function GovernanceSection() {
  const [q1Answer, setQ1Answer] = useState<string>("");
  const [q2Answer, setQ2Answer] = useState<string>("");
  const [q3Answer, setQ3Answer] = useState<string>("");
  const [q4Answer, setQ4Answer] = useState<string>("");
  const [q5Answer, setQ5Answer] = useState<string>("");

  const [q1Link, setQ1Link] = useState<string>("");
  const [q1SavedLink, setQ1SavedLink] = useState<string>("");
  const [q2Link, setQ2Link] = useState<string>("");
  const [q2SavedLink, setQ2SavedLink] = useState<string>("");
  const [q3Link, setQ3Link] = useState<string>("");
  const [q3SavedLink, setQ3SavedLink] = useState<string>("");
  const [q5Link, setQ5Link] = useState<string>("");
  const [q5SavedLink, setQ5SavedLink] = useState<string>("");

  const isSection1Link = (link: string) => {
    return link.includes("/api/documents/");
  };

  const saveLink = (
    link: string,
    setter: (link: string) => void,
  ) => {
    setter(link);
  };

  const inputClass = "flex-1 px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors";
  const saveBtnClass = "px-4 py-2 bg-[#ece9fe] text-[#5720B7] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#ddd6fe] transition-colors whitespace-nowrap";
  const checkboxClass = "w-4 h-4 accent-[#5720B7] cursor-pointer";
  const labelClass = "font-['Roboto',sans-serif] font-medium text-sm text-[#22262A]";
  const optionClass = "font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]";
  const helperClass = "font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]";

  const renderLinkSection = (
    answer: string,
    link: string,
    setLink: (v: string) => void,
    savedLink: string,
    setSavedLink: (v: string) => void,
  ) => answer === "Yes" && (
    <div className="space-y-3 pl-1 mt-3">
      <label className={helperClass}>
        Paste a link from Section 1 or an external link
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Paste link here"
          className={inputClass}
        />
        <button
          onClick={() => saveLink(link, setSavedLink)}
          className={saveBtnClass}
        >
          Save link
        </button>
      </div>
      {savedLink && (
        <div className="flex items-center gap-2 mt-2">
          {isSection1Link(savedLink) ? (
            <>
              <FileText className="w-4 h-4 text-[#5720B7]" />
              <span className={helperClass}>Document link saved</span>
            </>
          ) : (
            <>
              <Link className="w-4 h-4 text-[#5720B7]" />
              <a
                href={savedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Roboto',sans-serif] font-normal text-sm text-[#5720B7] hover:underline"
              >
                {savedLink}
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Q1 */}
      <div className="space-y-3">
        <label className={labelClass}>
          Q1: Do you have organization-wide written internal AI governance policies?
          <span className="text-[#5720B7] ml-1">*</span>
        </label>
        <div className="space-y-2 pl-1">
          {["Yes", "No", "In progress"].map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={q1Answer === opt} onChange={(e) => setQ1Answer(e.target.checked ? opt : "")} className={checkboxClass} />
              <span className={optionClass}>{opt}</span>
            </label>
          ))}
        </div>
        {renderLinkSection(q1Answer, q1Link, setQ1Link, q1SavedLink, setQ1SavedLink)}
      </div>

      {/* Q2 */}
      <div className="space-y-3">
        <label className={labelClass}>
          Q2: Do you have a compliance escalation path?
          <span className="text-[#5720B7] ml-1">*</span>
        </label>
        <div className="space-y-2 pl-1">
          {["Yes", "No"].map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={q2Answer === opt} onChange={(e) => setQ2Answer(e.target.checked ? opt : "")} className={checkboxClass} />
              <span className={optionClass}>{opt}</span>
            </label>
          ))}
        </div>
        {renderLinkSection(q2Answer, q2Link, setQ2Link, q2SavedLink, setQ2SavedLink)}
      </div>

      {/* Q3 */}
      <div className="space-y-3">
        <label className={labelClass}>
          Q3: Do you maintain a register of AI systems used by the organisation?
          <span className="text-[#5720B7] ml-1">*</span>
        </label>
        <div className="space-y-2 pl-1">
          {["Yes", "No"].map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={q3Answer === opt} onChange={(e) => setQ3Answer(e.target.checked ? opt : "")} className={checkboxClass} />
              <span className={optionClass}>{opt}</span>
            </label>
          ))}
        </div>
        {renderLinkSection(q3Answer, q3Link, setQ3Link, q3SavedLink, setQ3SavedLink)}
      </div>

      {/* Q4 */}
      <div className="space-y-3">
        <label className={labelClass}>
          Q4: Do you maintain version history for AI systems in production?
          <span className="text-[#5720B7] ml-1">*</span>
        </label>
        <div className="space-y-2 pl-1">
          {[
            "Yes (You will be asked to provide evidence per system)",
            "No",
          ].map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={q4Answer === opt} onChange={(e) => setQ4Answer(e.target.checked ? opt : "")} className={checkboxClass} />
              <span className={optionClass}>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Q5 */}
      <div className="space-y-3">
        <label className={labelClass}>
          Q5: Do you have third-party / vendor assessment procedures or policy for AI suppliers?
          <span className="text-[#5720B7] ml-1">*</span>
        </label>
        <div className="space-y-2 pl-1">
          {["Yes", "No", "Not Applicable"].map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={q5Answer === opt} onChange={(e) => setQ5Answer(e.target.checked ? opt : "")} className={checkboxClass} />
              <span className={optionClass}>{opt}</span>
            </label>
          ))}
        </div>
        {renderLinkSection(q5Answer, q5Link, setQ5Link, q5SavedLink, setQ5SavedLink)}
      </div>

      {/* Section Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button className="px-6 py-2 border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors">
          Cancel
        </button>
        <button className="px-6 py-2 bg-[#ece9fe] text-[#5720B7] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#ddd6fe] transition-colors shadow-sm">
          Confirm and Save
        </button>
      </div>
    </div>
  );
}

function AILiteracySection() {
  const [q1Teams, setQ1Teams] = useState<string[]>([]);
  const [q1Other, setQ1Other] = useState<string>('');
  const [q2UserCount, setQ2UserCount] = useState<string>('');
  const [q3Training, setQ3Training] = useState<string>('');
  const [q4Content, setQ4Content] = useState<string[]>([]);
  const [q5Evidence, setQ5Evidence] = useState<string>('');
  const [q5Link, setQ5Link] = useState<string>('');
  const [q5SavedLink, setQ5SavedLink] = useState<string>('');
  const [q6Updates, setQ6Updates] = useState<string>('');

  const teams = [
    'Product / Engineering',
    'Data / ML team',
    'Operations / Analysts',
    'HR / Recruitment',
    'Compliance / Legal',
    'Customer support',
    'Sales / Marketing',
    'Senior management',
    'External contractors / service providers',
  ];

  const trainingContent = [
    'Understanding AI limitations and errors',
    'Bias and discrimination risks',
    'Proper human oversight / how to challenge AI outputs',
    'Security and misuse risks',
    'Reporting issues or incidents',
    'Role-specific guidance (e.g., HR / compliance / operations)',
  ];

  const toggleTeam = (team: string) => {
    setQ1Teams(prev =>
      prev.includes(team) ? prev.filter(t => t !== team) : [...prev, team]
    );
  };

  const toggleContent = (content: string) => {
    setQ4Content(prev =>
      prev.includes(content) ? prev.filter(c => c !== content) : [...prev, content]
    );
  };

  const isSection1Link = (link: string) => {
    return link.includes('/api/documents/');
  };

  const saveLink = (link: string, setter: (link: string) => void) => {
    setter(link);
  };

  const checkboxClass = "w-4 h-4 accent-[#5720B7] cursor-pointer";
  const labelClass = "font-['Roboto',sans-serif] font-medium text-sm text-[#22262A]";
  const optionClass = "font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]";
  const inputClass = "w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors";

  return (
    <div className="space-y-6">
      {/* Q1: Users */}
      <div className="space-y-3">
        <label className={labelClass}>
          Q1. Users: Which internal teams or external contractors use AI systems for your organisation? (Select all that apply)
          <span className="text-[#5720B7] ml-1">*</span>
        </label>
        <div className="space-y-2 pl-1">
          {teams.map((team) => (
            <label key={team} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={q1Teams.includes(team)}
                onChange={() => toggleTeam(team)}
                className={checkboxClass}
              />
              <span className={optionClass}>{team}</span>
            </label>
          ))}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={q1Other !== ''}
                onChange={(e) => {
                  if (!e.target.checked) setQ1Other('');
                }}
                className={checkboxClass}
              />
              <span className={optionClass}>Other:</span>
            </label>
            <input
              type="text"
              value={q1Other}
              onChange={(e) => setQ1Other(e.target.value)}
              placeholder="Specify other"
              className="flex-1 px-3 py-1.5 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Q2: User Number */}
      <div className="space-y-2">
        <label className={labelClass}>
          Q2. User number: Approximately how many people use or oversee AI systems?
          <span className="text-[#5720B7] ml-1">*</span>
        </label>
        <input
          type="number"
          value={q2UserCount}
          onChange={(e) => setQ2UserCount(e.target.value)}
          placeholder="Enter number"
          className={inputClass}
        />
      </div>

      {/* Q3: Training */}
      <div className="space-y-3">
        <label className={labelClass}>
          Q3. Training: Do those users receive AI literacy training?
          <span className="text-[#5720B7] ml-1">*</span>
        </label>
        <div className="space-y-2 pl-1">
          {['Yes (implemented)', 'Partly implemented', 'No', 'Planned'].map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={q3Training === opt}
                onChange={(e) => setQ3Training(e.target.checked ? opt : '')}
                className={checkboxClass}
              />
              <span className={optionClass}>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Q4: Content */}
      <div className="space-y-3">
        <label className={labelClass}>
          Q4. Content: Does the training cover the following? (Select all that apply)
          <span className="text-[#5720B7] ml-1">*</span>
        </label>
        <div className="space-y-2 pl-1">
          {trainingContent.map((content) => (
            <label key={content} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={q4Content.includes(content)}
                onChange={() => toggleContent(content)}
                className={checkboxClass}
              />
              <span className={optionClass}>{content}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Q5: Evidence */}
      <div className="space-y-3">
        <label className={labelClass}>
          Q5. Evidence: Do you keep evidence that training occurred (e.g., attendance logs, completion certificates)?
          <span className="text-[#5720B7] ml-1">*</span>
        </label>
        <div className="space-y-2 pl-1">
          {['Yes', 'No'].map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={q5Evidence === opt}
                onChange={(e) => setQ5Evidence(e.target.checked ? opt : '')}
                className={checkboxClass}
              />
              <span className={optionClass}>{opt}</span>
            </label>
          ))}
        </div>
        {q5Evidence === 'Yes' && (
          <div className="space-y-3 pl-1 mt-3">
            <label className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]">
              Paste a link from Section 1 or an external link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={q5Link}
                onChange={(e) => setQ5Link(e.target.value)}
                placeholder="Paste link here"
                className="flex-1 px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Roboto',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#5720B7] focus:ring-2 focus:ring-[#ece9fe] transition-colors"
              />
              <button
                onClick={() => saveLink(q5Link, setQ5SavedLink)}
                className="px-4 py-2 bg-[#ece9fe] text-[#5720B7] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#ddd6fe] transition-colors whitespace-nowrap"
              >
                Save link
              </button>
            </div>
            {q5SavedLink && (
              <div className="flex items-center gap-2 mt-2">
                {isSection1Link(q5SavedLink) ? (
                  <>
                    <FileText className="w-4 h-4 text-[#5720B7]" />
                    <span className="font-['Roboto',sans-serif] font-normal text-sm text-[#464E58]">Document link saved</span>
                  </>
                ) : (
                  <>
                    <Link className="w-4 h-4 text-[#5720B7]" />
                    <a
                      href={q5SavedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-['Roboto',sans-serif] font-normal text-sm text-[#5720B7] hover:underline"
                    >
                      {q5SavedLink}
                    </a>
                  </>
                )}
              </div>
            )}
          </div>
        )}
        {q5Evidence === 'No' && (
          <div className="pl-1 mt-2 flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#FFA500] flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <span className="font-['Roboto',sans-serif] font-medium text-sm text-[#FFA500]">
              Action needed
            </span>
          </div>
        )}
      </div>

      {/* Q6: Updates */}
      <div className="space-y-3">
        <label className={labelClass}>
          Q6. Updates: Is AI literacy training refreshed when AI systems or risks change?
          <span className="text-[#5720B7] ml-1">*</span>
        </label>
        <div className="space-y-2 pl-1">
          {['Yes', 'No', 'Not sure', 'Planned'].map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={q6Updates === opt}
                onChange={(e) => setQ6Updates(e.target.checked ? opt : '')}
                className={checkboxClass}
              />
              <span className={optionClass}>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Section Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button className="px-6 py-2 border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors">
          Cancel
        </button>
        <button className="px-6 py-2 bg-[#ece9fe] text-[#5720B7] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#ddd6fe] transition-colors shadow-sm">
          Confirm and Save
        </button>
      </div>
    </div>
  );
}

export function OrganizationPage() {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FAFBFC]">
      <PageHeader
        breadcrumb="Organization"
        title="Organization Information"
        subtitle="Configure your organization details and AI compliance settings"
      />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-8 space-y-6">
          {/* Section 1: Document Upload */}
          <CollapsibleSection
            title="1. Document & Evidence Upload"
            description="Upload documents for AI-assisted form completion"
            defaultOpen={true}
          >
            <DocumentUploadSection />
          </CollapsibleSection>

          {/* Section 2: Organisation Profile */}
          <CollapsibleSection
            title="2. Organisation Profile"
            description="Basic information about your organization"
          >
            <div className="space-y-4">
              <FieldStatusLegend />
              <FormField label="Entity Name" placeholder="Enter legal entity name" required />
              <FormField label="Registration Number" placeholder="Enter registration number" />
              <FormField label="Headquarter Address" placeholder="Enter full address" />
              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  label="Country"
                  options={["United States", "United Kingdom", "Germany", "France", "Other"]}
                  required
                />
                <FormField label="Postal Code" placeholder="Enter postal code" />
              </div>
              <FormField label="Legal Representative" placeholder="Enter representative name" required />
              <FormField label="Entity Contact Email" placeholder="contact@company.com" required />
              <FormField label="Contact Phone" placeholder="+1 (555) 000-0000" />
              <SelectField label="Public authority/body?" options={["Yes", "No"]} required />
              <div className="space-y-3">
                <label className="font-['Roboto',sans-serif] font-medium text-sm text-[#22262A]">
                  Internal AI compliance owner?
                  <span className="text-[#5720B7] ml-1">*</span>
                </label>
                <div className="grid grid-cols-1 gap-3 pl-4">
                  <FormField label="Name" placeholder="Enter compliance owner name" required />
                  <FormField label="Email" placeholder="compliance@company.com" required />
                  <FormField label="Department" placeholder="Enter department" required />
                </div>
              </div>

              {/* Section Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button className="px-6 py-2 border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors">
                  Cancel
                </button>
                <button className="px-6 py-2 bg-[#ece9fe] text-[#5720B7] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#ddd6fe] transition-colors shadow-sm">
                  Confirm and Save
                </button>
              </div>
            </div>
          </CollapsibleSection>

          {/* Section 3: Scope / Applicability Screening */}
          <CollapsibleSection
            title="3. Scope / Applicability Screening"
            description="Determine AI Act applicability and scope"
          >
            <div className="space-y-4">
              <FieldStatusLegend />
              <SelectField
                label="Q1: Do you place AI systems and/or GPAI models on the EU/EEA market?"
                options={["Yes", "No", "Planned"]}
                required
              />
              <CheckboxGroup
                label="Q2: Which roles best describe your typical activities? (Select all that apply as default role(s), editable per system)"
                options={["Provider", "Deployer", "Importer", "Distributor"]}
                helperText={`Provider = "you develop (or commission) and place on the market / put into service under your name"\nDeployer = "you use it in operations (internal use or for clients)"\nImporter = "you bring it into EU from a non-EU provider"\nDistributor = "you resell/make it available without being provider/importer"`}
                required
              />
              <SelectField
                label="Q3: Is the system deployed / used in the EU / EEA?"
                options={["Yes", "No", "Planned"]}
                required
              />
              <SelectField
                label="Q4: Does the system affect persons in the EU / EEA (outputs used in EU / EEA)?"
                options={["Yes", "No", "Planned"]}
                required
              />

              {/* Section Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button className="px-6 py-2 border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors">
                  Cancel
                </button>
                <button className="px-6 py-2 bg-[#ece9fe] text-[#5720B7] rounded-lg font-['Roboto',sans-serif] font-semibold text-sm hover:bg-[#ddd6fe] transition-colors shadow-sm">
                  Confirm and Save
                </button>
              </div>
            </div>
          </CollapsibleSection>

          {/* Section 4: Governance Setup (Internal Controls) */}
          <CollapsibleSection
            title="4. Governance Setup (Internal Controls)"
            description="Define internal governance for AI compliance"
          >
            <GovernanceSection />
          </CollapsibleSection>

          {/* Section 5: AI Literacy (Mandatory Requirement) */}
          <CollapsibleSection
            title="5. AI Literacy (Mandatory Requirement)"
            description="Demonstrate AI literacy and training programs"
          >
            <AILiteracySection />
          </CollapsibleSection>

          {/* Save Button */}
          <div className="flex justify-center pt-6">
            <button className="px-8 py-2.5 bg-[#ece9fe] text-[#5720B7] rounded-full font-['Roboto',sans-serif] font-semibold text-base hover:bg-[#ddd6fe] transition-colors shadow-md">
              Save Whole Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}