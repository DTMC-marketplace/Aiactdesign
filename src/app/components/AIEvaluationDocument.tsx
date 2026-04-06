import { ArrowLeft, Download, CheckCircle, AlertTriangle, AlertCircle, FileText, Shield, Target } from 'lucide-react';
import { AISafetyPlanSection } from './AISafetyPlanSection';
import { RedTeamSecurityReport } from './RedTeamSecurityReport';
import { PromptfooGuardrailsReport } from './PromptfooGuardrailsReport';

interface AIEvaluationDocumentProps {
  toolName?: string;
  taskName?: string;
  article?: string;
  systemName?: string;
  assessment?: any;
  onBack: () => void;
}

export function AIEvaluationDocument({
  toolName,
  taskName,
  article,
  systemName = "Resume Screening AI",
  assessment,
  onBack,
}: AIEvaluationDocumentProps) {
  
  // Use assessment data if provided, otherwise use defaults
  const displayName = assessment?.name || toolName || "Compliance Assessment";
  const displayCategory = assessment?.category || taskName || "Risk Management";
  const displayArticle = assessment?.article || article || "Art. 9";

  const assessmentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const handleExport = () => {
    window.print();
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FAFBFC]">
      {/* Header */}
      <div className="bg-white border-b border-[#F0F1F2] px-8 py-6 print:hidden">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-4 text-[#565F6C] hover:text-[#22262A] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-['Montserrat',sans-serif] font-medium text-sm">
            Back to Assessment
          </span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <div className="mb-2">
              <span className="px-3 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full font-['Montserrat',sans-serif] text-xs font-medium text-[#464E58]">
                AI Risk Assessment Report · {displayArticle}
              </span>
            </div>

            <h1 className="font-['Montserrat',sans-serif] font-bold text-3xl text-[#22262A]">
              🎯 AI Risk Assessment Report
            </h1>
            <p className="font-['Montserrat',sans-serif] font-normal text-base text-[#565F6C] mt-2">
              {systemName} · {displayCategory}
            </p>
          </div>

          <button 
            onClick={handleExport}
            className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-bold text-sm hover:bg-[#DC180A] transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-8 py-8">
          
          {/* Document Header */}
          <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6 mb-6">
            <div className="space-y-2 font-['Montserrat',sans-serif]">
              <p className="text-sm text-[#464E58]"><span className="font-bold">Target System:</span> {systemName}</p>
              <p className="text-sm text-[#464E58]"><span className="font-bold">Assessment Date:</span> {assessmentDate}</p>
              <p className="text-sm text-[#464E58]"><span className="font-bold">Framework:</span> EU AI Act + NIST AI RMF</p>
              <p className="text-sm text-[#464E58]"><span className="font-bold">Assessor:</span> AI Governance Skill</p>
            </div>
          </div>

          {/* System Classification */}
          <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-8 mb-6">
            <h2 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-6 flex items-center gap-3">
              <span>📋</span> System Classification
            </h2>

            <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">
              System Characteristics
            </h3>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] bg-[#F9FAFB]">System Name</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">{systemName}</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] bg-[#F9FAFB]">Version</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">2.1.0</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] bg-[#F9FAFB]">Model</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Custom ML Model (XGBoost + Neural Network)</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] bg-[#F9FAFB]">Category</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Employment AI System</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] bg-[#F9FAFB]">Use Case</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Automated resume screening and candidate ranking</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] bg-[#F9FAFB]">Deployment Context</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Enterprise / HR Department</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] bg-[#F9FAFB]">End Users</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">HR managers, recruiters, job applicants</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">
              EU AI Act Risk Classification
            </h3>

            <div className="bg-[#FEF2F2] border-2 border-[#DC180A] rounded-lg p-6 mb-6">
              <div className="text-center">
                <div className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A] mb-4">
                  RISK CLASSIFICATION
                </div>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <AlertTriangle className="w-8 h-8 text-[#DC180A]" />
                  <span className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#DC180A]">
                    Risk Level: HIGH-RISK
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="font-['Montserrat',sans-serif] text-sm text-[#464E58]">
                    <span className="font-bold">Annex III, Point 4</span> - Employment and Workers Management
                  </p>
                  <p className="font-['Montserrat',sans-serif] text-sm text-[#464E58]">
                    <span className="font-bold">Classification Date:</span> {assessmentDate}
                  </p>
                  <p className="font-['Montserrat',sans-serif] text-sm text-[#464E58]">
                    <span className="font-bold">Classification Reasoning:</span> AI system for recruitment and selection of natural persons
                  </p>
                </div>
              </div>
            </div>

            <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-3">
              Classification Reasoning
            </h3>
            
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
              <p className="font-['Montserrat',sans-serif] text-sm text-[#464E58] mb-3">
                Based on EU AI Act Annex III, this system is classified as <span className="font-bold text-[#DC180A]">High-Risk</span> because:
              </p>
              <ol className="list-decimal list-inside space-y-2 font-['Montserrat',sans-serif] text-sm text-[#464E58]">
                <li><span className="font-semibold">Employment Decision-Making</span> (Annex III, Point 4): System makes decisions affecting recruitment and candidate selection</li>
                <li><span className="font-semibold">Automated Processing</span>: AI system evaluates and ranks candidates with limited human oversight</li>
                <li><span className="font-semibold">Impact on Rights</span>: Decisions directly affect fundamental rights to work and non-discrimination</li>
                <li><span className="font-semibold">Personal Data Processing</span>: Processes sensitive personal data including education, work history, and qualifications</li>
              </ol>
            </div>
          </div>

          {/* Compliance Assessment */}
          <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-8 mb-6">
            <h2 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-6 flex items-center gap-3">
              <span>✅</span> Compliance Assessment
            </h2>

            <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">
              {displayArticle} Requirements - {displayCategory}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#E5E7EB]">
                <thead>
                  <tr className="bg-[#F9FAFB]">
                    <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Requirement</th>
                    <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Status</th>
                    <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Implementation</th>
                    <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Evidence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Risk Management System</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-[#FEF3C7] border border-[#F59E0B] rounded text-xs font-['Montserrat',sans-serif] font-bold">⚠️ PARTIAL</span></td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Basic risk register exists</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Documentation incomplete</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Data Governance</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-[#FEE2E2] border border-[#DC180A] rounded text-xs font-['Montserrat',sans-serif] font-bold">❌ MISSING</span></td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">No formal data quality framework</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Training data not documented</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Technical Documentation</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-[#FEF3C7] border border-[#F59E0B] rounded text-xs font-['Montserrat',sans-serif] font-bold">⚠️ PARTIAL</span></td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Model architecture documented</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Missing Annex IV sections</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Logging & Record-Keeping</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-[#FEF3C7] border border-[#F59E0B] rounded text-xs font-['Montserrat',sans-serif] font-bold">⚠️ PARTIAL</span></td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Basic logging enabled</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Not immutable</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Transparency & Information</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-[#D1FAE5] border border-[#10B981] rounded text-xs font-['Montserrat',sans-serif] font-bold">✅ COMPLIANT</span></td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Candidate notifications implemented</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">User-facing documentation</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Human Oversight</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-[#FEE2E2] border border-[#DC180A] rounded text-xs font-['Montserrat',sans-serif] font-bold">❌ MISSING</span></td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">No mandatory review process</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Automated decisions only</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Accuracy & Robustness</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-[#D1FAE5] border border-[#10B981] rounded text-xs font-['Montserrat',sans-serif] font-bold">✅ COMPLIANT</span></td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Performance metrics tracked</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">85% accuracy achieved</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Article 15: Cybersecurity */}
          <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-8 mb-6">
            <h2 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-[#F13D30]" />
              <span>Article 15: Cybersecurity</span>
            </h2>

            <div className="bg-[#EEF3FD] border-l-4 border-[#2C78B1] rounded-r-lg p-6 mb-6">
              <h3 className="font-['Montserrat',sans-serif] font-bold text-base text-[#1A417C] mb-3">
                EU AI Act Requirement
              </h3>
              <p className="font-['Montserrat',sans-serif] text-sm text-[#22262A] leading-relaxed mb-3">
                High-risk AI systems shall be resilient against attempts by unauthorized third parties to alter their use, 
                outputs or performance by exploiting system vulnerabilities. Technical solutions shall be in place to address 
                and mitigate relevant AI-specific vulnerabilities.
              </p>
              <div className="bg-white rounded-lg p-3 border border-[#2C78B1]">
                <p className="font-['Montserrat',sans-serif] text-xs text-[#464E58]">
                  <span className="font-bold">Key Requirements:</span> Resilience against unauthorized manipulation, 
                  protection against adversarial attacks, secure model deployment, input validation, and prompt injection defense.
                </p>
              </div>
            </div>

            {/* Red Team Security Testing Report */}
            <RedTeamSecurityReport />

            {/* Promptfoo Guardrails Testing Report */}
            <PromptfooGuardrailsReport />
          </div>

          {/* NIST AI RMF Assessment */}
          <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-8 mb-6">
            <h2 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-6 flex items-center gap-3">
              <span>📊</span> NIST AI RMF Assessment
            </h2>

            {/* GOVERN Function */}
            <div className="mb-6">
              <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-3">GOVERN Function</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-[#E5E7EB]">
                  <thead>
                    <tr className="bg-[#F9FAFB]">
                      <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Category</th>
                      <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Status</th>
                      <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Score</th>
                      <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Policies & Procedures</td>
                      <td className="py-3 px-4"><span className="text-[#F59E0B]">⚠️ Partial</span></td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#F59E0B]">2/5</td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Embedded in code, not external policy docs</td>
                    </tr>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Accountability Structures</td>
                      <td className="py-3 px-4"><span className="text-[#DC180A]">❌ Missing</span></td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#DC180A]">1/5</td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">No defined roles or escalation</td>
                    </tr>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Legal Compliance</td>
                      <td className="py-3 px-4"><span className="text-[#10B981]">✅ Good</span></td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#10B981]">4/5</td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">EU AI Act considered in design</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* MAP Function */}
            <div className="mb-6">
              <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-3">MAP Function</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-[#E5E7EB]">
                  <thead>
                    <tr className="bg-[#F9FAFB]">
                      <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Category</th>
                      <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Status</th>
                      <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Score</th>
                      <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Intended Purpose</td>
                      <td className="py-3 px-4"><span className="text-[#10B981]">✅ Good</span></td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#10B981]">4/5</td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Clear documentation in requirements</td>
                    </tr>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Risk Categorization</td>
                      <td className="py-3 px-4"><span className="text-[#10B981]">✅ Excellent</span></td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#10B981]">5/5</td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Properly classified as high-risk</td>
                    </tr>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Impacts & Affected Parties</td>
                      <td className="py-3 px-4"><span className="text-[#F59E0B]">⚠️ Partial</span></td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#F59E0B]">2/5</td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Users identified, no impact assessment</td>
                    </tr>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Dependencies</td>
                      <td className="py-3 px-4"><span className="text-[#F59E0B]">⚠️ Partial</span></td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#F59E0B]">3/5</td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Dependencies documented, risks not assessed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* MEASURE Function */}
            <div className="mb-6">
              <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-3">MEASURE Function</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-[#E5E7EB]">
                  <thead>
                    <tr className="bg-[#F9FAFB]">
                      <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Category</th>
                      <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Status</th>
                      <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Score</th>
                      <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Risk Metrics</td>
                      <td className="py-3 px-4"><span className="text-[#DC180A]">❌ Missing</span></td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#DC180A]">1/5</td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">No KPIs or KRIs defined</td>
                    </tr>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Testing & Evaluation</td>
                      <td className="py-3 px-4"><span className="text-[#DC180A]">❌ Missing</span></td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#DC180A]">1/5</td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">No formal test suite</td>
                    </tr>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Continuous Monitoring</td>
                      <td className="py-3 px-4"><span className="text-[#DC180A]">❌ Missing</span></td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#DC180A]">1/5</td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">No monitoring implemented</td>
                    </tr>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Independent Assessment</td>
                      <td className="py-3 px-4"><span className="text-[#DC180A]">❌ Missing</span></td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#DC180A]">1/5</td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">No audit trails</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* MANAGE Function */}
            <div className="mb-6">
              <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-3">MANAGE Function</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-[#E5E7EB]">
                  <thead>
                    <tr className="bg-[#F9FAFB]">
                      <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Category</th>
                      <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Status</th>
                      <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Score</th>
                      <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Risk Prioritization</td>
                      <td className="py-3 px-4"><span className="text-[#F59E0B]">⚠️ Partial</span></td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#F59E0B]">2/5</td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Implicit prioritization only</td>
                    </tr>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Risk Response</td>
                      <td className="py-3 px-4"><span className="text-[#F59E0B]">⚠️ Partial</span></td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#F59E0B]">2/5</td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Basic error handling</td>
                    </tr>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Residual Risk</td>
                      <td className="py-3 px-4"><span className="text-[#F59E0B]">⚠️ Partial</span></td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#F59E0B]">3/5</td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Some risks acknowledged</td>
                    </tr>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Documentation</td>
                      <td className="py-3 px-4"><span className="text-[#F59E0B]">⚠️ Partial</span></td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#F59E0B]">3/5</td>
                      <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Technical docs exist, governance missing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Overall Score */}
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-6">
              <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">NIST AI RMF Overall Score</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="font-['Montserrat',sans-serif] text-sm text-[#464E58] mb-1">GOVERN</div>
                  <div className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#F59E0B]">★★☆☆☆</div>
                  <div className="font-['Montserrat',sans-serif] text-xs text-[#464E58]">2.3/5</div>
                </div>
                <div className="text-center">
                  <div className="font-['Montserrat',sans-serif] text-sm text-[#464E58] mb-1">MAP</div>
                  <div className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#FBBF24]">★★★☆☆</div>
                  <div className="font-['Montserrat',sans-serif] text-xs text-[#464E58]">3.5/5</div>
                </div>
                <div className="text-center">
                  <div className="font-['Montserrat',sans-serif] text-sm text-[#464E58] mb-1">MEASURE</div>
                  <div className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#DC180A]">★☆☆☆☆</div>
                  <div className="font-['Montserrat',sans-serif] text-xs text-[#464E58]">1.0/5</div>
                </div>
                <div className="text-center">
                  <div className="font-['Montserrat',sans-serif] text-sm text-[#464E58] mb-1">MANAGE</div>
                  <div className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#F59E0B]">★★☆☆☆</div>
                  <div className="font-['Montserrat',sans-serif] text-xs text-[#464E58]">2.5/5</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#E5E7EB] text-center">
                <div className="font-['Montserrat',sans-serif] text-sm text-[#464E58] mb-1">OVERALL</div>
                <div className="font-['Montserrat',sans-serif] font-bold text-3xl text-[#F59E0B]">★★☆☆☆</div>
                <div className="font-['Montserrat',sans-serif] text-base text-[#464E58]">2.3/5</div>
              </div>
            </div>
          </div>

          {/* Risk Register */}
          <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-8 mb-6">
            <h2 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-6 flex items-center gap-3">
              <span>🔍</span> Risk Register
            </h2>

            <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">Identified Risks</h3>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-[#E5E7EB] text-xs">
                <thead>
                  <tr className="bg-[#F9FAFB]">
                    <th className="py-2 px-3 text-left font-['Montserrat',sans-serif] font-bold text-[#22262A] border-b border-[#E5E7EB]">Risk ID</th>
                    <th className="py-2 px-3 text-left font-['Montserrat',sans-serif] font-bold text-[#22262A] border-b border-[#E5E7EB]">Category</th>
                    <th className="py-2 px-3 text-left font-['Montserrat',sans-serif] font-bold text-[#22262A] border-b border-[#E5E7EB]">Risk</th>
                    <th className="py-2 px-3 text-left font-['Montserrat',sans-serif] font-bold text-[#22262A] border-b border-[#E5E7EB]">Likelihood</th>
                    <th className="py-2 px-3 text-left font-['Montserrat',sans-serif] font-bold text-[#22262A] border-b border-[#E5E7EB]">Impact</th>
                    <th className="py-2 px-3 text-left font-['Montserrat',sans-serif] font-bold text-[#22262A] border-b border-[#E5E7EB]">Score</th>
                    <th className="py-2 px-3 text-left font-['Montserrat',sans-serif] font-bold text-[#22262A] border-b border-[#E5E7EB]">Mitigation Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] font-bold text-[#464E58]">R-001</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">Bias</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">Discriminatory candidate ranking</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">High</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">High</td>
                    <td className="py-2 px-3"><span className="px-2 py-1 bg-[#FEE2E2] text-[#DC180A] rounded font-bold">🔴 High</span></td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">❌ No testing</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] font-bold text-[#464E58]">R-002</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">Legal</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">Non-compliance with EU AI Act</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">Medium</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">High</td>
                    <td className="py-2 px-3"><span className="px-2 py-1 bg-[#FEE2E2] text-[#DC180A] rounded font-bold">🔴 High</span></td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">⚠️ Partial compliance</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] font-bold text-[#464E58]">R-003</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">Privacy</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">Unauthorized data exposure</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">Low</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">High</td>
                    <td className="py-2 px-3"><span className="px-2 py-1 bg-[#FEF3C7] text-[#92400E] rounded font-bold">🟡 Medium</span></td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">✅ Encryption enabled</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] font-bold text-[#464E58]">R-004</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">Technical</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">Model performance degradation</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">Medium</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">Medium</td>
                    <td className="py-2 px-3"><span className="px-2 py-1 bg-[#FEF3C7] text-[#92400E] rounded font-bold">🟡 Medium</span></td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">❌ No monitoring</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] font-bold text-[#464E58]">R-005</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">Operational</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">System unavailability</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">Low</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">Medium</td>
                    <td className="py-2 px-3"><span className="px-2 py-1 bg-[#FEF3C7] text-[#92400E] rounded font-bold">🟡 Medium</span></td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">⚠️ Basic redundancy</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] font-bold text-[#464E58]">R-006</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">Trust</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">Incorrect candidate assessment</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">Medium</td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">High</td>
                    <td className="py-2 px-3"><span className="px-2 py-1 bg-[#FEE2E2] text-[#DC180A] rounded font-bold">🔴 High</span></td>
                    <td className="py-2 px-3 font-['Montserrat',sans-serif] text-[#464E58]">⚠️ Validation incomplete</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">Risk Heat Map</h3>
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-6 overflow-x-auto">
              <pre className="font-mono text-xs text-[#22262A] whitespace-pre">
{`           IMPACT
        Low   Med   High
      ┌─────┬─────┬─────┐
 High │     │     │R001 │
      │     │     │R002 │
      ├─────┼─────┼─────┤
L Med │     │R004 │R006 │
I     │     │R005 │     │
K     │     │     │     │
E     ├─────┼─────┼─────┤
L Low │     │     │R003 │
I     │     │     │     │
H     └─────┴─────┴─────┘`}
              </pre>
            </div>
          </div>

          {/* Responsible AI Principles */}
          <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-8 mb-6">
            <h2 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-6 flex items-center gap-3">
              <span>📝</span> Responsible AI Principles Assessment
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#E5E7EB]">
                <thead>
                  <tr className="bg-[#F9FAFB]">
                    <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Principle</th>
                    <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Status</th>
                    <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Score</th>
                    <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Implementation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#464E58]">Fairness</td>
                    <td className="py-3 px-4"><span className="text-[#F59E0B]">⚠️ Unknown</span></td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#F59E0B]">2/5</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">No bias testing performed</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#464E58]">Transparency</td>
                    <td className="py-3 px-4"><span className="text-[#10B981]">✅ Strong</span></td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#10B981]">5/5</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Excellent disclosure to candidates</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#464E58]">Accountability</td>
                    <td className="py-3 px-4"><span className="text-[#F59E0B]">⚠️ Partial</span></td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#F59E0B]">2/5</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">No governance structure</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#464E58]">Privacy</td>
                    <td className="py-3 px-4"><span className="text-[#F59E0B]">⚠️ Partial</span></td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#F59E0B]">3/5</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Basic data protection measures</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#464E58]">Safety</td>
                    <td className="py-3 px-4"><span className="text-[#F59E0B]">⚠️ Partial</span></td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#F59E0B]">3/5</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Basic error handling</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#464E58]">Human Oversight</td>
                    <td className="py-3 px-4"><span className="text-[#DC180A]">❌ Missing</span></td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#DC180A]">1/5</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Fully automated decisions</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Safety Plan */}
          <AISafetyPlanSection />

          {/* Model Card Summary */}
          <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-8 mb-6">
            <h2 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-6 flex items-center gap-3">
              <span>📋</span> Model Card Summary
            </h2>

            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 overflow-x-auto">
              <pre className="font-mono text-xs text-[#22262A] whitespace-pre">
{`model_details:
  name: "${systemName}"
  version: "2.1.0"
  type: "ML Classification System"
  underlying_model: "XGBoost + Neural Network"
  developer: "HR Technology Team"
  license: "Proprietary"
  release_date: "2025-01-15"

intended_use:
  primary_use_cases:
    - "Resume screening and ranking"
    - "Candidate skill matching"
    - "Interview shortlisting"
  intended_users:
    - "HR managers"
    - "Recruitment teams"
    - "Hiring managers"
  out_of_scope_uses:
    - "Final hiring decisions without human review"
    - "Candidate rejection without explanation"
    - "Processing of special category data without consent"

ethical_considerations:
  fairness: "Requires comprehensive bias testing"
  privacy: "Processes personal and employment data"
  transparency: "Candidates notified of AI use"
  limitations:
    - "Requires human oversight for final decisions"
    - "May not detect all relevant candidate qualities"
    - "Performance varies across job categories"

caveats_and_recommendations:
  - "Implement mandatory human review process"
  - "Conduct regular bias audits"
  - "Provide explanation mechanism for decisions"
  - "Ensure GDPR compliance for data processing"`}
              </pre>
            </div>
          </div>

          {/* Compliance Actions Required */}
          <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-8 mb-6">
            <h2 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-6 flex items-center gap-3">
              <span>✅</span> Compliance Actions Required
            </h2>

            <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">
              Immediate (Required for Current Risk Level)
            </h3>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-[#E5E7EB]">
                <thead>
                  <tr className="bg-[#F9FAFB]">
                    <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Priority</th>
                    <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Action</th>
                    <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Category</th>
                    <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Effort</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4"><span className="text-[#DC180A]">🔲</span></td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Implement human oversight mechanism</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Governance</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">High</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4"><span className="text-[#DC180A]">🔲</span></td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Conduct comprehensive bias testing</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Fairness</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">High</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4"><span className="text-[#DC180A]">🔲</span></td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Complete technical documentation (Annex IV)</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Documentation</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Medium</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">
              Recommended Improvements
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#E5E7EB]">
                <thead>
                  <tr className="bg-[#F9FAFB]">
                    <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Priority</th>
                    <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Action</th>
                    <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Category</th>
                    <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Effort</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#DC180A]">P1</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Implement structured logging and monitoring</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Measure</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Medium</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#DC180A]">P1</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Establish Quality Management System</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Governance</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">High</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#F59E0B]">P2</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Document training data governance</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Data</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Medium</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#F59E0B]">P2</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Upgrade to immutable logging infrastructure</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Technical</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Medium</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#10B981]">P3</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Create comprehensive model card</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Documentation</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Low</td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-sm text-[#10B981]">P3</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Implement continuous performance monitoring</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Monitoring</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Medium</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Compliance Scorecard */}
          <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-8 mb-6">
            <h2 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-6 flex items-center gap-3">
              <span>📈</span> Compliance Scorecard
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#E5E7EB]">
                <thead>
                  <tr className="bg-[#F9FAFB]">
                    <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Area</th>
                    <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Score</th>
                    <th className="py-3 px-4 text-left font-['Montserrat',sans-serif] font-bold text-sm text-[#22262A] border-b border-[#E5E7EB]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">EU AI Act {displayArticle}</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-lg text-[#F59E0B]">58%</td>
                    <td className="py-3 px-4"><span className="px-3 py-1 bg-[#FEF3C7] border border-[#F59E0B] rounded-full text-xs font-['Montserrat',sans-serif] font-bold">⚠️ Needs Work</span></td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">NIST AI RMF Govern</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-lg text-[#F59E0B]">46%</td>
                    <td className="py-3 px-4"><span className="px-3 py-1 bg-[#FEF3C7] border border-[#F59E0B] rounded-full text-xs font-['Montserrat',sans-serif] font-bold">⚠️ Needs Work</span></td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">NIST AI RMF Map</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-lg text-[#FBBF24]">70%</td>
                    <td className="py-3 px-4"><span className="px-3 py-1 bg-[#FEF3C7] border border-[#FBBF24] rounded-full text-xs font-['Montserrat',sans-serif] font-bold">⚠️ Acceptable</span></td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">NIST AI RMF Measure</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-lg text-[#DC180A]">20%</td>
                    <td className="py-3 px-4"><span className="px-3 py-1 bg-[#FEE2E2] border border-[#DC180A] rounded-full text-xs font-['Montserrat',sans-serif] font-bold">❌ Critical</span></td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">NIST AI RMF Manage</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-lg text-[#F59E0B]">50%</td>
                    <td className="py-3 px-4"><span className="px-3 py-1 bg-[#FEF3C7] border border-[#F59E0B] rounded-full text-xs font-['Montserrat',sans-serif] font-bold">⚠️ Needs Work</span></td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] text-sm text-[#464E58]">Responsible AI</td>
                    <td className="py-3 px-4 font-['Montserrat',sans-serif] font-bold text-lg text-[#FBBF24]">63%</td>
                    <td className="py-3 px-4"><span className="px-3 py-1 bg-[#FEF3C7] border border-[#FBBF24] rounded-full text-xs font-['Montserrat',sans-serif] font-bold">⚠️ Acceptable</span></td>
                  </tr>
                  <tr className="bg-[#F9FAFB] border-b-2 border-[#E5E7EB]">
                    <td className="py-4 px-4 font-['Montserrat',sans-serif] font-bold text-base text-[#22262A]">Overall Maturity</td>
                    <td className="py-4 px-4 font-['Montserrat',sans-serif] font-bold text-2xl text-[#F59E0B]">51%</td>
                    <td className="py-4 px-4"><span className="px-3 py-1 bg-[#FEF3C7] border border-[#F59E0B] rounded-full text-sm font-['Montserrat',sans-serif] font-bold">⚠️ Developing</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-gradient-to-br from-[#F13D30] to-[#DC180A] rounded-lg p-8 mb-6 text-white">
            <h2 className="font-['Montserrat',sans-serif] font-bold text-2xl mb-4 flex items-center gap-3">
              <span>🎯</span> Conclusion
            </h2>
            <p className="font-['Montserrat',sans-serif] text-base mb-4 leading-relaxed">
              <span className="font-bold">{systemName}</span> is classified as a <span className="font-bold">HIGH-RISK</span> AI system under 
              EU AI Act Annex III. While the system demonstrates <span className="font-bold">partial compliance</span> with transparency 
              requirements, it requires <span className="font-bold">immediate action</span> to address critical gaps in human oversight, 
              bias testing, and data governance.
            </p>
            <p className="font-['Montserrat',sans-serif] text-base mb-4 leading-relaxed">
              The NIST AI RMF assessment reveals significant weaknesses in the <span className="font-bold">MEASURE</span> function (20%) 
              and moderate deficiencies in <span className="font-bold">GOVERN</span> (46%) and <span className="font-bold">MANAGE</span> (50%) 
              functions. The overall maturity score of <span className="font-bold">51%</span> indicates the system is in a <span className="font-bold">developing</span> state 
              and not yet ready for production deployment without substantial improvements.
            </p>
            <div className="bg-white rounded-lg p-4 mb-4">
              <p className="font-['Montserrat',sans-serif] font-bold text-base mb-2 text-[#22262A]">
                ⚠️ Recommendation
              </p>
              <p className="font-['Montserrat',sans-serif] text-sm leading-relaxed text-[#22262A]">
                <span className="font-bold">DO NOT PROCEED</span> with production deployment until critical compliance gaps are addressed. 
                Implement mandatory human oversight, conduct comprehensive bias testing, and complete technical documentation 
                within <span className="font-bold">90 days</span>. Establish continuous monitoring and Quality Management System before market placement.
              </p>
            </div>
            <p className="font-['Montserrat',sans-serif] text-xs opacity-90 italic">
              Assessment conducted per AI Governance Skill methodology · EU AI Act (Regulation 2024/1689) + NIST AI RMF 1.0
            </p>
          </div>

          {/* Footer */}
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-6 text-center">
            <p className="font-['Montserrat',sans-serif] text-sm text-[#565F6C] mb-2">
              This assessment was generated by AI-powered compliance tools and should be reviewed by qualified compliance professionals.
            </p>
            <p className="font-['Montserrat',sans-serif] text-xs text-[#B5BCC4]">
              © 2026 AI Compliance Platform · All rights reserved · Report Version 1.0
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
