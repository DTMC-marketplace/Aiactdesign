# Technical Specification: Application State Structure
## AI Governance & Compliance Management Platform

**Version:** 1.0  
**Date:** January 2025  
**Status:** Draft - Based on Actual Frontend Implementation

---

## 1. AI System Data Structure

Based on `AIInventoryPage.tsx` (lines 11-21):

```typescript
interface AISystem {
  id: string;
  name: string;
  owner: string;
  status: 'Planned' | 'Testing' | 'In production' | 'Retired';
  role: 'Provider' | 'Deployer' | 'Distributor' | 'Importer';
  riskClassification: 'Prohibited' | 'High-risk' | 'Minimal' | 'Not assessed' | 'Not in scope';
  complianceStatus: 'Not started' | 'In progress' | 'Compliant' | 'Non-compliant' | 'Not in scope';
  lastUpdated: string;
  providerType: 'In-house' | 'External' | 'Mixed' | 'Unknown';
}
```

---

## 2. AI System Profile State (Data Collection Form)

Based on `AISystemDataCollection.tsx` (lines 350-415):

### Section 1: Document Upload
```typescript
interface DocumentUpload {
  id: string;
  name: string;
  uploadTime: string;
  selected: boolean;
}

// State: uploadedFiles: DocumentUpload[]
```

### Section 2: Basic Information
```typescript
interface BasicInformation {
  systemName: string;
  systemDescription: string;
  systemPurpose: string;
}

// State variables (lines 350-354):
// - systemName: string
// - systemDescription: string
// - systemPurpose: string
```

### Section 3: Sector & Domain
```typescript
interface SectorDomain {
  sectorCategories: string[];  // Multi-select
}

// State: sectorCategories: string[]
```

### Section 4: Capabilities (Prohibited Practices Trigger)
```typescript
interface Capabilities {
  capabilities: string[];  // Multi-select checkboxes
}

// State: capabilities: string[] (line 404)
// Possible values:
// - 'Biometric identification and categorisation'
// - 'Emotion recognition in the workplace or in education settings'
// - 'Biometric categorisation that infers or predicts sensitive traits...'
// - 'Social scoring'
// - 'Manipulation through subliminal techniques'
// - 'Exploitation of vulnerabilities of specific groups'
// - 'Predictive policing based on profiling or personality traits'
// - 'None of the above'
```

### Section 5: Deployment Context
```typescript
interface DeploymentContext {
  deploymentContext: 'Fully internal (employees/contractors only)' | 'General public / consumer-facing' | 'Business-to-business (B2B)' | 'Mixed' | 'Unknown' | '';
  geographicScope: string[];  // Multi-select
  affectedPersons: string[];  // Multi-select
}

// State variables (lines 356-358):
// - deploymentContext: string
// - geographicScope: string[]
// - affectedPersons: string[]
```

### Section 6: EU AI Act Role
```typescript
interface EUAIActRole {
  euRole: 'Provider' | 'Deployer' | 'Distributor' | 'Importer' | 'Unsure' | '';
}

// State: euRole: string (line 359)
```

### Section 7: Interaction & Content Generation
```typescript
interface InteractionContent {
  capabilities: string[];  // Already captured in Section 4
  interactWithPersons: 'Yes' | 'No' | 'Unknown' | '';
  syntheticContent: string[];  // Multi-select
}

// State variables (lines 405-406):
// - interactWithPersons: 'Yes' | 'No' | 'Unknown' | ''
// - syntheticContent: string[]
// Possible syntheticContent values:
// - 'Yes, AI-generated content (text, images, audio, video, code)'
// - 'Yes, AI-manipulated content (deepfake, edited media)'
// - 'Both'
// - 'No'
```

