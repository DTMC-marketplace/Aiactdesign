# Block 1: Prohibited Practices Screening - Logic Documentation

## Overview
**Purpose**: Determines if the AI system engages in practices prohibited by EU AI Act Article 5.

**Location**: AI Inventory > AI System Data Collection > Assessment Tab > Block 1

---

## Input Data Sources

### Primary Input (from Profile Tab)
- **Section 7, Question 2**: "Capabilities & Triggers"
  - State variable: `capabilities` (string array)
  - Type: Multi-select checkboxes
  - Options include:
    - 8 specific prohibited practices
    - "None of the above"

---

## State Variables

```typescript
// Confirmation state
const [prohibitedConfirmed, setProhibitedConfirmed] = useState<boolean>(false);

// AI detection (if system detects potential issues)
const [aiDetectedProhibited, setAiDetectedProhibited] = useState<boolean>(false);
const [aiDetectionReason, setAiDetectionReason] = useState('');
const [aiDetectionEvidence, setAiDetectionEvidence] = useState('');
const [aiDetectionLegalBasis, setAiDetectionLegalBasis] = useState('Article 5(1)(a)');

// Exception claim flow
const [claimingException, setClaimingException] = useState<'Yes' | 'No' | ''>('');
const [exceptionChecklist, setExceptionChecklist] = useState<{[key: string]: boolean}>({});
const [exceptionEvidence, setExceptionEvidence] = useState('');
const [exceptionEvidenceLink, setExceptionEvidenceLink] = useState('');
const [exceptionEvidenceSavedLink, setExceptionEvidenceSavedLink] = useState('');
const [exceptionClaimConfirmed, setExceptionClaimConfirmed] = useState<boolean>(false);
const [exceptionQualifies, setExceptionQualifies] = useState<'Yes' | 'No' | 'Not sure' | ''>('');
const [exceptionEvidenceUploaded, setExceptionEvidenceUploaded] = useState<boolean>(false);
const [noExceptionConfirmed, setNoExceptionConfirmed] = useState<boolean>(false);

// Block collapse state
const [block1Collapsed, setBlock1Collapsed] = useState(false);
```

---

## Prohibited Practices Mapping

```typescript
const prohibitedPracticesMap: {
  [key: string]: {
    label: string;
    article: string;
    hasException: boolean;
    exceptionCondition: string | null;
  }
}
```

### Practices WITHOUT Exceptions

1. **Subliminal/manipulative/deceptive techniques**
   - Article: 5(1)(a)
   - Exception: ❌ No
   - Condition: N/A

2. **Exploitation of vulnerabilities**
   - Article: 5(1)(b)
   - Exception: ❌ No
   - Condition: N/A

3. **Social scoring**
   - Article: 5(1)(c)
   - Exception: ❌ No
   - Condition: N/A

4. **Untargeted facial image scraping**
   - Article: 5(1)(e)
   - Exception: ❌ No
   - Condition: N/A

### Practices WITH Exceptions

5. **Criminal offence risk assessment**
   - Article: 5(1)(d)
   - Exception: ✅ Yes
   - Condition: "AI system is used to support a human assessment based on objective and verifiable facts directly linked to criminal activity (not solely profiling). (Art.5(1)(d))"

6. **Emotion recognition in workplace/education**
   - Article: 5(1)(f)
   - Exception: ✅ Yes
   - Condition: "AI system is for medical or safety reasons. (Art.5(1)(f))"

7. **Biometric categorisation (sensitive traits)**
   - Article: 5(1)(g)
   - Exception: ✅ Yes
   - Condition: "AI system is for labelling or filtering of lawfully acquired biometric datasets, such as images, based on biometric data or categorizing of biometric data in the area of law enforcement. (Art.5(1)(g))"

8. **Real-time remote biometric identification (RBI)**
   - Article: 5(1)(h)
   - Exception: ✅ Yes
   - Condition: "Only if strictly necessary for one of the listed objectives (victims / imminent serious threat / serious crime suspect) and with safeguards + authorisation requirements (Art. 5(2)–(7))."

---

## Core Logic Function: `getProhibitedStatus()`

**Return Type**: `'PASS' | 'Triggered' | 'Needs Review' | 'Prohibited' | 'Exception claimed' | 'Not assessed'`

### Decision Tree

