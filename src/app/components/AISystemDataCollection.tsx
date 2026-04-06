import { useState, useEffect } from 'react';
import { PageHeader } from './PageHeader';
import { FRIAQuestionnaire } from './FRIAQuestionnaire';
import { SkillAssessment } from './SkillAssessment';
import { FileText, HelpCircle, ArrowLeft, ArrowUpRight, Upload } from 'lucide-react';
import { toolDescriptionsMap } from '@/app/data/toolDescriptions';
import { getSkillAssessment } from '@/app/data/skillAssessments';
import { CollapsibleSection, AssessmentBlock, DocumentUploadSection, ComponentLinker, DatasetLinker } from './AISystemDataCollectionHelpers';
import { RiskManagementTab } from './RiskManagementTab';
import { RiskEvaluationV2 } from './RiskEvaluationV2';

// Prohibited Practices Mapping
const prohibitedPracticesMap: { [key: string]: { label: string; article: string; hasException: boolean; exceptionCondition: string | null } } = {
  'Subliminal / manipulative / deceptive techniques that materially distort behaviour and are likely to cause significant harm': {
    label: 'Subliminal / manipulative / deceptive techniques that materially distort behaviour and are likely to cause significant harm',
    article: 'Art. 5(1)(a)',
    hasException: false,
    exceptionCondition: null
  },
  'Exploitation of vulnerabilities (age, disability, or social/economic situation) to distort behaviour likely causing significant harm': {
    label: 'Exploitation of vulnerabilities (age, disability, or social/economic situation) to distort behaviour likely causing significant harm',
    article: 'Art. 5(1)(b)',
    hasException: false,
    exceptionCondition: null
  },
  'Social scoring leading to detrimental/unfavourable treatment (esp. unjustified/disproportionate)': {
    label: 'Social scoring leading to detrimental/unfavourable treatment (esp. unjustified/disproportionate)',
    article: 'Art. 5(1)(c)',
    hasException: false,
    exceptionCondition: null
  },
  'Criminal offence risk assessment / prediction based solely on profiling or personality traits (individual predictive policing)': {
    label: 'Criminal offence risk assessment / prediction based solely on profiling or personality traits (individual predictive policing)',
    article: 'Art. 5(1)(d)',
    hasException: true,
    exceptionCondition: 'AI system is used to support a human assessment based on objective and verifiable facts directly linked to criminal activity (not solely profiling). (Art.5(1)(d))'
  },
  'Untargeted scraping of facial images from the internet or CCTV to build / expand facial recognition databases': {
    label: 'Untargeted scraping of facial images from the internet or CCTV to build / expand facial recognition databases',
    article: 'Art. 5(1)(e)',
    hasException: false,
    exceptionCondition: null
  },
  'Emotion recognition in the workplace or in education settings': {
    label: 'Emotion recognition in the workplace or in education settings',
    article: 'Art. 5(1)(f)',
    hasException: true,
    exceptionCondition: 'AI system is for medical or safety reasons. (Art.5(1)(f))'
  },
  'Biometric categorisation that infers or predicts sensitive traits (e.g., race, political opinions, religion, trade union membership, sexual orientation)': {
    label: 'Biometric categorisation that infers or predicts sensitive traits (e.g., race, political opinions, religion, trade union membership, sexual orientation)',
    article: 'Art. 5(1)(g)',
    hasException: true,
    exceptionCondition: 'AI system is for labelling or filtering of lawfully acquired biometric datasets, such as images, based on biometric data or categorizing of biometric data in the area of law enforcement. (Art.5(1)(g))'
  },
  'Real-time remote biometric identification (RBI) in publicly accessible spaces for law enforcement purposes': {
    label: 'Real-time remote biometric identification (RBI) in publicly accessible spaces for law enforcement purposes',
    article: 'Art. 5(1)(h)',
    hasException: true,
    exceptionCondition: 'Only if strictly necessary for one of the listed objectives (victims / imminent serious threat / serious crime suspect) and with safeguards + authorisation requirements (Art. 5(2)–(7)).'
  }
};

interface AISystemDataCollectionProps {
  systemId: string;
  systemName: string;
  onBack: () => void;
  onSave: (data: any) => void;
}




