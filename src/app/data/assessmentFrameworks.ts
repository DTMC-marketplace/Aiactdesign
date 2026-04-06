// Assessment frameworks data extracted from GitHub repository
// Source: https://github.com/DTMC-marketplace/geminihackathon/tree/main/AI%20Act%20skills%20packages

import { securityAssessmentFrameworks } from './assessmentFrameworks_security';
import { fairnessAssessmentFrameworks } from './assessmentFrameworks_fairness';
import { toxicityAssessmentFrameworks } from './assessmentFrameworks_toxicity';
import { governanceAssessmentFrameworks } from './assessmentFrameworks_governance';
import { privacyAssessmentFrameworks } from './assessmentFrameworks_privacy';
import { trustAssessmentFrameworks } from './assessmentFrameworks_trust';
import { explainabilityAssessmentFrameworks } from './assessmentFrameworks_explainability';
import { performanceAssessmentFrameworks } from './assessmentFrameworks_performance';
import { additionalAssessmentFrameworks } from './assessmentFrameworks_additional';

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'checkbox' | 'radio' | 'text' | 'select';
  options?: string[];
  required: boolean;
  aiDetectedValue?: any;
  aiConfidence?: 'high' | 'medium' | 'low';
}

export interface AssessmentFramework {
  toolName: string;
  displayName: string;
  description: string;
  article: string;
  category: string;
  sections: AssessmentSection[];
}