```
START
│
├─ No capabilities selected?
│  └─ YES → Return 'Not assessed'
│  └─ NO → Continue
│
├─ "None of the above" selected?
│  └─ YES → Return 'PASS'
│  └─ NO → Continue
│
├─ Prohibited practices selected?
│  └─ NO → Return 'PASS'
│  └─ YES → Continue (status = 'Triggered')
│
├─ User confirmed? (prohibitedConfirmed)
│  └─ NO → Return 'Triggered'
│  └─ YES → Continue to exception flow
│
└─ EXCEPTION FLOW:
   │
   ├─ Check if ANY selected practice has NO exception available
   │  └─ YES → Return 'Prohibited'
   │  └─ NO → Continue
   │
   ├─ User claiming exception?
   │  ├─ claimingException = 'No' → Return 'Prohibited'
   │  ├─ claimingException = 'Yes' → Continue to qualification check
   │  └─ claimingException = '' → Return 'Triggered'
   │
   └─ QUALIFICATION CHECK:
      ├─ exceptionQualifies = 'Yes'
      │  ├─ Evidence uploaded/linked? → Return 'Exception claimed'
      │  └─ No evidence → Return 'Needs Review'
      │
      ├─ exceptionQualifies = 'No' → Return 'Prohibited'
      │
      └─ exceptionQualifies = 'Not sure' → Return 'Needs Review'
```

### Detailed Logic Steps

**Step 1: Initial Assessment**
```typescript
// Check if no answer provided
if (capabilities.length === 0) {
  return 'Not assessed';
}

// Check if "None of the above" is selected
const noneSelected = capabilities.includes('None of the above');
if (noneSelected) {
  return 'PASS';
}

// Check if any prohibited practices are selected
const hasProhibitedPractices = capabilities.length > 0 && !noneSelected;
if (hasProhibitedPractices) {
  return 'Triggered'; // Initial state before confirmation
}
```

**Step 2: After Confirmation**
```typescript
if (prohibitedConfirmed) {
  // Get selected practices (excluding "None of the above")
  const selectedPractices = getSelectedProhibitedPractices();
  
  // Check if any practice has no exception available
  const hasNoExceptionPractice = selectedPractices.some(practice => {
    const practiceInfo = prohibitedPracticesMap[practice];
    return practiceInfo && !practiceInfo.hasException;
  });
  
  // Immediate prohibition if no exception possible OR user declined exception
  if (hasNoExceptionPractice || claimingException === 'No') {
    return 'Prohibited';
  }
```

**Step 3: Exception Qualification Flow**
```typescript
  // If user is claiming exception
  if (exceptionQualifies === 'Yes') {
    // Check if evidence is uploaded
    if (exceptionEvidenceUploaded || exceptionEvidenceSavedLink) {
      return 'Exception claimed'; // Successfully claimed exception
    } else {
      return 'Needs Review'; // Exception criteria met but no evidence
    }
  } else if (exceptionQualifies === 'No') {
    return 'Prohibited'; // Explicitly doesn't qualify for exception
  } else if (exceptionQualifies === 'Not sure') {
    return 'Needs Review'; // Uncertainty requires manual review
  }
}
```

---

## Helper Functions

### `getSelectedProhibitedPractices()`
Returns array of selected prohibited practices (excluding "None of the above"):
```typescript
const getSelectedProhibitedPractices = () => {
  return capabilities.filter(c => c !== 'None of the above');
};
```

### `isBlock1Prohibited()`
Returns `true` if Block 1 resulted in prohibited status:
```typescript
const isBlock1Prohibited = (): boolean => {
  const status = getProhibitedStatus();
  return status === 'Prohibited';
};
```

---

## Status Outcomes & Colors

| Status | Color | Meaning |
|--------|-------|---------|
| **PASS** | Green | No prohibited practices detected |
| **Triggered** | Orange | Prohibited practice detected, awaiting confirmation |
| **Needs Review** | Yellow | Uncertainty or missing evidence requires manual review |
| **Prohibited** | Red | System is prohibited (no exception or exception denied) |
| **Exception claimed** | Green | Valid exception claimed with evidence |
| **Not assessed** | Gray | No data provided yet |

---

## UI Flow (Assessment Tab)

### Initial Display
When `getProhibitedStatus()` returns `'Triggered'`:
- Shows warning banner with detected practices
- Lists selected prohibited practices with article references
- "Confirm Assessment" button displayed

### After Confirmation
When user clicks "Confirm", sets `prohibitedConfirmed = true`:

**If no exception available:**
- Shows "No Exception Available" message
- "Acknowledge" button sets `noExceptionConfirmed = true`
- Status → `'Prohibited'`

**If exception available:**
- Shows "Exception Claim" section
- Question: "Are you claiming an exception?"
  - Options: Yes / No
  
