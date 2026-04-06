import { ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { AssessmentToolPage } from './AssessmentToolPage';
import { assessmentFrameworks } from '@/app/data/assessmentFrameworks';
import { AssessmentCategoriesTable } from './AssessmentCategoriesTable';

interface ComplianceTaskDetailProps {
  taskId: string;
  taskName: string;
  article: string;
  category: string;
  onBack: () => void;
}

// Define compulsory skills/tools for each article
const articleRequirements: Record<string, {
  status: string;
  compulsorySkills: string[];
  optionalSkills?: string[];
  oneOfTools?: string[];
  oneOfLabel?: string;
}> = {
  'Art. 9': {
    status: 'Mandatory for all high-risk systems.',
    compulsorySkills: ['risk-management', 'risk-assessment', 'ai-safety', 'red-team-testing', 'guardrails-implementation', 'toxicity-detection', 'hate-speech-detection', 'claim-verification', 'ai-ethics-fact-checking', 'content-toxicity-analysis', 'ai-ethics', 'ai-governance', 'ai-alignment-framework', 'incident-responder', 'ethics-review'],
  },
  'Art. 10': {
    status: 'Mandatory. Data must be relevant, representative, and free of errors. Bias testing is required.',
    compulsorySkills: ['data-classification', 'gdpr-compliance', 'bias-assessment', 'disaggregated-evaluation', 'ai-fairness-360', 'fairlearn', 'aequitas', 'what-if-tool', 'detoxify', 'perspective-api', 'moderate-content-api', 'hate-speech-detector', 'toxicity-detection', 'hate-speech-detection', 'claim-verification', 'ai-ethics-fact-checking', 'content-toxicity-analysis', 'ai-ethics', 'ai-governance', 'ai-alignment-framework', 'validating-ai-ethics-and-fairness'],
  },
  'Art. 11': {
    status: 'Mandatory. Must be maintained and kept up-to-date.',
    compulsorySkills: ['model-card-generation', 'model-cards-generator', 'weights-and-biases', 'ai-governance'],
  },
  'Art. 12': {
    status: 'Mandatory. Systems must automatically log events (traceability).',
    compulsorySkills: ['ai-logging-system', 'langsmith', 'ai-governance'],
  },
  'Art. 13': {
    status: 'Mandatory. Users must be able to interpret outputs and understand limitations.',
    compulsorySkills: ['shap-explainer', 'lime', 'captum', 'interpretml', 'what-if-tool', 'ai-transparency-labels', 'model-card-generation', 'explainability-planning', 'toxicity-detection', 'claim-verification', 'ai-ethics-fact-checking', 'ai-content-detector', 'ai-generated-content-detection', 'ai-ethics', 'ai-governance', 'ai-alignment-framework'],
  },
  'Art. 14': {
    status: 'Mandatory for high-risk AI systems.',
    compulsorySkills: ['hitl-design', 'conformance-calibration', 'ai-alignment-framework', 'ai-governance'],
  },
  'Art. 15': {
    status: 'Mandatory. Systems must be accurate, robust, and secure against cyber threats.',
    compulsorySkills: ['disaggregated-evaluation', 'red-team-testing', 'guardrails-implementation', 'ragas', 'deepeval', 'huggingface-evaluate', 'langsmith', 'weights-and-biases', 'promptfoo', 'evidently-ai', 'alibi-detect', 'prompt-injection-detector', 'security-frameworks', 'vulnerability-scanning', 'python-dependency-safety', 'snyk-security-assessment', 'oss-scorecard-assessment', 'claimbuster-api', 'ai-hallucination', 'ai-ethics-fact-checking', 'ai-governance', 'disaggregated-evaluation'],
  },
  'Art. 17': {
    status: 'Mandatory for high-risk AI systems.',
    compulsorySkills: ['qms-tracker', 'conformance-calibration', 'ai-governance'],
  },
  'Art. 22': {
    status: 'Required for providers established outside the EU.',
    compulsorySkills: ['authorized-rep-manager'],
  },
  'Art. 23': {
    status: 'Importers must ensure systems comply before placing on EU market.',
    compulsorySkills: ['importer-compliance-check'],
  },
  'Art. 24': {
    status: 'Distributors must verify compliance before distribution.',
    compulsorySkills: ['distributor-verification'],
  },
  'Art. 26': {
    status: 'Deployers must use systems according to instructions and monitor operations.',
    compulsorySkills: ['hitl-design', 'deployer-monitoring'],
  },
  'Art. 27': {
    status: 'Required for high-risk AI systems that may impact fundamental rights.',
    compulsorySkills: ['fria-assessment', 'bias-assessment', 'hitl-design', 'ai-fairness-360', 'ethics-review', 'validating-ai-ethics-and-fairness', 'ai-governance'],
  },
  'Art. 47': {
    status: 'Required before placing high-risk AI system on the market.',
    compulsorySkills: ['doc-vault', 'ai-governance'],
  },
  'Art. 48': {
    status: 'Required for high-risk AI systems before market placement.',
    compulsorySkills: ['ce-marking-generator', 'ai-governance'],
  },
  'Art. 49': {
    status: 'Required registration in EU database for high-risk AI systems.',
    compulsorySkills: ['ai-system-registry', 'ai-governance'],
  },
  'Art. 72': {
    status: 'Mandatory for providers of high-risk AI systems.',
    compulsorySkills: ['post-market-monitor', 'incident-responder', 'validating-ai-ethics-and-fairness', 'ai-system-registry'],
  },
};

// Define subcategories/related tools for each skill
const skillSubcategories: Record<string, string[]> = {
  'prompt-injection-detector': ['prompt-injection-detector'],
  'security-frameworks': ['security-frameworks'],
  'vulnerability-scanning': ['grype-vulnerability'],
  'python-dependency-safety': ['safety-pyup'],
  'snyk-security-assessment': ['snyk-io'],
  'oss-scorecard-assessment': ['oss-scorecard'],
};

export function ComplianceTaskDetail({
  taskId,
  taskName,
  article,
  category,
  onBack,
}: ComplianceTaskDetailProps) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  
  // Get requirements for this article
  const requirements = articleRequirements[article] || {
    status: 'Requirements for this article.',
    compulsorySkills: [],
  };

  const handleToolClick = (toolName: string) => {
    setSelectedTool(toolName);
  };

  // If viewing a specific tool, show the assessment page
  if (selectedTool) {
    return (
      <AssessmentToolPage
        toolName={selectedTool}
        taskName={taskName}
        article={article}
        onBack={() => setSelectedTool(null)}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FAFBFC]">
      {/* Header */}
      <div className="bg-white border-b border-[#F0F1F2] px-8 py-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-4 text-[#565F6C] hover:text-[#22262A] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-['Montserrat',sans-serif] font-medium text-sm">
            Back to Compliance Items
          </span>
        </button>

        <div className="mb-2">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full font-['Montserrat',sans-serif] font-semibold text-xs ${
              category === 'Risk' ? 'bg-[#FEE2E2] text-[#991B1B]' :
              category === 'Data' ? 'bg-[#DBEAFE] text-[#1E40AF]' :
              category === 'Security' ? 'bg-[#FEF3C7] text-[#92400E]' :
              'bg-[#E9D5FF] text-[#6B21A8]'
            }`}>
              {category}
            </span>
            <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#565F6C]">
              {article}
            </span>
          </div>
        </div>

        <h1 className="font-['Montserrat',sans-serif] font-bold text-3xl text-[#22262A] mb-2">
          {taskName}
        </h1>
        
        <div className="flex items-start gap-2 mt-3 p-3 bg-[#FEF3C7] border-l-4 border-[#F59E0B] rounded">
          <AlertCircle className="w-5 h-5 text-[#92400E] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#92400E]">
              Status: <span className="font-normal">{requirements.status}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-8 py-8">
          {/* Compulsory Skills Section */}
          {requirements.compulsorySkills.length > 0 && (
            <>
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6 mb-6">
                <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A] mb-1">
                  Compulsory Skills:
                </h2>
                <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#565F6C] mb-6">
                  All of these assessments are required for compliance
                </p>

                <div className="grid grid-cols-1 gap-4">
                  {requirements.compulsorySkills.map((skill, index) => {
                    const framework = assessmentFrameworks[skill];
                    const displayName = framework?.displayName || skill;
                    const description = framework?.description || 'Click to access assessment tool';
                    const hasFramework = !!framework;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleToolClick(skill)}
                        className="group relative bg-white border-2 border-[#E5E7EB] rounded-lg p-5 text-left hover:border-[#F13D30] hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className={`w-10 h-10 rounded-lg ${hasFramework ? 'bg-[#F13D30]' : 'bg-[#B5BCC4]'} flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                              <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-['Montserrat',sans-serif] font-bold text-base text-[#22262A] group-hover:text-[#F13D30] transition-colors">
                                  {displayName}
                                </h3>
                                {hasFramework ? (
                                  <span className="px-2 py-0.5 bg-[#D1FAE5] text-[#065F46] rounded-full font-['Montserrat',sans-serif] font-semibold text-xs flex-shrink-0">
                                    Questionnaire Available
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 bg-[#FEF3C7] text-[#92400E] rounded-full font-['Montserrat',sans-serif] font-semibold text-xs flex-shrink-0">
                                    Coming Soon
                                  </span>
                                )}
                              </div>
                              <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#565F6C]">
                                {description}
                              </p>
                            </div>
                          </div>
                          <ArrowLeft className="w-5 h-5 text-[#B5BCC4] rotate-180 group-hover:text-[#F13D30] group-hover:translate-x-1 transition-all flex-shrink-0 ml-3" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Assessment Categories Breakdown */}
              <AssessmentCategoriesTable article={article} />
            </>
          )}

          {/* One Of Tools Section */}
          {requirements.oneOfTools && requirements.oneOfTools.length > 0 && (
            <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
              <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A] mb-1">
                {requirements.oneOfLabel || 'Choose One Tool:'}
              </h2>
              <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#565F6C] mb-6">
                Select at least one of these tools to complete this requirement
              </p>

              <div className="grid grid-cols-1 gap-4">
                {requirements.oneOfTools.map((tool, index) => (
                  <button
                    key={index}
                    onClick={() => handleToolClick(tool)}
                    className="group relative bg-white border-2 border-[#E5E7EB] rounded-lg p-5 text-left hover:border-[#1E40AF] hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#DBEAFE] border-2 border-[#1E40AF] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Sparkles className="w-5 h-5 text-[#1E40AF]" />
                        </div>
                        <div>
                          <h3 className="font-['Montserrat',sans-serif] font-bold text-base text-[#22262A] group-hover:text-[#1E40AF] transition-colors">
                            {tool}
                          </h3>
                          <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#565F6C] mt-0.5">
                            Click to access assessment tool
                          </p>
                        </div>
                      </div>
                      <ArrowLeft className="w-5 h-5 text-[#B5BCC4] rotate-180 group-hover:text-[#1E40AF] group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty state if no requirements defined */}
          {requirements.compulsorySkills.length === 0 && !requirements.oneOfTools && (
            <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-[#F9FAFB] rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-[#B5BCC4]" />
              </div>
              <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-2">
                Assessment Tools Coming Soon
              </h3>
              <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#565F6C]">
                Specific assessment requirements for this article will be available shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}