import { assessmentFrameworks } from '@/app/data/assessmentFrameworks';

// Define compulsory skills/tools for each article (from ComplianceTaskDetail.tsx)
const articleRequirements: Record<string, {
  status: string;
  compulsorySkills: string[];
}> = {
  'Art. 9': {
    status: 'Mandatory for all high-risk systems.',
    compulsorySkills: ['risk-management', 'risk-assessment', 'ai-safety', 'red-team-testing', 'guardrails-implementation', 'toxicity-detection', 'hate-speech-detection', 'claim-verification', 'ai-ethics-fact-checking', 'content-toxicity-analysis', 'ai-ethics', 'ai-governance', 'ai-alignment-framework', 'incident-responder', 'ethics-review'],
  },
  'Art. 10': {
    status: 'Mandatory. Data must be relevant, representative, and free of errors. Bias testing is required.',
    compulsorySkills: ['data-classification', 'gdpr-compliance', 'bias-assessment', 'disaggregated-evaluation', 'ai-fairness-360', 'fairlearn', 'aequitas', 'what-if-tool', 'detoxify', 'perspective-api', 'moderate-content-api', 'hate-speech-detector', 'toxicity-detection', 'hate-speech-detection', 'claim-verification', 'ai-ethics-fact-checking', 'content-toxicity-analysis', 'ai-ethics', 'ai-governance', 'ai-alignment-framework', 'validating-ai-ethics-and-fairness'],
  },
  'Art. 11': {
    status: 'Mandatory. Must be maintained and kept up-to-date.',
    compulsorySkills: ['model-card-generation', 'model-cards-generator', 'weights-and-biases', 'ai-governance'],
  },
  'Art. 12': {
    status: 'Mandatory. Systems must automatically log events (traceability).',
    compulsorySkills: ['ai-logging-system', 'langsmith', 'ai-governance'],
  },
  'Art. 13': {
    status: 'Mandatory. Users must be able to interpret outputs and understand limitations.',
    compulsorySkills: ['shap-explainer', 'lime', 'captum', 'interpretml', 'what-if-tool', 'ai-transparency-labels', 'model-card-generation', 'explainability-planning', 'toxicity-detection', 'claim-verification', 'ai-ethics-fact-checking', 'ai-content-detector', 'ai-generated-content-detection', 'ai-ethics', 'ai-governance', 'ai-alignment-framework'],
  },
  'Art. 14': {
    status: 'Mandatory for high-risk AI systems.',
    compulsorySkills: ['hitl-design', 'conformance-calibration', 'ai-alignment-framework', 'ai-governance'],
  },
  'Art. 15': {
    status: 'Mandatory. Systems must be accurate, robust, and secure against cyber threats.',
    compulsorySkills: ['disaggregated-evaluation', 'red-team-testing', 'guardrails-implementation', 'ragas', 'deepeval', 'huggingface-evaluate', 'langsmith', 'weights-and-biases', 'promptfoo', 'evidently-ai', 'alibi-detect', 'prompt-injection-detector', 'security-frameworks', 'vulnerability-scanning', 'python-dependency-safety', 'snyk-security-assessment', 'oss-scorecard-assessment', 'claimbuster-api', 'ai-hallucination', 'ai-ethics-fact-checking', 'ai-governance', 'disaggregated-evaluation'],
  },
  'Art. 17': {
    status: 'Mandatory for high-risk AI systems.',
    compulsorySkills: ['qms-tracker', 'conformance-calibration', 'ai-governance'],
  },
  'Art. 22': {
    status: 'Required for providers established outside the EU.',
    compulsorySkills: ['authorized-rep-manager'],
  },
  'Art. 23': {
    status: 'Importers must ensure systems comply before placing on EU market.',
    compulsorySkills: ['importer-compliance-check'],
  },
  'Art. 24': {
    status: 'Distributors must verify compliance before distribution.',
    compulsorySkills: ['distributor-verification'],
  },
  'Art. 26': {
    status: 'Deployers must use systems according to instructions and monitor operations.',
    compulsorySkills: ['hitl-design', 'deployer-monitoring'],
  },
  'Art. 27': {
    status: 'Required for high-risk AI systems that may impact fundamental rights.',
    compulsorySkills: ['fria-assessment', 'bias-assessment', 'hitl-design', 'ai-fairness-360', 'ethics-review', 'validating-ai-ethics-and-fairness', 'ai-governance'],
  },
  'Art. 47': {
    status: 'Required before placing high-risk AI system on the market.',
    compulsorySkills: ['doc-vault', 'ai-governance'],
  },
  'Art. 48': {
    status: 'Required for high-risk AI systems before market placement.',
    compulsorySkills: ['ce-marking-generator', 'ai-governance'],
  },
  'Art. 49': {
    status: 'Required registration in EU database for high-risk AI systems.',
    compulsorySkills: ['ai-system-registry', 'ai-governance'],
  },
  'Art. 72': {
    status: 'Mandatory for providers of high-risk AI systems.',
    compulsorySkills: ['post-market-monitor', 'incident-responder', 'validating-ai-ethics-and-fairness', 'ai-system-registry'],
  },
};

export interface CompulsorySkillWithQuestionnaire {
  skillId: string;
  displayName: string;
  description: string;
  article: string;
  category: string;
  articlesRequired: string[];
}

/**
 * Get all compulsory skills that have questionnaires available
 * @returns Array of compulsory skills with their details
 */
export function getCompulsorySkillsWithQuestionnaires(): CompulsorySkillWithQuestionnaire[] {
  // Collect all unique compulsory skills across all articles
  const allCompulsorySkills = new Set<string>();
  const skillToArticles = new Map<string, string[]>();
  
  Object.entries(articleRequirements).forEach(([article, requirements]) => {
    requirements.compulsorySkills.forEach((skill) => {
      allCompulsorySkills.add(skill);
      
      // Track which articles require this skill
      if (!skillToArticles.has(skill)) {
        skillToArticles.set(skill, []);
      }
      skillToArticles.get(skill)!.push(article);
    });
  });

  // Filter to only skills that have questionnaires available
  const skillsWithQuestionnaires: CompulsorySkillWithQuestionnaire[] = [];
  
  allCompulsorySkills.forEach((skillId) => {
    const framework = assessmentFrameworks[skillId];
    
    // Only include if framework exists (meaning questionnaire is available)
    if (framework) {
      skillsWithQuestionnaires.push({
        skillId,
        displayName: framework.displayName,
        description: framework.description,
        article: framework.article,
        category: framework.category,
        articlesRequired: skillToArticles.get(skillId) || [],
      });
    }
  });

  // Sort by display name
  return skillsWithQuestionnaires.sort((a, b) => 
    a.displayName.localeCompare(b.displayName)
  );
}

/**
 * Get count of compulsory skills with questionnaires vs total
 */
export function getCompulsorySkillsStats() {
  const allCompulsorySkills = new Set<string>();
  
  Object.entries(articleRequirements).forEach(([_, requirements]) => {
    requirements.compulsorySkills.forEach((skill) => {
      allCompulsorySkills.add(skill);
    });
  });

  const totalCompulsorySkills = allCompulsorySkills.size;
  const skillsWithQuestionnaires = Array.from(allCompulsorySkills).filter(
    (skillId) => !!assessmentFrameworks[skillId]
  ).length;

  return {
    total: totalCompulsorySkills,
    withQuestionnaire: skillsWithQuestionnaires,
    withoutQuestionnaire: totalCompulsorySkills - skillsWithQuestionnaires,
    percentage: Math.round((skillsWithQuestionnaires / totalCompulsorySkills) * 100),
  };
}
