# Block 3: Transparency Obligation - Logic Documentation

## Overview
**Purpose**: Determines if the AI system must comply with transparency obligations under EU AI Act Article 50.

**Location**: AI Inventory > AI System Data Collection > Assessment Tab > Block 3

**Regulatory Reference**: EU AI Act Article 50 (Transparency obligations for certain AI systems)

---

## Input Data Sources

### Primary Inputs (from Profile Tab)

**Section 4, Question 2**: "Capabilities & Triggers"
- State variable: `capabilities` (string array)
- Relevant for: Biometric identification, Emotion recognition, Biometric categorisation

**Section 7, Question 1**: "Capabilities" (extended list)
- State variable: `capabilities` (string array)
- Includes emotion recognition and biometric categorisation practices

**Section 7, Question 2**: "Direct Interaction with Persons"
- State variable: `interactWithPersons` ('Yes' | 'No' | 'Unknown' | '')
- Question: "Does the AI system interact directly with natural persons?"

**Section 7, Question 3**: "Synthetic Content"
- State variable: `syntheticContent` (string array)
- Options: Image, Audio, Video, Text, No
- Question: "Does the AI generate or manipulate synthetic content?"

**Section 5, Question 1**: "Deployment Context"
- State variable: `deploymentContext` (string)
- Relevant value: "General public / consumer-facing"

**Section 5, Question 3**: "Affected Persons"
- State variable: `affectedPersons` (string array)
- Relevant value: "Citizens / residents"

---

## State Variables

```typescript
// Main confirmation state
const [transparencyConfirmed, setTransparencyConfirmed] = useState<boolean>(false);

// Exception options (can be multiple for different cases)
const [transparencyExceptionOptions, setTransparencyExceptionOptions] = useState<string[]>([]);

// Evidence for exceptions
const [transparencyEvidence, setTransparencyEvidence] = useState('');
const [transparencyEvidenceLink, setTransparencyEvidenceLink] = useState('');
const [transparencyEvidenceSavedLink, setTransparencyEvidenceSavedLink] = useState('');
const [transparencyEvidenceConfirmed, setTransparencyEvidenceConfirmed] = useState<boolean>(false);

// Block collapse state
const [block3Collapsed, setBlock3Collapsed] = useState(false);
```

---

## Transparency Trigger Cases

### Function: `getTransparencyTriggers()`
Returns: `string[]` (array of case codes: 'case1', 'case2', etc.)

### 6 Trigger Cases

#### Case 1: Biometric Identification & Categorisation
**Trigger Condition:**
```typescript
capabilities.includes('Biometric identification and categorisation')
```
**Source**: Section 4, Q2
**Article**: Art. 50(3)
**Code**: `'case1'`

#### Case 2: Emotion Recognition in Workplace/Education
**Trigger Condition:**
```typescript
capabilities.includes('Emotion recognition in the workplace or in education settings')
```
**Source**: Section 7, Q1
**Article**: Art. 50(3)
**Code**: `'case2'`

#### Case 3: Biometric Categorisation (Sensitive Traits)
**Trigger Condition:**
```typescript
capabilities.includes('Biometric categorisation that infers or predicts sensitive traits (e.g., race, political opinions, religion, trade union membership, sexual orientation)')
```
**Source**: Section 7, Q1
**Article**: Art. 50(3)
**Code**: `'case3'`

#### Case 4: Direct Interaction with Persons
**Trigger Condition:**
```typescript
interactWithPersons === 'Yes'
```
**Source**: Section 7, Q2
**Article**: Art. 50(1)
**Code**: `'case4'`

#### Case 5: Synthetic Content Generation
**Trigger Condition:**
```typescript
syntheticContent.length > 0 && !syntheticContent.includes('No')
```
**Source**: Section 7, Q3
**Article**: Art. 50(4) (deepfake disclosure)
**Code**: `'case5'`

**Logic**: Triggers if ANY content type selected EXCEPT "No"

#### Case 6: Citizens/Residents or General Public Facing
**Trigger Condition:**
```typescript
affectedPersons.includes('Citizens / residents') OR 
deploymentContext === 'General public / consumer-facing'
```
**Source**: Section 5, Q1 and Q3
**Article**: Art. 50(4)
**Code**: `'case6'`

