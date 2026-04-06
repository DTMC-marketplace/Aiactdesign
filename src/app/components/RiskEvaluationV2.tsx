import { useState } from 'react';
import { ChevronDown, ChevronRight, X, PlayCircle, FileText, ChevronLeft, Scan, ClipboardList, Eye } from 'lucide-react';

interface RiskCategory {
  id: string;
  name: string;
  color: string;
  description: string;
  tools: RiskTool[];
  status: string;
  lastAssessmentDate?: string; // Date of last category assessment
}

interface RiskTool {
  id: string;
  name: string;
  category: string;
  description: string;
  status: string;
  recommendedFor?: string;
  assessmentMethod: 'scan' | 'questionnaire'; // Indicates which action to show
  lastAssessmentDate?: string; // Date of last assessment
}

const riskCategories: RiskCategory[] = [
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    color: '#F13D30',
    description: 'Critical cybersecurity measures required including robust protection against unauthorized access, data breaches, and cyberattacks per Article 15.',
    status: 'In Progress',
    lastAssessmentDate: 'Mar 10, 2026',
    tools: [
      { id: 'prompt-injection-detector', name: 'Prompt Injection Detector', category: 'cybersecurity', description: 'Detects and prevents prompt injection attacks in AI systems', status: 'Passed', assessmentMethod: 'scan', lastAssessmentDate: 'Mar 10, 2026' },
      { id: 'security-frameworks', name: 'Security Frameworks', category: 'cybersecurity', description: 'Comprehensive security framework implementation', status: 'In Progress', assessmentMethod: 'questionnaire' },
      { id: 'grype-vulnerability', name: 'Grype Vulnerability Scanner', category: 'cybersecurity', description: 'Scans for vulnerabilities in dependencies', status: 'Pending', assessmentMethod: 'scan' },
      { id: 'safety-pyup', name: 'Safety (PyUp)', category: 'cybersecurity', description: 'Python dependency vulnerability checker', status: 'Passed', assessmentMethod: 'scan', lastAssessmentDate: 'Mar 10, 2026' },
      { id: 'snyk-io', name: 'Snyk.io', category: 'cybersecurity', description: 'Security vulnerability scanning for multiple languages', status: 'In Progress', assessmentMethod: 'scan' },
      { id: 'oss-scorecard', name: 'OSS Scorecard', category: 'cybersecurity', description: 'Open source security scorecard assessment', status: 'Pending', assessmentMethod: 'scan' },
    ],
  },
  {
    id: 'privacy',
    name: 'Privacy',
    color: '#7B1FA2',
    description: 'Enhanced privacy protections required including GDPR alignment, data minimization, and purpose limitation per Article 10.',
    status: 'Pending',
    tools: [
      { id: 'data-classification', name: 'Data Classification', category: 'privacy', description: 'Automated data classification and tagging', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'gdpr-compliance', name: 'GDPR Compliance', category: 'privacy', description: 'GDPR compliance assessment and monitoring', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'hipaa-compliance', name: 'HIPAA Compliance', category: 'privacy', description: 'HIPAA compliance verification tools', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'pci-dss-compliance', name: 'PCI DSS Compliance', category: 'privacy', description: 'Payment card industry data security standard', status: 'Pending', assessmentMethod: 'questionnaire' },
    ],
  },
  {
    id: 'fria',
    name: 'Fundamental Rights Impact Assessment (FRIA)',
    color: '#1565C0',
    description: 'Mandatory FRIA required per Article 27. Comprehensive assessment of impact on fundamental rights including privacy, non-discrimination, human dignity, and other Charter rights.',
    status: 'Passed',
    lastAssessmentDate: 'Mar 10, 2026',
    tools: [
      { id: 'fria-assessment', name: 'FRIA Assessment', category: 'fria', description: 'Comprehensive fundamental rights impact assessment', status: 'Passed', assessmentMethod: 'questionnaire', lastAssessmentDate: 'Mar 10, 2026' },
      { id: 'bias-assessment', name: 'Bias Assessment', category: 'fria', description: 'Identifies and measures bias in AI systems', status: 'Passed', assessmentMethod: 'questionnaire', lastAssessmentDate: 'Mar 10, 2026' },
      { id: 'ai-fairness-360', name: 'AI Fairness 360', category: 'fria', description: 'IBM toolkit for detecting and mitigating bias', status: 'Passed', assessmentMethod: 'questionnaire', lastAssessmentDate: 'Mar 10, 2026' },
      { id: 'hitl-design', name: 'Human-in-the-Loop Design', category: 'fria', description: 'Ensures meaningful human oversight', status: 'Passed', assessmentMethod: 'questionnaire', lastAssessmentDate: 'Mar 10, 2026' },
    ],
  },
  {
    id: 'societal',
    name: 'Societal',
    color: '#0097A7',
    description: 'System has significant societal impact. Careful consideration of social implications and potential harms required.',
    status: 'In Progress',
    tools: [
      { id: 'detoxify', name: 'Detoxify', category: 'societal', description: 'Toxic comment classification model', status: 'Passed', assessmentMethod: 'scan', lastAssessmentDate: 'Mar 10, 2026' },
      { id: 'hate-speech-detector', name: 'Hate Speech Detector', category: 'societal', description: 'Detects hate speech in text content', status: 'In Progress', assessmentMethod: 'scan' },
      { id: 'claimbuster-api', name: 'ClaimBuster API', category: 'societal', description: 'Fact-checking and claim verification', status: 'Pending', assessmentMethod: 'scan' },
      { id: 'fact-checker', name: 'Fact Checker', category: 'societal', description: 'Automated fact verification tools', status: 'In Progress', assessmentMethod: 'scan' },
      { id: 'ai-content-detector', name: 'AI Content Detector', category: 'societal', description: 'Identifies AI-generated content', status: 'Pending', assessmentMethod: 'scan' },
      { id: 'perspective-api-societal', name: 'Perspective API', category: 'societal', description: 'Toxicity and sentiment analysis', status: 'Passed', assessmentMethod: 'scan', lastAssessmentDate: 'Mar 10, 2026' },
      { id: 'textblob-sentiment', name: 'TextBlob Sentiment', category: 'societal', description: 'Sentiment analysis library', status: 'Pending', assessmentMethod: 'scan' },
      { id: 'vader-sentiment', name: 'VADER Sentiment', category: 'societal', description: 'Valence Aware Dictionary sentiment reasoner', status: 'Pending', assessmentMethod: 'scan' },
    ],
  },
  {
    id: 'fairness-bias',
    name: 'Fairness & Bias Detection',
    color: '#C2185B',
    description: 'Mandatory bias detection and mitigation required. Training data must be representative and free from discriminatory bias per Article 10.',
    status: 'Pending',
    tools: [
      { id: 'ai-fairness-360-bias', name: 'AI Fairness 360', category: 'fairness-bias', description: 'IBM fairness toolkit', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'fairlearn', name: 'Fairlearn', category: 'fairness-bias', description: 'Microsoft fairness assessment and mitigation', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'aequitas', name: 'Aequitas', category: 'fairness-bias', description: 'Bias and fairness audit toolkit', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'bias-assessment-2', name: 'Bias Assessment', category: 'fairness-bias', description: 'Comprehensive bias evaluation', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'disaggregated-evaluation', name: 'Disaggregated Evaluation', category: 'fairness-bias', description: 'Performance evaluation across subgroups', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'perspective-api', name: 'Perspective API', category: 'fairness-bias', description: 'Toxicity detection API', status: 'Pending', assessmentMethod: 'scan' },
      { id: 'moderate-content-api', name: 'Moderate Content API', category: 'fairness-bias', description: 'Content moderation API', status: 'Pending', assessmentMethod: 'scan' },
    ],
  },
  {
    id: 'trust-explainability',
    name: 'Trust & Explainability',
    color: '#388E3C',
    description: 'Trust-building measures mandatory including transparency, explainability, and human oversight per Articles 13-14.',
    status: 'In Progress',
    tools: [
      { id: 'explainability-planning', name: 'Explainability Planning', category: 'trust-explainability', description: 'Strategic planning for AI explainability', status: 'In Progress', assessmentMethod: 'questionnaire' },
      { id: 'shap-explainer', name: 'SHAP Explainer', category: 'trust-explainability', description: 'SHapley Additive exPlanations', status: 'Passed', assessmentMethod: 'questionnaire', lastAssessmentDate: 'Mar 10, 2026' },
      { id: 'lime', name: 'LIME', category: 'trust-explainability', description: 'Local Interpretable Model-agnostic Explanations', status: 'Passed', assessmentMethod: 'questionnaire', lastAssessmentDate: 'Mar 10, 2026' },
      { id: 'captum', name: 'Captum', category: 'trust-explainability', description: 'Model interpretability for PyTorch', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'interpretml', name: 'InterpretML', category: 'trust-explainability', description: 'Interpretable machine learning toolkit', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'what-if-tool', name: 'What-If Tool', category: 'trust-explainability', description: 'Interactive model investigation', status: 'In Progress', assessmentMethod: 'questionnaire' },
      { id: 'ai-transparency-labels', name: 'AI Transparency Labels', category: 'trust-explainability', description: 'Standardized transparency documentation', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'model-card-generation', name: 'Model Card Generation', category: 'trust-explainability', description: 'Automated model card creation', status: 'In Progress', assessmentMethod: 'questionnaire' },
      { id: 'hitl-design-trust', name: 'HITL Design', category: 'trust-explainability', description: 'Human-in-the-loop design patterns', status: 'Pending', assessmentMethod: 'questionnaire' },
    ],
  },
  {
    id: 'ai-safety',
    name: 'AI Safety',
    color: '#F57C00',
    description: 'Safety measures and incident response protocols to ensure secure and reliable AI operations.',
    status: 'Pending',
    tools: [
      { id: 'ai-safety', name: 'AI Safety', category: 'ai-safety', description: 'Comprehensive AI safety assessment', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'ai-safety-planning', name: 'AI Safety Planning', category: 'ai-safety', description: 'Safety protocol development', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'red-team-testing', name: 'Red Team Testing', category: 'ai-safety', description: 'Adversarial testing methodology', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'guardrails-implementation', name: 'Guardrails Implementation', category: 'ai-safety', description: 'Safety constraints and boundaries', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'risk-assessment', name: 'Risk Assessment', category: 'ai-safety', description: 'Comprehensive risk evaluation', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'incident-responder', name: 'Incident Responder', category: 'ai-safety', description: 'AI incident response system', status: 'Pending', assessmentMethod: 'questionnaire' },
    ],
  },
  {
    id: 'governance-ethics',
    name: 'Governance & Ethics',
    color: '#5E35B1',
    description: 'Ethical oversight and governance frameworks for responsible AI development and deployment.',
    status: 'Pending',
    tools: [
      { id: 'ai-ethics', name: 'AI Ethics', category: 'governance-ethics', description: 'Ethical framework implementation', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'ai-ethics-advisor', name: 'AI Ethics Advisor', category: 'governance-ethics', description: 'Ethics guidance and consultation', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'ai-governance', name: 'AI Governance', category: 'governance-ethics', description: 'Governance structure setup', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'ethics-review', name: 'Ethics Review', category: 'governance-ethics', description: 'Ethics review board process', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'validating-ai-ethics-and-fairness', name: 'Validating AI Ethics & Fairness', category: 'governance-ethics', description: 'Ethics and fairness validation', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'ai-logging-system', name: 'AI Logging System', category: 'governance-ethics', description: 'Comprehensive AI activity logging', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'ai-system-registry', name: 'AI System Registry', category: 'governance-ethics', description: 'Centralized system inventory', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'qms-tracker', name: 'QMS Tracker', category: 'governance-ethics', description: 'Quality management system tracking', status: 'Pending', assessmentMethod: 'questionnaire' },
      { id: 'ce-marking-generator', name: 'CE Marking Generator', category: 'governance-ethics', description: 'EU conformity assessment', status: 'Pending', assessmentMethod: 'questionnaire' },
    ],
  },
  {
    id: 'sustainability',
    name: 'Sustainability',
    color: '#558B2F',
    description: 'Environmental impact assessment and carbon footprint monitoring for AI systems.',
    status: 'Pending',
    tools: [
      { id: 'codecarbon', name: 'CodeCarbon', category: 'sustainability', description: 'Track and reduce carbon emissions from computing', status: 'Pending', assessmentMethod: 'scan' },
      { id: 'cloud-carbon-footprint', name: 'Cloud Carbon Footprint', category: 'sustainability', description: 'Measure cloud infrastructure emissions', status: 'Pending', assessmentMethod: 'scan' },
      { id: 'ml-co2-impact', name: 'ML CO2 Impact', category: 'sustainability', description: 'Estimate ML model carbon impact', status: 'Pending', assessmentMethod: 'scan' },
      { id: 'watttime-carbon', name: 'WattTime Carbon', category: 'sustainability', description: 'Real-time carbon intensity data', status: 'Pending', assessmentMethod: 'scan' },
    ],
  },
];

