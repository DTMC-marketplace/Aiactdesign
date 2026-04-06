import { createContext, useContext } from 'react';

export interface AISystemContextType {
  // ── Navigation ─────────────────────────────────────────────────────────────
  onBack: () => void;
  activeTab: 'Profile' | 'Assessment' | 'Result' | 'Risk Evaluations' | 'Compliance';
  setActiveTab: (t: 'Profile' | 'Assessment' | 'Result' | 'Risk Evaluations' | 'Compliance') => void;
  orgDefaultRole: string;

  // ── Section 2 – System Identity ────────────────────────────────────────────
  aiSystemName: string; setAiSystemName: (v: string) => void;
  internalSystemId: string; setInternalSystemId: (v: string) => void;
  commercialName: string; setCommercialName: (v: string) => void;
  ownerName: string; setOwnerName: (v: string) => void;
  ownerEmail: string; setOwnerEmail: (v: string) => void;
  ownerDepartment: string; setOwnerDepartment: (v: string) => void;
  sameAsComplianceOwner: boolean; setSameAsComplianceOwner: (v: boolean) => void;
  systemStatus: string; setSystemStatus: (v: any) => void;
  goLiveDate: string; setGoLiveDate: (v: string) => void;
  isPartOfBroaderProduct: string; setIsPartOfBroaderProduct: (v: any) => void;
  productServiceName: string; setProductServiceName: (v: string) => void;

  // ── Section 3 – Source & Operator Role ────────────────────────────────────
  defaultRoleApplies: string; setDefaultRoleApplies: (v: any) => void;
  selectedRoles: string[]; setSelectedRoles: (v: string[]) => void;
  systemSource: string; setSystemSource: (v: any) => void;
  vendorName: string; setVendorName: (v: string) => void;
  vendorEvidenceLink: string; setVendorEvidenceLink: (v: string) => void;
  vendorEvidenceSavedLink: string; setVendorEvidenceSavedLink: (v: string) => void;
  modifyCustomize: string; setModifyCustomize: (v: any) => void;
  euEeaRelevance: string; setEuEeaRelevance: (v: any) => void;
  euEeaOutputsAffect: string; setEuEeaOutputsAffect: (v: any) => void;

  // ── Section 4 – Intended Purpose ──────────────────────────────────────────
  intendedPurpose: string; setIntendedPurpose: (v: string) => void;
  sectorDomains: string[]; setSectorDomains: (v: string[]) => void;
  otherSectorDomain: string; setOtherSectorDomain: (v: string) => void;
  safetyComponent: string; setSafetyComponent: (v: any) => void;
  thirdPartyConformity: string; setThirdPartyConformity: (v: any) => void;

  // ── Section 5 – Deployment & Stakeholders ─────────────────────────────────
  deploymentContext: string; setDeploymentContext: (v: string) => void;
  deploymentContextOther: string; setDeploymentContextOther: (v: string) => void;
  systemUsers: string[]; setSystemUsers: (v: string[]) => void;
  systemUsersOther: string; setSystemUsersOther: (v: string) => void;
  affectedPersons: string[]; setAffectedPersons: (v: string[]) => void;
  affectedPersonsOther: string; setAffectedPersonsOther: (v: string) => void;
  vulnerablePersons: string[]; setVulnerablePersons: (v: string[]) => void;

  // ── Section 6 – Workflow, Outputs & Decision Impact ───────────────────────
  workflowRole: string; setWorkflowRole: (v: string) => void;
  outputTypes: string[]; setOutputTypes: (v: string[]) => void;
  outputTypesOther: string; setOutputTypesOther: (v: string) => void;
  decisionsAboutIndividuals: string; setDecisionsAboutIndividuals: (v: any) => void;
  automaticActions: string; setAutomaticActions: (v: string) => void;

  // ── Section 7 – Capabilities ──────────────────────────────────────────────
  capabilities: string[]; setCapabilities: (v: string[]) => void;
  interactWithPersons: string; setInteractWithPersons: (v: any) => void;
  syntheticContent: string[]; setSyntheticContent: (v: string[]) => void;

  // ── Section 8 – Technical Profile ─────────────────────────────────────────
  aiKind: string; setAiKind: (v: string) => void;
  gpaiIntegration: string; setGpaiIntegration: (v: any) => void;
  gpaiProvider: string; setGpaiProvider: (v: string) => void;
  trainingSource: string; setTrainingSource: (v: string) => void;
  modelUpdateFrequency: string; setModelUpdateFrequency: (v: string) => void;
  linkedDatasetIds: string[]; setLinkedDatasetIds: (v: string[]) => void;
  dataTypes: string[]; setDataTypes: (v: string[]) => void;
  dpiaStatus: string; setDpiaStatus: (v: any) => void;
  linkedComponentIds: string[]; setLinkedComponentIds: (v: string[]) => void;

  // ── Assessment – Block 1: Prohibited Practices ────────────────────────────
  prohibitedConfirmed: boolean; setProhibitedConfirmed: (v: boolean) => void;
  aiDetectedProhibited: boolean; setAiDetectedProhibited: (v: boolean) => void;
  aiDetectionReason: string; setAiDetectionReason: (v: string) => void;
  aiDetectionEvidence: string; setAiDetectionEvidence: (v: string) => void;
  aiDetectionLegalBasis: string; setAiDetectionLegalBasis: (v: string) => void;
  claimingException: string; setClaimingException: (v: any) => void;
  exceptionChecklist: { [key: string]: boolean }; setExceptionChecklist: (v: any) => void;
  exceptionEvidence: string; setExceptionEvidence: (v: string) => void;
  exceptionEvidenceLink: string; setExceptionEvidenceLink: (v: string) => void;
  exceptionEvidenceSavedLink: string; setExceptionEvidenceSavedLink: (v: string) => void;
  exceptionClaimConfirmed: boolean; setExceptionClaimConfirmed: (v: boolean) => void;
  exceptionQualifies: string; setExceptionQualifies: (v: any) => void;
  exceptionEvidenceUploaded: boolean; setExceptionEvidenceUploaded: (v: boolean) => void;
  noExceptionConfirmed: boolean; setNoExceptionConfirmed: (v: boolean) => void;