**Logic**: Triggers if EITHER condition is true

---

## Core Logic Function: `getBlock3Status()`

**Return Type**: `'De-activated' | 'Applies' | 'Not Applicable' | 'Needs Review' | 'Pending' | 'Not assessed'`

### Decision Tree

```
START
│
├─ Block 1 is Prohibited?
│  └─ YES → Return 'De-activated'
│  └─ NO → Continue
│
├─ No capabilities answered?
│  └─ YES (capabilities.length === 0) → Return 'Not assessed'
│  └─ NO → Continue
│
├─ Get transparency triggers
│  └─ triggers = getTransparencyTriggers()
│
├─ User confirmed? (transparencyConfirmed)
│  └─ NO → Initial assessment:
│     ├─ triggers.length > 0
│     │  ├─ Has unknowns? → Return 'Needs Review'
│     │  └─ No unknowns → Return 'Applies'
│     └─ triggers.length === 0 → Return 'Not Applicable'
│
└─ YES (confirmed) → Exception flow:
   │
   ├─ No exception options selected?
   │  └─ YES → Return 'Pending'
   │
   ├─ "None of the above" selected for ANY case group?
   │  └─ YES → Return 'Applies' (no exception claimed)
   │
   ├─ Valid exceptions selected for ALL case groups?
   │  ├─ YES:
   │  │  ├─ Evidence confirmed? → Return 'Not Applicable'
   │  │  └─ No evidence → Return 'Needs Review'
   │  └─ NO → Return 'Pending' (incomplete exception selection)
   │
   └─ Return 'Pending'
```

### Detailed Logic Implementation

```typescript
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
```

---

## Exception Options by Case Group

### Function: `getTransparencyExceptionOptionsByCaseGroup()`

Returns object mapping case groups to their exception options:

```typescript
{
  [groupKey: string]: {
    label: string;
    options: string[];
  }
}
```

### Group 1: Biometric/Emotion Recognition (Cases 1, 2, 3)
**Applies to:**
- Case 1: Biometric identification
- Case 2: Emotion recognition
- Case 3: Biometric categorisation

**Label**: "For [Biometric identification, Emotion recognition, Biometric categorisation]:"

**Exception Options:**
1. "Permitted by law to detect, prevent or investigate criminal offences, as stated in Art. 50(3)"
2. "None of the above (no exception for biometric/emotion recognition cases)"

**Article Reference**: Art. 50(3)

---

### Group 2: Direct Interaction (Case 4)
**Applies to:**
- Case 4: Direct interaction with persons

**Label**: "For Direct interaction with persons:"

**Exception Options:**
1. "\"Obvious to the user\" exception (no notice needed), as stated in Art. 50(1)"
2. "Authorised by law to detect, prevent, investigate or prosecute criminal offences, as stated in Art. 50(1)"
3. "None of the above (no exception for direct interaction case)"

**Article Reference**: Art. 50(1)

**Note**: "Obvious to the user" means it's inherently clear the user is interacting with AI (e.g., chatbot with AI branding)

---

### Group 3: Synthetic Content (Case 5)
**Applies to:**
- Case 5: Generates/manipulates synthetic content

**Label**: "For Synthetic content generation / manipulation:"

**Exception Options:**
1. "Deepfake labelling exception (e.g., artistic / satire / fiction), as stated in Art. 50(4)"
2. "None of the above (no exception for synthetic content case)"

**Article Reference**: Art. 50(4)

**Note**: Artistic/satirical/fiction uses may be exempt from disclosure requirements

---

### Group 4: Citizens/General Public (Case 6)
**Applies to:**
- Case 6: Affects citizens/residents OR general public facing

**Label**: "For Citizens / residents or General public facing:"

**Exception Options:**
1. "Authorised by law to detect, prevent, investigate or prosecute criminal offences, as stated in Art. 50(4)"
2. "Human review is in place or a natural or legal person holds editorial responsibility for the publication of the content, as stated in Art. 50(4)"
3. "None of the above (no exception for citizens/public-facing case)"

