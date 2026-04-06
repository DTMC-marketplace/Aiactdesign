// Fairness Assessment Frameworks for Article 10
// These frameworks are imported and merged with the main assessmentFrameworks

import { AssessmentFramework } from './assessmentFrameworks';

export const fairnessAssessmentFrameworks: Record<string, AssessmentFramework> = {
  'ai-fairness-360': {
    toolName: 'ai-fairness-360',
    displayName: 'AI Fairness 360 (AIF360) Assessment',
    description: 'Comprehensive toolkit from IBM to examine, report, and mitigate discrimination and bias in machine learning models.',
    article: 'Art. 10',
    category: 'Fairness',
    sections: [
      {
        id: 'fairness-metrics-implementation',
        title: 'Fairness Metrics Implementation',
        description: 'Assess which fairness metrics are implemented using AIF360',
        questions: [
          {
            id: 'aif360-deployment',
            question: 'Is AI Fairness 360 (AIF360) deployed for your AI systems?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Evaluating'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'high',
          },
          {
            id: 'fairness-metrics',
            question: 'Which fairness metrics are measured using AIF360?',
            type: 'checkbox',
            required: true,
            options: [
              'Statistical parity difference',
              'Disparate impact',
              'Equal opportunity difference',
              'Average odds difference',
              'Theil index (generalized entropy)',
              'Consistency score',
              'None currently measured'
            ],
            aiDetectedValue: ['Statistical parity difference', 'Disparate impact', 'Equal opportunity difference'],
            aiConfidence: 'high',
          },
          {
            id: 'protected-attributes',
            question: 'Which protected attributes are analyzed for bias?',
            type: 'checkbox',
            required: true,
            options: [
              'Race/Ethnicity',
              'Gender',
              'Age',
              'Disability status',
              'Religion',
              'Sexual orientation',
              'Socioeconomic status'
            ],
            aiDetectedValue: ['Race/Ethnicity', 'Gender', 'Age'],
            aiConfidence: 'high',
          },
        ],
      },
      {
        id: 'bias-mitigation',
        title: 'Bias Mitigation Algorithms',
        description: 'Evaluate bias mitigation strategies implemented with AIF360',
        questions: [
          {
            id: 'mitigation-stage',
            question: 'At which stages is bias mitigation applied?',
            type: 'checkbox',
            required: true,
            options: [
              'Pre-processing (data transformation)',
              'In-processing (algorithm modification)',
              'Post-processing (output adjustment)',
              'No mitigation currently applied'
            ],
            aiDetectedValue: ['Pre-processing (data transformation)', 'Post-processing (output adjustment)'],
            aiConfidence: 'medium',
          },
          {
            id: 'mitigation-algorithms',
            question: 'Which AIF360 bias mitigation algorithms are implemented?',
            type: 'checkbox',
            required: true,
            options: [
              'Reweighing',
              'Disparate Impact Remover',
              'Learning Fair Representations',
              'Adversarial Debiasing',
              'Prejudice Remover',
              'Calibrated Equalized Odds',
              'Reject Option Classification',
              'None currently implemented'
            ],
            aiDetectedValue: ['Reweighing', 'Calibrated Equalized Odds'],
            aiConfidence: 'medium',
          },
          {
            id: 'mitigation-effectiveness',
            question: 'How is the effectiveness of bias mitigation measured?',
            type: 'text',
            required: true,
          },
          {
            id: 'accuracy-fairness-tradeoff',
            question: 'Has the accuracy-fairness tradeoff been analyzed?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'In Progress'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'medium',
          },
        ],
      },
      {
        id: 'data-analysis',
        title: 'Training Data Analysis',
        description: 'Assess training data representativeness and bias',
        questions: [
          {
            id: 'data-representativeness',
            question: 'Is training data representative across protected groups?',
            type: 'radio',
            required: true,
            options: [
              'Yes, fully representative',
              'Partially representative',
              'No, underrepresentation identified',
              'Not assessed'
            ],
            aiDetectedValue: 'Partially representative',
            aiConfidence: 'medium',
          },
          {
            id: 'data-bias-detection',
            question: 'What types of data bias have been identified?',
            type: 'checkbox',
            required: true,
            options: [
              'Historical bias (reflects past discrimination)',
              'Representation bias (underrepresented groups)',
              'Measurement bias (inconsistent labeling)',
              'Aggregation bias (inappropriate grouping)',
              'Evaluation bias (biased benchmarks)',
              'No bias identified'
            ],
            aiDetectedValue: ['Historical bias (reflects past discrimination)', 'Representation bias (underrepresented groups)'],
            aiConfidence: 'high',
          },
          {
            id: 'data-augmentation',
            question: 'Are data augmentation techniques used to address underrepresentation?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Planned'],
          },
        ],
      },
      {
        id: 'monitoring-reporting',
        title: 'Fairness Monitoring and Reporting',
        description: 'Track and report fairness metrics over time',
        questions: [
          {
            id: 'fairness-monitoring-frequency',
            question: 'How frequently are fairness metrics monitored in production?',
            type: 'radio',
            required: true,
            options: [
              'Continuously (real-time)',
              'Daily',
              'Weekly',
              'Monthly',
              'Only during development'
            ],
            aiDetectedValue: 'Weekly',
            aiConfidence: 'medium',
          },
          {
            id: 'fairness-reporting',
            question: 'Are fairness metrics included in compliance reports?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Partially'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'high',
          },
          {
            id: 'fairness-alerts',
            question: 'Are automated alerts configured for fairness metric violations?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'In Development'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'medium',
          },
          {
            id: 'article-10-compliance',
            question: 'How does AIF360 implementation support Article 10 data governance requirements?',
            type: 'text',
            required: true,
          },
        ],
      },
    ],
  },

  'fairlearn': {
    toolName: 'fairlearn',
    displayName: 'Fairlearn Assessment',
    description: 'Python package for assessing and improving fairness of machine learning models.',
    article: 'Art. 10',
    category: 'Fairness',
    sections: [
      {
        id: 'fairlearn-setup',
        title: 'Fairlearn Implementation',
        description: 'Assess Fairlearn deployment and configuration',
        questions: [
          {
            id: 'fairlearn-integration',
            question: 'Is Fairlearn integrated into your ML pipeline?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Evaluating'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'high',
          },
          {
            id: 'fairlearn-components',
            question: 'Which Fairlearn components are implemented?',
            type: 'checkbox',
            required: true,
            options: [
              'Fairness metrics (MetricFrame)',
              'Mitigation algorithms',
              'Fairlearn dashboard',
              'Model comparison tools',
              'None currently implemented'
            ],
            aiDetectedValue: ['Fairness metrics (MetricFrame)', 'Mitigation algorithms', 'Fairlearn dashboard'],
            aiConfidence: 'high',
          },
          {
            id: 'sensitive-features',
            question: 'Which sensitive features are tracked in Fairlearn?',
            type: 'checkbox',
            required: true,
            options: [
              'Race/Ethnicity',
              'Gender',
              'Age group',
              'Disability',
              'Geographic location',
              'Socioeconomic status'
            ],
            aiDetectedValue: ['Race/Ethnicity', 'Gender', 'Age group'],
            aiConfidence: 'high',
          },
        ],
      },
      {
        id: 'fairness-constraints',
        title: 'Fairness Constraints and Parity',
        description: 'Define and enforce fairness constraints',
        questions: [
          {
            id: 'parity-definitions',
            question: 'Which fairness parity definitions are enforced?',
            type: 'checkbox',
            required: true,
            options: [
              'Demographic parity',
              'Equalized odds',
              'Equal opportunity',
              'Bounded group loss',
              'None currently enforced'
            ],
            aiDetectedValue: ['Demographic parity', 'Equalized odds'],
            aiConfidence: 'high',
          },
          {
            id: 'mitigation-algorithms-fairlearn',
            question: 'Which Fairlearn mitigation algorithms are used?',
            type: 'checkbox',
            required: true,
            options: [
              'GridSearch (reduction approach)',
              'ExponentiatedGradient',
              'ThresholdOptimizer',
              'None currently used'
            ],
            aiDetectedValue: ['GridSearch (reduction approach)', 'ThresholdOptimizer'],
            aiConfidence: 'medium',
          },
          {
            id: 'constraint-relaxation',
            question: 'Are fairness constraints relaxed for performance optimization?',
            type: 'radio',
            required: true,
            options: ['Yes, with documentation', 'No, strict constraints', 'Case-by-case basis'],
          },
          {
            id: 'performance-impact',
            question: 'What is the impact of fairness constraints on model performance?',
            type: 'radio',
            required: true,
            options: [
              'Less than 2% accuracy decrease',
              '2-5% accuracy decrease',
              '5-10% accuracy decrease',
              'More than 10% accuracy decrease',
              'Not measured'
            ],
            aiDetectedValue: '2-5% accuracy decrease',
            aiConfidence: 'low',
          },
        ],
      },
      {
        id: 'metric-tracking',
        title: 'Fairness Metric Tracking',
        description: 'Monitor fairness metrics across subgroups',
        questions: [
          {
            id: 'metricframe-usage',
            question: 'Is MetricFrame used for disaggregated performance analysis?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Planned'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'high',
          },
          {
            id: 'tracked-metrics',
            question: 'Which performance metrics are tracked per subgroup?',
            type: 'checkbox',
            required: true,
            options: [
              'Accuracy',
              'Precision',
              'Recall',
              'F1 score',
              'False positive rate',
              'False negative rate',
              'Selection rate'
            ],
            aiDetectedValue: ['Accuracy', 'Precision', 'Recall', 'False positive rate', 'False negative rate'],
            aiConfidence: 'high',
          },
          {
            id: 'disparity-threshold',
            question: 'What is the acceptable disparity threshold between subgroups?',
            type: 'radio',
            required: true,
            options: [
              'Less than 5%',
              '5-10%',
              '10-20%',
              'More than 20%',
              'No defined threshold'
            ],
            aiDetectedValue: '5-10%',
            aiConfidence: 'medium',
          },
        ],
      },
      {
        id: 'dashboard-reporting',
        title: 'Dashboard and Reporting',
        description: 'Utilize Fairlearn dashboard for stakeholder communication',
        questions: [
          {
            id: 'dashboard-deployment',
            question: 'Is the Fairlearn dashboard deployed for stakeholder review?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'In Development'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'medium',
          },
          {
            id: 'stakeholder-access',
            question: 'Who has access to fairness dashboards and reports?',
            type: 'checkbox',
            required: true,
            options: [
              'ML team',
              'Product managers',
              'Legal/compliance team',
              'Executive leadership',
              'External auditors',
              'Regulatory authorities'
            ],
            aiDetectedValue: ['ML team', 'Legal/compliance team', 'Executive leadership'],
            aiConfidence: 'medium',
          },
          {
            id: 'article-10-documentation',
            question: 'Are Fairlearn reports used for Article 10 compliance documentation?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Planned'],
          },
        ],
      },
    ],
  },

  'aequitas': {
    toolName: 'aequitas',
    displayName: 'Aequitas Bias Audit Assessment',
    description: 'Bias and fairness audit toolkit for machine learning models with comprehensive reporting.',
    article: 'Art. 10',
    category: 'Fairness',
    sections: [
      {
        id: 'aequitas-audit-setup',
        title: 'Aequitas Audit Setup',
        description: 'Configure Aequitas for bias auditing',
        questions: [
          {
            id: 'aequitas-deployment',
            question: 'Is Aequitas deployed for bias auditing?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Evaluating'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'medium',
          },
          {
            id: 'audit-frequency',
            question: 'How frequently are Aequitas bias audits performed?',
            type: 'radio',
            required: true,
            options: [
              'Before each deployment',
              'Monthly',
              'Quarterly',
              'Annually',
              'Ad-hoc only'
            ],
            aiDetectedValue: 'Before each deployment',
            aiConfidence: 'high',
          },
          {
            id: 'protected-groups',
            question: 'How many protected groups are analyzed in Aequitas audits?',
            type: 'radio',
            required: true,
            options: [
              '1-2 groups',
              '3-4 groups',
              '5-6 groups',
              'More than 6 groups'
            ],
            aiDetectedValue: '3-4 groups',
            aiConfidence: 'medium',
          },
        ],
      },
      {
        id: 'fairness-measures',
        title: 'Fairness Measures and Thresholds',
        description: 'Define fairness measures evaluated by Aequitas',
        questions: [
          {
            id: 'fairness-measures-aequitas',
            question: 'Which fairness measures are evaluated using Aequitas?',
            type: 'checkbox',
            required: true,
            options: [
              'False positive rate parity',
              'False negative rate parity',
              'False discovery rate parity',
              'False omission rate parity',
              'Predictive parity',
              'Statistical parity',
              'Impact parity'
            ],
            aiDetectedValue: ['False positive rate parity', 'False negative rate parity', 'Statistical parity'],
            aiConfidence: 'high',
          },
          {
            id: 'bias-thresholds',
            question: 'What bias disparity thresholds are configured in Aequitas?',
            type: 'radio',
            required: true,
            options: [
              '0.8-1.2 (strict)',
              '0.7-1.3 (moderate)',
              '0.6-1.5 (lenient)',
              'Custom thresholds',
              'No defined thresholds'
            ],
            aiDetectedValue: '0.8-1.2 (strict)',
            aiConfidence: 'medium',
          },
          {
            id: 'intersectional-analysis',
            question: 'Does Aequitas analyze intersectional bias (e.g., race AND gender)?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Planned'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'medium',
          },
        ],
      },
      {
        id: 'bias-report-generation',
        title: 'Bias Report Generation',
        description: 'Generate and review Aequitas bias audit reports',
        questions: [
          {
            id: 'report-format',
            question: 'What report formats are generated by Aequitas?',
            type: 'checkbox',
            required: true,
            options: [
              'Interactive HTML reports',
              'PDF audit reports',
              'CSV/Excel data exports',
              'JSON structured output',
              'Dashboard visualizations'
            ],
            aiDetectedValue: ['Interactive HTML reports', 'PDF audit reports', 'Dashboard visualizations'],
            aiConfidence: 'high',
          },
          {
            id: 'report-distribution',
            question: 'How are Aequitas audit reports distributed?',
            type: 'checkbox',
            required: true,
            options: [
              'Internal team reviews',
              'Management briefings',
              'Compliance documentation',
              'External auditor submission',
              'Regulatory filing',
              'Public disclosure'
            ],
            aiDetectedValue: ['Internal team reviews', 'Management briefings', 'Compliance documentation'],
            aiConfidence: 'medium',
          },
          {
            id: 'report-actionability',
            question: 'Are action items generated from Aequitas audit findings?',
            type: 'radio',
            required: true,
            options: ['Yes, systematically', 'Yes, ad-hoc', 'No'],
            aiDetectedValue: 'Yes, systematically',
            aiConfidence: 'high',
          },
        ],
      },
      {
        id: 'remediation-workflow',
        title: 'Bias Remediation Workflow',
        description: 'Define processes for addressing identified bias',
        questions: [
          {
            id: 'bias-remediation-process',
            question: 'Is there a formal process for addressing bias identified by Aequitas?',
            type: 'radio',
            required: true,
            options: ['Yes, documented process', 'Informal process', 'No'],
            aiDetectedValue: 'Yes, documented process',
            aiConfidence: 'medium',
          },
          {
            id: 'remediation-timeline',
            question: 'What is the target timeline for bias remediation?',
            type: 'radio',
            required: true,
            options: [
              'Immediate (before deployment)',
              'Within 30 days',
              'Within 90 days',
              'Next model version',
              'No defined timeline'
            ],
            aiDetectedValue: 'Immediate (before deployment)',
            aiConfidence: 'high',
          },
          {
            id: 'deployment-blocking',
            question: 'Do Aequitas audit failures block model deployment?',
            type: 'radio',
            required: true,
            options: ['Yes, always', 'Yes, for critical violations', 'No'],
            aiDetectedValue: 'Yes, for critical violations',
            aiConfidence: 'high',
          },
          {
            id: 'article-10-alignment',
            question: 'How does Aequitas auditing support Article 10 bias monitoring requirements?',
            type: 'text',
            required: true,
          },
        ],
      },
    ],
  },
};
