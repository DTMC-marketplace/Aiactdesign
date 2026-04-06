// Skill Assessment Questions based on GitHub AI Act Skills Packages
// https://github.com/DTMC-marketplace/geminihackathon/tree/main/AI%20Act%20skills%20packages

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'yes-no' | 'text' | 'radio' | 'checkbox';
  options?: string[];
  required: boolean;
  helpText?: string;
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
}

export interface SkillAssessment {
  skillId: string;
  name: string;
  category: string;
  description: string;
  article?: string;
  sections: AssessmentSection[];
}

export const skillAssessments: { [key: string]: SkillAssessment } = {
  'data-classification': {
    skillId: 'data-classification',
    name: 'Data Classification Assessment',
    category: 'Privacy',
    description: 'Automatically classifies and labels sensitive data including personal data, special categories of data, and confidential information.',
    article: 'Article 10',
    sections: [
      {
        id: 'data-inventory',
        title: 'Data Inventory',
        description: 'Identify all types of data processed by your AI system',
        questions: [
          {
            id: 'personal-data',
            question: 'Does your AI system process personal data?',
            type: 'yes-no',
            required: true,
            helpText: 'Personal data means any information relating to an identified or identifiable natural person (Article 4(1) GDPR)'
          },
          {
            id: 'data-types',
            question: 'What types of data does your system process?',
            type: 'checkbox',
            options: [
              'Personal identification data (name, email, phone)',
              'Financial information',
              'Health data',
              'Biometric data',
              'Location data',
              'Behavioral data',
              'Demographic data',
              'Other sensitive data'
            ],
            required: true
          },
          {
            id: 'special-categories',
            question: 'Does your system process special categories of personal data?',
            type: 'yes-no',
            required: true,
            helpText: 'Special categories include racial/ethnic origin, political opinions, religious beliefs, trade union membership, genetic data, biometric data, health data, sex life or sexual orientation (Article 9 GDPR)'
          }
        ]
      },
      {
        id: 'data-governance',
        title: 'Data Governance',
        description: 'Assess data quality, protection, and management practices',
        questions: [
          {
            id: 'data-sources',
            question: 'Describe the sources of data used for training and operation',
            type: 'text',
            required: true
          },
          {
            id: 'data-quality',
            question: 'What data quality measures are in place?',
            type: 'checkbox',
            options: [
              'Data validation and verification processes',
              'Regular data quality audits',
              'Error detection and correction',
              'Data completeness checks',
              'Data accuracy verification'
            ],
            required: true
          },
          {
            id: 'data-retention',
            question: 'Is there a defined data retention and deletion policy?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 10 requires appropriate data governance and management protocols'
          },
          {
            id: 'data-access',
            question: 'What access controls are implemented for data protection?',
            type: 'checkbox',
            options: [
              'Role-based access control (RBAC)',
              'Multi-factor authentication',
              'Data encryption at rest',
              'Data encryption in transit',
              'Access logging and monitoring',
              'Regular access reviews'
            ],
            required: true
          }
        ]
      },
      {
        id: 'classification-scheme',
        title: 'Classification Scheme',
        description: 'Define how data is classified and labeled',
        questions: [
          {
            id: 'classification-levels',
            question: 'What classification levels are used?',
            type: 'checkbox',
            options: [
              'Public',
              'Internal',
              'Confidential',
              'Restricted/Highly Confidential',
              'Personal Data',
              'Special Category Personal Data'
            ],
            required: true
          },
          {
            id: 'automated-classification',
            question: 'Is data classification automated?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'labeling-system',
            question: 'Describe your data labeling and tagging system',
            type: 'text',
            required: true
          }
        ]
      }
    ]
  },

  // Fundamental Rights Impact Assessment
  'fria-assessment': {
    skillId: 'fria-assessment',
    name: 'Fundamental Rights Impact Assessment (FRIA)',
    category: 'Fundamental Rights',
    description: 'Conducts comprehensive assessment of AI system impact on fundamental rights including privacy, non-discrimination, and human dignity per Article 27.',
    article: 'Article 27',
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
            options: [
              'Right to privacy and data protection (Article 8 CFR)',
              'Right to non-discrimination (Article 21 CFR)',
              'Right to human dignity (Article 1 CFR)',
              'Freedom of expression and information (Article 11 CFR)',
              'Right to fair trial and defense (Article 47-48 CFR)',
              'Rights of the child (Article 24 CFR)',
              'Consumer protection',
              'Workers\' rights',
              'Right to an effective remedy (Article 47 CFR)'
            ],
            required: true
          },
          {
            id: 'vulnerable-groups',
            question: 'Does the system affect vulnerable groups?',
            type: 'checkbox',
            options: [
              'Children',
              'Elderly',
              'Persons with disabilities',
              'Minorities',
              'Refugees',
              'None identified'
            ],
            required: true
          },
          {
            id: 'rights-severity',
            question: 'What is the potential severity of impact on fundamental rights?',
            type: 'radio',
            options: [
              'Critical - Severe and irreversible harm',
              'High - Significant harm with lasting effects',
              'Medium - Moderate impact with mitigation possible',
              'Low - Minimal or negligible impact',
              'Not yet assessed'
            ],
            required: true
          }
        ]
      },
      {
        id: 'privacy-impact',
        title: 'Privacy and Data Protection Impact',
        description: 'Assess impact on privacy and data protection rights',
        questions: [
          {
            id: 'personal-data-processing',
            question: 'What types of personal data does the system process?',
            type: 'checkbox',
            options: [
              'Basic personal data (name, address, etc.)',
              'Special categories (race, health, biometric, etc.)',
              'Behavioural data',
              'Location data',
              'Financial data',
              'Children\'s data',
              'None'
            ],
            required: true
          },
          {
            id: 'data-subject-consent',
            question: 'Have data subjects provided informed consent or is there another lawful basis?',
            type: 'yes-no',
            required: true,
            helpText: 'GDPR requires a lawful basis for processing personal data'
          },
          {
            id: 'privacy-by-design',
            question: 'Are privacy-by-design principles implemented?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'dpia-conducted',
            question: 'Has a Data Protection Impact Assessment (DPIA) been conducted?',
            type: 'yes-no',
            required: true,
            helpText: 'GDPR Article 35 requires DPIA for high-risk processing'
          }
        ]
      },
      {
        id: 'discrimination-impact',
        title: 'Non-Discrimination and Fairness Impact',
        description: 'Assess risks of discrimination and unfair treatment',
        questions: [
          {
            id: 'protected-characteristics',
            question: 'Does the system make decisions based on or affecting protected characteristics?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'discrimination-risk',
            question: 'What is the risk of discriminatory outcomes?',
            type: 'radio',
            options: [
              'High - System directly uses protected attributes',
              'Medium - Proxy variables may lead to discrimination',
              'Low - Measures in place to prevent discrimination',
              'Negligible - No discrimination risk identified',
              'Not yet assessed'
            ],
            required: true
          },
          {
            id: 'bias-testing',
            question: 'Has the system been tested for bias across different demographic groups?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'fairness-metrics',
            question: 'Are fairness metrics monitored during operation?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 10 requires monitoring for bias'
          }
        ]
      },
      {
        id: 'transparency-impact',
        title: 'Transparency and Explainability',
        description: 'Assess transparency and users\' understanding of the system',
        questions: [
          {
            id: 'user-awareness',
            question: 'Are users aware they are interacting with an AI system?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 52 requires disclosure of AI use'
          },
          {
            id: 'decision-explanation',
            question: 'Can the system provide explanations for its decisions?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'information-provided',
            question: 'What information is provided to affected individuals?',
            type: 'checkbox',
            options: [
              'Purpose of the AI system',
              'Type of decisions made',
              'Logic involved',
              'Significance and consequences',
              'How to contest decisions',
              'Contact information for queries',
              'Limited or no information provided'
            ],
            required: true
          }
        ]
      },
      {
        id: 'human-oversight',
        title: 'Human Agency and Oversight',
        description: 'Assess human control and intervention capabilities',
        questions: [
          {
            id: 'human-oversight-level',
            question: 'What level of human oversight is implemented?',
            type: 'radio',
            options: [
              'Human-in-the-loop (decision requires human approval)',
              'Human-on-the-loop (human can intervene)',
              'Human-in-command (human can override)',
              'Fully automated with no human oversight',
              'Not yet determined'
            ],
            required: true
          },
          {
            id: 'override-mechanism',
            question: 'Can humans override or reverse AI decisions?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 14 requires human oversight measures'
          },
          {
            id: 'contestability',
            question: 'Is there a mechanism for individuals to contest decisions?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'mitigation-measures',
        title: 'Mitigation and Safeguards',
        description: 'Define measures to protect fundamental rights',
        questions: [
          {
            id: 'mitigation-strategies',
            question: 'What measures are in place to mitigate fundamental rights impacts?',
            type: 'checkbox',
            options: [
              'Technical safeguards (bias mitigation, privacy preservation)',
              'Procedural safeguards (human review, appeals process)',
              'Transparency measures',
              'Training and awareness programs',
              'Regular audits and assessments',
              'Incident response procedures',
              'User rights implementation'
            ],
            required: true
          },
          {
            id: 'residual-risks',
            question: 'After mitigation, are there residual risks to fundamental rights?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'residual-acceptability',
            question: 'If residual risks exist, have they been assessed as acceptable?',
            type: 'text',
            required: true,
            helpText: 'Explain the justification for accepting residual risks'
          }
        ]
      },
      {
        id: 'stakeholder-consultation',
        title: 'Stakeholder Consultation',
        description: 'Assess stakeholder involvement in the FRIA process',
        questions: [
          {
            id: 'consulted-parties',
            question: 'Which stakeholders were consulted during the FRIA?',
            type: 'checkbox',
            options: [
              'Affected individuals or their representatives',
              'Civil society organizations',
              'Legal experts',
              'Data protection authorities',
              'Ethics experts',
              'Domain experts',
              'Workers\' representatives (if applicable)',
              'No external consultation conducted'
            ],
            required: true
          },
          {
            id: 'feedback-incorporated',
            question: 'Has stakeholder feedback been incorporated into the system design?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'ongoing-engagement',
            question: 'Is there a process for ongoing stakeholder engagement post-deployment?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'fria-review',
        title: 'FRIA Review and Updates',
        description: 'Define FRIA review and update processes',
        questions: [
          {
            id: 'review-frequency',
            question: 'How often will the FRIA be reviewed and updated?',
            type: 'radio',
            options: [
              'Continuously monitored',
              'Annually',
              'When significant changes occur',
              'Before major system updates',
              'No regular review planned'
            ],
            required: true
          },
          {
            id: 'triggers-for-review',
            question: 'What triggers a FRIA review?',
            type: 'checkbox',
            options: [
              'Change in system functionality',
              'New use cases',
              'Identified incidents or complaints',
              'Changes in legal requirements',
              'Technological updates',
              'Feedback from stakeholders'
            ],
            required: true
          },
          {
            id: 'documentation-maintained',
            question: 'Is FRIA documentation maintained and accessible to auditors?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 11 requires maintenance of technical documentation'
          }
        ]
      }
    ]
  },

  'gdpr-compliance': {
    skillId: 'gdpr-compliance',
    name: 'GDPR Compliance Assessment',
    category: 'Privacy',
    description: 'Comprehensive toolkit for ensuring General Data Protection Regulation compliance in AI systems.',
    article: 'Article 10',
    sections: [
      {
        id: 'lawful-basis',
        title: 'Lawful Basis for Processing',
        description: 'Identify the lawful basis for processing personal data',
        questions: [
          {
            id: 'processing-basis',
            question: 'What is the lawful basis for processing personal data?',
            type: 'checkbox',
            options: [
              'Consent (Article 6(1)(a))',
              'Contract performance (Article 6(1)(b))',
              'Legal obligation (Article 6(1)(c))',
              'Vital interests (Article 6(1)(d))',
              'Public interest (Article 6(1)(e))',
              'Legitimate interests (Article 6(1)(f))'
            ],
            required: true
          },
          {
            id: 'consent-mechanism',
            question: 'If using consent, is it freely given, specific, informed, and unambiguous?',
            type: 'yes-no',
            required: true,
            helpText: 'GDPR requires consent to meet strict criteria per Article 7'
          },
          {
            id: 'withdrawal-mechanism',
            question: 'Can data subjects easily withdraw consent?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'data-subject-rights',
        title: 'Data Subject Rights',
        description: 'Assess implementation of data subject rights',
        questions: [
          {
            id: 'rights-implemented',
            question: 'Which data subject rights are implemented?',
            type: 'checkbox',
            options: [
              'Right of access (Article 15)',
              'Right to rectification (Article 16)',
              'Right to erasure (Article 17)',
              'Right to restrict processing (Article 18)',
              'Right to data portability (Article 20)',
              'Right to object (Article 21)',
              'Rights related to automated decision-making (Article 22)'
            ],
            required: true
          },
          {
            id: 'response-timeframe',
            question: 'Can you respond to data subject requests within 1 month?',
            type: 'yes-no',
            required: true,
            helpText: 'GDPR requires responses within one month per Article 12(3)'
          },
          {
            id: 'verification-process',
            question: 'Is there a process to verify data subject identity?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'privacy-by-design',
        title: 'Privacy by Design and Default',
        description: 'Evaluate privacy-by-design implementation',
        questions: [
          {
            id: 'data-minimization',
            question: 'Is data minimization applied (only necessary data collected)?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 5(1)(c) requires data minimization'
          },
          {
            id: 'pseudonymization',
            question: 'Are pseudonymization or anonymization techniques used?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'default-settings',
            question: 'Are privacy-protective settings enabled by default?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 25(2) requires privacy by default'
          }
        ]
      },
      {
        id: 'dpia',
        title: 'Data Protection Impact Assessment',
        description: 'Assess DPIA requirements and completion',
        questions: [
          {
            id: 'dpia-required',
            question: 'Does your processing require a DPIA?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 35 requires DPIA for high-risk processing'
          },
          {
            id: 'dpia-completed',
            question: 'Has a DPIA been completed?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'dpia-review',
            question: 'How often is the DPIA reviewed and updated?',
            type: 'radio',
            options: [
              'Continuously',
              'Annually',
              'When major changes occur',
              'Not regularly reviewed',
              'DPIA not applicable'
            ],
            required: true
          }
        ]
      }
    ]
  },

  'hipaa-compliance': {
    skillId: 'hipaa-compliance',
    name: 'HIPAA Compliance Assessment',
    category: 'Privacy',
    description: 'Ensures Health Insurance Portability and Accountability Act compliance for AI systems processing protected health information.',
    article: 'HIPAA Privacy and Security Rules',
    sections: [
      {
        id: 'phi-handling',
        title: 'Protected Health Information (PHI) Handling',
        description: 'Assess how PHI is collected, stored, and processed',
        questions: [
          {
            id: 'phi-types',
            question: 'What types of PHI does your system process?',
            type: 'checkbox',
            options: [
              'Patient demographics',
              'Medical records',
              'Lab results',
              'Diagnostic images',
              'Treatment plans',
              'Billing information',
              'Insurance details'
            ],
            required: true
          },
          {
            id: 'minimum-necessary',
            question: 'Is the minimum necessary standard applied to PHI access?',
            type: 'yes-no',
            required: true,
            helpText: 'HIPAA requires limiting PHI to minimum necessary for purpose'
          },
          {
            id: 'ephi-encryption',
            question: 'Is electronic PHI (ePHI) encrypted at rest and in transit?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'administrative-safeguards',
        title: 'Administrative Safeguards',
        description: 'Evaluate administrative security measures',
        questions: [
          {
            id: 'security-officer',
            question: 'Is there a designated HIPAA Security Officer?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'workforce-training',
            question: 'Do all workforce members receive HIPAA training?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'training-frequency',
            question: 'How often is HIPAA training conducted?',
            type: 'radio',
            options: [
              'Upon hire and annually',
              'Annually',
              'Every 2 years',
              'Only upon hire',
              'No regular training'
            ],
            required: true
          },
          {
            id: 'sanctions-policy',
            question: 'Is there a sanctions policy for HIPAA violations?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'technical-safeguards',
        title: 'Technical Safeguards',
        description: 'Assess technical security controls',
        questions: [
          {
            id: 'access-controls',
            question: 'What access control mechanisms are in place?',
            type: 'checkbox',
            options: [
              'Unique user identification',
              'Emergency access procedures',
              'Automatic logoff',
              'Encryption and decryption',
              'Role-based access control'
            ],
            required: true
          },
          {
            id: 'audit-controls',
            question: 'Are audit logs maintained for ePHI access?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'integrity-controls',
            question: 'Are mechanisms in place to ensure ePHI integrity?',
            type: 'yes-no',
            required: true,
            helpText: 'Must ensure ePHI is not improperly altered or destroyed'
          }
        ]
      },
      {
        id: 'business-associates',
        title: 'Business Associate Agreements',
        description: 'Evaluate third-party vendor compliance',
        questions: [
          {
            id: 'third-party-vendors',
            question: 'Do you share PHI with third-party vendors?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'baa-in-place',
            question: 'Are Business Associate Agreements (BAAs) in place with all vendors?',
            type: 'yes-no',
            required: true,
            helpText: 'HIPAA requires BAAs with all business associates'
          },
          {
            id: 'vendor-compliance',
            question: 'How do you verify vendor HIPAA compliance?',
            type: 'text',
            required: true
          }
        ]
      }
    ]
  },

  'pci-dss-compliance': {
    skillId: 'pci-dss-compliance',
    name: 'PCI DSS Compliance Assessment',
    category: 'Privacy',
    description: 'Validates Payment Card Industry Data Security Standard compliance for AI systems handling payment card data.',
    article: 'PCI DSS v4.0',
    sections: [
      {
        id: 'cardholder-data',
        title: 'Cardholder Data Environment',
        description: 'Identify and protect cardholder data',
        questions: [
          {
            id: 'data-types',
            question: 'What cardholder data does your system process?',
            type: 'checkbox',
            options: [
              'Primary Account Number (PAN)',
              'Cardholder name',
              'Expiration date',
              'Service code',
              'Sensitive authentication data (SADs)',
              'CVV/CVC codes',
              'PIN data'
            ],
            required: true
          },
          {
            id: 'data-storage',
            question: 'Is cardholder data stored?',
            type: 'yes-no',
            required: true,
            helpText: 'PCI DSS has strict requirements for stored cardholder data'
          },
          {
            id: 'sad-storage',
            question: 'Is sensitive authentication data (SADs) stored after authorization?',
            type: 'yes-no',
            required: true,
            helpText: 'PCI DSS prohibits storing SADs after authorization (Requirement 3.2)'
          }
        ]
      },
      {
        id: 'network-security',
        title: 'Network Security Controls',
        description: 'Assess network security measures',
        questions: [
          {
            id: 'firewall-configuration',
            question: 'Are firewalls configured to protect cardholder data?',
            type: 'yes-no',
            required: true,
            helpText: 'Requirement 1: Install and maintain network security controls'
          },
          {
            id: 'network-segmentation',
            question: 'Is the cardholder data environment segmented from other networks?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'wireless-security',
            question: 'If using wireless, are strong encryption and security protocols in place?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'encryption',
        title: 'Encryption and Protection',
        description: 'Evaluate data protection mechanisms',
        questions: [
          {
            id: 'encryption-at-rest',
            question: 'Is stored cardholder data encrypted?',
            type: 'yes-no',
            required: true,
            helpText: 'Requirement 3: Protect stored account data'
          },
          {
            id: 'encryption-in-transit',
            question: 'Is cardholder data encrypted during transmission over public networks?',
            type: 'yes-no',
            required: true,
            helpText: 'Requirement 4: Protect cardholder data with strong cryptography during transmission'
          },
          {
            id: 'key-management',
            question: 'Is there a cryptographic key management process?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'access-monitoring',
        title: 'Access Control and Monitoring',
        description: 'Assess access controls and monitoring',
        questions: [
          {
            id: 'unique-ids',
            question: 'Does each user have a unique ID for accessing cardholder data?',
            type: 'yes-no',
            required: true,
            helpText: 'Requirement 8: Identify users and authenticate access'
          },
          {
            id: 'mfa-required',
            question: 'Is multi-factor authentication required for access to cardholder data?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'logging-monitoring',
            question: 'Are access logs maintained and reviewed?',
            type: 'yes-no',
            required: true,
            helpText: 'Requirement 10: Log and monitor all access to system components and cardholder data'
          },
          {
            id: 'vulnerability-scans',
            question: 'Are quarterly vulnerability scans performed?',
            type: 'yes-no',
            required: true,
            helpText: 'Requirement 11: Test security of systems and networks regularly'
          }
        ]
      }
    ]
  },

  'security-frameworks': {
    skillId: 'security-frameworks',
    name: 'Security Frameworks Assessment',
    category: 'Cybersecurity',
    description: 'Evaluates cybersecurity frameworks and controls for AI system protection.',
    article: 'Article 15',
    sections: [
      {
        id: 'framework-selection',
        title: 'Security Framework Selection',
        description: 'Identify applicable security frameworks and standards',
        questions: [
          {
            id: 'frameworks-used',
            question: 'Which security frameworks does your organization follow?',
            type: 'checkbox',
            options: [
              'NIST Cybersecurity Framework',
              'ISO/IEC 27001',
              'ISO/IEC 27701',
              'SOC 2',
              'CIS Controls',
              'COBIT',
              'None currently',
              'Other'
            ],
            required: true
          },
          {
            id: 'ai-specific-controls',
            question: 'Are AI-specific security controls implemented?',
            type: 'yes-no',
            required: true,
            helpText: 'AI systems require specialized security measures beyond traditional IT security'
          },
          {
            id: 'compliance-requirements',
            question: 'What compliance requirements apply to your AI system?',
            type: 'checkbox',
            options: [
              'EU AI Act Article 15',
              'GDPR',
              'NIS2 Directive',
              'Sector-specific regulations',
              'Industry standards',
              'None identified'
            ],
            required: true
          }
        ]
      },
      {
        id: 'security-controls',
        title: 'Security Controls Implementation',
        description: 'Assess implemented security controls and measures',
        questions: [
          {
            id: 'access-controls',
            question: 'What access control mechanisms are in place?',
            type: 'checkbox',
            options: [
              'Identity and access management (IAM)',
              'Multi-factor authentication (MFA)',
              'Role-based access control (RBAC)',
              'Least privilege principle',
              'Privileged access management',
              'Regular access reviews'
            ],
            required: true
          },
          {
            id: 'data-protection',
            question: 'What data protection measures are implemented?',
            type: 'checkbox',
            options: [
              'Encryption at rest',
              'Encryption in transit',
              'Key management system',
              'Data masking/anonymization',
              'Secure data disposal',
              'Backup and recovery'
            ],
            required: true
          },
          {
            id: 'network-security',
            question: 'What network security controls are in place?',
            type: 'checkbox',
            options: [
              'Firewall protection',
              'Intrusion detection/prevention',
              'Network segmentation',
              'DDoS protection',
              'VPN for remote access',
              'Security monitoring'
            ],
            required: true
          },
          {
            id: 'vulnerability-management',
            question: 'Is there a vulnerability management program?',
            type: 'yes-no',
            required: true,
            helpText: 'Regular scanning and patching of vulnerabilities is essential'
          }
        ]
      },
      {
        id: 'incident-response',
        title: 'Incident Response',
        description: 'Evaluate incident response and recovery capabilities',
        questions: [
          {
            id: 'incident-plan',
            question: 'Is there a documented incident response plan?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 15 requires resilience against cybersecurity incidents'
          },
          {
            id: 'response-team',
            question: 'Is there a dedicated security incident response team?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'incident-categories',
            question: 'Which incident types are covered by response procedures?',
            type: 'checkbox',
            options: [
              'Data breaches',
              'Unauthorized access',
              'Malware/ransomware',
              'DDoS attacks',
              'AI model poisoning',
              'Prompt injection attacks',
              'System failures'
            ],
            required: true
          },
          {
            id: 'testing-frequency',
            question: 'How often are incident response procedures tested?',
            type: 'radio',
            options: [
              'Monthly',
              'Quarterly',
              'Annually',
              'Never tested',
              'Ad-hoc basis'
            ],
            required: true
          }
        ]
      },
      {
        id: 'monitoring-audit',
        title: 'Security Monitoring and Audit',
        description: 'Assess continuous monitoring and audit capabilities',
        questions: [
          {
            id: 'security-monitoring',
            question: 'What security monitoring tools are deployed?',
            type: 'checkbox',
            options: [
              'SIEM (Security Information and Event Management)',
              'Log aggregation and analysis',
              'Anomaly detection',
              'Real-time alerting',
              'Threat intelligence feeds',
              'User behavior analytics'
            ],
            required: true
          },
          {
            id: 'audit-logs',
            question: 'Are comprehensive audit logs maintained?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'security-assessments',
            question: 'How frequently are security assessments conducted?',
            type: 'radio',
            options: [
              'Continuously',
              'Quarterly',
              'Annually',
              'Before major releases',
              'Not regularly scheduled'
            ],
            required: true
          },
          {
            id: 'third-party-audits',
            question: 'Are third-party security audits performed?',
            type: 'yes-no',
            required: true,
            helpText: 'Independent audits provide objective security validation'
          }
        ]
      }
    ]
  },

  'grype-vulnerability': {
    skillId: 'grype-vulnerability',
    name: 'Vulnerability Scanning Assessment',
    category: 'Cybersecurity',
    description: 'Assesses vulnerability management practices for container images and dependencies.',
    article: 'Article 15',
    sections: [
      {
        id: 'scope-identification',
        title: 'Scope Identification',
        description: 'Define the scope of vulnerability scanning',
        questions: [
          {
            id: 'scan-targets',
            question: 'What components require vulnerability scanning?',
            type: 'checkbox',
            options: [
              'Container images',
              'Base operating system images',
              'Application dependencies (npm, pip, etc.)',
              'System libraries',
              'Third-party components',
              'Custom code'
            ],
            required: true
          },
          {
            id: 'deployment-environment',
            question: 'What deployment environments are used?',
            type: 'checkbox',
            options: [
              'Development',
              'Testing/Staging',
              'Production',
              'Cloud infrastructure',
              'On-premises',
              'Hybrid'
            ],
            required: true
          },
          {
            id: 'containerization',
            question: 'Are you using containerization technologies?',
            type: 'yes-no',
            required: true,
            helpText: 'Tools like Docker, Kubernetes, or other container platforms'
          }
        ]
      },
      {
        id: 'scanning-process',
        title: 'Scanning Process',
        description: 'Evaluate vulnerability scanning procedures',
        questions: [
          {
            id: 'scan-frequency',
            question: 'How frequently are vulnerability scans performed?',
            type: 'radio',
            options: [
              'Continuous (with every build)',
              'Daily',
              'Weekly',
              'Monthly',
              'Before each deployment',
              'Not regularly scheduled'
            ],
            required: true
          },
          {
            id: 'scan-automation',
            question: 'Is vulnerability scanning automated?',
            type: 'yes-no',
            required: true,
            helpText: 'Automated scanning ensures consistent coverage and rapid detection'
          },
          {
            id: 'scan-tools',
            question: 'What vulnerability scanning tools are currently used?',
            type: 'checkbox',
            options: [
              'Grype',
              'Trivy',
              'Snyk',
              'Clair',
              'Anchore',
              'Commercial scanners',
              'None currently'
            ],
            required: true
          },
          {
            id: 'vulnerability-databases',
            question: 'Which vulnerability databases are consulted?',
            type: 'checkbox',
            options: [
              'CVE (Common Vulnerabilities and Exposures)',
              'NVD (National Vulnerability Database)',
              'GitHub Security Advisories',
              'OS-specific databases',
              'Language-specific databases',
              'Vendor-specific feeds'
            ],
            required: true
          }
        ]
      },
      {
        id: 'risk-assessment',
        title: 'Risk Assessment and Prioritization',
        description: 'Define how vulnerabilities are assessed and prioritized',
        questions: [
          {
            id: 'severity-scoring',
            question: 'What severity scoring system is used?',
            type: 'checkbox',
            options: [
              'CVSS (Common Vulnerability Scoring System)',
              'Custom risk scoring',
              'Vendor severity ratings',
              'Exploitability assessment',
              'Business impact analysis'
            ],
            required: true
          },
          {
            id: 'risk-thresholds',
            question: 'What severity levels require immediate action?',
            type: 'checkbox',
            options: [
              'Critical (CVSS 9.0-10.0)',
              'High (CVSS 7.0-8.9)',
              'Medium (CVSS 4.0-6.9)',
              'Low (CVSS 0.1-3.9)',
              'All vulnerabilities'
            ],
            required: true
          },
          {
            id: 'false-positive-handling',
            question: 'How are false positives handled?',
            type: 'text',
            required: true,
            helpText: 'Describe the process for validating and suppressing false positives'
          }
        ]
      },
      {
        id: 'remediation',
        title: 'Remediation Process',
        description: 'Assess vulnerability remediation procedures',
        questions: [
          {
            id: 'remediation-sla',
            question: 'Are there defined SLAs for vulnerability remediation?',
            type: 'yes-no',
            required: true,
            helpText: 'Service Level Agreements define timeframes for addressing vulnerabilities'
          },
          {
            id: 'remediation-workflow',
            question: 'What is the typical remediation workflow?',
            type: 'checkbox',
            options: [
              'Automated dependency updates',
              'Manual patch application',
              'Image rebuilding',
              'Temporary workarounds/mitigations',
              'Risk acceptance (with approval)',
              'Component replacement'
            ],
            required: true
          },
          {
            id: 'blocking-deployments',
            question: 'Are deployments blocked if critical vulnerabilities are detected?',
            type: 'yes-no',
            required: true,
            helpText: 'CI/CD pipeline integration can prevent vulnerable code from reaching production'
          },
          {
            id: 'patch-testing',
            question: 'How are patches tested before deployment?',
            type: 'text',
            required: true
          }
        ]
      },
      {
        id: 'reporting-tracking',
        title: 'Reporting and Tracking',
        description: 'Evaluate vulnerability tracking and reporting',
        questions: [
          {
            id: 'tracking-system',
            question: 'Is there a system for tracking identified vulnerabilities?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'reporting-stakeholders',
            question: 'Who receives vulnerability scan reports?',
            type: 'checkbox',
            options: [
              'Development team',
              'Security team',
              'DevOps/Infrastructure team',
              'Management',
              'Compliance officers',
              'External auditors'
            ],
            required: true
          },
          {
            id: 'metrics-tracking',
            question: 'What metrics are tracked?',
            type: 'checkbox',
            options: [
              'Number of vulnerabilities detected',
              'Time to remediation',
              'Vulnerability trends over time',
              'Remediation rate',
              'Coverage of scanned assets',
              'Recurring vulnerabilities'
            ],
            required: true
          },
          {
            id: 'compliance-reporting',
            question: 'Are vulnerability reports used for compliance purposes?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 15 requires documentation of cybersecurity measures'
          }
        ]
      }
    ]
  },

  'safety-pyup': {
    skillId: 'safety-pyup',
    name: 'Python Dependency Safety Assessment',
    category: 'Cybersecurity',
    description: 'Evaluates Python dependency security and vulnerability management practices.',
    article: 'Article 15',
    sections: [
      {
        id: 'dependency-inventory',
        title: 'Dependency Inventory',
        description: 'Identify and catalog Python dependencies',
        questions: [
          {
            id: 'dependency-management',
            question: 'What dependency management tools do you use?',
            type: 'checkbox',
            options: [
              'pip (requirements.txt)',
              'Pipenv (Pipfile)',
              'Poetry (pyproject.toml)',
              'Conda (environment.yml)',
              'setup.py',
              'Other or custom'
            ],
            required: true
          },
          {
            id: 'dependency-count',
            question: 'Approximately how many direct Python dependencies does your project have?',
            type: 'radio',
            options: [
              'Less than 10',
              '10-50',
              '50-100',
              '100-500',
              'More than 500'
            ],
            required: true
          },
          {
            id: 'transitive-dependencies',
            question: 'Are transitive (indirect) dependencies tracked and monitored?',
            type: 'yes-no',
            required: true,
            helpText: 'Transitive dependencies can introduce vulnerabilities even if not directly specified'
          }
        ]
      },
      {
        id: 'vulnerability-detection',
        title: 'Vulnerability Detection',
        description: 'Assess how Python vulnerabilities are detected',
        questions: [
          {
            id: 'safety-checks',
            question: 'How frequently are dependency safety checks performed?',
            type: 'radio',
            options: [
              'On every commit (CI/CD)',
              'Daily automated scans',
              'Weekly',
              'Before each release',
              'Ad-hoc/manually',
              'Not regularly performed'
            ],
            required: true
          },
          {
            id: 'detection-tools',
            question: 'What tools are used for Python dependency vulnerability detection?',
            type: 'checkbox',
            options: [
              'Safety (PyUp)',
              'pip-audit',
              'Bandit',
              'Snyk',
              'GitHub Dependabot',
              'WhiteSource/Mend',
              'None currently'
            ],
            required: true
          },
          {
            id: 'vulnerability-sources',
            question: 'Which vulnerability databases are consulted?',
            type: 'checkbox',
            options: [
              'PyUp Safety DB',
              'OSV (Open Source Vulnerabilities)',
              'CVE database',
              'GitHub Security Advisories',
              'PyPI advisory database',
              'Custom/internal database'
            ],
            required: true
          },
          {
            id: 'private-packages',
            question: 'Does your project use private/internal Python packages?',
            type: 'yes-no',
            required: true,
            helpText: 'Private packages may require additional security scanning procedures'
          }
        ]
      },
      {
        id: 'risk-management',
        title: 'Risk Management',
        description: 'Define how dependency risks are evaluated and managed',
        questions: [
          {
            id: 'severity-response',
            question: 'What severity levels trigger immediate action?',
            type: 'checkbox',
            options: [
              'Critical vulnerabilities',
              'High vulnerabilities',
              'Medium vulnerabilities',
              'Low vulnerabilities',
              'Any known vulnerability'
            ],
            required: true
          },
          {
            id: 'vulnerable-dependency-policy',
            question: 'What is your policy when a vulnerable dependency is detected?',
            type: 'radio',
            options: [
              'Block builds/deployments immediately',
              'Create urgent ticket for remediation',
              'Assess exploitability before action',
              'Schedule for next release',
              'No formal policy'
            ],
            required: true
          },
          {
            id: 'version-pinning',
            question: 'How are dependency versions managed?',
            type: 'radio',
            options: [
              'Exact version pinning (==)',
              'Compatible releases (~=)',
              'Minimum version (>=)',
              'Version ranges',
              'Always latest',
              'Mixed approach'
            ],
            required: true,
            helpText: 'Version pinning affects both security and update management'
          },
          {
            id: 'unmaintained-packages',
            question: 'How do you handle unmaintained or deprecated packages?',
            type: 'text',
            required: true
          }
        ]
      },
      {
        id: 'update-process',
        title: 'Update and Patching Process',
        description: 'Evaluate dependency update procedures',
        questions: [
          {
            id: 'update-frequency',
            question: 'How frequently are dependencies updated?',
            type: 'radio',
            options: [
              'Continuously (automated)',
              'Weekly',
              'Monthly',
              'Quarterly',
              'Only when vulnerabilities detected',
              'Not regularly scheduled'
            ],
            required: true
          },
          {
            id: 'automated-updates',
            question: 'Are dependency updates automated?',
            type: 'checkbox',
            options: [
              'Dependabot pull requests',
              'Renovate bot',
              'PyUp updates',
              'Custom automation',
              'Manual updates only'
            ],
            required: true
          },
          {
            id: 'testing-updates',
            question: 'How are dependency updates tested before deployment?',
            type: 'checkbox',
            options: [
              'Automated test suite',
              'Manual testing',
              'Staging environment validation',
              'Canary deployments',
              'Security regression testing',
              'Not systematically tested'
            ],
            required: true
          },
          {
            id: 'breaking-changes',
            question: 'How are breaking changes in dependencies handled?',
            type: 'text',
            required: true
          }
        ]
      },
      {
        id: 'ci-cd-integration',
        title: 'CI/CD Integration',
        description: 'Assess integration with development pipelines',
        questions: [
          {
            id: 'pipeline-integration',
            question: 'Is dependency scanning integrated into your CI/CD pipeline?',
            type: 'yes-no',
            required: true,
            helpText: 'CI/CD integration enables early detection of vulnerabilities'
          },
          {
            id: 'build-failures',
            question: 'What happens when vulnerabilities are detected in CI/CD?',
            type: 'checkbox',
            options: [
              'Build fails immediately',
              'Build succeeds with warnings',
              'Notification sent to team',
              'Issue created automatically',
              'Deployment blocked',
              'No automated action'
            ],
            required: true
          },
          {
            id: 'reporting-metrics',
            question: 'What dependency security metrics are tracked?',
            type: 'checkbox',
            options: [
              'Number of vulnerable dependencies',
              'Time to patch vulnerabilities',
              'Dependency freshness',
              'License compliance',
              'Transitive dependency depth',
              'None currently tracked'
            ],
            required: true
          },
          {
            id: 'documentation',
            question: 'Is there documentation for the dependency security process?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 15 requires documented cybersecurity measures'
          }
        ]
      }
    ]
  },

  'prompt-injection-detector': {
    skillId: 'prompt-injection-detector',
    name: 'Prompt Injection Detection Assessment',
    category: 'Cybersecurity',
    description: 'Detects and prevents prompt injection attacks in AI systems.',
    article: 'Article 15',
    sections: [
      {
        id: 'attack-surface',
        title: 'Attack Surface Analysis',
        description: 'Identify potential attack vectors in your AI system',
        questions: [
          {
            id: 'user-inputs',
            question: 'Does your system accept free-form text input from users?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'input-sources',
            question: 'What are the sources of user input?',
            type: 'checkbox',
            options: [
              'Direct text input',
              'File uploads (documents, text files)',
              'Email content',
              'API calls',
              'Third-party integrations',
              'Web scraping/external content'
            ],
            required: true
          },
          {
            id: 'privileged-actions',
            question: 'Can the AI system perform privileged actions or access sensitive data?',
            type: 'yes-no',
            required: true,
            helpText: 'Systems with elevated privileges require stronger injection protection'
          }
        ]
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
            options: [
              'Input sanitization',
              'Pattern-based detection',
              'ML-based classification',
              'Keyword blocklists',
              'Context isolation',
              'None currently implemented'
            ],
            required: true
          },
          {
            id: 'detection-patterns',
            question: 'Which attack patterns does your system detect?',
            type: 'checkbox',
            options: [
              'Ignore previous instructions',
              'System prompt extraction attempts',
              'Role-playing attacks',
              'Encoding tricks (Base64, Unicode)',
              'Multi-turn manipulation',
              'Indirect injection via documents'
            ],
            required: true
          },
          {
            id: 'false-positive-handling',
            question: 'How are false positives (legitimate inputs flagged as attacks) handled?',
            type: 'text',
            required: true
          }
        ]
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
            options: [
              'Request is blocked immediately',
              'Warning message to user',
              'Request is logged for review',
              'Silent blocking with generic response',
              'Progressive restriction (after multiple attempts)',
              'Account suspension/flagging'
            ],
            required: true
          },
          {
            id: 'logging-monitoring',
            question: 'Are injection attempts logged and monitored?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'incident-response',
            question: 'Is there an incident response plan for successful injection attacks?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 15 requires cybersecurity resilience and incident response capabilities'
          }
        ]
      }
    ]
  },

  'ai-safety-planning': {
    skillId: 'ai-safety-planning',
    name: 'AI Safety Planning Assessment',
    category: 'Health and Safety',
    description: 'Plans AI safety measures including alignment, guardrails, red teaming, and regulatory compliance.',
    article: 'Article 9',
    sections: [
      {
        id: 'risk-classification',
        title: 'Risk Classification',
        description: 'Determine the risk category of your AI system',
        questions: [
          {
            id: 'ai-act-category',
            question: 'What is your preliminary EU AI Act risk classification?',
            type: 'radio',
            options: [
              'Unacceptable Risk (Prohibited)',
              'High Risk',
              'Limited Risk',
              'Minimal Risk',
              'Not yet determined'
            ],
            required: true
          },
          {
            id: 'application-area',
            question: 'What is the primary application area?',
            type: 'checkbox',
            options: [
              'Biometric identification',
              'Critical infrastructure',
              'Education and vocational training',
              'Employment and HR',
              'Essential public/private services',
              'Law enforcement',
              'Migration and asylum',
              'Justice and democracy',
              'Other'
            ],
            required: true
          },
          {
            id: 'harm-potential',
            question: 'What potential harms could the system cause?',
            type: 'text',
            required: true,
            helpText: 'Consider physical, psychological, social, and economic harms'
          }
        ]
      },
      {
        id: 'guardrails',
        title: 'Guardrails Implementation',
        description: 'Define safety guardrails for your AI system',
        questions: [
          {
            id: 'input-guards',
            question: 'What input guardrails are implemented?',
            type: 'checkbox',
            options: [
              'Content filtering',
              'Prompt injection detection',
              'Rate limiting',
              'Input validation',
              'Topic restrictions',
              'None currently'
            ],
            required: true
          },
          {
            id: 'output-filters',
            question: 'What output filtering mechanisms are in place?',
            type: 'checkbox',
            options: [
              'Toxicity filtering',
              'PII detection and redaction',
              'Harmful content blocking',
              'Fact-checking',
              'Bias detection',
              'None currently'
            ],
            required: true
          },
          {
            id: 'behavioral-constraints',
            question: 'What behavioral constraints are enforced?',
            type: 'text',
            required: true,
            helpText: 'E.g., system prompts, fine-tuning, policy enforcement'
          }
        ]
      },
      {
        id: 'testing-validation',
        title: 'Testing and Validation',
        description: 'Assess safety testing and validation processes',
        questions: [
          {
            id: 'red-teaming',
            question: 'Has the system undergone red team testing?',
            type: 'yes-no',
            required: true,
            helpText: 'Red teaming involves adversarial testing to identify vulnerabilities'
          },
          {
            id: 'test-categories',
            question: 'What test categories are covered?',
            type: 'checkbox',
            options: [
              'Jailbreak attempts',
              'Harmful content generation',
              'Privacy attacks',
              'Bias testing',
              'Reliability testing',
              'Adversarial inputs'
            ],
            required: true
          },
          {
            id: 'continuous-monitoring',
            question: 'Is there continuous safety monitoring in production?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 9 requires continuous risk management'
          }
        ]
      }
    ]
  },

  'explainability-planning': {
    skillId: 'explainability-planning',
    name: 'Explainability Planning Assessment',
    category: 'Trust',
    description: 'Strategic framework for designing explainable AI systems and ensuring transparency.',
    article: 'Article 13',
    sections: [
      {
        id: 'transparency-requirements',
        title: 'Transparency Requirements',
        description: 'Identify transparency obligations for your system',
        questions: [
          {
            id: 'user-notification',
            question: 'Are users informed that they are interacting with an AI system?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 52 requires disclosure of AI interaction'
          },
          {
            id: 'explanation-level',
            question: 'What level of explanation is provided to users?',
            type: 'radio',
            options: [
              'No explanation provided',
              'Basic disclosure (AI is being used)',
              'General explanation of how system works',
              'Detailed technical documentation',
              'Individual decision explanations'
            ],
            required: true
          },
          {
            id: 'stakeholder-needs',
            question: 'Which stakeholders require explanations?',
            type: 'checkbox',
            options: [
              'End users',
              'Deployers/operators',
              'Regulators/auditors',
              'Data subjects',
              'Third-party reviewers'
            ],
            required: true
          }
        ]
      },
      {
        id: 'explanation-methods',
        title: 'Explanation Methods',
        description: 'Define explainability techniques and tools',
        questions: [
          {
            id: 'explainability-tools',
            question: 'What explainability tools or methods are used?',
            type: 'checkbox',
            options: [
              'SHAP (SHapley Additive exPlanations)',
              'LIME (Local Interpretable Model-agnostic Explanations)',
              'Attention visualization',
              'Feature importance',
              'Decision trees/rules',
              'Model cards',
              'None currently'
            ],
            required: true
          },
          {
            id: 'explanation-format',
            question: 'In what formats are explanations provided?',
            type: 'checkbox',
            options: [
              'Natural language descriptions',
              'Visual representations',
              'Technical documentation',
              'Interactive tools',
              'API responses',
              'Reports'
            ],
            required: true
          },
          {
            id: 'explanation-accuracy',
            question: 'How is the accuracy and faithfulness of explanations validated?',
            type: 'text',
            required: true
          }
        ]
      },
      {
        id: 'documentation',
        title: 'Documentation',
        description: 'Assess technical documentation completeness',
        questions: [
          {
            id: 'technical-docs',
            question: 'What technical documentation is maintained?',
            type: 'checkbox',
            options: [
              'System architecture documentation',
              'Model cards',
              'Data sheets for datasets',
              'Performance metrics',
              'Known limitations',
              'Use case specifications',
              'Risk assessments'
            ],
            required: true,
            helpText: 'Article 11 requires comprehensive technical documentation for high-risk systems'
          },
          {
            id: 'doc-accessibility',
            question: 'Is documentation accessible to non-technical stakeholders?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'doc-maintenance',
            question: 'How frequently is documentation updated?',
            type: 'radio',
            options: [
              'Real-time/Continuous',
              'With each release',
              'Monthly',
              'Quarterly',
              'Annually',
              'Ad-hoc/Not regularly'
            ],
            required: true
          }
        ]
      }
    ]
  },

  'snyk-io': {
    skillId: 'snyk-io',
    name: 'Snyk Security Assessment',
    category: 'Cybersecurity',
    description: 'Developer-first security platform that finds and automatically fixes vulnerabilities in code, dependencies, containers, and infrastructure as code.',
    article: 'Article 15',
    sections: [
      {
        id: 'vulnerability-scanning',
        title: 'Vulnerability Scanning Setup',
        description: 'Configure Snyk for comprehensive vulnerability detection',
        questions: [
          {
            id: 'scan-targets',
            question: 'Which components are you scanning with Snyk?',
            type: 'checkbox',
            options: [
              'Application code (SAST)',
              'Open source dependencies (SCA)',
              'Container images',
              'Infrastructure as Code (IaC)',
              'Kubernetes configurations',
              'Cloud infrastructure'
            ],
            required: true
          },
          {
            id: 'programming-languages',
            question: 'Which programming languages/frameworks are in your AI system?',
            type: 'checkbox',
            options: [
              'Python',
              'JavaScript/TypeScript',
              'Java',
              'C/C++',
              'Go',
              'Ruby',
              '.NET/C#',
              'Other'
            ],
            required: true
          },
          {
            id: 'scan-frequency',
            question: 'How frequently do you run Snyk scans?',
            type: 'radio',
            options: [
              'On every commit (CI/CD integrated)',
              'Daily automated scans',
              'Weekly automated scans',
              'Manual/on-demand only',
              'Not yet configured'
            ],
            required: true
          },
          {
            id: 'integration-points',
            question: 'Where is Snyk integrated in your development workflow?',
            type: 'checkbox',
            options: [
              'IDE/code editor',
              'Git repository (PR checks)',
              'CI/CD pipeline',
              'Container registry',
              'Production monitoring',
              'Not yet integrated'
            ],
            required: true
          }
        ]
      },
      {
        id: 'dependency-management',
        title: 'Dependency Security',
        description: 'Manage open source and third-party dependencies',
        questions: [
          {
            id: 'dependency-inventory',
            question: 'Do you have a complete inventory of all dependencies?',
            type: 'yes-no',
            required: true,
            helpText: 'Including direct and transitive dependencies'
          },
          {
            id: 'vulnerability-severity',
            question: 'What severity levels trigger action?',
            type: 'checkbox',
            options: [
              'Critical vulnerabilities',
              'High vulnerabilities',
              'Medium vulnerabilities',
              'Low vulnerabilities',
              'All vulnerabilities'
            ],
            required: true
          },
          {
            id: 'auto-fix',
            question: 'Do you use Snyk automatic fix capabilities?',
            type: 'radio',
            options: [
              'Yes - Automatic PRs for all fixes',
              'Yes - For critical/high only',
              'Yes - Manual review required',
              'No - Manual fixes only',
              'Not configured'
            ],
            required: true
          },
          {
            id: 'license-compliance',
            question: 'Are you monitoring open source license compliance?',
            type: 'yes-no',
            required: true,
            helpText: 'Ensure dependencies have compatible licenses'
          }
        ]
      },
      {
        id: 'code-security',
        title: 'Code Security (SAST)',
        description: 'Static application security testing',
        questions: [
          {
            id: 'code-scanning',
            question: 'Are you scanning proprietary code for vulnerabilities?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'vulnerability-types',
            question: 'Which code vulnerability types are you detecting?',
            type: 'checkbox',
            options: [
              'SQL Injection',
              'Cross-Site Scripting (XSS)',
              'Code Injection',
              'Path Traversal',
              'Insecure Deserialization',
              'Hardcoded credentials',
              'Weak cryptography',
              'Authentication/authorization issues'
            ],
            required: true
          },
          {
            id: 'code-quality',
            question: 'Do you review code quality issues alongside security?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'container-security',
        title: 'Container Security',
        description: 'Secure container images and configurations',
        questions: [
          {
            id: 'container-scanning',
            question: 'Are you scanning container images for vulnerabilities?',
            type: 'yes-no',
            required: true,
            helpText: 'Scan both base images and application layers'
          },
          {
            id: 'base-images',
            question: 'Do you use verified/minimal base images?',
            type: 'radio',
            options: [
              'Yes - Official minimal images only',
              'Yes - Official images (standard)',
              'Mixed - Various sources',
              'No - Custom base images',
              'Not applicable'
            ],
            required: true
          },
          {
            id: 'image-scanning-timing',
            question: 'When are container images scanned?',
            type: 'checkbox',
            options: [
              'During build (CI/CD)',
              'Before registry push',
              'In container registry',
              'Before deployment',
              'In production runtime',
              'Not scanning'
            ],
            required: true
          },
          {
            id: 'vulnerability-remediation',
            question: 'What is your process for remediating container vulnerabilities?',
            type: 'radio',
            options: [
              'Immediate rebuild and redeploy',
              'Scheduled updates (weekly)',
              'Scheduled updates (monthly)',
              'Manual/ad-hoc basis',
              'No formal process'
            ],
            required: true
          }
        ]
      },
      {
        id: 'iac-security',
        title: 'Infrastructure as Code Security',
        description: 'Secure cloud infrastructure configurations',
        questions: [
          {
            id: 'iac-scanning',
            question: 'Are you scanning IaC files for misconfigurations?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'iac-tools',
            question: 'Which IaC tools are you using?',
            type: 'checkbox',
            options: [
              'Terraform',
              'CloudFormation',
              'Azure Resource Manager',
              'Kubernetes YAML',
              'Helm Charts',
              'Ansible',
              'Other',
              'Not using IaC'
            ],
            required: true
          },
          {
            id: 'iac-issues',
            question: 'Which IaC security issues are you detecting?',
            type: 'checkbox',
            options: [
              'Public exposure of resources',
              'Missing encryption',
              'Weak access controls',
              'Insecure network configurations',
              'Non-compliant configurations',
              'Privilege escalation risks',
              'Not yet configured'
            ],
            required: true
          }
        ]
      },
      {
        id: 'policy-governance',
        title: 'Security Policies and Governance',
        description: 'Define and enforce security policies',
        questions: [
          {
            id: 'security-policies',
            question: 'Have you defined security policies in Snyk?',
            type: 'yes-no',
            required: true,
            helpText: 'Custom rules for what vulnerabilities to flag/block'
          },
          {
            id: 'build-blocking',
            question: 'Do critical vulnerabilities block builds/deployments?',
            type: 'radio',
            options: [
              'Yes - Critical and high severity',
              'Yes - Critical only',
              'No - Warning only',
              'Not configured'
            ],
            required: true
          },
          {
            id: 'compliance-standards',
            question: 'Which compliance standards are you monitoring?',
            type: 'checkbox',
            options: [
              'OWASP Top 10',
              'CWE Top 25',
              'PCI DSS',
              'HIPAA',
              'SOC 2',
              'ISO 27001',
              'GDPR security requirements',
              'Not monitoring compliance'
            ],
            required: true
          },
          {
            id: 'sla-remediation',
            question: 'Do you have SLAs for vulnerability remediation?',
            type: 'yes-no',
            required: true,
            helpText: 'Define time limits for fixing different severity levels'
          }
        ]
      },
      {
        id: 'monitoring-reporting',
        title: 'Monitoring and Reporting',
        description: 'Track security posture and improvements',
        questions: [
          {
            id: 'security-metrics',
            question: 'Which security metrics do you track?',
            type: 'checkbox',
            options: [
              'Number of vulnerabilities by severity',
              'Mean time to remediate (MTTR)',
              'Vulnerability trends over time',
              'Test coverage',
              'Dependency freshness',
              'Security debt',
              'Compliance score',
              'None yet'
            ],
            required: true
          },
          {
            id: 'reporting-frequency',
            question: 'How often do you review security reports?',
            type: 'radio',
            options: [
              'Daily',
              'Weekly',
              'Monthly',
              'Quarterly',
              'Ad-hoc/as needed',
              'Not reviewing regularly'
            ],
            required: true
          },
          {
            id: 'stakeholder-reporting',
            question: 'Do you share security reports with stakeholders?',
            type: 'yes-no',
            required: true,
            helpText: 'Keep leadership, compliance, and auditors informed'
          },
          {
            id: 'continuous-improvement',
            question: 'Is there a process for continuous security improvement?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 15 requires ongoing robustness maintenance'
          }
        ]
      }
    ]
  },

  'oss-scorecard': {
    skillId: 'oss-scorecard',
    name: 'OSS Scorecard Assessment',
    category: 'Cybersecurity',
    description: 'Assesses security posture of open-source projects using automated checks. Evaluates security practices of dependencies used in AI systems.',
    article: 'Article 15',
    sections: [
      {
        id: 'dependency-assessment',
        title: 'Open Source Dependency Assessment',
        description: 'Identify and evaluate open-source dependencies',
        questions: [
          {
            id: 'oss-usage',
            question: 'Does your AI system use open-source dependencies?',
            type: 'yes-no',
            required: true,
            helpText: 'Most AI systems rely on open-source libraries and frameworks'
          },
          {
            id: 'dependency-count',
            question: 'Approximately how many direct open-source dependencies does your system have?',
            type: 'radio',
            options: [
              'Less than 10',
              '10-50',
              '51-100',
              '101-500',
              'More than 500',
              'Unknown'
            ],
            required: true
          },
          {
            id: 'critical-dependencies',
            question: 'Which critical open-source dependencies does your AI system use?',
            type: 'checkbox',
            options: [
              'TensorFlow/PyTorch (ML frameworks)',
              'scikit-learn (ML library)',
              'NumPy/Pandas (data processing)',
              'Transformers/LangChain (LLM libraries)',
              'OpenCV (computer vision)',
              'NLTK/spaCy (NLP)',
              'Flask/FastAPI (web frameworks)',
              'Docker/Kubernetes (infrastructure)',
              'Other critical dependencies'
            ],
            required: true
          },
          {
            id: 'dependency-inventory',
            question: 'Do you maintain a complete inventory of all dependencies (including transitive)?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 15 requires understanding your full software supply chain'
          }
        ]
      },
      {
        id: 'scorecard-checks',
        title: 'OSS Scorecard Security Checks',
        description: 'Configure and evaluate OpenSSF Scorecard checks',
        questions: [
          {
            id: 'scorecard-implementation',
            question: 'Have you implemented OpenSSF Scorecard checks?',
            type: 'radio',
            options: [
              'Yes - Automated in CI/CD',
              'Yes - Manual periodic checks',
              'Partially - For some dependencies',
              'No - Not yet implemented',
              'Planning to implement'
            ],
            required: true
          },
          {
            id: 'security-checks',
            question: 'Which security checks are you evaluating?',
            type: 'checkbox',
            options: [
              'Binary-Artifacts - Checks for binary artifacts in source',
              'Branch-Protection - Checks branch protection settings',
              'CI-Tests - Checks for continuous integration tests',
              'CII-Best-Practices - Checks OpenSSF Best Practices badge',
              'Code-Review - Checks if code review is practiced',
              'Contributors - Checks project contributor activity',
              'Dangerous-Workflow - Checks for dangerous GitHub workflows',
              'Dependency-Update-Tool - Checks for dependency update tools',
              'Fuzzing - Checks if project uses fuzzing',
              'License - Checks if project has a license',
              'Maintained - Checks if project is actively maintained',
              'Packaging - Checks if project is published as a package',
              'Pinned-Dependencies - Checks if dependencies are pinned',
              'SAST - Checks for static analysis tools',
              'Security-Policy - Checks for security policy',
              'Signed-Releases - Checks if releases are signed',
              'Token-Permissions - Checks GitHub workflow token permissions',
              'Vulnerabilities - Checks for known vulnerabilities',
              'Webhooks - Checks webhook security'
            ],
            required: true
          },
          {
            id: 'minimum-score',
            question: 'What minimum scorecard score do you require for dependencies?',
            type: 'radio',
            options: [
              '9.0+ (Excellent)',
              '7.0-8.9 (Good)',
              '5.0-6.9 (Fair)',
              'Below 5.0 (Needs improvement)',
              'No minimum score set',
              'Not yet defined'
            ],
            required: true
          }
        ]
      },
      {
        id: 'supply-chain-security',
        title: 'Software Supply Chain Security',
        description: 'Evaluate supply chain security practices',
        questions: [
          {
            id: 'dependency-vetting',
            question: 'How do you vet new open-source dependencies?',
            type: 'checkbox',
            options: [
              'Check OSS Scorecard scores',
              'Review project maintenance status',
              'Evaluate community activity and contributors',
              'Check for security policy and vulnerability disclosure',
              'Review license compatibility',
              'Assess project maturity and stability',
              'Check for known vulnerabilities',
              'Code review of critical dependencies',
              'No formal vetting process'
            ],
            required: true
          },
          {
            id: 'dependency-pinning',
            question: 'Do you pin dependencies to specific versions?',
            type: 'radio',
            options: [
              'Yes - All dependencies pinned to exact versions',
              'Yes - Direct dependencies pinned, transitive not pinned',
              'Partial - Only critical dependencies pinned',
              'No - Using version ranges',
              'No - Always using latest versions'
            ],
            required: true,
            helpText: 'Pinning prevents unexpected changes from dependency updates'
          },
          {
            id: 'dependency-updates',
            question: 'How do you manage dependency updates?',
            type: 'checkbox',
            options: [
              'Automated dependency update tools (Dependabot, Renovate)',
              'Regular manual review and updates',
              'Security-only updates',
              'Quarterly update cycles',
              'On-demand when issues arise',
              'No formal update process'
            ],
            required: true
          },
          {
            id: 'sbom-generation',
            question: 'Do you generate Software Bill of Materials (SBOM)?',
            type: 'yes-no',
            required: true,
            helpText: 'SBOM provides transparent inventory of software components'
          }
        ]
      },
      {
        id: 'project-health',
        title: 'Project Health and Maintenance',
        description: 'Assess health of open-source dependencies',
        questions: [
          {
            id: 'maintenance-status',
            question: 'How do you assess if dependencies are actively maintained?',
            type: 'checkbox',
            options: [
              'Check commit frequency',
              'Check issue response time',
              'Review release cadence',
              'Monitor contributor activity',
              'Check for security updates',
              'Review project roadmap',
              'Not currently assessing'
            ],
            required: true
          },
          {
            id: 'unmaintained-policy',
            question: 'What is your policy for unmaintained dependencies?',
            type: 'radio',
            options: [
              'Immediate replacement required',
              'Risk assessment and mitigation plan',
              'Monitor for alternatives',
              'Continue use with caution',
              'No formal policy'
            ],
            required: true
          },
          {
            id: 'community-evaluation',
            question: 'Do you evaluate the contributor community of dependencies?',
            type: 'yes-no',
            required: true,
            helpText: 'Diverse contributor base indicates healthier projects'
          }
        ]
      },
      {
        id: 'security-practices',
        title: 'Security Practices Evaluation',
        description: 'Evaluate security practices of dependencies',
        questions: [
          {
            id: 'security-policy-check',
            question: 'Do your dependencies have published security policies?',
            type: 'radio',
            options: [
              'Yes - All critical dependencies have security policies',
              'Mostly - Most dependencies have policies',
              'Some - Only a few have policies',
              'No - Most lack security policies',
              'Unknown - Not checked'
            ],
            required: true
          },
          {
            id: 'vulnerability-disclosure',
            question: 'Do dependencies have vulnerability disclosure processes?',
            type: 'radio',
            options: [
              'Yes - Clear disclosure processes',
              'Some - Varies by dependency',
              'Unknown - Not verified',
              'No - Most lack clear processes'
            ],
            required: true
          },
          {
            id: 'code-review-practice',
            question: 'Do your dependencies practice code review?',
            type: 'radio',
            options: [
              'Yes - All changes reviewed',
              'Mostly - Most changes reviewed',
              'Some - Inconsistent review',
              'Unknown - Not checked',
              'No - No code review evident'
            ],
            required: true,
            helpText: 'Code review reduces security vulnerabilities'
          },
          {
            id: 'automated-testing',
            question: 'Do dependencies have automated testing and CI/CD?',
            type: 'yes-no',
            required: true,
            helpText: 'Automated testing indicates higher code quality'
          }
        ]
      },
      {
        id: 'risk-mitigation',
        title: 'Risk Mitigation Strategies',
        description: 'Define strategies for managing supply chain risks',
        questions: [
          {
            id: 'alternative-dependencies',
            question: 'Do you identify alternative dependencies for critical components?',
            type: 'yes-no',
            required: true,
            helpText: 'Having alternatives reduces single point of failure risk'
          },
          {
            id: 'vendoring-policy',
            question: 'Do you vendor (fork/copy) critical dependencies?',
            type: 'radio',
            options: [
              'Yes - All critical dependencies vendored',
              'Selective - Only highest-risk dependencies',
              'No - Use dependencies directly',
              'Considering for future'
            ],
            required: true
          },
          {
            id: 'incident-response',
            question: 'Do you have an incident response plan for dependency vulnerabilities?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 15 requires processes for handling security issues'
          },
          {
            id: 'monitoring-alerts',
            question: 'Do you monitor for security advisories on your dependencies?',
            type: 'checkbox',
            options: [
              'GitHub Security Advisories',
              'National Vulnerability Database (NVD)',
              'Project-specific mailing lists',
              'Security aggregation services',
              'Automated scanning tools',
              'Not currently monitoring'
            ],
            required: true
          }
        ]
      },
      {
        id: 'documentation-compliance',
        title: 'Documentation and Compliance',
        description: 'Document supply chain security practices',
        questions: [
          {
            id: 'supply-chain-documentation',
            question: 'Is your supply chain security process documented?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 11 requires technical documentation including dependencies'
          },
          {
            id: 'scorecard-results',
            question: 'Do you maintain records of scorecard assessments?',
            type: 'yes-no',
            required: true,
            helpText: 'Keep audit trail of dependency security evaluations'
          },
          {
            id: 'remediation-tracking',
            question: 'Do you track remediation of supply chain security issues?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'periodic-review',
            question: 'How often do you review dependency security posture?',
            type: 'radio',
            options: [
              'Continuously (automated monitoring)',
              'Weekly',
              'Monthly',
              'Quarterly',
              'Annually',
              'No regular review schedule'
            ],
            required: true
          }
        ]
      }
    ]
  },

  'model-card-generation': {
    skillId: 'model-card-generation',
    name: 'Model Card Generation Assessment',
    category: 'Trust',
    description: 'Creates comprehensive documentation of machine learning models including intended use, performance, limitations, and ethical considerations.',
    article: 'Article 11 & 13',
    sections: [
      {
        id: 'model-details',
        title: 'Model Details',
        description: 'Basic model information and specifications',
        questions: [
          {
            id: 'model-info',
            question: 'Provide basic model information (name, version, type)',
            type: 'text',
            required: true
          },
          {
            id: 'model-architecture',
            question: 'Describe the model architecture',
            type: 'text',
            required: true,
            helpText: 'E.g., Transformer, CNN, ensemble, etc.'
          },
          {
            id: 'training-data',
            question: 'Describe the training data sources and composition',
            type: 'text',
            required: true
          },
          {
            id: 'model-size',
            question: 'What is the model size (parameters, storage)?',
            type: 'text',
            required: true
          }
        ]
      },
      {
        id: 'intended-use',
        title: 'Intended Use',
        description: 'Define appropriate and inappropriate uses',
        questions: [
          {
            id: 'primary-use',
            question: 'What is the primary intended use of the model?',
            type: 'text',
            required: true
          },
          {
            id: 'target-users',
            question: 'Who are the intended users?',
            type: 'text',
            required: true
          },
          {
            id: 'out-of-scope',
            question: 'What are known out-of-scope or inappropriate uses?',
            type: 'text',
            required: true,
            helpText: 'Important for Article 13 transparency requirements'
          }
        ]
      },
      {
        id: 'performance',
        title: 'Performance Metrics',
        description: 'Document model performance and evaluation',
        questions: [
          {
            id: 'metrics-used',
            question: 'What performance metrics are reported?',
            type: 'checkbox',
            options: [
              'Accuracy',
              'Precision/Recall',
              'F1 Score',
              'AUC-ROC',
              'Fairness metrics',
              'Robustness metrics',
              'Latency/Throughput'
            ],
            required: true
          },
          {
            id: 'performance-values',
            question: 'Provide key performance metric values',
            type: 'text',
            required: true
          },
          {
            id: 'subgroup-performance',
            question: 'Is performance evaluated across different demographic subgroups?',
            type: 'yes-no',
            required: true,
            helpText: 'Required for bias and fairness assessment'
          }
        ]
      },
      {
        id: 'limitations',
        title: 'Limitations and Risks',
        description: 'Document known limitations and potential risks',
        questions: [
          {
            id: 'known-limitations',
            question: 'What are the known limitations of the model?',
            type: 'text',
            required: true
          },
          {
            id: 'bias-concerns',
            question: 'Are there known biases or fairness concerns?',
            type: 'text',
            required: true
          },
          {
            id: 'failure-modes',
            question: 'What are common failure modes or edge cases?',
            type: 'text',
            required: true
          },
          {
            id: 'mitigation-strategies',
            question: 'What mitigation strategies are in place for identified risks?',
            type: 'text',
            required: true
          }
        ]
      }
    ]
  },

  'detoxify': {
    skillId: 'detoxify',
    name: 'Toxicity Detection Assessment',
    category: 'Societal',
    description: 'Evaluates implementation of toxicity detection for harmful, offensive, or inappropriate content.',
    article: 'Articles 9, 10, 13',
    sections: [
      {
        id: 'toxicity-scope',
        title: 'Toxicity Detection Scope',
        description: 'Define what types of toxicity are monitored',
        questions: [
          {
            id: 'toxicity-categories',
            question: 'What categories of toxic content does your system detect?',
            type: 'checkbox',
            options: [
              'Hate speech',
              'Harassment and bullying',
              'Threats and violence',
              'Profanity',
              'Sexual content',
              'Identity attacks',
              'Insults',
              'None currently'
            ],
            required: true
          },
          {
            id: 'content-sources',
            question: 'Where is toxicity detection applied?',
            type: 'checkbox',
            options: [
              'User-generated content',
              'AI-generated outputs',
              'Comments and discussions',
              'Chat messages',
              'Content submissions',
              'API responses'
            ],
            required: true
          },
          {
            id: 'multilingual-support',
            question: 'Does your toxicity detection support multiple languages?',
            type: 'yes-no',
            required: true,
            helpText: 'Multilingual support is important for diverse user bases'
          }
        ]
      },
      {
        id: 'detection-implementation',
        title: 'Detection Implementation',
        description: 'Assess how toxicity detection is implemented',
        questions: [
          {
            id: 'detection-tools',
            question: 'What toxicity detection tools are used?',
            type: 'checkbox',
            options: [
              'Detoxify',
              'Perspective API',
              'Custom ML models',
              'Rule-based filters',
              'Third-party APIs',
              'Hybrid approach'
            ],
            required: true
          },
          {
            id: 'threshold-settings',
            question: 'How are toxicity thresholds configured?',
            type: 'radio',
            options: [
              'Default model thresholds',
              'Custom thresholds per category',
              'Dynamic thresholds based on context',
              'User-configurable thresholds',
              'Not yet configured'
            ],
            required: true
          },
          {
            id: 'real-time-detection',
            question: 'Is toxicity detection performed in real-time?',
            type: 'yes-no',
            required: true,
            helpText: 'Real-time detection enables immediate content moderation'
          }
        ]
      },
      {
        id: 'response-actions',
        title: 'Response Actions',
        description: 'Define how toxic content is handled',
        questions: [
          {
            id: 'content-actions',
            question: 'What actions are taken when toxic content is detected?',
            type: 'checkbox',
            options: [
              'Content blocked/removed',
              'Warning shown to user',
              'Content flagged for review',
              'User warned/notified',
              'Account restrictions',
              'Logged for analysis'
            ],
            required: true
          },
          {
            id: 'human-review',
            question: 'Is there a human review process for flagged content?',
            type: 'yes-no',
            required: true,
            helpText: 'Human oversight helps reduce false positives'
          },
          {
            id: 'appeal-process',
            question: 'Can users appeal toxicity decisions?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'monitoring-improvement',
        title: 'Monitoring and Improvement',
        description: 'Evaluate ongoing monitoring and system improvement',
        questions: [
          {
            id: 'performance-metrics',
            question: 'What metrics are tracked for toxicity detection?',
            type: 'checkbox',
            options: [
              'Detection accuracy',
              'False positive rate',
              'False negative rate',
              'Response time',
              'Volume of toxic content',
              'User feedback on decisions'
            ],
            required: true
          },
          {
            id: 'model-updates',
            question: 'How frequently is the toxicity detection model updated?',
            type: 'radio',
            options: [
              'Continuously',
              'Monthly',
              'Quarterly',
              'Annually',
              'Not regularly updated'
            ],
            required: true
          },
          {
            id: 'bias-mitigation',
            question: 'Are measures in place to prevent bias in toxicity detection?',
            type: 'text',
            required: true,
            helpText: 'Describe how you ensure fair treatment across different demographic groups'
          }
        ]
      }
    ]
  },

  'hate-speech-detector': {
    skillId: 'hate-speech-detector',
    name: 'Hate Speech Detection Assessment',
    category: 'Societal',
    description: 'Evaluates hate speech detection and prevention measures in AI systems.',
    article: 'Articles 9, 10',
    sections: [
      {
        id: 'hate-speech-definition',
        title: 'Hate Speech Definition',
        description: 'Define what constitutes hate speech in your context',
        questions: [
          {
            id: 'protected-characteristics',
            question: 'Which protected characteristics are covered?',
            type: 'checkbox',
            options: [
              'Race and ethnicity',
              'Religion',
              'Gender and gender identity',
              'Sexual orientation',
              'Disability',
              'Age',
              'Nationality',
              'Other protected classes'
            ],
            required: true
          },
          {
            id: 'hate-speech-policy',
            question: 'Is there a documented hate speech policy?',
            type: 'yes-no',
            required: true,
            helpText: 'Clear policies help consistent enforcement'
          },
          {
            id: 'regional-considerations',
            question: 'Are regional and cultural differences in hate speech definitions considered?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'detection-system',
        title: 'Detection System',
        description: 'Assess hate speech detection capabilities',
        questions: [
          {
            id: 'detection-methods',
            question: 'What methods are used to detect hate speech?',
            type: 'checkbox',
            options: [
              'Machine learning classifiers',
              'Keyword and pattern matching',
              'Contextual analysis',
              'User reporting',
              'Third-party APIs',
              'Manual moderation'
            ],
            required: true
          },
          {
            id: 'context-awareness',
            question: 'Does the detection system consider context?',
            type: 'yes-no',
            required: true,
            helpText: 'Context is crucial to distinguish hate speech from legitimate discussion'
          },
          {
            id: 'coded-language',
            question: 'Can the system detect coded language and dog whistles?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'enforcement',
        title: 'Enforcement and Moderation',
        description: 'Define enforcement procedures for hate speech',
        questions: [
          {
            id: 'moderation-workflow',
            question: 'What is the content moderation workflow?',
            type: 'radio',
            options: [
              'Fully automated removal',
              'Automated flagging + human review',
              'User reports + human review',
              'Purely manual moderation',
              'No formal workflow'
            ],
            required: true
          },
          {
            id: 'user-consequences',
            question: 'What consequences apply to users posting hate speech?',
            type: 'checkbox',
            options: [
              'Content removal',
              'Warning',
              'Temporary suspension',
              'Permanent ban',
              'Reporting to authorities (if illegal)',
              'No consequences currently'
            ],
            required: true
          },
          {
            id: 'transparency-reporting',
            question: 'Are hate speech incidents reported transparently?',
            type: 'yes-no',
            required: true,
            helpText: 'Transparency reports demonstrate accountability'
          }
        ]
      },
      {
        id: 'accuracy-fairness',
        title: 'Accuracy and Fairness',
        description: 'Evaluate system accuracy and fairness',
        questions: [
          {
            id: 'accuracy-testing',
            question: 'How is detection accuracy measured and tested?',
            type: 'text',
            required: true
          },
          {
            id: 'false-positives',
            question: 'What is the estimated false positive rate?',
            type: 'radio',
            options: [
              'Less than 1%',
              '1-5%',
              '5-10%',
              'More than 10%',
              'Not measured'
            ],
            required: true
          },
          {
            id: 'bias-testing',
            question: 'Is the system tested for bias against particular groups?',
            type: 'yes-no',
            required: true,
            helpText: 'Critical to ensure the system doesn\'t disproportionately flag content from marginalized groups'
          }
        ]
      }
    ]
  },

  'claimbuster-api': {
    skillId: 'claimbuster-api',
    name: 'Claim Verification Assessment',
    category: 'Societal',
    description: 'Evaluates claim detection and fact-checking capabilities for misinformation prevention.',
    article: 'Articles 9, 13',
    sections: [
      {
        id: 'claim-identification',
        title: 'Claim Identification',
        description: 'Define how claims are identified and prioritized',
        questions: [
          {
            id: 'claim-detection',
            question: 'What types of claims does your system identify?',
            type: 'checkbox',
            options: [
              'Factual statements',
              'Statistical claims',
              'Causal claims',
              'Predictions',
              'Expert opinions',
              'All verifiable statements'
            ],
            required: true
          },
          {
            id: 'content-sources',
            question: 'Where are claims detected?',
            type: 'checkbox',
            options: [
              'User-generated content',
              'AI-generated outputs',
              'News articles',
              'Social media posts',
              'Comments and discussions',
              'External sources'
            ],
            required: true
          },
          {
            id: 'check-worthiness',
            question: 'How is claim check-worthiness determined?',
            type: 'text',
            required: true,
            helpText: 'Describe the process for prioritizing which claims to verify'
          }
        ]
      },
      {
        id: 'verification-process',
        title: 'Verification Process',
        description: 'Assess claim verification procedures',
        questions: [
          {
            id: 'verification-methods',
            question: 'What methods are used to verify claims?',
            type: 'checkbox',
            options: [
              'Automated fact-checking APIs',
              'Database of known facts',
              'Credible source verification',
              'Expert consultation',
              'Manual research',
              'Cross-referencing multiple sources'
            ],
            required: true
          },
          {
            id: 'evidence-sources',
            question: 'What sources are used as evidence?',
            type: 'checkbox',
            options: [
              'Academic publications',
              'Government databases',
              'Reputable news organizations',
              'Scientific journals',
              'Fact-checking organizations',
              'Primary sources'
            ],
            required: true
          },
          {
            id: 'verification-speed',
            question: 'How quickly are claims verified?',
            type: 'radio',
            options: [
              'Real-time (seconds)',
              'Minutes',
              'Hours',
              'Days',
              'Not time-constrained'
            ],
            required: true
          }
        ]
      },
      {
        id: 'result-communication',
        title: 'Result Communication',
        description: 'Define how verification results are communicated',
        questions: [
          {
            id: 'rating-system',
            question: 'What rating system is used for claims?',
            type: 'radio',
            options: [
              'True/False binary',
              'True/Mostly True/Misleading/False',
              'Numerical confidence score',
              'Multiple dimensions (accuracy, context, etc.)',
              'Not yet defined'
            ],
            required: true
          },
          {
            id: 'user-notification',
            question: 'How are users notified of verification results?',
            type: 'checkbox',
            options: [
              'Warning labels',
              'Fact-check annotations',
              'Contextual information boxes',
              'Reduced content visibility',
              'Email/push notifications',
              'No notification currently'
            ],
            required: true
          },
          {
            id: 'evidence-display',
            question: 'Is supporting evidence shown to users?',
            type: 'yes-no',
            required: true,
            helpText: 'Transparency helps users understand verification decisions'
          }
        ]
      },
      {
        id: 'quality-assurance',
        title: 'Quality Assurance',
        description: 'Evaluate verification quality and accuracy',
        questions: [
          {
            id: 'accuracy-monitoring',
            question: 'How is fact-checking accuracy monitored?',
            type: 'text',
            required: true
          },
          {
            id: 'appeals-corrections',
            question: 'Is there a process for appeals and corrections?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'expert-review',
            question: 'Are fact-checks reviewed by domain experts?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'update-frequency',
            question: 'How often are fact-checks updated as new information emerges?',
            type: 'radio',
            options: [
              'Continuously monitored',
              'Weekly reviews',
              'Monthly reviews',
              'Only when disputed',
              'Not updated after initial check'
            ],
            required: true
          }
        ]
      }
    ]
  },

  'fact-checker': {
    skillId: 'fact-checker',
    name: 'Fact-Checking System Assessment',
    category: 'Societal',
    description: 'Evaluates comprehensive fact-checking implementation for misinformation prevention.',
    article: 'Articles 9, 13',
    sections: [
      {
        id: 'fact-checking-scope',
        title: 'Fact-Checking Scope',
        description: 'Define the scope and coverage of fact-checking',
        questions: [
          {
            id: 'content-coverage',
            question: 'What content is subject to fact-checking?',
            type: 'checkbox',
            options: [
              'All AI-generated content',
              'User claims and statements',
              'News and articles',
              'Health/medical information',
              'Political content',
              'Financial claims',
              'Scientific statements'
            ],
            required: true
          },
          {
            id: 'proactive-vs-reactive',
            question: 'Is fact-checking proactive or reactive?',
            type: 'radio',
            options: [
              'Fully proactive (all content checked)',
              'Mostly proactive (high-risk content)',
              'Mixed approach',
              'Mostly reactive (user reports)',
              'Fully reactive'
            ],
            required: true
          },
          {
            id: 'topic-priorities',
            question: 'Are certain topics prioritized for fact-checking?',
            type: 'yes-no',
            required: true,
            helpText: 'High-impact topics like health and elections often need priority'
          }
        ]
      },
      {
        id: 'methodology',
        title: 'Fact-Checking Methodology',
        description: 'Assess fact-checking methods and standards',
        questions: [
          {
            id: 'standards-followed',
            question: 'What fact-checking standards or frameworks are followed?',
            type: 'checkbox',
            options: [
              'International Fact-Checking Network (IFCN) principles',
              'Journalism standards',
              'Scientific method',
              'Legal standards of evidence',
              'Custom internal standards',
              'None formally adopted'
            ],
            required: true
          },
          {
            id: 'source-evaluation',
            question: 'How are information sources evaluated for credibility?',
            type: 'text',
            required: true
          },
          {
            id: 'automated-vs-manual',
            question: 'What is the balance between automated and manual fact-checking?',
            type: 'radio',
            options: [
              '100% automated',
              'Mostly automated with human review',
              'Equal mix',
              'Mostly manual with automated assistance',
              '100% manual'
            ],
            required: true
          }
        ]
      },
      {
        id: 'accuracy-transparency',
        title: 'Accuracy and Transparency',
        description: 'Evaluate accuracy measurement and transparency',
        questions: [
          {
            id: 'accuracy-rate',
            question: 'What is the estimated accuracy rate of your fact-checking?',
            type: 'radio',
            options: [
              'Above 95%',
              '90-95%',
              '85-90%',
              'Below 85%',
              'Not measured'
            ],
            required: true
          },
          {
            id: 'methodology-disclosure',
            question: 'Is the fact-checking methodology publicly disclosed?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 13 requires transparency in AI system operations'
          },
          {
            id: 'error-correction',
            question: 'How are fact-checking errors handled?',
            type: 'text',
            required: true
          }
        ]
      },
      {
        id: 'impact-mitigation',
        title: 'Impact and Mitigation',
        description: 'Assess impact of misinformation and mitigation strategies',
        questions: [
          {
            id: 'misinformation-actions',
            question: 'What actions are taken when misinformation is detected?',
            type: 'checkbox',
            options: [
              'Content labeled/flagged',
              'Content demoted in feeds',
              'Warning shown to users',
              'Content removed',
              'Account penalties',
              'Educational resources provided'
            ],
            required: true
          },
          {
            id: 'user-education',
            question: 'Are users educated about misinformation?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'harm-assessment',
            question: 'Is the potential harm of misinformation assessed?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 9 requires risk management based on potential harm'
          }
        ]
      }
    ]
  },

  'ai-content-detector': {
    skillId: 'ai-content-detector',
    name: 'AI-Generated Content Detection Assessment',
    category: 'Societal',
    description: 'Evaluates detection and disclosure of AI-generated content.',
    article: 'Articles 13, 52',
    sections: [
      {
        id: 'detection-scope',
        title: 'Detection Scope',
        description: 'Define what AI-generated content is detected',
        questions: [
          {
            id: 'content-types',
            question: 'What types of AI-generated content are detected?',
            type: 'checkbox',
            options: [
              'Text content',
              'Images',
              'Videos',
              'Audio/speech',
              'Deepfakes',
              'Synthetic media'
            ],
            required: true
          },
          {
            id: 'detection-purpose',
            question: 'What is the primary purpose of AI content detection?',
            type: 'checkbox',
            options: [
              'Transparency and disclosure',
              'Preventing misrepresentation',
              'Content moderation',
              'Combating deepfakes',
              'Academic integrity',
              'Compliance with Article 52'
            ],
            required: true
          },
          {
            id: 'threshold-setting',
            question: 'At what confidence level is content marked as AI-generated?',
            type: 'radio',
            options: [
              'High confidence (>90%)',
              'Moderate confidence (70-90%)',
              'Low confidence (50-70%)',
              'Any probability',
              'Not yet determined'
            ],
            required: true
          }
        ]
      },
      {
        id: 'detection-methods',
        title: 'Detection Methods',
        description: 'Assess AI content detection techniques',
        questions: [
          {
            id: 'detection-tools',
            question: 'What detection methods or tools are used?',
            type: 'checkbox',
            options: [
              'Machine learning classifiers',
              'Watermarking detection',
              'Statistical analysis',
              'Metadata verification',
              'Provenance tracking',
              'Third-party APIs'
            ],
            required: true
          },
          {
            id: 'accuracy-rate',
            question: 'What is the estimated detection accuracy?',
            type: 'radio',
            options: [
              'Above 95%',
              '90-95%',
              '85-90%',
              '80-85%',
              'Below 80%',
              'Not measured'
            ],
            required: true
          },
          {
            id: 'adversarial-resistance',
            question: 'Is the detection system tested against adversarial attacks?',
            type: 'yes-no',
            required: true,
            helpText: 'Adversaries may attempt to evade detection'
          }
        ]
      },
      {
        id: 'disclosure-transparency',
        title: 'Disclosure and Transparency',
        description: 'Evaluate content disclosure practices',
        questions: [
          {
            id: 'user-notification',
            question: 'How are users notified about AI-generated content?',
            type: 'checkbox',
            options: [
              'Clear labels/badges',
              'Watermarks',
              'Metadata tags',
              'Disclaimer text',
              'Pop-up warnings',
              'No notification currently'
            ],
            required: true,
            helpText: 'Article 52 requires disclosure of AI-generated content'
          },
          {
            id: 'own-content-labeling',
            question: 'Is AI-generated content from your own system clearly labeled?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'disclosure-exceptions',
            question: 'Are there exceptions where AI content is not disclosed?',
            type: 'text',
            required: true
          }
        ]
      },
      {
        id: 'misuse-prevention',
        title: 'Misuse Prevention',
        description: 'Assess measures to prevent misuse of AI-generated content',
        questions: [
          {
            id: 'deepfake-policy',
            question: 'Is there a policy regarding deepfakes and synthetic media?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'malicious-use',
            question: 'What measures prevent malicious use of AI-generated content?',
            type: 'checkbox',
            options: [
              'Content moderation',
              'User verification requirements',
              'Rate limiting',
              'Use case restrictions',
              'Legal terms and enforcement',
              'None currently'
            ],
            required: true
          },
          {
            id: 'harm-mitigation',
            question: 'How is harm from misleading AI-generated content mitigated?',
            type: 'text',
            required: true
          }
        ]
      }
    ]
  },

  'perspective-api-societal': {
    skillId: 'perspective-api-societal',
    name: 'Content Toxicity Analysis Assessment',
    category: 'Societal',
    description: 'Evaluates comprehensive content toxicity analysis and moderation implementation.',
    article: 'Articles 9, 10',
    sections: [
      {
        id: 'toxicity-attributes',
        title: 'Toxicity Attributes',
        description: 'Define which toxicity attributes are monitored',
        questions: [
          {
            id: 'attributes-tracked',
            question: 'Which toxicity attributes are analyzed?',
            type: 'checkbox',
            options: [
              'General toxicity',
              'Severe toxicity',
              'Identity attack',
              'Insult',
              'Profanity',
              'Threat',
              'Sexually explicit content',
              'Flirtation'
            ],
            required: true
          },
          {
            id: 'scoring-approach',
            question: 'How are toxicity scores used?',
            type: 'radio',
            options: [
              'Single overall score',
              'Multiple attribute scores combined',
              'Highest score determines action',
              'Weighted combination',
              'Context-dependent interpretation'
            ],
            required: true
          },
          {
            id: 'threshold-customization',
            question: 'Are toxicity thresholds customized by context?',
            type: 'yes-no',
            required: true,
            helpText: 'Different contexts may require different sensitivity levels'
          }
        ]
      },
      {
        id: 'integration-implementation',
        title: 'Integration and Implementation',
        description: 'Assess how toxicity analysis is integrated',
        questions: [
          {
            id: 'integration-points',
            question: 'Where is toxicity analysis integrated?',
            type: 'checkbox',
            options: [
              'Content submission',
              'Real-time chat/messaging',
              'Comment posting',
              'AI output generation',
              'Content search/discovery',
              'Batch content review'
            ],
            required: true
          },
          {
            id: 'performance-optimization',
            question: 'How is API performance optimized?',
            type: 'checkbox',
            options: [
              'Caching results',
              'Batch processing',
              'Rate limiting',
              'Asynchronous processing',
              'Fallback mechanisms',
              'No optimization currently'
            ],
            required: true
          },
          {
            id: 'api-reliability',
            question: 'What happens if the API is unavailable?',
            type: 'text',
            required: true
          }
        ]
      },
      {
        id: 'moderation-workflow',
        title: 'Moderation Workflow',
        description: 'Define content moderation procedures',
        questions: [
          {
            id: 'automated-actions',
            question: 'What automated actions are triggered by high toxicity scores?',
            type: 'checkbox',
            options: [
              'Content blocked immediately',
              'Content flagged for review',
              'Warning shown to user',
              'User notified',
              'Score logged only',
              'No automated actions'
            ],
            required: true
          },
          {
            id: 'human-moderation',
            question: 'When does human moderation occur?',
            type: 'checkbox',
            options: [
              'All flagged content',
              'Borderline scores',
              'User appeals',
              'High-profile content',
              'Random sampling',
              'Never'
            ],
            required: true
          },
          {
            id: 'moderation-speed',
            question: 'What is the target timeframe for human moderation review?',
            type: 'radio',
            options: [
              'Immediate (minutes)',
              'Within 1 hour',
              'Within 24 hours',
              'Within 1 week',
              'No defined timeframe'
            ],
            required: true
          }
        ]
      },
      {
        id: 'fairness-improvement',
        title: 'Fairness and Continuous Improvement',
        description: 'Evaluate fairness and improvement processes',
        questions: [
          {
            id: 'bias-monitoring',
            question: 'Is the toxicity analysis monitored for bias?',
            type: 'yes-no',
            required: true,
            helpText: 'Toxicity models can exhibit bias against certain groups or dialects'
          },
          {
            id: 'feedback-mechanism',
            question: 'Can users provide feedback on toxicity assessments?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'accuracy-metrics',
            question: 'What metrics are used to evaluate system effectiveness?',
            type: 'checkbox',
            options: [
              'False positive rate',
              'False negative rate',
              'User satisfaction',
              'Appeal rate',
              'Time to resolution',
              'Community health indicators'
            ],
            required: true
          }
        ]
      }
    ]
  },

  'textblob-sentiment': {
    skillId: 'textblob-sentiment',
    name: 'Sentiment Analysis Assessment (TextBlob)',
    category: 'Societal',
    description: 'Evaluates sentiment analysis implementation for understanding emotional tone and user experience.',
    article: 'Articles 9, 13',
    sections: [
      {
        id: 'sentiment-application',
        title: 'Sentiment Analysis Application',
        description: 'Define how sentiment analysis is used',
        questions: [
          {
            id: 'use-cases',
            question: 'What are the primary use cases for sentiment analysis?',
            type: 'checkbox',
            options: [
              'User feedback analysis',
              'Content moderation',
              'Customer service',
              'Market research',
              'Social media monitoring',
              'AI output evaluation',
              'User experience monitoring'
            ],
            required: true
          },
          {
            id: 'content-analyzed',
            question: 'What content is subject to sentiment analysis?',
            type: 'checkbox',
            options: [
              'User comments',
              'Reviews and ratings',
              'Support tickets',
              'Social media posts',
              'AI-generated content',
              'Chat messages'
            ],
            required: true
          },
          {
            id: 'real-time-analysis',
            question: 'Is sentiment analysis performed in real-time?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'implementation-details',
        title: 'Implementation Details',
        description: 'Assess sentiment analysis implementation',
        questions: [
          {
            id: 'sentiment-dimensions',
            question: 'What sentiment dimensions are analyzed?',
            type: 'checkbox',
            options: [
              'Polarity (positive/negative)',
              'Subjectivity (objective/subjective)',
              'Intensity/strength',
              'Emotion categories',
              'Confidence scores'
            ],
            required: true
          },
          {
            id: 'language-support',
            question: 'What languages are supported?',
            type: 'radio',
            options: [
              'English only',
              'Multiple languages',
              'All major languages',
              'Custom language support',
              'Not yet determined'
            ],
            required: true
          },
          {
            id: 'context-handling',
            question: 'How is context and nuance handled?',
            type: 'text',
            required: true,
            helpText: 'Describe how sarcasm, irony, or context-dependent sentiment is addressed'
          }
        ]
      },
      {
        id: 'actionable-insights',
        title: 'Actionable Insights',
        description: 'Define how sentiment insights are used',
        questions: [
          {
            id: 'decision-making',
            question: 'How do sentiment insights inform decision-making?',
            type: 'checkbox',
            options: [
              'Product improvements',
              'Content recommendations',
              'User support prioritization',
              'Risk flagging',
              'Performance metrics',
              'Not used for decisions'
            ],
            required: true
          },
          {
            id: 'threshold-actions',
            question: 'Are specific actions triggered at sentiment thresholds?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'reporting-frequency',
            question: 'How frequently are sentiment reports generated?',
            type: 'radio',
            options: [
              'Real-time dashboards',
              'Daily',
              'Weekly',
              'Monthly',
              'Ad-hoc',
              'No regular reporting'
            ],
            required: true
          }
        ]
      },
      {
        id: 'accuracy-limitations',
        title: 'Accuracy and Limitations',
        description: 'Evaluate accuracy and known limitations',
        questions: [
          {
            id: 'accuracy-validation',
            question: 'How is sentiment analysis accuracy validated?',
            type: 'checkbox',
            options: [
              'Manual annotation comparison',
              'User feedback',
              'Cross-validation with other tools',
              'Expert review',
              'Not validated'
            ],
            required: true
          },
          {
            id: 'known-limitations',
            question: 'What are the known limitations of your sentiment analysis?',
            type: 'text',
            required: true
          },
          {
            id: 'bias-awareness',
            question: 'Are potential biases in sentiment analysis documented?',
            type: 'yes-no',
            required: true,
            helpText: 'Sentiment models may perform differently across demographics or topics'
          }
        ]
      }
    ]
  },

  'vader-sentiment': {
    skillId: 'vader-sentiment',
    name: 'Sentiment Analysis Assessment (VADER)',
    category: 'Societal',
    description: 'Evaluates VADER-based sentiment analysis for social media and informal text.',
    article: 'Articles 9, 13',
    sections: [
      {
        id: 'vader-application',
        title: 'VADER Application',
        description: 'Define VADER sentiment analysis usage',
        questions: [
          {
            id: 'content-types',
            question: 'What types of content are analyzed with VADER?',
            type: 'checkbox',
            options: [
              'Social media posts',
              'User comments',
              'Microblogging content',
              'Informal communications',
              'Reviews',
              'Chat messages'
            ],
            required: true
          },
          {
            id: 'vader-advantages',
            question: 'Why was VADER chosen for sentiment analysis?',
            type: 'checkbox',
            options: [
              'Social media optimization',
              'Handles emojis and emoticons',
              'Captures intensifiers (very, extremely)',
              'No training data required',
              'Fast performance',
              'Handles slang and informal language'
            ],
            required: true
          },
          {
            id: 'compound-score-usage',
            question: 'How is the VADER compound score used?',
            type: 'text',
            required: true,
            helpText: 'Describe threshold ranges and their interpretations'
          }
        ]
      },
      {
        id: 'integration-workflow',
        title: 'Integration and Workflow',
        description: 'Assess VADER integration in workflows',
        questions: [
          {
            id: 'processing-volume',
            question: 'What is the typical volume of content analyzed?',
            type: 'radio',
            options: [
              'Less than 1,000 items/day',
              '1,000-10,000 items/day',
              '10,000-100,000 items/day',
              '100,000-1M items/day',
              'More than 1M items/day'
            ],
            required: true
          },
          {
            id: 'processing-mode',
            question: 'How is sentiment analysis processed?',
            type: 'radio',
            options: [
              'Real-time/synchronous',
              'Near real-time (queued)',
              'Batch processing',
              'On-demand',
              'Mixed approach'
            ],
            required: true
          },
          {
            id: 'result-storage',
            question: 'Are sentiment scores stored for historical analysis?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'sentiment-actions',
        title: 'Sentiment-Based Actions',
        description: 'Define actions based on sentiment scores',
        questions: [
          {
            id: 'negative-sentiment-response',
            question: 'What happens when highly negative sentiment is detected?',
            type: 'checkbox',
            options: [
              'Alert sent to team',
              'Priority support escalation',
              'Content flagged for review',
              'User outreach initiated',
              'Logged for analysis only',
              'No specific action'
            ],
            required: true
          },
          {
            id: 'positive-sentiment-leverage',
            question: 'How is positive sentiment leveraged?',
            type: 'checkbox',
            options: [
              'Identify satisfied customers',
              'Generate testimonials',
              'Highlight positive experiences',
              'Inform product strategy',
              'Not actively leveraged'
            ],
            required: true
          },
          {
            id: 'trend-monitoring',
            question: 'Are sentiment trends monitored over time?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'performance-evaluation',
        title: 'Performance Evaluation',
        description: 'Evaluate VADER performance and accuracy',
        questions: [
          {
            id: 'accuracy-comparison',
            question: 'Has VADER accuracy been compared to ground truth data?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'edge-cases',
            question: 'What edge cases or failure modes have been identified?',
            type: 'text',
            required: true
          },
          {
            id: 'supplementary-tools',
            question: 'Are other sentiment tools used alongside VADER?',
            type: 'yes-no',
            required: true,
            helpText: 'Multiple tools can provide more robust sentiment analysis'
          },
          {
            id: 'continuous-improvement',
            question: 'How is the sentiment analysis system continuously improved?',
            type: 'text',
            required: true
          }
        ]
      }
    ]
  },

  'risk-assessment': {
    skillId: 'risk-assessment',
    name: 'Risk Assessment and Management',
    category: 'Risk Management',
    description: 'Systematic identification, analysis, and management of risks in AI systems.',
    article: 'Article 9',
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
            options: [
              'Health and safety risks',
              'Fundamental rights risks',
              'Privacy and data protection risks',
              'Security and cybersecurity risks',
              'Discrimination and bias risks',
              'Environmental risks',
              'Societal risks'
            ],
            required: true
          },
          {
            id: 'stakeholder-identification',
            question: 'Which stakeholder groups have been considered in risk identification?',
            type: 'checkbox',
            options: [
              'End users',
              'Affected individuals',
              'Operators and deployers',
              'Third parties',
              'Society at large',
              'Vulnerable groups'
            ],
            required: true
          },
          {
            id: 'risk-sources',
            question: 'What are the primary sources of risk in your system?',
            type: 'text',
            required: true,
            helpText: 'Consider model behavior, data quality, deployment context, and usage patterns'
          }
        ]
      },
      {
        id: 'risk-analysis',
        title: 'Risk Analysis',
        description: 'Analyze and evaluate identified risks',
        questions: [
          {
            id: 'risk-assessment-methodology',
            question: 'What methodology is used for risk assessment?',
            type: 'checkbox',
            options: [
              'Fundamental Rights Impact Assessment (FRIA)',
              'Data Protection Impact Assessment (DPIA)',
              'ISO 31000 risk management',
              'NIST AI Risk Management Framework',
              'Custom risk assessment framework',
              'None formally adopted'
            ],
            required: true,
            helpText: 'Article 9 requires documented risk management'
          },
          {
            id: 'severity-likelihood',
            question: 'How are risk severity and likelihood assessed?',
            type: 'radio',
            options: [
              'Qualitative assessment (High/Medium/Low)',
              'Quantitative scoring system',
              'Risk matrices',
              'Probabilistic risk assessment',
              'Expert judgment',
              'Not systematically assessed'
            ],
            required: true
          },
          {
            id: 'residual-risks',
            question: 'Are residual risks (risks after mitigation) documented?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 9 requires identification of residual risks'
          }
        ]
      },
      {
        id: 'risk-mitigation',
        title: 'Risk Mitigation',
        description: 'Define risk mitigation strategies and controls',
        questions: [
          {
            id: 'mitigation-strategies',
            question: 'What risk mitigation strategies are implemented?',
            type: 'checkbox',
            options: [
              'Technical safeguards',
              'Operational controls',
              'Human oversight',
              'Training and awareness',
              'Testing and validation',
              'Monitoring and alerting',
              'Incident response procedures'
            ],
            required: true
          },
          {
            id: 'risk-acceptance',
            question: 'Is there a process for accepting risks that cannot be fully mitigated?',
            type: 'yes-no',
            required: true,
            helpText: 'Risk acceptance should be documented with clear justification'
          },
          {
            id: 'mitigation-effectiveness',
            question: 'How is the effectiveness of risk mitigation measures evaluated?',
            type: 'text',
            required: true
          }
        ]
      },
      {
        id: 'continuous-monitoring',
        title: 'Continuous Risk Monitoring',
        description: 'Assess ongoing risk monitoring and management',
        questions: [
          {
            id: 'monitoring-frequency',
            question: 'How frequently are risks reassessed?',
            type: 'radio',
            options: [
              'Continuously (real-time monitoring)',
              'Weekly',
              'Monthly',
              'Quarterly',
              'Annually',
              'After significant changes only'
            ],
            required: true,
            helpText: 'Article 9 requires continuous risk management throughout the lifecycle'
          },
          {
            id: 'emerging-risks',
            question: 'Is there a process for identifying emerging risks?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'risk-reporting',
            question: 'Who receives risk assessment reports?',
            type: 'checkbox',
            options: [
              'Executive leadership',
              'Risk management team',
              'Development team',
              'Compliance officers',
              'Board of directors',
              'External auditors',
              'Regulators (when required)'
            ],
            required: true
          },
          {
            id: 'incident-tracking',
            question: 'Are risk-related incidents tracked and analyzed?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'documentation-compliance',
        title: 'Documentation and Compliance',
        description: 'Evaluate risk documentation and regulatory compliance',
        questions: [
          {
            id: 'risk-documentation',
            question: 'What risk management documentation is maintained?',
            type: 'checkbox',
            options: [
              'Risk register',
              'Risk assessment reports',
              'Mitigation plans',
              'Testing and validation records',
              'Incident reports',
              'Risk review meeting minutes',
              'Compliance attestations'
            ],
            required: true,
            helpText: 'Article 9 and 11 require comprehensive documentation'
          },
          {
            id: 'documentation-updates',
            question: 'How frequently is risk documentation updated?',
            type: 'radio',
            options: [
              'Real-time updates',
              'After each risk review',
              'Monthly',
              'Quarterly',
              'Annually',
              'Ad-hoc basis'
            ],
            required: true
          },
          {
            id: 'third-party-review',
            question: 'Has the risk assessment been reviewed by independent third parties?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'regulatory-alignment',
            question: 'How is alignment with EU AI Act risk requirements ensured?',
            type: 'text',
            required: true
          }
        ]
      }
    ]
  },

  // Environmental / Sustainability Tools
  'codecarbon': {
    skillId: 'codecarbon',
    name: 'CodeCarbon Assessment',
    category: 'Environmental',
    description: 'Tracks and estimates CO2 emissions produced by computing resources during AI model training and inference.',
    article: 'EU Sustainability Directives',
    sections: [
      {
        id: 'system-scope',
        title: 'System Scope',
        description: 'Define the scope of carbon emission tracking',
        questions: [
          {
            id: 'computation-type',
            question: 'What types of AI computations do you perform?',
            type: 'checkbox',
            options: [
              'Model training',
              'Model fine-tuning',
              'Inference/prediction',
              'Data preprocessing',
              'Hyperparameter tuning',
              'All of the above'
            ],
            required: true
          },
          {
            id: 'hardware-used',
            question: 'What hardware is used for AI workloads?',
            type: 'checkbox',
            options: [
              'CPUs',
              'GPUs (NVIDIA, AMD)',
              'TPUs',
              'Cloud instances (AWS, Azure, GCP)',
              'On-premises servers',
              'Edge devices'
            ],
            required: true
          },
          {
            id: 'tracking-frequency',
            question: 'How frequently should carbon emissions be tracked?',
            type: 'radio',
            options: [
              'Real-time during execution',
              'Per training job',
              'Daily aggregation',
              'Weekly reports',
              'Monthly reports'
            ],
            required: true
          }
        ]
      },
      {
        id: 'measurement-setup',
        title: 'Measurement Configuration',
        description: 'Configure carbon emission measurement parameters',
        questions: [
          {
            id: 'energy-source',
            question: 'Do you know the energy source/carbon intensity of your electricity grid?',
            type: 'yes-no',
            required: true,
            helpText: 'Carbon intensity varies by region and time of day'
          },
          {
            id: 'baseline-established',
            question: 'Have you established a baseline for carbon emissions?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'reduction-targets',
            question: 'Have you set carbon reduction targets for AI workloads?',
            type: 'yes-no',
            required: true
          }
        ]
      }
    ]
  },

  'cloud-carbon-footprint': {
    skillId: 'cloud-carbon-footprint',
    name: 'Cloud Carbon Footprint Assessment',
    category: 'Environmental',
    description: 'Measures, monitors, and reduces cloud computing carbon emissions across AWS, Azure, and GCP.',
    article: 'EU Sustainability Directives',
    sections: [
      {
        id: 'cloud-infrastructure',
        title: 'Cloud Infrastructure',
        description: 'Identify your cloud infrastructure usage',
        questions: [
          {
            id: 'cloud-providers',
            question: 'Which cloud providers do you use?',
            type: 'checkbox',
            options: [
              'Amazon Web Services (AWS)',
              'Microsoft Azure',
              'Google Cloud Platform (GCP)',
              'Other cloud providers',
              'Multi-cloud setup'
            ],
            required: true
          },
          {
            id: 'services-used',
            question: 'What cloud services are used for AI workloads?',
            type: 'checkbox',
            options: [
              'Compute instances (EC2, VMs)',
              'Managed ML services (SageMaker, Azure ML)',
              'Container services (ECS, AKS, GKE)',
              'Serverless functions (Lambda, Functions)',
              'Storage services (S3, Blob Storage)',
              'Database services'
            ],
            required: true
          },
          {
            id: 'usage-monitoring',
            question: 'Do you currently monitor cloud resource usage?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'optimization',
        title: 'Carbon Optimization',
        description: 'Assess carbon optimization strategies',
        questions: [
          {
            id: 'region-selection',
            question: 'Do you select cloud regions based on carbon intensity?',
            type: 'yes-no',
            required: true,
            helpText: 'Some regions have greener energy sources than others'
          },
          {
            id: 'resource-rightsizing',
            question: 'Do you optimize instance sizes to reduce waste?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'sustainability-reporting',
            question: 'Do you report carbon footprint to stakeholders?',
            type: 'yes-no',
            required: true
          }
        ]
      }
    ]
  },

  'ml-co2-impact': {
    skillId: 'ml-co2-impact',
    name: 'ML CO2 Impact Assessment',
    category: 'Environmental',
    description: 'Calculates CO2 emissions from machine learning model training based on hardware, runtime, and regional energy sources.',
    article: 'EU Sustainability Directives',
    sections: [
      {
        id: 'training-details',
        title: 'Training Details',
        description: 'Provide details about your ML training processes',
        questions: [
          {
            id: 'model-size',
            question: 'What is the approximate size of your ML models?',
            type: 'radio',
            options: [
              'Small (< 100M parameters)',
              'Medium (100M - 1B parameters)',
              'Large (1B - 10B parameters)',
              'Very Large (> 10B parameters)',
              'Multiple model sizes'
            ],
            required: true
          },
          {
            id: 'training-duration',
            question: 'What is the typical training duration?',
            type: 'radio',
            options: [
              'Minutes',
              'Hours',
              'Days',
              'Weeks',
              'Varies significantly'
            ],
            required: true
          },
          {
            id: 'training-frequency',
            question: 'How often do you train or retrain models?',
            type: 'radio',
            options: [
              'Daily',
              'Weekly',
              'Monthly',
              'Quarterly',
              'Ad-hoc/as needed'
            ],
            required: true
          }
        ]
      },
      {
        id: 'carbon-awareness',
        title: 'Carbon Awareness',
        description: 'Assess carbon-aware development practices',
        questions: [
          {
            id: 'efficiency-metrics',
            question: 'Do you track model efficiency metrics?',
            type: 'checkbox',
            options: [
              'Training time',
              'Energy consumption',
              'Carbon emissions',
              'Model accuracy per watt',
              'None currently'
            ],
            required: true
          },
          {
            id: 'green-ai-practices',
            question: 'What green AI practices do you implement?',
            type: 'checkbox',
            options: [
              'Model compression',
              'Knowledge distillation',
              'Efficient architectures',
              'Training time optimization',
              'Carbon-aware scheduling',
              'None currently'
            ],
            required: true
          }
        ]
      }
    ]
  },

  'watttime-carbon': {
    skillId: 'watttime-carbon',
    name: 'WattTime Carbon Assessment',
    category: 'Environmental',
    description: 'Provides real-time carbon intensity data for electricity grids to optimize AI workload scheduling.',
    article: 'EU Sustainability Directives',
    sections: [
      {
        id: 'scheduling-flexibility',
        title: 'Scheduling Flexibility',
        description: 'Assess flexibility in AI workload scheduling',
        questions: [
          {
            id: 'workload-deferrable',
            question: 'Can your AI workloads be scheduled at optimal times?',
            type: 'yes-no',
            required: true,
            helpText: 'Training jobs can often be delayed to run when grid carbon is lower'
          },
          {
            id: 'time-sensitivity',
            question: 'How time-sensitive are your AI workloads?',
            type: 'radio',
            options: [
              'Real-time (must run immediately)',
              'Minutes (can wait a few minutes)',
              'Hours (can wait several hours)',
              'Days (can wait 1-2 days)',
              'Flexible (no strict deadline)'
            ],
            required: true
          },
          {
            id: 'geographic-flexibility',
            question: 'Can workloads be moved between geographic regions?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'carbon-intelligence',
        title: 'Carbon Intelligence',
        description: 'Evaluate carbon-intelligent computing practices',
        questions: [
          {
            id: 'grid-awareness',
            question: 'Do you consider grid carbon intensity when scheduling jobs?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'automation-level',
            question: 'What level of automation do you want for carbon-aware scheduling?',
            type: 'radio',
            options: [
              'Fully automated',
              'Semi-automated with approval',
              'Manual with recommendations',
              'Monitoring only',
              'Not implemented yet'
            ],
            required: true
          },
          {
            id: 'impact-measurement',
            question: 'Do you measure the carbon impact of scheduling optimization?',
            type: 'yes-no',
            required: true
          }
        ]
      }
    ]
  },

  // Compulsory Skills / Governance Tools
  'ai-ethics': {
    skillId: 'ai-ethics',
    name: 'AI Ethics Framework Assessment',
    category: 'Governance',
    description: 'Comprehensive framework for implementing ethical AI principles including fairness, transparency, accountability, and human oversight.',
    article: 'Articles 9, 10, 13, 14',
    sections: [
      {
        id: 'ethical-principles',
        title: 'Ethical Principles',
        description: 'Define core ethical principles for your AI system',
        questions: [
          {
            id: 'principles-adopted',
            question: 'Which ethical principles has your organization adopted for AI development?',
            type: 'checkbox',
            options: [
              'Fairness and non-discrimination',
              'Transparency and explainability',
              'Accountability and responsibility',
              'Privacy and data protection',
              'Human oversight and control',
              'Safety and security',
              'Environmental sustainability',
              'Social and economic benefit'
            ],
            required: true
          },
          {
            id: 'ethics-policy',
            question: 'Is there a documented AI ethics policy?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'policy-communication',
            question: 'How is the ethics policy communicated to stakeholders?',
            type: 'text',
            required: true
          }
        ]
      },
      {
        id: 'implementation',
        title: 'Ethics Implementation',
        description: 'Assess how ethical principles are implemented',
        questions: [
          {
            id: 'design-stage',
            question: 'Are ethical considerations integrated from the design stage?',
            type: 'yes-no',
            required: true,
            helpText: 'Ethics by design ensures principles are embedded from the start'
          },
          {
            id: 'ethics-team',
            question: 'Is there a dedicated ethics team or officer?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'training-provided',
            question: 'Do development teams receive AI ethics training?',
            type: 'yes-no',
            required: true
          }
        ]
      }
    ]
  },

  'ai-ethics-advisor': {
    skillId: 'ai-ethics-advisor',
    name: 'AI Ethics Advisor Assessment',
    category: 'Governance',
    description: 'Advisory tool providing guidance on ethical AI development and deployment decisions.',
    article: 'EU AI Act General Obligations',
    sections: [
      {
        id: 'advisory-process',
        title: 'Ethics Advisory Process',
        description: 'Assess the ethics advisory framework',
        questions: [
          {
            id: 'advisory-board',
            question: 'Do you have an AI ethics advisory board or committee?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'board-composition',
            question: 'What is the composition of the ethics advisory board?',
            type: 'checkbox',
            options: [
              'Technical experts',
              'Legal experts',
              'Ethics specialists',
              'Domain experts',
              'User representatives',
              'Independent external advisors',
              'Not applicable'
            ],
            required: true
          },
          {
            id: 'consultation-frequency',
            question: 'How often is ethics guidance sought?',
            type: 'radio',
            options: [
              'For every AI project',
              'For high-risk projects only',
              'Quarterly reviews',
              'As needed',
              'Rarely or never'
            ],
            required: true
          }
        ]
      },
      {
        id: 'decision-making',
        title: 'Ethics-Informed Decisions',
        description: 'Evaluate how ethics informs decision-making',
        questions: [
          {
            id: 'decision-documentation',
            question: 'Are ethics considerations documented in decision records?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'conflict-resolution',
            question: 'Is there a process for resolving ethical conflicts?',
            type: 'yes-no',
            required: true,
            helpText: 'How are conflicts between business goals and ethics resolved?'
          }
        ]
      }
    ]
  },

  'ai-governance': {
    skillId: 'ai-governance',
    name: 'AI Governance Assessment',
    category: 'Governance',
    description: 'Establishes governance structures and processes for responsible AI development and deployment.',
    article: 'Articles 8-17',
    sections: [
      {
        id: 'governance-structure',
        title: 'Governance Structure',
        description: 'Define governance roles and responsibilities',
        questions: [
          {
            id: 'governance-framework',
            question: 'Is there a formal AI governance framework?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'roles-defined',
            question: 'Are AI governance roles and responsibilities clearly defined?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'key-roles',
            question: 'Which governance roles exist in your organization?',
            type: 'checkbox',
            options: [
              'AI Ethics Officer',
              'Data Protection Officer',
              'Chief AI Officer',
              'AI Risk Manager',
              'Compliance Officer',
              'AI Audit Team',
              'None currently'
            ],
            required: true
          }
        ]
      },
      {
        id: 'policies-procedures',
        title: 'Policies and Procedures',
        description: 'Assess governance policies and procedures',
        questions: [
          {
            id: 'documented-policies',
            question: 'Are AI development and deployment policies documented?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'policy-review',
            question: 'How often are AI governance policies reviewed?',
            type: 'radio',
            options: [
              'Quarterly',
              'Annually',
              'Every 2 years',
              'As needed',
              'Not regularly reviewed'
            ],
            required: true
          },
          {
            id: 'stakeholder-involvement',
            question: 'Are stakeholders involved in governance decisions?',
            type: 'yes-no',
            required: true
          }
        ]
      }
    ]
  },

  'ethics-review': {
    skillId: 'ethics-review',
    name: 'Ethics Review Board Assessment',
    category: 'Governance',
    description: 'Structured ethics review process for evaluating AI systems before deployment.',
    article: 'Article 27',
    sections: [
      {
        id: 'review-process',
        title: 'Ethics Review Process',
        description: 'Define the ethics review workflow',
        questions: [
          {
            id: 'review-required',
            question: 'Is ethics review required before AI system deployment?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'review-criteria',
            question: 'What criteria are used in ethics review?',
            type: 'checkbox',
            options: [
              'Fundamental rights impact',
              'Fairness and bias',
              'Privacy implications',
              'Safety considerations',
              'Transparency requirements',
              'Social impact',
              'Environmental impact'
            ],
            required: true
          },
          {
            id: 'independent-review',
            question: 'Is the review conducted by independent reviewers?',
            type: 'yes-no',
            required: true,
            helpText: 'Independent review reduces conflicts of interest'
          }
        ]
      },
      {
        id: 'review-outcomes',
        title: 'Review Outcomes',
        description: 'Assess how review findings are handled',
        questions: [
          {
            id: 'approval-process',
            question: 'What are the possible outcomes of ethics review?',
            type: 'checkbox',
            options: [
              'Approved for deployment',
              'Approved with conditions',
              'Requires modifications',
              'Rejected',
              'Escalated for further review'
            ],
            required: true
          },
          {
            id: 'tracking-issues',
            question: 'Are ethics issues tracked to resolution?',
            type: 'yes-no',
            required: true
          }
        ]
      }
    ]
  },

  'validating-ai-ethics-and-fairness': {
    skillId: 'validating-ai-ethics-and-fairness',
    name: 'Validating AI Ethics and Fairness Assessment',
    category: 'Governance',
    description: 'Comprehensive validation toolkit for assessing AI system ethics and fairness.',
    article: 'Articles 10, 29',
    sections: [
      {
        id: 'fairness-testing',
        title: 'Fairness Testing',
        description: 'Assess fairness validation methods',
        questions: [
          {
            id: 'bias-testing',
            question: 'What bias testing methods are used?',
            type: 'checkbox',
            options: [
              'Demographic parity analysis',
              'Equal opportunity testing',
              'Calibration testing',
              'Intersectional bias analysis',
              'Adversarial testing',
              'None currently'
            ],
            required: true
          },
          {
            id: 'protected-attributes',
            question: 'Which protected attributes are tested for discrimination?',
            type: 'checkbox',
            options: [
              'Gender',
              'Race/ethnicity',
              'Age',
              'Disability',
              'Religion',
              'Sexual orientation',
              'Other protected characteristics'
            ],
            required: true
          },
          {
            id: 'fairness-metrics',
            question: 'Are fairness metrics defined and measured?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'validation-results',
        title: 'Validation and Remediation',
        description: 'Evaluate validation outcomes and remediation',
        questions: [
          {
            id: 'remediation-process',
            question: 'Is there a process for remediating fairness issues?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'validation-frequency',
            question: 'How often is ethics and fairness validation performed?',
            type: 'radio',
            options: [
              'Before every deployment',
              'Quarterly',
              'Annually',
              'When major changes occur',
              'Only once during development'
            ],
            required: true
          }
        ]
      }
    ]
  },

  'ai-logging-system': {
    skillId: 'ai-logging-system',
    name: 'AI Logging System Assessment',
    category: 'Governance',
    description: 'Automated logging system for AI operations capturing decisions, inputs, outputs, and system events.',
    article: 'Article 12',
    sections: [
      {
        id: 'logging-scope',
        title: 'Logging Scope',
        description: 'Define what is logged in the AI system',
        questions: [
          {
            id: 'logged-data',
            question: 'What information is logged?',
            type: 'checkbox',
            options: [
              'Input data',
              'Output/decisions',
              'Model version',
              'Timestamps',
              'User identifiers',
              'Confidence scores',
              'System events',
              'Errors and exceptions'
            ],
            required: true
          },
          {
            id: 'logging-automatic',
            question: 'Is logging fully automated?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 12 requires automatic logging for high-risk systems'
          },
          {
            id: 'retention-period',
            question: 'What is the log retention period?',
            type: 'text',
            required: true,
            helpText: 'Specify duration (e.g., 6 months, 1 year, indefinite)'
          }
        ]
      },
      {
        id: 'log-management',
        title: 'Log Management and Access',
        description: 'Assess log storage and accessibility',
        questions: [
          {
            id: 'log-security',
            question: 'Are logs securely stored and protected from tampering?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'log-access',
            question: 'Who has access to AI system logs?',
            type: 'checkbox',
            options: [
              'AI system operators',
              'Compliance team',
              'Auditors',
              'Regulators (upon request)',
              'Affected individuals (upon request)',
              'Other authorized personnel'
            ],
            required: true
          },
          {
            id: 'audit-trail',
            question: 'Is there an audit trail for log access?',
            type: 'yes-no',
            required: true
          }
        ]
      }
    ]
  },

  'ai-system-registry': {
    skillId: 'ai-system-registry',
    name: 'AI System Registry Assessment',
    category: 'Governance',
    description: 'Central registry for documenting and tracking AI systems throughout their lifecycle.',
    article: 'Article 71',
    sections: [
      {
        id: 'registry-content',
        title: 'Registry Content',
        description: 'Define what information is maintained in the registry',
        questions: [
          {
            id: 'registered-info',
            question: 'What information is recorded for each AI system?',
            type: 'checkbox',
            options: [
              'System name and identifier',
              'Provider details',
              'Purpose and intended use',
              'Risk classification',
              'Deployment date',
              'Conformity assessment status',
              'Performance metrics',
              'Incident history'
            ],
            required: true
          },
          {
            id: 'registry-updated',
            question: 'How often is the registry updated?',
            type: 'radio',
            options: [
              'Real-time',
              'Daily',
              'Weekly',
              'Monthly',
              'As changes occur'
            ],
            required: true
          },
          {
            id: 'version-tracking',
            question: 'Are AI system versions tracked in the registry?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'registry-access',
        title: 'Registry Access and Reporting',
        description: 'Assess registry accessibility and reporting',
        questions: [
          {
            id: 'stakeholder-access',
            question: 'Which stakeholders can access the registry?',
            type: 'checkbox',
            options: [
              'Internal development teams',
              'Management',
              'Compliance officers',
              'Internal auditors',
              'External auditors',
              'Regulators'
            ],
            required: true
          },
          {
            id: 'eu-database',
            question: 'For high-risk systems, is registration with the EU database planned?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 71 requires EU database registration for high-risk AI systems'
          }
        ]
      }
    ]
  },

  'qms-tracker': {
    skillId: 'qms-tracker',
    name: 'Quality Management System Tracker Assessment',
    category: 'Governance',
    description: 'Tracks quality management system implementation and maintenance for AI systems.',
    article: 'Article 17',
    sections: [
      {
        id: 'qms-framework',
        title: 'QMS Framework',
        description: 'Assess the quality management system framework',
        questions: [
          {
            id: 'qms-established',
            question: 'Is a Quality Management System established per Article 17?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'qms-components',
            question: 'Which QMS components are implemented?',
            type: 'checkbox',
            options: [
              'Design and development controls',
              'Quality control procedures',
              'Change management processes',
              'Risk management system',
              'Technical documentation',
              'Post-market monitoring',
              'Incident reporting',
              'Corrective and preventive actions (CAPA)'
            ],
            required: true
          },
          {
            id: 'qms-standard',
            question: 'Is the QMS based on a recognized standard?',
            type: 'radio',
            options: [
              'ISO 9001',
              'ISO 13485 (medical devices)',
              'Custom framework',
              'No formal standard',
              'Other'
            ],
            required: true
          }
        ]
      },
      {
        id: 'qms-monitoring',
        title: 'QMS Monitoring and Improvement',
        description: 'Evaluate QMS monitoring and continuous improvement',
        questions: [
          {
            id: 'internal-audits',
            question: 'Are internal QMS audits conducted?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'audit-frequency',
            question: 'How often are QMS audits performed?',
            type: 'radio',
            options: [
              'Quarterly',
              'Semi-annually',
              'Annually',
              'As needed',
              'No regular audits'
            ],
            required: true
          },
          {
            id: 'continuous-improvement',
            question: 'Is there a process for continuous QMS improvement?',
            type: 'yes-no',
            required: true
          }
        ]
      }
    ]
  },

  'ce-marking-generator': {
    skillId: 'ce-marking-generator',
    name: 'CE Marking Generator Assessment',
    category: 'Governance',
    description: 'Generates CE marking documentation for high-risk AI systems entering the EU market.',
    article: 'Article 49',
    sections: [
      {
        id: 'conformity-assessment',
        title: 'Conformity Assessment',
        description: 'Assess conformity assessment readiness',
        questions: [
          {
            id: 'high-risk-classification',
            question: 'Is your AI system classified as high-risk per Annex III?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'conformity-procedure',
            question: 'Which conformity assessment procedure applies?',
            type: 'radio',
            options: [
              'Internal control (Article 43)',
              'Quality management system + technical documentation (Article 43)',
              'EU type examination (Article 44)',
              'Quality assurance (Article 45)',
              'Not yet determined'
            ],
            required: true
          },
          {
            id: 'notified-body',
            question: 'Is a notified body required for conformity assessment?',
            type: 'yes-no',
            required: true,
            helpText: 'Some high-risk systems require notified body involvement'
          }
        ]
      },
      {
        id: 'ce-documentation',
        title: 'CE Marking Documentation',
        description: 'Evaluate CE marking documentation readiness',
        questions: [
          {
            id: 'declaration-of-conformity',
            question: 'Has an EU Declaration of Conformity been prepared?',
            type: 'yes-no',
            required: true,
            helpText: 'Required per Article 48 before CE marking'
          },
          {
            id: 'technical-documentation',
            question: 'Is technical documentation complete per Article 11?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'ce-marking-ready',
            question: 'Is the AI system ready for CE marking affixing?',
            type: 'yes-no',
            required: true,
            helpText: 'CE marking indicates conformity with all applicable requirements'
          }
        ]
      }
    ]
  },

  // Fairness & Bias Detection Tools
  'ai-fairness-360': {
    skillId: 'ai-fairness-360',
    name: 'AI Fairness 360 (AIF360) Assessment',
    category: 'Fairness',
    description: 'Comprehensive toolkit from IBM to examine, report, and mitigate discrimination and bias in machine learning models. Provides over 70 fairness metrics and 10 bias mitigation algorithms.',
    article: 'Article 10',
    sections: [
      {
        id: 'dataset-analysis',
        title: 'Dataset Bias Analysis',
        description: 'Analyze training and testing datasets for bias',
        questions: [
          {
            id: 'protected-attributes',
            question: 'Which protected attributes are present in your dataset?',
            type: 'checkbox',
            options: [
              'Race/Ethnicity',
              'Gender',
              'Age',
              'Disability status',
              'Religion',
              'Sexual orientation',
              'National origin',
              'Other protected characteristics'
            ],
            required: true
          },
          {
            id: 'dataset-balance',
            question: 'Is your dataset balanced across protected groups?',
            type: 'radio',
            options: [
              'Yes - All groups are well represented',
              'Partially - Some imbalance exists',
              'No - Significant imbalance across groups',
              'Not yet analyzed'
            ],
            required: true
          },
          {
            id: 'bias-metrics-calculated',
            question: 'Which AIF360 dataset bias metrics have you calculated?',
            type: 'checkbox',
            options: [
              'Statistical Parity Difference',
              'Disparate Impact',
              'Equal Opportunity Difference',
              'Average Odds Difference',
              'Theil Index',
              'Consistency Score',
              'None yet'
            ],
            required: true
          }
        ]
      },
      {
        id: 'preprocessing-mitigation',
        title: 'Pre-processing Bias Mitigation',
        description: 'Apply bias mitigation techniques before model training',
        questions: [
          {
            id: 'preprocessing-algorithms',
            question: 'Which pre-processing algorithms are you using?',
            type: 'checkbox',
            options: [
              'Reweighing',
              'Optimized Preprocessing',
              'Learning Fair Representations',
              'Disparate Impact Remover',
              'None - No pre-processing applied'
            ],
            required: true
          },
          {
            id: 'preprocessing-effectiveness',
            question: 'Have you measured the effectiveness of pre-processing mitigation?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'inprocessing-mitigation',
        title: 'In-processing Bias Mitigation',
        description: 'Apply fairness constraints during model training',
        questions: [
          {
            id: 'inprocessing-algorithms',
            question: 'Which in-processing algorithms are you using?',
            type: 'checkbox',
            options: [
              'Adversarial Debiasing',
              'Prejudice Remover',
              'Meta Fair Classifier',
              'Exponentiated Gradient Reduction',
              'Grid Search Reduction',
              'None - No in-processing applied'
            ],
            required: true
          },
          {
            id: 'fairness-constraints',
            question: 'Which fairness constraints are applied during training?',
            type: 'checkbox',
            options: [
              'Demographic Parity',
              'Equalized Odds',
              'Equal Opportunity',
              'Bounded Group Loss',
              'None specified'
            ],
            required: true
          }
        ]
      },
      {
        id: 'postprocessing-mitigation',
        title: 'Post-processing Bias Mitigation',
        description: 'Adjust model predictions to improve fairness',
        questions: [
          {
            id: 'postprocessing-algorithms',
            question: 'Which post-processing algorithms are you using?',
            type: 'checkbox',
            options: [
              'Calibrated Equalized Odds',
              'Reject Option Classification',
              'Equalized Odds Postprocessing',
              'None - No post-processing applied'
            ],
            required: true
          },
          {
            id: 'accuracy-fairness-tradeoff',
            question: 'Have you analyzed the accuracy-fairness tradeoff?',
            type: 'yes-no',
            required: true,
            helpText: 'Document the impact of fairness interventions on model accuracy'
          }
        ]
      },
      {
        id: 'fairness-monitoring',
        title: 'Fairness Monitoring and Reporting',
        description: 'Continuous monitoring and reporting of fairness metrics',
        questions: [
          {
            id: 'monitoring-frequency',
            question: 'How frequently do you monitor fairness metrics?',
            type: 'radio',
            options: [
              'Real-time continuous monitoring',
              'Daily',
              'Weekly',
              'Monthly',
              'Quarterly',
              'No regular monitoring'
            ],
            required: true
          },
          {
            id: 'fairness-reporting',
            question: 'Do you generate fairness reports for stakeholders?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'remediation-process',
            question: 'Is there a process to remediate fairness issues when detected?',
            type: 'yes-no',
            required: true
          }
        ]
      }
    ]
  },

  'fairlearn': {
    skillId: 'fairlearn',
    name: 'Fairlearn Assessment',
    category: 'Fairness',
    description: 'Python package for assessing and improving fairness of machine learning models. Offers fairness metrics and mitigation algorithms.',
    article: 'Article 10',
    sections: [
      {
        id: 'fairness-assessment',
        title: 'Fairness Assessment',
        description: 'Assess model fairness across sensitive features',
        questions: [
          {
            id: 'sensitive-features',
            question: 'Which sensitive features are you analyzing?',
            type: 'checkbox',
            options: [
              'Gender',
              'Race',
              'Age group',
              'Disability status',
              'Geographic location',
              'Socioeconomic status',
              'Other'
            ],
            required: true
          },
          {
            id: 'fairness-metrics-used',
            question: 'Which Fairlearn metrics are you using?',
            type: 'checkbox',
            options: [
              'Demographic Parity Difference/Ratio',
              'Equalized Odds Difference/Ratio',
              'True Positive Rate Difference',
              'False Positive Rate Difference',
              'Selection Rate',
              'Count metrics',
              'None yet'
            ],
            required: true
          },
          {
            id: 'fairness-dashboard',
            question: 'Are you using the Fairlearn Dashboard for visualization?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'mitigation-algorithms',
        title: 'Mitigation Algorithms',
        description: 'Apply Fairlearn mitigation algorithms',
        questions: [
          {
            id: 'mitigation-approach',
            question: 'Which mitigation approach are you using?',
            type: 'checkbox',
            options: [
              'GridSearch - Trains multiple models with fairness constraints',
              'ExponentiatedGradient - Reduces fairness violations',
              'ThresholdOptimizer - Adjusts decision thresholds post-hoc',
              'None yet'
            ],
            required: true
          },
          {
            id: 'fairness-constraint-type',
            question: 'Which fairness constraint are you enforcing?',
            type: 'radio',
            options: [
              'Demographic Parity',
              'Equalized Odds',
              'Equal Opportunity',
              'Bounded Group Loss',
              'Error Rate Parity',
              'Not yet determined'
            ],
            required: true
          },
          {
            id: 'performance-impact',
            question: 'Have you documented the impact on model performance?',
            type: 'yes-no',
            required: true,
            helpText: 'Document accuracy, precision, recall changes after mitigation'
          }
        ]
      },
      {
        id: 'intersectional-analysis',
        title: 'Intersectional Fairness',
        description: 'Analyze fairness across intersecting sensitive features',
        questions: [
          {
            id: 'intersectional-groups',
            question: 'Are you analyzing intersectional groups (e.g., race + gender)?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'subgroup-disparities',
            question: 'Have you identified disparities in intersectional subgroups?',
            type: 'yes-no',
            required: true
          }
        ]
      }
    ]
  },

  'aequitas': {
    skillId: 'aequitas',
    name: 'Aequitas Bias Audit Assessment',
    category: 'Fairness',
    description: 'Bias and fairness audit toolkit for machine learning models. Provides comprehensive fairness metrics and interactive bias report generation.',
    article: 'Article 10',
    sections: [
      {
        id: 'audit-preparation',
        title: 'Audit Preparation',
        description: 'Prepare data and model for Aequitas audit',
        questions: [
          {
            id: 'reference-group',
            question: 'Have you identified reference groups for comparison?',
            type: 'yes-no',
            required: true,
            helpText: 'Reference group is the baseline for fairness comparisons'
          },
          {
            id: 'protected-groups',
            question: 'Which protected groups are included in the audit?',
            type: 'checkbox',
            options: [
              'Race/Ethnicity groups',
              'Gender groups',
              'Age groups',
              'Income groups',
              'Geographic groups',
              'Education levels',
              'Other demographic groups'
            ],
            required: true
          },
          {
            id: 'model-predictions',
            question: 'Do you have model predictions with group labels for audit?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'fairness-metrics',
        title: 'Fairness Metrics Analysis',
        description: 'Calculate and analyze Aequitas fairness metrics',
        questions: [
          {
            id: 'metrics-calculated',
            question: 'Which Aequitas fairness metrics are you using?',
            type: 'checkbox',
            options: [
              'False Positive Rate (FPR) Parity',
              'False Negative Rate (FNR) Parity',
              'False Discovery Rate (FDR) Parity',
              'False Omission Rate (FOR) Parity',
              'Precision Parity (PPV)',
              'Negative Predictive Value Parity (NPV)',
              'Selection Rate / Statistical Parity',
              'Type I/II Error Balance'
            ],
            required: true
          },
          {
            id: 'disparity-tolerance',
            question: 'What disparity tolerance threshold are you using?',
            type: 'radio',
            options: [
              '0.8-1.25 (80% rule - standard)',
              '0.9-1.11 (stricter)',
              '0.7-1.43 (more lenient)',
              'Custom threshold',
              'Not yet defined'
            ],
            required: true
          }
        ]
      },
      {
        id: 'bias-report',
        title: 'Bias Report Generation',
        description: 'Generate and review Aequitas bias reports',
        questions: [
          {
            id: 'report-generated',
            question: 'Have you generated an Aequitas bias report?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'violations-identified',
            question: 'Has the report identified any fairness violations?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'mitigation-plan',
            question: 'Have you documented a mitigation plan for identified violations?',
            type: 'text',
            required: true,
            helpText: 'Describe your approach to address fairness violations'
          }
        ]
      },
      {
        id: 'stakeholder-review',
        title: 'Stakeholder Review',
        description: 'Share and review bias audit with stakeholders',
        questions: [
          {
            id: 'stakeholders-informed',
            question: 'Have stakeholders reviewed the bias audit results?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'documentation-maintained',
            question: 'Is the bias audit documentation maintained for compliance?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 11 requires maintenance of technical documentation'
          }
        ]
      }
    ]
  },

  'bias-assessment': {
    skillId: 'bias-assessment',
    name: 'Bias Assessment',
    category: 'Fairness',
    description: 'Systematic evaluation framework for identifying and quantifying algorithmic bias in AI systems.',
    article: 'Article 10',
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
            options: [
              'Historical bias in training data',
              'Representation bias (underrepresented groups)',
              'Measurement bias (proxy variables)',
              'Aggregation bias (one-size-fits-all)',
              'Evaluation bias (inappropriate metrics)',
              'Deployment bias (different context)',
              'Label bias (biased annotations)'
            ],
            required: true
          },
          {
            id: 'bias-types',
            question: 'Which types of algorithmic bias are you assessing?',
            type: 'checkbox',
            options: [
              'Selection bias',
              'Confirmation bias',
              'Automation bias',
              'Sample bias',
              'Exclusion bias',
              'Observer bias',
              'Recall bias'
            ],
            required: true
          }
        ]
      },
      {
        id: 'quantitative-assessment',
        title: 'Quantitative Bias Assessment',
        description: 'Measure bias using quantitative metrics',
        questions: [
          {
            id: 'disparate-impact',
            question: 'Have you calculated disparate impact ratios?',
            type: 'yes-no',
            required: true,
            helpText: 'Ratio of favorable outcomes between protected and reference groups'
          },
          {
            id: 'impact-ratio-value',
            question: 'What is the disparate impact ratio (if calculated)?',
            type: 'radio',
            options: [
              'Above 0.8 (acceptable)',
              '0.6 to 0.8 (moderate concern)',
              'Below 0.6 (significant concern)',
              'Not yet calculated'
            ],
            required: true
          },
          {
            id: 'statistical-tests',
            question: 'Which statistical tests have you performed?',
            type: 'checkbox',
            options: [
              'Chi-square test for independence',
              'T-test for mean differences',
              'ANOVA for multiple groups',
              'Regression analysis',
              'Correlation analysis',
              'None yet'
            ],
            required: true
          }
        ]
      },
      {
        id: 'qualitative-assessment',
        title: 'Qualitative Bias Assessment',
        description: 'Conduct qualitative bias analysis',
        questions: [
          {
            id: 'case-studies',
            question: 'Have you conducted case studies of model decisions?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'expert-review',
            question: 'Have domain experts reviewed the system for bias?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'user-feedback',
            question: 'Have you collected user feedback about fairness?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'bias-mitigation',
        title: 'Bias Mitigation Strategy',
        description: 'Define and implement bias mitigation',
        questions: [
          {
            id: 'mitigation-strategies',
            question: 'Which bias mitigation strategies are you implementing?',
            type: 'checkbox',
            options: [
              'Data augmentation for underrepresented groups',
              'Re-sampling techniques',
              'Feature engineering to remove proxies',
              'Algorithmic debiasing',
              'Threshold optimization',
              'Human review for edge cases',
              'Regular bias audits'
            ],
            required: true
          },
          {
            id: 'effectiveness-measured',
            question: 'Have you measured mitigation effectiveness?',
            type: 'yes-no',
            required: true
          }
        ]
      }
    ]
  },

  'disaggregated-evaluation': {
    skillId: 'disaggregated-evaluation',
    name: 'Disaggregated Evaluation Assessment',
    category: 'Fairness',
    description: 'Evaluates model performance separately across different demographic subgroups to identify performance disparities.',
    article: 'Article 15',
    sections: [
      {
        id: 'subgroup-definition',
        title: 'Subgroup Definition',
        description: 'Define demographic subgroups for evaluation',
        questions: [
          {
            id: 'demographic-dimensions',
            question: 'Which demographic dimensions are you evaluating?',
            type: 'checkbox',
            options: [
              'Gender (male, female, non-binary)',
              'Race/Ethnicity',
              'Age groups',
              'Geographic location',
              'Language',
              'Disability status',
              'Socioeconomic status',
              'Education level'
            ],
            required: true
          },
          {
            id: 'subgroup-size',
            question: 'Are all subgroups sufficiently large for statistical validity?',
            type: 'radio',
            options: [
              'Yes - All subgroups have adequate samples (n>100)',
              'Mostly - Some small subgroups (n=30-100)',
              'No - Several very small subgroups (n<30)',
              'Not yet assessed'
            ],
            required: true
          },
          {
            id: 'intersectional-subgroups',
            question: 'Are you evaluating intersectional subgroups?',
            type: 'yes-no',
            required: true,
            helpText: 'E.g., young women, elderly minorities, etc.'
          }
        ]
      },
      {
        id: 'performance-metrics',
        title: 'Performance Metrics by Subgroup',
        description: 'Calculate performance metrics for each subgroup',
        questions: [
          {
            id: 'metrics-calculated',
            question: 'Which performance metrics are calculated per subgroup?',
            type: 'checkbox',
            options: [
              'Accuracy',
              'Precision',
              'Recall/Sensitivity',
              'F1 Score',
              'AUC-ROC',
              'Mean Absolute Error (MAE)',
              'Root Mean Squared Error (RMSE)',
              'False Positive Rate',
              'False Negative Rate'
            ],
            required: true
          },
          {
            id: 'performance-disparities',
            question: 'Have you identified significant performance disparities?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'worst-performing',
            question: 'What is the performance gap between best and worst subgroups?',
            type: 'radio',
            options: [
              'Less than 5% - Minimal disparity',
              '5-10% - Moderate disparity',
              '10-20% - Significant disparity',
              'Over 20% - Critical disparity',
              'Not yet measured'
            ],
            required: true
          }
        ]
      },
      {
        id: 'error-analysis',
        title: 'Error Analysis by Subgroup',
        description: 'Analyze error patterns across subgroups',
        questions: [
          {
            id: 'error-types',
            question: 'Which error types are analyzed per subgroup?',
            type: 'checkbox',
            options: [
              'False positives',
              'False negatives',
              'True positive rates',
              'True negative rates',
              'Error severity',
              'Confidence scores on errors'
            ],
            required: true
          },
          {
            id: 'error-patterns',
            question: 'Have you identified systematic error patterns in specific subgroups?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'high-impact-errors',
            question: 'Are certain subgroups experiencing more high-impact errors?',
            type: 'yes-no',
            required: true,
            helpText: 'High-impact errors have severe consequences for affected individuals'
          }
        ]
      },
      {
        id: 'reporting-mitigation',
        title: 'Reporting and Mitigation',
        description: 'Report findings and implement improvements',
        questions: [
          {
            id: 'disaggregated-report',
            question: 'Have you created a disaggregated evaluation report?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'mitigation-actions',
            question: 'What actions are you taking to address disparities?',
            type: 'checkbox',
            options: [
              'Collecting more data for underperforming groups',
              'Re-training with balanced data',
              'Group-specific model calibration',
              'Ensemble methods',
              'Human review for affected subgroups',
              'Adjusting decision thresholds',
              'No action needed - acceptable performance'
            ],
            required: true
          },
          {
            id: 'continuous-monitoring',
            question: 'Is disaggregated performance monitored continuously in production?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 72 requires post-market monitoring'
          }
        ]
      }
    ]
  },

  'perspective-api': {
    skillId: 'perspective-api',
    name: 'Perspective API Assessment',
    category: 'Fairness',
    description: 'Uses machine learning to identify toxic, threatening, or unwelcome comments that may deter participation in online conversations.',
    article: 'Article 52',
    sections: [
      {
        id: 'toxicity-detection-setup',
        title: 'Toxicity Detection Setup',
        description: 'Configure Perspective API for your use case',
        questions: [
          {
            id: 'attributes-monitored',
            question: 'Which Perspective API attributes are you monitoring?',
            type: 'checkbox',
            options: [
              'TOXICITY - General toxic comments',
              'SEVERE_TOXICITY - Very hateful/aggressive comments',
              'IDENTITY_ATTACK - Negative/hateful comments about identity',
              'INSULT - Insulting/inflammatory comments',
              'PROFANITY - Swear words and obscene language',
              'THREAT - Threats of violence',
              'SEXUALLY_EXPLICIT - Sexually explicit content',
              'FLIRTATION - Flirtatious comments'
            ],
            required: true
          },
          {
            id: 'language-support',
            question: 'Which languages are you analyzing?',
            type: 'checkbox',
            options: [
              'English',
              'Spanish',
              'French',
              'German',
              'Portuguese',
              'Italian',
              'Russian',
              'Other languages'
            ],
            required: true
          },
          {
            id: 'threshold-levels',
            question: 'What toxicity threshold are you using for moderation?',
            type: 'radio',
            options: [
              'Strict - Score > 0.3',
              'Moderate - Score > 0.5',
              'Lenient - Score > 0.7',
              'Custom thresholds per attribute',
              'Not yet defined'
            ],
            required: true
          }
        ]
      },
      {
        id: 'implementation',
        title: 'Implementation and Integration',
        description: 'Integrate Perspective API into your system',
        questions: [
          {
            id: 'integration-point',
            question: 'Where is Perspective API integrated?',
            type: 'checkbox',
            options: [
              'User input validation (pre-submission)',
              'Content moderation queue',
              'Real-time comment filtering',
              'Post-publication review',
              'User reporting system enhancement',
              'Analytics and monitoring dashboard'
            ],
            required: true
          },
          {
            id: 'user-feedback',
            question: 'Do users receive feedback when toxic content is detected?',
            type: 'yes-no',
            required: true,
            helpText: 'Transparency helps users understand and adjust their comments'
          },
          {
            id: 'appeals-process',
            question: 'Is there an appeals process for moderation decisions?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'bias-fairness',
        title: 'Bias and Fairness Considerations',
        description: 'Ensure fair application of toxicity detection',
        questions: [
          {
            id: 'identity-bias-aware',
            question: 'Are you aware that Perspective API may have biases in identity terms?',
            type: 'yes-no',
            required: true,
            helpText: 'Identity terms (e.g., "gay", "black") may trigger false positives'
          },
          {
            id: 'false-positive-review',
            question: 'Do you have a process to review and correct false positives?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'context-consideration',
            question: 'How do you handle context-dependent toxicity?',
            type: 'radio',
            options: [
              'Human moderators review borderline cases',
              'Multiple API attributes combined',
              'Domain-specific customization',
              'User reputation considered',
              'Not yet addressed'
            ],
            required: true
          }
        ]
      },
      {
        id: 'monitoring-improvement',
        title: 'Monitoring and Continuous Improvement',
        description: 'Monitor effectiveness and improve over time',
        questions: [
          {
            id: 'effectiveness-metrics',
            question: 'Which metrics do you track for moderation effectiveness?',
            type: 'checkbox',
            options: [
              'False positive rate',
              'False negative rate',
              'User satisfaction with moderation',
              'Appeal success rate',
              'Volume of toxic content detected',
              'Time to moderation action',
              'None yet'
            ],
            required: true
          },
          {
            id: 'model-updates',
            question: 'Do you stay updated with Perspective API model improvements?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'community-health',
            question: 'Has community health improved since implementing Perspective API?',
            type: 'radio',
            options: [
              'Yes - Significant improvement',
              'Yes - Moderate improvement',
              'No noticeable change',
              'Too early to tell',
              'Not measured'
            ],
            required: true
          }
        ]
      }
    ]
  },

  'moderate-content-api': {
    skillId: 'moderate-content-api',
    name: 'Content Moderation API Assessment',
    category: 'Fairness',
    description: 'Automated content moderation system that detects inappropriate, offensive, or biased content in AI-generated outputs.',
    article: 'Article 52',
    sections: [
      {
        id: 'moderation-scope',
        title: 'Moderation Scope Definition',
        description: 'Define what content requires moderation',
        questions: [
          {
            id: 'content-types',
            question: 'Which content types are moderated?',
            type: 'checkbox',
            options: [
              'Text (comments, posts, messages)',
              'Images',
              'Videos',
              'Audio',
              'Links and URLs',
              'User profiles',
              'AI-generated content'
            ],
            required: true
          },
          {
            id: 'violation-categories',
            question: 'Which violation categories does your system detect?',
            type: 'checkbox',
            options: [
              'Hate speech and discrimination',
              'Violence and threats',
              'Sexual content',
              'Harassment and bullying',
              'Spam and scams',
              'Misinformation',
              'Illegal content',
              'Copyright violations',
              'Personal information exposure'
            ],
            required: true
          },
          {
            id: 'severity-levels',
            question: 'Do you classify violations by severity?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'detection-methods',
        title: 'Detection Methods',
        description: 'Configure detection and filtering methods',
        questions: [
          {
            id: 'detection-techniques',
            question: 'Which detection techniques are used?',
            type: 'checkbox',
            options: [
              'Machine learning classification',
              'Keyword filtering',
              'Regular expressions',
              'Image recognition (CV)',
              'Audio analysis',
              'Natural language understanding',
              'Contextual analysis',
              'User reputation scoring'
            ],
            required: true
          },
          {
            id: 'ml-models',
            question: 'Which ML models power the moderation?',
            type: 'checkbox',
            options: [
              'Pre-trained models (commercial APIs)',
              'Custom-trained models',
              'Fine-tuned foundation models',
              'Ensemble of multiple models',
              'Not using ML'
            ],
            required: true
          },
          {
            id: 'confidence-thresholds',
            question: 'How are confidence thresholds determined?',
            type: 'radio',
            options: [
              'Data-driven optimization',
              'Industry standards',
              'Legal requirements',
              'User feedback',
              'Manual tuning',
              'Not yet defined'
            ],
            required: true
          }
        ]
      },
      {
        id: 'moderation-workflow',
        title: 'Moderation Workflow',
        description: 'Define the moderation decision workflow',
        questions: [
          {
            id: 'automation-level',
            question: 'What level of automation is used?',
            type: 'radio',
            options: [
              'Fully automated - No human review',
              'Automated with human review for appeals',
              'Hybrid - Automated flagging, human decision',
              'Human-first with AI assistance',
              'Fully manual moderation'
            ],
            required: true
          },
          {
            id: 'moderation-actions',
            question: 'Which moderation actions are available?',
            type: 'checkbox',
            options: [
              'Content removal',
              'Content warning labels',
              'Reduced visibility/shadow ban',
              'User warnings',
              'Temporary suspension',
              'Permanent ban',
              'Requiring content edit',
              'Age-gating'
            ],
            required: true
          },
          {
            id: 'user-notification',
            question: 'Are users notified of moderation actions with explanations?',
            type: 'yes-no',
            required: true,
            helpText: 'Transparency is required per Article 52'
          }
        ]
      },
      {
        id: 'fairness-oversight',
        title: 'Fairness and Human Oversight',
        description: 'Ensure fair and accountable moderation',
        questions: [
          {
            id: 'bias-testing',
            question: 'Have you tested the moderation system for bias?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'protected-groups',
            question: 'Is moderation tested across different demographic groups?',
            type: 'yes-no',
            required: true,
            helpText: 'Ensure equal treatment per Article 10'
          },
          {
            id: 'appeals-available',
            question: 'Can users appeal moderation decisions?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'human-review-capacity',
            question: 'What percentage of flagged content receives human review?',
            type: 'radio',
            options: [
              '100% - All flagged content',
              '50-99% - Most flagged content',
              '10-49% - Selected flagged content',
              'Under 10% - Minimal review',
              'Appeals only'
            ],
            required: true
          }
        ]
      },
      {
        id: 'performance-monitoring',
        title: 'Performance Monitoring',
        description: 'Monitor and improve moderation effectiveness',
        questions: [
          {
            id: 'performance-metrics',
            question: 'Which performance metrics do you track?',
            type: 'checkbox',
            options: [
              'Precision (true positive rate)',
              'Recall (detection rate)',
              'False positive rate',
              'False negative rate',
              'Response time',
              'User satisfaction',
              'Appeal overturn rate',
              'Moderator agreement rate'
            ],
            required: true
          },
          {
            id: 'feedback-loop',
            question: 'Is there a feedback loop for continuous improvement?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'documentation-maintained',
            question: 'Is moderation decision documentation maintained for audits?',
            type: 'yes-no',
            required: true,
            helpText: 'Required per Article 12 record-keeping requirements'
          }
        ]
      }
    ]
  },

  // Human Oversight Tools
  'hitl-design': {
    skillId: 'hitl-design',
    name: 'Human-in-the-Loop (HITL) Design Assessment',
    category: 'Human Oversight',
    description: 'Framework for designing and implementing human-in-the-loop systems ensuring meaningful human oversight of AI decisions. Defines human intervention points, decision thresholds, and interface design for effective human control.',
    article: 'Article 14',
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
            options: [
              'High-risk - Requires mandatory human oversight per Article 14',
              'Medium-risk - Human oversight recommended',
              'Low-risk - Minimal oversight needed',
              'Not yet assessed'
            ],
            required: true
          },
          {
            id: 'oversight-objectives',
            question: 'What are your human oversight objectives?',
            type: 'checkbox',
            options: [
              'Prevent or minimize health and safety risks',
              'Protect fundamental rights',
              'Ensure decision accuracy and reliability',
              'Detect and mitigate bias',
              'Handle edge cases and exceptions',
              'Maintain accountability',
              'Provide recourse for affected individuals'
            ],
            required: true
          },
          {
            id: 'decision-impact',
            question: 'What is the potential impact of AI decisions on individuals?',
            type: 'radio',
            options: [
              'Critical - Life, health, or fundamental rights impact',
              'High - Significant legal or financial impact',
              'Moderate - Limited personal impact',
              'Low - Minimal impact'
            ],
            required: true,
            helpText: 'Higher impact requires more robust human oversight'
          }
        ]
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
            required: true
          },
          {
            id: 'intervention-timing',
            question: 'When can humans intervene?',
            type: 'checkbox',
            options: [
              'Before decision execution (pre-decision review)',
              'During decision process (real-time intervention)',
              'After decision execution (post-decision review)',
              'On user appeal or request',
              'During periodic audits'
            ],
            required: true
          },
          {
            id: 'confidence-threshold',
            question: 'What confidence threshold triggers human review?',
            type: 'radio',
            options: [
              'Below 95% confidence',
              'Below 90% confidence',
              'Below 80% confidence',
              'Below 70% confidence',
              'Custom threshold per decision type',
              'Not using confidence-based triggers'
            ],
            required: true
          },
          {
            id: 'escalation-process',
            question: 'Is there a clear escalation process for human intervention?',
            type: 'yes-no',
            required: true,
            helpText: 'Define who reviews what decisions and when'
          }
        ]
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
            options: [
              'Yes - Full override authority',
              'Yes - Partial override with limitations',
              'Yes - Override with supervisor approval',
              'No - Cannot override',
              'Not yet defined'
            ],
            required: true
          },
          {
            id: 'override-documentation',
            question: 'Are override decisions documented and tracked?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 12 requires logging of oversight activities'
          },
          {
            id: 'human-actions',
            question: 'What actions can human reviewers take?',
            type: 'checkbox',
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
            required: true
          },
          {
            id: 'decision-timeframe',
            question: 'What is the timeframe for human review?',
            type: 'radio',
            options: [
              'Real-time (immediate review required)',
              'Near real-time (within minutes)',
              'Same day',
              'Within 24-48 hours',
              'Batch review (weekly/monthly)',
              'Varies by decision type'
            ],
            required: true
          }
        ]
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
            required: true
          },
          {
            id: 'interface-features',
            question: 'What features does the oversight interface include?',
            type: 'checkbox',
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
            required: true
          },
          {
            id: 'cognitive-load',
            question: 'Have you assessed and minimized cognitive load on reviewers?',
            type: 'yes-no',
            required: true,
            helpText: 'Avoid alert fatigue and ensure sustainable oversight'
          },
          {
            id: 'usability-testing',
            question: 'Have you conducted usability testing with human reviewers?',
            type: 'yes-no',
            required: true
          }
        ]
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
            required: true
          },
          {
            id: 'competence-assessment',
            question: 'How is reviewer competence assessed?',
            type: 'checkbox',
            options: [
              'Initial certification/qualification',
              'Periodic competence testing',
              'Performance monitoring and feedback',
              'Inter-rater reliability checks',
              'Ongoing training requirements',
              'Not yet implemented'
            ],
            required: true
          },
          {
            id: 'expertise-level',
            question: 'What level of expertise is required for reviewers?',
            type: 'radio',
            options: [
              'Domain experts with AI knowledge',
              'AI specialists with domain knowledge',
              'General reviewers with training',
              'Varies by decision type',
              'Not yet defined'
            ],
            required: true
          }
        ]
      },
      {
        id: 'automation-bias',
        title: 'Automation Bias Mitigation',
        description: 'Prevent over-reliance on AI recommendations',
        questions: [
          {
            id: 'bias-awareness',
            question: 'Are reviewers trained on automation bias?',
            type: 'yes-no',
            required: true,
            helpText: 'Automation bias is tendency to over-rely on automated systems'
          },
          {
            id: 'mitigation-strategies',
            question: 'Which automation bias mitigation strategies are used?',
            type: 'checkbox',
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
            required: true
          },
          {
            id: 'independent-judgment',
            question: 'Do reviewers exercise independent judgment?',
            type: 'radio',
            options: [
              'Yes - Strong evidence of independent analysis',
              'Mostly - Some independent thinking',
              'Limited - Heavy reliance on AI',
              'Not assessed'
            ],
            required: true
          }
        ]
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
            required: true
          },
          {
            id: 'feedback-loop',
            question: 'Is human feedback used to improve the AI system?',
            type: 'yes-no',
            required: true,
            helpText: 'Human corrections should inform model retraining'
          },
          {
            id: 'oversight-documentation',
            question: 'Is human oversight activity documented per Article 12?',
            type: 'yes-no',
            required: true,
            helpText: 'Log all oversight decisions, overrides, and rationales'
          },
          {
            id: 'periodic-review',
            question: 'How often is the oversight process reviewed and updated?',
            type: 'radio',
            options: [
              'Quarterly',
              'Semi-annually',
              'Annually',
              'After significant incidents',
              'No regular review schedule'
            ],
            required: true
          }
        ]
      }
    ]
  },

  'incident-responder': {
    skillId: 'incident-responder',
    name: 'Incident Responder Assessment',
    category: 'Human Oversight',
    description: 'Comprehensive incident management system for high-risk AI systems per Article 73. Ensures compliance with serious incident reporting requirements including automated detection, severity classification, timeline tracking, and regulatory notification.',
    article: 'Article 73',
    sections: [
      {
        id: 'incident-detection',
        title: 'Incident Detection System',
        description: 'Configure automated and manual incident detection capabilities',
        questions: [
          {
            id: 'detection-methods',
            question: 'Which incident detection methods are implemented?',
            type: 'checkbox',
            options: [
              'Automated monitoring and alerting',
              'User reports and complaints',
              'System performance anomaly detection',
              'Safety threshold violations',
              'Manual internal discovery',
              'Third-party notifications',
              'Regulatory authority notifications'
            ],
            required: true
          },
          {
            id: 'monitoring-coverage',
            question: 'What aspects of the AI system are monitored for incidents?',
            type: 'checkbox',
            options: [
              'Model predictions and outputs',
              'System availability and performance',
              'Data quality and integrity',
              'User interactions and feedback',
              'Integration points with other systems',
              'Safety-critical functions',
              'Fundamental rights impacts'
            ],
            required: true
          },
          {
            id: 'detection-speed',
            question: 'How quickly can incidents typically be detected?',
            type: 'radio',
            options: [
              'Real-time (within minutes)',
              'Same day (within hours)',
              'Within 24 hours',
              'Within 2-3 days',
              'Detection time varies by incident type'
            ],
            required: true,
            helpText: 'Article 73 requires immediate reporting once causal link is established'
          }
        ]
      },
      {
        id: 'severity-classification',
        title: 'Severity Classification',
        description: 'Classify incidents per Article 3(49) definitions',
        questions: [
          {
            id: 'classification-method',
            question: 'How are incidents classified?',
            type: 'radio',
            options: [
              'AI-assisted classification with human review',
              'Manual classification by trained personnel',
              'Automated classification only',
              'External expert consultation',
              'Not yet established'
            ],
            required: true,
            helpText: 'Human judgment required for serious incident confirmation'
          },
          {
            id: 'serious-incident-types',
            question: 'Which serious incident types (Article 3(49)) can your system identify?',
            type: 'checkbox',
            options: [
              '(a) Death or serious harm to health - 10 day deadline',
              '(b) Serious/irreversible critical infrastructure disruption - 2 day deadline',
              '(c) Fundamental rights infringement - 15 day deadline',
              '(d) Serious harm to property/environment - 15 day deadline'
            ],
            required: true
          },
          {
            id: 'classification-documentation',
            question: 'Is the classification process documented?',
            type: 'yes-no',
            required: true,
            helpText: 'Documentation required for audit and compliance verification'
          },
          {
            id: 'override-capability',
            question: 'Can human reviewers override AI-assisted classifications?',
            type: 'yes-no',
            required: true,
            helpText: 'Human oversight required for serious incident determination'
          }
        ]
      },
      {
        id: 'causal-link',
        title: 'Causal Link Establishment',
        description: 'Establish causal link between AI system and incident per Article 73(2)',
        questions: [
          {
            id: 'investigation-process',
            question: 'What investigation methods are used to establish causality?',
            type: 'checkbox',
            options: [
              'Root cause analysis',
              'System logs and traces review',
              'Model behavior analysis',
              'Input/output correlation analysis',
              'Expert technical review',
              'Comparative analysis with similar cases',
              'Third-party forensic investigation'
            ],
            required: true
          },
          {
            id: 'evidence-collection',
            question: 'How is evidence for causal link preserved?',
            type: 'checkbox',
            options: [
              'System state snapshots',
              'Complete audit logs',
              'Model version documentation',
              'Input data preservation',
              'Output records',
              'Configuration backups',
              'Timeline documentation'
            ],
            required: true,
            helpText: 'No system alterations before authority notification'
          },
          {
            id: 'causality-timeline',
            question: 'How quickly can causal links typically be established?',
            type: 'radio',
            options: [
              'Within 24 hours',
              'Within 2-3 days',
              'Within a week',
              'Varies by incident complexity',
              'Not yet assessed'
            ],
            required: true,
            helpText: 'Reporting deadlines start when causal link is established'
          }
        ]
      },
      {
        id: 'reporting-timeline',
        title: 'Reporting Timeline Management',
        description: 'Track and meet 2/10/15 day reporting deadlines',
        questions: [
          {
            id: 'timeline-tracking',
            question: 'Is automated timeline tracking implemented?',
            type: 'yes-no',
            required: true,
            helpText: 'System should auto-calculate deadlines based on incident type'
          },
          {
            id: 'deadline-alerts',
            question: 'Which deadline alert mechanisms are active?',
            type: 'checkbox',
            options: [
              'Email notifications to responsible personnel',
              'Dashboard alerts and warnings',
              'Escalation to management',
              'SMS/mobile alerts for critical deadlines',
              'Calendar integration',
              'Daily status reports'
            ],
            required: true
          },
          {
            id: 'initial-report-capability',
            question: 'Can incomplete initial reports be submitted per Article 73(5)?',
            type: 'yes-no',
            required: true,
            helpText: 'Initial reports allowed if investigation incomplete'
          },
          {
            id: 'complete-report-tracking',
            question: 'Is follow-up complete report submission tracked?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'remediation-workflow',
        title: 'Remediation Workflow',
        description: 'Manage corrective actions and remediation',
        questions: [
          {
            id: 'remediation-suggestions',
            question: 'Are AI-generated remediation suggestions used?',
            type: 'radio',
            options: [
              'Yes - AI suggests, human approves',
              'No - Fully manual remediation planning',
              'Hybrid - AI assists for certain incident types',
              'Not yet implemented'
            ],
            required: true,
            helpText: 'Human approval required before implementation'
          },
          {
            id: 'corrective-actions',
            question: 'Which types of corrective actions can be tracked?',
            type: 'checkbox',
            options: [
              'Immediate containment measures',
              'System modifications or patches',
              'Process improvements',
              'Training and documentation updates',
              'Monitoring enhancements',
              'Third-party coordination',
              'User notifications'
            ],
            required: true
          },
          {
            id: 'action-documentation',
            question: 'Are remediation actions documented and tracked?',
            type: 'yes-no',
            required: true,
            helpText: 'Required per Article 73(6) investigation requirements'
          },
          {
            id: 'effectiveness-verification',
            question: 'Is remediation effectiveness verified?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'regulatory-notification',
        title: 'Regulatory Authority Notification',
        description: 'Manage notifications to market surveillance authorities',
        questions: [
          {
            id: 'authority-identification',
            question: 'Can the system identify the correct market surveillance authority?',
            type: 'radio',
            options: [
              'Yes - Automatic based on member state',
              'Yes - Manual selection from database',
              'Requires manual research',
              'Not yet implemented'
            ],
            required: true,
            helpText: 'Must notify authority in member state where incident occurred'
          },
          {
            id: 'notification-tracking',
            question: 'Are authority notifications tracked?',
            type: 'yes-no',
            required: true,
            helpText: 'Track submission date, method, and confirmation'
          },
          {
            id: 'report-templates',
            question: 'Are standardized report templates available?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'followup-communication',
            question: 'Is follow-up communication with authorities tracked?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'risk-assessment',
        title: 'Risk Assessment and Investigation',
        description: 'Perform Article 73(6) risk assessment and investigation',
        questions: [
          {
            id: 'assessment-process',
            question: 'What risk assessment processes are followed?',
            type: 'checkbox',
            options: [
              'Impact severity assessment',
              'Likelihood of recurrence analysis',
              'Affected population identification',
              'Root cause technical analysis',
              'System vulnerability assessment',
              'Compliance gap analysis',
              'Preventive measure identification'
            ],
            required: true
          },
          {
            id: 'documentation-completeness',
            question: 'Are investigation findings fully documented?',
            type: 'yes-no',
            required: true,
            helpText: 'Comprehensive documentation required per Article 73(6)'
          },
          {
            id: 'authority-cooperation',
            question: 'Is there a process for cooperating with authorities during investigations?',
            type: 'yes-no',
            required: true
          }
        ]
      },
      {
        id: 'system-integration',
        title: 'System Integration and Automation',
        description: 'Integration with AI Act compliance tools',
        questions: [
          {
            id: 'record-keeping',
            question: 'Is incident data integrated with Article 12 logging system?',
            type: 'yes-no',
            required: true,
            helpText: 'Maintain audit trail of all incident management activities'
          },
          {
            id: 'data-storage',
            question: 'Where is incident data stored?',
            type: 'radio',
            options: [
              'Secure database with backup',
              'File-based system with version control',
              'Cloud storage with encryption',
              'Hybrid storage approach',
              'Not yet determined'
            ],
            required: true
          },
          {
            id: 'human-oversight-maintained',
            question: 'Is human oversight maintained for all critical decisions?',
            type: 'yes-no',
            required: true,
            helpText: 'Human judgment required for: classification, causal link, remediation approval, report submission'
          },
          {
            id: 'post-incident-review',
            question: 'Is post-incident review conducted to improve the system?',
            type: 'yes-no',
            required: true
          }
        ]
      }
    ]
  },

  'conformance-calibration': {
    skillId: 'conformance-calibration',
    name: 'Conformance Calibration Assessment',
    category: 'Human Oversight',
    description: 'Systematic change management system ensuring conformity assessment procedures per Articles 17 and 43. Implements structured change control with comprehensive workflow, impact assessment, testing, and human approval requirements.',
    article: 'Articles 17 & 43',
    sections: [
      {
        id: 'change-workflow',
        title: 'Change Request Workflow',
        description: 'Configure systematic change management workflow',
        questions: [
          {
            id: 'change-types',
            question: 'Which types of changes does your system manage?',
            type: 'checkbox',
            options: [
              'Model updates and retraining',
              'Algorithm modifications',
              'Data pipeline changes',
              'System configuration updates',
              'Infrastructure changes',
              'Security patches',
              'Feature additions',
              'Bug fixes'
            ],
            required: true
          },
          {
            id: 'change-initiation',
            question: 'How are change requests initiated?',
            type: 'checkbox',
            options: [
              'Formal request form/ticketing system',
              'Automated detection of needed changes',
              'Regular review cycles',
              'Incident-driven changes',
              'Compliance requirement updates',
              'Performance optimization needs'
            ],
            required: true
          },
          {
            id: 'request-documentation',
            question: 'What information is captured in change requests?',
            type: 'checkbox',
            options: [
              'Change description and objectives',
              'Business justification',
              'Technical implementation details',
              'Affected systems and components',
              'Target deployment timeline',
              'Resource requirements',
              'Risk assessment summary'
            ],
            required: true
          },
          {
            id: 'workflow-tracking',
            question: 'Is change workflow status tracked throughout lifecycle?',
            type: 'yes-no',
            required: true,
            helpText: 'Track from draft through deployment and closure'
          }
        ]
      },
      {
        id: 'impact-assessment',
        title: 'Impact Assessment Process',
        description: 'Evaluate change impact on AI system and compliance',
        questions: [
          {
            id: 'assessment-method',
            question: 'How is change impact assessed?',
            type: 'radio',
            options: [
              'AI-powered assessment with human review',
              'Manual assessment by technical experts',
              'Hybrid approach - AI suggests, humans decide',
              'Checklist-based assessment',
              'Not yet established'
            ],
            required: true,
            helpText: 'Article 17 requires systematic impact evaluation'
          },
          {
            id: 'impact-dimensions',
            question: 'Which impact dimensions are evaluated?',
            type: 'checkbox',
            options: [
              'Risk level and severity',
              'Affected system components',
              'User and stakeholder impact',
              'Performance implications',
              'Compliance impact (Article 17, 43)',
              'Rollback complexity',
              'Testing requirements',
              'Dependencies and integration points'
            ],
            required: true
          },
          {
            id: 'ai-assisted-assessment',
            question: 'If using AI-assisted assessment, what is analyzed?',
            type: 'checkbox',
            options: [
              'Change description and scope',
              'Historical change patterns',
              'System architecture dependencies',
              'Compliance requirements mapping',
              'Risk indicators and red flags',
              'Testing coverage recommendations',
              'Not using AI-assisted assessment'
            ],
            required: true
          },
          {
            id: 'assessment-confidence',
            question: 'Is assessment confidence level tracked?',
            type: 'yes-no',
            required: true,
            helpText: 'Helps determine when human expert review is needed'
          }
        ]
      },
      {
        id: 'testing-validation',
        title: 'Testing and Validation',
        description: 'Ensure changes are properly tested before deployment',
        questions: [
          {
            id: 'test-automation',
            question: 'What level of test automation is implemented?',
            type: 'radio',
            options: [
              'Fully automated test execution',
              'Automated with manual verification',
              'Partially automated',
              'Primarily manual testing',
              'No structured testing process'
            ],
            required: true,
            helpText: 'Article 43 conformity assessment requires validation'
          },
          {
            id: 'test-types',
            question: 'Which test types are executed?',
            type: 'checkbox',
            options: [
              'Unit tests',
              'Integration tests',
              'Regression tests',
              'Performance tests',
              'Security tests',
              'Compliance validation tests',
              'User acceptance tests',
              'Smoke tests'
            ],
            required: true
          },
          {
            id: 'test-coverage',
            question: 'Are test coverage requirements defined per change type?',
            type: 'yes-no',
            required: true,
            helpText: 'Critical changes require more comprehensive testing'
          },
          {
            id: 'test-documentation',
            question: 'Are test results documented and archived?',
            type: 'yes-no',
            required: true,
            helpText: 'Required for Article 12 record-keeping and audits'
          },
          {
            id: 'test-failure-handling',
            question: 'What happens when tests fail?',
            type: 'radio',
            options: [
              'Automated block of deployment',
              'Alert for manual review and decision',
              'Requires re-testing after fixes',
              'Documented but deployment can proceed',
              'Not yet defined'
            ],
            required: true
          }
        ]
      },
      {
        id: 'approval-process',
        title: 'Approval and Authorization',
        description: 'Human approval gates for change authorization',
        questions: [
          {
            id: 'approval-requirements',
            question: 'Which changes require formal approval?',
            type: 'checkbox',
            options: [
              'All changes to high-risk AI systems',
              'Model updates and retraining',
              'Algorithm modifications',
              'Changes affecting compliance status',
              'Security-related changes',
              'Changes with high/critical risk level',
              'Production deployments'
            ],
            required: true,
            helpText: 'Article 17 QMS requires controlled change process'
          },
          {
            id: 'approver-roles',
            question: 'Who can approve changes?',
            type: 'checkbox',
            options: [
              'Compliance officer',
              'Technical lead/architect',
              'Quality management representative',
              'Security officer',
              'Business owner',
              'External auditor (for critical changes)',
              'Multiple approvers required'
            ],
            required: true
          },
          {
            id: 'approval-criteria',
            question: 'What criteria must be met for approval?',
            type: 'checkbox',
            options: [
              'Impact assessment completed',
              'All tests passed',
              'Rollback plan documented',
              'Compliance impact reviewed',
              'Documentation updated',
              'Risk mitigation addressed',
              'Stakeholder notification completed'
            ],
            required: true
          },
          {
            id: 'approval-tracking',
            question: 'Are approval decisions tracked and auditable?',
            type: 'yes-no',
            required: true,
            helpText: 'Audit trail required for Article 17 compliance'
          }
        ]
      },
      {
        id: 'rollback-capability',
        title: 'Rollback Planning and Execution',
        description: 'Ensure changes can be safely reversed if needed',
        questions: [
          {
            id: 'rollback-planning',
            question: 'When are rollback plans created?',
            type: 'radio',
            options: [
              'Automatically for all changes',
              'Required for high/critical risk changes',
              'Created during change planning phase',
              'Created on-demand when needed',
              'Not systematically created'
            ],
            required: true
          },
          {
            id: 'rollback-automation',
            question: 'What level of rollback automation exists?',
            type: 'radio',
            options: [
              'Fully automated rollback procedures',
              'Partially automated with manual steps',
              'Documented manual procedures',
              'Ad-hoc rollback process',
              'No formal rollback capability'
            ],
            required: true
          },
          {
            id: 'rollback-components',
            question: 'What is included in rollback plans?',
            type: 'checkbox',
            options: [
              'Step-by-step rollback procedures',
              'Backup locations and versions',
              'Verification and validation steps',
              'Estimated rollback duration',
              'Communication plan',
              'Rollback success criteria',
              'Emergency contact information'
            ],
            required: true
          },
          {
            id: 'rollback-testing',
            question: 'Are rollback procedures tested?',
            type: 'radio',
            options: [
              'Regularly tested in non-production',
              'Tested for critical changes only',
              'Tested after incidents occur',
              'Not systematically tested',
              'Not applicable'
            ],
            required: true
          }
        ]
      },
      {
        id: 'deployment-control',
        title: 'Deployment and Release Management',
        description: 'Controlled deployment with tracking and monitoring',
        questions: [
          {
            id: 'deployment-authorization',
            question: 'Who can authorize production deployments?',
            type: 'radio',
            options: [
              'Designated release manager only',
              'Approved personnel with proper authorization',
              'Automated after all approvals obtained',
              'Change requester after approvals',
              'Not restricted'
            ],
            required: true
          },
          {
            id: 'deployment-tracking',
            question: 'What deployment information is tracked?',
            type: 'checkbox',
            options: [
              'Deployment timestamp',
              'Deployer identity',
              'Version/change identifiers',
              'Deployment steps completed',
              'Success/failure status',
              'System state before/after',
              'Rollback triggers if any'
            ],
            required: true,
            helpText: 'Article 12 requires comprehensive logging'
          },
          {
            id: 'deployment-verification',
            question: 'How is deployment success verified?',
            type: 'checkbox',
            options: [
              'Automated health checks',
              'Smoke test execution',
              'Performance monitoring',
              'Error rate monitoring',
              'Manual verification',
              'User acceptance confirmation',
              'Compliance status check'
            ],
            required: true
          },
          {
            id: 'deployment-phases',
            question: 'Are phased/gradual deployments supported?',
            type: 'yes-no',
            required: true,
            helpText: 'Canary deployments reduce risk for critical changes'
          }
        ]
      },
      {
        id: 'compliance-integration',
        title: 'Compliance and Quality Management',
        description: 'Integration with Article 17 QMS and Article 43 conformity',
        questions: [
          {
            id: 'qms-integration',
            question: 'Is change management integrated with Quality Management System?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 17 requires QMS covering entire system lifecycle'
          },
          {
            id: 'conformity-tracking',
            question: 'How are conformity assessment impacts tracked?',
            type: 'checkbox',
            options: [
              'Changes requiring new conformity assessment',
              'Changes affecting existing certifications',
              'Updates to technical documentation',
              'CE marking implications',
              'Notified body notification requirements',
              'Not currently tracked systematically'
            ],
            required: true,
            helpText: 'Article 43 conformity assessment requirements'
          },
          {
            id: 'documentation-updates',
            question: 'Are technical documentation updates tracked?',
            type: 'yes-no',
            required: true,
            helpText: 'Article 11 requires maintained technical documentation'
          },
          {
            id: 'change-metrics',
            question: 'Which change management metrics are monitored?',
            type: 'checkbox',
            options: [
              'Change volume and frequency',
              'Change success/failure rate',
              'Rollback frequency',
              'Test pass/fail rates',
              'Time to deployment',
              'Approval cycle time',
              'Compliance impact frequency',
              'Not tracking metrics'
            ],
            required: true
          }
        ]
      },
      {
        id: 'continuous-improvement',
        title: 'Monitoring and Continuous Improvement',
        description: 'Learn from changes to improve process',
        questions: [
          {
            id: 'post-deployment-monitoring',
            question: 'How long are changes monitored post-deployment?',
            type: 'radio',
            options: [
              '24 hours minimum',
              '7 days minimum',
              '30 days minimum',
              'Varies by change risk level',
              'Not systematically monitored'
            ],
            required: true
          },
          {
            id: 'change-review',
            question: 'Are post-deployment reviews conducted?',
            type: 'radio',
            options: [
              'For all changes',
              'For high/critical risk changes',
              'After incidents or rollbacks',
              'Periodically for batches of changes',
              'Not systematically conducted'
            ],
            required: true
          },
          {
            id: 'lessons-learned',
            question: 'Are lessons learned captured and applied?',
            type: 'yes-no',
            required: true
          },
          {
            id: 'process-improvement',
            question: 'Is the change management process regularly reviewed and improved?',
            type: 'radio',
            options: [
              'Quarterly reviews',
              'Semi-annual reviews',
              'Annual reviews',
              'After significant incidents',
              'Not regularly reviewed'
            ],
            required: true,
            helpText: 'Article 17 QMS requires continuous improvement'
          }
        ]
      }
    ]
  }
};

// Add more assessments as needed for other tools
export function getSkillAssessment(skillId: string): SkillAssessment | null {
  return skillAssessments[skillId] || null;
}