**Article Reference**: Art. 50(4)

---

## Helper Functions

### `getTransparencyTriggers()`
**Complete Implementation:**

```typescript
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
```

### `getTransparencyTriggerReasons()`
Converts trigger codes to human-readable reasons:

```typescript
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
```

### `hasExceptionForAllCases()`
Validates that ALL triggered cases have valid exceptions selected:

```typescript
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
      return false; // This case group has no valid exception
    }
  }
  
  return true; // All case groups have at least one valid exception
};
```

### `hasNoExceptionClaimed()`
Checks if user declined exception for ANY case:

```typescript
const hasNoExceptionClaimed = (): boolean => {
  // Check if "None of the above" is selected for ANY case group
  return transparencyExceptionOptions.some(opt => opt.includes('None of the above'));
};
```

### `hasTransparencyUnknowns()`
Detects uncertainty in relevant answers:

```typescript
const hasTransparencyUnknowns = (): boolean => {
  // Check if any relevant answers are Unknown/Not sure
  if (interactWithPersons === 'Unknown') return true;
  // Could add more checks for other fields if needed
  return false;
};
```

---

## Status Outcomes

### Status Values & Meanings

| Status | Color | Meaning |
|--------|-------|---------|
| **De-activated** | Gray | Block 1 prohibited - cannot assess |
| **Applies** | Orange | Transparency obligations apply |
| **Not Applicable** | Green | Valid exceptions for all cases |
| **Needs Review** | Yellow | Uncertainty or missing evidence |
| **Pending** | Blue | Awaiting exception selection |
| **Not assessed** | Gray | No Profile data yet |

---

## Exception Selection Logic

### Multi-Case Scenario Handling

**Challenge**: System may trigger MULTIPLE cases simultaneously

**Example**:
- Case 2: Emotion recognition (triggered)
- Case 4: Direct interaction (triggered)
- Case 6: General public facing (triggered)

**Requirement**: Must select exception for EACH triggered case group

### Case Group Mapping

When `getTransparencyTriggers()` returns multiple cases, they're grouped:

**Group 1-2-3**: Biometric/Emotion cases → Single exception set
**Group 4**: Direct interaction → Separate exception set
**Group 5**: Synthetic content → Separate exception set
**Group 6**: Citizens/Public → Separate exception set

**User must address each group separately**

---

## UI Flow (Assessment Tab)

### Initial Display (Not Confirmed)
When transparency is triggered:
- Shows trigger badge: **"Applies"** (Orange)
- Lists all triggered cases with reasons
- "Confirm Assessment" button displayed

**If `hasTransparencyUnknowns() === true`:**
- Badge: **"Needs Review"** (Yellow)
- Message: "Some answers marked as Unknown - manual review required"

### After Confirmation
When user clicks "Confirm", sets `transparencyConfirmed = true`:

**Shows Exception Selection Interface:**

For each triggered case group:
1. **Group header** with case label
2. **Radio buttons** or checkboxes for exception options
3. Last option always: "None of the above (no exception...)"

**Example Display for 3 Groups:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
For Emotion recognition:
○ Permitted by law to detect, prevent or investigate criminal offences (Art. 50(3))
○ None of the above
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
For Direct interaction with persons:
○ "Obvious to the user" exception (Art. 50(1))
○ Authorised by law for criminal offences (Art. 50(1))
○ None of the above
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
For General public facing:
○ Authorised by law for criminal offences (Art. 50(4))
○ Human review / editorial responsibility (Art. 50(4))
○ None of the above
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Evidence Section (Conditional)
**Appears when:**
```typescript
hasExceptionForAllCases() === true && 
transparencyExceptionOptions.length > 0
```

**UI Elements:**
- Text area for evidence description
- File upload area
- Link to existing document option
- "Confirm Evidence" button

**Purpose**: Document why exceptions apply

---

## Complete Logic Scenarios

### Scenario A: Not Applicable (No Triggers)
**Profile Setup:**
- No biometric capabilities
- interactWithPersons = 'No'
- syntheticContent includes 'No'
- deploymentContext ≠ 'General public / consumer-facing'
- affectedPersons does NOT include 'Citizens / residents'

