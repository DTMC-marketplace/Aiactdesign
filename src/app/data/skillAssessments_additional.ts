// Additional skill assessments - to be merged with main file
export const additionalAssessments = {
  'ai-safety': {
    skillId: 'ai-safety',
    name: 'AI Safety Implementation',
    category: 'Risk Management',
    description: 'Implementation of comprehensive safety measures for AI systems.',
    article: 'Article 9',
    sections: [
      {
        id: 'safety-requirements',
        title: 'Safety Requirements',
        description: 'Define safety requirements for the AI system',
        questions: [
          {
            id: 'safety-standards',
            question: 'What safety standards are followed?',
            type: 'checkbox' as const,
            options: [
              'ISO/IEC 23894 (AI Risk Management)',
              'ISO/IEC 24028 (AI Trustworthiness)',
              'IEC 61508 (Functional Safety)',
              'ISO 26262 (Automotive safety)',
              'Custom safety standards',
              'None currently'
            ],
            required: true
          },
          {
            id: 'safety-critical-functions',
            question: 'What are the safety-critical functions of your AI system?',
            type: 'text' as const,
            required: true
          },
          {
            id: 'failure-modes',
            question: 'Have potential failure modes been identified?',
            type: 'yes-no' as const,
            required: true
          }
        ]
      },
      {
        id: 'safety-testing',
        title: 'Safety Testing',
        description: 'Assess safety testing procedures',
        questions: [
          {
            id: 'testing-methods',
            question: 'What safety testing methods are used?',
            type: 'checkbox' as const,
            options: [
              'Fault injection testing',
              'Stress testing',
              'Adversarial testing',
              'Edge case testing',
              'Simulation testing',
              'Real-world pilot testing'
            ],
            required: true
          },
          {
            id: 'testing-frequency',
            question: 'How frequently is safety testing conducted?',
            type: 'radio' as const,
            options: [
              'Before each deployment',
              'Monthly',
              'Quarterly',
              'Annually',
              'Only during initial development'
            ],
            required: true
          }
        ]
      },
      {
        id: 'safety-monitoring',
        title: 'Safety Monitoring',
        description: 'Define ongoing safety monitoring',
        questions: [
          {
            id: 'monitoring-systems',
            question: 'What monitoring systems are in place?',
            type: 'checkbox' as const,
            options: [
              'Real-time anomaly detection',
              'Performance degradation monitoring',
              'Safety incident logging',
              'User feedback systems',
              'Automated alerts'
            ],
            required: true
          },
          {
            id: 'emergency-response',
            question: 'Is there an emergency shutdown or fail-safe mechanism?',
            type: 'yes-no' as const,
            required: true
          }
        ]
      }
    ]
  }
};