### Section 8: Safety Component & Vendor
```typescript
interface SafetyVendor {
  isSafetyComponent: 'Yes' | 'No' | 'Unknown' | '';
  thirdPartyConformity: 'Yes' | 'No' | 'Unknown' | '';
  vendorName: string;
  vendorEvidence: string;
  vendorEvidenceLink: string;
  vendorEvidenceSavedLink: string;
  vendorEvidenceConfirmed: boolean;
  automaticActions: string;  // Text area
}

// State variables (lines 360-368):
// - isSafetyComponent
// - thirdPartyConformity
// - vendorName
// - vendorEvidence
// - vendorEvidenceLink
// - vendorEvidenceSavedLink
// - vendorEvidenceConfirmed
// - automaticActions
```

### Section 9: Technical Profile (Model & Data)
```typescript
interface TechnicalProfile {
  aiKind: string;
  gpaiIntegration: 'Yes' | 'No' | 'Unknown' | '';
  gpaiProvider: string;
  trainingSource: string;
  modelUpdateFrequency: string;
  dataTypes: string[];  // Multi-select
}

// State variables (lines 409-414):
// - aiKind
// - gpaiIntegration
// - gpaiProvider
// - trainingSource
// - modelUpdateFrequency
// - dataTypes: string[]
```

---

## 3. Assessment State Structure

### Block 1: Prohibited Practices
```typescript
interface ProhibitedPracticesAssessment {
  // Status determination
  status: 'PASS' | 'Triggered' | 'Need Review';  // Computed from getProhibitedStatus()
  
  // User confirmation
  prohibitedConfirmed: boolean;  // Line 420
  
  // AI detection (optional trigger)
  aiDetectedProhibited: boolean;  // Line 421
  aiDetectionReason: string;  // Line 422
  aiDetectionEvidence: string;  // Line 423
  aiDetectionLegalBasis: string;  // Line 424, default: 'Article 5(1)(a)'
  
  // Exception claim workflow
  claimingException: 'Yes' | 'No' | '';  // Line 425
  exceptionChecklist: {[key: string]: boolean};  // Line 426
  exceptionEvidence: string;  // Line 427
  exceptionEvidenceLink: string;  // Line 428
  exceptionEvidenceSavedLink: string;  // Line 429
  exceptionClaimConfirmed: boolean;  // Line 430
}

// Logic (lines 520-535):
// - If capabilities includes 'None of the above' OR empty → PASS
// - If capabilities has prohibited items → Triggered
// - If AI detected prohibited → Need Review
```

### Block 2: High-Risk Classification
```typescript
interface HighRiskAssessment {
  // User confirmation
  highRiskConfirmed: boolean;  // Line 433
  
  // Annex III Exemption Test (for both conditions triggered)
  materialInfluence: 'Yes' | 'No' | 'Not sure' | '';  // Line 436
  narrowTasks: string[];  // Line 437
  profiling: 'Yes' | 'No' | 'Unknown' | '';  // Line 438
  
  // Evidence collection
  highRiskEvidence: string;  // Line 441
  highRiskEvidenceLink: string;  // Line 442
  highRiskEvidenceSavedLink: string;  // Line 443
  highRiskEvidenceConfirmed: boolean;  // Line 444
  
  // Minimal-risk evidence (if exemption test passes)
  minimalRiskEvidence: string;  // Line 447
  minimalRiskEvidenceLink: string;  // Line 448
  minimalRiskEvidenceSavedLink: string;  // Line 449
  minimalRiskEvidenceConfirmed: boolean;  // Line 450
  
  // Computed status
  status: 'De-activated' | 'High-risk' | 'Minimal-risk' | 'Needs review';  // From getHighRiskStatus()
}

// Trigger Logic (from earlier context):
// Condition 1: isSafetyComponent === 'Yes' AND thirdPartyConformity === 'Yes'
// Condition 2: sectorCategories includes Annex III sector
// Status Logic (lines 484-517):
// - If Block 1 is Prohibited → De-activated
// - If no conditions → Minimal-risk
// - If condition 1 only → High-risk
// - If condition 2 or both → Check Annex III exemption test
```