**Result:**
- `triggers.length === 0`
- Status: **Not Applicable** (Green)
- No confirmation needed

---

### Scenario B: Applies (Single Case, No Exception)
**Profile Setup:**
- interactWithPersons = 'Yes' (triggers Case 4)

**Flow:**
1. Initial status: **Applies** (Orange)
2. User clicks "Confirm Assessment"
3. Exception options appear for Group 4 (Direct interaction)
4. User selects: "None of the above"
5. Status: **Applies** (Orange)
6. No evidence section shown
7. Transparency obligations apply to this system

---

### Scenario C: Not Applicable (Single Case, Exception Claimed)
**Profile Setup:**
- interactWithPersons = 'Yes' (triggers Case 4)

**Flow:**
1. Initial status: **Applies** (Orange)
2. User clicks "Confirm Assessment"
3. Exception options appear for Group 4
4. User selects: "\"Obvious to the user\" exception (Art. 50(1))"
5. Evidence section appears
6. User uploads/links evidence explaining why it's obvious
7. User clicks "Confirm Evidence"
8. Status: **Not Applicable** (Green)
9. Transparency obligations do NOT apply

---

### Scenario D: Multiple Cases - Mixed Exceptions
**Profile Setup:**
- capabilities includes 'Emotion recognition in workplace' (Case 2)
- interactWithPersons = 'Yes' (Case 4)
- deploymentContext = 'General public / consumer-facing' (Case 6)

**Triggers**: case2, case4, case6 (3 different groups)

**Flow:**
1. Initial status: **Applies** (Orange)
2. User clicks "Confirm Assessment"
3. System shows 3 exception option groups:
   - **Group 1-2-3**: For Emotion recognition
   - **Group 4**: For Direct interaction
   - **Group 6**: For General public facing
   
4. **User selections:**
   - Group 1-2-3: Selects "Permitted by law for criminal offences"
   - Group 4: Selects "None of the above"
   - Group 6: Selects "Human review / editorial responsibility"

5. **Validation**: `hasNoExceptionClaimed() === true` (Group 4 declined)
6. Status: **Applies** (Orange)
7. Transparency obligations apply (cannot exempt all cases)

---

### Scenario E: Multiple Cases - All Exceptions Claimed
**Profile Setup:**
- capabilities includes 'Biometric categorisation' (Case 3)
- deploymentContext = 'General public / consumer-facing' (Case 6)

**Triggers**: case3, case6

**Flow:**
1. Initial status: **Applies** (Orange)
2. User clicks "Confirm Assessment"
3. System shows 2 exception option groups
4. **User selections:**
   - Group 1-2-3: Selects "Permitted by law for criminal offences"
   - Group 6: Selects "Human review / editorial responsibility"
5. **Validation**: `hasExceptionForAllCases() === true`
6. Evidence section appears
7. User uploads evidence for both exceptions
8. User clicks "Confirm Evidence"
9. Status: **Not Applicable** (Green)

---

### Scenario F: Needs Review (Unknowns)
**Profile Setup:**
- interactWithPersons = 'Unknown' (Case 4 uncertain)

**Flow:**
1. System detects unknown value
2. Status: **Needs Review** (Yellow)
3. Message: "Answer marked as Unknown requires manual review"
4. No confirmation flow triggered
5. Escalates to compliance team

---

### Scenario G: Pending (Incomplete Exception Selection)
**Profile Setup:**
- Case 2, 4, 6 all triggered (3 groups)

**Flow:**
1. Initial status: **Applies** (Orange)
2. User clicks "Confirm Assessment"
3. User selects exception for Group 1-2-3 only
4. Groups 4 and 6 have no selection yet
5. Status: **Pending** (Blue)
6. User must complete all groups before proceeding

---

## Trigger Reason Display

### Case 6 Special Display Logic
Case 6 has more detailed reason text based on what triggered it:

```typescript
if (triggers.includes('case6')) {
  if (affectedPersons.includes('Citizens / residents') && 
      deploymentContext === 'General public / consumer-facing') {
    reasons.push('Affects citizens / residents and is general public / consumer-facing (Section 5, Q1 & Q3)');
  } else if (affectedPersons.includes('Citizens / residents')) {
    reasons.push('Affects citizens / residents (Section 5, Q3)');
  } else {
    reasons.push('General public / consumer-facing deployment (Section 5, Q1)');
  }
}
```