export const assessmentFrameworks: Record<string, AssessmentFramework> = {
  'risk-assessment': {
    toolName: 'risk-assessment',
    displayName: 'Risk Assessment and Management',
    description: 'Systematic identification, analysis, and management of risks in AI systems.',
    article: 'Art. 9',
    category: 'Risk',
    sections: [
      {
        id: 'risk-identification',
        title: 'Risk Identification',
        description: 'Identify potential risks associated with the AI system',
        questions: [
          {
            id: 'risk-categories',
            question: 'What risk categories have been identified for your AI system?',
            type: 'checkbox',
            required: true,
            options: [
              'Health and safety risks',
              'Fundamental rights risks',
              'Privacy and data protection risks',
              'Security and cybersecurity risks',
              'Discrimination and bias risks',
              'Environmental risks',
              'Societal risks',
            ],
            aiDetectedValue: ['Health and safety risks', 'Fundamental rights risks', 'Privacy and data protection risks', 'Security and cybersecurity risks', 'Discrimination and bias risks'],
            aiConfidence: 'high',
          },
          {
            id: 'foreseeable-risks',
            question: 'What known and foreseeable risks have been identified?',
            type: 'text',
            required: true,
          },
          {
            id: 'risk-severity',
            question: 'What is the overall risk severity level?',
            type: 'radio',
            required: true,
            options: ['Critical', 'High', 'Medium', 'Low'],
            aiDetectedValue: 'High',
            aiConfidence: 'high',
          },
        ],
      },
      {
        id: 'risk-analysis',
        title: 'Risk Analysis',
        description: 'Analyze and evaluate identified risks',
        questions: [
          {
            id: 'likelihood-assessment',
            question: 'What is the likelihood of each identified risk occurring?',
            type: 'text',
            required: true,
          },
          {
            id: 'impact-assessment',
            question: 'What is the potential impact of each identified risk?',
            type: 'text',
            required: true,
          },
          {
            id: 'affected-stakeholders',
            question: 'Who are the affected stakeholders for each risk?',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        id: 'risk-mitigation',
        title: 'Risk Mitigation',
        description: 'Define mitigation strategies for identified risks',
        questions: [
          {
            id: 'mitigation-measures',
            question: 'What technical mitigation measures have been implemented?',
            type: 'checkbox',
            required: true,
            options: [
              'Input validation and sanitization',
              'Output filtering and monitoring',
              'Access controls and authentication',
              'Data encryption',
              'Audit logging',
              'Error handling and graceful degradation',
            ],
          },
          {
            id: 'organizational-measures',
            question: 'What organizational mitigation measures have been implemented?',
            type: 'checkbox',
            required: true,
            options: [
              'Staff training programs',
              'Review and approval processes',
              'Incident response procedures',
              'Regular risk assessments',
              'Third-party audits',
            ],
          },
          {
            id: 'residual-risks',
            question: 'What residual risks remain after mitigation?',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        id: 'testing-validation',
        title: 'Testing and Validation',
        description: 'Testing approaches for risk assessment',
        questions: [
          {
            id: 'testing-methods',
            question: 'What testing methods have been used to validate risk mitigation?',
            type: 'checkbox',
            required: true,
            options: [
              'Testing against defined metrics',
              'Testing with representative data',
              'Testing for foreseeable misuse',
              'Independent third-party testing',
              'Red team exercises',
              'Penetration testing',
            ],
          },
          {
            id: 'validation-results',
            question: 'What were the key findings from validation testing?',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        id: 'documentation',
        title: 'Documentation and Monitoring',
        description: 'Ongoing documentation and monitoring requirements',
        questions: [
          {
            id: 'documentation-maintained',
            question: 'Is risk management documentation maintained and up-to-date?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'In Progress'],
          },
          {
            id: 'monitoring-process',
            question: 'How are emerging risks monitored and evaluated?',
            type: 'text',
            required: true,
          },
          {
            id: 'review-frequency',
            question: 'How frequently is the risk assessment reviewed?',
            type: 'select',
            required: true,
            options: ['Monthly', 'Quarterly', 'Semi-annually', 'Annually', 'Ad-hoc'],
          },
        ],
      },
    ],
  },
  
  'ai-safety': {
    toolName: 'ai-safety',
    displayName: 'AI Safety Planning',
    description: 'Comprehensive safety analysis and risk mitigation strategies for AI systems.',
    article: 'Art. 9',
    category: 'Risk',
    sections: [
      {
        id: 'safety-classification',
        title: 'Safety Risk Classification',
        description: 'Classify the AI system according to safety risk levels',
        questions: [
          {
            id: 'eu-ai-act-classification',
            question: 'What is the EU AI Act risk classification for this system?',
            type: 'radio',
            required: true,
            options: ['Unacceptable (Prohibited)', 'High-Risk', 'Limited Risk', 'Minimal Risk'],
            aiDetectedValue: 'High-Risk',
            aiConfidence: 'high',
          },
          {
            id: 'high-risk-category',
            question: 'If high-risk, which Annex III category applies?',
            type: 'select',
            required: false,
            options: [
              'Biometric identification',
              'Critical infrastructure',
              'Education and vocational training',
              'Employment, workers management',
              'Essential private and public services',
              'Law enforcement',
              'Migration, asylum and border control',
              'Administration of justice and democratic processes',
            ],
            aiDetectedValue: 'Employment, workers management',
            aiConfidence: 'medium',
          },
        ],
      },
      {
        id: 'guardrails',
        title: 'Guardrails Implementation',
        description: 'Define and implement safety guardrails',
        questions: [
          {
            id: 'input-guards',
            question: 'What input guardrails have been implemented?',
            type: 'checkbox',
            required: true,
            options: [
              'Content filtering',
              'Prompt injection detection',
              'Input validation',
              'Rate limiting',
              'Authentication and authorization',
            ],
            aiDetectedValue: ['Content filtering', 'Input validation', 'Rate limiting'],
            aiConfidence: 'medium',
          },
          {
            id: 'output-filters',
            question: 'What output filters have been implemented?',
            type: 'checkbox',
            required: true,
            options: [
              'Toxicity filtering',
              'PII detection and redaction',
              'Harmful content detection',
              'Bias detection',
              'Topic restrictions',
            ],
          },
          {
            id: 'behavioral-constraints',
            question: 'What behavioral constraints have been enforced?',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        id: 'red-teaming',
        title: 'Red Teaming and Adversarial Testing',
        description: 'Testing system resilience against attacks',
        questions: [
          {
            id: 'red-team-conducted',
            question: 'Has red team testing been conducted?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Scheduled'],
          },
          {
            id: 'attack-categories-tested',
            question: 'What attack categories have been tested?',
            type: 'checkbox',
            required: true,
            options: [
              'Prompt injection',
              'Jailbreak attempts',
              'Harmful content generation',
              'Privacy attacks (PII extraction)',
              'Bias exploitation',
              'Denial of service',
            ],
          },
          {
            id: 'vulnerabilities-found',
            question: 'What vulnerabilities were discovered during red teaming?',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        id: 'safety-metrics',
        title: 'Safety Metrics and Monitoring',
        description: 'Define safety metrics and monitoring approaches',
        questions: [
          {
            id: 'refusal-rate',
            question: 'What is the current refusal rate for harmful requests?',
            type: 'text',
            required: true,
          },
          {
            id: 'false-positive-rate',
            question: 'What is the false positive rate (benign requests refused)?',
            type: 'text',
            required: true,
          },
          {
            id: 'monitoring-frequency',
            question: 'How frequently are safety metrics monitored?',
            type: 'select',
            required: true,
            options: ['Real-time', 'Hourly', 'Daily', 'Weekly'],
          },
        ],
      },
      {
        id: 'incident-response',
        title: 'Incident Response',
        description: 'Safety incident response procedures',
        questions: [
          {
            id: 'incident-response-plan',
            question: 'Is there a documented incident response plan?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'In Development'],
          },
          {
            id: 'response-time-targets',
            question: 'What are the response time targets by severity?',
            type: 'text',
            required: true,
          },
          {
            id: 'escalation-procedures',
            question: 'What are the escalation procedures for safety incidents?',
            type: 'text',
            required: true,
          },
        ],
      },
    ],
  },

  'incident-responder': {
    toolName: 'incident-responder',
    displayName: 'Incident Response Framework',
    description: 'Framework for responding to and managing AI system incidents.',
    article: 'Art. 9',
    category: 'Risk',
    sections: [
      {
        id: 'incident-detection',
        title: 'Incident Detection',
        description: 'Mechanisms for detecting AI system incidents',
        questions: [
          {
            id: 'detection-mechanisms',
            question: 'What mechanisms are in place to detect incidents?',
            type: 'checkbox',
            required: true,
            options: [
              'Automated monitoring alerts',
              'User reports',
              'System logs analysis',
              'Performance anomaly detection',
              'Security scanning',
              'External notifications',
            ],
          },
          {
            id: 'alert-thresholds',
            question: 'What thresholds trigger incident alerts?',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        id: 'incident-classification',
        title: 'Incident Classification',
        description: 'Classification and severity assessment',
        questions: [
          {
            id: 'severity-levels',
            question: 'What severity levels are used for incident classification?',
            type: 'checkbox',
            required: true,
            options: ['Critical', 'High', 'Medium', 'Low'],
            aiDetectedValue: ['Critical', 'High', 'Medium', 'Low'],
            aiConfidence: 'high',
          },
          {
            id: 'incident-categories',
            question: 'What incident categories have been defined?',
            type: 'checkbox',
            required: true,
            options: [
              'Safety incidents',
              'Security breaches',
              'Privacy violations',
              'Bias/discrimination events',
              'Performance degradation',
              'Regulatory non-compliance',
            ],
          },
        ],
      },
      {
        id: 'response-procedures',
        title: 'Response Procedures',
        description: 'Incident response procedures and workflows',
        questions: [
          {
            id: 'immediate-actions',
            question: 'What immediate actions are taken upon incident detection?',
            type: 'text',
            required: true,
          },
          {
            id: 'containment-measures',
            question: 'What containment measures can be deployed?',
            type: 'checkbox',
            required: true,
            options: [
              'System shutdown',
              'Feature disablement',
              'Traffic throttling',
              'Rollback to previous version',
              'Manual override activation',
            ],
          },
          {
            id: 'communication-plan',
            question: 'What is the communication plan for incidents?',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        id: 'post-incident',
        title: 'Post-Incident Review',
        description: 'Analysis and learning from incidents',
        questions: [
          {
            id: 'root-cause-analysis',
            question: 'Is root cause analysis conducted for all incidents?',
            type: 'radio',
            required: true,
            options: ['Yes, for all', 'Only for major incidents', 'No'],
          },
          {
            id: 'lessons-learned',
            question: 'How are lessons learned documented and shared?',
            type: 'text',
            required: true,
          },
          {
            id: 'preventive-actions',
            question: 'What preventive actions have been implemented based on past incidents?',
            type: 'text',
            required: true,
          },
        ],
      },
    ],
  },

  'data-classification': {
    toolName: 'data-classification',
    displayName: 'Data Classification and Governance',
    description: 'Classification and categorization of data used in AI systems.',
    article: 'Art. 10',
    category: 'Data',
    sections: [
      {
        id: 'data-inventory',
        title: 'Data Inventory',
        description: 'Comprehensive inventory of data used',
        questions: [
          {
            id: 'data-sources',
            question: 'What are the primary data sources for training?',
            type: 'text',
            required: true,
          },
          {
            id: 'data-types',
            question: 'What types of data are used in the AI system?',
            type: 'checkbox',
            required: true,
            options: [
              'Personal data (PII)',
              'Sensitive personal data',
              'Biometric data',
              'Financial data',
              'Health data',
              'Publicly available data',
              'Synthetic data',
            ],
          },
        ],
      },
      {
        id: 'data-quality',
        title: 'Data Quality Management',
        description: 'Ensuring data quality and representativeness',
        questions: [
          {
            id: 'quality-checks',
            question: 'What data quality checks are performed?',
            type: 'checkbox',
            required: true,
            options: [
              'Completeness verification',
              'Accuracy validation',
              'Consistency checks',
              'Timeliness assessment',
              'Duplicate detection',
              'Outlier identification',
            ],
          },
          {
            id: 'data-representativeness',
            question: 'How is data representativeness ensured?',
            type: 'text',
            required: true,
          },
          {
            id: 'bias-examination',
            question: 'Has bias examination been conducted on the training data?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'In Progress'],
          },
        ],
      },
      {
        id: 'data-governance',
        title: 'Data Governance',
        description: 'Data governance policies and procedures',
        questions: [
          {
            id: 'data-lineage',
            question: 'Is data lineage documented and tracked?',
            type: 'radio',
            required: true,
            options: ['Yes', 'Partially', 'No'],
          },
          {
            id: 'data-retention',
            question: 'What is the data retention policy?',
            type: 'text',
            required: true,
          },
          {
            id: 'access-controls',
            question: 'What data access controls are in place?',
            type: 'checkbox',
            required: true,
            options: [
              'Role-based access control (RBAC)',
              'Attribute-based access control (ABAC)',
              'Multi-factor authentication',
              'Encryption at rest',
              'Encryption in transit',
              'Audit logging',
            ],
          },
        ],
      },
    ],
  },

  'fria-assessment': {
    toolName: 'fria-assessment',
    displayName: 'Fundamental Rights Impact Assessment (FRIA)',
    description: 'Conducts comprehensive assessment of AI system impact on fundamental rights including privacy, non-discrimination, and human dignity per Article 27.',
    article: 'Art. 27',
    category: 'Rights',
    sections: [
      {
        id: 'rights-identification',
        title: 'Fundamental Rights Identification',
        description: 'Identify which fundamental rights may be impacted by your AI system',
        questions: [
          {
            id: 'affected-rights',
            question: 'Which fundamental rights may be affected by your AI system?',
            type: 'checkbox',
            required: true,
            options: [
              'Right to privacy and data protection (Article 8 CFR)',
              'Right to non-discrimination (Article 21 CFR)',
              'Right to human dignity (Article 1 CFR)',
              'Freedom of expression and information (Article 11 CFR)',
              'Right to fair trial and defense (Article 47-48 CFR)',
              'Rights of the child (Article 24 CFR)',
              'Consumer protection',
              'Right to liberty and security (Article 6 CFR)',
              'Freedom of assembly and association (Articles 12-13 CFR)',
              'Workers\' rights (Articles 27-32 CFR)',
            ],
            aiDetectedValue: [
              'Right to privacy and data protection (Article 8 CFR)',
              'Right to non-discrimination (Article 21 CFR)',
              'Right to human dignity (Article 1 CFR)',
            ],
            aiConfidence: 'high',
          },
          {
            id: 'impact-severity',
            question: 'What is the overall severity of potential impact on fundamental rights?',
            type: 'radio',
            required: true,
            options: ['Critical', 'Significant', 'Moderate', 'Minor'],
            aiDetectedValue: 'Significant',
            aiConfidence: 'medium',
          },
        ],
      },
      {
        id: 'privacy-assessment',
        title: 'Privacy and Data Protection Impact',
        description: 'Assess impact on privacy and data protection rights',
        questions: [
          {
            id: 'personal-data-types',
            question: 'What types of personal data does the AI system process?',
            type: 'checkbox',
            required: true,
            options: [
              'Basic identification data (name, address, ID number)',
              'Contact information',
              'Financial data',
              'Health data',
              'Biometric data',
              'Location data',
              'Behavioral data',
              'Special category data (race, religion, political opinions)',
            ],
          },
          {
            id: 'data-processing-purpose',
            question: 'What is the purpose of processing personal data?',
            type: 'text',
            required: true,
          },
          {
            id: 'data-minimization',
            question: 'Have data minimization principles been applied?',
            type: 'radio',
            required: true,
            options: ['Yes, fully implemented', 'Partially implemented', 'No', 'Under review'],
          },
          {
            id: 'privacy-safeguards',
            question: 'What privacy safeguards have been implemented?',
            type: 'checkbox',
            required: true,
            options: [
              'Data anonymization',
              'Pseudonymization',
              'Encryption',
              'Access controls',
              'Data retention limits',
              'User consent mechanisms',
              'Right to deletion',
              'Data portability',
            ],
          },
        ],
      },
      {
        id: 'discrimination-assessment',
        title: 'Non-Discrimination Impact',
        description: 'Assess potential for discrimination and bias',
        questions: [
          {
            id: 'protected-characteristics',
            question: 'Which protected characteristics could be affected by the AI system?',
            type: 'checkbox',
            required: true,
            options: [
              'Race or ethnic origin',
              'Gender',
              'Age',
              'Disability',
              'Religion or belief',
              'Sexual orientation',
              'Socioeconomic status',
              'Nationality',
            ],
          },
          {
            id: 'discrimination-risk',
            question: 'What is the risk level of discriminatory outcomes?',
            type: 'radio',
            required: true,
            options: ['High', 'Medium', 'Low', 'Negligible'],
          },
          {
            id: 'bias-testing',
            question: 'Has bias testing been conducted across protected groups?',
            type: 'radio',
            required: true,
            options: ['Yes, comprehensively', 'Yes, partially', 'No', 'Planned'],
          },
          {
            id: 'fairness-measures',
            question: 'What fairness measures have been implemented?',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        id: 'human-dignity',
        title: 'Human Dignity and Autonomy',
        description: 'Assess impact on human dignity and autonomy',
        questions: [
          {
            id: 'autonomy-impact',
            question: 'How does the AI system impact human autonomy and decision-making?',
            type: 'text',
            required: true,
          },
          {
            id: 'manipulation-risk',
            question: 'Is there a risk of manipulation or undue influence?',
            type: 'radio',
            required: true,
            options: ['High risk', 'Medium risk', 'Low risk', 'No risk'],
          },
          {
            id: 'human-oversight',
            question: 'What level of human oversight is maintained?',
            type: 'radio',
            required: true,
            options: [
              'Human-in-the-loop (continuous oversight)',
              'Human-on-the-loop (monitoring with intervention)',
              'Human-in-command (high-level oversight)',
              'Automated with post-hoc review',
            ],
          },
        ],
      },
      {
        id: 'transparency-accountability',
        title: 'Transparency and Accountability',
        description: 'Assess transparency and accountability measures',
        questions: [
          {
            id: 'user-information',
            question: 'Are users informed about AI system operation and decision-making?',
            type: 'radio',
            required: true,
            options: ['Yes, comprehensively', 'Yes, partially', 'No', 'In development'],
          },
          {
            id: 'explainability',
            question: 'What explainability mechanisms are provided?',
            type: 'checkbox',
            required: true,
            options: [
              'Decision explanations',
              'Feature importance disclosure',
              'Model documentation',
              'Appeal process',
              'Human review option',
            ],
          },
          {
            id: 'redress-mechanisms',
            question: 'What redress mechanisms are available to affected individuals?',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        id: 'vulnerable-groups',
        title: 'Impact on Vulnerable Groups',
        description: 'Assess specific impact on vulnerable populations',
        questions: [
          {
            id: 'vulnerable-populations',
            question: 'Which vulnerable groups may be affected?',
            type: 'checkbox',
            required: true,
            options: [
              'Children and minors',
              'Elderly persons',
              'Persons with disabilities',
              'Minorities',
              'Low-income populations',
              'Refugees and migrants',
              'Victims of violence or abuse',
            ],
          },
          {
            id: 'special-protections',
            question: 'What special protections have been implemented for vulnerable groups?',
            type: 'text',
            required: true,
          },
          {
            id: 'accessibility',
            question: 'Are accessibility features provided?',
            type: 'radio',
            required: true,
            options: ['Yes, fully', 'Yes, partially', 'No', 'Not applicable'],
          },
        ],
      },
      {
        id: 'stakeholder-engagement',
        title: 'Stakeholder Engagement',
        description: 'Document stakeholder consultation and feedback',
        questions: [
          {
            id: 'stakeholders-consulted',
            question: 'Which stakeholders have been consulted in the assessment?',
            type: 'checkbox',
            required: true,
            options: [
              'End users',
              'Affected communities',
              'Civil society organizations',
              'Data protection authorities',
              'Equality bodies',
              'Domain experts',
              'Legal experts',
              'Ethics committees',
            ],
          },
          {
            id: 'feedback-incorporation',
            question: 'How has stakeholder feedback been incorporated?',
            type: 'text',
            required: true,
          },
          {
            id: 'ongoing-consultation',
            question: 'Is there a process for ongoing stakeholder consultation?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Planned'],
          },
        ],
      },
      {
        id: 'mitigation-monitoring',
        title: 'Mitigation and Monitoring',
        description: 'Define mitigation strategies and monitoring plans',
        questions: [
          {
            id: 'mitigation-measures',
            question: 'What mitigation measures have been implemented to protect fundamental rights?',
            type: 'text',
            required: true,
          },
          {
            id: 'monitoring-frequency',
            question: 'How frequently is fundamental rights impact monitored?',
            type: 'select',
            required: true,
            options: ['Continuous', 'Monthly', 'Quarterly', 'Semi-annually', 'Annually'],
          },
          {
            id: 'review-triggers',
            question: 'What triggers a review of the FRIA?',
            type: 'checkbox',
            required: true,
            options: [
              'System updates or changes',
              'New use cases',
              'Regulatory changes',
              'Incident reports',
              'Stakeholder complaints',
              'Scheduled periodic review',
            ],
          },
          {
            id: 'residual-risks',
            question: 'What residual fundamental rights risks remain after mitigation?',
            type: 'text',
            required: true,
          },
        ],
      },
    ],
  },

  'bias-assessment': {
    toolName: 'bias-assessment',
    displayName: 'Bias Assessment',
    description: 'Systematic evaluation framework for identifying and quantifying algorithmic bias in AI systems.',
    article: 'Art. 10',
    category: 'Fairness',
    sections: [
      {
        id: 'bias-identification',
        title: 'Bias Identification',
        description: 'Identify potential sources and types of bias',
        questions: [
          {
            id: 'bias-sources',
            question: 'Which potential bias sources have you identified?',
            type: 'checkbox',
            required: true,
            options: [
              'Historical bias in training data',
              'Representation bias (underrepresented groups)',
              'Measurement bias (proxy variables)',
              'Aggregation bias (one-size-fits-all)',
              'Evaluation bias (inappropriate metrics)',
              'Deployment bias (different context)',
              'Label bias (biased annotations)',
            ],
            aiDetectedValue: [
              'Historical bias in training data',
              'Representation bias (underrepresented groups)',
              'Measurement bias (proxy variables)',
            ],
            aiConfidence: 'high',
          },
          {
            id: 'bias-severity',
            question: 'What is the overall severity of identified bias?',
            type: 'radio',
            required: true,
            options: ['Critical', 'High', 'Medium', 'Low'],
            aiDetectedValue: 'High',
            aiConfidence: 'medium',
          },
          {
            id: 'affected-groups',
            question: 'Which demographic groups are potentially affected by bias?',
            type: 'checkbox',
            required: true,
            options: [
              'Racial or ethnic minorities',
              'Women',
              'Age groups (young/elderly)',
              'People with disabilities',
              'LGBTQ+ individuals',
              'Religious minorities',
              'Low-income populations',
              'Geographic regions',
            ],
          },
        ],
      },
      {
        id: 'bias-quantification',
        title: 'Bias Quantification and Measurement',
        description: 'Measure and quantify bias using metrics',
        questions: [
          {
            id: 'fairness-metrics',
            question: 'Which fairness metrics have been used to quantify bias?',
            type: 'checkbox',
            required: true,
            options: [
              'Demographic parity (statistical parity)',
              'Equal opportunity (true positive rate equality)',
              'Equalized odds (TPR and FPR equality)',
              'Predictive parity (precision equality)',
              'Calibration (probability calibration)',
              'Individual fairness',
              'Counterfactual fairness',
            ],
          },
          {
            id: 'performance-disparity',
            question: 'What is the maximum performance disparity across groups?',
            type: 'text',
            required: true,
          },
          {
            id: 'intersectional-analysis',
            question: 'Has intersectional bias analysis been conducted?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Planned'],
          },
          {
            id: 'bias-metrics-results',
            question: 'What are the key findings from bias metric measurements?',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        id: 'bias-mitigation',
        title: 'Bias Mitigation Strategies',
        description: 'Define and implement bias mitigation approaches',
        questions: [
          {
            id: 'pre-processing-techniques',
            question: 'Which pre-processing techniques have been applied?',
            type: 'checkbox',
            required: true,
            options: [
              'Data resampling (oversampling/undersampling)',
              'Data augmentation for underrepresented groups',
              'Reweighing training examples',
              'Feature selection and engineering',
              'Removing protected attributes',
              'Synthetic data generation',
            ],
          },
          {
            id: 'in-processing-techniques',
            question: 'Which in-processing (algorithmic) techniques have been applied?',
            type: 'checkbox',
            required: true,
            options: [
              'Adversarial debiasing',
              'Fairness constraints in optimization',
              'Regularization for fairness',
              'Fair representation learning',
              'Prejudice remover',
            ],
          },
          {
            id: 'post-processing-techniques',
            question: 'Which post-processing techniques have been applied?',
            type: 'checkbox',
            required: true,
            options: [
              'Threshold optimization per group',
              'Calibrated equalized odds',
              'Reject option classification',
              'Score adjustment',
            ],
          },
          {
            id: 'mitigation-effectiveness',
            question: 'What is the effectiveness of bias mitigation measures?',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        id: 'monitoring-governance',
        title: 'Bias Monitoring and Governance',
        description: 'Ongoing monitoring and governance of bias',
        questions: [
          {
            id: 'monitoring-frequency',
            question: 'How frequently is bias monitored in production?',
            type: 'select',
            required: true,
            options: ['Real-time', 'Daily', 'Weekly', 'Monthly', 'Quarterly'],
          },
          {
            id: 'bias-alerts',
            question: 'Are automated alerts configured for bias detection?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'In development'],
          },
          {
            id: 'remediation-process',
            question: 'What is the process for addressing detected bias?',
            type: 'text',
            required: true,
          },
          {
            id: 'stakeholder-review',
            question: 'Is there a stakeholder review process for bias assessment?',
            type: 'radio',
            required: true,
            options: ['Yes, regularly', 'Yes, occasionally', 'No', 'Planned'],
          },
          {
            id: 'documentation-transparency',
            question: 'How is bias assessment documented and communicated?',
            type: 'text',
            required: true,
          },
        ],
      },
    ],
  },

  'hitl-design': {
    toolName: 'hitl-design',
    displayName: 'Human-in-the-Loop (HITL) Design',
    description: 'Framework for designing and implementing human-in-the-loop systems ensuring meaningful human oversight of AI decisions. Defines human intervention points, decision thresholds, and interface design for effective human control.',
    article: 'Art. 14',
    category: 'Human Oversight',
    sections: [
      {
        id: 'oversight-requirements',
        title: 'Human Oversight Requirements',
        description: 'Define human oversight requirements for your AI system',
        questions: [
          {
            id: 'risk-level',
            question: 'What is the risk level of your AI system?',
            type: 'radio',
            required: true,
            options: [
              'High-risk - Requires mandatory human oversight per Article 14',
              'Medium-risk - Human oversight recommended',
              'Low-risk - Minimal oversight needed',
              'Not yet assessed'
            ],
          },
          {
            id: 'oversight-objectives',
            question: 'What are your human oversight objectives?',
            type: 'checkbox',
            required: true,
            options: [
              'Prevent or minimize health and safety risks',
              'Protect fundamental rights',
              'Ensure decision accuracy and reliability',
              'Detect and mitigate bias',
              'Handle edge cases and exceptions',
              'Maintain accountability',
              'Provide recourse for affected individuals'
            ],
          },
          {
            id: 'decision-impact',
            question: 'What is the potential impact of AI decisions on individuals?',
            type: 'radio',
            required: true,
            options: [
              'Critical - Life, health, or fundamental rights impact',
              'High - Significant legal or financial impact',
              'Moderate - Limited personal impact',
              'Low - Minimal impact'
            ],
          },
        ],
      },
      {
        id: 'intervention-points',
        title: 'Human Intervention Points',
        description: 'Define when and how humans can intervene',
        questions: [
          {
            id: 'intervention-triggers',
            question: 'What triggers human intervention?',
            type: 'checkbox',
            required: true,
            options: [
              'Low confidence scores below threshold',
              'High-stakes decisions above risk threshold',
              'Anomalous or unusual inputs',
              'Conflicting model outputs',
              'User request for human review',
              'Decisions affecting protected groups',
              'Novel situations outside training data',
              'Regulatory flagged scenarios'
            ],
          },
          {
            id: 'intervention-timing',
            question: 'When can humans intervene?',
            type: 'checkbox',
            required: true,
            options: [
              'Before decision execution (pre-decision review)',
              'During decision process (real-time intervention)',
              'After decision execution (post-decision review)',
              'On user appeal or request',
              'During periodic audits'
            ],
          },
          {
            id: 'confidence-threshold',
            question: 'What confidence threshold triggers human review?',
            type: 'radio',
            required: true,
            options: [
              'Below 95% confidence',
              'Below 90% confidence',
              'Below 80% confidence',
              'Below 70% confidence',
              'Custom threshold per decision type',
              'Not using confidence-based triggers'
            ],
          },
          {
            id: 'escalation-process',
            question: 'Is there a clear escalation process for human intervention?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'In development'],
          },
        ],
      },
      {
        id: 'human-capabilities',
        title: 'Human Capabilities and Authority',
        description: 'Ensure humans have necessary capabilities and authority',
        questions: [
          {
            id: 'override-authority',
            question: 'Can human operators override AI decisions?',
            type: 'radio',
            required: true,
            options: [
              'Yes - Full override authority',
              'Yes - Partial override with limitations',
              'Yes - Override with supervisor approval',
              'No - Cannot override',
              'Not yet defined'
            ],
          },
          {
            id: 'override-documentation',
            question: 'Are override decisions documented and tracked?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Partially'],
          },
          {
            id: 'human-actions',
            question: 'What actions can human reviewers take?',
            type: 'checkbox',
            required: true,
            options: [
              'Approve AI recommendation',
              'Reject AI recommendation',
              'Modify AI recommendation',
              'Request additional information',
              'Escalate to senior reviewer',
              'Pause system operation',
              'Flag for system improvement',
              'Provide alternative decision'
            ],
          },
          {
            id: 'decision-timeframe',
            question: 'What is the timeframe for human review?',
            type: 'radio',
            required: true,
            options: [
              'Real-time (immediate review required)',
              'Near real-time (within minutes)',
              'Same day',
              'Within 24-48 hours',
              'Batch review (weekly/monthly)',
              'Varies by decision type'
            ],
          },
        ],
      },
      {
        id: 'interface-design',
        title: 'Human Oversight Interface Design',
        description: 'Design effective interfaces for human oversight',
        questions: [
          {
            id: 'information-provided',
            question: 'What information is provided to human reviewers?',
            type: 'checkbox',
            required: true,
            options: [
              'AI recommendation and confidence score',
              'Reasoning/explanation for AI decision',
              'Input data and features used',
              'Similar historical cases',
              'Relevant rules/policies',
              'Risk factors identified',
              'Alternative options considered',
              'Potential impacts of decision'
            ],
          },
          {
            id: 'interface-features',
            question: 'What features does the oversight interface include?',
            type: 'checkbox',
            required: true,
            options: [
              'Clear presentation of AI recommendation',
              'Explainability visualizations',
              'Override/approve/reject controls',
              'Comment/annotation capability',
              'Decision history and audit trail',
              'Alert/notification system',
              'Performance metrics dashboard',
              'Feedback submission mechanism'
            ],
          },
          {
            id: 'cognitive-load',
            question: 'Have you assessed and minimized cognitive load on reviewers?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'In progress'],
          },
          {
            id: 'usability-testing',
            question: 'Have you conducted usability testing with human reviewers?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Planned'],
          },
        ],
      },
      {
        id: 'training-competence',
        title: 'Training and Competence',
        description: 'Ensure human reviewers are properly trained',
        questions: [
          {
            id: 'training-topics',
            question: 'What training do human reviewers receive?',
            type: 'checkbox',
            required: true,
            options: [
              'AI system capabilities and limitations',
              'Common AI errors and failure modes',
              'Bias recognition and mitigation',
              'Oversight interface usage',
              'Decision-making procedures',
              'Escalation protocols',
              'Legal and regulatory requirements',
              'Ethical considerations',
              'Domain-specific knowledge'
            ],
          },
          {
            id: 'competence-assessment',
            question: 'How is reviewer competence assessed?',
            type: 'checkbox',
            required: true,
            options: [
              'Initial certification/qualification',
              'Periodic competence testing',
              'Performance monitoring and feedback',
              'Inter-rater reliability checks',
              'Ongoing training requirements',
              'Not yet implemented'
            ],
          },
          {
            id: 'expertise-level',
            question: 'What level of expertise is required for reviewers?',
            type: 'radio',
            required: true,
            options: [
              'Domain experts with AI knowledge',
              'AI specialists with domain knowledge',
              'General reviewers with training',
              'Varies by decision type',
              'Not yet defined'
            ],
          },
        ],
      },
      {
        id: 'automation-bias',
        title: 'Automation Bias Mitigation',
        description: 'Prevent over-reliance on AI recommendations',
        questions: [
          {
            id: 'bias-awareness',
            question: 'Are reviewers trained on automation bias?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Partially'],
          },
          {
            id: 'mitigation-strategies',
            question: 'Which automation bias mitigation strategies are used?',
            type: 'checkbox',
            required: true,
            options: [
              'Presenting uncertainty/confidence levels',
              'Showing alternative options',
              'Requiring justification for approval',
              'Random decision audits',
              'Hiding AI recommendation initially',
              'Presenting contradictory information',
              'Peer review for critical decisions',
              'None yet implemented'
            ],
          },
          {
            id: 'independent-judgment',
            question: 'Do reviewers exercise independent judgment?',
            type: 'radio',
            required: true,
            options: [
              'Yes - Strong evidence of independent analysis',
              'Mostly - Some independent thinking',
              'Limited - Heavy reliance on AI',
              'Not assessed'
            ],
          },
        ],
      },
      {
        id: 'monitoring-improvement',
        title: 'Monitoring and Continuous Improvement',
        description: 'Monitor oversight effectiveness and improve',
        questions: [
          {
            id: 'effectiveness-metrics',
            question: 'Which oversight effectiveness metrics do you track?',
            type: 'checkbox',
            required: true,
            options: [
              'Override rate',
              'Override accuracy (vs AI)',
              'Review time per decision',
              'Inter-rater agreement',
              'User satisfaction with oversight',
              'Error detection rate',
              'False positive/negative rates',
              'Audit findings',
              'None yet'
            ],
          },
          {
            id: 'feedback-loop',
            question: 'Is human feedback used to improve the AI system?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Partially'],
          },
          {
            id: 'oversight-documentation',
            question: 'Is human oversight activity documented per Article 12?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'In progress'],
          },
          {
            id: 'periodic-review',
            question: 'How often is the oversight process reviewed and updated?',
            type: 'radio',
            required: true,
            options: [
              'Quarterly',
              'Semi-annually',
              'Annually',
              'After significant incidents',
              'No regular review schedule'
            ],
          },
        ],
      },
    ],
  },

  'prompt-injection-detector': {
    toolName: 'prompt-injection-detector',
    displayName: 'Prompt Injection Detection Assessment',
    description: 'Detects and prevents prompt injection attacks in AI systems.',
    article: 'Art. 15',
    category: 'Security',
    sections: [
      {
        id: 'attack-surface',
        title: 'Attack Surface Analysis',
        description: 'Identify potential attack vectors in your AI system',
        questions: [
          {
            id: 'user-inputs',
            question: 'Does your system accept free-form text input from users?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'high',
          },
          {
            id: 'input-sources',
            question: 'What are the sources of user input?',
            type: 'checkbox',
            required: true,
            options: [
              'Direct text input',
              'File uploads (documents, text files)',
              'Email content',
              'API calls',
              'Third-party integrations',
              'Web scraping/external content'
            ],
            aiDetectedValue: ['Direct text input', 'API calls', 'Third-party integrations'],
            aiConfidence: 'high',
          },
          {
            id: 'privileged-actions',
            question: 'Can the AI system perform privileged actions or access sensitive data?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'medium',
          },
          {
            id: 'system-prompts',
            question: 'Are system prompts separated from user inputs?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Partially'],
          },
        ],
      },
      {
        id: 'detection-mechanisms',
        title: 'Detection Mechanisms',
        description: 'Assess current and planned injection detection capabilities',
        questions: [
          {
            id: 'current-protections',
            question: 'What prompt injection protections are currently implemented?',
            type: 'checkbox',
            required: true,
            options: [
              'Input sanitization',
              'Pattern-based detection',
              'ML-based classification',
              'Keyword blocklists',
              'Context isolation',
              'None currently implemented'
            ],
            aiDetectedValue: ['Input sanitization', 'Pattern-based detection', 'Context isolation'],
            aiConfidence: 'medium',
          },
          {
            id: 'detection-patterns',
            question: 'Which attack patterns does your system detect?',
            type: 'checkbox',
            required: true,
            options: [
              'Ignore previous instructions',
              'System prompt extraction attempts',
              'Role-playing attacks',
              'Encoding tricks (Base64, Unicode)',
              'Multi-turn manipulation',
              'Indirect injection via documents'
            ],
            aiDetectedValue: ['Ignore previous instructions', 'System prompt extraction attempts'],
            aiConfidence: 'medium',
          },
          {
            id: 'false-positive-handling',
            question: 'How are false positives (legitimate inputs flagged as attacks) handled?',
            type: 'text',
            required: true,
          },
          {
            id: 'detection-accuracy',
            question: 'What is the estimated accuracy rate of injection detection?',
            type: 'radio',
            required: true,
            options: [
              'Above 95%',
              '85-95%',
              '75-85%',
              'Below 75%',
              'Not measured'
            ],
          },
        ],
      },
      {
        id: 'response-strategy',
        title: 'Response Strategy',
        description: 'Define how the system responds to detected attacks',
        questions: [
          {
            id: 'blocking-behavior',
            question: 'What happens when an injection attempt is detected?',
            type: 'checkbox',
            required: true,
            options: [
              'Request is blocked immediately',
              'Warning message to user',
              'Request is logged for review',
              'Silent blocking with generic response',
              'Progressive restriction (after multiple attempts)',
              'Account suspension/flagging'
            ],
            aiDetectedValue: ['Request is blocked immediately', 'Request is logged for review'],
            aiConfidence: 'high',
          },
          {
            id: 'logging-monitoring',
            question: 'Are injection attempts logged and monitored?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Partially'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'high',
          },
          {
            id: 'incident-response',
            question: 'Is there an incident response plan for successful injection attacks?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'In Development'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'medium',
          },
          {
            id: 'alert-mechanism',
            question: 'What alert mechanisms are in place for suspected attacks?',
            type: 'checkbox',
            required: true,
            options: [
              'Real-time notifications to security team',
              'Dashboard alerts',
              'Email notifications',
              'Automated ticket creation',
              'No alerts configured'
            ],
          },
        ],
      },
    ],
  },

  // Merge security assessment frameworks
  ...securityAssessmentFrameworks,
  
  // Merge fairness assessment frameworks
  ...fairnessAssessmentFrameworks,
  
  // Merge toxicity/content moderation assessment frameworks
  ...toxicityAssessmentFrameworks,

  // Merge governance assessment frameworks
  ...governanceAssessmentFrameworks,

  // Merge privacy assessment frameworks
  ...privacyAssessmentFrameworks,

  // Merge trust & explainability assessment frameworks
  ...trustAssessmentFrameworks,

  // Merge explainability assessment frameworks (Article 13)
  ...explainabilityAssessmentFrameworks,

  // Merge performance & testing assessment frameworks (Article 15)
  ...performanceAssessmentFrameworks,

  // Merge additional assessment frameworks (Ethics, Alignment, Governance)
  ...additionalAssessmentFrameworks,
};