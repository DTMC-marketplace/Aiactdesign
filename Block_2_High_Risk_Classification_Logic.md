# Block 2: High-Risk Classification - Logic Documentation

## Overview
**Purpose**: Determines if the AI system is classified as high-risk under EU AI Act Annex III.

**Location**: AI Inventory > AI System Data Collection > Assessment Tab > Block 2

---

## Input Data Sources

### Primary Inputs (from Profile Tab)

**Section 4, Question 2**: "Sector Domains"
- State variable: `sectorDomains` (string array)
- Options include:
  - Employment, workers management, and access to self-employment
  - Education and vocational training
  - Essential private services and essential public services
  - Law enforcement
  - Migration, asylum, and border control management
  - Administration of justice and democratic processes
  - Critical infrastructure
  - Biometrics (remote identification)
  - Other / not listed

**Section 4, Question 3**: "Safety Component"
- State variable: `safetyComponent` ('Yes' | 'No' | '')
- Question: "Is this system a safety component?"

**Section 4, Question 4**: "Third-Party Conformity" (conditional)
- State variable: `thirdPartyConformity` ('Yes' | 'No' | '')
- Only shown if `safetyComponent === 'Yes'`
- Question: "Subject to third-party conformity assessment?"

---

## State Variables

```typescript
// Main confirmation state
const [highRiskConfirmed, setHighRiskConfirmed] = useState<boolean>(false);

// Annex III Exemption Test state
const [materialInfluence, setMaterialInfluence] = useState<'Yes' | 'No' | 'Not sure' | ''>('');
const [narrowTasks, setNarrowTasks] = useState<string[]>([]);
const [profiling, setProfiling] = useState<'Yes' | 'No' | 'Unknown' | ''>('');

// Evidence for high-risk confirmation
const [highRiskEvidence, setHighRiskEvidence] = useState('');
const [highRiskEvidenceLink, setHighRiskEvidenceLink] = useState('');
const [highRiskEvidenceSavedLink, setHighRiskEvidenceSavedLink] = useState('');
const [highRiskEvidenceConfirmed, setHighRiskEvidenceConfirmed] = useState<boolean>(false);

// Evidence for NOT high-risk (exemption passed)
const [minimalRiskEvidence, setMinimalRiskEvidence] = useState('');
const [minimalRiskEvidenceLink, setMinimalRiskEvidenceLink] = useState('');
const [minimalRiskEvidenceSavedLink, setMinimalRiskEvidenceSavedLink] = useState('');
const [minimalRiskEvidenceConfirmed, setMinimalRiskEvidenceConfirmed] = useState<boolean>(false);

// Block collapse state
const [block2Collapsed, setBlock2Collapsed] = useState(false);
```

---

## High-Risk Trigger Conditions

### Condition 1: Safety Component Path
**Triggers when:**
```typescript
safetyComponent === 'Yes' AND thirdPartyConformity === 'Yes'
```

**Regulatory Reference**: EU AI Act Annex II (safety component regulation)

**Characteristics:**
- System is a safety component of a product
- Subject to third-party conformity assessment
- **Direct path to High-Risk** (no exemption test needed)

### Condition 2: Annex III Sector Path
**Triggers when:**
```typescript
sectorDomains contains any sector EXCEPT "Other / not listed"
```

**Regulatory Reference**: EU AI Act Annex III (high-risk AI systems)

**Characteristics:**
- System operates in regulated sectors
- **Requires Annex III Exemption Test** to determine final classification

### Combined Triggers
**Helper function**: `getHighRiskTrigger()`

```typescript
const getHighRiskTrigger = (): 'condition1' | 'condition2' | 'both' | 'none' => {
  const cond1 = isCondition1Met(); // Safety component
  const cond2 = isCondition2Met(); // Sector domain
  
  if (cond1 && cond2) return 'both';
  if (cond1) return 'condition1';
  if (cond2) return 'condition2';
  return 'none';
};
```