### Block 3: Transparency Obligation
```typescript
interface TransparencyAssessment {
  // User confirmation
  transparencyConfirmed: boolean;  // Line 453
  
  // Exception options (grouped by case)
  transparencyExceptionOptions: string[];  // Line 454
  
  // Evidence collection
  transparencyEvidence: string;  // Line 455
  transparencyEvidenceLink: string;  // Line 456
  transparencyEvidenceSavedLink: string;  // Line 457
  transparencyEvidenceConfirmed: boolean;  // Line 458
  
  // Computed triggers and status
  triggers: string[];  // From getTransparencyTriggers()
  status: 'De-activated' | 'Applies' | 'Not Applicable' | 'Needs Review' | 'Pending';
}

// Trigger Logic (lines 567-601):
// Case 1: capabilities includes 'Biometric identification and categorisation'
// Case 2: capabilities includes 'Emotion recognition...'
// Case 3: capabilities includes 'Biometric categorisation...'
// Case 4: interactWithPersons === 'Yes'
// Case 5: syntheticContent is not empty AND not 'No'
// Case 6: affectedPersons includes 'Citizens / residents' OR deploymentContext === 'General public / consumer-facing'
```

### Block 4: GPAI Applicability
```typescript
interface GPAIAssessment {
  // User confirmation
  gpaiConfirmed: boolean;  // Line 463
  
  // Provider determination
  gpaiProviderAnswer: 'Yes' | 'No' | 'Not sure' | '';  // Line 464
  
  // Additional questions
  gpaiApplicable: 'Yes' | 'No' | '';  // Line 461
  gpaiSystemicRisk: 'Yes' | 'No' | 'Unknown' | '';  // Line 462
  
  // Computed status
  status: 'De-activated' | 'Applies' | 'Not Applicable' | 'Needs Review' | 'Pending';
}

// Trigger Logic:
// - If gpaiIntegration === 'Yes' from Section 9 → Triggered
// - If Block 1 is Prohibited → De-activated
```

---

## 4. Tab Navigation State

```typescript
interface TabState {
  activeTab: 'Profile' | 'Assessment' | 'Result';  // Line 417
}
```

---

## 5. Collapsible Block States

```typescript
interface CollapsibleStates {
  block1Collapsed: boolean;  // Line 467
  block2Collapsed: boolean;  // Line 468
  block3Collapsed: boolean;  // Line 469
  block4Collapsed: boolean;  // Line 470
}
```

---

## 6. Organization Context

```typescript
interface OrganizationContext {
  orgDefaultRole: 'Provider' | 'Deployer' | 'Distributor' | 'Importer';  // Line 473
}
```

---

## 7. Complete State Summary

### Profile Tab (9 Sections)
1. ✅ Document Upload
2. ✅ Basic Information
3. ✅ Sector & Domain
4. ✅ Capabilities
5. ✅ Deployment Context
6. ✅ EU AI Act Role
7. ✅ Interaction & Content Generation
8. ✅ Safety Component & Vendor
9. ✅ Technical Profile (Model & Data)

### Assessment Tab (4 Blocks)
1. ✅ Block 1: Prohibited Practices
2. ✅ Block 2: High-Risk Classification
3. ✅ Block 3: Transparency Obligation
4. ✅ Block 4: GPAI Applicability

### Result Tab
(To be documented based on actual implementation)

---

## Next Steps

1. ✅ **State Structure** - COMPLETED (this document)
2. ⏳ **Logic Flow Diagrams** - Next to document
3. ⏳ **Validation Rules** - To be extracted
4. ⏳ **API Integration Points** - To be designed

---

**Questions for Clarification:**

1. Should we add more fields to the AISystem interface for tracking assessment completion?
2. Are there any missing profile sections I haven't captured?
3. Do you want me to document the Organization page state structure as well?