  // ── Assessment – Block 2: High-Risk ───────────────────────────────────────
  highRiskConfirmed: boolean; setHighRiskConfirmed: (v: boolean) => void;
  materialInfluence: string; setMaterialInfluence: (v: any) => void;
  narrowTasks: string[]; setNarrowTasks: (v: string[]) => void;
  profiling: string; setProfiling: (v: any) => void;
  highRiskEvidence: string; setHighRiskEvidence: (v: string) => void;
  highRiskEvidenceLink: string; setHighRiskEvidenceLink: (v: string) => void;
  highRiskEvidenceSavedLink: string; setHighRiskEvidenceSavedLink: (v: string) => void;
  highRiskEvidenceConfirmed: boolean; setHighRiskEvidenceConfirmed: (v: boolean) => void;
  minimalRiskEvidence: string; setMinimalRiskEvidence: (v: string) => void;
  minimalRiskEvidenceLink: string; setMinimalRiskEvidenceLink: (v: string) => void;
  minimalRiskEvidenceSavedLink: string; setMinimalRiskEvidenceSavedLink: (v: string) => void;
  minimalRiskEvidenceConfirmed: boolean; setMinimalRiskEvidenceConfirmed: (v: boolean) => void;

  // ── Assessment – Block 3: Transparency ────────────────────────────────────
  transparencyConfirmed: boolean; setTransparencyConfirmed: (v: boolean) => void;
  transparencyExceptionOptions: string[]; setTransparencyExceptionOptions: (v: string[]) => void;
  transparencyEvidence: string; setTransparencyEvidence: (v: string) => void;
  transparencyEvidenceLink: string; setTransparencyEvidenceLink: (v: string) => void;
  transparencyEvidenceSavedLink: string; setTransparencyEvidenceSavedLink: (v: string) => void;
  transparencyEvidenceConfirmed: boolean; setTransparencyEvidenceConfirmed: (v: boolean) => void;

  // ── Assessment – Block 4: GPAI ────────────────────────────────────────────
  gpaiApplicable: string; setGpaiApplicable: (v: any) => void;
  gpaiSystemicRisk: string; setGpaiSystemicRisk: (v: any) => void;
  gpaiConfirmed: boolean; setGpaiConfirmed: (v: boolean) => void;
  gpaiProviderAnswer: string; setGpaiProviderAnswer: (v: any) => void;

  // ── Assessment – Block collapse states ────────────────────────────────────
  block1Collapsed: boolean; setBlock1Collapsed: (v: boolean) => void;
  block2Collapsed: boolean; setBlock2Collapsed: (v: boolean) => void;
  block3Collapsed: boolean; setBlock3Collapsed: (v: boolean) => void;
  block4Collapsed: boolean; setBlock4Collapsed: (v: boolean) => void;

  // ── Risk / Compliance sub-navigation ──────────────────────────────────────
  selectedRiskTool: string | null; setSelectedRiskTool: (v: string | null) => void;
  selectedRegulationHub: string | null; setSelectedRegulationHub: (v: string | null) => void;
  showFRIAQuestionnaire: boolean; setShowFRIAQuestionnaire: (v: boolean) => void;
  selectedSkill: string | null; setSelectedSkill: (v: string | null) => void;

  // ── Computed helpers ──────────────────────────────────────────────────────
  getProhibitedStatus: () => string;
  isBlock1Prohibited: () => boolean;
  getHighRiskStatus: () => string;
  getTransparencyTriggers: () => string[];
  hasTransparencyUnknowns: () => boolean;
  getTransparencyTriggerReasons: () => string[];
  getTransparencyExceptionOptionsByCaseGroup: () => Record<string, { label: string; options: string[] }>;
  hasExceptionForAllCases: () => boolean;
  hasNoExceptionClaimed: () => boolean;
  getBlock3Status: () => string;
  getBlock4Status: () => string;
  getBlock4RiskEvaluation: () => string;
  getBlock1Status: () => string;
  getBlock2Status: () => string;
  isCondition1Met: () => boolean;
  isCondition2Met: () => boolean;
  getHighRiskTrigger: () => string;
  getAnnexIIIResult: () => string;
  getSelectedProhibitedPractices: () => string[];

  // ── Action handlers ────────────────────────────────────────────────────────
  handleRoleToggle: (role: string) => void;
  handleSameAsComplianceOwner: (checked: boolean) => void;
  handleDefaultRoleApplies: (value: 'Yes' | 'No') => void;
  handleSaveSection1: () => void;
  handleSaveSection2: () => void;
  saveVendorLink: () => void;
  saveExceptionEvidenceLink: () => void;
  saveHighRiskEvidenceLink: () => void;
  saveMinimalRiskEvidenceLink: () => void;
  saveTransparencyEvidenceLink: () => void;
  isSection1Link: (link: string) => boolean;
}

export const AISystemDataCollectionContext = createContext<AISystemContextType>(null as any);
export const useAISystemCtx = () => useContext(AISystemDataCollectionContext);