**Helper functions:**
```typescript
const isCondition1Met = (): boolean => {
  return safetyComponent === 'Yes' && thirdPartyConformity === 'Yes';
};

const isCondition2Met = (): boolean => {
  return sectorDomains.some(sector => sector !== 'Other / not listed');
};
```

---

## Core Logic Function: `getHighRiskStatus()`

**Return Type**: `'De-activated' | 'High-risk' | 'Not high-risk' | 'Needs review' | 'Not assessed'`

### Decision Tree

```
START
│
├─ Block 1 is Prohibited?
│  ��─ YES → Return 'De-activated'
│  └─ NO → Continue
│
├─ No sector AND no safety component answered?
│  └─ YES → Return 'Not assessed'
│  └─ NO → Continue
│
├─ Safety component = 'Yes' but thirdPartyConformity = ''?
│  └─ YES → Return 'Not assessed'
│  └─ NO → Continue
│
├─ Determine trigger conditions
│  └─ trigger = getHighRiskTrigger()
│
├─ trigger = 'none'?
│  └─ YES → Return 'Not high-risk'
│  └─ NO → Continue
│
├─ User confirmed? (highRiskConfirmed)
│  └─ NO → Return 'High-risk' (initial assessment)
│  └─ YES → Continue
│
└─ CONFIRMED FLOW:
   │
   ├─ trigger = 'condition1' (safety component only)
   │  └─ Return 'High-risk'
   │
   └─ trigger = 'condition2' OR 'both' (sector involved)
      └─ Run Annex III Exemption Test
         │
         ├─ annexResult = 'High-risk' → Return 'High-risk'
         │
         ├─ annexResult = 'Not high-risk'
         │  ├─ Evidence confirmed? → Return 'Not high-risk'
         │  └─ No evidence → Return 'High-risk' (pending evidence)
         │
         └─ annexResult = 'Needs review' → Return 'Needs review'
```

### Detailed Logic Implementation

```typescript
const getHighRiskStatus = (): 'De-activated' | 'High-risk' | 'Not high-risk' | 'Needs review' | 'Not assessed' => {
  // Check if Block 1 resulted in Prohibited
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
```

---

## Annex III Exemption Test Logic

### Purpose
Determines if a system can be exempt from Annex III high-risk classification despite operating in a regulated sector.

### Function: `getAnnexIIIResult()`

**Return Type**: `'High-risk' | 'Not high-risk' | 'Needs review' | 'pending'`

### Three-Question Sequential Logic

```
EXEMPTION TEST START
│
├─ Q1: Does the AI system have material influence on outcome?
│  ├─ materialInfluence = 'Yes' → Return 'High-risk' ✋ STOP
│  ├─ materialInfluence = 'Not sure' → Return 'Needs review' ✋ STOP
│  └─ materialInfluence = 'No' → Continue to Q2
│
├─ Q2: What narrow procedural tasks does the system perform?
│  ├─ Nothing selected → Return 'pending' (waiting for answer)
│  ├─ "None of above" selected → Return 'High-risk' ✋ STOP
│  └─ Specific task(s) selected → Continue to Q3
│
└─ Q3: Does the system involve profiling?
   ├─ profiling = 'Yes' → Return 'High-risk'
   ├─ profiling = 'No' → Return 'Not high-risk' ✅ EXEMPTION GRANTED
   └─ profiling = 'Unknown' → Return 'Needs review'
```

### Detailed Implementation

```typescript
const getAnnexIIIResult = (): 'High-risk' | 'Not high-risk' | 'Needs review' | 'pending' => {
  // Question 1: Material Influence
  if (materialInfluence === 'Yes') return 'High-risk';
  if (materialInfluence === 'Not sure') return 'Needs review';
  
  if (materialInfluence === 'No') {
    // Question 2: Narrow Tasks
    if (narrowTasks.length === 0) return 'pending';
    if (narrowTasks.includes('None of above')) return 'High-risk';
    
    // Question 3: Profiling
    if (profiling === 'Yes') return 'High-risk';
    if (profiling === 'No') return 'Not high-risk';
    if (profiling === 'Unknown') return 'Needs review';
  }
  
  return 'pending';
};
```

