import { ArrowLeft, Sparkles, ClipboardList } from 'lucide-react';
import { useState } from 'react';
import { AIAgentScanScreen } from './AIAgentScanScreen';
import { QuestionnaireScreen } from './QuestionnaireScreen';

interface AssessmentToolPageProps {
  toolName: string;
  taskName: string;
  article: string;
  onBack: () => void;
}

// Format tool name for display (e.g., "risk-assessment" -> "Risk Assessment")
function formatToolName(toolName: string): string {
  return toolName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Get tool description based on tool name
function getToolDescription(toolName: string): string {
  const descriptions: Record<string, string> = {
    'risk-assessment': 'Systematic identification, analysis, and management of risks in AI systems.',
    'ai-safety': 'Comprehensive safety analysis and risk mitigation strategies for AI systems.',
    'incident-responder': 'Framework for responding to and managing AI system incidents.',
    'data-classification': 'Classification and categorization of data used in AI systems.',
    'bias-assessment': 'Evaluation of potential biases in AI system outputs and decisions.',
    'ai-fairness-360': 'IBM\'s comprehensive toolkit for fairness assessment and bias mitigation.',
    'fairlearn': 'Microsoft\'s toolkit for assessing and improving fairness of AI systems.',
    'aequitas': 'Bias and fairness audit toolkit for machine learning models.',
    'model-card-generation': 'Generation of comprehensive model documentation and transparency reports.',
    'model-cards-generator': 'Automated creation of model cards with detailed system information.',
    'ai-logging-system': 'Comprehensive logging and traceability system for AI operations.',
    'ai-transparency-labels': 'Creation of clear transparency labels for AI system outputs.',
    'explainability-planning': 'Framework for planning and implementing AI explainability measures.',
    'hitl-design': 'Human-in-the-loop system design and oversight mechanisms.',
    'conformance-calibration': 'Calibration and validation of AI system performance against standards.',
    'evidently-ai': 'ML model monitoring and data quality evaluation toolkit.',
    'alibi-detect': 'Outlier, adversarial, and drift detection for AI systems.',
    'prompt-injection-detector': 'Detection and prevention of prompt injection attacks.',
    'qms-tracker': 'Quality Management System tracking and compliance monitoring.',
    'ai-governance': 'Comprehensive AI governance framework and policy implementation.',
    'authorized-rep-manager': 'Management of authorized representatives for EU compliance.',
    'importer-compliance-check': 'Compliance verification for AI system importers.',
    'distributor-verification': 'Verification of compliance before distribution.',
    'deployer-monitoring': 'Monitoring and oversight for AI system deployers.',
    'fria-assessment': 'Fundamental Rights Impact Assessment for AI systems.',
    'doc-vault': 'Secure document management and storage for compliance documentation.',
    'ce-marking-generator': 'Generation of CE marking and conformity documentation.',
    'ai-system-registry': 'Registration and tracking of AI systems in EU database.',
    'post-market-monitor': 'Post-market monitoring and surveillance system.',
  };
  
  return descriptions[toolName] || 'Assessment and evaluation tool for AI compliance.';
}

export function AssessmentToolPage({
  toolName,
  taskName,
  article,
  onBack,
}: AssessmentToolPageProps) {
  const formattedToolName = formatToolName(toolName);
  const description = getToolDescription(toolName);

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  // If a method is selected, show the appropriate screen
  if (selectedMethod === 'ai-scan') {
    return (
      <AIAgentScanScreen
        toolName={toolName}
        taskName={taskName}
        article={article}
        onBack={() => setSelectedMethod(null)}
      />
    );
  }

  if (selectedMethod === 'questionnaire') {
    return (
      <QuestionnaireScreen
        toolName={toolName}
        taskName={taskName}
        article={article}
        onBack={() => setSelectedMethod(null)}
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
          <p className="font-['Montserrat',sans-serif] font-medium text-sm text-[#565F6C]">
            {taskName} · {article}
          </p>
        </div>

        <h1 className="font-['Montserrat',sans-serif] font-bold text-3xl text-[#22262A]">
          {formattedToolName}
        </h1>
        <p className="font-['Montserrat',sans-serif] font-normal text-base text-[#565F6C] mt-2">
          {description}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-8 py-8">
          {/* Choose Assessment Method */}
          <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-8">
            <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A] text-center mb-2">
              Choose Your Assessment Method
            </h2>
            <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#565F6C] text-center mb-8">
              Select how you would like to complete this assessment
            </p>

            <div className="grid grid-cols-2 gap-6">
              {/* AI Agent Scan Card */}
              <button 
                onClick={() => setSelectedMethod('ai-scan')}
                className="relative bg-white border-2 border-[#E5E7EB] rounded-lg p-6 text-left hover:border-[#F13D30] hover:shadow-lg transition-all group"
              >
                <div className="absolute top-6 right-6">
                  <div className="w-12 h-12 rounded-full bg-[#F13D30] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>

                <h3 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A] mb-4 pr-16">
                  AI Agent Scan
                </h3>

                <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-6">
                  Let our AI agents automatically scan and analyze your system to provide instant compliance insights.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#F13D30] flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#464E58]">
                      Automated analysis
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#F13D30] flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#464E58]">
                      Instant results
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#F13D30] flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#464E58]">
                      AI-powered recommendations
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#F0F1F2]">
                  <div>
                    <p className="font-['Montserrat',sans-serif] font-medium text-xs text-[#565F6C]">
                      Estimated time: <span className="text-[#22262A]">~2 minutes</span>
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-[#FEEDEC] text-[#F13D30] rounded-full font-['Montserrat',sans-serif] font-semibold text-xs">
                    RECOMMENDED
                  </span>
                </div>
              </button>

              {/* Fill Questionnaire Card */}
              <button 
                onClick={() => setSelectedMethod('questionnaire')}
                className="relative bg-white border-2 border-[#E5E7EB] rounded-lg p-6 text-left hover:border-[#F13D30] hover:shadow-lg transition-all group"
              >
                <div className="absolute top-6 right-6">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-[#E5E7EB] flex items-center justify-center group-hover:border-[#F13D30] transition-all">
                    <ClipboardList className="w-6 h-6 text-[#565F6C] group-hover:text-[#F13D30] transition-colors" />
                  </div>
                </div>

                <h3 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A] mb-4 pr-16">
                  Fill Questionnaire
                </h3>

                <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-6">
                  Manually complete a comprehensive questionnaire for detailed assessment and full control.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#565F6C] flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#464E58]">
                      Detailed questions
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#565F6C] flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#464E58]">
                      Complete control
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#565F6C] flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#464E58]">
                      Section-by-section guidance
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#F0F1F2]">
                  <div>
                    <p className="font-['Montserrat',sans-serif] font-medium text-xs text-[#565F6C]">
                      Estimated time: <span className="text-[#22262A]">~15 minutes</span>
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}