**Shows most specific reason possible**

---

## State Reset Logic

Block 3 automatically resets when relevant Profile fields change:

```typescript
useEffect(() => {
  setTransparencyConfirmed(false);
  setTransparencyExceptionOptions([]);
  setTransparencyEvidence('');
  setTransparencyEvidenceLink('');
  setTransparencyEvidenceSavedLink('');
  setTransparencyEvidenceConfirmed(false);
}, [
  JSON.stringify(capabilities),
  interactWithPersons,
  JSON.stringify(syntheticContent),
  JSON.stringify(affectedPersons),
  deploymentContext
]);
```

**Reset Triggers:**
- `capabilities` array changes
- `interactWithPersons` changes
- `syntheticContent` array changes
- `affectedPersons` array changes
- `deploymentContext` changes

**Purpose**: Ensure assessment reflects current Profile data

---

## Upstream Dependencies

### From Block 1
```typescript
if (isBlock1Prohibited()) {
  return 'De-activated';
}
```
**Effect**: Block 1 prohibited → Block 3 de-activated

### From Profile Tab
**Required fields:**
- Section 4, Q2: Capabilities (at minimum)
- Section 7, Q1: Capabilities
- Section 7, Q2: Direct interaction
- Section 7, Q3: Synthetic content
- Section 5, Q1: Deployment context
- Section 5, Q3: Affected persons

**Note**: Block 3 can have partial triggers. Not all fields need answers, but `capabilities.length > 0` required for assessment.

---

## Downstream Effects

### Impact on Compliance Requirements
If Block 3 status = **'Applies'**:
- System must implement transparency notices
- Users must be informed they're interacting with AI
- Synthetic content must be labeled
- Specific disclosure requirements based on which cases triggered

If Block 3 status = **'Not Applicable'**:
- Valid exceptions claimed and documented
- Reduced transparency burden
- Still subject to general transparency principles

### No Impact on Block 4
- Block 3 status does NOT affect Block 4
- Block 4 remains active regardless of Block 3 outcome

---

## Exception Validation Logic

### All Cases Must Have Exceptions
**Rule**: Cannot claim partial exception

**Validation Function**: `hasExceptionForAllCases()`

**Logic**:
```typescript
For each triggered case group {
  Check if at least one non-"None of the above" option is selected
  If NO → Return false (incomplete)
}
Return true (all groups covered)
```

**Example - Invalid:**
- Case 2 triggered → Exception selected ✓
- Case 4 triggered → No exception selected ✗
- Result: `hasExceptionForAllCases() = false` → Status = 'Pending'

**Example - Valid:**
- Case 2 triggered → Exception selected ✓
- Case 4 triggered → Exception selected ✓
- Case 6 triggered → Exception selected ✓
- Result: `hasExceptionForAllCases() = true` → Can proceed to evidence

### "None of the Above" Detection
**Rule**: If ANY group selects "None of the above", transparency applies

**Validation Function**: `hasNoExceptionClaimed()`

**Effect**: Overrides other selections - even if other groups have valid exceptions, status = 'Applies'

---

## Evidence Requirements

### When Evidence is Required
**Condition:**
```typescript
hasExceptionForAllCases() === true AND
transparencyExceptionOptions.length > 0
```

### Evidence Validation
**For 'Not Applicable' status:**
```typescript
hasExceptionForAllCases() === true AND
transparencyEvidenceConfirmed === true
```

**Without evidence confirmation:**
```typescript
hasExceptionForAllCases() === true AND
transparencyEvidenceConfirmed === false
→ Status = 'Needs Review'
```

### Evidence Types
- **Text description**: `transparencyEvidence`
- **File upload**: Handled via DocumentUploadSection
- **Link to document**: `transparencyEvidenceLink` / `transparencyEvidenceSavedLink`

**User must provide at least one form of evidence**

---

## Status Color Mapping