**If claiming exception = 'Yes':**
- Shows exception condition text
- Shows checklist of criteria (from `exceptionCondition`)
- Question: "Does this exception apply to your AI system?"
  - Options: Yes / No / Not sure
  
**If exception qualifies = 'Yes':**
- Shows evidence upload section
- Requires document upload or link
- "Confirm Evidence" button to finalize

---

## Downstream Effects

### Impact on Other Blocks
If Block 1 status = **'Prohibited'**:
- ⚠️ Block 2 status → `'De-activated'`
- ⚠️ Block 3 status → `'De-activated'`
- ⚠️ Block 4 status → `'De-activated'`

All downstream blocks become non-interactive and grayed out.

---

## Result Screen Display

### Status Mapping for Result Tab
Uses `getBlock1Status()` wrapper:
- Returns: `'Prohibited' | 'Not Prohibited' | 'Needs Review'`

**Logic:**
```typescript
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
```

### Result Display
- **Prohibited**: Red badge, requires action
- **Not Prohibited**: Green badge, system can proceed
- **Needs Review**: Yellow badge, manual review required

---

## Evidence Requirements

### Evidence Types Accepted
- Document upload (PDF, DOC, etc.)
- Link to existing document (from Section 1 uploads)
- Text description in evidence field

### Evidence Validation
- Must have either:
  - `exceptionEvidenceUploaded = true`, OR
  - `exceptionEvidenceSavedLink` is not empty
- Evidence confirmation required for `'Exception claimed'` status

---

## State Reset Triggers

Block 1 automatically resets when:
- User changes answer to Section 7, Q2 (capabilities)
- Prevents stale confirmation based on outdated data

**Reset actions:**
```typescript
useEffect(() => {
  setProhibitedConfirmed(false);
  setClaimingException('');
  setExceptionQualifies('');
  setExceptionEvidence('');
  setExceptionEvidenceLink('');
  setExceptionEvidenceSavedLink('');
  setExceptionEvidenceUploaded(false);
  setNoExceptionConfirmed(false);
}, [JSON.stringify(capabilities)]);
```

---

## Edge Cases

1. **Multiple practices selected, mixed exception availability**
   - If ANY practice has no exception → System is Prohibited
   - Cannot claim partial exceptions

2. **AI detected prohibited (not user-selected)**
   - Sets `aiDetectedProhibited = true`
   - Returns `'Needs Review'` status
   - Requires manual verification

3. **Exception claimed but evidence missing**
   - Status: `'Needs Review'`
   - Blocks final approval until evidence provided

4. **User says "Not sure" about exception qualification**
   - Status: `'Needs Review'`
   - Escalates to compliance team for determination

---

## Validation Rules

### Before Confirmation
- At least one capability must be selected
- Cannot confirm if `capabilities.length === 0`

### Exception Claim Flow
- Only triggered if:
  - Prohibited practice selected, AND
  - Practice has `hasException = true`, AND
  - User confirms assessment

### Evidence Submission
- Required only if:
  - `exceptionQualifies = 'Yes'`
  - Without evidence → Status remains `'Needs Review'`

---

## Display Components

### Assessment Tab Components
1. **Warning Banner** (if triggered)
   - Shows number of prohibited practices detected
   - Lists each practice with article reference

2. **Confirmation Section**
   - "Confirm Assessment" button
   - Displays after initial trigger

3. **Exception Section** (conditional)
   - Only shows if exception available
   - Question: "Are you claiming an exception?"

4. **Evidence Section** (conditional)
   - Only shows if `exceptionQualifies = 'Yes'`
   - Upload area or link input
   - "Confirm Evidence" button

### Result Tab Components
- **Status Badge**: Color-coded status display
- **Summary Text**: Explanation of outcome
- **Action Items**: Next steps if review needed

---

## Business Rules

### Automatic Prohibition
System is immediately prohibited if:
- Practice selected has `hasException = false`, OR
- User explicitly selects "No" for claiming exception, OR
- User selects "No" for exception qualification

### Review Required
Manual review required if:
- User selects "Not sure" for exception qualification, OR
- Exception qualifies but no evidence uploaded, OR
- AI detects potential prohibited practice not selected by user

### Exception Success
Exception successfully claimed only if:
- Practice has `hasException = true`, AND
- User claims exception ("Yes"), AND
- User confirms qualification ("Yes"), AND
- Evidence uploaded/linked, AND
- Evidence confirmation completed

---

## Status Color Mapping