### Question 1: Material Influence
**Full Question**: "Does the AI system have material influence on the outcome of the decision or action?"

**Options:**
- Yes → Fails exemption (High-risk)
- No → Continue to Q2
- Not sure → Needs review

**Examples of Material Influence:**
- AI recommendation directly determines hiring decision
- AI score is primary factor in loan approval
- AI assessment triggers automatic actions

### Question 2: Narrow Procedural Tasks
**Full Question**: "What narrow procedural tasks does the AI system perform?"

**Options:**
- Narrow procedural task
- Improves a previously completed human activity
- Detects patterns / deviations from past decisions (without influencing decisions)
- Preparatory task to an assessment relevant for the purposes of the use cases listed in Annex III (e.g., indexing, sorting, summarising)
- None of above

**Logic:**
- If ANY specific task selected → Continue to Q3
- If "None of above" → Fails exemption (High-risk)

**Context**: These represent limited-scope tasks that do not materially influence decision outcomes.

### Question 3: Profiling
**Full Question**: "Does the AI system involve profiling of natural persons?"

**Options:**
- Yes → Fails exemption (High-risk)
- No → Passes exemption (Not high-risk)
- Unknown → Needs review

**Definition**: Profiling means automated processing to evaluate personal aspects (behavior, preferences, etc.)

---

## Complete Status Outcomes

### Status Matrix

| Trigger | Confirmed | Exemption Test | Evidence | Final Status |
|---------|-----------|----------------|----------|--------------|
| none | - | - | - | **Not high-risk** |
| condition1 | No | - | - | **High-risk** (initial) |
| condition1 | Yes | N/A | N/A | **High-risk** |
| condition2 | No | - | - | **High-risk** (initial) |
| condition2 | Yes | High-risk | - | **High-risk** |
| condition2 | Yes | Needs review | - | **Needs review** |
| condition2 | Yes | Not high-risk | No | **High-risk** (pending) |
| condition2 | Yes | Not high-risk | Yes | **Not high-risk** |
| both | No | - | - | **High-risk** (initial) |
| both | Yes | High-risk | - | **High-risk** |
| both | Yes | Needs review | - | **Needs review** |
| both | Yes | Not high-risk | No | **High-risk** (pending) |
| both | Yes | Not high-risk | Yes | **Not high-risk** |

---

## UI Flow (Assessment Tab)

### Initial Display
When high-risk is triggered (Condition 1 and/or Condition 2):
- Shows orange "High-risk" badge
- Displays trigger reason(s)
- Shows "Confirm Assessment" button

### Condition 1 Only Flow (Safety Component)
1. User sees: "Your system is classified as **High-Risk**"
2. Reason: "Safety component subject to third-party conformity"
3. No exemption test needed
4. Evidence upload section shown
5. User uploads high-risk evidence
6. User confirms evidence
7. Final status: **High-risk**

### Condition 2 Only Flow (Sector)
1. User sees: "Your system is classified as **High-risk**"
2. Reason: Lists triggered sectors
3. User clicks "Confirm Assessment"
4. **Annex III Exemption Test** appears:
   
   **Question 1**: "Material influence on outcome?"
   - If Yes → Skip to evidence (High-risk)
   - If Not sure → Status = Needs review
   - If No → Show Question 2
   
   **Question 2**: "Narrow procedural tasks?"
   - Multi-select checkboxes
   - If "None of above" → Skip to evidence (High-risk)
   - If specific tasks → Show Question 3
   
   **Question 3**: "Profiling involved?"
   - If Yes → Show high-risk evidence section
   - If No → Show NOT high-risk evidence section
   - If Unknown → Status = Needs review

5. **Evidence section** (based on result):
   - If High-risk → Upload high-risk evidence
   - If Not high-risk → Upload exemption evidence
   
6. User confirms evidence
7. Final status determined

### Both Conditions Flow
1. Shows both trigger reasons (safety + sector)
2. Follows same flow as Condition 2
3. Must complete Annex III test even though Condition 1 alone would classify as high-risk

---

