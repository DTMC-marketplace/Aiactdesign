import { useState } from 'react';
import { ArrowLeft, Check, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FRIAQuestionnaireProps {
  onBack: () => void;
}

interface QuestionData {
  id: string;
  category: string;
  question: string;
  guidance: string;
  options: Array<{ value: string; label: string }>;
}

export function FRIAQuestionnaire({ onBack }: FRIAQuestionnaireProps) {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [expandedQuestions, setExpandedQuestions] = useState<{ [key: string]: boolean }>({});

  // FRIA questionnaire sections based on EU AI Act Article 27
  const sections = [
    {
      title: 'Section 1: System Identification',
      description: 'Basic information about the AI system and its deployment context',
      questions: [
        {
          id: 'q1_1',
          category: 'System Information',
          question: 'What is the name and version of the AI system?',
          guidance: 'Provide the official name and current version number of the AI system being assessed.',
          options: [
            { value: 'text', label: 'Free text response' }
          ]
        },
        {
          id: 'q1_2',
          category: 'System Information',
          question: 'What is the intended purpose of the AI system?',
          guidance: 'Describe the specific use case and objectives the system is designed to achieve.',
          options: [
            { value: 'text', label: 'Free text response' }
          ]
        },
        {
          id: 'q1_3',
          category: 'Deployment Context',
          question: 'In which sector(s) will the AI system be deployed?',
          guidance: 'Select all applicable sectors from Annex III of the EU AI Act.',
          options: [
            { value: 'biometric', label: 'Biometric identification and categorization' },
            { value: 'critical', label: 'Management and operation of critical infrastructure' },
            { value: 'education', label: 'Education and vocational training' },
            { value: 'employment', label: 'Employment, workers management and access to self-employment' },
            { value: 'services', label: 'Access to essential private/public services and benefits' },
            { value: 'law', label: 'Law enforcement' },
            { value: 'migration', label: 'Migration, asylum and border control management' },
            { value: 'justice', label: 'Administration of justice and democratic processes' }
          ]
        },
        {
          id: 'q1_4',
          category: 'Deployment Context',
          question: 'What is the geographical scope of deployment?',
          guidance: 'Specify the EU member states or regions where the system will be used.',
          options: [
            { value: 'single', label: 'Single EU member state' },
            { value: 'multiple', label: 'Multiple EU member states' },
            { value: 'eu_wide', label: 'EU-wide deployment' },
            { value: 'international', label: 'EU and international' }
          ]
        }
      ]
    },
    {
      title: 'Section 2: Fundamental Rights Mapping',
      description: 'Identify which fundamental rights may be affected by the AI system',
      questions: [
        {
          id: 'q2_1',
          category: 'Rights Assessment',
          question: 'Does the system process personal data that could affect the right to privacy (Article 7 CFR)?',
          guidance: 'Consider collection, storage, processing, and sharing of personal information.',
          options: [
            { value: 'yes_high', label: 'Yes - High impact (sensitive personal data)' },
            { value: 'yes_medium', label: 'Yes - Medium impact (regular personal data)' },
            { value: 'yes_low', label: 'Yes - Low impact (minimal personal data)' },
            { value: 'no', label: 'No personal data processing' }
          ]
        },
        {
          id: 'q2_2',
          category: 'Rights Assessment',
          question: 'Could the system affect the right to non-discrimination (Article 21 CFR)?',
          guidance: 'Assess potential for discriminatory outcomes based on protected characteristics.',
          options: [
            { value: 'yes_high', label: 'Yes - High risk of discrimination' },
            { value: 'yes_medium', label: 'Yes - Medium risk of discrimination' },
            { value: 'yes_low', label: 'Yes - Low risk of discrimination' },
            { value: 'no', label: 'No discrimination risk identified' }
          ]
        },
        {
          id: 'q2_3',
          category: 'Rights Assessment',
          question: 'Does the system make decisions affecting access to services, employment, or benefits?',
          guidance: 'Consider systems that grant, deny, or prioritize access to opportunities or resources.',
          options: [
            { value: 'yes_binding', label: 'Yes - Makes binding decisions' },
            { value: 'yes_recommendation', label: 'Yes - Provides recommendations for decisions' },
            { value: 'yes_support', label: 'Yes - Supports decision-making' },
            { value: 'no', label: 'No decision-making function' }
          ]
        },
        {
          id: 'q2_4',
          category: 'Rights Assessment',
          question: 'Could the system affect freedom of expression and information (Article 11 CFR)?',
          guidance: 'Consider content moderation, information filtering, or communication monitoring.',
          options: [
            { value: 'yes_high', label: 'Yes - Significant impact on expression' },
            { value: 'yes_medium', label: 'Yes - Moderate impact on expression' },
            { value: 'yes_low', label: 'Yes - Limited impact on expression' },
            { value: 'no', label: 'No impact on expression' }
          ]
        },
        {
          id: 'q2_5',
          category: 'Rights Assessment',
          question: 'Does the system involve processing of children\'s data or affect children\'s rights (Article 24 CFR)?',
          guidance: 'Assess any direct or indirect impact on children and their fundamental rights.',
          options: [
            { value: 'yes_primary', label: 'Yes - Children are primary users' },
            { value: 'yes_secondary', label: 'Yes - Children may be affected' },
            { value: 'no', label: 'No impact on children' }
          ]
        }
      ]
    },
    {
      title: 'Section 3: Impact Assessment',
      description: 'Evaluate the severity and likelihood of impacts on fundamental rights',
      questions: [
        {
          id: 'q3_1',
          category: 'Severity Assessment',
          question: 'What is the potential severity of negative impacts on fundamental rights?',
          guidance: 'Consider worst-case scenarios and the magnitude of potential harm.',
          options: [
            { value: 'critical', label: 'Critical - Severe, irreversible harm' },
            { value: 'high', label: 'High - Significant harm with lasting effects' },
            { value: 'medium', label: 'Medium - Moderate harm with reversible effects' },
            { value: 'low', label: 'Low - Minor, easily rectifiable harm' }
          ]
        },
        {
          id: 'q3_2',
          category: 'Likelihood Assessment',
          question: 'What is the likelihood of adverse impacts occurring?',
          guidance: 'Assess probability based on system design, safeguards, and deployment context.',
          options: [
            { value: 'very_high', label: 'Very High (>75% probability)' },
            { value: 'high', label: 'High (50-75% probability)' },
            { value: 'medium', label: 'Medium (25-50% probability)' },
            { value: 'low', label: 'Low (<25% probability)' }
          ]
        },
        {
          id: 'q3_3',
          category: 'Population Impact',
          question: 'How many individuals could be affected by the system?',
          guidance: 'Estimate the scale of deployment and number of people in scope.',
          options: [
            { value: 'very_large', label: 'Very Large (>1,000,000 people)' },
            { value: 'large', label: 'Large (100,000 - 1,000,000 people)' },
            { value: 'medium', label: 'Medium (10,000 - 100,000 people)' },
            { value: 'small', label: 'Small (<10,000 people)' }
          ]
        },
        {
          id: 'q3_4',
          category: 'Vulnerable Groups',
          question: 'Does the system affect vulnerable or marginalized groups?',
          guidance: 'Consider groups with protected characteristics or in vulnerable situations.',
          options: [
            { value: 'yes_primary', label: 'Yes - Primarily affects vulnerable groups' },
            { value: 'yes_disproportionate', label: 'Yes - Disproportionate impact on vulnerable groups' },
            { value: 'yes_equal', label: 'Yes - Affects vulnerable groups equally' },
            { value: 'no', label: 'No specific impact on vulnerable groups' }
          ]
        }
      ]
    },
    {
      title: 'Section 4: Mitigation Measures',
      description: 'Document measures to prevent, mitigate, or remedy negative impacts',
      questions: [
        {
          id: 'q4_1',
          category: 'Technical Safeguards',
          question: 'What technical measures are in place to protect fundamental rights?',
          guidance: 'Describe privacy-enhancing technologies, bias mitigation, security controls, etc.',
          options: [
            { value: 'text', label: 'Free text response' }
          ]
        },
        {
          id: 'q4_2',
          category: 'Organizational Measures',
          question: 'What organizational safeguards ensure respect for fundamental rights?',
          guidance: 'Include policies, training, governance structures, and oversight mechanisms.',
          options: [
            { value: 'text', label: 'Free text response' }
          ]
        },
        {
          id: 'q4_3',
          category: 'Human Oversight',
          question: 'What human oversight mechanisms are implemented?',
          guidance: 'Describe how humans can monitor, intervene, or override system decisions.',
          options: [
            { value: 'continuous', label: 'Continuous human supervision' },
            { value: 'intervention', label: 'Human-in-the-loop for critical decisions' },
            { value: 'review', label: 'Human review of outputs' },
            { value: 'override', label: 'Human override capability' },
            { value: 'multiple', label: 'Multiple oversight mechanisms' }
          ]
        },
        {
          id: 'q4_4',
          category: 'Transparency Measures',
          question: 'How is transparency ensured for affected individuals?',
          guidance: 'Describe information provided about system use, logic, and decision-making.',
          options: [
            { value: 'full', label: 'Full transparency and explainability' },
            { value: 'substantial', label: 'Substantial information provided' },
            { value: 'basic', label: 'Basic notification of AI use' },
            { value: 'limited', label: 'Limited transparency' }
          ]
        },
        {
          id: 'q4_5',
          category: 'Redress Mechanisms',
          question: 'What mechanisms exist for individuals to challenge decisions or seek redress?',
          guidance: 'Describe complaint procedures, appeals processes, and remediation options.',
          options: [
            { value: 'text', label: 'Free text response' }
          ]
        }
      ]
    },
    {
      title: 'Section 5: Monitoring and Review',
      description: 'Establish processes for ongoing monitoring and periodic review',
      questions: [
        {
          id: 'q5_1',
          category: 'Monitoring Plan',
          question: 'What ongoing monitoring processes are established?',
          guidance: 'Describe how impacts on fundamental rights will be tracked and measured.',
          options: [
            { value: 'text', label: 'Free text response' }
          ]
        },
        {
          id: 'q5_2',
          category: 'Review Frequency',
          question: 'How frequently will the FRIA be reviewed and updated?',
          guidance: 'Specify intervals for reassessment and triggers for ad-hoc reviews.',
          options: [
            { value: 'quarterly', label: 'Quarterly' },
            { value: 'biannually', label: 'Every 6 months' },
            { value: 'annually', label: 'Annually' },
            { value: 'biennial', label: 'Every 2 years' },
            { value: 'triggers', label: 'Based on triggers (specify in free text)' }
          ]
        },
        {
          id: 'q5_3',
          category: 'Stakeholder Consultation',
          question: 'Which stakeholders were consulted in this assessment?',
          guidance: 'List affected groups, experts, civil society, or other stakeholders involved.',
          options: [
            { value: 'text', label: 'Free text response' }
          ]
        },
        {
          id: 'q5_4',
          category: 'Documentation',
          question: 'How is this FRIA documented and made accessible?',
          guidance: 'Describe storage, version control, and accessibility for relevant parties.',
          options: [
            { value: 'public', label: 'Publicly accessible' },
            { value: 'stakeholders', label: 'Accessible to affected stakeholders' },
            { value: 'authorities', label: 'Accessible to competent authorities' },
            { value: 'internal', label: 'Internal documentation only' }
          ]
        }
      ]
    }
  ];

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const toggleQuestionExpanded = (questionId: string) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const getProgressPercentage = () => {
    const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
    const answeredQuestions = Object.keys(answers).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const getSectionProgress = (sectionIndex: number) => {
    const section = sections[sectionIndex];
    const answeredInSection = section.questions.filter(q => answers[q.id]).length;
    return `${answeredInSection}/${section.questions.length}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#464E58] hover:text-[#22262A] mb-4 font-['Montserrat',sans-serif] font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Compliance Requirements
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-2">
                Fundamental Rights Impact Assessment (FRIA)
              </h1>
              <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                Article 27 - Assessment of impact on fundamental rights
              </p>
            </div>
            <div className="text-right">
              <div className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                Progress: {getProgressPercentage()}%
              </div>
              <div className="w-48 h-2 bg-[#E5E7EB] rounded-full mt-2">
                <div
                  className="h-full bg-[#F13D30] rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
          <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">
            Assessment Sections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setCurrentSection(index)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  currentSection === index
                    ? 'border-[#F13D30] bg-[#FFF5F5]'
                    : 'border-[#E5E7EB] bg-white hover:border-[#B5BCC4]'
                }`}
              >
                <div className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#464E58] mb-1">
                  Section {index + 1}
                </div>
                <div className={`font-['Montserrat',sans-serif] font-semibold text-sm mb-2 ${
                  currentSection === index ? 'text-[#F13D30]' : 'text-[#22262A]'
                }`}>
                  {section.title.replace(`Section ${index + 1}: `, '')}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[#E5E7EB] rounded-full">
                    <div
                      className="h-full bg-[#F13D30] rounded-full transition-all"
                      style={{
                        width: `${(section.questions.filter(q => answers[q.id]).length / section.questions.length) * 100}%`
                      }}
                    />
                  </div>
                  <span className="font-['Montserrat',sans-serif] font-medium text-xs text-[#464E58]">
                    {getSectionProgress(index)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Section Questions */}
        <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
          <div className="mb-6">
            <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A] mb-2">
              {sections[currentSection].title}
            </h2>
            <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
              {sections[currentSection].description}
            </p>
          </div>

          <div className="space-y-6">
            {sections[currentSection].questions.map((question, qIndex) => (
              <div
                key={question.id}
                className="border border-[#E5E7EB] rounded-lg p-5 hover:border-[#B5BCC4] transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-['Montserrat',sans-serif] font-bold text-sm ${
                    answers[question.id]
                      ? 'bg-[#10B981] text-white'
                      : 'bg-[#E5E7EB] text-[#464E58]'
                  }`}>
                    {answers[question.id] ? <Check className="w-5 h-5" /> : qIndex + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#F13D30] mb-1">
                          {question.category}
                        </div>
                        <h3 className="font-['Montserrat',sans-serif] font-semibold text-base text-[#22262A] mb-2">
                          {question.question}
                        </h3>
                      </div>
                      <button
                        onClick={() => toggleQuestionExpanded(question.id)}
                        className="flex-shrink-0 ml-4 text-[#464E58] hover:text-[#22262A] transition-colors"
                      >
                        {expandedQuestions[question.id] ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {expandedQuestions[question.id] && (
                      <div className="mb-4 p-3 bg-[#F0F7FF] border-l-4 border-[#1976D2] rounded">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-[#1976D2] flex-shrink-0 mt-0.5" />
                          <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">
                            {question.guidance}
                          </p>
                        </div>
                      </div>
                    )}

                    {question.options[0].value === 'text' ? (
                      <textarea
                        value={answers[question.id] || ''}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        placeholder="Enter your response..."
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:ring-2 focus:ring-[#F13D30] focus:border-transparent resize-none"
                        rows={4}
                      />
                    ) : (
                      <div className="space-y-2">
                        {question.options.map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                              answers[question.id] === option.value
                                ? 'border-[#F13D30] bg-[#FFF5F5]'
                                : 'border-[#E5E7EB] hover:border-[#B5BCC4]'
                            }`}
                          >
                            <input
                              type="radio"
                              name={question.id}
                              value={option.value}
                              checked={answers[question.id] === option.value}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                              className="mt-0.5 w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                            />
                            <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pb-8">
          <button
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className={`px-6 py-2.5 border rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm transition-colors ${
              currentSection === 0
                ? 'border-[#E5E7EB] text-[#B5BCC4] cursor-not-allowed'
                : 'border-[#B5BCC4] text-[#464E58] hover:bg-[#F0F1F2]'
            }`}
          >
            Previous Section
          </button>

          <div className="font-['Montserrat',sans-serif] font-medium text-sm text-[#464E58]">
            Section {currentSection + 1} of {sections.length}
          </div>

          {currentSection < sections.length - 1 ? (
            <button
              onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
              className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
            >
              Next Section
            </button>
          ) : (
            <button
              className="px-6 py-2.5 bg-[#10B981] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#059669] transition-colors"
            >
              Complete Assessment
            </button>
          )}
        </div>
    </div>
  );
}
