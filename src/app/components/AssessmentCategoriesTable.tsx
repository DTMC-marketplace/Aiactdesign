import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AssessmentCategoriesTableProps {
  article: string;
}

interface CategoryData {
  id: string;
  paragraph: string;
  dataPoint: string;
  information: string;
  status: 'To Do' | 'In Progress' | 'Done' | 'Deprioritized';
  gapAnalysis: string;
}

interface Section {
  title: string;
  bgColor: string;
  data: CategoryData[];
}

// Mock data for assessment categories by article
const assessmentData: Record<string, Section[]> = {
  'Art. 10': [
    {
      title: 'Data Quality Assessment',
      bgColor: 'bg-[#daefee]',
      data: [
        {
          id: 'DQ-01',
          paragraph: '10.2.a',
          dataPoint: 'Data relevance verification',
          information: 'Verify that training data is relevant to the intended purpose and context of the AI system',
          status: 'Done',
          gapAnalysis: 'No gaps identified',
        },
        {
          id: 'DQ-02',
          paragraph: '10.2.b',
          dataPoint: 'Data representativeness check',
          information: 'Ensure training data represents all relevant demographic groups and use cases without bias',
          status: 'In Progress',
          gapAnalysis: 'Partial data representation',
        },
        {
          id: 'DQ-03',
          paragraph: '10.2.c',
          dataPoint: 'Error detection and correction',
          information: 'Identify and correct errors, outliers, and inconsistencies in training datasets',
          status: 'To Do',
          gapAnalysis: 'No data correction measures in place',
        },
      ],
    },
    {
      title: 'Bias Testing and Monitoring',
      bgColor: 'bg-[#f3eec5]',
      data: [
        {
          id: 'BT-01',
          paragraph: '10.3',
          dataPoint: 'Fairness metrics evaluation',
          information: 'Apply fairness assessment tools to measure potential discrimination across protected characteristics',
          status: 'In Progress',
          gapAnalysis: 'Partial fairness metrics evaluation',
        },
        {
          id: 'BT-02',
          paragraph: '10.3',
          dataPoint: 'Content moderation assessment',
          information: 'Test AI outputs for toxic, harmful, or discriminatory content generation',
          status: 'To Do',
          gapAnalysis: 'No content moderation assessment',
        },
      ],
    },
    {
      title: 'Data Governance Documentation',
      bgColor: 'bg-[#dbf6fe]',
      data: [
        {
          id: 'DG-01',
          paragraph: '10.5',
          dataPoint: 'Data lineage tracking',
          information: 'Document the origin, collection methods, and processing steps for all training data',
          status: 'Done',
          gapAnalysis: 'No gaps identified',
        },
        {
          id: 'DG-02',
          paragraph: '10.5',
          dataPoint: 'Data retention policies',
          information: 'Establish and document data retention, deletion, and archival procedures',
          status: 'Deprioritized',
          gapAnalysis: 'No data retention policies',
        },
      ],
    },
  ],
  'Art. 9': [
    {
      title: 'Risk Identification',
      bgColor: 'bg-[#FEEDEC]',
      data: [
        {
          id: 'RI-01',
          paragraph: '9.2.a',
          dataPoint: 'Risk assessment methodology',
          information: 'Define and document the risk assessment methodology for the AI system',
          status: 'Done',
          gapAnalysis: 'No gaps identified',
        },
        {
          id: 'RI-02',
          paragraph: '9.2.b',
          dataPoint: 'Known and foreseeable risks',
          information: 'Identify all known and reasonably foreseeable risks associated with the AI system',
          status: 'In Progress',
          gapAnalysis: 'Partial risk identification',
        },
      ],
    },
    {
      title: 'Risk Mitigation',
      bgColor: 'bg-[#FEF3C7]',
      data: [
        {
          id: 'RM-01',
          paragraph: '9.4',
          dataPoint: 'Risk mitigation measures',
          information: 'Implement and document measures to eliminate or reduce identified risks',
          status: 'To Do',
          gapAnalysis: 'No risk mitigation measures',
        },
      ],
    },
  ],
  'Art. 15': [
    {
      title: 'Accuracy Assessment',
      bgColor: 'bg-[#FEEDEC]',
      data: [
        {
          id: 'AC-01',
          paragraph: '15.1',
          dataPoint: 'Accuracy metrics definition',
          information: 'Define appropriate accuracy metrics for the AI system and its intended use',
          status: 'Done',
          gapAnalysis: 'No gaps identified',
        },
        {
          id: 'AC-02',
          paragraph: '15.1',
          dataPoint: 'Performance monitoring',
          information: 'Continuously monitor AI system accuracy and performance in production',
          status: 'In Progress',
          gapAnalysis: 'Partial performance monitoring',
        },
      ],
    },
    {
      title: 'Robustness Testing',
      bgColor: 'bg-[#FEF3C7]',
      data: [
        {
          id: 'RT-01',
          paragraph: '15.2',
          dataPoint: 'Adversarial testing',
          information: 'Test AI system resilience against adversarial inputs and edge cases',
          status: 'To Do',
          gapAnalysis: 'No adversarial testing',
        },
        {
          id: 'RT-02',
          paragraph: '15.2',
          dataPoint: 'Data drift detection',
          information: 'Monitor and detect data distribution shifts that may affect system performance',
          status: 'In Progress',
          gapAnalysis: 'Partial data drift detection',
        },
      ],
    },
    {
      title: 'Cybersecurity Measures',
      bgColor: 'bg-[#D1FAE5]',
      data: [
        {
          id: 'CS-01',
          paragraph: '15.3',
          dataPoint: 'Vulnerability assessment',
          information: 'Conduct regular vulnerability scans and penetration testing of AI infrastructure',
          status: 'Done',
          gapAnalysis: 'No gaps identified',
        },
        {
          id: 'CS-02',
          paragraph: '15.3',
          dataPoint: 'Security patch management',
          information: 'Maintain up-to-date security patches for all AI system components and dependencies',
          status: 'Done',
          gapAnalysis: 'No gaps identified',
        },
      ],
    },
  ],
};