## Evidence Requirements

### High-Risk Evidence
**Required when:**
- Condition 1 met (safety component), OR
- Annex III test result = 'High-risk'

**Purpose**: Document why system is high-risk

**Fields:**
- `highRiskEvidence`: Text description
- `highRiskEvidenceLink`: URL to document
- `highRiskEvidenceSavedLink`: Confirmed URL
- `highRiskEvidenceConfirmed`: Boolean confirmation

### Minimal Risk Evidence (Exemption Evidence)
**Required when:**
- Annex III test result = 'Not high-risk'

**Purpose**: Document why exemption applies

**Fields:**
- `minimalRiskEvidence`: Text description
- `minimalRiskEvidenceLink`: URL to document
- `minimalRiskEvidenceSavedLink`: Confirmed URL
- `minimalRiskEvidenceConfirmed`: Boolean confirmation

**Critical Note**: Without evidence confirmation, status remains 'High-risk' even if exemption test passed.

---

## Status Color Mapping

```typescript
// Status colors for Block 2
'De-activated' → Gray (bg-[#F0F1F2] text-[#B5BCC4])
'High-risk' → Orange (bg-[#FFF3E0] text-[#E65100])
'Not high-risk' → Green (bg-[#E8F5E9] text-[#2E7D32])
'Needs review' → Yellow (bg-[#FFF9E6] text-[#F57C00])
'Not assessed' → Gray (bg-[#F0F1F2] text-[#B5BCC4])
```

---

## State Reset Logic

Block 2 automatically resets when relevant Profile fields change:

```typescript
useEffect(() => {
  setHighRiskConfirmed(false);
  setHighRiskEvidence('');
  setHighRiskEvidenceLink('');
  setHighRiskEvidenceSavedLink('');
  setHighRiskEvidenceConfirmed(false);
  setMaterialInfluence('');
  setNarrowTasks([]);
  setProfiling('');
  setMinimalRiskEvidence('');
  setMinimalRiskEvidenceLink('');
  setMinimalRiskEvidenceSavedLink('');
  setMinimalRiskEvidenceConfirmed(false);
}, [safetyComponent, thirdPartyConformity, JSON.stringify(sectorDomains)]);
```

**Triggers reset when:**
- `safetyComponent` changes
- `thirdPartyConformity` changes
- `sectorDomains` array changes

**Purpose**: Prevent stale assessments based on outdated Profile data

---

## Upstream Dependencies

### From Block 1
```typescript
if (isBlock1Prohibited()) {
  return 'De-activated';
}
```

**Effect**: If Block 1 status = 'Prohibited', Block 2 cannot be assessed

### From Profile Tab
**Required fields:**
- Section 4, Q2: Sector domains (must have answer)
- Section 4, Q3: Safety component (must have answer)
- Section 4, Q4: Third-party conformity (if Q3 = 'Yes')

**Validation**: Status returns 'Not assessed' if insufficient Profile data

---

## Downstream Effects

### Impact on Result Tab
Result tab calls `getBlock2Status()` wrapper:

```typescript
const getBlock2Status = (): 'De-activated' | 'High-Risk' | 'Not High-Risk' | 'Needs Review' => {
  const status = getHighRiskStatus();
  
  if (status === 'De-activated') return 'De-activated';
  if (status === 'High-risk') return 'High-Risk';
  if (status === 'Not high-risk') return 'Not High-Risk';
  return 'Needs Review';
};
```

### Impact on Other Blocks
- Blocks 3 and 4 are NOT affected by Block 2 status
- Block 2 does NOT de-activate downstream blocks
- Independent assessment continues regardless of high-risk classification

---

## User Journey Scenarios

### Scenario A: Not High-Risk (No Triggers)
1. User selects "Other / not listed" for sector
2. User selects "No" for safety component
3. Block 2 shows status: **Not high-risk** (Green)
4. No confirmation needed
5. Blocks 3, 4 remain active

