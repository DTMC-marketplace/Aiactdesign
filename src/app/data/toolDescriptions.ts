// Tool Descriptions Mapping based on GitHub AI Act Skills Packages
export const toolDescriptionsMap: { [key: string]: { name: string; description: string; category: string } } = {
  // Cybersecurity Tools
  'prompt-injection-detector': {
    name: 'Prompt Injection Detector',
    category: 'Cybersecurity',
    description: 'Detects and prevents prompt injection attacks in AI systems. Analyzes input prompts to identify potential security vulnerabilities including malicious instructions, data exfiltration attempts, and unauthorized command execution. Essential for LLM-based systems to maintain security integrity per Article 15.'
  },
  'security-frameworks': {
    name: 'Security Frameworks',
    category: 'Cybersecurity',
    description: 'Implements comprehensive security frameworks and best practices for AI systems. Provides structured approach to cybersecurity including threat modeling, vulnerability assessment, and security controls implementation aligned with industry standards and Article 15 robustness requirements.'
  },
  'grype-vulnerability': {
    name: 'Grype Vulnerability Scanner',
    category: 'Cybersecurity',
    description: 'Scans container images and filesystems for known vulnerabilities in dependencies and libraries. Identifies security risks in AI system components to ensure robust protection against exploits and maintain compliance with Article 15 cybersecurity requirements.'
  },
  'safety-pyup': {
    name: 'Safety (PyUp)',
    category: 'Cybersecurity',
    description: 'Checks Python dependencies for known security vulnerabilities and suggests updates. Maintains secure software supply chain for Python-based AI systems by identifying and remediating vulnerable packages in real-time, essential for Article 15 compliance.'
  },
  'snyk-io': {
    name: 'Snyk',
    category: 'Cybersecurity',
    description: 'Developer-first security platform that finds and automatically fixes vulnerabilities in code, dependencies, containers, and infrastructure as code. Provides continuous monitoring and protection for AI system components per Article 15 cybersecurity requirements.'
  },
  'oss-scorecard': {
    name: 'OSS Scorecard',
    category: 'Cybersecurity',
    description: 'Assesses security posture of open-source projects using automated checks. Evaluates security practices of dependencies used in AI systems including code review, dependency management, and vulnerability disclosure processes to ensure supply chain security.'
  },
  
  // Fundamental Rights Tools
  'fria-assessment': {
    name: 'Fundamental Rights Impact Assessment (FRIA)',
    category: 'Fundamental Rights',
    description: 'Conducts comprehensive assessment of AI system impact on fundamental rights including privacy, non-discrimination, and human dignity per Article 27. Identifies potential rights violations and provides mitigation strategies aligned with EU Charter of Fundamental Rights.'
  },
  
  // Privacy Tools
  'data-classification': {
    name: 'Data Classification',
    category: 'Privacy',
    description: 'Automatically classifies and labels sensitive data including personal data, special categories of data, and confidential information. Enables proper data governance per Article 10 and ensures GDPR compliance through systematic data categorization and handling procedures.'
  },
  'gdpr-compliance': {
    name: 'GDPR Compliance',
    category: 'Privacy',
    description: 'Comprehensive toolkit for ensuring General Data Protection Regulation compliance in AI systems. Validates data processing activities, consent mechanisms, data subject rights implementation, and privacy-by-design principles per Article 10 data governance requirements.'
  },
  'hipaa-compliance': {
    name: 'HIPAA Compliance',
    category: 'Privacy',
    description: 'Ensures Health Insurance Portability and Accountability Act compliance for AI systems processing protected health information. Implements required safeguards, audit controls, and privacy protections for healthcare AI applications beyond GDPR requirements.'
  },
  'pci-dss-compliance': {
    name: 'PCI DSS Compliance',
    category: 'Privacy',
    description: 'Validates Payment Card Industry Data Security Standard compliance for AI systems handling payment card data. Implements security controls, encryption, and monitoring requirements to protect cardholder information in financial AI applications.'
  },
  
  // Societal Tools
  'detoxify': {
    name: 'Detoxify',
    category: 'Societal',
    description: 'Machine learning model that detects toxic comments and harmful content in text. Identifies toxicity, severe toxicity, obscenity, threats, insults, and identity-based hate to ensure AI system outputs are socially responsible and prevent harmful societal impacts.'
  },
  'hate-speech-detector': {
    name: 'Hate Speech Detector',
    category: 'Societal',
    description: 'Identifies hate speech and discriminatory language in AI system outputs. Detects offensive content targeting protected characteristics including race, religion, gender, and sexual orientation to prevent harmful societal impacts and ensure fundamental rights protection.'
  },
  'claimbuster-api': {
    name: 'ClaimBuster API',
    category: 'Societal',
    description: 'Identifies check-worthy factual claims in text for fact-checking purposes. Helps ensure AI systems generate verifiable and accurate information, reducing spread of misinformation and maintaining societal trust in AI-generated content per Article 52.'
  },
  'fact-checker': {
    name: 'Fact Checker',
    category: 'Societal',
    description: 'Verifies factual accuracy of AI-generated content against reliable sources. Reduces misinformation and ensures AI systems produce truthful outputs, maintaining social responsibility and user trust while supporting Article 52 transparency requirements.'
  },
  'ai-content-detector': {
    name: 'AI Content Detector',
    category: 'Societal',
    description: 'Identifies AI-generated content to ensure transparency in synthetic content. Helps comply with Article 52 disclosure requirements for AI-generated or manipulated content including text, images, audio, and video deepfakes.'
  },
  'perspective-api-societal': {
    name: 'Perspective API',
    category: 'Societal',
    description: 'Analyzes text for various attributes including toxicity, profanity, identity attacks, and threats. Uses machine learning to identify potentially problematic content and maintain healthy online conversations through AI systems.'
  },
  'textblob-sentiment': {
    name: 'TextBlob Sentiment Analysis',
    category: 'Societal',
    description: 'Analyzes sentiment and subjectivity in text outputs. Helps monitor AI system emotional tone and bias in generated content to ensure balanced and appropriate communication that respects societal norms.'
  },
  'vader-sentiment': {
    name: 'VADER Sentiment Analysis',
    category: 'Societal',
    description: 'Valence Aware Dictionary and sEntiment Reasoner specifically attuned to social media text sentiment. Detects sentiment polarity and intensity in AI outputs to maintain appropriate tone and messaging in social contexts.'
  },
  
  // Fairness & Bias Detection Tools
  'ai-fairness-360': {
    name: 'AI Fairness 360 (AIF360)',
    category: 'Fairness',
    description: 'Comprehensive toolkit from IBM to examine, report, and mitigate discrimination and bias in machine learning models. Provides over 70 fairness metrics and 10 bias mitigation algorithms for pre-processing, in-processing, and post-processing stages. Essential for Article 10 bias monitoring and Article 15 accuracy requirements.'
  },
  'fairlearn': {
    name: 'Fairlearn',
    category: 'Fairness',
    description: 'Python package for assessing and improving fairness of machine learning models. Offers fairness metrics for classification and regression, and mitigation algorithms including GridSearch, ExponentiatedGradient, and ThresholdOptimizer. Ensures equitable AI system performance across demographic groups per Article 10.'
  },
  'aequitas': {
    name: 'Aequitas',
    category: 'Fairness',
    description: 'Bias and fairness audit toolkit for machine learning models. Provides comprehensive fairness metrics and interactive bias report generation across multiple protected groups. Supports fairness-aware model development to prevent discrimination in high-risk AI systems per Articles 10 and 15.'
  },
  'bias-assessment': {
    name: 'Bias Assessment',
    category: 'Fairness',
    description: 'Systematic evaluation framework for identifying and quantifying algorithmic bias in AI systems. Analyzes disparate impact across protected characteristics including race, gender, age, and disability. Provides actionable insights for bias mitigation strategies aligned with Article 10 requirements.'
  },
  'disaggregated-evaluation': {
    name: 'Disaggregated Evaluation',
    category: 'Fairness',
    description: 'Evaluates model performance separately across different demographic subgroups to identify performance disparities. Ensures AI systems maintain consistent accuracy and fairness across all population segments, preventing discriminatory outcomes in high-risk applications per Article 15.'
  },
  'perspective-api': {
    name: 'Perspective API',
    category: 'Fairness',
    description: 'Uses machine learning to identify potential toxic, threatening, or unwelcome comments that may deter participation in online conversations. Analyzes text for various attributes including severe toxicity, identity attacks, insults, profanity, and threats. Helps maintain fair and inclusive AI interactions.'
  },
  'moderate-content-api': {
    name: 'Content Moderation API',
    category: 'Fairness',
    description: 'Automated content moderation system that detects inappropriate, offensive, or biased content in AI-generated outputs. Implements fairness checks to prevent discriminatory or harmful content from reaching users, ensuring AI systems respect fundamental rights and social norms per Article 52.'
  },
  
  // Trust & Explainability Tools
  'explainability-planning': {
    name: 'Explainability Planning',
    category: 'Trust',
    description: 'Strategic framework for designing explainable AI systems. Plans transparency requirements, explanation formats, and user communication strategies to ensure AI outputs are interpretable per Article 13 transparency and explainability obligations.'
  },
  'shap-explainer': {
    name: 'SHAP (SHapley Additive exPlanations)',
    category: 'Trust',
    description: 'Unified approach to explain machine learning model predictions using game-theoretic Shapley values. Provides feature importance and individual prediction explanations to ensure model transparency and interpretability per Article 13 requirements.'
  },
  'lime': {
    name: 'LIME (Local Interpretable Model-agnostic Explanations)',
    category: 'Trust',
    description: 'Explains predictions of any machine learning classifier by approximating it locally with an interpretable model. Enables understanding of individual predictions to build user trust and meet Article 13 explainability requirements for high-risk systems.'
  },
  'captum': {
    name: 'Captum',
    category: 'Trust',
    description: 'Model interpretability library for PyTorch providing attribution algorithms for neural networks. Offers diverse attribution methods including integrated gradients, layer conductance, and neuron attribution for deep learning explainability.'
  },
  'interpretml': {
    name: 'InterpretML',
    category: 'Trust',
    description: 'Open-source package for training interpretable models and explaining black-box systems. Includes glass-box models like Explainable Boosting Machines and various explanation techniques for transparency per Article 13.'
  },
  'what-if-tool': {
    name: 'What-If Tool',
    category: 'Trust',
    description: 'Interactive visual tool for probing machine learning models. Enables exploration of model behavior through hypothetical scenarios, helping identify biases and understand decision boundaries for better transparency and Article 10 fairness compliance.'
  },
  'ai-transparency-labels': {
    name: 'AI Transparency Labels',
    category: 'Trust',
    description: 'Generates standardized transparency labels for AI systems similar to nutrition labels. Communicates key information about AI capabilities, limitations, and intended use to users per Article 13 transparency and Article 52 disclosure requirements.'
  },
  'model-card-generation': {
    name: 'Model Card Generation',
    category: 'Trust',
    description: 'Creates comprehensive documentation of machine learning models including intended use, performance characteristics, limitations, and ethical considerations. Essential for Article 11 technical documentation and Article 13 transparency requirements for high-risk systems.'
  },
  
  // Health and Safety Tools
  'ai-safety': {
    name: 'AI Safety',
    category: 'Health and Safety',
    description: 'Comprehensive AI safety framework ensuring systems behave as intended and avoid harm. Implements safety guardrails, alignment techniques, and risk mitigation strategies per Article 9 risk management system requirements for high-risk AI applications.'
  },
  'ai-safety-planning': {
    name: 'AI Safety Planning',
    category: 'Health and Safety',
    description: 'Plans AI safety measures including alignment, guardrails, red teaming, and regulatory compliance. Provides structured approach to safety design covering EU AI Act Article 9 and NIST AI RMF requirements for comprehensive safety management in high-risk systems.'
  },
  'red-team-testing': {
    name: 'Red Team Testing',
    category: 'Health and Safety',
    description: 'Adversarial testing methodology to identify vulnerabilities and safety issues in AI systems. Simulates attacks including jailbreaking, prompt injection, and bias exploitation to strengthen system robustness per Article 15 testing requirements.'
  },
  'guardrails-implementation': {
    name: 'Guardrails Implementation',
    category: 'Health and Safety',
    description: 'Implements input validation and output filtering guardrails for AI systems. Prevents harmful inputs and outputs through content filtering, topic restrictions, and behavioral constraints to ensure safe operation per Article 9 safety requirements.'
  },

  // Environmental / Sustainability Tools
  'codecarbon': {
    name: 'CodeCarbon',
    category: 'Environmental',
    description: 'Tracks and estimates CO2 emissions produced by computing resources during AI model training and inference. Provides real-time carbon footprint monitoring to enable sustainable AI development and support environmental responsibility in compliance with EU sustainability directives.'
  },
  'cloud-carbon-footprint': {
    name: 'Cloud Carbon Footprint',
    category: 'Environmental',
    description: 'Measures, monitors, and reduces cloud computing carbon emissions across AWS, Azure, and GCP. Visualizes carbon footprint of cloud infrastructure used for AI workloads and provides recommendations for carbon reduction to support environmental sustainability goals.'
  },
  'ml-co2-impact': {
    name: 'ML CO2 Impact',
    category: 'Environmental',
    description: 'Calculates CO2 emissions from machine learning model training based on hardware, runtime, and regional energy sources. Enables carbon-aware AI development by quantifying environmental impact and supporting decisions for more sustainable ML practices.'
  },
  'watttime-carbon': {
    name: 'WattTime Carbon',
    category: 'Environmental',
    description: 'Provides real-time carbon intensity data for electricity grids to optimize AI workload scheduling. Enables carbon-intelligent computing by running AI training jobs when grid carbon intensity is lowest, reducing environmental impact of large-scale AI systems.'
  },

  // Performance Testing & Accuracy Tools
  'evidently-ai': {
    name: 'Evidently AI',
    category: 'Performance',
    description: 'Open-source ML model monitoring and testing framework for evaluating data quality, data drift, and model performance. Provides comprehensive reports on data integrity, target drift, and prediction quality for continuous Article 15 accuracy and robustness monitoring.'
  },
  'alibi-detect': {
    name: 'Alibi Detect',
    category: 'Performance',
    description: 'Outlier detection, adversarial detection, and data drift monitoring library for ML systems. Identifies anomalies and distribution shifts in real-time to maintain model accuracy and robustness per Article 15 requirements.'
  },
  'ragas': {
    name: 'RAGAS (Retrieval Augmented Generation Assessment)',
    category: 'Performance',
    description: 'Evaluation framework for Retrieval Augmented Generation (RAG) systems measuring faithfulness, answer relevance, and context precision. Ensures RAG-based AI systems provide accurate, relevant, and contextually appropriate responses per Article 15 accuracy requirements.'
  },
  'deepeval': {
    name: 'DeepEval',
    category: 'Performance',
    description: 'Comprehensive LLM testing and evaluation framework measuring factual accuracy (>95%), completeness (>90%), and consistency (>85%). Provides structured performance testing for AI systems to ensure reliability and accuracy compliance per Article 15.'
  },
  'huggingface-evaluate': {
    name: 'HuggingFace Evaluate',
    category: 'Performance',
    description: 'Comprehensive library of evaluation metrics for NLP, computer vision, and multimodal models. Provides standardized accuracy, precision, recall, F1, BLEU, ROUGE, and custom metrics for Article 15 performance validation and testing.'
  },
  'langsmith': {
    name: 'LangSmith',
    category: 'Performance',
    description: 'LLM observability and evaluation platform for debugging, testing, and monitoring language model applications. Tracks prompt performance, chains execution, and model accuracy to ensure reliable LLM-based systems per Article 15 requirements.'
  },
  'weights-and-biases': {
    name: 'Weights & Biases (W&B)',
    category: 'Performance',
    description: 'ML experiment tracking, model versioning, and performance monitoring platform. Provides comprehensive tracking of training metrics, model artifacts, and performance benchmarks to ensure reproducibility and Article 15 accuracy documentation.'
  },
  'promptfoo': {
    name: 'Promptfoo',
    category: 'Performance',
    description: 'LLM testing and evaluation tool for prompt engineering and model comparison. Tests prompts against multiple models and datasets to optimize accuracy, reduce hallucinations, and ensure consistent performance per Article 15 robustness requirements.'
  },

  // Human Oversight Tools
  'hitl-design': {
    name: 'Human-in-the-Loop (HITL) Design',
    category: 'Human Oversight',
    description: 'Framework for designing and implementing human-in-the-loop systems ensuring meaningful human oversight of AI decisions. Defines human intervention points, decision thresholds requiring human review, and interface design for effective human control. Critical for Article 14 human oversight requirements in high-risk AI systems.'
  },
  'incident-responder': {
    name: 'Incident Responder',
    category: 'Human Oversight',
    description: 'Comprehensive incident management system for high-risk AI systems per Article 73. Provides automated incident detection, AI-assisted severity classification, timeline tracking for 2/10/15 day reporting deadlines, remediation workflow management, and regulatory notification capabilities. Ensures compliance with serious incident reporting requirements while maintaining human oversight for critical decisions.'
  },
  'conformance-calibration': {
    name: 'Conformance Calibration',
    category: 'Human Oversight',
    description: 'Systematic change management system ensuring conformity assessment procedures per Articles 17 and 43. Implements comprehensive change request workflow, AI-powered impact assessment, automated testing validation, approval management, deployment tracking, and rollback capabilities. Maintains quality management system compliance through structured change control with human approval gates for all critical changes.'
  },

  // Compulsory Skills / Governance Tools
  'risk-management': {
    name: 'Risk Management',
    category: 'Risk Assessment',
    description: 'Comprehensive risk management framework for identifying, assessing, and mitigating risks throughout the AI system lifecycle. Implements continuous risk assessment, mitigation planning, and monitoring per Article 9 requirements for high-risk AI systems.'
  },
  'toxicity-detection': {
    name: 'Toxicity Detection Assessment',
    category: 'Content Safety',
    description: 'Automated assessment tool for detecting toxic, harmful, or offensive content in AI system outputs. Monitors for toxic language patterns, hate speech indicators, and harmful content generation to ensure compliance with content safety requirements.'
  },
  'hate-speech-detection': {
    name: 'Hate Speech Detection Assessment',
    category: 'Content Safety',
    description: 'Specialized detection system for identifying hate speech, discriminatory language, and targeted harassment in AI-generated content. Ensures compliance with fundamental rights protection and non-discrimination requirements per Articles 10 and 27.'
  },
  'ai-hallucination': {
    name: 'AI Hallucination Assessment',
    category: 'Accuracy & Reliability',
    description: 'Detects and assesses AI hallucinations, factual inaccuracies, and false information generation. Implements validation frameworks to ensure output accuracy and reliability per Article 15 accuracy requirements for high-risk systems.'
  },
  'ai-ethics-fact-checking': {
    name: 'AI Ethics Fact-Checking System Assessment',
    category: 'Governance',
    description: 'Comprehensive fact-checking and verification system for AI outputs ensuring ethical accuracy and truthfulness. Validates claims against authoritative sources and flags misinformation to maintain system integrity per transparency obligations.'
  },
  'content-toxicity-analysis': {
    name: 'Content Toxicity Analysis Assessment',
    category: 'Content Safety',
    description: 'In-depth analysis tool for evaluating content toxicity levels across multiple dimensions including severity, target groups, and context. Provides detailed toxicity metrics and recommendations for content moderation and filtering.'
  },
  'ai-alignment-framework': {
    name: 'AI Alignment Framework Assessment',
    category: 'Governance',
    description: 'Ensures AI system alignment with organizational values, ethical principles, and regulatory requirements. Implements alignment validation, goal specification, and behavioral constraints to maintain intended system behavior per Articles 13 and 14.'
  },
  'claim-verification': {
    name: 'Claim Verification Assessment',
    category: 'Content Safety',
    description: 'Automated verification system for validating factual claims in AI-generated content. Cross-references claims against authoritative sources and knowledge bases to ensure accuracy and prevent misinformation per Article 15 accuracy requirements.'
  },
  'ai-generated-content-detection': {
    name: 'AI Generated Content Detection Assessment',
    category: 'Transparency',
    description: 'Detects and labels AI-generated content including text, images, audio, and video. Ensures compliance with Article 52 transparency requirements for disclosure of AI-generated or manipulated content to users.'
  },
  'ai-governance': {
    name: 'AI Governance',
    category: 'Governance',
    description: 'Establishes governance structures and processes for responsible AI development and deployment. Implements policies, roles, and oversight mechanisms to ensure compliance with EU AI Act requirements including Articles 8-17.'
  },
  'ai-ethics': {
    name: 'AI Ethics Framework',
    category: 'Governance',
    description: 'Comprehensive framework for implementing ethical AI principles including fairness, transparency, accountability, and human oversight. Ensures AI systems align with ethical guidelines per Articles 9, 10, 13, and 14 of the EU AI Act.'
  },
  'ai-ethics-advisor': {
    name: 'AI Ethics Advisor',
    category: 'Governance',
    description: 'Advisory tool providing guidance on ethical AI development and deployment decisions. Helps navigate complex ethical considerations and ensures compliance with fundamental rights requirements throughout the AI system lifecycle.'
  },
  'ethics-review': {
    name: 'Ethics Review Board',
    category: 'Governance',
    description: 'Structured ethics review process for evaluating AI systems before deployment. Provides independent assessment of ethical considerations, fundamental rights impacts, and societal implications per Article 27 conformity assessment requirements.'
  },
  'validating-ai-ethics-and-fairness': {
    name: 'Validating AI Ethics and Fairness',
    category: 'Governance',
    description: 'Comprehensive validation toolkit for assessing AI system ethics and fairness. Tests for discrimination, bias, and fundamental rights violations to ensure compliance with Articles 10 and 29 validation and testing requirements.'
  },
  'ai-logging-system': {
    name: 'AI Logging System',
    category: 'Governance',
    description: 'Automated logging system for AI operations capturing decisions, inputs, outputs, and system events. Ensures auditability and traceability per Article 12 record-keeping requirements for high-risk AI systems.'
  },
  'ai-system-registry': {
    name: 'AI System Registry',
    category: 'Governance',
    description: 'Central registry for documenting and tracking AI systems throughout their lifecycle. Maintains compliance records, risk assessments, and system metadata per Article 71 EU database registration requirements.'
  },
  'qms-tracker': {
    name: 'Quality Management System Tracker',
    category: 'Governance',
    description: 'Tracks quality management system implementation and maintenance for AI systems. Ensures continuous compliance with Article 17 QMS requirements including design controls, risk management, and post-market monitoring.'
  },
  'ce-marking-generator': {
    name: 'CE Marking Generator',
    category: 'Governance',
    description: 'Generates CE marking documentation for high-risk AI systems entering the EU market. Ensures compliance with conformity assessment procedures and Article 49 CE marking requirements before market placement.'
  }
};

// Helper function to get tool description
export function getToolDescription(toolName: string): { name: string; description: string; category: string } | null {
  return toolDescriptionsMap[toolName] || null;
}