// Default data for articles without specific sections
const defaultSections: Section[] = [
  {
    title: 'Compliance Requirements',
    bgColor: 'bg-[#FEEDEC]',
    data: [
      {
        id: 'CR-01',
        paragraph: 'General',
        dataPoint: 'Documentation preparation',
        information: 'Prepare comprehensive documentation for compliance assessment',
        status: 'In Progress',
        gapAnalysis: 'Partial documentation',
      },
    ],
  },
];

function StatusBadge({ status }: { status: CategoryData['status'] }) {
  const styles = {
    'To Do': 'bg-[#FEEDEC] text-[#DC180A]',
    'In Progress': 'bg-[#FFFAEB] text-[#D78C02]',
    'Done': 'bg-[#D1FAE5] text-[#065F46]',
    'Deprioritized': 'bg-[#F0F1F2] text-[#565F6C]',
  };

  const dotColors = {
    'To Do': 'fill-[#DC180A]',
    'In Progress': 'fill-[#D78C02]',
    'Done': 'fill-[#065F46]',
    'Deprioritized': 'fill-[#B5BCC4]',
  };

  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded ${styles[status]}`}>
      <svg className="w-1.5 h-1.5" viewBox="0 0 6 6">
        <circle cx="3" cy="3" r="3" className={dotColors[status]} />
      </svg>
      <span className="font-['Montserrat',sans-serif] font-medium text-xs">
        {status}
      </span>
    </div>
  );
}

export function AssessmentCategoriesTable({ article }: AssessmentCategoriesTableProps) {
  const sections = assessmentData[article] || defaultSections;
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="bg-white rounded-lg border border-[#f0f1f2] shadow-[2px_4px_8px_-2px_rgba(34,38,42,0.1),0px_2px_4px_-2px_rgba(34,38,42,0.06)] overflow-hidden">
      {/* Header */}
      <div className="bg-[#f46258] px-6 py-4 border-b border-[#f13d30]">
        <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-white">
          Assessment Categories Breakdown
        </h2>
        <p className="font-['Montserrat',sans-serif] font-normal text-sm text-white/90 mt-1">
          Track compliance requirements by category
        </p>
      </div>

      {/* Table Header */}
      <div className="bg-[#f46258] flex items-center border-b border-[#f0f1f2]">
        <div className="px-4 py-3 w-24 border-r border-white/20">
          <p className="font-['Montserrat',sans-serif] font-semibold text-base text-white">
            ID
          </p>
        </div>
        <div className="px-4 py-3 w-28 border-r border-white/20">
          <p className="font-['Montserrat',sans-serif] font-semibold text-base text-white">
            Paragraph
          </p>
        </div>
        <div className="px-4 py-3 flex-[2] border-r border-white/20">
          <p className="font-['Montserrat',sans-serif] font-semibold text-base text-white">
            Data Points
          </p>
        </div>
        <div className="px-4 py-3 flex-[2] border-r border-white/20">
          <p className="font-['Montserrat',sans-serif] font-semibold text-base text-white">
            Company's Information
          </p>
        </div>
        <div className="px-4 py-3 flex-[1.5] border-r border-white/20">
          <p className="font-['Montserrat',sans-serif] font-semibold text-base text-white">
            Gap Analysis
          </p>
        </div>
        <div className="px-4 py-3 w-36">
          <p className="font-['Montserrat',sans-serif] font-semibold text-base text-white">
            Status
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="divide-y divide-[#f0f1f2]">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {/* Section Header */}
            <button
              onClick={() => toggleSection(sectionIndex)}
              className={`w-full flex items-center justify-between px-4 py-3 ${section.bgColor} hover:opacity-90 transition-opacity border-b border-[#f0f1f2]`}
            >
              <p className="font-['Montserrat',sans-serif] font-semibold text-base text-[#22262a]">
                {section.title}
              </p>
              {expandedSections.has(sectionIndex) ? (
                <ChevronUp className="w-6 h-6 text-[#f46258]" />
              ) : (
                <ChevronDown className="w-6 h-6 text-[#565F6C]" />
              )}
            </button>

            {/* Section Content */}
            {expandedSections.has(sectionIndex) && (
              <div className="divide-y divide-[#f0f1f2]">
                {section.data.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center bg-white hover:bg-[#fef6f5] transition-colors"
                  >
                    <div className="px-4 py-4 w-24 border-r border-[#f0f1f2]">
                      <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262a]">
                        {item.id}
                      </p>
                    </div>
                    <div className="px-4 py-4 w-28 border-r border-[#f0f1f2]">
                      <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262a]">
                        {item.paragraph}
                      </p>
                    </div>
                    <div className="px-4 py-4 flex-[2] border-r border-[#f0f1f2]">
                      <p className="font-['Montserrat',sans-serif] font-medium text-sm text-[#f13d30]">
                        {item.dataPoint}
                      </p>
                    </div>
                    <div className="px-4 py-4 flex-[2] border-r border-[#f0f1f2]">
                      <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#565f6c]">
                        {item.information}
                      </p>
                    </div>
                    <div className="px-4 py-4 flex-[1.5] border-r border-[#f0f1f2]">
                      <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#565f6c]">
                        {item.gapAnalysis}
                      </p>
                    </div>
                    <div className="px-4 py-4 w-36">
                      <StatusBadge status={item.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}