### Scenario B: High-Risk via Safety Component (Condition 1)
1. User selects "Yes" for safety component (Section 4, Q3)
2. User selects "Yes" for third-party conformity (Section 4, Q4)
3. Block 2 shows status: **High-risk** (Orange)
4. User clicks "Confirm Assessment"
5. Evidence section appears
6. User uploads high-risk classification evidence
7. User clicks "Confirm Evidence"
8. Final status: **High-risk** (Orange)
9. Blocks 3, 4 remain active

### Scenario C: High-Risk via Sector (Exemption Test Fails)
1. User selects "Employment" in sector domains
2. Block 2 shows status: **High-risk** (Orange)
3. User clicks "Confirm Assessment"
4. Annex III Exemption Test appears
5. **Q1: Material influence?** → User selects "Yes"
6. Test stops (failed at Q1)
7. Evidence section appears for high-risk
8. User uploads evidence and confirms
9. Final status: **High-risk** (Orange)

### Scenario D: High-Risk via Sector (Exemption Test Passes - All 3 Questions)
1. User selects "Education" in sector domains
2. Block 2 shows status: **High-risk** (Orange)
3. User clicks "Confirm Assessment"
4. Annex III Exemption Test appears
5. **Q1: Material influence?** → User selects "No"
6. **Q2: Narrow procedural tasks?** → User selects "Format/style checks" + "Translation"
7. **Q3: Profiling involved?** → User selects "No"
8. Test passes → Exemption granted
9. Evidence section appears for minimal risk/exemption
10. User uploads exemption evidence and confirms
11. Final status: **Not high-risk** (Green)

### Scenario E: Needs Review (Uncertainty in Exemption Test)
1. User selects "Law enforcement" in sector domains
2. Block 2 shows status: **High-risk** (Orange)
3. User clicks "Confirm Assessment"
4. Annex III Exemption Test appears
5. **Q1: Material influence?** → User selects "Not sure"
6. Test cannot determine outcome
7. Final status: **Needs review** (Yellow)
8. System flags for manual compliance review

### Scenario F: Both Conditions Met
1. User selects "Employment" in sector domains (Condition 2)
2. User selects "Yes" for safety component + third-party conformity (Condition 1)
3. Trigger = 'both'
4. Must still complete Annex III test (Condition 2 requires it)
5. Follows same flow as Scenario D
6. Evidence required based on test result

---

## Evidence Flow Logic

### When High-Risk Evidence Required
**Condition**: 
```typescript
trigger === 'condition1' OR annexResult === 'High-risk'
```

**UI Display:**
- Section title: "Upload High-Risk Classification Evidence"
- Description: Document reasoning for high-risk classification
- Fields: Text area, file upload, link input
- Confirmation button: "Confirm Evidence"

**Validation:**
- Must have either text OR file upload OR link
- `highRiskEvidenceConfirmed = true` after confirmation

### When Minimal Risk Evidence Required
**Condition**:
```typescript
annexResult === 'Not high-risk'
```

**UI Display:**
- Section title: "Upload Exemption Evidence"
- Description: Document why system qualifies for exemption
- Fields: Text area, file upload, link input
- Confirmation button: "Confirm Evidence"

**Validation:**
- Must have either text OR file upload OR link
- `minimalRiskEvidenceConfirmed = true` after confirmation

**Critical**: Without this evidence confirmation, `getHighRiskStatus()` returns 'High-risk' (pending evidence) even though exemption test passed.

---

## Narrow Procedural Tasks - Complete List

```typescript
const narrowTaskOptions = [
  'Narrow procedural task',
  'Improves a previously completed human activity',
  'Detects patterns / deviations from past decisions (without influencing decisions)',
  'Preparatory task to an assessment relevant for the purposes of the use cases listed in Annex III (e.g., indexing, sorting, summarising)',
  'None of above'
];
```

**Regulatory Context**: These tasks are considered low-impact and may qualify for exemption if:
- System has NO material influence, AND
- Performs ONLY these narrow tasks, AND
- Does NOT involve profiling

---

## Block 2 Collapse Behavior

### Collapsed Header Display
Shows:
- "Block 2: High-Risk Classification"
- Current status badge (color-coded)
- Chevron icon (up/down)

