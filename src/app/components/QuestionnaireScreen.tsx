import { ArrowLeft, Download } from 'lucide-react';
import { useState } from 'react';
import { assessmentFrameworks, AssessmentQuestion } from '@/app/data/assessmentFrameworks';

interface QuestionnaireScreenProps {
  toolName: string;
  taskName: string;
  article: string;
  onBack: () => void;
}

export function QuestionnaireScreen({
  toolName,
  taskName,
  article,
  onBack,
}: QuestionnaireScreenProps) {
  const framework = assessmentFrameworks[toolName];
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  if (!framework) {
    return <div>Framework not found for {toolName}</div>;
  }

  const currentSection = framework.sections[currentSectionIndex];
  const progress = ((currentSectionIndex + 1) / framework.sections.length) * 100;

  const handleCheckboxChange = (questionId: string, option: string, checked: boolean) => {
    const currentValues = answers[questionId] || [];
    if (checked) {
      setAnswers({ ...answers, [questionId]: [...currentValues, option] });
    } else {
      setAnswers({ ...answers, [questionId]: currentValues.filter((v: string) => v !== option) });
    }
  };

  const handleRadioChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleTextChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentSectionIndex < framework.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const renderQuestion = (question: AssessmentQuestion) => {
    if (question.type === 'checkbox' && question.options) {
      return (
        <div key={question.id} className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6 mb-6">
          <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">
            {question.question} {question.required && <span className="text-[#DC180A]">*</span>}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isChecked = (answers[question.id] || []).includes(option);

              return (
                <label 
                  key={idx}
                  className="flex items-start gap-3 p-4 border-2 border-[#E5E7EB] rounded-lg hover:bg-[#FAFBFC] cursor-pointer transition-colors"
                >
                  <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={(e) => handleCheckboxChange(question.id, option, e.target.checked)}
                    className="w-5 h-5 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] focus:ring-2 mt-0.5"
                  />
                  <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A]">
                    {option}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      );
    }

    if (question.type === 'radio' && question.options) {
      return (
        <div key={question.id} className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6 mb-6">
          <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">
            {question.question} {question.required && <span className="text-[#DC180A]">*</span>}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = answers[question.id] === option;

              return (
                <label 
                  key={idx}
                  className="flex items-start gap-3 p-4 border-2 border-[#E5E7EB] rounded-lg hover:bg-[#FAFBFC] cursor-pointer transition-colors"
                >
                  <input 
                    type="radio" 
                    name={question.id}
                    checked={isSelected}
                    onChange={() => handleRadioChange(question.id, option)}
                    className="w-5 h-5 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30] focus:ring-2 mt-0.5"
                  />
                  <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A]">
                    {option}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      );
    }

    if (question.type === 'text') {
      return (
        <div key={question.id} className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6 mb-6">
          <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">
            {question.question} {question.required && <span className="text-[#DC180A]">*</span>}
          </h3>

          <textarea
            value={answers[question.id] || ''}
            onChange={(e) => handleTextChange(question.id, e.target.value)}
            rows={4}
            className="w-full border-2 border-[#E5E7EB] rounded-lg p-4 font-['Montserrat',sans-serif] text-sm text-[#22262A] focus:border-[#F13D30] focus:ring-2 focus:ring-[#F13D30] focus:outline-none"
            placeholder="Enter your response..."
          />
        </div>
      );
    }

    if (question.type === 'select' && question.options) {
      return (
        <div key={question.id} className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6 mb-6">
          <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">
            {question.question} {question.required && <span className="text-[#DC180A]">*</span>}
          </h3>

          <select
            value={answers[question.id] || ''}
            onChange={(e) => handleRadioChange(question.id, e.target.value)}
            className="w-full border-2 border-[#E5E7EB] rounded-lg p-4 font-['Montserrat',sans-serif] text-sm text-[#22262A] focus:border-[#F13D30] focus:ring-2 focus:ring-[#F13D30] focus:outline-none"
          >
            <option value="">Select an option...</option>
            {question.options.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        </div>
      );
    }

    return null;
  };

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

        <div className="flex items-center justify-between">
          <div>
            <div className="mb-2">
              <span className="px-3 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full font-['Montserrat',sans-serif] text-xs font-medium text-[#464E58]">
                {taskName} · {article}
              </span>
            </div>

            <h1 className="font-['Montserrat',sans-serif] font-bold text-3xl text-[#22262A]">
              {framework.displayName}
            </h1>
            <p className="font-['Montserrat',sans-serif] font-normal text-base text-[#565F6C] mt-2">
              {framework.description}
            </p>
          </div>

          <button className="px-6 py-2.5 bg-[#ece9fe] border border-[#ddd6fe] text-[#5720B7] rounded-lg font-['Montserrat',sans-serif] font-bold text-sm hover:bg-[#ddd6fe] transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#565F6C]">
              Section {currentSectionIndex + 1} of {framework.sections.length}
            </span>
            <span className="font-['Montserrat',sans-serif] font-bold text-sm text-[#F13D30]">
              {progress.toFixed(0)}% Complete
            </span>
          </div>
          <div className="w-full h-2 bg-[#F0F1F2] rounded-full overflow-hidden">
            <div className="h-full bg-[#F13D30] rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1000px] mx-auto px-8 py-8">
          {/* Section Header */}
          <div className="mb-6">
            <h2 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-2">
              {currentSection.title}
            </h2>
            <p className="font-['Montserrat',sans-serif] font-normal text-base text-[#565F6C]">
              {currentSection.description}
            </p>
          </div>

          {/* Render all questions in current section */}
          {currentSection.questions.map(question => renderQuestion(question))}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentSectionIndex === 0}
              className="px-6 py-2.5 bg-[#ece9fe] border border-[#ddd6fe] text-[#5720B7] rounded-lg font-['Montserrat',sans-serif] font-bold text-sm hover:bg-[#ddd6fe] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={currentSectionIndex === framework.sections.length - 1}
              className="px-6 py-2.5 bg-[#5720B7] text-white rounded-lg font-['Montserrat',sans-serif] font-bold text-sm hover:bg-[#4c1d95] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentSectionIndex === framework.sections.length - 1 ? 'Complete' : 'Next Section'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