export function AISystemDataCollection({
  systemId,
  systemName,
  onBack,
  onSave,
}: AISystemDataCollectionProps) {
  // Form state for System Identity
  const [aiSystemName, setAiSystemName] = useState(systemName);
  const [internalSystemId, setInternalSystemId] = useState('');
  const [commercialName, setCommercialName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerDepartment, setOwnerDepartment] = useState('');
  const [sameAsComplianceOwner, setSameAsComplianceOwner] = useState(false);
  const [systemStatus, setSystemStatus] = useState<'Planned' | 'In development' | 'Testing / Pilot' | 'In use (production)' | 'Retired'>('Planned');
  const [goLiveDate, setGoLiveDate] = useState('');
  const [isPartOfBroaderProduct, setIsPartOfBroaderProduct] = useState<'Yes' | 'No' | ''>('');
  const [productServiceName, setProductServiceName] = useState('');

  // Form state for Source & Operator Role
  const [defaultRoleApplies, setDefaultRoleApplies] = useState<'Yes' | 'No' | ''>('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [systemSource, setSystemSource] = useState<'In-house' | 'Vendor / Third-party' | 'Mixed' | 'Unknown' | ''>('');
  const [vendorName, setVendorName] = useState('');
  const [vendorEvidenceLink, setVendorEvidenceLink] = useState('');
  const [vendorEvidenceSavedLink, setVendorEvidenceSavedLink] = useState('');
  const [modifyCustomize, setModifyCustomize] = useState<'Yes' | 'No' | 'Unknown' | ''>('');
  const [euEeaRelevance, setEuEeaRelevance] = useState<'Yes' | 'No' | 'Planned' | 'Unknown' | ''>('');
  const [euEeaOutputsAffect, setEuEeaOutputsAffect] = useState<'Yes' | 'No' | 'Planned' | 'Unknown' | ''>('');

  // Form state for Intended Purpose & Decision Use
  const [intendedPurpose, setIntendedPurpose] = useState('');
  const [sectorDomains, setSectorDomains] = useState<string[]>([]);
  const [otherSectorDomain, setOtherSectorDomain] = useState('');
  const [safetyComponent, setSafetyComponent] = useState<'Yes' | 'No' | ''>('');
  const [thirdPartyConformity, setThirdPartyConformity] = useState<'Yes' | 'No' | ''>('');

  // Form state for Deployment & Stakeholders
  const [deploymentContext, setDeploymentContext] = useState<string>('');
  const [deploymentContextOther, setDeploymentContextOther] = useState('');
  const [systemUsers, setSystemUsers] = useState<string[]>([]);
  const [systemUsersOther, setSystemUsersOther] = useState('');
  const [affectedPersons, setAffectedPersons] = useState<string[]>([]);
  const [affectedPersonsOther, setAffectedPersonsOther] = useState('');
  const [vulnerablePersons, setVulnerablePersons] = useState<string[]>([]);

  // Form state for Workflow, Outputs & Decision Impact
  const [workflowRole, setWorkflowRole] = useState<string>('');
  const [outputTypes, setOutputTypes] = useState<string[]>([]);
  const [outputTypesOther, setOutputTypesOther] = useState('');
  const [decisionsAboutIndividuals, setDecisionsAboutIndividuals] = useState<'Yes' | 'No' | 'Not sure' | ''>('');
  const [automaticActions, setAutomaticActions] = useState<string>('');

  // Form state for Capabilities Triggers
  const [capabilities, setCapabilities] = useState<string[]>([]);
  const [interactWithPersons, setInteractWithPersons] = useState<'Yes' | 'No' | 'Unknown' | ''>('');
  const [syntheticContent, setSyntheticContent] = useState<string[]>([]);

  // Form state for Technical Profile (Model & Data)
  const [aiKind, setAiKind] = useState<string>('');
  const [gpaiIntegration, setGpaiIntegration] = useState<'Yes' | 'No' | 'Unknown' | ''>('');
  const [gpaiProvider, setGpaiProvider] = useState('');
  const [trainingSource, setTrainingSource] = useState<string>('');
  const [modelUpdateFrequency, setModelUpdateFrequency] = useState<string>('');
  const [dataTypes, setDataTypes] = useState<string[]>([]);
  const [dpiaStatus, setDpiaStatus] = useState<'Yes' | 'No' | 'In Progress' | 'Not Applicable (No personal data)' | ''>('');
  const [linkedDatasetIds, setLinkedDatasetIds] = useState<string[]>([]);
  const [linkedComponentIds, setLinkedComponentIds] = useState<string[]>([]);

  // Tab navigation state
  const [activeTab, setActiveTab] = useState<'Profile' | 'Assessment' | 'Result' | 'Risk Evaluations' | 'Risk Evaluation V2' | 'Compliance' | 'Risk Management'>('Profile');
  
  // Risk evaluation tool detail view state
  const [selectedRiskTool, setSelectedRiskTool] = useState<string | null>(null);
  
  // Risk Evaluation V2 state
  const [expandedRiskCategory, setExpandedRiskCategory] = useState<string | null>(null);
  const [selectedRiskItem, setSelectedRiskItem] = useState<any>(null);
  
  // Compliance regulation hub selection state
  const [selectedRegulationHub, setSelectedRegulationHub] = useState<string | null>(null);
  
  // FRIA questionnaire state
  const [showFRIAQuestionnaire, setShowFRIAQuestionnaire] = useState<boolean>(false);
  
  // Skill detail page state
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Assessment screen state
  const [prohibitedConfirmed, setProhibitedConfirmed] = useState<boolean>(false);
  const [aiDetectedProhibited, setAiDetectedProhibited] = useState<boolean>(false);
  const [aiDetectionReason, setAiDetectionReason] = useState('');
  const [aiDetectionEvidence, setAiDetectionEvidence] = useState('');
  const [aiDetectionLegalBasis, setAiDetectionLegalBasis] = useState('Article 5(1)(a)');
  const [claimingException, setClaimingException] = useState<'Yes' | 'No' | ''>('');
  const [exceptionChecklist, setExceptionChecklist] = useState<{[key: string]: boolean}>({});
  const [exceptionEvidence, setExceptionEvidence] = useState('');
  const [exceptionEvidenceLink, setExceptionEvidenceLink] = useState('');
  const [exceptionEvidenceSavedLink, setExceptionEvidenceSavedLink] = useState('');
  const [exceptionClaimConfirmed, setExceptionClaimConfirmed] = useState<boolean>(false);
  const [exceptionQualifies, setExceptionQualifies] = useState<'Yes' | 'No' | 'Not sure' | ''>('');
  const [exceptionEvidenceUploaded, setExceptionEvidenceUploaded] = useState<boolean>(false);
  const [noExceptionConfirmed, setNoExceptionConfirmed] = useState<boolean>(false);

  // Block 2: High-Risk Classification state
  const [highRiskConfirmed, setHighRiskConfirmed] = useState<boolean>(false);
  
  // Annex III Exemption Test state
  const [materialInfluence, setMaterialInfluence] = useState<'Yes' | 'No' | 'Not sure' | ''>('');
  const [narrowTasks, setNarrowTasks] = useState<string[]>([]);
  const [profiling, setProfiling] = useState<'Yes' | 'No' | 'Unknown' | ''>('');
  
  // Evidence for high-risk
  const [highRiskEvidence, setHighRiskEvidence] = useState('');
  const [highRiskEvidenceLink, setHighRiskEvidenceLink] = useState('');
  const [highRiskEvidenceSavedLink, setHighRiskEvidenceSavedLink] = useState('');
  const [highRiskEvidenceConfirmed, setHighRiskEvidenceConfirmed] = useState<boolean>(false);
  
  // Not high-risk evidence state
  const [minimalRiskEvidence, setMinimalRiskEvidence] = useState('');
  const [minimalRiskEvidenceLink, setMinimalRiskEvidenceLink] = useState('');
  const [minimalRiskEvidenceSavedLink, setMinimalRiskEvidenceSavedLink] = useState('');
  const [minimalRiskEvidenceConfirmed, setMinimalRiskEvidenceConfirmed] = useState<boolean>(false);

  // Block 3: Transparency Obligation state
  const [transparencyConfirmed, setTransparencyConfirmed] = useState<boolean>(false);
  const [transparencyExceptionOptions, setTransparencyExceptionOptions] = useState<string[]>([]);
  const [transparencyEvidence, setTransparencyEvidence] = useState('');
  const [transparencyEvidenceLink, setTransparencyEvidenceLink] = useState('');
  const [transparencyEvidenceSavedLink, setTransparencyEvidenceSavedLink] = useState('');
  const [transparencyEvidenceConfirmed, setTransparencyEvidenceConfirmed] = useState<boolean>(false);

  // Block 4: GPAI state
  const [gpaiApplicable, setGpaiApplicable] = useState<'Yes' | 'No' | ''>('');
  const [gpaiSystemicRisk, setGpaiSystemicRisk] = useState<'Yes' | 'No' | 'Unknown' | ''>('');
  const [gpaiConfirmed, setGpaiConfirmed] = useState<boolean>(false);
  const [gpaiProviderAnswer, setGpaiProviderAnswer] = useState<'Yes' | 'No' | 'Not sure' | ''>('');

  // Collapsible states for Assessment blocks
  const [block1Collapsed, setBlock1Collapsed] = useState(false);
  const [block2Collapsed, setBlock2Collapsed] = useState(false);
  const [block3Collapsed, setBlock3Collapsed] = useState(false);
  const [block4Collapsed, setBlock4Collapsed] = useState(false);

  // Mock organization default role - would come from context in production
  const orgDefaultRole = 'Deployer';

  // Helper function to determine if Block 1 resulted in Prohibited
  const isBlock1Prohibited = (): boolean => {
    const status = getProhibitedStatus();
    return status === 'Prohibited';
  };

  // Helper function to determine high-risk status
  const getHighRiskStatus = (): 'De-activated' | 'High-risk' | 'Not high-risk' | 'Needs review' | 'Not assessed' => {
    // If Block 1 resulted in Prohibited, Block 2 is de-activated
    if (isBlock1Prohibited()) {
      return 'De-activated';
    }
    
    // Check if the relevant questions have been answered
    const hasSectorAnswer = sectorDomains.length > 0;
    const hasSafetyAnswer = safetyComponent !== '';
    
    // If neither question is answered, return 'Not assessed'
    if (!hasSectorAnswer && !hasSafetyAnswer) {
      return 'Not assessed';
    }
    
    // If safety component is 'Yes' but third-party conformity is not answered, return 'Not assessed'
    if (safetyComponent === 'Yes' && thirdPartyConformity === '') {
      return 'Not assessed';
    }
    
    const trigger = getHighRiskTrigger();
    
    // If no condition met
    if (trigger === 'none') {
      return 'Not high-risk';
    }
    
    // If condition 1 only (safety component)
    if (trigger === 'condition1' && highRiskConfirmed) {
      return 'High-risk';
    }
    
    // If condition 2 only (sector) or both conditions
    if ((trigger === 'condition2' || trigger === 'both') && highRiskConfirmed) {
      // Check Annex III exemption test result
      const annexResult = getAnnexIIIResult();
      if (annexResult === 'High-risk') return 'High-risk';
      if (annexResult === 'Not high-risk') {
        // Only return 'Not high-risk' if evidence is confirmed
        if (minimalRiskEvidenceConfirmed) {
          return 'Not high-risk';
        }
        // If exemption passed but evidence not confirmed, still show High-risk (pending evidence)
        return 'High-risk';
      }
      if (annexResult === 'Needs review') return 'Needs review';
    }
    
    // If conditions met but not yet confirmed, show High-risk for initial assessment
    if (trigger !== 'none') {
      return 'High-risk';
    }
    
    return 'Not high-risk';
  };

  // Helper function to determine prohibited practices status
  const getProhibitedStatus = (): 'PASS' | 'Triggered' | 'Needs Review' | 'Prohibited' | 'Exception claimed' | 'Not assessed' => {
    // Check if "None of the above" is selected
    const noneSelected = capabilities.includes('None of the above');
    
    // Check if any prohibited practices are selected (not "None of the above")
    const hasProhibitedPractices = capabilities.length > 0 && !noneSelected;
    
    // If no answer provided at all
    if (capabilities.length === 0) {
      return 'Not assessed';
    }
    
    if (noneSelected) {
      return 'PASS';
    }
    
    // After confirmation, check exception claim flow
    if (prohibitedConfirmed) {
      // Check if any selected practice has no exception available
      const selectedPractices = getSelectedProhibitedPractices();
      const hasNoExceptionPractice = selectedPractices.some(practice => {
        const practiceInfo = prohibitedPracticesMap[practice];
        return practiceInfo && !practiceInfo.hasException;
      });
      
      // If no exception available OR user explicitly said No to exception
      if (hasNoExceptionPractice || claimingException === 'No') {
        return 'Prohibited';
      }
      
      // If exception qualification is answered
      if (exceptionQualifies === 'Yes') {
        // Check if evidence is uploaded
        if (exceptionEvidenceUploaded || exceptionEvidenceSavedLink) {
          return 'Exception claimed';
        } else {
          return 'Needs Review';
        }
      } else if (exceptionQualifies === 'No') {
        return 'Prohibited';
      } else if (exceptionQualifies === 'Not sure') {
        return 'Needs Review';
      }
    }
    
    if (hasProhibitedPractices) {
      return 'Triggered';
    } else if (aiDetectedProhibited) {
      return 'Needs Review';
    }
    return 'PASS';
  };

  // Helper to get selected prohibited practices (excluding "None of the above")
  const getSelectedProhibitedPractices = () => {
    return capabilities.filter(c => c !== 'None of the above');
  };

  const isSection1Link = (link: string) => {
    return link.includes('/api/documents/');
  };

  const saveVendorLink = () => {
    setVendorEvidenceSavedLink(vendorEvidenceLink);
  };

  const saveExceptionEvidenceLink = () => {
    setExceptionEvidenceSavedLink(exceptionEvidenceLink);
  };

  const saveHighRiskEvidenceLink = () => {
    setHighRiskEvidenceSavedLink(highRiskEvidenceLink);
  };
  
  const saveMinimalRiskEvidenceLink = () => {
    setMinimalRiskEvidenceSavedLink(minimalRiskEvidenceLink);
  };

  const saveTransparencyEvidenceLink = () => {
    setTransparencyEvidenceSavedLink(transparencyEvidenceLink);
  };

  // Helper functions for Block 3: Transparency Obligation
  const getTransparencyTriggers = () => {
    const triggers: string[] = [];
    
    // Case 1: Section 4, Q2 - Biometric identification and categorisation capability
    if (capabilities.includes('Biometric identification and categorisation')) {
      triggers.push('case1');
    }
    
    // Case 2: Section 7, Q1 - Emotion recognition
    if (capabilities.includes('Emotion recognition in the workplace or in education settings')) {
      triggers.push('case2');
    }
    
    // Case 3: Section 7, Q1 - Biometric categorisation
    if (capabilities.includes('Biometric categorisation that infers or predicts sensitive traits (e.g., race, political opinions, religion, trade union membership, sexual orientation)')) {
      triggers.push('case3');
    }
    
    // Case 4: Section 7, Q2 - Direct interaction with persons
    if (interactWithPersons === 'Yes') {
      triggers.push('case4');
    }
    
    // Case 5: Section 7, Q3 - Synthetic content (any choice other than No)
    if (syntheticContent.length > 0 && !syntheticContent.includes('No')) {
      triggers.push('case5');
    }
    
    // Case 6: Section 5, Q3 - Citizens / residents affected OR Section 5, Q1 - General public / consumer-facing
    if (affectedPersons.includes('Citizens / residents') || deploymentContext === 'General public / consumer-facing') {
      triggers.push('case6');
    }
    
    return triggers;
  };

  const hasTransparencyUnknowns = (): boolean => {
    // Check if any relevant answers are Unknown/Not sure
    if (interactWithPersons === 'Unknown') return true;
    // Add more checks if needed for other fields
    return false;
  };

  const getTransparencyTriggerReasons = () => {
    const triggers = getTransparencyTriggers();
    const reasons: string[] = [];
    
    if (triggers.includes('case1')) {
      reasons.push('Uses biometric identification and categorisation (Section 4, Q2)');
    }
    if (triggers.includes('case2')) {
      reasons.push('Emotion recognition in the workplace or in education settings (Section 7, Q1)');
    }
    if (triggers.includes('case3')) {
      reasons.push('Biometric categorisation that infers or predicts sensitive traits (Section 7, Q1)');
    }
    if (triggers.includes('case4')) {
      reasons.push('Interacts directly with natural persons (Section 7, Q2)');
    }
    if (triggers.includes('case5')) {
      reasons.push('Generates or manipulates synthetic content (Section 7, Q3)');
    }
    if (triggers.includes('case6')) {
      if (affectedPersons.includes('Citizens / residents') && deploymentContext === 'General public / consumer-facing') {
        reasons.push('Affects citizens / residents and is general public / consumer-facing (Section 5, Q1 & Q3)');
      } else if (affectedPersons.includes('Citizens / residents')) {
        reasons.push('Affects citizens / residents (Section 5, Q3)');
      } else {
        reasons.push('General public / consumer-facing deployment (Section 5, Q1)');
      }
    }
    
    return reasons;
  };

  const getTransparencyExceptionOptionsByCaseGroup = () => {
    const triggers = getTransparencyTriggers();
    const caseGroups: {[key: string]: {label: string, options: string[]}} = {};
    
    // Group 1: Cases 1, 2, or 3 (Biometric / Emotion recognition)
    if (triggers.includes('case1') || triggers.includes('case2') || triggers.includes('case3')) {
      const caseLabels = [];
      if (triggers.includes('case1')) caseLabels.push('Biometric identification');
      if (triggers.includes('case2')) caseLabels.push('Emotion recognition');
      if (triggers.includes('case3')) caseLabels.push('Biometric categorisation');
      
      caseGroups['group123'] = {
        label: `For ${caseLabels.join(', ')}:`,
        options: [
          'Permitted by law to detect, prevent or investigate criminal offences, as stated in Art. 50(3)',
          'None of the above (no exception for biometric/emotion recognition cases)'
        ]
      };
    }
    
    // Group 2: Case 4 (Direct interaction)
    if (triggers.includes('case4')) {
      caseGroups['group4'] = {
        label: 'For Direct interaction with persons:',
        options: [
          '"Obvious to the user" exception (no notice needed), as stated in Art. 50(1)',
          'Authorised by law to detect, prevent, investigate or prosecute criminal offences, as stated in Art. 50(1)',
          'None of the above (no exception for direct interaction case)'
        ]
      };
    }
    
    // Group 3: Case 5 (Synthetic content)
    if (triggers.includes('case5')) {
      caseGroups['group5'] = {
        label: 'For Synthetic content generation / manipulation:',
        options: [
          'Deepfake labelling exception (e.g., artistic / satire / fiction), as stated in Art. 50(4)',
          'None of the above (no exception for synthetic content case)'
        ]
      };
    }
    
    // Group 4: Case 6 (Citizens / General public)
    if (triggers.includes('case6')) {
      caseGroups['group6'] = {
        label: 'For Citizens / residents or General public facing:',
        options: [
          'Authorised by law to detect, prevent, investigate or prosecute criminal offences, as stated in Art. 50(4)',
          'Human review is in place or a natural or legal person holds editorial responsibility for the publication of the content, as stated in Art. 50(4)',
          'None of the above (no exception for citizens/public-facing case)'
        ]
      };
    }
    
    return caseGroups;
  };

  const hasExceptionForAllCases = (): boolean => {
    const caseGroups = getTransparencyExceptionOptionsByCaseGroup();
    const groupKeys = Object.keys(caseGroups);
    
    // Check if at least one exception (not "None of the above") is selected for each group
    for (const groupKey of groupKeys) {
      const groupOptions = caseGroups[groupKey].options;
      const hasException = transparencyExceptionOptions.some(selected => 
        groupOptions.includes(selected) && !selected.includes('None of the above')
      );
      if (!hasException) {
        return false;
      }
    }
    
    return true;
  };

  const hasNoExceptionClaimed = (): boolean => {
    // Check if "None of the above" is selected for ANY case group
    return transparencyExceptionOptions.some(opt => opt.includes('None of the above'));
  };

  // Helper function for Block 3 status
  const getBlock3Status = (): 'De-activated' | 'Applies' | 'Not Applicable' | 'Needs Review' | 'Pending' | 'Not assessed' => {
    if (isBlock1Prohibited()) {
      return 'De-activated';
    }
    
    // Check if capabilities have been answered (which drives transparency triggers)
    if (capabilities.length === 0) {
      return 'Not assessed';
    }
    
    const triggers = getTransparencyTriggers();
    
    // If confirmed
    if (transparencyConfirmed) {
      // Check if claiming exception
      if (transparencyExceptionOptions.length > 0) {
        // If "None of the above" selected for ANY case group
        if (hasNoExceptionClaimed()) {
          return 'Applies';
        }
        // If exceptions selected for ALL case groups and evidence confirmed
        if (hasExceptionForAllCases() && transparencyEvidenceConfirmed) {
          return 'Not Applicable';
        }
        // Scenario C: Valid exceptions for ALL cases but evidence NOT confirmed
        if (hasExceptionForAllCases() && !transparencyEvidenceConfirmed) {
          return 'Needs Review';
        }
        // Scenario D: Not all cases have exceptions selected yet
        return 'Pending';
      }
      // No exception options selected yet
      return 'Pending';
    }
    
    // Not confirmed yet - show initial assessment
    if (triggers.length > 0) {
      // Check if any unknowns exist
      if (hasTransparencyUnknowns()) {
        return 'Needs Review';
      }
      return 'Applies';
    }
    
    return 'Not Applicable';
  };

  // Helper function for Block 4 status
  const getBlock4Status = (): 'De-activated' | 'Applies' | 'Not Applicable' | 'Needs Review' | 'Pending' | 'Not assessed' => {
    if (isBlock1Prohibited()) {
      return 'De-activated';
    }
    
    // Check if the GPAI integration question has been answered
    if (gpaiIntegration === '') {
      return 'Not assessed';
    }
    
    // If Section 8 Q2 is answered as "Unknown", return "Needs Review"
    if (gpaiIntegration === 'Unknown') {
      return 'Needs Review';
    }
    
    // After provider question is answered
    if (gpaiConfirmed && gpaiProviderAnswer) {
      if (gpaiProviderAnswer === 'Yes') {
        return 'Applies';
      } else if (gpaiProviderAnswer === 'No') {
        return 'Not Applicable';
      } else { // 'Not sure'
        return 'Needs Review';
      }
    }
    
    // After confirmation but before provider question
    if (gpaiConfirmed) {
      return 'Pending';
    }
    
    // Initial assessment before confirmation
    if (gpaiIntegration === 'Yes') {
      return 'Applies';
    }
    
    return 'Not Applicable';
  };

  // Helper function for Block 4 risk evaluation
  const getBlock4RiskEvaluation = (): 'Systemic Risk' | 'Standard GPAI' | 'No Risk' | 'Pending Assessment' | '' => {
    // Only evaluate risk if GPAI applies
    if (getBlock4Status() === 'Applies') {
      if (gpaiSystemicRisk === 'Yes') {
        return 'Systemic Risk';
      } else if (gpaiSystemicRisk === 'No') {
        return 'Standard GPAI';
      } else if (gpaiSystemicRisk === 'Unknown') {
        return 'Pending Assessment';
      }
      // If status is Applies but systemic risk not answered yet
      return 'Pending Assessment';
    }
    
    // If GPAI doesn't apply, no risk evaluation needed
    if (getBlock4Status() === 'Not Applicable') {
      return 'No Risk';
    }
    
    return '';
  };

  // Wrapper functions for Result screen
  const getBlock1Status = (): 'Prohibited' | 'Not Prohibited' | 'Needs Review' => {
    const status = getProhibitedStatus();
    
    if (status === 'Triggered' && prohibitedConfirmed && claimingException === 'No') {
      return 'Prohibited';
    }
    
    if (status === 'Needs Review' || (status === 'Triggered' && !prohibitedConfirmed)) {
      return 'Needs Review';
    }
    
    return 'Not Prohibited';
  };

  const getBlock2Status = (): 'De-activated' | 'High-Risk' | 'Not High-Risk' | 'Needs Review' => {
    const status = getHighRiskStatus();
    
    if (status === 'De-activated') return 'De-activated';
    if (status === 'High-risk') return 'High-Risk';
    if (status === 'Not high-risk') return 'Not High-Risk';
    return 'Needs Review';
  };
  
  // Helper function to check Condition 1 for high-risk (Q3 safety component)
  const isCondition1Met = (): boolean => {
    return safetyComponent === 'Yes' && thirdPartyConformity === 'Yes';
  };
  
  // Helper function to check Condition 2 for high-risk (Q2 sector)
  const isCondition2Met = (): boolean => {
    return sectorDomains.some(sector => sector !== 'Other / not listed');
  };
  
  // Helper to determine which condition triggered high-risk
  const getHighRiskTrigger = (): 'condition1' | 'condition2' | 'both' | 'none' => {
    const cond1 = isCondition1Met();
    const cond2 = isCondition2Met();
    
    if (cond1 && cond2) return 'both';
    if (cond1) return 'condition1';
    if (cond2) return 'condition2';
    return 'none';
  };
  
  // Helper to determine final high-risk result from Annex III exemption test
  const getAnnexIIIResult = (): 'High-risk' | 'Not high-risk' | 'Needs review' | 'pending' => {
    if (materialInfluence === 'Yes') return 'High-risk';
    if (materialInfluence === 'Not sure') return 'Needs review';
    if (materialInfluence === 'No') {
      // Check Q2
      if (narrowTasks.length === 0) return 'pending';
      if (narrowTasks.includes('None of above')) return 'High-risk';
      // If any option other than "None of above" selected, check Q3
      if (profiling === 'Yes') return 'High-risk';
      if (profiling === 'No') return 'Not high-risk';
      if (profiling === 'Unknown') return 'Needs review';
    }
    return 'pending';
  };

  const handleRoleToggle = (role: string) => {
    setSelectedRoles(prev =>
      prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  // Reset high-risk confirmation when profile fields change
  useEffect(() => {
    setHighRiskConfirmed(false);
    setHighRiskEvidence('');
    setHighRiskEvidenceLink('');
    setHighRiskEvidenceSavedLink('');
    setHighRiskEvidenceConfirmed(false);
    setMaterialInfluence('');
    setNarrowTasks([]);
    setProfiling('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safetyComponent, thirdPartyConformity, JSON.stringify(sectorDomains)]);

  // Reset transparency confirmation when profile fields change
  useEffect(() => {
    setTransparencyConfirmed(false);
    setTransparencyExceptionOptions([]);
    setTransparencyEvidence('');
    setTransparencyEvidenceLink('');
    setTransparencyEvidenceSavedLink('');
    setTransparencyEvidenceConfirmed(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(capabilities), interactWithPersons, JSON.stringify(syntheticContent), JSON.stringify(affectedPersons), deploymentContext]);

  // Reset GPAI confirmation when profile fields change
  useEffect(() => {
    setGpaiConfirmed(false);
    setGpaiProviderAnswer('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gpaiIntegration]);

  const handleSaveSection1 = () => {
    const data = {
      aiSystemName,
      internalSystemId,
      commercialName,
      owner: {
        name: ownerName,
        email: ownerEmail,
        department: ownerDepartment,
      },
      systemStatus,
      goLiveDate,
      isPartOfBroaderProduct,
      productServiceName,
    };
    console.log('Saving System Identity:', data);
    alert('System Identity section saved!');
  };

  const handleSaveSection2 = () => {
    const data = {
      defaultRoleApplies,
      selectedRoles,
      systemSource,
      vendorName,
      vendorEvidenceLink,
      modifyCustomize,
      euEeaRelevance,
    };
    console.log('Saving Source & Operator Role:', data);
    alert('Source & Operator Role section saved!');
  };

  // Auto-fill owner info when "Same as internal AI compliance owner" is checked
  const handleSameAsComplianceOwner = (checked: boolean) => {
    setSameAsComplianceOwner(checked);
    if (checked) {
      // Mock data - would come from organization settings in production
      setOwnerName('John Smith');
      setOwnerEmail('john.smith@company.com');
      setOwnerDepartment('Compliance Department');
    } else {
      setOwnerName('');
      setOwnerEmail('');
      setOwnerDepartment('');
    }
  };

  // Auto-fill role when default role applies
  const handleDefaultRoleApplies = (value: 'Yes' | 'No') => {
    setDefaultRoleApplies(value);
    if (value === 'Yes') {
      setSelectedRoles([orgDefaultRole]);
    } else {
      setSelectedRoles([]);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FAFBFC] ai-sys-v2">
      <style dangerouslySetInnerHTML={{ __html: `
        .ai-sys-v2 * { font-family: 'Roboto', sans-serif !important; }
        .ai-sys-v2 [class~="text-[#F13D30]"] { color: #5720B7 !important; }
        .ai-sys-v2 [class~="bg-[#F13D30]"] { background-color: #5720B7 !important; }
        .ai-sys-v2 button[class~="bg-[#F13D30]"] { background-color: #ece9fe !important; color: #5720B7 !important; }
        .ai-sys-v2 [class~="border-[#F13D30]"] { border-color: #5720B7 !important; }
        .ai-sys-v2 [class~="border-[#DC180A]"] { border-color: #5720B7 !important; }
        .ai-sys-v2 [class~="bg-[#FEEDEC]"] { background-color: #ece9fe !important; }
        .ai-sys-v2 [class~="hover:bg-[#DC180A]"]:hover { background-color: #4c1d95 !important; }
        .ai-sys-v2 button[class~="hover:bg-[#DC180A]"]:hover { background-color: #ddd6fe !important; }
        .ai-sys-v2 [class~="hover:bg-[#FEEDEC]"]:hover { background-color: #ece9fe !important; }
        .ai-sys-v2 [class~="hover:border-[#F13D30]"]:hover { border-color: #5720B7 !important; }
        .ai-sys-v2 [class~="hover:text-[#DC180A]"]:hover { color: #4c1d95 !important; }
        .ai-sys-v2 input:focus, .ai-sys-v2 textarea:focus, .ai-sys-v2 select:focus {
          border-color: #5720B7 !important;
          --tw-ring-color: #ece9fe !important;
        }
        .ai-sys-v2 input[type="checkbox"], .ai-sys-v2 input[type="radio"] { accent-color: #5720B7 !important; }
      `}} />
      <PageHeader
        breadcrumb="AI Inventory > AI System"
        title={aiSystemName}
        actions={
          <button
            onClick={onBack}
            className="px-4 py-2 bg-[#ece9fe] border border-[#ddd6fe] text-[#5720B7] rounded-full font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#ddd6fe] transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </button>
        }
      />

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-[#F0F1F2]">
        <div className="max-w-[1000px] mx-auto px-8">
          <div className="flex gap-8">
            <button 
              onClick={() => setActiveTab('Profile')}
              className={`relative px-1 py-4 font-['Montserrat',sans-serif] font-semibold text-sm transition-colors ${
                activeTab === 'Profile' 
                  ? 'text-[#F13D30] border-b-2 border-[#F13D30]' 
                  : 'text-[#B5BCC4] hover:text-[#464E58]'
              }`}
            >
              Profile
            </button>
            <button 
              onClick={() => setActiveTab('Assessment')}
              className={`relative px-1 py-4 font-['Montserrat',sans-serif] font-semibold text-sm transition-colors ${
                activeTab === 'Assessment' 
                  ? 'text-[#F13D30] border-b-2 border-[#F13D30]' 
                  : 'text-[#B5BCC4] hover:text-[#464E58]'
              }`}
            >
              Assessment
            </button>
            <button 
              onClick={() => setActiveTab('Result')}
              className={`relative px-1 py-4 font-['Montserrat',sans-serif] font-semibold text-sm transition-colors ${
                activeTab === 'Result' 
                  ? 'text-[#F13D30] border-b-2 border-[#F13D30]' 
                  : 'text-[#B5BCC4] hover:text-[#464E58]'
              }`}
            >
              Result
            </button>
            <button 
              onClick={() => setActiveTab('Risk Evaluations')}
              className={`relative px-1 py-4 font-['Montserrat',sans-serif] font-semibold text-sm transition-colors ${
                activeTab === 'Risk Evaluations' 
                  ? 'text-[#F13D30] border-b-2 border-[#F13D30]' 
                  : 'text-[#B5BCC4] hover:text-[#464E58]'
              }`}
            >
              Risk Evaluations
            </button>
            <button 
              onClick={() => setActiveTab('Risk Evaluation V2')}
              className={`relative px-1 py-4 font-['Montserrat',sans-serif] font-semibold text-sm transition-colors ${
                activeTab === 'Risk Evaluation V2' 
                  ? 'text-[#F13D30] border-b-2 border-[#F13D30]' 
                  : 'text-[#B5BCC4] hover:text-[#464E58]'
              }`}
            >
              Risk Evaluation V2
            </button>
            <button 
              onClick={() => setActiveTab('Risk Management')}
              className={`relative px-1 py-4 font-['Montserrat',sans-serif] font-semibold text-sm transition-colors ${
                activeTab === 'Risk Management' 
                  ? 'text-[#F13D30] border-b-2 border-[#F13D30]' 
                  : 'text-[#B5BCC4] hover:text-[#464E58]'
              }`}
            >
              Risk Management
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'Risk Management' ? (
        <div className="flex-1 overflow-hidden">
          <RiskManagementTab systemName={systemName} />
        </div>
      ) : (
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1000px] mx-auto px-8 py-8 space-y-6">
          {/* Profile Tab Content */}
          {activeTab === 'Profile' && (
            <>
          {/* Document & Evidence Upload Section */}
          <CollapsibleSection
            title="1. Document & Evidence Upload"
            description="Upload documents for AI-powered auto-fill"
            defaultOpen={true}
          >
            <DocumentUploadSection />
          </CollapsibleSection>

          {/* Section 2: System Identity */}
          <CollapsibleSection
            title="2. System Identity"
            description="Basic information about this AI system"
            defaultOpen={true}
          >
            <div className="space-y-6">
              {/* Q1: AI System Name */}
              <div>
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                  Q1: AI System Name <span className="text-[#F13D30]">*</span>
                </label>
                <input
                  type="text"
                  value={aiSystemName}
                  onChange={(e) => setAiSystemName(e.target.value)}
                  placeholder="Enter AI system name"
                  className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC]"
                />
              </div>

              {/* Q2: Internal System ID */}
              <div>
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                  Q2: Internal system ID / reference
                </label>
                <input
                  type="text"
                  value={internalSystemId}
                  onChange={(e) => setInternalSystemId(e.target.value)}
                  placeholder="Enter internal system ID or reference"
                  className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC]"
                />
              </div>

              {/* Q3: Commercial Name */}
              <div>
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                  Q3: Commercial name of the AI system, if any
                </label>
                <input
                  type="text"
                  value={commercialName}
                  onChange={(e) => setCommercialName(e.target.value)}
                  placeholder="Enter commercial name"
                  className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC]"
                />
              </div>

              {/* Q4: Owner */}
              <div className="space-y-4">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q4: Owner / Responsible Team
                </label>
                
                {/* Checkbox */}
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sameAsComplianceOwner}
                    onChange={(e) => handleSameAsComplianceOwner(e.target.checked)}
                    className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5"
                  />
                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                    Same as internal AI compliance owner
                  </span>
                </label>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="Enter name"
                      disabled={sameAsComplianceOwner}
                      className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC] disabled:bg-[#F9FAFB] disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={ownerEmail}
                      onChange={(e) => setOwnerEmail(e.target.value)}
                      placeholder="Enter email"
                      disabled={sameAsComplianceOwner}
                      className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC] disabled:bg-[#F9FAFB] disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A] mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      value={ownerDepartment}
                      onChange={(e) => setOwnerDepartment(e.target.value)}
                      placeholder="Enter department"
                      disabled={sameAsComplianceOwner}
                      className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC] disabled:bg-[#F9FAFB] disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Q5: System Status */}
              <div>
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                  Q5: System status <span className="text-[#F13D30]">*</span>
                </label>
                <select
                  value={systemStatus}
                  onChange={(e) => setSystemStatus(e.target.value as any)}
                  className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC]"
                >
                  <option value="Planned">Planned</option>
                  <option value="In development">In development</option>
                  <option value="Testing / Pilot">Testing / Pilot</option>
                  <option value="In use (production)">In use (production)</option>
                  <option value="Retired">Retired</option>
                </select>
              </div>

              {/* Q6: Go-live Date */}
              <div>
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                  Q6: Go-live date (planned or actual)
                </label>
                <input
                  type="date"
                  value={goLiveDate}
                  onChange={(e) => setGoLiveDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC]"
                />
              </div>

              {/* Q7: Part of broader product / service */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q7: Is this system part of a broader product / service?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="broaderProduct"
                      value="Yes"
                      checked={isPartOfBroaderProduct === 'Yes'}
                      onChange={(e) => setIsPartOfBroaderProduct(e.target.value as 'Yes')}
                      className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                    />
                    <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="broaderProduct"
                      value="No"
                      checked={isPartOfBroaderProduct === 'No'}
                      onChange={(e) => setIsPartOfBroaderProduct(e.target.value as 'No')}
                      className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                    />
                    <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">
                      No
                    </span>
                  </label>
                </div>
                {isPartOfBroaderProduct === 'Yes' && (
                  <input
                    type="text"
                    value={productServiceName}
                    onChange={(e) => setProductServiceName(e.target.value)}
                    placeholder="Enter product / service name"
                    className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC]"
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={onBack}
                  className="px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSection1}
                  className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
                >
                  Confirm and Save
                </button>
              </div>
            </div>
          </CollapsibleSection>

          {/* Section 3: Source & Operator Role */}
          <CollapsibleSection
            title="3. Source & Operator Role"
            description="Define your organization's role and system source"
            defaultOpen={false}
          >
            <div className="space-y-6">
              {/* Q1: Default Role Applies */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q1: In Organization module, your default role is set to be:{' '}
                  <span className="text-[#F13D30]">"{orgDefaultRole}"</span>. Does your organisation's default role apply to this AI system? <span className="text-[#F13D30]">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="defaultRole"
                      value="Yes"
                      checked={defaultRoleApplies === 'Yes'}
                      onChange={(e) => handleDefaultRoleApplies(e.target.value as 'Yes')}
                      className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                    />
                    <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="defaultRole"
                      value="No"
                      checked={defaultRoleApplies === 'No'}
                      onChange={(e) => handleDefaultRoleApplies(e.target.value as 'No')}
                      className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                    />
                    <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">
                      No
                    </span>
                  </label>
                </div>
              </div>

              {/* Q2: Role Selection */}
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                    Q2: Your role for this AI system <span className="text-[#F13D30]">*</span>
                  </label>
                  <div className="group relative">
                    <HelpCircle className="w-4 h-4 text-[#B5BCC4] cursor-help" />
                    <div className="invisible group-hover:visible absolute left-0 top-6 w-64 p-3 bg-[#22262A] text-white text-xs rounded-lg shadow-lg z-10">
                      <p className="font-['Montserrat',sans-serif] font-normal">
                        <strong>Provider:</strong> Develops, produces or trains AI systems<br />
                        <strong>Deployer:</strong> Uses AI systems under its authority<br />
                        <strong>Importer:</strong> Places AI systems on EU market<br />
                        <strong>Distributor:</strong> Makes AI systems available on EU market
                      </p>
                    </div>
                  </div>
                </div>
                <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">
                  Multiple selections allowed
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {['Provider', 'Deployer', 'Importer', 'Distributor'].map(role => (
                    <label
                      key={role}
                      className={`flex items-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedRoles.includes(role)
                          ? 'border-[#F13D30] bg-[#FEEDEC]'
                          : 'border-[#F0F1F2] bg-white hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedRoles.includes(role)}
                        onChange={() => handleRoleToggle(role)}
                        disabled={defaultRoleApplies === 'Yes'}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30]"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">
                        {role}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q3: System Source */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q3: System source <span className="text-[#F13D30]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['In-house', 'Vendor / Third-party', 'Mixed', 'Unknown'].map(source => (
                    <label
                      key={source}
                      className={`flex items-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                        systemSource === source
                          ? 'border-[#F13D30] bg-[#FEEDEC]'
                          : 'border-[#F0F1F2] bg-white hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="systemSource"
                        value={source}
                        checked={systemSource === source}
                        onChange={(e) => setSystemSource(e.target.value as any)}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">
                        {source}
                      </span>
                    </label>
                  ))}
                </div>
                {(systemSource === 'Vendor / Third-party' || systemSource === 'Mixed') && (
                  <div className="space-y-3 pt-3">
                    <div>
                      <label className="block font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A] mb-2">
                        External vendor / provider name <span className="text-[#F13D30]">*</span>
                      </label>
                      <input
                        type="text"
                        value={vendorName}
                        onChange={(e) => setVendorName(e.target.value)}
                        placeholder="Enter vendor / provider name"
                        className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC]"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                        Paste a link from Section 1 or an external link
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={vendorEvidenceLink}
                          onChange={(e) => setVendorEvidenceLink(e.target.value)}
                          placeholder="Paste link here"
                          className="flex-1 px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC] transition-colors"
                        />
                        <button
                          onClick={saveVendorLink}
                          className="px-4 py-2 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors whitespace-nowrap"
                        >
                          Save link
                        </button>
                      </div>
                      {vendorEvidenceSavedLink && (
                        <div className="flex items-center gap-2 mt-2">
                          {isSection1Link(vendorEvidenceSavedLink) ? (
                            <>
                              <FileText className="w-4 h-4 text-[#F13D30]" />
                              <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                Document link saved
                              </span>
                            </>
                          ) : (
                            <>
                              <Link className="w-4 h-4 text-[#F13D30]" />
                              <a
                                href={vendorEvidenceSavedLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-['Montserrat',sans-serif] font-normal text-sm text-[#F13D30] hover:underline"
                              >
                                {vendorEvidenceSavedLink}
                              </a>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Q4: Modify/Customize */}
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                    Q4: Do you modify / customize this AI system before use or resale? <span className="text-[#F13D30]">*</span>
                  </label>
                  <div className="group relative">
                    <HelpCircle className="w-4 h-4 text-[#B5BCC4] cursor-help" />
                    <div className="invisible group-hover:visible absolute left-0 top-6 w-64 p-3 bg-[#22262A] text-white text-xs rounded-lg shadow-lg z-10">
                      <p className="font-['Montserrat',sans-serif] font-normal">
                        Examples: fine-tuning, retraining, changing decision logic, changing intended purpose, re-branding
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  {['Yes', 'No', 'Unknown'].map(option => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="modifyCustomize"
                        value={option}
                        checked={modifyCustomize === option}
                        onChange={(e) => setModifyCustomize(e.target.value as any)}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                {modifyCustomize === 'Yes' && (
                  <div className="bg-[#FEF3C7] border border-[#FDE047] rounded-lg p-4 flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-[#92400E] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#92400E] mb-1">
                        Role impact
                      </p>
                      <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#92400E]">
                        Customising / modifying an AI system may make your organisation responsible as a Provider (in addition to Deployer / Distributor / Importer). Please review and update the role for this AI system if needed.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Q5: EU / EEA Relevance */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q5: Is this AI system offered / used in the EU / EEA? <span className="text-[#F13D30]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Yes', 'No', 'Planned', 'Unknown'].map(option => (
                    <label
                      key={option}
                      className={`flex items-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                        euEeaRelevance === option
                          ? 'border-[#F13D30] bg-[#FEEDEC]'
                          : 'border-[#F0F1F2] bg-white hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="euEeaRelevance"
                        value={option}
                        checked={euEeaRelevance === option}
                        onChange={(e) => setEuEeaRelevance(e.target.value as any)}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q6: EU / EEA Outputs Affect */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q6: Do system outputs affect persons located in the EU / EEA? <span className="text-[#F13D30]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Yes', 'No', 'Planned', 'Unknown'].map(option => (
                    <label
                      key={option}
                      className={`flex items-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                        euEeaOutputsAffect === option
                          ? 'border-[#F13D30] bg-[#FEEDEC]'
                          : 'border-[#F0F1F2] bg-white hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="euEeaOutputsAffect"
                        value={option}
                        checked={euEeaOutputsAffect === option}
                        onChange={(e) => setEuEeaOutputsAffect(e.target.value as any)}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notice when both Q5 and Q6 are "No" */}
              {euEeaRelevance === 'No' && euEeaOutputsAffect === 'No' && (
                <div className="bg-[#E0F2FE] border border-[#7DD3FC] rounded-lg p-4 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#0C4A6E] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#0C4A6E]">
                      Your AI System is not regulated by the EU AI Act.
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={onBack}
                  className="px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSection2}
                  className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
                >
                  Confirm and Save
                </button>
              </div>
            </div>
          </CollapsibleSection>

          {/* Section 4: Intended Purpose & Decision Use */}
          <CollapsibleSection
            title="4. Intended Purpose & Decision Use"
            description="Define the purpose and usage domain"
            defaultOpen={false}
          >
            <div className="space-y-6">
              {/* Q1: Intended Purpose */}
              <div>
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                  Q1: What is the intended purpose of this system? (1–3 sentences) <span className="text-[#F13D30]">*</span>
                </label>
                <textarea
                  value={intendedPurpose}
                  onChange={(e) => setIntendedPurpose(e.target.value)}
                  placeholder="Describe the intended purpose of this AI system..."
                  rows={4}
                  className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC] resize-none"
                />
              </div>

              {/* Q2: Sector/Domain */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q2: In which sector / domain is this system used? <span className="text-[#F13D30]">*</span>
                </label>
                <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">
                  Multiple selections allowed
                </p>
                <div className="space-y-2">
                  {[
                    'Biometric identification and categorisation',
                    'Critical infrastructure management',
                    'Education & vocational training',
                    'Employment & workforce management',
                    'Access to essential private or public services & benefits',
                    'Law enforcement',
                    'Migration, asylum & border control',
                    'Justice & democratic processes',
                  ].map((sector) => (
                    <label key={sector} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sectorDomains.includes(sector)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSectorDomains([...sectorDomains, sector]);
                          } else {
                            setSectorDomains(sectorDomains.filter(s => s !== sector));
                          }
                        }}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                        {sector}
                      </span>
                    </label>
                  ))}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={sectorDomains.includes('Other / not listed')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSectorDomains([...sectorDomains, 'Other / not listed']);
                        } else {
                          setSectorDomains(sectorDomains.filter(s => s !== 'Other / not listed'));
                          setOtherSectorDomain('');
                        }
                      }}
                      className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5"
                    />
                    <div className="flex-1">
                      <label className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] cursor-pointer">
                        Other / not listed:
                      </label>
                      {sectorDomains.includes('Other / not listed') && (
                        <input
                          type="text"
                          value={otherSectorDomain}
                          onChange={(e) => setOtherSectorDomain(e.target.value)}
                          placeholder="Please specify"
                          className="w-full mt-2 px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC]"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Q3: Safety Component */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q3: Is this AI system a safety component of a product, or itself a product, covered by EU harmonisation legislation in Annex I? <span className="text-[#F13D30]">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="safetyComponent"
                      value="Yes"
                      checked={safetyComponent === 'Yes'}
                      onChange={(e) => {
                        setSafetyComponent(e.target.value as 'Yes');
                      }}
                      className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                    />
                    <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="safetyComponent"
                      value="No"
                      checked={safetyComponent === 'No'}
                      onChange={(e) => {
                        setSafetyComponent(e.target.value as 'No');
                        setThirdPartyConformity('');
                      }}
                      className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                    />
                    <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                      No
                    </span>
                  </label>
                </div>

                {/* Follow-up Question */}
                {safetyComponent === 'Yes' && (
                  <div className="ml-7 mt-4 pl-4 border-l-2 border-[#F0F1F2] space-y-3">
                    <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                      If the product requires a third-party conformity assessment under the corresponding legislation. <span className="text-[#F13D30]">*</span>
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="thirdPartyConformity"
                          value="Yes"
                          checked={thirdPartyConformity === 'Yes'}
                          onChange={(e) => setThirdPartyConformity(e.target.value as 'Yes')}
                          className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                        />
                        <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                          Yes
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="thirdPartyConformity"
                          value="No"
                          checked={thirdPartyConformity === 'No'}
                          onChange={(e) => setThirdPartyConformity(e.target.value as 'No')}
                          className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                        />
                        <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                          No
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={onBack}
                  className="px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => alert('Section 4 saved!')}
                  className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
                >
                  Confirm and Save
                </button>
              </div>
            </div>
          </CollapsibleSection>

          {/* Section 5: Deployment & Stakeholders */}
          <CollapsibleSection
            title="5. Deployment & Stakeholders"
            description="Define deployment context and affected parties"
            defaultOpen={false}
          >
            <div className="space-y-6">
              {/* Q1: Deployment Context */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q1: In what context will this AI system be deployed? <span className="text-[#F13D30]">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    'Workplace (employee-facing)',
                    'Educational institution',
                    'Healthcare setting',
                    'Law enforcement / public security',
                    'Public administration / government service',
                    'General public / consumer-facing',
                  ].map((context) => (
                    <label key={context} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="deploymentContext"
                        value={context}
                        checked={deploymentContext === context}
                        onChange={(e) => {
                          setDeploymentContext(e.target.value);
                          if (e.target.value !== 'Other') {
                            setDeploymentContextOther('');
                          }
                        }}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                        {context}
                      </span>
                    </label>
                  ))}
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="deploymentContext"
                      value="Other"
                      checked={deploymentContext === 'Other'}
                      onChange={(e) => setDeploymentContext(e.target.value)}
                      className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30] mt-0.5"
                    />
                    <div className="flex-1">
                      <label className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] cursor-pointer">
                        Other:
                      </label>
                      {deploymentContext === 'Other' && (
                        <input
                          type="text"
                          value={deploymentContextOther}
                          onChange={(e) => setDeploymentContextOther(e.target.value)}
                          placeholder="Please specify"
                          className="w-full mt-2 px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC]"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Q2: System Users */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q2: Who will use this AI system? <span className="text-[#F13D30]">*</span>
                </label>
                <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">
                  Multiple selections allowed
                </p>
                <div className="space-y-2">
                  {[
                    'Internal employees',
                    'External contractors / service providers',
                    'Customers / consumers',
                    'Students',
                    'Patients',
                    'Public authority staff',
                  ].map((user) => (
                    <label key={user} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={systemUsers.includes(user)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSystemUsers([...systemUsers, user]);
                          } else {
                            setSystemUsers(systemUsers.filter(u => u !== user));
                          }
                        }}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                        {user}
                      </span>
                    </label>
                  ))}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={systemUsers.includes('Other')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSystemUsers([...systemUsers, 'Other']);
                        } else {
                          setSystemUsers(systemUsers.filter(u => u !== 'Other'));
                          setSystemUsersOther('');
                        }
                      }}
                      className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5"
                    />
                    <div className="flex-1">
                      <label className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] cursor-pointer">
                        Other:
                      </label>
                      {systemUsers.includes('Other') && (
                        <input
                          type="text"
                          value={systemUsersOther}
                          onChange={(e) => setSystemUsersOther(e.target.value)}
                          placeholder="Please specify"
                          className="w-full mt-2 px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC]"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Q3: Affected Persons */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q3: Who can be affected by the AI system's outputs? <span className="text-[#F13D30]">*</span>
                </label>
                <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">
                  Multiple selections allowed
                </p>
                <div className="space-y-2">
                  {[
                    'Employees',
                    'Job applicants',
                    'Students',
                    'Patients',
                    'Customers / consumers',
                    'Citizens / residents',
                  ].map((person) => (
                    <label key={person} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={affectedPersons.includes(person)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAffectedPersons([...affectedPersons, person]);
                          } else {
                            setAffectedPersons(affectedPersons.filter(p => p !== person));
                          }
                        }}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                        {person}
                      </span>
                    </label>
                  ))}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={affectedPersons.includes('Other')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAffectedPersons([...affectedPersons, 'Other']);
                        } else {
                          setAffectedPersons(affectedPersons.filter(p => p !== 'Other'));
                          setAffectedPersonsOther('');
                        }
                      }}
                      className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5"
                    />
                    <div className="flex-1">
                      <label className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] cursor-pointer">
                        Other:
                      </label>
                      {affectedPersons.includes('Other') && (
                        <input
                          type="text"
                          value={affectedPersonsOther}
                          onChange={(e) => setAffectedPersonsOther(e.target.value)}
                          placeholder="Please specify"
                          className="w-full mt-2 px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC]"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Q4: Vulnerable Persons */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q4: Does the AI system affect vulnerable persons? <span className="text-[#F13D30]">*</span>
                </label>
                <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">
                  Multiple selections allowed
                </p>
                <div className="space-y-2">
                  {[
                    'Children / minors',
                    'Persons with disabilities',
                    'Persons in socio-economic vulnerability',
                    'None / not applicable',
                    'Unknown',
                  ].map((category) => (
                    <label key={category} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={vulnerablePersons.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setVulnerablePersons([...vulnerablePersons, category]);
                          } else {
                            setVulnerablePersons(vulnerablePersons.filter(v => v !== category));
                          }
                        }}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={onBack}
                  className="px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => alert('Section 5 saved!')}
                  className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
                >
                  Confirm and Save
                </button>
              </div>
            </div>
          </CollapsibleSection>

          {/* Section 6: Workflow, Outputs & Decision Impact */}
          <CollapsibleSection
            title="6. Workflow, Outputs & Decision Impact"
            description="Define how the AI system operates and its decision-making role"
            defaultOpen={false}
          >
            <div className="space-y-6">
              {/* Q1: Workflow Role */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q1: What does the AI system do in the workflow? <span className="text-[#F13D30]">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    'Provides insights / recommendations only (human decides)',
                    'Supports decisions (human approval required)',
                    'Automatically makes decisions / actions (no human approval)',
                    'Mixed / depends on case',
                    'Unknown',
                  ].map((role) => (
                    <label key={role} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="workflowRole"
                        value={role}
                        checked={workflowRole === role}
                        onChange={(e) => setWorkflowRole(e.target.value)}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                        {role}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q2: Output Types */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q2: What type of output does the AI system produce? <span className="text-[#F13D30]">*</span>
                </label>
                <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">
                  Select all that apply
                </p>
                <div className="space-y-2">
                  {[
                    'Score / rating',
                    'Ranking',
                    'Recommendation',
                    'Classification / label',
                    'Prediction / forecasting',
                    'Matching (e.g., job matching, content matching)',
                    'Detection (e.g., fraud detection)',
                    'Identification / verification',
                    'Generated content (text / image / audio / video)',
                    'Automated decision (system executes action)',
                  ].map((type) => (
                    <label key={type} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={outputTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setOutputTypes([...outputTypes, type]);
                          } else {
                            setOutputTypes(outputTypes.filter(t => t !== type));
                          }
                        }}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                        {type}
                      </span>
                    </label>
                  ))}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={outputTypes.includes('Other')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setOutputTypes([...outputTypes, 'Other']);
                        } else {
                          setOutputTypes(outputTypes.filter(t => t !== 'Other'));
                          setOutputTypesOther('');
                        }
                      }}
                      className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5"
                    />
                    <div className="flex-1">
                      <label className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] cursor-pointer">
                        Other:
                      </label>
                      {outputTypes.includes('Other') && (
                        <input
                          type="text"
                          value={outputTypesOther}
                          onChange={(e) => setOutputTypesOther(e.target.value)}
                          placeholder="Please specify"
                          className="w-full mt-2 px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC]"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Q3: Decisions About Individuals */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q3: Is the AI output used to make or influence decisions about individuals (natural persons)? <span className="text-[#F13D30]">*</span>
                </label>
                <div className="flex gap-4">
                  {['Yes', 'No', 'Not sure'].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="decisionsAboutIndividuals"
                        value={option}
                        checked={decisionsAboutIndividuals === option}
                        onChange={(e) => setDecisionsAboutIndividuals(e.target.value as any)}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q4: Automatic Actions */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q4: Does the AI system automatically execute actions based on its output? <span className="text-[#F13D30]">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    'No (advisory only)',
                    'Yes (automatic actions)',
                    'Mixed',
                    'Unknown',
                  ].map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="automaticActions"
                        value={option}
                        checked={automaticActions === option}
                        onChange={(e) => setAutomaticActions(e.target.value)}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={onBack}
                  className="px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => alert('Section 6 saved!')}
                  className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
                >
                  Confirm and Save
                </button>
              </div>
            </div>
          </CollapsibleSection>

          {/* Section 7: Capabilities */}
          <CollapsibleSection
            title="7. Capabilities"
            description="Identify specific capabilities and interaction modes"
            defaultOpen={false}
          >
            <div className="space-y-6">
              {/* Q1: Capabilities/Practices */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q1: Does your AI system use any of the following capabilities or practices? <span className="text-[#F13D30]">*</span>
                </label>
                <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">
                  Select all that apply
                </p>
                <div className="space-y-2">
                  {[
                    'Subliminal / manipulative / deceptive techniques that materially distort behaviour and are likely to cause significant harm',
                    'Exploitation of vulnerabilities (age, disability, or social / economic situation) to distort behaviour likely causing significant harm',
                    'Social scoring leading to detrimental / unfavourable treatment (esp. unjustified / disproportionate)',
                    'Criminal offence risk assessment / prediction based solely on profiling or personality traits (individual predictive policing)',
                    'Untargeted scraping of facial images from the internet or CCTV to build / expand facial recognition databases',
                    'Emotion recognition in the workplace or in education settings',
                    'Biometric categorisation that infers or predicts sensitive traits (e.g., race, political opinions, religion, trade union membership, sexual orientation)',
                    'Real-time remote biometric identification (RBI) in publicly accessible spaces for law enforcement purposes',
                    'None of the above',
                  ].map((capability) => (
                    <label key={capability} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={capabilities.includes(capability)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            // If "None of the above" is selected, clear all others
                            if (capability === 'None of the above') {
                              setCapabilities(['None of the above']);
                            } else {
                              // Remove "None of the above" if any other is selected
                              const filtered = capabilities.filter(c => c !== 'None of the above');
                              setCapabilities([...filtered, capability]);
                            }
                          } else {
                            setCapabilities(capabilities.filter(c => c !== capability));
                          }
                        }}
                        className="w-4 h-4 shrink-0 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                        {capability}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q2: Direct Interaction */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q2: Does the AI system interact directly with natural persons? (e.g., chatbot, voicebot, assistant) <span className="text-[#F13D30]">*</span>
                </label>
                <div className="flex gap-4">
                  {['Yes', 'No', 'Unknown'].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="interactWithPersons"
                        value={option}
                        checked={interactWithPersons === option}
                        onChange={(e) => setInteractWithPersons(e.target.value as any)}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q3: Synthetic Content */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q3: Does the AI system generate synthetic content that may be perceived as human-made? <span className="text-[#F13D30]">*</span>
                </label>
                <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">
                  Multiple selections allowed
                </p>
                <div className="space-y-2">
                  {[
                    'Text',
                    'Image',
                    'Audio',
                    'Video',
                    'No',
                    'Unknown',
                  ].map((type) => (
                    <label key={type} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={syntheticContent.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSyntheticContent([...syntheticContent, type]);
                          } else {
                            setSyntheticContent(syntheticContent.filter(t => t !== type));
                          }
                        }}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={onBack}
                  className="px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => alert('Section 7 saved!')}
                  className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
                >
                  Confirm and Save
                </button>
              </div>
            </div>
          </CollapsibleSection>

          {/* Section 8: Technical Profile (Model & Data) */}
          <CollapsibleSection
            title="8. Technical Profile (Model & Data)"
            description="Technical details about the AI model and data processing"
            defaultOpen={false}
          >
            <div className="space-y-6">
              {/* Q1: AI Kind */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q1: What kind of AI is used? <span className="text-[#F13D30]">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    'Rules-based automation',
                    'Machine learning',
                    'Deep learning',
                    'Generative AI',
                    'Hybrid',
                    'Unknown',
                  ].map((kind) => (
                    <label key={kind} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="aiKind"
                        value={kind}
                        checked={aiKind === kind}
                        onChange={(e) => setAiKind(e.target.value)}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                        {kind}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q2: GPAI Integration */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q2: Is this system provided as a general-purpose AI (GPAI) model / component or does it integrate one? <span className="text-[#F13D30]">*</span>
                </label>
                <div className="flex gap-4">
                  {['Yes', 'No', 'Unknown'].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gpaiIntegration"
                        value={option}
                        checked={gpaiIntegration === option}
                        onChange={(e) => {
                          setGpaiIntegration(e.target.value as any);
                          if (e.target.value !== 'Yes') {
                            setGpaiProvider('');
                          }
                        }}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                {gpaiIntegration === 'Yes' && (
                  <div className="mt-3">
                    <label className="block font-['Montserrat',sans-serif] font-medium text-sm text-[#22262A] mb-2">
                      Which GPAI provider / model? (optional)
                    </label>
                    <input
                      type="text"
                      value={gpaiProvider}
                      onChange={(e) => setGpaiProvider(e.target.value)}
                      placeholder="e.g., OpenAI GPT-4, Google Gemini, etc."
                      className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC]"
                    />
                  </div>
                )}
              </div>

              {/* Q3: Training Source */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q3: What is the training source? <span className="text-[#F13D30]">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    'In-house training',
                    'Vendor-trained model (no training by us)',
                    'Fine-tuned by us',
                    'Unknown / not applicable',
                  ].map((source) => (
                    <label key={source} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="trainingSource"
                        value={source}
                        checked={trainingSource === source}
                        onChange={(e) => setTrainingSource(e.target.value)}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                        {source}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q4: Model Update Frequency */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q4: How often does the model / system update? <span className="text-[#F13D30]">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    'Static / never',
                    'Periodic retraining',
                    'Continuous learning',
                    'Unknown',
                  ].map((frequency) => (
                    <label key={frequency} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="modelUpdateFrequency"
                        value={frequency}
                        checked={modelUpdateFrequency === frequency}
                        onChange={(e) => setModelUpdateFrequency(e.target.value)}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                        {frequency}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q5: Datasets */}
              <DatasetLinker
                selectedIds={linkedDatasetIds}
                onChange={setLinkedDatasetIds}
              />

              {/* Q6: Data Types */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q6: What data types are processed? <span className="text-[#F13D30]">*</span>
                </label>
                <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">
                  Multiple selections allowed
                </p>
                <div className="space-y-2">
                  {[
                    'Personal data',
                    'Sensitive data (health, biometric, etc.)',
                    'Employee data',
                    'Children / minors data',
                    'Public web data',
                    'Non-personal / industrial data',
                    'Unknown',
                  ].map((dataType) => (
                    <label key={dataType} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={dataTypes.includes(dataType)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setDataTypes([...dataTypes, dataType]);
                          } else {
                            setDataTypes(dataTypes.filter(d => d !== dataType));
                          }
                        }}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                        {dataType}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q7: DPIA */}
              <div className="space-y-3">
                <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                  Q7: Has a Data Protection Impact Assessment (DPIA) been completed for this system? <span className="text-[#F13D30]">*</span>
                </label>
                <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#565F6C]">
                  Required under GDPR Art. 35 for high-risk processing activities involving personal data.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {(['Yes', 'No', 'In Progress', 'Not Applicable (No personal data)'] as const).map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-3 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                        dpiaStatus === option
                          ? 'border-[#F13D30] bg-[#FEEDEC]'
                          : 'border-[#F0F1F2] bg-white hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="dpiaStatus"
                        value={option}
                        checked={dpiaStatus === option}
                        onChange={(e) => setDpiaStatus(e.target.value as any)}
                        className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                      />
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A]">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                {dpiaStatus === 'No' && (
                  <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-4 flex items-start gap-3">
                    <span className="text-[#DC2626] font-bold text-sm shrink-0 mt-0.5">!</span>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#991B1B]">
                      A DPIA may be required under <strong>GDPR Art. 35</strong> for AI systems that process personal data at scale, perform profiling, or make automated decisions with significant effects on individuals.
                    </p>
                  </div>
                )}
                {dpiaStatus === 'In Progress' && (
                  <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-lg p-4 flex items-start gap-3">
                    <span className="text-[#EA580C] font-bold text-sm shrink-0 mt-0.5">!</span>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#9A3412]">
                      Ensure the DPIA is completed and documented before this system is deployed in production.
                    </p>
                  </div>
                )}
              </div>

              {/* Q8: Linked Components */}
              <ComponentLinker
                selectedIds={linkedComponentIds}
                onChange={setLinkedComponentIds}
              />

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={onBack}
                  className="px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => alert('Section 8 saved!')}
                  className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
                >
                  Confirm and Save
                </button>
              </div>
            </div>
          </CollapsibleSection>

          {/* Proceed to Assessment Button */}
          <div className="flex justify-end pt-4 pb-8">
            <button
              onClick={() => setActiveTab('Assessment')}
              className="px-8 py-3 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-base hover:bg-[#DC180A] transition-colors shadow-md"
            >
              Save all and proceed to Assessment
            </button>
          </div>
          </>
          )}

          {/* Assessment Tab Content */}
          {activeTab === 'Assessment' && (
            <>
              {/* Instruction */}
              <div className="bg-[#FFF9E6] border border-[#FFE59E] rounded-lg px-6 py-4">
                <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                  Assessment is based on the information provided in the Profile page. Please review the assessment below and confirm or update them using the legal references provided.
                </p>
              </div>

              {/* Block 1: Prohibited Practices Screening */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A]">
                    Block 1 — Prohibited Practices Screening
                  </h2>
                  {/* Status Badge */}
                  <div className={`px-4 py-1.5 rounded-full font-['Montserrat',sans-serif] font-semibold text-sm ${
                    getProhibitedStatus() === 'PASS' 
                      ? 'bg-[#E8F5E9] text-[#2E7D32]' 
                      : getProhibitedStatus() === 'Triggered'
                      ? 'bg-[#FFF3E0] text-[#E65100]'
                      : getProhibitedStatus() === 'Prohibited'
                      ? 'bg-[#FFEBEE] text-[#C62828]'
                      : getProhibitedStatus() === 'Exception claimed'
                      ? 'bg-[#E8F5E9] text-[#2E7D32]'
                      : getProhibitedStatus() === 'Not assessed'
                      ? 'bg-[#F0F1F2] text-[#6B7280]'
                      : 'bg-[#FFF9E6] text-[#F57C00]'
                  }`}>
                    {getProhibitedStatus()}
                  </div>
                </div>

                {/* Only show content if not "Not assessed" */}
                {getProhibitedStatus() !== 'Not assessed' && (
                  <>
                {/* Step 1: Triggered Status - Initial Confirmation */}
                {(getProhibitedStatus() === 'Triggered' || (prohibitedConfirmed && getSelectedProhibitedPractices().length > 0)) && (
                  <div className="space-y-4">
                    <div className="bg-[#FFF9E6] border border-[#FFE59E] rounded-lg p-4">
                      <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                        Confirm Profile input:
                      </p>
                      <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-2">
                        You indicated the system uses the following capabilities or practices:
                      </p>
                      <ul className="list-disc list-inside space-y-1 mb-3">
                        {getSelectedProhibitedPractices().map((practice, idx) => (
                          <li key={idx} className="font-['Montserrat',sans-serif] font-medium text-sm text-[#464E58] ml-2">
                            {practice}
                          </li>
                        ))}
                      </ul>
                      <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-3">
                        {getSelectedProhibitedPractices().length === 1 
                          ? `This is a prohibited practice under ${prohibitedPracticesMap[getSelectedProhibitedPractices()[0]]?.article} of the EU AI Act.`
                          : `These are prohibited practices under the following articles of the EU AI Act: ${getSelectedProhibitedPractices().map(p => prohibitedPracticesMap[p]?.article).join(', ')}.`
                        }
                      </p>
                      {!prohibitedConfirmed && (
                        <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                          Do you confirm?
                        </p>
                      )}
                    </div>

                    {!prohibitedConfirmed && (
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setActiveTab('Profile')}
                          className="px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
                        >
                          Edit Profile Info
                        </button>
                        <button
                          onClick={() => setProhibitedConfirmed(true)}
                          className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
                        >
                          Confirm
                        </button>
                      </div>
                    )}

                    {prohibitedConfirmed && (
                      <div className="bg-[#E8F5E9] border border-[#81C784] rounded-lg p-3">
                        <p className="font-['Montserrat',sans-serif] font-medium text-sm text-[#2E7D32]">
                          ✓ Confirmed
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Exception Claim Section */}
                {prohibitedConfirmed && (
                  <div className="space-y-6">
                    {/* Check if any practice has exception available */}
                    {(() => {
                      const selectedPractices = getSelectedProhibitedPractices();
                      const practicesWithException = selectedPractices.filter(p => prohibitedPracticesMap[p]?.hasException);
                      const practicesWithoutException = selectedPractices.filter(p => !prohibitedPracticesMap[p]?.hasException);
                      
                      // If all practices have no exception
                      if (practicesWithException.length === 0) {
                        return (
                          <div className="space-y-4">
                            <div className="bg-[#FFEBEE] border border-[#EF5350] rounded-lg p-4">
                              <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#C62828] mb-2">
                                No exception available
                              </p>
                              <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                This prohibited practice does not allow exceptions under the EU AI Act.
                              </p>
                            </div>
                            
                            {!noExceptionConfirmed && (
                              <div className="flex justify-end">
                                <button
                                  onClick={() => setNoExceptionConfirmed(true)}
                                  className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
                                >
                                  Confirm
                                </button>
                              </div>
                            )}
                            
                            {noExceptionConfirmed && (
                              <div className="bg-[#FFEBEE] border border-[#EF5350] rounded-lg p-4">
                                <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#C62828] mb-2">
                                  Result: Prohibited
                                </p>
                                <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                  Your AI System is Prohibited under Art.5. You need to redesign or remove certain features to make it comply to EU AI Act.
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      }
                      
                      // If at least one practice has exception available
                      return (
                        <>
                          <div className="bg-[#FEEDEC] border border-[#F13D30] rounded-lg p-4 space-y-4">
                            <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                              Exception Claim
                            </p>
                            <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                              Does your system fall under the following condition?
                            </p>
                            <div className="bg-white rounded-lg p-3 border border-[#B5BCC4]">
                              <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                {practicesWithException[0] && prohibitedPracticesMap[practicesWithException[0]]?.exceptionCondition}
                              </p>
                            </div>
                            
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="exceptionQualifies"
                                  checked={exceptionQualifies === 'Yes'}
                                  onChange={() => setExceptionQualifies('Yes')}
                                  className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                                />
                                <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                  Yes
                                </span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="exceptionQualifies"
                                  checked={exceptionQualifies === 'No'}
                                  onChange={() => setExceptionQualifies('No')}
                                  className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                                />
                                <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                  No
                                </span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="exceptionQualifies"
                                  checked={exceptionQualifies === 'Not sure'}
                                  onChange={() => setExceptionQualifies('Not sure')}
                                  className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                                />
                                <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                  Not sure
                                </span>
                              </label>
                            </div>
                          </div>

                          {/* If user answered Yes - Ask for Evidence */}
                          {exceptionQualifies === 'Yes' && (
                            <div className="space-y-4">
                              <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                                Evidence / Documentation <span className="text-[#F13D30]">*</span>
                              </label>

                              {/* Evidence Link */}
                              <div className="space-y-3">
                                <label className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                  Paste a link or upload new document below.
                                </label>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={exceptionEvidenceLink}
                                    onChange={(e) => setExceptionEvidenceLink(e.target.value)}
                                    placeholder="Paste link here"
                                    className="flex-1 px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC] transition-colors"
                                  />
                                  <button
                                    onClick={saveExceptionEvidenceLink}
                                    className="px-4 py-2 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors whitespace-nowrap"
                                  >
                                    Save link
                                  </button>
                                </div>
                                {exceptionEvidenceSavedLink && (
                                  <div className="flex items-center gap-2 mt-2">
                                    {isSection1Link(exceptionEvidenceSavedLink) ? (
                                      <>
                                        <FileText className="w-4 h-4 text-[#F13D30]" />
                                        <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                          Document link saved
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <Link className="w-4 h-4 text-[#F13D30]" />
                                        <a
                                          href={exceptionEvidenceSavedLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="font-['Montserrat',sans-serif] font-normal text-sm text-[#F13D30] hover:underline"
                                        >
                                          {exceptionEvidenceSavedLink}
                                        </a>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Upload Button */}
                              <div className="bg-white border border-[#B5BCC4] rounded-lg p-3">
                                <button
                                  onClick={() => setExceptionEvidenceUploaded(true)}
                                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
                                >
                                  <Upload className="w-4 h-4" />
                                  Upload Supporting Documents
                                </button>
                                {exceptionEvidenceUploaded && (
                                  <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#2E7D32] mt-2 text-center">
                                    ✓ Document uploaded
                                  </p>
                                )}
                              </div>

                              {/* Explanation Textarea */}
                              <div>
                                <textarea
                                  value={exceptionEvidence}
                                  onChange={(e) => setExceptionEvidence(e.target.value)}
                                  placeholder="Explain how the evidence supports your exception claim."
                                  rows={4}
                                  className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC]"
                                />
                              </div>

                              {/* Confirm Exception Claim Button */}
                              {!exceptionClaimConfirmed && (exceptionEvidenceUploaded || exceptionEvidenceSavedLink) && (
                                <div className="flex justify-end pt-2">
                                  <button
                                    onClick={() => setExceptionClaimConfirmed(true)}
                                    className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
                                  >
                                    Confirm Exception Claim
                                  </button>
                                </div>
                              )}

                              {exceptionClaimConfirmed && (
                                <div className="bg-[#E8F5E9] border border-[#81C784] rounded-lg p-3">
                                  <p className="font-['Montserrat',sans-serif] font-medium text-sm text-[#2E7D32]">
                                    ✓ Exception Claim Confirmed
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* If user answered No - Show Prohibited */}
                          {exceptionQualifies === 'No' && (
                            <div className="bg-[#FFEBEE] border border-[#EF5350] rounded-lg p-4">
                              <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#C62828] mb-2">
                                Result: Prohibited
                              </p>
                              <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                Your AI System is Prohibited under Art.5. You need to redesign or remove certain features to make it comply to EU AI Act.
                              </p>
                            </div>
                          )}

                          {/* If user answered Not sure - Show Needs Review */}
                          {exceptionQualifies === 'Not sure' && (
                            <div className="bg-[#FFF9E6] border border-[#FFE59E] rounded-lg p-4">
                              <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#F57C00] mb-2">
                                Result: Needs Review
                              </p>
                              <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                This system requires legal review to determine if the exception applies. Please consult with your legal team or compliance officer.
                              </p>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                )}

                {/* Exception Claimed Status Display */}
                {getProhibitedStatus() === 'Exception claimed' && (
                  <div className="bg-[#E8F5E9] border border-[#81C784] rounded-lg p-4">
                    <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#2E7D32] mb-2">
                      ✓ Exception Claimed
                    </p>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                      Your exception claim has been recorded with supporting evidence. This will be subject to regulatory review.
                    </p>
                  </div>
                )}

                {/* PASS Status */}
                {getProhibitedStatus() === 'PASS' && (
                  <div className="bg-[#E8F5E9] border border-[#81C784] rounded-lg p-4">
                    <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#2E7D32]">
                      ✓ No prohibited practices detected
                    </p>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mt-2">
                      Based on your Profile inputs, this AI system does not appear to fall under the prohibited practices defined in Article 5 of the EU AI Act.
                    </p>
                  </div>
                )}
                  </>
                )}
              </div>

              {/* Block 2: High-Risk Classification */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A]">
                    Block 2 — High-Risk Classification
                  </h2>
                  {/* Status Badge */}
                  <div className={`px-4 py-1.5 rounded-full font-['Montserrat',sans-serif] font-semibold text-sm ${
                    getHighRiskStatus() === 'De-activated' 
                      ? 'bg-[#F0F1F2] text-[#B5BCC4]' 
                      : getHighRiskStatus() === 'High-risk'
                      ? 'bg-[#FFF3E0] text-[#E65100]'
                      : getHighRiskStatus() === 'Needs review'
                      ? 'bg-[#FFF9E6] text-[#F57C00]'
                      : getHighRiskStatus() === 'Not assessed'
                      ? 'bg-[#F0F1F2] text-[#6B7280]'
                      : 'bg-[#E8F5E9] text-[#2E7D32]'
                  }`}>
                    {getHighRiskStatus()}
                  </div>
                </div>

                {/* Only show content if not "Not assessed" */}
                {getHighRiskStatus() !== 'Not assessed' && (
                  <>
                {/* De-activated Status */}
                {getHighRiskStatus() === 'De-activated' && (
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                    <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#B5BCC4]">
                      This block is de-activated
                    </p>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#B5BCC4] mt-2">
                      Because your AI system is prohibited under Block 1, high-risk classification assessment is not applicable.
                    </p>
                  </div>
                )}

                {/* Active Assessment - Only show when NOT de-activated */}
                {getHighRiskStatus() !== 'De-activated' && (
                  <>
                    {/* High-risk Status - Step 1: Initial Confirmation */}
                    {getHighRiskTrigger() !== 'none' && (
                  <div className="space-y-4">
                    <div className="bg-[#FFF9E6] border border-[#FFE59E] rounded-lg p-4">
                      <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                        Confirm Profile input:
                      </p>
                      <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-2">
                        Based on your Profile inputs, this AI system may be classified as high-risk because:
                      </p>
                      <ul className="list-disc list-inside space-y-1 mb-4">
                        {isCondition1Met() && (
                          <li className="font-['Montserrat',sans-serif] font-medium text-sm text-[#464E58] ml-2">
                            It is a safety component requiring third-party conformity assessment (Section 4, Q3)
                          </li>
                        )}
                        {isCondition2Met() && (
                          <li className="font-['Montserrat',sans-serif] font-medium text-sm text-[#464E58] ml-2">
                            It is used in high-risk sectors: {sectorDomains.filter(s => s !== 'Other / not listed').join(', ')} (Section 4, Q2)
                          </li>
                        )}
                      </ul>
                      {!highRiskConfirmed && (
                        <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                          Do you confirm?
                        </p>
                      )}
                    </div>

                    {!highRiskConfirmed && (
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setActiveTab('Profile')}
                        className="px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
                      >
                        Edit Profile Info
                      </button>
                      <button
                        onClick={() => setHighRiskConfirmed(true)}
                        className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
                      >
                        Confirm
                      </button>
                    </div>
                    )}

                    {highRiskConfirmed && (
                    <div className="bg-[#E8F5E9] border border-[#81C784] rounded-lg p-3">
                      <p className="font-['Montserrat',sans-serif] font-medium text-sm text-[#2E7D32]">
                        ✓ Confirmed
                      </p>
                    </div>
                    )}
                  </div>
                )}

                {/* Step 2: After Confirmation */}
                {highRiskConfirmed && getHighRiskTrigger() !== 'none' && (
                  <div className="space-y-6">

                    {/* Condition 1 Only: Direct High-Risk Result */}
                    {getHighRiskTrigger() === 'condition1' && (
                      <div className="bg-[#FFF3E0] border border-[#FB8C00] rounded-lg p-4">
                        <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#E65100] mb-2">
                          Result: High-Risk Classification Confirmed
                        </p>
                        <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                          This AI system is classified as high-risk under the EU AI Act because it is a safety component of a product requiring third-party conformity assessment under EU harmonisation legislation (Annex I).
                        </p>
                      </div>
                    )}

                    {/* Condition 2 or Both: Annex III Exemption Test */}
                    {(getHighRiskTrigger() === 'condition2' || getHighRiskTrigger() === 'both') && (
                      <div className="space-y-6">
                        <div className="bg-[#FFF9E6] border border-[#FFE59E] rounded-lg p-4">
                          <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                            Annex III Exemption Test, Art. 6(3)
                          </p>
                          <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                            The system operates in a high-risk sector. Please complete the following assessment to determine if an exemption applies.
                          </p>
                        </div>

                        {/* Q1: Material Influence */}
                        <div className="space-y-3">
                          <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                            Q1. Does the system materially influence the outcome of decision-making OR pose significant risk to health / safety / fundamental rights? <span className="text-[#F13D30]">*</span>
                          </label>
                          <div className="space-y-2">
                            <label className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="radio"
                                name="materialInfluence"
                                value="Yes"
                                checked={materialInfluence === 'Yes'}
                                onChange={(e) => setMaterialInfluence(e.target.value as 'Yes')}
                                className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                              />
                              <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                Yes
                              </span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="radio"
                                name="materialInfluence"
                                value="No"
                                checked={materialInfluence === 'No'}
                                onChange={(e) => setMaterialInfluence(e.target.value as 'No')}
                                className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                              />
                              <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                No
                              </span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="radio"
                                name="materialInfluence"
                                value="Not sure"
                                checked={materialInfluence === 'Not sure'}
                                onChange={(e) => setMaterialInfluence(e.target.value as 'Not sure')}
                                className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                              />
                              <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                Not sure
                              </span>
                            </label>
                          </div>
                        </div>

                        {/* Q2: Narrow Tasks (shown only if Q1 = No) */}
                        {materialInfluence === 'No' && (
                          <div className="space-y-3">
                            <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                              Q2. This AI system only does one of the following (select all that apply) <span className="text-[#F13D30]">*</span>
                            </label>
                            <div className="space-y-2">
                              {[
                                'Narrow procedural task',
                                'Improves a previously completed human activity',
                                'Detects patterns / deviations from past decisions (without influencing decisions)',
                                'Preparatory task to an assessment relevant for the purposes of the use cases listed in Annex III (e.g., indexing, sorting, summarising)',
                                'None of above',
                              ].map((task) => (
                                <label key={task} className="flex items-start gap-3 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={narrowTasks.includes(task)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        if (task === 'None of above') {
                                          setNarrowTasks(['None of above']);
                                        } else {
                                          setNarrowTasks([...narrowTasks.filter(t => t !== 'None of above'), task]);
                                        }
                                      } else {
                                        setNarrowTasks(narrowTasks.filter(t => t !== task));
                                      }
                                    }}
                                    className="w-4 h-4 flex-shrink-0 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5"
                                  />
                                  <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                    {task}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Q3: Profiling (shown only if Q1=No and Q2 has selections other than "None of above") */}
                        {materialInfluence === 'No' && narrowTasks.length > 0 && !narrowTasks.includes('None of above') && (
                          <div className="space-y-3">
                            <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                              Q3. Does the system perform profiling of natural persons? <span className="text-[#F13D30]">*</span>
                            </label>
                            <div className="space-y-2">
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  type="radio"
                                  name="profiling"
                                  value="Yes"
                                  checked={profiling === 'Yes'}
                                  onChange={(e) => setProfiling(e.target.value as 'Yes')}
                                  className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                                />
                                <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                  Yes
                                </span>
                              </label>
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  type="radio"
                                  name="profiling"
                                  value="No"
                                  checked={profiling === 'No'}
                                  onChange={(e) => setProfiling(e.target.value as 'No')}
                                  className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                                />
                                <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                  No
                                </span>
                              </label>
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  type="radio"
                                  name="profiling"
                                  value="Unknown"
                                  checked={profiling === 'Unknown'}
                                  onChange={(e) => setProfiling(e.target.value as 'Unknown')}
                                  className="w-4 h-4 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30]"
                                />
                                <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                  Unknown
                                </span>
                              </label>
                            </div>
                          </div>
                        )}

                        {/* Result: High-risk (if exemption fails) */}
                        {(materialInfluence === 'Yes' || 
                          (materialInfluence === 'No' && narrowTasks.includes('None of above')) ||
                          (materialInfluence === 'No' && narrowTasks.length > 0 && !narrowTasks.includes('None of above') && profiling === 'Yes')) && (
                          <div className="bg-[#FFF3E0] border border-[#FB8C00] rounded-lg p-4">
                            <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#E65100] mb-2">
                              Result: Exemption fails → High-Risk
                            </p>
                            <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                              This AI system is classified as high-risk under the EU AI Act and does not qualify for the Annex III exemption.
                            </p>
                          </div>
                        )}

                        {/* Not high-risk path: Collect evidence first */}
                        {materialInfluence === 'No' && narrowTasks.length > 0 && !narrowTasks.includes('None of above') && profiling === 'No' && (
                          <div className="space-y-6">
                            <div className="bg-[#E8F5E9] border border-[#81C784] rounded-lg p-4">
                              <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#2E7D32] mb-2">
                                Exemption Test Passed
                              </p>
                              <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                This AI system qualifies for the Annex III exemption. Please provide evidence to confirm not high-risk classification.
                              </p>
                            </div>

                            {/* Evidence Section */}
                            <div className="space-y-4">
                              <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                                Evidence / Documentation <span className="text-[#F13D30]">*</span>
                              </label>

                              <div className="space-y-3">
                                <label className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                  Paste a link or upload new document below.
                                </label>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={minimalRiskEvidenceLink}
                                    onChange={(e) => setMinimalRiskEvidenceLink(e.target.value)}
                                    placeholder="Paste link here"
                                    className="flex-1 px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC] transition-colors"
                                  />
                                  <button
                                    onClick={saveMinimalRiskEvidenceLink}
                                    className="px-4 py-2 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors whitespace-nowrap"
                                  >
                                    Save link
                                  </button>
                                </div>
                                {minimalRiskEvidenceSavedLink && (
                                  <div className="flex items-center gap-2 mt-2">
                                    {isSection1Link(minimalRiskEvidenceSavedLink) ? (
                                      <>
                                        <FileText className="w-4 h-4 text-[#F13D30]" />
                                        <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                          Document link saved
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <Link className="w-4 h-4 text-[#F13D30]" />
                                        <a
                                          href={minimalRiskEvidenceSavedLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="font-['Montserrat',sans-serif] font-normal text-sm text-[#F13D30] hover:underline"
                                        >
                                          {minimalRiskEvidenceSavedLink}
                                        </a>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>

                              <div className="bg-white border border-[#B5BCC4] rounded-lg p-3">
                                <button
                                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
                                >
                                  <Upload className="w-4 h-4" />
                                  Upload Supporting Documents
                                </button>
                              </div>

                              <div>
                                <textarea
                                  value={minimalRiskEvidence}
                                  onChange={(e) => setMinimalRiskEvidence(e.target.value)}
                                  placeholder="Provide details about why the exemption applies and supporting documentation."
                                  rows={4}
                                  className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC]"
                                />
                              </div>

                              {!minimalRiskEvidenceConfirmed && (
                                <div className="flex justify-end pt-2">
                                  <button
                                    onClick={() => setMinimalRiskEvidenceConfirmed(true)}
                                    className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
                                  >
                                    Confirm Evidence
                                  </button>
                                </div>
                              )}

                              {minimalRiskEvidenceConfirmed && (
                                <div className="bg-[#E8F5E9] border border-[#81C784] rounded-lg p-3">
                                  <p className="font-['Montserrat',sans-serif] font-medium text-sm text-[#2E7D32]">
                                    ✓ Evidence Confirmed
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Final Not High-Risk Result - Only after evidence confirmed */}
                            {minimalRiskEvidenceConfirmed && (
                              <div className="bg-[#E8F5E9] border border-[#81C784] rounded-lg p-4">
                                <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#2E7D32] mb-2">
                                  Result: Not High-Risk
                                </p>
                                <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                  This AI system qualifies for the Annex III exemption and is classified as not high-risk.
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Result: Needs review */}
                        {(materialInfluence === 'Not sure' || 
                          (materialInfluence === 'No' && narrowTasks.length > 0 && !narrowTasks.includes('None of above') && profiling === 'Unknown')) && (
                          <div className="bg-[#FFF9E6] border border-[#FFE59E] rounded-lg p-4">
                            <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#F57C00] mb-2">
                              Result: Needs Review
                            </p>
                            <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                              The classification of this AI system requires further review by a legal expert to determine if it qualifies as high-risk.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Not high-risk Status (when no conditions met) */}
                {getHighRiskTrigger() === 'none' && (
                  <div className="bg-[#E8F5E9] border border-[#81C784] rounded-lg p-4">
                    <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#2E7D32]">
                      ✓ Not High-Risk
                    </p>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mt-2">
                      Based on your Profile inputs, this AI system does not appear to be classified as high-risk under the EU AI Act.
                    </p>
                  </div>
                )}
                  </>
                )}
                  </>
                )}
              </div>

              {/* Block 3: Transparency Obligation */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A]">
                    Block 3 — Transparency Obligation
                  </h2>
                  <div className={`px-4 py-1.5 rounded-full font-['Montserrat',sans-serif] font-semibold text-sm ${
                    getBlock3Status() === 'De-activated' 
                      ? 'bg-[#F0F1F2] text-[#B5BCC4]' 
                      : getBlock3Status() === 'Applies'
                      ? 'bg-[#FFF3E0] text-[#E65100]'
                      : getBlock3Status() === 'Not Applicable'
                      ? 'bg-[#E8F5E9] text-[#2E7D32]'
                      : getBlock3Status() === 'Needs Review'
                      ? 'bg-[#FFF9E6] text-[#F57C00]'
                      : getBlock3Status() === 'Not assessed'
                      ? 'bg-[#F0F1F2] text-[#6B7280]'
                      : 'bg-[#F0F1F2] text-[#B5BCC4]'
                  }`}>
                    {getBlock3Status()}
                  </div>
                </div>

                {/* Only show content if not "Not assessed" */}
                {getBlock3Status() !== 'Not assessed' && (
                  <>
                {/* De-activated state */}
                {getBlock3Status() === 'De-activated' && (
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                    <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#B5BCC4]">
                      This block is de-activated
                    </p>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#B5BCC4] mt-2">
                      Because your AI system is prohibited under Block 1, transparency assessment is not applicable.
                    </p>
                  </div>
                )}

                {/* Active Assessment */}
                {!isBlock1Prohibited() && (
                  <>
                    {/* Step 1: Initial Status - Transparency Applies */}
                    {getTransparencyTriggers().length > 0 && (
                      <div className="space-y-4">
                        <div className="bg-[#FFF9E6] border border-[#FFE59E] rounded-lg p-4">
                          <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                            Confirm Profile input:
                          </p>
                          <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-2">
                            Based on your Profile inputs, transparency obligation applies to this AI system because:
                          </p>
                          <ul className="list-disc list-inside space-y-1 mb-4">
                            {getTransparencyTriggerReasons().map((reason, idx) => (
                              <li key={idx} className="font-['Montserrat',sans-serif] font-medium text-sm text-[#464E58] ml-2">
                                {reason}
                              </li>
                            ))}
                          </ul>
                          {!transparencyConfirmed && (
                            <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                              Do you confirm?
                            </p>
                          )}
                        </div>

                        {!transparencyConfirmed && (
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => setActiveTab('Profile')}
                              className="px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
                            >
                              Edit Profile Info
                            </button>
                            <button
                              onClick={() => setTransparencyConfirmed(true)}
                              className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
                            >
                              Confirm
                            </button>
                          </div>
                        )}

                        {transparencyConfirmed && (
                          <div className="bg-[#E8F5E9] border border-[#81C784] rounded-lg p-3">
                            <p className="font-['Montserrat',sans-serif] font-medium text-sm text-[#2E7D32]">
                              ✓ Confirmed
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 3: Exception Claim Options - Always visible after confirmation */}
                    {transparencyConfirmed && getTransparencyTriggers().length > 0 && (
                      <div className="space-y-4">
                        <div className="bg-[#FFF9E6] border border-[#FFE59E] rounded-lg p-4">
                              <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                                Exception Case Claim
                              </p>
                              <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-2">
                                You must select at least one exception for EACH triggered case below, or select "None of the above" for any case to confirm transparency obligation applies.
                              </p>
                              <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#E65100]">
                                ⚠ All triggered cases must have exceptions to make transparency obligation not applicable.
                              </p>
                            </div>

                            {Object.entries(getTransparencyExceptionOptionsByCaseGroup()).map(([groupKey, group]) => (
                              <div key={groupKey} className="bg-white border border-[#E5E7EB] rounded-lg p-4 space-y-3">
                                <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                                  {group.label} <span className="text-[#F13D30]">*</span>
                                </p>
                                <div className="space-y-2">
                                  {group.options.map((option) => (
                                    <label key={option} className="flex items-start gap-3 cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={transparencyExceptionOptions.includes(option)}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            // If "None of the above" for this case is selected, remove other options from this group
                                            if (option.includes('None of the above')) {
                                              // Remove all options from this group except the "None" option
                                              const filtered = transparencyExceptionOptions.filter(o => 
                                                !group.options.includes(o) || o.includes('None of the above')
                                              );
                                              setTransparencyExceptionOptions([...filtered, option]);
                                            } else {
                                              // Remove "None of the above" for this group if selecting a real exception
                                              const filtered = transparencyExceptionOptions.filter(o => 
                                                !o.includes('None of the above') || !group.options.includes(o)
                                              );
                                              setTransparencyExceptionOptions([...filtered, option]);
                                            }
                                          } else {
                                            setTransparencyExceptionOptions(transparencyExceptionOptions.filter(o => o !== option));
                                          }
                                        }}
                                        className="w-4 h-4 shrink-0 text-[#F13D30] border-[#B5BCC4] rounded focus:ring-[#F13D30] mt-0.5"
                                      />
                                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                        {option}
                                      </span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            ))}
                      </div>
                    )}

                    {/* Step 4: Exceptions Selected Confirmation */}
                    {transparencyConfirmed && getTransparencyTriggers().length > 0 && 
                     hasExceptionForAllCases() && !hasNoExceptionClaimed() && (
                      <div className="bg-[#E8F5E9] border border-[#81C784] rounded-lg p-3">
                        <p className="font-['Montserrat',sans-serif] font-medium text-sm text-[#2E7D32]">
                          ✓ Exception(s) Selected: {transparencyExceptionOptions.filter(o => !o.includes('None of the above')).join('; ')}
                        </p>
                      </div>
                    )}

                    {/* Step 5: Evidence Collection */}
                    {transparencyConfirmed && getTransparencyTriggers().length > 0 && 
                     hasExceptionForAllCases() && !hasNoExceptionClaimed() && (
                      <div className="space-y-4">

                            <div className="bg-[#FFF9E6] border border-[#FFE59E] rounded-lg p-4">
                              <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                                Evidence Required
                              </p>
                              <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                Please provide evidence to support your exception claim.
                              </p>
                            </div>

                            <div className="space-y-4">
                              <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                                Evidence / Documentation <span className="text-[#F13D30]">*</span>
                              </label>

                              <div className="space-y-3">
                                <label className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                  Paste a link or upload new document below.
                                </label>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={transparencyEvidenceLink}
                                    onChange={(e) => setTransparencyEvidenceLink(e.target.value)}
                                    placeholder="Paste link here"
                                    className="flex-1 px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC] transition-colors"
                                  />
                                  <button
                                    onClick={saveTransparencyEvidenceLink}
                                    className="px-4 py-2 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors whitespace-nowrap"
                                  >
                                    Save link
                                  </button>
                                </div>
                                {transparencyEvidenceSavedLink && (
                                  <div className="flex items-center gap-2 mt-2">
                                    {isSection1Link(transparencyEvidenceSavedLink) ? (
                                      <>
                                        <FileText className="w-4 h-4 text-[#F13D30]" />
                                        <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                          Document link saved
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <Link className="w-4 h-4 text-[#F13D30]" />
                                        <a
                                          href={transparencyEvidenceSavedLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="font-['Montserrat',sans-serif] font-normal text-sm text-[#F13D30] hover:underline"
                                        >
                                          {transparencyEvidenceSavedLink}
                                        </a>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>

                              <div className="bg-white border border-[#B5BCC4] rounded-lg p-3">
                                <button
                                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
                                >
                                  <Upload className="w-4 h-4" />
                                  Upload Supporting Documents
                                </button>
                              </div>

                              <div>
                                <textarea
                                  value={transparencyEvidence}
                                  onChange={(e) => setTransparencyEvidence(e.target.value)}
                                  placeholder="Provide details about why the exception applies and supporting documentation."
                                  rows={4}
                                  className="w-full px-4 py-2.5 border border-[#B5BCC4] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:border-[#F13D30] focus:ring-2 focus:ring-[#FEEDEC]"
                                />
                              </div>

                              {!transparencyEvidenceConfirmed && (
                                <div className="flex justify-end pt-2">
                                  <button
                                    onClick={() => setTransparencyEvidenceConfirmed(true)}
                                    className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
                                  >
                                    Confirm Evidence
                                  </button>
                                </div>
                              )}
                            </div>
                      </div>
                    )}

                    {/* Step 6: Evidence Confirmed */}
                    {transparencyConfirmed && getTransparencyTriggers().length > 0 &&
                     hasExceptionForAllCases() && !hasNoExceptionClaimed() && transparencyEvidenceConfirmed && (
                      <div className="bg-[#E8F5E9] border border-[#81C784] rounded-lg p-3">
                        <p className="font-['Montserrat',sans-serif] font-medium text-sm text-[#2E7D32]">
                          ✓ Evidence Confirmed for All Cases
                        </p>
                      </div>
                    )}

                    {/* Step 7: Final Result - Not Applicable */}
                    {transparencyConfirmed && getTransparencyTriggers().length > 0 &&
                     hasExceptionForAllCases() && !hasNoExceptionClaimed() && transparencyEvidenceConfirmed && (
                      <div className="bg-[#E8F5E9] border border-[#81C784] rounded-lg p-4">
                        <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#2E7D32] mb-2">
                          Result: Transparency Obligation Not Applicable
                        </p>
                        <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                          All triggered cases have valid exceptions with supporting evidence. Transparency obligations do not apply to this AI system.
                        </p>
                      </div>
                    )}

                    {/* Alternative Step: No Exception Claimed */}
                    {transparencyConfirmed && getTransparencyTriggers().length > 0 && hasNoExceptionClaimed() && (
                      <div className="bg-[#E8F5E9] border border-[#81C784] rounded-lg p-3">
                        <p className="font-['Montserrat',sans-serif] font-medium text-sm text-[#2E7D32]">
                          ✓ No Exception for At Least One Case
                        </p>
                      </div>
                    )}

                    {/* Alternative Step: Final Result - Applies */}
                    {transparencyConfirmed && getTransparencyTriggers().length > 0 && hasNoExceptionClaimed() && (
                      <div className="bg-[#FFF3E0] border border-[#FB8C00] rounded-lg p-4">
                        <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#E65100] mb-2">
                          Result: Transparency Obligation Applies
                        </p>
                        <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                          Since not all triggered cases have valid exceptions, this AI system is subject to transparency requirements under Article 50 of the EU AI Act.
                        </p>
                      </div>
                    )}

                    {/* No Triggers - Not Applicable */}
                    {getTransparencyTriggers().length === 0 && (
                      <div className="bg-[#E8F5E9] border border-[#81C784] rounded-lg p-4">
                        <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#2E7D32]">
                          ✓ Transparency Obligation Not Applicable
                        </p>
                        <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mt-2">
                          Based on your Profile inputs, this AI system does not trigger transparency obligations under Article 50 of the EU AI Act.
                        </p>
                      </div>
                    )}
                  </>
                )}
                  </>
                )}
              </div>

              {/* Block 4: GPAI Applicability */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#22262A]">
                    Block 4 — GPAI (General-Purpose AI) Applicability
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className={`px-4 py-1.5 rounded-full font-['Montserrat',sans-serif] font-semibold text-sm ${
                      getBlock4Status() === 'De-activated' 
                        ? 'bg-[#F0F1F2] text-[#B5BCC4]' 
                        : getBlock4Status() === 'Applies'
                        ? 'bg-[#FFF3E0] text-[#E65100]'
                        : getBlock4Status() === 'Not Applicable'
                        ? 'bg-[#E8F5E9] text-[#2E7D32]'
                        : getBlock4Status() === 'Needs Review'
                        ? 'bg-[#FFF9E6] text-[#F57C00]'
                        : getBlock4Status() === 'Not assessed'
                        ? 'bg-[#F0F1F2] text-[#6B7280]'
                        : 'bg-[#FFF9E6] text-[#F57C00]'
                    }`}>
                      {getBlock4Status()}
                    </div>
                    {getBlock4RiskEvaluation() && (
                      <div className={`px-4 py-1.5 rounded-full font-['Montserrat',sans-serif] font-semibold text-sm ${
                        getBlock4RiskEvaluation() === 'Systemic Risk'
                          ? 'bg-[#FEEDEC] text-[#DC180A]'
                          : getBlock4RiskEvaluation() === 'Standard GPAI'
                          ? 'bg-[#FFF3E0] text-[#E65100]'
                          : getBlock4RiskEvaluation() === 'No Risk'
                          ? 'bg-[#E8F5E9] text-[#2E7D32]'
                          : 'bg-[#F0F1F2] text-[#6B7280]'
                      }`}>
                        {getBlock4RiskEvaluation()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Only show content if not "Not assessed" */}
                {getBlock4Status() !== 'Not assessed' && (
                  <>
                {getBlock4Status() === 'De-activated' && (
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                    <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#B5BCC4]">
                      This block is de-activated
                    </p>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#B5BCC4] mt-2">
                      Because your AI system is prohibited under Block 1, GPAI assessment is not applicable.
                    </p>
                  </div>
                )}

                {!isBlock1Prohibited() && (
                  <>
                    {/* Step 1: Initial Status - GPAI Applies */}
                    {gpaiIntegration === 'Yes' && (
                      <div className="space-y-4">
                        <div className="bg-[#FFF9E6] border border-[#FFE59E] rounded-lg p-4">
                          <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                            Confirm Profile input:
                          </p>
                          <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-2">
                            Based on your Profile inputs, GPAI obligations apply to this AI system because:
                          </p>
                          <ul className="list-disc list-inside space-y-1 mb-4">
                            <li className="font-['Montserrat',sans-serif] font-medium text-sm text-[#464E58] ml-2">
                              System is provided as or integrates a general-purpose AI (GPAI) model / component (Section 8, Q2)
                            </li>
                          </ul>
                          {!gpaiConfirmed && (
                            <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                              Do you confirm?
                            </p>
                          )}
                        </div>

                        {!gpaiConfirmed && (
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => setActiveTab('Profile')}
                              className="px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
                            >
                              Edit Profile Info
                            </button>
                            <button
                              onClick={() => setGpaiConfirmed(true)}
                              className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors"
                            >
                              Confirm
                            </button>
                          </div>
                        )}

                        {gpaiConfirmed && (
                          <div className="bg-[#E8F5E9] border border-[#81C784] rounded-lg p-3">
                            <p className="font-['Montserrat',sans-serif] font-medium text-sm text-[#2E7D32]">
                              ✓ Confirmed
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 3: Provider Question */}
                    {gpaiConfirmed && gpaiIntegration === 'Yes' && (
                      <div className="space-y-4">
                        <div className="bg-[#FFF9E6] border border-[#FFE59E] rounded-lg p-4">
                          <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                            Provider Status
                          </p>
                          <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                            Please clarify your role in relation to the AI model:
                          </p>
                        </div>

                        <div className="space-y-3">
                          <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                            Are you the provider of the AI model (you develop it / release it under your name)? <span className="text-[#F13D30]">*</span>
                          </label>
                          <div className="space-y-2">
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input
                                type="radio"
                                name="gpaiProviderAnswer"
                                value="Yes"
                                checked={gpaiProviderAnswer === 'Yes'}
                                onChange={(e) => setGpaiProviderAnswer(e.target.value as 'Yes')}
                                className="w-4 h-4 shrink-0 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30] mt-0.5"
                              />
                              <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                Yes - I am the provider of the AI model
                              </span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input
                                type="radio"
                                name="gpaiProviderAnswer"
                                value="No"
                                checked={gpaiProviderAnswer === 'No'}
                                onChange={(e) => setGpaiProviderAnswer(e.target.value as 'No')}
                                className="w-4 h-4 shrink-0 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30] mt-0.5"
                              />
                              <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                No - I am not the provider (e.g., I am a deployer / user of the model)
                              </span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input
                                type="radio"
                                name="gpaiProviderAnswer"
                                value="Not sure"
                                checked={gpaiProviderAnswer === 'Not sure'}
                                onChange={(e) => setGpaiProviderAnswer(e.target.value as 'Not sure')}
                                className="w-4 h-4 shrink-0 text-[#F13D30] border-[#B5BCC4] focus:ring-[#F13D30] mt-0.5"
                              />
                              <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                                Not sure - Requires further review
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Final Result - Provider = Yes (Applies) */}
                    {gpaiConfirmed && gpaiIntegration === 'Yes' && gpaiProviderAnswer === 'Yes' && (
                      <div className="bg-[#FFF3E0] border border-[#FB8C00] rounded-lg p-4">
                        <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#E65100] mb-2">
                          Result: GPAI Obligations Apply
                        </p>
                        <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                          As the provider of the AI model, your AI system is subject to General-Purpose AI obligations under Chapter V of the EU AI Act.
                        </p>
                      </div>
                    )}

                    {/* Step 4: Final Result - Provider = No (Not Applicable) */}
                    {gpaiConfirmed && gpaiIntegration === 'Yes' && gpaiProviderAnswer === 'No' && (
                      <div className="bg-[#E8F5E9] border border-[#81C784] rounded-lg p-4">
                        <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#2E7D32] mb-2">
                          Result: GPAI Obligations Not Applicable
                        </p>
                        <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                          As you are not the provider of the AI model, GPAI obligations under Chapter V do not apply to you. However, you may have other obligations as a deployer or user.
                        </p>
                      </div>
                    )}

                    {/* Step 4: Final Result - Provider = Not sure (Needs Review) */}
                    {gpaiConfirmed && gpaiIntegration === 'Yes' && gpaiProviderAnswer === 'Not sure' && (
                      <div className="bg-[#FFF9E6] border border-[#FFE59E] rounded-lg p-4">
                        <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#F57C00] mb-2">
                          Result: Needs Review
                        </p>
                        <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                          Your provider status needs to be clarified. Please consult with your legal team or compliance officer to determine whether you are the provider of the AI model.
                        </p>
                      </div>
                    )}

                    {/* Unknown GPAI Integration Status - Needs Review */}
                    {gpaiIntegration === 'Unknown' && (
                      <div className="bg-[#FFF9E6] border border-[#FFE59E] rounded-lg p-4">
                        <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#F57C00] mb-2">
                          Result: Needs Review
                        </p>
                        <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-2">
                          In your Profile (Section 8, Q2), you indicated that it is <span className="font-semibold">Unknown</span> whether this system is provided as a general-purpose AI (GPAI) model/component or integrates one.
                        </p>
                        <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                          Please clarify this information to determine whether GPAI obligations under Chapter V of the EU AI Act apply to your system. Consult with your technical team or legal counsel for guidance.
                        </p>
                      </div>
                    )}

                    {/* No Triggers - Not Applicable */}
                    {gpaiIntegration === 'No' && (
                      <div className="bg-[#E8F5E9] border border-[#81C784] rounded-lg p-4">
                        <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#2E7D32]">
                          ✓ GPAI Obligations Not Applicable
                        </p>
                        <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mt-2">
                          Based on your Profile inputs, this AI system does not qualify as a general-purpose AI model, so GPAI obligations under Chapter V of the EU AI Act do not apply.
                        </p>
                      </div>
                    )}
                  </>
                )}
                  </>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4 pb-8">
                <button
                  onClick={() => setActiveTab('Profile')}
                  className="px-6 py-2.5 bg-[#ece9fe] border border-[#ddd6fe] text-[#5720B7] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#ddd6fe] transition-colors"
                >
                  Back to Profile
                </button>
                <button
                  onClick={() => setActiveTab('Result')}
                  className="px-8 py-3 bg-[#5720B7] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-base hover:bg-[#4c1d95] transition-colors shadow-md"
                >
                  Proceed to Result
                </button>
              </div>
            </>
          )}

          {/* Result Tab Content */}
          {activeTab === 'Result' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
                <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-2">
                  Assessment Result
                </h1>
                <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                  Summary of EU AI Act compliance assessment for this AI system
                </p>
              </div>

              {/* Block 1: Prohibited Practices */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A]">
                    Block 1 — Prohibited Practices
                  </h2>
                  <div className={`px-4 py-1.5 rounded-full font-['Montserrat',sans-serif] font-semibold text-sm ${
                    getBlock1Status() === 'Prohibited'
                      ? 'bg-[#FEEDEC] text-[#DC180A]'
                      : getBlock1Status() === 'Not Prohibited'
                      ? 'bg-[#E8F5E9] text-[#2E7D32]'
                      : 'bg-[#FFF9E6] text-[#F57C00]'
                  }`}>
                    {getBlock1Status()}
                  </div>
                </div>
                <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                  {getBlock1Status() === 'Prohibited' && 
                    'This AI system is classified as prohibited under Article 5 of the EU AI Act. It cannot be deployed or used within the EU.'
                  }
                  {getBlock1Status() === 'Not Prohibited' && 
                    'This AI system does not fall under prohibited practices. It may proceed to further compliance assessment.'
                  }
                  {getBlock1Status() === 'Needs Review' && 
                    'This AI system requires further review to determine if it constitutes a prohibited practice. Consult with your legal team.'
                  }
                </p>
              </div>

              {/* Block 2: High-Risk Classification */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A]">
                    Block 2 — High-Risk Classification
                  </h2>
                  <div className={`px-4 py-1.5 rounded-full font-['Montserrat',sans-serif] font-semibold text-sm ${
                    getBlock2Status() === 'De-activated'
                      ? 'bg-[#F0F1F2] text-[#B5BCC4]'
                      : getBlock2Status() === 'High-Risk'
                      ? 'bg-[#FFF3E0] text-[#E65100]'
                      : getBlock2Status() === 'Not High-Risk'
                      ? 'bg-[#E8F5E9] text-[#2E7D32]'
                      : 'bg-[#FFF9E6] text-[#F57C00]'
                  }`}>
                    {getBlock2Status()}
                  </div>
                </div>
                <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                  {getBlock2Status() === 'De-activated' && 
                    'This assessment is de-activated because the AI system is prohibited.'
                  }
                  {getBlock2Status() === 'High-Risk' && 
                    'This AI system is classified as high-risk under Annex III of the EU AI Act. It must comply with strict requirements including risk management, data governance, and conformity assessment.'
                  }
                  {getBlock2Status() === 'Not High-Risk' && 
                    'This AI system is not classified as high-risk. It may still be subject to other obligations such as transparency requirements.'
                  }
                  {getBlock2Status() === 'Needs Review' && 
                    'This AI system requires further review to determine its high-risk classification. Additional information or clarification is needed.'
                  }
                </p>
              </div>

              {/* Block 3: Transparency Obligation */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A]">
                    Block 3 — Transparency Obligation
                  </h2>
                  <div className={`px-4 py-1.5 rounded-full font-['Montserrat',sans-serif] font-semibold text-sm ${
                    getBlock3Status() === 'De-activated'
                      ? 'bg-[#F0F1F2] text-[#B5BCC4]'
                      : getBlock3Status() === 'Applies'
                      ? 'bg-[#FFF3E0] text-[#E65100]'
                      : getBlock3Status() === 'Not Applicable'
                      ? 'bg-[#E8F5E9] text-[#2E7D32]'
                      : 'bg-[#FFF9E6] text-[#F57C00]'
                  }`}>
                    {getBlock3Status()}
                  </div>
                </div>
                <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                  {getBlock3Status() === 'De-activated' && 
                    'This assessment is de-activated because the AI system is prohibited.'
                  }
                  {getBlock3Status() === 'Applies' && 
                    'This AI system is subject to transparency obligations under Article 50 of the EU AI Act. Users must be informed that they are interacting with AI.'
                  }
                  {getBlock3Status() === 'Not Applicable' && 
                    'This AI system is not subject to transparency obligations under Article 50, either because it does not trigger the requirements or valid exceptions apply.'
                  }
                  {getBlock3Status() === 'Needs Review' && 
                    'The transparency obligation status requires further review. Additional clarification or documentation may be needed.'
                  }
                </p>
              </div>

              {/* Block 4: GPAI Applicability */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A]">
                    Block 4 — GPAI (General-Purpose AI) Applicability
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className={`px-4 py-1.5 rounded-full font-['Montserrat',sans-serif] font-semibold text-sm ${
                      getBlock4Status() === 'De-activated'
                        ? 'bg-[#F0F1F2] text-[#B5BCC4]'
                        : getBlock4Status() === 'Applies'
                        ? 'bg-[#FFF3E0] text-[#E65100]'
                        : getBlock4Status() === 'Not Applicable'
                        ? 'bg-[#E8F5E9] text-[#2E7D32]'
                        : getBlock4Status() === 'Needs Review'
                        ? 'bg-[#FFF9E6] text-[#F57C00]'
                        : 'bg-[#FFF9E6] text-[#F57C00]'
                    }`}>
                      {getBlock4Status()}
                    </div>
                    {getBlock4RiskEvaluation() && (
                      <div className={`px-4 py-1.5 rounded-full font-['Montserrat',sans-serif] font-semibold text-sm ${
                        getBlock4RiskEvaluation() === 'Systemic Risk'
                          ? 'bg-[#FEEDEC] text-[#DC180A]'
                          : getBlock4RiskEvaluation() === 'Standard GPAI'
                          ? 'bg-[#FFF3E0] text-[#E65100]'
                          : getBlock4RiskEvaluation() === 'No Risk'
                          ? 'bg-[#E8F5E9] text-[#2E7D32]'
                          : 'bg-[#F0F1F2] text-[#6B7280]'
                      }`}>
                        {getBlock4RiskEvaluation()}
                      </div>
                    )}
                  </div>
                </div>
                <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                  {getBlock4Status() === 'De-activated' && 
                    'This assessment is de-activated because the AI system is prohibited.'
                  }
                  {getBlock4Status() === 'Applies' && 
                    'This AI system is subject to General-Purpose AI obligations under Chapter V of the EU AI Act as you are the provider of the AI model.'
                  }
                  {getBlock4Status() === 'Not Applicable' && 
                    'This AI system is not subject to GPAI obligations, either because it does not integrate a GPAI model or you are not the provider.'
                  }
                  {getBlock4Status() === 'Needs Review' && 
                    'Your provider status needs to be clarified to determine GPAI applicability. Consult with your legal team.'
                  }
                  {getBlock4Status() === 'Pending' && 
                    'The GPAI assessment is not yet complete. Please complete the assessment to see the final status.'
                  }
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4 pb-8">
                <button
                  onClick={() => setActiveTab('Assessment')}
                  className="px-6 py-2.5 bg-[#ece9fe] border border-[#ddd6fe] text-[#5720B7] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#ddd6fe] transition-colors"
                >
                  Back to Assessment
                </button>
              </div>
            </div>
          )}

          {/* Risk Evaluations Tab Content */}
          {activeTab === 'Risk Evaluations' && (
            <div className="space-y-6">
              {selectedRiskTool === null ? (
                <>
              {/* Header */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
                <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-2">
                  Risk Evaluations
                </h1>
                <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                  Upload your code to automate ai powered risk assessments
                </p>
              </div>

              {/* Upload Code Section */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="border-2 border-dashed border-[#B5BCC4] rounded-lg p-8 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-[#F9FAFB] rounded-full flex items-center justify-center mb-4">
                      <Upload className="w-8 h-8 text-[#6B7280]" />
                    </div>
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-base text-[#22262A] mb-2">
                      Upload Your Code
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] text-center mb-4 max-w-md">
                      Upload your code to automate ai powered risk assessments
                    </p>
                    <button className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Select Files
                    </button>
                    <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#6B7280] mt-3">
                      Supported formats: .py, .js, .java, .cpp, .zip
                    </p>
                  </div>

                  <div className="border-2 border-dashed border-[#B5BCC4] rounded-lg p-8 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-[#F9FAFB] rounded-full flex items-center justify-center mb-4">
                      <Upload className="w-8 h-8 text-[#6B7280]" />
                    </div>
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-base text-[#22262A] mb-2">
                      Upload Your Datasets
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] text-center mb-4 max-w-md">
                      Upload your datasets to automate ai powered risk assessments
                    </p>
                    <button className="px-6 py-2.5 bg-[#F13D30] text-white rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#DC180A] transition-colors flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Select Files
                    </button>
                    <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#6B7280] mt-3">
                      Supported formats: .csv, .json, .xlsx, .parquet, .zip
                    </p>
                  </div>
                </div>
              </div>

              {/* Risk Overview Summary */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
                <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">
                  Overall Risk Profile
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                    <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] mb-2">
                      PROHIBITED PRACTICES
                    </p>
                    <div className={`inline-flex px-3 py-1.5 rounded-full font-['Montserrat',sans-serif] font-semibold text-sm ${
                      getBlock1Status() === 'Prohibited'
                        ? 'bg-[#FEEDEC] text-[#DC180A]'
                        : getBlock1Status() === 'Not Prohibited'
                        ? 'bg-[#E8F5E9] text-[#2E7D32]'
                        : 'bg-[#FFF9E6] text-[#F57C00]'
                    }`}>
                      {getBlock1Status()}
                    </div>
                  </div>
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                    <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] mb-2">
                      HIGH-RISK CLASSIFICATION
                    </p>
                    <div className={`inline-flex px-3 py-1.5 rounded-full font-['Montserrat',sans-serif] font-semibold text-sm ${
                      getBlock2Status() === 'High-Risk'
                        ? 'bg-[#FFF3E0] text-[#E65100]'
                        : getBlock2Status() === 'Not High-Risk'
                        ? 'bg-[#E8F5E9] text-[#2E7D32]'
                        : getBlock2Status() === 'De-activated'
                        ? 'bg-[#F0F1F2] text-[#B5BCC4]'
                        : 'bg-[#FFF9E6] text-[#F57C00]'
                    }`}>
                      {getBlock2Status()}
                    </div>
                  </div>
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                    <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] mb-2">
                      GPAI APPLICABILITY
                    </p>
                    <div className={`inline-flex px-3 py-1.5 rounded-full font-['Montserrat',sans-serif] font-semibold text-sm ${
                      getBlock4Status() === 'Applies'
                        ? 'bg-[#FFF3E0] text-[#E65100]'
                        : getBlock4Status() === 'Not Applicable'
                        ? 'bg-[#E8F5E9] text-[#2E7D32]'
                        : getBlock4Status() === 'De-activated'
                        ? 'bg-[#F0F1F2] text-[#B5BCC4]'
                        : 'bg-[#FFF9E6] text-[#F57C00]'
                    }`}>
                      {getBlock4Status()}
                    </div>
                  </div>
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                    <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] mb-2">
                      GPAI RISK LEVEL
                    </p>
                    {getBlock4RiskEvaluation() ? (
                      <div className={`inline-flex px-3 py-1.5 rounded-full font-['Montserrat',sans-serif] font-semibold text-sm ${
                        getBlock4RiskEvaluation() === 'Systemic Risk'
                          ? 'bg-[#FEEDEC] text-[#DC180A]'
                          : getBlock4RiskEvaluation() === 'Standard GPAI'
                          ? 'bg-[#FFF3E0] text-[#E65100]'
                          : getBlock4RiskEvaluation() === 'No Risk'
                          ? 'bg-[#E8F5E9] text-[#2E7D32]'
                          : 'bg-[#F0F1F2] text-[#6B7280]'
                      }`}>
                        {getBlock4RiskEvaluation()}
                      </div>
                    ) : (
                      <span className="font-['Montserrat',sans-serif] font-normal text-sm text-[#B5BCC4]">N/A</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Detailed Risk Assessment */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
                <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">
                  Detailed Risk Assessment
                </h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-[#F13D30] pl-4 py-2">
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-1">
                      Cybersecurity
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-2">
                      {getBlock2Status() === 'High-Risk' 
                        ? 'Critical cybersecurity measures required including robust protection against unauthorized access, data breaches, and cyberattacks per Article 15.'
                        : 'Standard cybersecurity best practices recommended to protect system integrity and user data.'}
                    </p>
                    <div className="mt-2">
                      <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] mb-1.5">Recommended Tools:</p>
                      <div className="flex flex-wrap gap-1.5">
                        <button 
                          onClick={() => setSelectedRiskTool('prompt-injection-detector')}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          prompt-injection-detector
                        </button>
                        <button 
                          onClick={() => setSelectedRiskTool('security-frameworks')}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          security-frameworks
                        </button>
                        <button 
                          onClick={() => setSelectedRiskTool('grype-vulnerability')}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          grype-vulnerability
                        </button>
                        <button 
                          onClick={() => setSelectedRiskTool('safety-pyup')}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          safety-pyup
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('snyk-io');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          snyk-io
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('oss-scorecard');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          oss-scorecard
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-[#7B1FA2] pl-4 py-2">
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-1">
                      Privacy
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-2">
                      {getBlock2Status() === 'High-Risk'
                        ? 'Enhanced privacy protections required including GDPR alignment, data minimization, and purpose limitation per Article 10.'
                        : 'Standard privacy requirements. Ensure GDPR compliance and appropriate data protection measures.'}
                    </p>
                    <div className="mt-2">
                      <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] mb-1.5">Recommended Tools:</p>
                      <div className="flex flex-wrap gap-1.5">
                        <button 
                          onClick={() => setSelectedRiskTool('data-classification')}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          data-classification
                        </button>
                        <button 
                          onClick={() => setSelectedRiskTool('gdpr-compliance')}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          gdpr-compliance
                        </button>
                        <button 
                          onClick={() => setSelectedRiskTool('hipaa-compliance')}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          hipaa-compliance
                        </button>
                        <button 
                          onClick={() => setSelectedRiskTool('pci-dss-compliance')}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          pci-dss-compliance
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-[#1565C0] pl-4 py-2">
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-1">
                      Fundamental Rights Impact Assessment (FRIA)
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-2">
                      {getBlock2Status() === 'High-Risk'
                        ? 'Mandatory FRIA required per Article 27. Comprehensive assessment of impact on fundamental rights including privacy, non-discrimination, human dignity, and other Charter rights. Assessment must consider affected groups, mitigation measures, and stakeholder consultation.'
                        : 'FRIA recommended for systems with potential fundamental rights impact. Evaluate effects on privacy, equality, and human dignity to ensure compliance with EU Charter of Fundamental Rights.'}
                    </p>
                    <div className="mt-2">
                      <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] mb-1.5">Recommended Tools:</p>
                      <div className="flex flex-wrap gap-1.5">
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('fria-assessment');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          fria-assessment
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('bias-assessment');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          bias-assessment
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('ai-fairness-360');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          ai-fairness-360
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('hitl-design');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          hitl-design
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-[#0097A7] pl-4 py-2">
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-1">
                      Societal
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-2">
                      {getBlock1Status() === 'Prohibited'
                        ? 'Significant societal harm identified. System engages in practices with unacceptable societal impact.'
                        : getBlock2Status() === 'High-Risk'
                        ? 'System has significant societal impact. Careful consideration of social implications and potential harms required.'
                        : 'Assess potential societal impacts and ensure responsible deployment practices.'}
                    </p>
                    <div className="mt-2">
                      <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] mb-1.5">Recommended Tools:</p>
                      <div className="flex flex-wrap gap-1.5">
                        <button 
                          onClick={() => setSelectedRiskTool('detoxify')}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          detoxify
                        </button>
                        <button 
                          onClick={() => setSelectedRiskTool('hate-speech-detector')}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          hate-speech-detector
                        </button>
                        <button 
                          onClick={() => setSelectedRiskTool('claimbuster-api')}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          claimbuster-api
                        </button>
                        <button 
                          onClick={() => setSelectedRiskTool('fact-checker')}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          fact-checker
                        </button>
                        <button 
                          onClick={() => setSelectedRiskTool('ai-content-detector')}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          ai-content-detector
                        </button>
                        <button 
                          onClick={() => setSelectedRiskTool('perspective-api-societal')}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          perspective-api-societal
                        </button>
                        <button 
                          onClick={() => setSelectedRiskTool('textblob-sentiment')}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          textblob-sentiment
                        </button>
                        <button 
                          onClick={() => setSelectedRiskTool('vader-sentiment')}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          vader-sentiment
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-[#C2185B] pl-4 py-2">
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-1">
                      Fairness & Bias Detection
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-2">
                      {getBlock2Status() === 'High-Risk'
                        ? 'Mandatory bias detection and mitigation required. Training data must be representative and free from discriminatory bias per Article 10.'
                        : 'Monitor for potential bias. Implement measures to ensure fairness and non-discrimination.'}
                    </p>
                    <div className="mt-2">
                      <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] mb-1.5">Recommended Tools:</p>
                      <div className="flex flex-wrap gap-1.5">
                        <button onClick={() => { setActiveTab('Risk Evaluations'); setSelectedRiskTool('ai-fairness-360'); }} className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors">ai-fairness-360</button>
                        <button onClick={() => { setActiveTab('Risk Evaluations'); setSelectedRiskTool('fairlearn'); }} className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors">fairlearn</button>
                        <button onClick={() => { setActiveTab('Risk Evaluations'); setSelectedRiskTool('aequitas'); }} className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors">aequitas</button>
                        <button onClick={() => { setActiveTab('Risk Evaluations'); setSelectedRiskTool('bias-assessment'); }} className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors">bias-assessment</button>
                        <button onClick={() => { setActiveTab('Risk Evaluations'); setSelectedRiskTool('disaggregated-evaluation'); }} className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors">disaggregated-evaluation</button>
                        <button onClick={() => { setActiveTab('Risk Evaluations'); setSelectedRiskTool('perspective-api'); }} className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors">perspective-api</button>
                        <button onClick={() => { setActiveTab('Risk Evaluations'); setSelectedRiskTool('moderate-content-api'); }} className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors">moderate-content-api</button>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-[#388E3C] pl-4 py-2">
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-1">
                      Trust & Explainability
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-2">
                      {getBlock2Status() === 'High-Risk'
                        ? 'Trust-building measures mandatory including transparency, explainability, and human oversight per Articles 13-14.'
                        : 'Transparency obligations may apply. Consider implementing trust-building measures to enhance user confidence.'}
                    </p>
                    <div className="mt-2">
                      <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] mb-1.5">Recommended Tools:</p>
                      <div className="flex flex-wrap gap-1.5">
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('explainability-planning');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          explainability-planning
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('shap-explainer');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          shap-explainer
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('lime');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          lime
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('captum');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          captum
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('interpretml');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          interpretml
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('what-if-tool');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          what-if-tool
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('ai-transparency-labels');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          ai-transparency-labels
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('model-card-generation');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          model-card-generation
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('hitl-design');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          hitl-design
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-[#D32F2F] pl-4 py-2">
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-1">
                      Health and Safety
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-2">
                      {getBlock2Status() === 'High-Risk'
                        ? 'Comprehensive safety measures required including risk management system, testing, and continuous monitoring per Article 9.'
                        : 'General health and safety considerations. Ensure system does not create unreasonable health risks. Implement appropriate safeguards to prevent harm.'}
                    </p>
                    <div className="mt-2">
                      <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] mb-1.5">Recommended Tools:</p>
                      <div className="flex flex-wrap gap-1.5">
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('ai-safety');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          ai-safety
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('ai-safety-planning');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          ai-safety-planning
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('red-team-testing');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          red-team-testing
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('guardrails-implementation');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          guardrails-implementation
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('risk-assessment');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          risk-assessment
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('incident-responder');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          incident-responder
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-[#5E35B1] pl-4 py-2">
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-1">
                      Performance Testing & Monitoring
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-2">
                      {getBlock2Status() === 'High-Risk'
                        ? 'Continuous performance monitoring and testing required per Article 15. Monitor for data drift, model degradation, and accuracy metrics.'
                        : 'Regular performance testing recommended. Monitor model accuracy, data quality, and system reliability.'}
                    </p>
                    <div className="mt-2">
                      <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] mb-1.5">Recommended Tools:</p>
                      <div className="flex flex-wrap gap-1.5">
                        <button onClick={() => setSelectedRiskTool('evidently-ai')} className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors">evidently-ai</button>
                        <button onClick={() => setSelectedRiskTool('alibi-detect')} className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors">alibi-detect</button>
                        <button onClick={() => setSelectedRiskTool('ragas')} className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors">ragas</button>
                        <button onClick={() => setSelectedRiskTool('deepeval')} className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors">deepeval</button>
                        <button onClick={() => setSelectedRiskTool('huggingface-evaluate')} className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors">huggingface-evaluate</button>
                        <button onClick={() => setSelectedRiskTool('langsmith')} className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors">langsmith</button>
                        <button onClick={() => setSelectedRiskTool('weights-and-biases')} className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors">weights-and-biases</button>
                        <button onClick={() => setSelectedRiskTool('promptfoo')} className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors">promptfoo</button>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-[#F57C00] pl-4 py-2">
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-1">
                      Governance & Documentation
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-2">
                      {getBlock2Status() === 'High-Risk'
                        ? 'EU database registration mandatory. Conformity assessment and CE marking required before market placement per Articles 43-51.'
                        : 'Registration requirements may apply. Verify obligations under Article 71 for transparency requirements.'}
                    </p>
                    <div className="mt-2">
                      <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] mb-1.5">Recommended Tools:</p>
                      <div className="flex flex-wrap gap-1.5">
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('ai-ethics');
                          }} 
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          ai-ethics
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('ai-ethics-advisor');
                          }} 
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          ai-ethics-advisor
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('ai-governance');
                          }} 
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          ai-governance
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('ethics-review');
                          }} 
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          ethics-review
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('validating-ai-ethics-and-fairness');
                          }} 
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          validating-ai-ethics-and-fairness
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('ai-logging-system');
                          }} 
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          ai-logging-system
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('ai-system-registry');
                          }} 
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          ai-system-registry
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('qms-tracker');
                          }} 
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          qms-tracker
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('ce-marking-generator');
                          }} 
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          ce-marking-generator
                        </button>

                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-[#2E7D32] pl-4 py-2">
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-1">
                      Environmental
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-2">
                      {getBlock4Status() === 'Applies' && getBlock4RiskEvaluation() === 'Systemic Risk'
                        ? 'Environmental impact assessment recommended for large-scale GPAI models. Consider energy efficiency and carbon footprint.'
                        : 'Consider environmental sustainability. Optimize resource usage and energy efficiency where possible.'}
                    </p>
                    <div className="mt-2">
                      <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#6B7280] mb-1.5">Recommended Tools:</p>
                      <div className="flex flex-wrap gap-1.5">
                        <button onClick={() => {
                          setActiveTab('Risk Evaluations');
                          setSelectedRiskTool('codecarbon');
                        }} className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer">codecarbon</button>
                        <button onClick={() => {
                          setActiveTab('Risk Evaluations');
                          setSelectedRiskTool('cloud-carbon-footprint');
                        }} className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer">cloud-carbon-footprint</button>
                        <button onClick={() => {
                          setActiveTab('Risk Evaluations');
                          setSelectedRiskTool('ml-co2-impact');
                        }} className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer">ml-co2-impact</button>
                        <button onClick={() => {
                          setActiveTab('Risk Evaluations');
                          setSelectedRiskTool('watttime-carbon');
                        }} className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer">watttime-carbon</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4 pb-8">
                <button
                  onClick={() => setActiveTab('Result')}
                  className="px-6 py-2.5 bg-[#ece9fe] border border-[#ddd6fe] text-[#5720B7] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#ddd6fe] transition-colors"
                >
                  Back to Result
                </button>
              </div>
              </>
              ) : selectedRiskTool && getSkillAssessment(selectedRiskTool) ? (
                <SkillAssessment skillId={selectedRiskTool} onBack={() => setSelectedRiskTool(null)} />
              ) : selectedRiskTool && toolDescriptionsMap[selectedRiskTool] ? (
                <>
                  {/* Tool Detail View */}
                  <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
                    <button
                      onClick={() => setSelectedRiskTool(null)}
                      className="flex items-center gap-2 text-[#464E58] hover:text-[#22262A] mb-4 font-['Montserrat',sans-serif] font-medium text-sm transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Risk Evaluations
                    </button>
                    <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-1">
                      {toolDescriptionsMap[selectedRiskTool].category}
                    </h1>
                    <h2 className="font-['Montserrat',sans-serif] font-semibold text-lg text-[#464E58] mb-3">
                      {toolDescriptionsMap[selectedRiskTool].name}
                    </h2>
                    <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58] mb-6">
                      {toolDescriptionsMap[selectedRiskTool].description}
                    </p>
                    
                    {/* Output Text Box */}
                    <div className="space-y-2">
                      <label className="block font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                        Output
                      </label>
                      <textarea
                        className="w-full h-64 px-4 py-3 border border-[#E5E7EB] rounded-lg font-['Montserrat',sans-serif] font-normal text-sm text-[#22262A] placeholder:text-[#B5BCC4] focus:outline-none focus:ring-2 focus:ring-[#F13D30] focus:border-transparent resize-none"
                        placeholder="Analysis results will appear here..."
                      />
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          )}

          {/* Compliance Tab Content */}
          {activeTab === 'Compliance' && !selectedRegulationHub && (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6 flex justify-between items-start">
                <div>
                  <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-2">
                    Digital Regulation Hubs
                  </h1>
                  <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                    EU AI Act Framework and reporting
                  </p>
                </div>
                <button className="px-4 py-2 border-2 border-[#F13D30] text-[#F13D30] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F13D30] hover:text-white transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Export Report
                </button>
              </div>

              {/* Regulation Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* EU AI Act Card */}
                <button
                  onClick={() => setSelectedRegulationHub('eu-ai-act')}
                  className="bg-white rounded-lg border border-[#E5E7EB] hover:border-[#F13D30] shadow-sm p-8 transition-all hover:shadow-md group text-left"
                >
                  <div className="flex items-start justify-between mb-16">
                    <div className="w-16 h-16 rounded-2xl bg-[#003399] flex items-center justify-center">
                      <div className="text-white font-['Montserrat',sans-serif] font-bold text-xs text-center leading-tight">
                        AI ACT
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[#B5BCC4] group-hover:text-[#F13D30] transition-colors" />
                  </div>
                  <h3 className="font-['Montserrat',sans-serif] font-semibold text-lg text-[#22262A]">
                    EU AI Act
                  </h3>
                </button>

                {/* GDPR Card */}
                <button
                  className="bg-white rounded-lg border border-[#E5E7EB] hover:border-[#B5BCC4] shadow-sm p-8 transition-all hover:shadow-md group text-left cursor-not-allowed opacity-60"
                  disabled
                >
                  <div className="flex items-start justify-between mb-16">
                    <div className="w-16 h-16 rounded-2xl bg-[#003399] flex items-center justify-center">
                      <div className="text-white font-['Montserrat',sans-serif] font-bold text-xs text-center">
                        GDPR
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[#B5BCC4]" />
                  </div>
                  <h3 className="font-['Montserrat',sans-serif] font-semibold text-lg text-[#22262A]">
                    GDPR
                  </h3>
                </button>

                {/* DSA Digital Services Act Card */}
                <button
                  className="bg-white rounded-lg border border-[#E5E7EB] hover:border-[#B5BCC4] shadow-sm p-8 transition-all hover:shadow-md group text-left cursor-not-allowed opacity-60"
                  disabled
                >
                  <div className="flex items-start justify-between mb-16">
                    <div className="w-16 h-16 rounded-full bg-[#1976D2] flex items-center justify-center">
                      <div className="text-white font-['Montserrat',sans-serif] font-bold text-xl">
                        GRI
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[#B5BCC4]" />
                  </div>
                  <h3 className="font-['Montserrat',sans-serif] font-semibold text-lg text-[#22262A]">
                    DSA Digital Services Act
                  </h3>
                </button>

                {/* Data Act Card */}
                <button
                  className="bg-white rounded-lg border border-[#E5E7EB] hover:border-[#B5BCC4] shadow-sm p-8 transition-all hover:shadow-md group text-left cursor-not-allowed opacity-60"
                  disabled
                >
                  <div className="flex items-start justify-between mb-16">
                    <div className="w-16 h-16 rounded-lg bg-[#003399] flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-[#003399] relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="flex items-center justify-center">
                            {/* EU stars circle pattern */}
                            <div className="text-[#FFDD00] text-xs">★★★</div>
                          </div>
                        </div>
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-white font-['Montserrat',sans-serif] font-bold text-[8px] whitespace-nowrap">
                          Data Act
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[#B5BCC4]" />
                  </div>
                  <h3 className="font-['Montserrat',sans-serif] font-semibold text-lg text-[#22262A]">
                    Data Act
                  </h3>
                </button>
              </div>

              {/* Back Button */}
              <div className="flex justify-between pt-4 pb-8">
                <button
                  onClick={() => setActiveTab('Risk Evaluations')}
                  className="px-6 py-2.5 bg-white border border-[#B5BCC4] text-[#464E58] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#F0F1F2] transition-colors"
                >
                  Back to Risk Evaluations
                </button>
              </div>
            </div>
          )}

          {/* Risk Evaluation V2 Tab Content */}
          {activeTab === 'Risk Evaluation V2' && (
            <RiskEvaluationV2 />
          )}

          {/* EU AI Act Compliance Detail View */}
          {activeTab === 'Compliance' && selectedRegulationHub === 'eu-ai-act' && !showFRIAQuestionnaire && (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
                <button
                  onClick={() => setSelectedRegulationHub(null)}
                  className="flex items-center gap-2 text-[#464E58] hover:text-[#22262A] mb-4 font-['Montserrat',sans-serif] font-medium text-sm transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Digital Regulation Hubs
                </button>
                <h1 className="font-['Montserrat',sans-serif] font-bold text-2xl text-[#22262A] mb-2">
                  Compliance Requirements
                </h1>
                <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                  Obligations and requirements based on your AI system classification
                </p>
              </div>

              {/* Compliance Subcategories */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
                <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">
                  Compliance Subcategories
                </h2>
                <div className="space-y-3">
                  <div className="border-l-4 border-[#F13D30] bg-white rounded-lg p-4">
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                      1. Risk Management (Article 9)
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#464E58] mb-2">
                      <span className="font-semibold">Status:</span> Mandatory for all high-risk systems.
                    </p>
                    <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#22262A] mb-1">
                      Compulsory Skills:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <button 
                        onClick={() => {
                          setActiveTab('Risk Evaluations');
                          setSelectedRiskTool('risk-assessment');
                        }}
                        className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                      >
                        risk-assessment
                      </button>
                      <button 
                        onClick={() => {
                          setActiveTab('Risk Evaluations');
                          setSelectedRiskTool('ai-safety');
                        }}
                        className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                      >
                        ai-safety
                      </button>
                      <button 
                        onClick={() => {
                          setActiveTab('Risk Evaluations');
                          setSelectedRiskTool('incident-responder');
                        }}
                        className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                      >
                        incident-responder
                      </button>
                    </div>
                  </div>

                  <div className="border-l-4 border-[#E65100] bg-white rounded-lg p-4">
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                      2. Data Governance & Bias (Article 10)
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#464E58] mb-2">
                      <span className="font-semibold">Status:</span> Mandatory. Data must be relevant, representative, and free of errors. Bias testing is required.
                    </p>
                    <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#22262A] mb-1">
                      Compulsory Skills:
                    </p>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        <button 
                          onClick={() => {
                            setActiveTab('Risk Evaluations');
                            setSelectedRiskTool('data-classification');
                          }}
                          className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                        >
                          data-classification
                        </button>
                      </div>
                      <div>
                        <p className="text-xs font-['Montserrat',sans-serif] text-[#464E58] mb-1">One of the Fairness/Bias tools is required:</p>
                        <div className="flex flex-wrap gap-1.5 ml-4">
                          <button 
                            onClick={() => {
                              setActiveTab('Risk Evaluations');
                              setSelectedRiskTool('bias-assessment');
                            }}
                            className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                          >
                            bias-assessment
                          </button>
                          <button 
                            onClick={() => {
                              setActiveTab('Risk Evaluations');
                              setSelectedRiskTool('ai-fairness-360');
                            }}
                            className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                          >
                            ai-fairness-360
                          </button>
                          <button 
                            onClick={() => {
                              setActiveTab('Risk Evaluations');
                              setSelectedRiskTool('fairlearn');
                            }}
                            className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                          >
                            fairlearn
                          </button>
                          <button 
                            onClick={() => {
                              setActiveTab('Risk Evaluations');
                              setSelectedRiskTool('aequitas');
                            }}
                            className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                          >
                            aequitas
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-[#FB8C00] bg-white rounded-lg p-4">
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                      3. Technical Documentation (Article 11)
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#464E58] mb-2">
                      <span className="font-semibold">Status:</span> Mandatory. Must be maintained and kept up-to-date.
                    </p>
                    <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#22262A] mb-1">
                      Compulsory Skills:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <button 
                        onClick={() => {
                          setActiveTab('Risk Evaluations');
                          setSelectedRiskTool('model-card-generation');
                        }}
                        className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                      >
                        model-card-generation
                      </button>
                      <button 
                        onClick={() => {
                          setActiveTab('Risk Evaluations');
                          setSelectedRiskTool('model-cards-generator');
                        }}
                        className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                      >
                        model-cards-generator
                      </button>
                    </div>
                  </div>

                  <div className="border-l-4 border-[#1976D2] bg-white rounded-lg p-4">
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                      4. Record-Keeping (Article 12)
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#464E58] mb-2">
                      <span className="font-semibold">Status:</span> Mandatory. Systems must automatically log events (traceability).
                    </p>
                    <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#22262A] mb-1">
                      Compulsory Skill:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <button 
                        onClick={() => {
                          setActiveTab('Risk Evaluations');
                          setSelectedRiskTool('ai-logging-system');
                        }}
                        className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                      >
                        ai-logging-system
                      </button>
                    </div>
                  </div>

                  <div className="border-l-4 border-[#7B1FA2] bg-white rounded-lg p-4">
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                      5. Transparency & Users (Article 13)
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#464E58] mb-2">
                      <span className="font-semibold">Status:</span> Mandatory. Users must be able to interpret outputs and understand limitations.
                    </p>
                    <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#22262A] mb-1">
                      Compulsory Skills:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <button 
                        onClick={() => {
                          setActiveTab('Risk Evaluations');
                          setSelectedRiskTool('ai-transparency-labels');
                        }}
                        className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                      >
                        ai-transparency-labels
                      </button>
                      <button 
                        onClick={() => {
                          setActiveTab('Risk Evaluations');
                          setSelectedRiskTool('explainability-planning');
                        }}
                        className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                      >
                        explainability-planning
                      </button>
                    </div>
                  </div>

                  <div className="border-l-4 border-[#0097A7] bg-white rounded-lg p-4">
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                      6. Human Oversight (Article 14)
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#464E58] mb-2">
                      <span className="font-semibold">Status:</span> Mandatory. Systems must be designed for human oversight (Human-in-the-Loop).
                    </p>
                    <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#22262A] mb-1">
                      Compulsory Skill:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <button 
                        onClick={() => {
                          setActiveTab('Risk Evaluations');
                          setSelectedRiskTool('hitl-design');
                        }}
                        className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                      >
                        hitl-design
                      </button>
                    </div>
                  </div>

                  <div className="border-l-4 border-[#388E3C] bg-white rounded-lg p-4">
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                      7. Accuracy, Robustness & Cybersecurity (Article 15)
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#464E58] mb-2">
                      <span className="font-semibold">Status:</span> Mandatory. Systems must be resilient to errors and attacks.
                    </p>
                    <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#22262A] mb-1">
                      Compulsory Skills:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <button 
                        onClick={() => {
                          setActiveTab('Risk Evaluations');
                          setSelectedRiskTool('conformance-calibration');
                        }}
                        className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                      >
                        conformance-calibration
                      </button>
                      <button 
                        onClick={() => {
                          setActiveTab('Risk Evaluations');
                          setSelectedRiskTool('security-frameworks');
                        }}
                        className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                      >
                        security-frameworks
                      </button>
                      <button 
                        onClick={() => {
                          setActiveTab('Risk Evaluations');
                          setSelectedRiskTool('prompt-injection-detector');
                        }}
                        className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                      >
                        prompt-injection-detector
                      </button>
                    </div>
                  </div>

                  <div className="border-l-4 border-[#D32F2F] bg-white rounded-lg p-4">
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                      8. Registration & Conformity (Articles 43 & 49)
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#464E58] mb-2">
                      <span className="font-semibold">Status:</span> Mandatory before market placement.
                    </p>
                    <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#22262A] mb-1">
                      Compulsory Skills:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <button 
                        onClick={() => {
                          setActiveTab('Risk Evaluations');
                          setSelectedRiskTool('ce-marking-generator');
                        }}
                        className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                      >
                        ce-marking-generator
                      </button>
                      <button 
                        onClick={() => {
                          setActiveTab('Risk Evaluations');
                          setSelectedRiskTool('ai-system-registry');
                        }}
                        className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                      >
                        ai-system-registry
                      </button>
                      <button 
                        onClick={() => {
                          setActiveTab('Risk Evaluations');
                          setSelectedRiskTool('qms-tracker');
                        }}
                        className="inline-flex px-2 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                      >
                        qms-tracker
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowFRIAQuestionnaire(true)}
                    className="w-full border-l-4 border-[#5E35B1] bg-white rounded-lg p-4 text-left hover:shadow-md transition-all cursor-pointer"
                  >
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-2">
                      9. Fundamental Rights (Article 27)
                    </h3>
                    <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#464E58] mb-2">
                      <span className="font-semibold">Status:</span> Mandatory for specific high-risk categories (e.g., biometrics, essential services).
                    </p>
                    <p className="font-['Montserrat',sans-serif] font-semibold text-xs text-[#22262A] mb-1">
                      Compulsory Skill:
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 font-['Montserrat',sans-serif] font-normal text-xs text-[#464E58]">
                      <li>fria-assessment (Fundamental Rights Impact Assessment)</li>
                    </ul>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab('Risk Evaluations');
                        setSelectedRiskTool('fria-assessment');
                      }}
                      className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-xs font-['Montserrat',sans-serif] font-medium text-[#464E58] hover:bg-[#F13D30] hover:text-white hover:border-[#F13D30] transition-colors cursor-pointer"
                    >
                      <span>Complete FRIA Questionnaire</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </button>
                </div>
              </div>

              {/* Recommended Actions */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
                <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">
                  Recommended Next Steps
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-[#F9FAFB] rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F13D30] text-white flex items-center justify-center font-['Montserrat',sans-serif] font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-1">
                        Document Your Compliance Approach
                      </h3>
                      <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                        Create a compliance roadmap detailing how you will address each applicable requirement
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-[#F9FAFB] rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F13D30] text-white flex items-center justify-center font-['Montserrat',sans-serif] font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-1">
                        Establish Governance Framework
                      </h3>
                      <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                        Define roles, responsibilities, and processes for ongoing compliance management
                      </p>
                    </div>
                  </div>

                  {getBlock2Status() === 'High-Risk' && (
                    <div className="flex items-start gap-3 p-4 bg-[#F9FAFB] rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F13D30] text-white flex items-center justify-center font-['Montserrat',sans-serif] font-bold text-sm">
                        3
                      </div>
                      <div className="flex-1">
                        <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-1">
                          Engage Notified Body for Conformity Assessment
                        </h3>
                        <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                          Contact an authorized notified body to begin conformity assessment procedures
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3 p-4 bg-[#F9FAFB] rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F13D30] text-white flex items-center justify-center font-['Montserrat',sans-serif] font-bold text-sm">
                      {getBlock2Status() === 'High-Risk' ? '4' : '3'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A] mb-1">
                        Implement Continuous Monitoring
                      </h3>
                      <p className="font-['Montserrat',sans-serif] font-normal text-sm text-[#464E58]">
                        Set up systems to monitor compliance status and regulatory changes on an ongoing basis
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documentation Resources */}
              <div className="bg-white rounded-lg border border-[#F0F1F2] shadow-sm p-6">
                <h2 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#22262A] mb-4">
                  Key Documentation Requirements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-[#E5E7EB] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-[#F13D30]" />
                      <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                        Technical Documentation
                      </h3>
                    </div>
                    <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#464E58]">
                      Detailed technical specifications, architecture, and design documentation
                    </p>
                  </div>

                  {getBlock2Status() === 'High-Risk' && (
                    <>
                      <div className="border border-[#E5E7EB] rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-5 h-5 text-[#F13D30]" />
                          <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                            Risk Management
                          </h3>
                        </div>
                        <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#464E58]">
                          Risk assessment methodology, identified risks, and mitigation strategies
                        </p>
                      </div>

                      <div className="border border-[#E5E7EB] rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-5 h-5 text-[#F13D30]" />
                          <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                            Data Governance
                          </h3>
                        </div>
                        <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#464E58]">
                          Data sources, quality measures, and governance procedures
                        </p>
                      </div>

                      <div className="border border-[#E5E7EB] rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-5 h-5 text-[#F13D30]" />
                          <h3 className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#22262A]">
                            Instructions for Use
                          </h3>
                        </div>
                        <p className="font-['Montserrat',sans-serif] font-normal text-xs text-[#464E58]">
                          User-facing documentation explaining system capabilities and limitations
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4 pb-8">
                <button
                  onClick={() => setSelectedRegulationHub(null)}
                  className="px-6 py-2.5 bg-[#ece9fe] border border-[#ddd6fe] text-[#5720B7] rounded-lg font-['Montserrat',sans-serif] font-semibold text-sm hover:bg-[#ddd6fe] transition-colors"
                >
                  Back to Digital Regulation Hubs
                </button>
              </div>
            </div>
          )}

          {/* FRIA Questionnaire View */}
          {activeTab === 'Compliance' && selectedRegulationHub === 'eu-ai-act' && showFRIAQuestionnaire && (
            <FRIAQuestionnaire onBack={() => setShowFRIAQuestionnaire(false)} />
          )}
        </div>
      </div>
      )}
    </div>
  );
}