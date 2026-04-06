import { useState } from 'react';
import { ArrowLeft, Check, AlertCircle, ChevronDown, ChevronUp, FileText, Download, Sparkles, ClipboardList } from 'lucide-react';
import { getSkillAssessment, type SkillAssessment as SkillAssessmentType, type AssessmentQuestion } from '@/app/data/skillAssessments';
import { AIEvaluationDocument } from './AIEvaluationDocument';

interface SkillAssessmentProps {
  skillId: string;
  onBack: () => void;
}

type AssessmentMode = 'choice' | 'ai-scan' | 'questionnaire' | 'evaluation-document';

export function SkillAssessment({ skillId, onBack }: SkillAssessmentProps) {
  const assessment = getSkillAssessment(skillId);
  const [mode, setMode] = useState<AssessmentMode>('choice');
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [expandedQuestions, setExpandedQuestions] = useState<{ [key: string]: boolean }>({});
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanComplete, setScanComplete] = useState<boolean>(false);

  if (!assessment) {
    return (
      <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#464E58] hover:text-[#22262A] mb-4 font-['Montserrat',sans-serif] font-medium text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Risk Evaluations
        </button>
        <p className="font-['Montserrat',sans-serif] text-sm text-[#464E58]">
          Assessment not found for this skill.
        </p>
      </div>
    );
  }

  const totalSections = assessment.sections.length;
  const currentSectionData = assessment.sections[currentSection];

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleCheckboxChange = (questionId: string, option: string, checked: boolean) => {
    const currentAnswers = (answers[questionId] as string[]) || [];
    const newAnswers = checked
      ? [...currentAnswers, option]
      : currentAnswers.filter(a => a !== option);
    handleAnswer(questionId, newAnswers);
  };

  const isQuestionAnswered = (question: AssessmentQuestion): boolean => {
    const answer = answers[question.id];
    if (!answer) return false;
    if (Array.isArray(answer)) return answer.length > 0;
    return answer.trim().length > 0;
  };

  const canProceed = (): boolean => {
    return currentSectionData.questions
      .filter(q => q.required)
      .every(q => isQuestionAnswered(q));
  };

  const handleNext = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const toggleQuestionHelp = (questionId: string) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const renderQuestion = (question: AssessmentQuestion) => {
    const answer = answers[question.id];

    return (
      <div key={question.id} className="space-y-3">
        <div className="flex items-start gap-2">
          <label className="flex-1 font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
            {question.question}
            {question.required && <span className="text-[#F13D30] ml-1">*</span>}
          </label>
          {question.helpText && (
            <button
              onClick={() => toggleQuestionHelp(question.id)}
              className="text-[#B5BCC4] hover:text-[#464E58] transition-colors"
            >
              {expandedQuestions[question.id] ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {expandedQuestions[question.id] && question.helpText && (
          <div className="bg-[#F9FAFB] border-l-4 border-[#F13D30] p-3 rounded">
            <p className="font-['Montserrat',sans-serif] text-xs text-[#464E58]">
              {question.helpText}
            </p>
          </div>
        )}

        {question.type === 'yes-no' && (
          <div className="flex gap-4">
            <button
              onClick={() => handleAnswer(question.id, 'yes')}
              className={`flex-1 px-4 py-2 rounded-lg border font-['Montserrat',sans-serif] font-medium text-sm transition-colors ${
                answer === 'yes'
                  ? 'bg-[#F13D30] border-[#F13D30] text-white'
                  : 'bg-white border-[#E5E7EB] text-[#464E58] hover:border-[#F13D30]'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswer(question.id, 'no')}
              className={`flex-1 px-4 py-2 rounded-lg border font-['Montserrat',sans-serif] font-medium text-sm transition-colors ${
                answer === 'no'
                  ? 'bg-[#F13D30] border-[#F13D30] text-white'
                  : 'bg-white border-[#E5E7EB] text-[#464E58] hover:border-[#F13D30]'
              }`}
            >
              No
            </button>
          </div>
        )}

        {question.type === 'text' && (
          <textarea
            value={(answer as string) || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            className="w-full h-24 px-4 py-3 border border-[#E5E7EB] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:ring-2 focus:ring-[#F13D30] focus:border-transparent resize-none"
            placeholder="Enter your response..."
          />
        )}

        {question.type === 'radio' && question.options && (
          <div className="space-y-2">
            {question.options.map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 p-3 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name={question.id}
                  checked={answer === option}
                  onChange={() => handleAnswer(question.id, option)}
                  className="w-4 h-4 text-[#F13D30] focus:ring-[#F13D30]"
                />
                <span className="font-['Montserrat',sans-serif] text-sm text-[#22262A]">
                  {option}
                </span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'checkbox' && question.options && (
          <div className="space-y-2">
            {question.options.map((option) => {
              const isChecked = Array.isArray(answer) && answer.includes(option);
              return (
                <label
                  key={option}
                  className="flex items-center gap-3 p-3 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => handleCheckboxChange(question.id, option, e.target.checked)}
                    className="w-4 h-4 text-[#F13D30] focus:ring-[#F13D30] rounded"
                  />
                  <span className="font-['Montserrat',sans-serif] text-sm text-[#22262A]">
                    {option}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Choice Screen
  if (mode === 'choice') {
    return (
      <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm">
        <div className="p-6 border-b border-[#F0F1F2]">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#464E58] hover:text-[#22262A] mb-4 font-['Montserrat',sans-serif] font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Risk Evaluations
          </button>
          
          <div className="inline-flex px-3 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full font-['Montserrat',sans-serif] text-xs font-medium text-[#464E58] mb-2">
            {assessment.category}
            {assessment.article && ` • ${assessment.article}`}
          </div>
          <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-2">
            {assessment.name}
          </h1>
          <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
            {assessment.description}
          </p>
        </div>

        <div className="p-8">
          <h2 className="font-['Montserrat',sans-serif] font-semibold text-lg text-[#22262A] mb-2 text-center">
            Choose Your Assessment Method
          </h2>
          <p className="font-['Montserrat',sans-serif] text-sm text-[#464E58] mb-8 text-center">
            Select how you would like to complete this assessment
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* AI Agent Scan Option */}
            <button
              onClick={() => setMode('ai-scan')}
              className="group relative bg-white border-2 border-[#E5E7EB] rounded-xl p-8 hover:border-[#F13D30] hover:shadow-lg transition-all text-left"
            >
              <div className="absolute top-4 right-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F13D30] to-[#DC180A] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="pr-16">
                <h3 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A] mb-3">
                  AI Agent Scan
                </h3>
                <p className="font-['Montserrat',sans-serif] text-sm text-[#464E58] mb-4">
                  Let our AI agents automatically scan and analyze your system to provide instant compliance insights.
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#F13D30]" />
                    <span className="font-['Montserrat',sans-serif] text-xs text-[#464E58]">Automated analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#F13D30]" />
                    <span className="font-['Montserrat',sans-serif] text-xs text-[#464E58]">Instant results</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#F13D30]" />
                    <span className="font-['Montserrat',sans-serif] text-xs text-[#464E58]">AI-powered recommendations</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#F0F1F2]">
                <div className="flex items-center justify-between">
                  <span className="font-['Montserrat',sans-serif] text-xs font-medium text-[#464E58]">
                    Estimated time: ~2 minutes
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#F9FAFB] rounded-full font-['Montserrat',sans-serif] text-xs font-semibold text-[#F13D30]">
                    RECOMMENDED
                  </span>
                </div>
              </div>
            </button>

            {/* Manual Questionnaire Option */}
            <button
              onClick={() => setMode('questionnaire')}
              className="group relative bg-white border-2 border-[#E5E7EB] rounded-xl p-8 hover:border-[#F13D30] hover:shadow-lg transition-all text-left"
            >
              <div className="absolute top-4 right-4">
                <div className="w-12 h-12 rounded-full bg-[#F9FAFB] border-2 border-[#E5E7EB] flex items-center justify-center group-hover:border-[#F13D30] transition-colors">
                  <ClipboardList className="w-6 h-6 text-[#464E58] group-hover:text-[#F13D30] transition-colors" />
                </div>
              </div>
              
              <div className="pr-16">
                <h3 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A] mb-3">
                  Fill Questionnaire
                </h3>
                <p className="font-['Montserrat',sans-serif] text-sm text-[#464E58] mb-4">
                  Manually complete a comprehensive questionnaire for detailed assessment and full control.
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#464E58]" />
                    <span className="font-['Montserrat',sans-serif] text-xs text-[#464E58]">Detailed questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#464E58]" />
                    <span className="font-['Montserrat',sans-serif] text-xs text-[#464E58]">Complete control</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#464E58]" />
                    <span className="font-['Montserrat',sans-serif] text-xs text-[#464E58]">Section-by-section guidance</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#F0F1F2]">
                <span className="font-['Montserrat',sans-serif] text-xs font-medium text-[#464E58]">
                  Estimated time: ~15 minutes
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // AI Scan Mode
  if (mode === 'ai-scan') {
    const handleStartScan = () => {
      setScanProgress(0);
      setScanComplete(false);
      
      // Simulate AI scanning with progressive updates
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setScanComplete(true);
            return 100;
          }
          return prev + 10;
        });
      }, 400);
    };

    return (
      <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm">
        <div className="p-6 border-b border-[#F0F1F2]">
          <button
            onClick={() => setMode('choice')}
            className="flex items-center gap-2 text-[#464E58] hover:text-[#22262A] mb-4 font-['Montserrat',sans-serif] font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Method Selection
          </button>
          
          <div className="inline-flex px-3 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full font-['Montserrat',sans-serif] text-xs font-medium text-[#464E58] mb-2">
            {assessment.category} • AI Agent Scan
          </div>
          <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-2">
            {assessment.name}
          </h1>
        </div>

        <div className="p-8">
          {!scanComplete && scanProgress === 0 ? (
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F13D30] to-[#DC180A] flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A] mb-3">
                Ready to Scan
              </h2>
              <p className="font-['Montserrat',sans-serif] text-sm text-[#464E58] mb-8">
                Our AI agents will analyze your system configuration, data flows, and compliance posture to generate a comprehensive assessment report.
              </p>
              
              <button
                onClick={handleStartScan}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                Start AI Scan
              </button>
            </div>
          ) : !scanComplete ? (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F13D30] to-[#DC180A] flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A] mb-2">
                  Scanning in Progress...
                </h2>
                <p className="font-['Montserrat',sans-serif] text-sm text-[#464E58]">
                  AI agents are analyzing your system
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm font-['Montserrat',sans-serif] font-medium text-[#464E58]">
                  <span>Progress</span>
                  <span>{scanProgress}%</span>
                </div>
                <div className="w-full h-3 bg-[#F0F1F2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#F13D30] to-[#DC180A] transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {[
                  { label: 'Analyzing system configuration', progress: 0 },
                  { label: 'Reviewing data flows', progress: 25 },
                  { label: 'Checking compliance requirements', progress: 50 },
                  { label: 'Generating recommendations', progress: 75 }
                ].map((step) => (
                  <div
                    key={step.label}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      scanProgress > step.progress ? 'bg-[#F9FAFB]' : 'bg-white'
                    }`}
                  >
                    {scanProgress > step.progress ? (
                      <Check className="w-5 h-5 text-[#F13D30] flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-[#E5E7EB] flex-shrink-0" />
                    )}
                    <span className={`font-['Montserrat',sans-serif] text-sm ${
                      scanProgress > step.progress ? 'text-[#22262A] font-medium' : 'text-[#B5BCC4]'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-[#10B981] flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A] mb-2">
                  Scan Complete
                </h2>
                <p className="font-['Montserrat',sans-serif] text-sm text-[#464E58] mb-6">
                  Analysis complete. Generating comprehensive evaluation report...
                </p>
                <button
                  onClick={() => setMode('evaluation-document')}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  View Evaluation Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Questionnaire Mode
  if (mode === 'questionnaire') {
    return (
      <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-[#F0F1F2]">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#464E58] hover:text-[#22262A] mb-4 font-['Montserrat',sans-serif] font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Risk Evaluations
          </button>
          
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="inline-flex px-3 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full font-['Montserrat',sans-serif] text-xs font-medium text-[#464E58] mb-2">
                {assessment.category}
                {assessment.article && ` • ${assessment.article}`}
              </div>
              <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-2">
                {assessment.name}
              </h1>
              <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                {assessment.description}
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-[#F13D30] text-[#F13D30] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F13D30] hover:text-white transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58]">
              <span>Section {currentSection + 1} of {totalSections}</span>
              <span>{Math.round(((currentSection + 1) / totalSections) * 100)}% Complete</span>
            </div>
            <div className="w-full h-2 bg-[#F0F1F2] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F13D30] transition-all duration-300"
                style={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Current Section */}
        <div className="p-6">
          <div className="mb-6">
            <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A] mb-2">
              {currentSectionData.title}
            </h2>
            <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
              {currentSectionData.description}
            </p>
          </div>

          <div className="space-y-6">
            {currentSectionData.questions.map(renderQuestion)}
          </div>

          {!canProceed() && (
            <div className="mt-6 flex items-start gap-3 p-4 bg-[#FEF3F2] border border-[#FEE4E2] rounded-lg">
              <AlertCircle className="w-5 h-5 text-[#F13D30] flex-shrink-0 mt-0.5" />
              <p className="font-['Montserrat',sans-serif] text-sm text-[#464E58]">
                Please answer all required questions (marked with *) to continue.
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="p-6 border-t border-[#F0F1F2] flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className="px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {currentSection < totalSections - 1 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Section
            </button>
          ) : (
            <button
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="w-4 h-4" />
              Complete Assessment
            </button>
          )}
        </div>
      </div>
    );
  }

  // Evaluation Document Mode
  if (mode === 'evaluation-document') {
    return (
      <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm">
        <div className="p-6 border-b border-[#F0F1F2]">
          <button
            onClick={() => setMode('choice')}
            className="flex items-center gap-2 text-[#464E58] hover:text-[#22262A] mb-4 font-['Montserrat',sans-serif] font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Method Selection
          </button>
          
          <div className="inline-flex px-3 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full font-['Montserrat',sans-serif] text-xs font-medium text-[#464E58] mb-2">
            {assessment.category} • Evaluation Document
          </div>
          <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-2">
            {assessment.name}
          </h1>
        </div>

        <div className="p-8">
          <AIEvaluationDocument assessment={assessment} />
        </div>
      </div>
    );
  }

  return null;
}