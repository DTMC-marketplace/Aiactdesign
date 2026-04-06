// Additional Security Assessment Frameworks for Article 15
// These frameworks are imported and merged with the main assessmentFrameworks

import { AssessmentFramework } from './assessmentFrameworks';

export const securityAssessmentFrameworks: Record<string, AssessmentFramework> = {
  'security-frameworks': {
    toolName: 'security-frameworks',
    displayName: 'Security Frameworks Assessment',
    description: 'Implements comprehensive security frameworks and best practices for AI systems.',
    article: 'Art. 15',
    category: 'Security',
    sections: [
      {
        id: 'framework-adoption',
        title: 'Security Framework Adoption',
        description: 'Identify security frameworks and standards currently adopted',
        questions: [
          {
            id: 'frameworks-implemented',
            question: 'Which security frameworks has your organization adopted?',
            type: 'checkbox',
            required: true,
            options: [
              'ISO/IEC 27001 (Information Security Management)',
              'NIST Cybersecurity Framework',
              'NIST AI Risk Management Framework',
              'SOC 2 (Service Organization Control)',
              'CIS Controls (Center for Internet Security)',
              'OWASP (Open Web Application Security Project)',
              'None currently implemented'
            ],
            aiDetectedValue: ['ISO/IEC 27001 (Information Security Management)', 'NIST Cybersecurity Framework'],
            aiConfidence: 'medium',
          },
          {
            id: 'ai-specific-security',
            question: 'Are AI-specific security controls implemented beyond general IT security?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Partially'],
            aiDetectedValue: 'Partially',
            aiConfidence: 'medium',
          },
          {
            id: 'framework-certification',
            question: 'Is your organization certified for any security frameworks?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'In Progress'],
          },
        ],
      },
      {
        id: 'threat-modeling',
        title: 'Threat Modeling',
        description: 'Assess threat modeling practices for AI systems',
        questions: [
          {
            id: 'threat-model-exists',
            question: 'Has a threat model been developed for your AI system?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'In Development'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'high',
          },
          {
            id: 'threat-categories',
            question: 'Which threat categories have been analyzed?',
            type: 'checkbox',
            required: true,
            options: [
              'Model poisoning (training data manipulation)',
              'Adversarial attacks on model inputs',
              'Model extraction/theft',
              'Data exfiltration',
              'Unauthorized access to AI infrastructure',
              'Supply chain attacks on dependencies'
            ],
            aiDetectedValue: ['Adversarial attacks on model inputs', 'Data exfiltration', 'Unauthorized access to AI infrastructure'],
            aiConfidence: 'high',
          },
          {
            id: 'threat-modeling-methodology',
            question: 'What threat modeling methodology is used?',
            type: 'radio',
            required: true,
            options: [
              'STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege)',
              'PASTA (Process for Attack Simulation and Threat Analysis)',
              'VAST (Visual, Agile, and Simple Threat modeling)',
              'Custom methodology',
              'No formal methodology'
            ],
          },
        ],
      },
      {
        id: 'security-controls',
        title: 'Security Controls Implementation',
        description: 'Evaluate implemented security controls',
        questions: [
          {
            id: 'access-controls',
            question: 'What access control mechanisms are in place?',
            type: 'checkbox',
            required: true,
            options: [
              'Multi-factor authentication (MFA)',
              'Role-based access control (RBAC)',
              'Principle of least privilege',
              'Privileged access management (PAM)',
              'Regular access reviews',
              'Just-in-time access'
            ],
            aiDetectedValue: ['Multi-factor authentication (MFA)', 'Role-based access control (RBAC)', 'Principle of least privilege'],
            aiConfidence: 'high',
          },
          {
            id: 'data-protection',
            question: 'What data protection measures are implemented?',
            type: 'checkbox',
            required: true,
            options: [
              'Encryption at rest',
              'Encryption in transit (TLS/SSL)',
              'Data loss prevention (DLP)',
              'Database activity monitoring',
              'Tokenization/anonymization',
              'Secure key management'
            ],
            aiDetectedValue: ['Encryption at rest', 'Encryption in transit (TLS/SSL)', 'Secure key management'],
            aiConfidence: 'high',
          },
          {
            id: 'network-security',
            question: 'What network security controls are in place?',
            type: 'checkbox',
            required: true,
            options: [
              'Firewalls and network segmentation',
              'Intrusion detection/prevention systems (IDS/IPS)',
              'Virtual private networks (VPN)',
              'DDoS protection',
              'Network traffic monitoring',
              'Zero trust architecture'
            ],
          },
        ],
      },
      {
        id: 'compliance-alignment',
        title: 'Compliance and Alignment',
        description: 'Assess alignment with regulatory requirements',
        questions: [
          {
            id: 'article-15-compliance',
            question: 'How does your security framework address Article 15 robustness requirements?',
            type: 'text',
            required: true,
          },
          {
            id: 'audit-frequency',
            question: 'How frequently are security controls audited?',
            type: 'radio',
            required: true,
            options: [
              'Continuously',
              'Quarterly',
              'Semi-annually',
              'Annually',
              'No regular audits'
            ],
            aiDetectedValue: 'Quarterly',
            aiConfidence: 'medium',
          },
          {
            id: 'penetration-testing',
            question: 'Is penetration testing conducted on AI systems?',
            type: 'radio',
            required: true,
            options: ['Yes, regularly', 'Yes, occasionally', 'No', 'Planned'],
            aiDetectedValue: 'Yes, regularly',
            aiConfidence: 'medium',
          },
        ],
      },
    ],
  },

  'vulnerability-scanning': {
    toolName: 'vulnerability-scanning',
    displayName: 'Vulnerability Scanning Assessment (Grype)',
    description: 'Scans container images and filesystems for known vulnerabilities in dependencies.',
    article: 'Art. 15',
    category: 'Security',
    sections: [
      {
        id: 'scanning-scope',
        title: 'Scanning Scope and Coverage',
        description: 'Define the scope of vulnerability scanning',
        questions: [
          {
            id: 'assets-scanned',
            question: 'What AI system assets are regularly scanned for vulnerabilities?',
            type: 'checkbox',
            required: true,
            options: [
              'Container images',
              'Application dependencies',
              'Operating system packages',
              'Infrastructure as code',
              'ML model artifacts',
              'Third-party libraries'
            ],
            aiDetectedValue: ['Container images', 'Application dependencies', 'Third-party libraries'],
            aiConfidence: 'high',
          },
          {
            id: 'scan-frequency',
            question: 'How frequently are vulnerability scans performed?',
            type: 'radio',
            required: true,
            options: [
              'Continuous (on every build)',
              'Daily',
              'Weekly',
              'Monthly',
              'Ad-hoc only'
            ],
            aiDetectedValue: 'Continuous (on every build)',
            aiConfidence: 'high',
          },
          {
            id: 'scan-automation',
            question: 'Is vulnerability scanning automated in your CI/CD pipeline?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Partially'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'high',
          },
        ],
      },
      {
        id: 'vulnerability-management',
        title: 'Vulnerability Management Process',
        description: 'Assess vulnerability identification and remediation processes',
        questions: [
          {
            id: 'severity-classification',
            question: 'How are vulnerabilities classified by severity?',
            type: 'radio',
            required: true,
            options: [
              'Using CVSS scores (Common Vulnerability Scoring System)',
              'Using vendor severity ratings',
              'Custom severity classification',
              'No formal classification'
            ],
            aiDetectedValue: 'Using CVSS scores (Common Vulnerability Scoring System)',
            aiConfidence: 'high',
          },
          {
            id: 'remediation-sla',
            question: 'What are the remediation SLAs for discovered vulnerabilities?',
            type: 'checkbox',
            required: true,
            options: [
              'Critical: 24-48 hours',
              'High: 7 days',
              'Medium: 30 days',
              'Low: 90 days',
              'No defined SLAs'
            ],
            aiDetectedValue: ['Critical: 24-48 hours', 'High: 7 days', 'Medium: 30 days'],
            aiConfidence: 'medium',
          },
          {
            id: 'vulnerability-tracking',
            question: 'How are vulnerabilities tracked and managed?',
            type: 'checkbox',
            required: true,
            options: [
              'Dedicated vulnerability management system',
              'Issue tracking system (Jira, GitHub Issues)',
              'Security dashboard',
              'Spreadsheet tracking',
              'Email notifications only'
            ],
          },
          {
            id: 'false-positive-handling',
            question: 'How are false positives handled in vulnerability reports?',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        id: 'reporting-metrics',
        title: 'Reporting and Metrics',
        description: 'Track vulnerability scanning metrics and reporting',
        questions: [
          {
            id: 'vulnerability-metrics',
            question: 'What vulnerability metrics are tracked?',
            type: 'checkbox',
            required: true,
            options: [
              'Number of vulnerabilities by severity',
              'Mean time to remediate (MTTR)',
              'Vulnerability backlog',
              'Scan coverage percentage',
              'Trend analysis over time'
            ],
            aiDetectedValue: ['Number of vulnerabilities by severity', 'Mean time to remediate (MTTR)', 'Scan coverage percentage'],
            aiConfidence: 'medium',
          },
          {
            id: 'stakeholder-reporting',
            question: 'Are vulnerability reports shared with relevant stakeholders?',
            type: 'radio',
            required: true,
            options: ['Yes, regularly', 'Yes, on-demand', 'No'],
            aiDetectedValue: 'Yes, regularly',
            aiConfidence: 'medium',
          },
          {
            id: 'blocking-policy',
            question: 'Are builds blocked if critical vulnerabilities are detected?',
            type: 'radio',
            required: true,
            options: ['Yes, always', 'Yes, configurable by severity', 'No'],
            aiDetectedValue: 'Yes, configurable by severity',
            aiConfidence: 'high',
          },
        ],
      },
    ],
  },

  'python-dependency-safety': {
    toolName: 'python-dependency-safety',
    displayName: 'Python Dependency Safety Assessment (Safety/PyUp)',
    description: 'Checks Python dependencies for known security vulnerabilities.',
    article: 'Art. 15',
    category: 'Security',
    sections: [
      {
        id: 'dependency-inventory',
        title: 'Dependency Inventory',
        description: 'Catalog Python dependencies used in AI systems',
        questions: [
          {
            id: 'dependency-management',
            question: 'How are Python dependencies managed?',
            type: 'checkbox',
            required: true,
            options: [
              'requirements.txt',
              'Pipfile/Pipenv',
              'pyproject.toml/Poetry',
              'conda environment.yml',
              'setup.py',
              'No formal dependency management'
            ],
            aiDetectedValue: ['requirements.txt', 'pyproject.toml/Poetry'],
            aiConfidence: 'high',
          },
          {
            id: 'dependency-pinning',
            question: 'Are dependency versions pinned/locked?',
            type: 'radio',
            required: true,
            options: ['Yes, all dependencies', 'Partially', 'No'],
            aiDetectedValue: 'Yes, all dependencies',
            aiConfidence: 'high',
          },
          {
            id: 'dependency-count',
            question: 'Approximately how many Python dependencies does your AI system use?',
            type: 'radio',
            required: true,
            options: [
              'Less than 20',
              '20-50',
              '50-100',
              'More than 100'
            ],
          },
        ],
      },
      {
        id: 'vulnerability-checking',
        title: 'Vulnerability Checking Process',
        description: 'Assess dependency vulnerability checking practices',
        questions: [
          {
            id: 'safety-integration',
            question: 'Is Safety (PyUp) integrated into your development workflow?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Evaluating'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'high',
          },
          {
            id: 'check-frequency',
            question: 'How frequently are Python dependencies checked for vulnerabilities?',
            type: 'radio',
            required: true,
            options: [
              'On every commit/PR',
              'Daily',
              'Weekly',
              'Before each release',
              'Ad-hoc only'
            ],
            aiDetectedValue: 'On every commit/PR',
            aiConfidence: 'high',
          },
          {
            id: 'vulnerability-database',
            question: 'What vulnerability databases are consulted?',
            type: 'checkbox',
            required: true,
            options: [
              'PyUp Safety DB',
              'OSV (Open Source Vulnerabilities)',
              'CVE/NVD (National Vulnerability Database)',
              'GitHub Advisory Database',
              'Snyk vulnerability database'
            ],
            aiDetectedValue: ['PyUp Safety DB', 'GitHub Advisory Database'],
            aiConfidence: 'medium',
          },
        ],
      },
      {
        id: 'remediation-process',
        title: 'Remediation and Update Process',
        description: 'Define processes for addressing vulnerable dependencies',
        questions: [
          {
            id: 'update-policy',
            question: 'What is your policy for updating vulnerable dependencies?',
            type: 'radio',
            required: true,
            options: [
              'Immediate update for all severities',
              'Prioritized by severity',
              'Monthly/quarterly update cycles',
              'Only update when breaking',
              'No formal policy'
            ],
            aiDetectedValue: 'Prioritized by severity',
            aiConfidence: 'medium',
          },
          {
            id: 'testing-after-update',
            question: 'Are dependencies tested after security updates?',
            type: 'radio',
            required: true,
            options: ['Yes, comprehensive testing', 'Yes, basic testing', 'No'],
            aiDetectedValue: 'Yes, comprehensive testing',
            aiConfidence: 'medium',
          },
          {
            id: 'dependency-alternatives',
            question: 'If a vulnerability cannot be patched, are alternative dependencies considered?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Case-by-case basis'],
          },
          {
            id: 'transitive-dependencies',
            question: 'How are vulnerabilities in transitive (indirect) dependencies handled?',
            type: 'text',
            required: true,
          },
        ],
      },
    ],
  },

  'snyk-security-assessment': {
    toolName: 'snyk-security-assessment',
    displayName: 'Snyk Security Assessment',
    description: 'Comprehensive security platform for finding and fixing vulnerabilities in code, dependencies, and containers.',
    article: 'Art. 15',
    category: 'Security',
    sections: [
      {
        id: 'snyk-coverage',
        title: 'Snyk Coverage and Integration',
        description: 'Assess Snyk implementation across your AI systems',
        questions: [
          {
            id: 'snyk-products',
            question: 'Which Snyk products are implemented?',
            type: 'checkbox',
            required: true,
            options: [
              'Snyk Open Source (dependency scanning)',
              'Snyk Code (static application security testing)',
              'Snyk Container (container image scanning)',
              'Snyk Infrastructure as Code (IaC scanning)',
              'None currently implemented'
            ],
            aiDetectedValue: ['Snyk Open Source (dependency scanning)', 'Snyk Container (container image scanning)'],
            aiConfidence: 'high',
          },
          {
            id: 'integration-points',
            question: 'Where is Snyk integrated?',
            type: 'checkbox',
            required: true,
            options: [
              'IDE (developer workstations)',
              'Git repositories (GitHub, GitLab, Bitbucket)',
              'CI/CD pipelines',
              'Container registries',
              'Production runtime monitoring'
            ],
            aiDetectedValue: ['Git repositories (GitHub, GitLab, Bitbucket)', 'CI/CD pipelines'],
            aiConfidence: 'high',
          },
          {
            id: 'developer-adoption',
            question: 'What percentage of developers actively use Snyk?',
            type: 'radio',
            required: true,
            options: [
              '90-100%',
              '70-90%',
              '50-70%',
              'Below 50%',
              'Not measured'
            ],
          },
        ],
      },
      {
        id: 'vulnerability-prioritization',
        title: 'Vulnerability Prioritization',
        description: 'Assess how vulnerabilities are prioritized and addressed',
        questions: [
          {
            id: 'priority-score',
            question: 'Do you use Snyk Priority Score for vulnerability prioritization?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Partially'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'medium',
          },
          {
            id: 'auto-fix',
            question: 'Are Snyk automatic fix PRs enabled?',
            type: 'radio',
            required: true,
            options: ['Yes, for all projects', 'Yes, for selected projects', 'No'],
            aiDetectedValue: 'Yes, for selected projects',
            aiConfidence: 'medium',
          },
          {
            id: 'fix-metrics',
            question: 'What percentage of Snyk-identified vulnerabilities are remediated within SLA?',
            type: 'radio',
            required: true,
            options: [
              'Above 90%',
              '70-90%',
              '50-70%',
              'Below 50%',
              'Not tracked'
            ],
          },
          {
            id: 'policy-configuration',
            question: 'Are Snyk policies configured to enforce security standards?',
            type: 'radio',
            required: true,
            options: ['Yes, comprehensive policies', 'Yes, basic policies', 'No'],
            aiDetectedValue: 'Yes, comprehensive policies',
            aiConfidence: 'medium',
          },
        ],
      },
      {
        id: 'monitoring-reporting',
        title: 'Monitoring and Reporting',
        description: 'Track security posture and generate reports',
        questions: [
          {
            id: 'dashboard-usage',
            question: 'Do security teams regularly review the Snyk dashboard?',
            type: 'radio',
            required: true,
            options: ['Yes, daily', 'Yes, weekly', 'Yes, monthly', 'Rarely', 'No'],
            aiDetectedValue: 'Yes, weekly',
            aiConfidence: 'medium',
          },
          {
            id: 'reporting-frequency',
            question: 'How frequently are Snyk security reports generated?',
            type: 'radio',
            required: true,
            options: [
              'Real-time alerts',
              'Daily summaries',
              'Weekly reports',
              'Monthly reports',
              'On-demand only'
            ],
            aiDetectedValue: 'Weekly reports',
            aiConfidence: 'medium',
          },
          {
            id: 'compliance-tracking',
            question: 'Are Snyk reports used for Article 15 compliance documentation?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Planning to'],
          },
        ],
      },
    ],
  },

  'oss-scorecard-assessment': {
    toolName: 'oss-scorecard-assessment',
    displayName: 'OSS Scorecard Assessment',
    description: 'Assesses security posture of open-source dependencies using automated security checks.',
    article: 'Art. 15',
    category: 'Security',
    sections: [
      {
        id: 'oss-evaluation',
        title: 'Open Source Security Evaluation',
        description: 'Assess security practices of open-source dependencies',
        questions: [
          {
            id: 'scorecard-usage',
            question: 'Is OpenSSF Scorecard used to evaluate open-source dependencies?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Evaluating'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'medium',
          },
          {
            id: 'evaluation-frequency',
            question: 'How frequently are dependencies evaluated with Scorecard?',
            type: 'radio',
            required: true,
            options: [
              'Before adding new dependencies',
              'Weekly/monthly for all dependencies',
              'Quarterly reviews',
              'One-time evaluation',
              'Not regularly evaluated'
            ],
            aiDetectedValue: 'Before adding new dependencies',
            aiConfidence: 'medium',
          },
          {
            id: 'scorecard-checks',
            question: 'Which Scorecard checks are considered critical for your AI systems?',
            type: 'checkbox',
            required: true,
            options: [
              'Security policy',
              'Dependency update tool',
              'Branch protection',
              'Code review',
              'Signed releases',
              'Vulnerability disclosure',
              'SAST (Static Application Security Testing)',
              'Fuzzing',
              'Pinned dependencies'
            ],
            aiDetectedValue: ['Security policy', 'Code review', 'Vulnerability disclosure', 'Pinned dependencies'],
            aiConfidence: 'medium',
          },
        ],
      },
      {
        id: 'dependency-selection',
        title: 'Dependency Selection Criteria',
        description: 'Define criteria for selecting open-source dependencies',
        questions: [
          {
            id: 'minimum-score',
            question: 'What is the minimum acceptable Scorecard score for dependencies?',
            type: 'radio',
            required: true,
            options: [
              '8.0-10.0 (Excellent)',
              '6.0-8.0 (Good)',
              '4.0-6.0 (Fair)',
              'No minimum threshold'
            ],
            aiDetectedValue: '6.0-8.0 (Good)',
            aiConfidence: 'low',
          },
          {
            id: 'exception-process',
            question: 'Is there a process for approving dependencies below the minimum score?',
            type: 'radio',
            required: true,
            options: ['Yes, formal approval required', 'Yes, case-by-case', 'No'],
          },
          {
            id: 'alternative-assessment',
            question: 'If a dependency scores poorly, are alternatives evaluated?',
            type: 'radio',
            required: true,
            options: ['Always', 'Usually', 'Rarely', 'Never'],
          },
          {
            id: 'dependency-documentation',
            question: 'Are Scorecard results documented in dependency approval records?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Partially'],
          },
        ],
      },
      {
        id: 'supply-chain-security',
        title: 'Supply Chain Security',
        description: 'Assess overall supply chain security posture',
        questions: [
          {
            id: 'sbom-generation',
            question: 'Is a Software Bill of Materials (SBOM) generated for your AI systems?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'In Development'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'medium',
          },
          {
            id: 'supply-chain-monitoring',
            question: 'How is ongoing supply chain security monitored?',
            type: 'checkbox',
            required: true,
            options: [
              'Automated dependency updates (Dependabot, Renovate)',
              'Regular Scorecard re-evaluation',
              'Security advisory monitoring',
              'Vendor security assessments',
              'Manual periodic reviews'
            ],
            aiDetectedValue: ['Automated dependency updates (Dependabot, Renovate)', 'Security advisory monitoring'],
            aiConfidence: 'medium',
          },
          {
            id: 'article-15-alignment',
            question: 'How does supply chain security support Article 15 robustness requirements?',
            type: 'text',
            required: true,
          },
        ],
      },
    ],
  },

  'evidently-ai': {
    toolName: 'evidently-ai',
    displayName: 'Evidently AI Monitoring Assessment',
    description: 'Monitors ML model quality, data drift, and performance degradation.',
    article: 'Art. 15',
    category: 'Security',
    sections: [
      {
        id: 'monitoring-setup',
        title: 'Monitoring Implementation',
        description: 'Assess Evidently AI monitoring configuration',
        questions: [
          {
            id: 'evidently-deployment',
            question: 'Is Evidently AI deployed for your AI systems?',
            type: 'radio',
            required: true,
            options: ['Yes, in production', 'Yes, in staging only', 'No', 'Planning'],
            aiDetectedValue: 'Yes, in production',
            aiConfidence: 'high',
          },
          {
            id: 'monitoring-metrics',
            question: 'Which metrics are monitored using Evidently?',
            type: 'checkbox',
            required: true,
            options: [
              'Data drift detection',
              'Target drift detection',
              'Model performance degradation',
              'Data quality issues',
              'Prediction drift',
              'Feature importance changes'
            ],
            aiDetectedValue: ['Data drift detection', 'Model performance degradation', 'Data quality issues'],
            aiConfidence: 'high',
          },
          {
            id: 'monitoring-frequency',
            question: 'How frequently are monitoring checks performed?',
            type: 'radio',
            required: true,
            options: [
              'Real-time (continuous)',
              'Hourly',
              'Daily',
              'Weekly',
              'On-demand only'
            ],
            aiDetectedValue: 'Daily',
            aiConfidence: 'medium',
          },
        ],
      },
      {
        id: 'drift-detection',
        title: 'Drift Detection and Response',
        description: 'Assess data and model drift detection practices',
        questions: [
          {
            id: 'drift-thresholds',
            question: 'Are drift detection thresholds configured?',
            type: 'radio',
            required: true,
            options: ['Yes, for all critical features', 'Yes, for some features', 'No'],
            aiDetectedValue: 'Yes, for all critical features',
            aiConfidence: 'medium',
          },
          {
            id: 'drift-alerts',
            question: 'What happens when significant drift is detected?',
            type: 'checkbox',
            required: true,
            options: [
              'Automated alerts to ML team',
              'Dashboard notification',
              'Incident ticket creation',
              'Automated model retraining trigger',
              'Manual investigation only'
            ],
            aiDetectedValue: ['Automated alerts to ML team', 'Dashboard notification', 'Incident ticket creation'],
            aiConfidence: 'high',
          },
          {
            id: 'retraining-criteria',
            question: 'Are model retraining criteria defined based on drift metrics?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Under development'],
          },
        ],
      },
      {
        id: 'performance-robustness',
        title: 'Performance and Robustness Monitoring',
        description: 'Track model accuracy and robustness per Article 15',
        questions: [
          {
            id: 'accuracy-tracking',
            question: 'Is production model accuracy continuously tracked?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Partially'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'high',
          },
          {
            id: 'performance-degradation',
            question: 'What is the acceptable threshold for performance degradation?',
            type: 'radio',
            required: true,
            options: [
              'Less than 2% decrease',
              '2-5% decrease',
              '5-10% decrease',
              'More than 10% decrease',
              'No defined threshold'
            ],
            aiDetectedValue: '2-5% decrease',
            aiConfidence: 'low',
          },
          {
            id: 'robustness-testing',
            question: 'Are robustness tests performed against adversarial inputs?',
            type: 'radio',
            required: true,
            options: ['Yes, regularly', 'Yes, occasionally', 'No', 'Planned'],
          },
          {
            id: 'compliance-documentation',
            question: 'Are Evidently monitoring reports used for Article 15 compliance documentation?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Planning to'],
          },
        ],
      },
    ],
  },

  'alibi-detect': {
    toolName: 'alibi-detect',
    displayName: 'Alibi Detect Assessment',
    description: 'Detects outliers, adversarial attacks, and data drift in ML systems.',
    article: 'Art. 15',
    category: 'Security',
    sections: [
      {
        id: 'detection-capabilities',
        title: 'Detection Capabilities',
        description: 'Assess Alibi Detect implementation and capabilities',
        questions: [
          {
            id: 'alibi-deployment',
            question: 'Is Alibi Detect deployed for your AI systems?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No', 'Evaluating'],
            aiDetectedValue: 'Yes',
            aiConfidence: 'medium',
          },
          {
            id: 'detection-types',
            question: 'Which detection capabilities are implemented?',
            type: 'checkbox',
            required: true,
            options: [
              'Outlier detection',
              'Adversarial attack detection',
              'Data drift detection',
              'Concept drift detection',
              'Model uncertainty quantification'
            ],
            aiDetectedValue: ['Outlier detection', 'Data drift detection', 'Adversarial attack detection'],
            aiConfidence: 'high',
          },
          {
            id: 'deployment-stage',
            question: 'Where is Alibi Detect deployed?',
            type: 'checkbox',
            required: true,
            options: [
              'Production inference pipeline',
              'Model validation during development',
              'Continuous monitoring',
              'Batch processing',
              'Not yet deployed'
            ],
            aiDetectedValue: ['Production inference pipeline', 'Continuous monitoring'],
            aiConfidence: 'medium',
          },
        ],
      },
      {
        id: 'adversarial-detection',
        title: 'Adversarial Attack Detection',
        description: 'Assess adversarial input detection and response',
        questions: [
          {
            id: 'adversarial-methods',
            question: 'Which adversarial detection methods are used?',
            type: 'checkbox',
            required: true,
            options: [
              'Statistical distance measures',
              'Model uncertainty metrics',
              'Feature space analysis',
              'Ensemble-based detection',
              'None currently implemented'
            ],
            aiDetectedValue: ['Statistical distance measures', 'Model uncertainty metrics'],
            aiConfidence: 'medium',
          },
          {
            id: 'adversarial-response',
            question: 'What happens when an adversarial input is detected?',
            type: 'checkbox',
            required: true,
            options: [
              'Input is rejected',
              'Alert to security team',
              'Logged for investigation',
              'User notification',
              'Fallback to safe default'
            ],
            aiDetectedValue: ['Input is rejected', 'Alert to security team', 'Logged for investigation'],
            aiConfidence: 'high',
          },
          {
            id: 'false-positive-rate',
            question: 'What is the acceptable false positive rate for adversarial detection?',
            type: 'radio',
            required: true,
            options: [
              'Less than 1%',
              '1-5%',
              '5-10%',
              'More than 10%',
              'Not defined'
            ],
          },
        ],
      },
      {
        id: 'drift-outlier-monitoring',
        title: 'Drift and Outlier Monitoring',
        description: 'Monitor for distribution shifts and anomalies',
        questions: [
          {
            id: 'drift-detection-frequency',
            question: 'How frequently is drift detection performed?',
            type: 'radio',
            required: true,
            options: [
              'Real-time on every prediction',
              'Batch processing (hourly/daily)',
              'Weekly analysis',
              'Monthly analysis',
              'Not regularly performed'
            ],
            aiDetectedValue: 'Batch processing (hourly/daily)',
            aiConfidence: 'medium',
          },
          {
            id: 'outlier-handling',
            question: 'How are outliers handled in production?',
            type: 'checkbox',
            required: true,
            options: [
              'Flagged for manual review',
              'Processed with increased scrutiny',
              'Rejected automatically',
              'Logged but processed normally',
              'Special prediction path'
            ],
          },
          {
            id: 'robustness-compliance',
            question: 'How does Alibi Detect support Article 15 robustness requirements?',
            type: 'text',
            required: true,
          },
        ],
      },
    ],
  },
};