### When Collapsed
- Only header visible
- User can click to expand and review
- Status updates even when collapsed

### When Expanded
- Full content visible
- Shows all questions, answers, and evidence
- User can modify answers (triggers reset)

---

## Integration with Result Tab

### Result Display
Block 2 status appears on Result tab as:
- **De-activated**: Grayed out (Block 1 prohibited)
- **High-Risk**: Red badge with implications
- **Not High-Risk**: Green badge
- **Needs Review**: Yellow badge with action items

### Result Tab Wrapper
```typescript
const getBlock2Status = (): 'De-activated' | 'High-Risk' | 'Not High-Risk' | 'Needs Review' => {
  const status = getHighRiskStatus();
  
  if (status === 'De-activated') return 'De-activated';
  if (status === 'High-risk') return 'High-Risk';
  if (status === 'Not high-risk') return 'Not High-Risk';
  return 'Needs Review';
};
```

**Display implications:**
- **High-Risk**: Shows list of Annex III obligations user must comply with
- **Not High-Risk**: Explains reduced compliance burden
- **Needs Review**: Escalates to compliance team for manual determination

---

## Validation Rules

### Before Assessment
- Requires answer to Section 4, Q2 (sector) OR Q3 (safety component)
- If safety component = 'Yes', requires answer to Q4 (third-party conformity)

### During Exemption Test
- Questions appear sequentially
- Cannot skip questions
- Previous answers remain visible

### Evidence Confirmation
- Cannot complete block without evidence if:
  - High-risk determination made, OR
  - Exemption granted (minimal risk)
- Evidence must be confirmed to update final status

---

## Business Logic Notes

### Why Evidence is Always Required
- **High-Risk**: Need documentation of assessment reasoning
- **Not High-Risk (Exemption)**: Need proof that exemption criteria are met
- **Audit Trail**: EU AI Act compliance requires documented decision-making

### Annex III Test Sequencing
Questions are ordered by:
1. **Most decisive first**: Material influence immediately classifies as high-risk
2. **Narrow scope check**: Ensure system only does procedural tasks
3. **Profiling check**: Final disqualifier if present

### Pending Evidence State
Special case where:
- Exemption test passes (Not high-risk)
- BUT evidence not yet confirmed
- Status shows as 'High-risk' (pending evidence)
- Prevents premature classification change

This ensures compliance officers review and approve exemption before status updates.

---

## Data Persistence

### Fields Saved to System Record
- `sectorDomains`: Array of sectors
- `safetyComponent`: 'Yes' | 'No' | ''
- `thirdPartyConformity`: 'Yes' | 'No' | ''
- `highRiskConfirmed`: Boolean
- `materialInfluence`: 'Yes' | 'No' | 'Not sure' | ''
- `narrowTasks`: Array of task types
- `profiling`: 'Yes' | 'No' | 'Unknown' | ''
- `highRiskEvidence`: Text
- `highRiskEvidenceLink`: URL
- `highRiskEvidenceSavedLink`: Confirmed URL
- `minimalRiskEvidence`: Text (if exemption granted)
- `minimalRiskEvidenceLink`: URL
- `minimalRiskEvidenceSavedLink`: Confirmed URL
- Final status: Result of `getHighRiskStatus()`

### Audit Trail
Should log:
- Timestamp of assessment confirmation
- User who confirmed
- Exemption test answers
- Evidence upload timestamps
- Status changes

---

## Regulatory References

- **EU AI Act Annex II**: Safety components
- **EU AI Act Annex III**: High-risk AI systems by sector
- **Article 6**: High-risk classification rules
- **Article 9-15**: Requirements for high-risk AI systems

---

## Progressive Disclosure Implementation

### Collapsed State
- Shows after user moves to Block 3 or beyond
- Header displays current status
- Click to expand and review

### Expanded State
- Full assessment visible
- Can modify answers (triggers reset)
- Must re-confirm if answers change

### State Persistence
- `block2Collapsed` controls display
- Independent of confirmation state
- User can collapse/expand freely