```typescript
function getStatusColorClasses(statusColor: string) {
  switch (statusColor) {
    case 'green': return 'bg-[#E8F5E9] text-[#2E7D32]'; // PASS, Exception claimed
    case 'orange': return 'bg-[#FFF3E0] text-[#E65100]'; // Triggered
    case 'red': return 'bg-[#FFEBEE] text-[#C62828]';    // Prohibited
    case 'yellow': return 'bg-[#FFF9E6] text-[#F57C00]'; // Needs Review
    case 'gray': return 'bg-[#F0F1F2] text-[#B5BCC4]';   // Not assessed
  }
}
```

### Status to Color Mapping
- `'PASS'` → Green
- `'Triggered'` → Orange
- `'Needs Review'` → Yellow
- `'Prohibited'` → Red
- `'Exception claimed'` → Green
- `'Not assessed'` → Gray

---

## Integration Points

### Upstream Dependencies
- **Profile Tab, Section 7, Q2**: Must be completed before Block 1 can assess

### Downstream Dependencies
If Block 1 returns **'Prohibited'**:
- Block 2 → De-activated
- Block 3 → De-activated
- Block 4 → De-activated
- Result Tab shows prohibition as primary outcome

### Cross-Module Impact
- Compliance module may reference prohibited status
- Dashboard may show prohibited systems count
- Reporting may flag prohibited systems

---

## Complete Logic Function

```typescript
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
```

---

## User Journey

### Scenario A: No Prohibited Practices
1. User selects "None of the above" in Section 7, Q2
2. Block 1 shows status: **PASS** (Green)
3. No confirmation needed
4. Blocks 2, 3, 4 remain active

### Scenario B: Prohibited Practice (No Exception Available)
1. User selects practice like "Social scoring" (Art. 5(1)(c))
2. Block 1 shows status: **Triggered** (Orange)
3. User clicks "Confirm Assessment"
4. System shows "No Exception Available" message
5. User clicks "Acknowledge"
6. Block 1 shows status: **Prohibited** (Red)
7. Blocks 2, 3, 4 become **De-activated**

### Scenario C: Prohibited Practice (Exception Available & Claimed)
1. User selects practice like "Emotion recognition in workplace" (Art. 5(1)(f))
2. Block 1 shows status: **Triggered** (Orange)
3. User clicks "Confirm Assessment"
4. System asks "Are you claiming an exception?" → User selects "Yes"
5. System shows exception condition and checklist
6. System asks "Does this exception apply?" → User selects "Yes"
7. System shows evidence upload section
8. User uploads evidence or links document
9. User clicks "Confirm Evidence"
10. Block 1 shows status: **Exception claimed** (Green)
11. Blocks 2, 3, 4 remain active

### Scenario D: Prohibited Practice (Exception Denied)
1. User selects practice with exception available
2. Block 1 shows status: **Triggered** (Orange)
3. User clicks "Confirm Assessment"
4. System asks "Are you claiming an exception?" → User selects "No"
5. Block 1 shows status: **Prohibited** (Red)
6. Blocks 2, 3, 4 become **De-activated**

### Scenario E: Prohibited Practice (Exception Uncertain)
1. User selects practice with exception available
2. Block 1 shows status: **Triggered** (Orange)
3. User clicks "Confirm Assessment"
4. User claims exception ("Yes")
5. User selects "Not sure" for exception qualification
6. Block 1 shows status: **Needs Review** (Yellow)
7. Blocks 2, 3, 4 remain active (review doesn't block them)

---

## Data Persistence

### Fields Saved to System Record
- `capabilities`: Array of selected practices
- `prohibitedConfirmed`: Boolean
- `claimingException`: 'Yes' | 'No' | ''
- `exceptionQualifies`: 'Yes' | 'No' | 'Not sure' | ''
- `exceptionEvidence`: Text description
- `exceptionEvidenceLink`: URL string
- `exceptionEvidenceSavedLink`: Confirmed URL
- `exceptionEvidenceUploaded`: Boolean
- Final status: Result of `getProhibitedStatus()`

### Audit Trail
Should log:
- Timestamp of each status change
- User who made confirmation
- Exception claim decisions
- Evidence upload events

---

## Progressive Disclosure Behavior

### Collapsed State
- When user completes Block 1 and moves to Block 2+
- Block 1 header remains visible showing:
  - Block title
  - Current status badge
  - Chevron to expand/collapse

### Expanded State
- Shows full content when clicked
- User can review/modify answers
- Re-confirmation required if answers change

### State Persistence
- Block remains collapsed even after page refresh
- State stored in `block1Collapsed` variable