```typescript
function getBlock3StatusColor(status: string) {
  switch (status) {
    case 'De-activated':
      return 'gray';
    case 'Applies':
      return 'orange';
    case 'Not Applicable':
      return 'green';
    case 'Needs Review':
      return 'yellow';
    case 'Pending':
      return 'blue'; // Special state during exception selection
    case 'Not assessed':
      return 'gray';
  }
}
```

### Visual Display
- **De-activated**: Grayed out, non-interactive
- **Applies**: Orange badge, shows compliance requirements
- **Not Applicable**: Green badge, shows exemption basis
- **Needs Review**: Yellow badge, shows review action items
- **Pending**: Blue badge, prompts user to complete selections
- **Not assessed**: Gray badge, prompts Profile completion

---

## Complex Multi-Case Example

### Real-World Scenario: Chatbot Application

**Profile Answers:**
- Deployment: "General public / consumer-facing" → Triggers Case 6
- Direct interaction: "Yes" → Triggers Case 4
- Synthetic content: ["Text"] → Triggers Case 5
- Affected persons: ["Citizens / residents"] → Reinforces Case 6

**Triggered Cases**: case4, case5, case6

**Case Groups Created**: 3 groups
- Group 4 (Direct interaction)
- Group 5 (Synthetic content)
- Group 6 (Citizens/Public)

**Exception Selection Interface:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Exception Options:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For Direct interaction with persons:
☐ "Obvious to the user" exception (Art. 50(1))
☐ Authorised by law for criminal offences (Art. 50(1))
☐ None of the above

For Synthetic content generation / manipulation:
☐ Deepfake labelling exception - artistic/satire/fiction (Art. 50(4))
☐ None of the above

For Citizens / residents or General public facing:
☐ Authorised by law for criminal offences (Art. 50(4))
☐ Human review / editorial responsibility (Art. 50(4))
☐ None of the above
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Possible Outcomes:**

**Outcome 1: All Exceptions Claimed**
- Group 4: Select "Obvious to the user"
- Group 5: Select "Artistic/satire exception"
- Group 6: Select "Human review in place"
- Evidence required and confirmed
- Status → **Not Applicable** (Green)

**Outcome 2: One Group Declined**
- Group 4: Select "Obvious to the user"
- Group 5: Select "None of the above" ❌
- Group 6: Select "Human review in place"
- Status → **Applies** (Orange)
- No evidence section (exception not fully claimed)

**Outcome 3: Incomplete Selection**
- Group 4: Select "Obvious to the user"
- Group 5: Nothing selected yet
- Group 6: Nothing selected yet
- Status → **Pending** (Blue)
- User must complete all groups

---

## Integration with Result Tab

### Result Display
Block 3 status on Result tab shows:

**If 'Applies':**
- Badge: Orange
- Text: "Transparency obligations apply to this system"
- Lists triggered cases
- Shows compliance requirements (Art. 50 disclosure rules)

**If 'Not Applicable':**
- Badge: Green
- Text: "Transparency obligations do not apply (exceptions claimed)"
- Lists claimed exceptions
- Shows evidence references

**If 'Needs Review':**
- Badge: Yellow
- Text: "Manual review required for transparency determination"
- Shows reason (unknowns, missing evidence, etc.)

---

## Validation Rules

### Before Confirmation
- At least one trigger case must exist
- Cannot confirm if all triggers would result in 'Not Applicable' without user review

### During Exception Selection
- Must select ONE option per case group
- Cannot leave groups unaddressed
- "None of the above" is valid choice but results in 'Applies'

### Evidence Submission
- Required only if valid exceptions selected for ALL groups
- Must confirm evidence to achieve 'Not Applicable' status
- Without confirmation → Status = 'Needs Review'

---

## Business Rules

### Transparency Requirements by Case

**Case 1, 2, 3 (Biometric/Emotion)**:
- Must inform users about biometric processing
- Article 50(3) disclosure requirements

**Case 4 (Direct Interaction)**:
- Must disclose AI interaction to users
- Article 50(1) requirements
- Exception if "obvious" (e.g., clearly branded chatbot)

**Case 5 (Synthetic Content)**:
- Must label AI-generated content
- Article 50(4) deepfake disclosure
- Exception for artistic/satirical purposes