export function RiskEvaluationV2() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<RiskTool | null>(null);
  const [resultsPanel, setResultsPanel] = useState<{
    isOpen: boolean;
    type: 'category' | 'tool' | null;
    categoryId?: string;
    toolId?: string;
  }>({
    isOpen: false,
    type: null,
  });

  const toggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };

  const handleToolClick = (tool: RiskTool) => {
    setSelectedTool(tool);
  };

  const closeDrawer = () => {
    setSelectedTool(null);
  };

  const showCategoryResults = (categoryId: string) => {
    setResultsPanel({
      isOpen: true,
      type: 'category',
      categoryId,
    });
  };

  const showToolResults = (toolId: string, categoryId: string) => {
    setResultsPanel({
      isOpen: true,
      type: 'tool',
      toolId,
      categoryId,
    });
  };

  const closeResultsPanel = () => {
    setResultsPanel({
      isOpen: false,
      type: null,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Passed':
        return 'bg-[#E8F5E9] text-[#2E7D32]';
      case 'In Progress':
        return 'bg-[#FFF9E6] text-[#F57C00]';
      case 'Pending':
        return 'bg-[#F0F1F2] text-[#6B7280]';
      default:
        return 'bg-[#F0F1F2] text-[#6B7280]';
    }
  };

  // Get current category/tool for results panel
  const currentCategory = resultsPanel.categoryId 
    ? riskCategories.find(c => c.id === resultsPanel.categoryId)
    : null;
  
  const currentTool = resultsPanel.toolId && resultsPanel.categoryId
    ? riskCategories
        .find(c => c.id === resultsPanel.categoryId)
        ?.tools.find(t => t.id === resultsPanel.toolId)
    : null;

  return (
    <div className="flex gap-6">
      {/* Main Content */}
      <div className={`flex-1 space-y-6 transition-all duration-300 ${resultsPanel.isOpen ? 'mr-0' : ''}`}>
        {/* Header */}
        <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
          <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-2">
            Risk Evaluation V2
          </h1>
          <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
            Comprehensive risk assessment organized by category with detailed tool information
          </p>
        </div>

        {/* Risk Assessment Table */}
        <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F9FAFB] border-b border-[#F0F1F2]">
                <tr>
                  <th className="px-6 py-4 text-left font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] uppercase tracking-wider">
                    Risk Category
                  </th>
                  <th className="px-6 py-4 text-left font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-center font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] uppercase tracking-wider w-32">
                    Actions
                  </th>
                  <th className="px-6 py-4 text-center font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] uppercase tracking-wider w-40">
                    History
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F1F2]">
                {riskCategories.map((category) => {
                  const isExpanded = expandedCategory === category.id;
                  return [
                    /* Category Row (Collapsible) */
                    <tr
                      key={`category-${category.id}`}
                      onClick={() => toggleCategory(category.id)}
                      className="cursor-pointer hover:bg-[#F9FAFB] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="pt-0.5">
                            {isExpanded ? (
                              <ChevronDown className="w-5 h-5 text-[#6B7280]" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-[#6B7280]" />
                            )}
                          </div>
                          <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                            {category.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] line-clamp-2">
                          {category.description}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-3 py-1.5 rounded-full ${getStatusBadge(category.status)} font-['Montserrat',sans-serif] font-semibold text-xs`}>
                          {category.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // AI Scan category action
                            }}
                            className="p-2 hover:bg-[#ECE9FE] rounded-lg transition-colors group"
                            title="AI Scan Category"
                          >
                            <Scan className="w-5 h-5 text-[#5720B7] group-hover:text-[#4318A0]" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-center justify-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              showCategoryResults(category.id);
                            }}
                            className="p-2 hover:bg-[#ECE9FE] rounded-lg transition-colors group"
                            title="View Assessment History"
                          >
                            <Eye className="w-5 h-5 text-[#5720B7] group-hover:text-[#4318A0]" />
                          </button>
                          {category.lastAssessmentDate && (
                            <span className="font-['Montserrat',sans-serif] text-xs text-[#6B7280]">
                              {category.lastAssessmentDate}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>,

                    /* Expanded Tools Table */
                    isExpanded && (
                      <tr key={`expanded-${category.id}`}>
                        <td colSpan={5} className="px-0 py-0 bg-[#FAFBFC]">
                          <div className="px-6 py-4">
                            <table className="w-full">
                              <thead className="bg-[#FAFBFC] border-b border-[#E5E7EB]">
                                <tr>
                                  <th className="px-6 py-3 text-left font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] uppercase tracking-wider">
                                    Tool Name
                                  </th>
                                  <th className="px-6 py-3 text-left font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] uppercase tracking-wider">
                                    Description
                                  </th>
                                  <th className="px-6 py-3 text-center font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] uppercase tracking-wider">
                                    Status
                                  </th>
                                  <th className="px-6 py-3 text-center font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] uppercase tracking-wider w-32">
                                    Actions
                                  </th>
                                  <th className="px-6 py-3 text-center font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] uppercase tracking-wider w-40">
                                    History
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-[#E5E7EB] bg-white">
                                {category.tools.map((tool) => (
                                  <tr
                                    key={tool.id}
                                    className="hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                                    onClick={() => handleToolClick(tool)}
                                  >
                                    <td className="px-6 py-3">
                                      <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                                        {tool.name}
                                      </span>
                                    </td>
                                    <td className="px-6 py-3">
                                      <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] line-clamp-2">
                                        {tool.description}
                                      </p>
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                      <span className={`inline-flex px-3 py-1 rounded-full ${getStatusBadge(tool.status)} font-['Montserrat',sans-serif] font-semibold text-xs`}>
                                        {tool.status}
                                      </span>
                                    </td>
                                    <td className="px-6 py-3">
                                      <div className="flex items-center justify-center gap-1">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            // AI Scan action
                                          }}
                                          className="p-2 hover:bg-[#FEEDEC] rounded-lg transition-colors group"
                                          title="AI Scan"
                                        >
                                          <Scan className="w-5 h-5 text-[#5720B7] group-hover:text-[#4318A0]" />
                                        </button>
                                        <span className="text-[#B5BCC4] text-sm">/</span>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            // Fill Questionnaire action
                                          }}
                                          className="p-2 hover:bg-[#FEEDEC] rounded-lg transition-colors group"
                                          title="Fill Questionnaire"
                                        >
                                          <ClipboardList className="w-5 h-5 text-[#5720B7] group-hover:text-[#4318A0]" />
                                        </button>
                                      </div>
                                    </td>
                                    <td className="px-6 py-3">
                                      <div className="flex flex-col items-center justify-center gap-1">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            showToolResults(tool.id, category.id);
                                          }}
                                          className="p-2 hover:bg-[#ECE9FE] rounded-lg transition-colors group"
                                          title="View Assessment Results"
                                        >
                                          <Eye className="w-5 h-5 text-[#5720B7] group-hover:text-[#4318A0]" />
                                        </button>
                                        {tool.lastAssessmentDate && (
                                          <span className="font-['Montserrat',sans-serif] text-xs text-[#6B7280]">
                                            {tool.lastAssessmentDate}
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )
                  ].filter(Boolean);
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Results Side Panel */}
      {resultsPanel.isOpen && (
        <div className="w-96 bg-white border border-[#F0F1F2] rounded-lg shadow-lg flex flex-col h-[calc(100vh-200px)] sticky top-6">
          {/* Panel Header */}
          <div className="px-6 py-4 border-b border-[#F0F1F2] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#5720B7]" />
              <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A]">
                Assessment Results
              </h3>
            </div>
            <button
              onClick={closeResultsPanel}
              className="p-1.5 hover:bg-[#F0F1F2] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[#464E58]" />
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {resultsPanel.type === 'category' && currentCategory && (
              <div className="space-y-6">
                {/* Category Header */}
                <div>
                  <h4 className="font-['Montserrat',sans-serif] font-bold text-base text-[#22262A] mb-2">
                    {currentCategory.name}
                  </h4>
                  <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                    {currentCategory.description}
                  </p>
                </div>

                {/* Overall Status */}
                <div>
                  <h5 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                    Overall Status
                  </h5>
                  <span className={`inline-flex px-3 py-1.5 rounded-full ${getStatusBadge(currentCategory.status)} font-['Montserrat',sans-serif] font-semibold text-xs`}>
                    {currentCategory.status}
                  </span>
                </div>

                {/* Tools Results */}
                <div>
                  <h5 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-3">
                    Tools Assessment ({currentCategory.tools.length})
                  </h5>
                  <div className="space-y-3">
                    {currentCategory.tools.map((tool) => (
                      <div key={tool.id} className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
                        <div className="flex items-start justify-between mb-2">
                          <h6 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] flex-1">
                            {tool.name}
                          </h6>
                          <span className={`inline-flex px-2 py-1 rounded-full ${getStatusBadge(tool.status)} font-['Montserrat',sans-serif] font-semibold text-xs ml-2`}>
                            {tool.status}
                          </span>
                        </div>
                        <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#6B7280] mb-3">
                          {tool.description}
                        </p>
                        {tool.status === 'Passed' && (
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="font-['Montserrat',sans-serif] text-[#6B7280]">Score:</span>
                              <span className="font-['Montserrat',sans-serif] font-semibold text-[#2E7D32]">95/100</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-['Montserrat',sans-serif] text-[#6B7280]">Last Run:</span>
                              <span className="font-['Montserrat',sans-serif] font-medium text-[#464E58]">Mar 10, 2026</span>
                            </div>
                          </div>
                        )}
                        {tool.status === 'In Progress' && (
                          <div className="text-xs">
                            <div className="flex justify-between mb-1">
                              <span className="font-['Montserrat',sans-serif] text-[#6B7280]">Progress:</span>
                              <span className="font-['Montserrat',sans-serif] font-semibold text-[#F57C00]">65%</span>
                            </div>
                            <div className="w-full bg-[#E5E7EB] rounded-full h-1.5">
                              <div className="bg-[#F57C00] h-1.5 rounded-full" style={{width: '65%'}}></div>
                            </div>
                          </div>
                        )}
                        {tool.status === 'Pending' && (
                          <div className="text-xs">
                            <span className="font-['Montserrat',sans-serif] text-[#6B7280]">Awaiting assessment</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {resultsPanel.type === 'tool' && currentTool && currentCategory && (
              <div className="space-y-6">
                {/* Tool Header */}
                <div>
                  <div className="text-xs font-['Montserrat',sans-serif] font-semibold text-[#5720B7] mb-1">
                    {currentCategory.name}
                  </div>
                  <h4 className="font-['Montserrat',sans-serif] font-bold text-base text-[#22262A] mb-2">
                    {currentTool.name}
                  </h4>
                  <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                    {currentTool.description}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <h5 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                    Status
                  </h5>
                  <span className={`inline-flex px-3 py-1.5 rounded-full ${getStatusBadge(currentTool.status)} font-['Montserrat',sans-serif] font-semibold text-xs`}>
                    {currentTool.status}
                  </span>
                </div>

                {/* Assessment Details */}
                {currentTool.status === 'Passed' && (
                  <div>
                    <h5 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-3">
                      Assessment Details
                    </h5>
                    <div className="space-y-4">
                      <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">Overall Score</span>
                          <span className="font-['Montserrat',sans-serif] font-bold text-lg text-[#2E7D32]">95/100</span>
                        </div>
                        <div className="w-full bg-[#E5E7EB] rounded-full h-2">
                          <div className="bg-[#2E7D32] h-2 rounded-full" style={{width: '95%'}}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                          <span className="font-['Montserrat',sans-serif] text-sm text-[#6B7280]">Last Assessment:</span>
                          <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">Mar 10, 2026</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                          <span className="font-['Montserrat',sans-serif] text-sm text-[#6B7280]">Issues Found:</span>
                          <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">2 Minor</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                          <span className="font-['Montserrat',sans-serif] text-sm text-[#6B7280]">Compliance Level:</span>
                          <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#2E7D32]">High</span>
                        </div>
                      </div>

                      <div>
                        <h6 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                          Key Findings
                        </h6>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] mt-1.5"></span>
                            <span className="font-['Montserrat',sans-serif] text-sm text-[#464E58]">All critical security measures implemented</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] mt-1.5"></span>
                            <span className="font-['Montserrat',sans-serif] text-sm text-[#464E58]">Regular security audits conducted</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F57C00] mt-1.5"></span>
                            <span className="font-['Montserrat',sans-serif] text-sm text-[#464E58]">Minor documentation gaps identified</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {currentTool.status === 'In Progress' && (
                  <div>
                    <h5 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-3">
                      Assessment Progress
                    </h5>
                    <div className="bg-[#FFF9E6] rounded-lg p-4 border border-[#F57C00]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">Progress</span>
                        <span className="font-['Montserrat',sans-serif] font-bold text-lg text-[#F57C00]">65%</span>
                      </div>
                      <div className="w-full bg-[#E5E7EB] rounded-full h-2 mb-3">
                        <div className="bg-[#F57C00] h-2 rounded-full" style={{width: '65%'}}></div>
                      </div>
                      <p className="font-['Montserrat',sans-serif] text-sm text-[#464E58]">
                        Assessment is currently in progress. Estimated completion: 2 days.
                      </p>
                    </div>
                  </div>
                )}

                {currentTool.status === 'Pending' && (
                  <div>
                    <h5 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-3">
                      Assessment Status
                    </h5>
                    <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
                      <p className="font-['Montserrat',sans-serif] text-sm text-[#464E58] mb-3">
                        This tool has not been assessed yet. Click the assess button to start the evaluation.
                      </p>
                      <button className="w-full px-4 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors">
                        Start Assessment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Panel Footer */}
          <div className="px-6 py-4 border-t border-[#F0F1F2] shrink-0 bg-[#F9FAFB]">
            <button
              onClick={closeResultsPanel}
              className="w-full px-4 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
            >
              Close Panel
            </button>
          </div>
        </div>
      )}

      {/* Tool Detail Drawer */}
      {selectedTool && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Drawer Header */}
            <div className="px-6 py-4 border-b border-[#F0F1F2] flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A]">
                  {selectedTool.name}
                </h3>
                <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#6B7280] mt-1">
                  {riskCategories.find(c => c.id === selectedTool.category)?.name || selectedTool.category}
                </p>
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 hover:bg-[#F0F1F2] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#464E58]" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="px-6 py-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h4 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                    Description
                  </h4>
                  <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                    {selectedTool.description}
                  </p>
                </div>

                {/* Category */}
                <div>
                  <h4 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                    Risk Category
                  </h4>
                  <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#464E58]">
                    {riskCategories.find(c => c.id === selectedTool.category)?.name || selectedTool.category}
                  </span>
                </div>

                {/* Implementation Status */}
                <div>
                  <h4 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                    Status
                  </h4>
                  <span className={`inline-flex px-3 py-1.5 rounded-full ${getStatusBadge(selectedTool.status)} font-['Montserrat',sans-serif] font-semibold text-xs`}>
                    {selectedTool.status}
                  </span>
                </div>

                {/* Recommended For (if applicable) */}
                {selectedTool.recommendedFor && (
                  <div>
                    <h4 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                      Recommended For
                    </h4>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                      {selectedTool.recommendedFor}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-4 border-t border-[#F0F1F2]">
                  <div className="grid grid-cols-2 gap-3">
                    <button className="px-4 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors">
                      Run Assessment
                    </button>
                    <button className="px-4 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors">
                      View Documentation
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="px-6 py-4 border-t border-[#F0F1F2] flex items-center justify-end gap-3 shrink-0 bg-[#F9FAFB]">
              <button
                onClick={closeDrawer}
                className="px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}