**Case 6 (Citizens/Public)**:
- Enhanced disclosure for public-facing systems
- Article 50(4) requirements
- Exceptions for law enforcement or human oversight

### Exception Hierarchy
No hierarchy - each case group evaluated independently:
- Having exception for Case 4 doesn't help with Case 5
- Must address each triggered case separately

---

## Data Persistence

### Fields Saved to System Record
- `transparencyConfirmed`: Boolean
- `transparencyExceptionOptions`: Array of selected exceptions
- `transparencyEvidence`: Text description
- `transparencyEvidenceLink`: URL
- `transparencyEvidenceSavedLink`: Confirmed URL
- `transparencyEvidenceConfirmed`: Boolean
- Triggered cases: Array of case codes
- Final status: Result of `getBlock3Status()`

### Audit Trail
Should log:
- Timestamp of confirmation
- User who confirmed
- Each exception selection with case reference
- Evidence upload events
- Status changes over time

---

## Edge Cases

### 1. Unknown Answer Detection
**Scenario**: `interactWithPersons = 'Unknown'`
- Triggers `hasTransparencyUnknowns()`
- Status immediately becomes 'Needs Review'
- Skips confirmation flow
- Requires manual compliance review

### 2. Exception Selected But No Evidence
**Scenario**: All cases have valid exceptions, but evidence not uploaded
- Status: 'Needs Review'
- Blocks user from claiming 'Not Applicable'
- Must provide evidence to complete

### 3. Partial Exception Claim
**Scenario**: 3 cases triggered, exceptions selected for only 2
- Status: 'Pending'
- User must complete all groups
- Cannot finalize assessment

### 4. All "None of the Above"
**Scenario**: User selects "None of the above" for every case group
- Status: 'Applies'
- Same outcome as single "None of the above"
- No evidence required (not claiming exemption)

### 5. Case 6 Dual Trigger
**Scenario**: Both conditions for Case 6 are true:
- `affectedPersons.includes('Citizens / residents')` AND
- `deploymentContext === 'General public / consumer-facing'`

**Display**: Shows combined reason
- "Affects citizens / residents and is general public / consumer-facing"
- Still counts as single case group (Group 6)
- Only need one exception selection for both conditions

---

## Progressive Disclosure Behavior

### Collapsed State
- Header shows: "Block 3: Transparency Obligation"
- Current status badge visible
- Click to expand

### Expanded State
- All triggered cases listed
- Exception selections visible (if confirmed)
- Evidence section shown (if applicable)
- Can modify answers (triggers reset)

### Pending State Indicator
When status = 'Pending':
- Badge shows "Pending" in blue
- Message: "Complete exception selection for all triggered cases"
- Highlights incomplete groups

---

## Compliance Implications

### If Status = 'Applies'
**System must implement:**
- User notifications about AI interaction
- Synthetic content labels/watermarks
- Biometric processing disclosures
- Public-facing transparency statements

**Specific requirements depend on triggered cases**

### If Status = 'Not Applicable'
**System benefits:**
- Reduced disclosure burden
- No user notification requirements
- Must maintain evidence of exceptions
- Regular compliance review recommended

### If Status = 'Needs Review'
**Actions required:**
- Escalate to compliance team
- Resolve unknowns or uncertainties
- Validate exception claims
- Make final determination

---

## Article 50 Reference Summary

### Art. 50(1) - Direct Interaction
Deployers of AI systems that interact with natural persons shall inform those persons that they are interacting with an AI system.

**Exception**: Unless obvious from circumstances and context.

### Art. 50(3) - Emotion Recognition & Biometrics
Users of emotion recognition or biometric categorisation systems shall inform natural persons exposed thereto.

**Exception**: If authorised by law for detection, prevention, investigation of criminal offences.

### Art. 50(4) - Deepfakes & Public AI
AI-generated or manipulated content shall be disclosed to users (labeled as artificially generated/manipulated).

**Exceptions**:
- Necessary for criminal offence detection/prevention/investigation
- Artistic, satirical, fictional, or analogous purposes
- Human review or editorial responsibility in place
