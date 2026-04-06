# Block 4: GPAI (General Purpose AI) Applicability - Logic Documentation

## Overview
**Purpose**: Determines if General Purpose AI obligations apply under EU AI Act Chapter V.

**Location**: AI Inventory > AI System Data Collection > Assessment Tab > Block 4

**Regulatory Reference**: EU AI Act Chapter V (General Purpose AI Models)

---

## Input Data Sources

### Primary Input (from Profile Tab)

**Section 8, Question 1**: "GPAI Integration"
- State variable: `gpaiIntegration` ('Yes' | 'No' | 'Unknown' | '')
- Question: "Does this AI system integrate or use a General Purpose AI (GPAI) model?"
- Source: Section 8, Q1 (Technical Profile)

---

## State Variables

```typescript
// Main assessment state
const [gpaiIntegration, setGpaiIntegration] = useState<'Yes' | 'No' | 'Unknown' | ''>('');

// Systemic risk indicator (informational)
const [gpaiSystemicRisk, setGpaiSystemicRisk] = useState<'Yes' | 'No' | 'Unknown' | ''>('');

// Confirmation state
const [gpaiConfirmed, setGpaiConfirmed] = useState<boolean>(false);

// Provider determination
const [gpaiProviderAnswer, setGpaiProviderAnswer] = useState<'Yes' | 'No' | 'Not sure' | ''>('');

// Block collapse state
const [block4Collapsed, setBlock4Collapsed] = useState(false);
```

---

## Core Logic Function: `getBlock4Status()`

**Return Type**: `'De-activated' | 'Applies' | 'Not Applicable' | 'Needs Review' | 'Pending' | 'Not assessed'`

### Decision Tree

```
START
│
├─ Block 1 is Prohibited?
│  └─ YES → Return 'De-activated'
│  └─ NO → Continue
│
├─ GPAI integration question answered?
│  └─ NO (gpaiIntegration === '') → Return 'Not assessed'
│  └─ YES → Continue
│
├─ User confirmed? (gpaiConfirmed)
│  │
│  ├─ NO (not confirmed yet) → Initial assessment:
│  │  ├─ gpaiIntegration = 'Yes' → Return 'Applies'
│  │  ├─ gpaiIntegration = 'No' → Return 'Not Applicable'
│  │  └─ gpaiIntegration = 'Unknown' → Return 'Applies' (treat as Yes initially)
│  │
│  └─ YES (confirmed) → Provider determination flow:
│     │
│     ├─ Provider question not answered yet?
│     │  └─ YES (gpaiProviderAnswer === '') → Return 'Pending'
│     │
│     └─ Provider question answered:
│        ├─ gpaiProviderAnswer = 'Yes' → Return 'Applies'
│        ├─ gpaiProviderAnswer = 'No' → Return 'Not Applicable'
│        └─ gpaiProviderAnswer = 'Not sure' → Return 'Needs Review'
```

### Detailed Logic Implementation

```typescript
const getBlock4Status = (): 'De-activated' | 'Applies' | 'Not Applicable' | 'Needs Review' | 'Pending' | 'Not assessed' => {
  // Check if Block 1 resulted in Prohibited
  if (isBlock1Prohibited()) {
    return 'De-activated';
  }
  
  // Check if the GPAI integration question has been answered
  if (gpaiIntegration === '') {
    return 'Not assessed';
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
  
  // gpaiIntegration = 'No' or other values
  return 'Not Applicable';
};
```

---

## GPAI Definition & Context

### What is General Purpose AI?

**EU AI Act Definition**: An AI model that:
- Is trained with large amounts of data
- Displays general capabilities (e.g., generating text, images, audio)
- Can be adapted to a wide range of tasks
- Can be integrated into various AI systems

**Examples:**
- GPT-4, GPT-3.5 (OpenAI)
- Claude (Anthropic)
- PaLM 2, Gemini (Google)
- LLaMA (Meta)
- Mistral models
- Open-source foundational models

**Non-Examples:**
- Task-specific models (e.g., spam filter, recommendation engine)
- Traditional machine learning models
- Rule-based systems
- Narrow AI tools

---

## Assessment Flow

### Phase 1: Initial Assessment (Before Confirmation)

**Based solely on**: `gpaiIntegration` value

**Status Determination:**
```typescript
if (gpaiIntegration === 'Yes') {
  return 'Applies'; // System uses GPAI
}
if (gpaiIntegration === 'No') {
  return 'Not Applicable'; // System doesn't use GPAI
}
if (gpaiIntegration === 'Unknown') {
  return 'Applies'; // Treat unknown as potentially applies
}
if (gpaiIntegration === '') {
  return 'Not assessed'; // Question not answered yet
}
```

**UI Display:**
- Orange badge if "Yes" or "Unknown"
- Green badge if "No"
- Gray badge if not answered
- Shows "Confirm Assessment" button if answered

---

### Phase 2: Confirmation Flow

**Triggered when**: User clicks "Confirm Assessment"

**Action**: Sets `gpaiConfirmed = true`

**Next Step**: Shows provider determination question

---

### Phase 3: Provider Determination

**Question**: "Are you a GPAI provider under the EU AI Act?"

**Context Provided to User:**
"A GPAI provider is an organization that develops or trains a general-purpose AI model and makes it available to the market or puts it into service."

**Examples of Providers:**
- OpenAI (provides GPT models)
- Anthropic (provides Claude)
- Google (provides PaLM/Gemini)
- Meta (provides LLaMA)

**You are typically NOT a provider if you:**
- Only use/integrate an existing GPAI model in your system
- Fine-tune a pre-trained model for your use case
- Access GPAI through APIs

**Answer Options:**
- **Yes** - We are a GPAI provider (develop/train foundational models)
- **No** - We only use/integrate GPAI from third parties
- **Not sure** - Requires legal review

---

### Phase 4: Final Status Determination

**Based on**: `gpaiProviderAnswer` value

**Logic:**
```typescript
if (gpaiProviderAnswer === 'Yes') {
  return 'Applies';
  // Status: Orange badge
  // Message: "GPAI provider obligations apply"
}

if (gpaiProviderAnswer === 'No') {
  return 'Not Applicable';
  // Status: Green badge
  // Message: "You are a GPAI user/deployer, not a provider. Chapter V does not apply."
}

if (gpaiProviderAnswer === 'Not sure') {
  return 'Needs Review';
  // Status: Yellow badge
  // Message: "Manual review required to determine provider status"
}

if (gpaiProviderAnswer === '' && gpaiConfirmed) {
  return 'Pending';
  // Status: Blue badge
  // Message: "Please answer the provider question"
}
```

---

## Complete Status Outcomes

### Status Matrix

| gpaiIntegration | Confirmed | gpaiProviderAnswer | Final Status |
|-----------------|-----------|-------------------|--------------|
| '' (not answered) | - | - | **Not assessed** |
| 'No' | No | - | **Not Applicable** |
| 'No' | Yes | - | **Not Applicable** |
| 'Yes' | No | - | **Applies** (initial) |
| 'Yes' | Yes | '' | **Pending** |
| 'Yes' | Yes | 'Yes' | **Applies** |
| 'Yes' | Yes | 'No' | **Not Applicable** |
| 'Yes' | Yes | 'Not sure' | **Needs Review** |
| 'Unknown' | No | - | **Applies** (initial) |
| 'Unknown' | Yes | '' | **Pending** |
| 'Unknown' | Yes | 'Yes' | **Applies** |
| 'Unknown' | Yes | 'No' | **Not Applicable** |
| 'Unknown' | Yes | 'Not sure' | **Needs Review** |

---

## Systemic Risk Indicator

### Additional Question (Informational)

**Question**: "Does the GPAI model pose systemic risk?"

**State Variable**: `gpaiSystemicRisk` ('Yes' | 'No' | 'Unknown' | '')

**Purpose**: Informational only - does NOT affect status logic

**Context for User:**
"A GPAI model with systemic risk is one that has high-impact capabilities. According to the EU AI Act, this includes models:
- Trained with computational power > 10^25 FLOPs
- With capabilities comparable to frontier models
- That can cause serious incidents"

**Examples of Systemic Risk Models:**
- GPT-4
- Claude Opus
- Gemini Ultra
- Proprietary large models with > 100B parameters

**Examples of Non-Systemic Risk Models:**
- Smaller open-source models
- Task-specific fine-tuned models
- Models with < 10B parameters
- Specialized domain models

**Usage**: 
- Displayed on Result tab
- Used for reporting purposes
- May affect level of oversight required if user is a provider
- Does NOT change Block 4 status outcome

---

## UI Flow (Assessment Tab)

### Initial Display - gpaiIntegration = 'Yes'

**Shows:**
- Badge: **"Applies"** (Orange)
- Message: "This system uses or integrates a General Purpose AI model"
- Button: "Confirm Assessment"

---

### Initial Display - gpaiIntegration = 'No'

**Shows:**
- Badge: **"Not Applicable"** (Green)
- Message: "This system does not use General Purpose AI"
- No confirmation needed
- Assessment complete

---

### After Confirmation - Provider Question Appears

**UI Section:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GPAI Provider Determination
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Question: Are you a GPAI provider under the EU AI Act?

[Info icon] A GPAI provider is an organization that develops or 
trains a general-purpose AI model and makes it available to the 
market or puts it into service.

Examples of providers: OpenAI, Anthropic, Google, Meta

You are typically NOT a provider if you only use/integrate an 
existing GPAI model in your system.

○ Yes - We are a GPAI provider
○ No - We only use/integrate GPAI from third parties  
○ Not sure - Requires legal review

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### After Provider Answer - Final Status Display

**If gpaiProviderAnswer = 'Yes':**
```
Status: Applies (Orange badge)

✓ Assessment complete

Your organization is a GPAI provider. Chapter V obligations apply.

Requirements:
• Technical documentation (Art. 53)
• Copyright compliance (Art. 53)  
• Risk management if systemic risk (Art. 55)
• Model evaluation (Art. 54)
```

**If gpaiProviderAnswer = 'No':**
```
Status: Not Applicable (Green badge)

✓ Assessment complete

Your organization uses GPAI but is not a provider. 
Chapter V provider obligations do not apply to you.

Note: You may still have deployer obligations under other 
sections if your system is high-risk.
```

**If gpaiProviderAnswer = 'Not sure':**
```
Status: Needs Review (Yellow badge)

⚠ Manual review required

Determination of GPAI provider status requires legal review.

Action items:
• Consult with legal team
• Review EU AI Act Chapter V definitions
• Document provider/user relationship with GPAI model
```

---

## Systemic Risk Question (Additional Context)

**When Shown**: After provider question answered

**UI Section:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Systemic Risk Assessment (Informational)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Question: Does the GPAI model pose systemic risk?

[Info icon] Models with high-impact capabilities, such as those 
trained with > 10^25 FLOPs or with frontier model capabilities.

○ Yes - Model poses systemic risk
○ No - Model does not pose systemic risk
○ Unknown

Note: This is for reporting purposes and does not change 
your compliance obligations.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## User Journey Scenarios

### Scenario A: GPAI User (Not Provider) - Most Common Case

**Profile Setup:**
- System uses GPT-4 API (Section 8, Q1)
- `gpaiIntegration = 'Yes'`

**Flow:**
1. Block 4 shows status: **Applies** (Orange) - initial assessment
2. User clicks "Confirm Assessment"
3. Provider question appears
4. User selects: **"No - We only use/integrate GPAI from third parties"**
5. Systemic risk question appears (optional)
6. User answers systemic risk (informational)
7. Final status: **Not Applicable** (Green)
8. Message: "You are a GPAI user, not a provider. Chapter V does not apply."

**Outcome**: No GPAI provider obligations

---

### Scenario B: GPAI Provider

**Profile Setup:**
- Company develops proprietary foundational model
- `gpaiIntegration = 'Yes'`

**Flow:**
1. Block 4 shows status: **Applies** (Orange)
2. User clicks "Confirm Assessment"
3. Provider question appears
4. User selects: **"Yes - We are a GPAI provider"**
5. Systemic risk question appears
6. User answers: "Yes" (model poses systemic risk)
7. Final status: **Applies** (Orange)
8. Message: "GPAI provider obligations apply. Additional obligations due to systemic risk."

**Outcome**: Must comply with Chapter V provider obligations + systemic risk requirements

---

### Scenario C: No GPAI Integration

**Profile Setup:**
- Traditional ML model, no foundational AI used
- `gpaiIntegration = 'No'`

**Flow:**
1. Block 4 shows status: **Not Applicable** (Green)
2. No confirmation needed
3. Assessment complete

**Outcome**: Chapter V does not apply

---

### Scenario D: Unknown GPAI Integration

**Profile Setup:**
- User unsure if model qualifies as GPAI
- `gpaiIntegration = 'Unknown'`

**Flow:**
1. Block 4 shows status: **Applies** (Orange) - treat as Yes initially
2. User clicks "Confirm Assessment"
3. Provider question appears
4. User selects: **"Not sure - Requires legal review"**
5. Final status: **Needs Review** (Yellow)
6. Message: "Manual review required to determine GPAI provider status"

**Outcome**: Escalates to compliance team for determination

---

### Scenario E: Confirmed GPAI User, Uncertain Provider Status

**Profile Setup:**
- System definitely uses GPAI
- `gpaiIntegration = 'Yes'`
- User uncertain about provider status

**Flow:**
1. Block 4 shows status: **Applies** (Orange)
2. User clicks "Confirm Assessment"
3. Provider question appears
4. User selects: **"Not sure - Requires legal review"**
5. Final status: **Needs Review** (Yellow)

**Outcome**: Legal team reviews and makes final determination

---

## Status Color Mapping

```typescript
function getBlock4StatusColor(status: string) {
  switch (status) {
    case 'De-activated':
      return 'gray'; // bg-[#F0F1F2] text-[#B5BCC4]
    case 'Applies':
      return 'orange'; // bg-[#FFF3E0] text-[#E65100]
    case 'Not Applicable':
      return 'green'; // bg-[#E8F5E9] text-[#2E7D32]
    case 'Needs Review':
      return 'yellow'; // bg-[#FFF9E6] text-[#F57C00]
    case 'Pending':
      return 'blue'; // Special state during provider question
    case 'Not assessed':
      return 'gray'; // bg-[#F0F1F2] text-[#B5BCC4]
  }
}
```

---

## State Reset Logic

Block 4 automatically resets when relevant Profile field changes:

```typescript
useEffect(() => {
  setGpaiConfirmed(false);
  setGpaiProviderAnswer('');
  // Note: gpaiSystemicRisk is NOT reset (informational only)
}, [gpaiIntegration]);
```

**Reset Triggers:**
- `gpaiIntegration` changes

**What Gets Reset:**
- Confirmation state
- Provider answer
- Status recalculated

**What Does NOT Reset:**
- `gpaiSystemicRisk` (informational field, can persist)

**Purpose**: Ensure assessment reflects current Profile data

---

## Upstream Dependencies

### From Block 1
```typescript
if (isBlock1Prohibited()) {
  return 'De-activated';
}
```

**Effect**: If Block 1 status = 'Prohibited', Block 4 is de-activated

### From Profile Tab
**Required field:**
- Section 8, Q1: GPAI Integration

**Validation**: Status returns 'Not assessed' if field not answered

---

## Downstream Effects

### Impact on Compliance Requirements

**If Status = 'Applies' (Provider):**
System must comply with:
- **Article 53**: Technical documentation and information
  - Model card with detailed specifications
  - Training data documentation
  - Copyright compliance (Art. 53(1)(c))
- **Article 54**: Model evaluation and transparency
  - Public disclosure of capabilities and limitations
- **Article 55**: (If systemic risk) Additional obligations
  - Risk assessment and mitigation
  - Incident reporting
  - Cybersecurity protections

**If Status = 'Not Applicable' (User/Deployer):**
- No Chapter V provider obligations
- May still have deployer obligations if system is high-risk (see Block 2)
- Should maintain contracts/agreements with GPAI provider

### No Impact on Result Tab Structure
- Block 4 is final block in assessment
- Does not affect other blocks
- Independent determination

---

## GPAI Provider vs. Deployer/User

### You are a GPAI Provider if you:
- Develop or train a general-purpose AI model
- Make the model available on the market (commercial or open-source)
- Put the model into service
- Control the model's architecture and training

**Examples:**
- OpenAI developing GPT models
- Anthropic training Claude
- Organization training proprietary LLM for external use
- University releasing research model publicly

### You are a GPAI User/Deployer if you:
- Integrate an existing GPAI model into your system
- Access GPAI through APIs
- Fine-tune a pre-trained model for specific use case
- Use GPAI as a component in your application

**Examples:**
- Company using OpenAI API in chatbot
- App integrating Claude for customer service
- Business fine-tuning LLaMA for internal use
- Startup building on top of Anthropic API

### Gray Areas (Requires Review):
- Significantly modifying a pre-trained model
- Training a model on top of existing foundation model
- White-labeling a GPAI model
- Joint development partnerships

**Resolution**: Legal review required for "Not sure" cases

---

## Systemic Risk Thresholds

### EU AI Act Criteria for Systemic Risk

**Computational Power Threshold:**
- > 10^25 FLOPs (floating-point operations) used in training

**Capability-Based Assessment:**
- General-purpose capabilities comparable to largest models
- Capabilities that can propagate across many systems
- Potential for serious incidents at scale

**Examples of Systemic Risk Models:**
- GPT-4 (estimated > 10^25 FLOPs)
- Claude 3 Opus
- Gemini Ultra
- Models with > 100B parameters typically

**Examples of Non-Systemic Risk Models:**
- GPT-3.5
- Claude 3 Haiku
- Open-source models < 50B parameters
- Specialized/domain-specific models

**Presumption of Conformity:**
- If computational power < 10^25 FLOPs → Presumed NOT systemic risk
- If computational power > 10^25 FLOPs → May be systemic risk (further assessment)

**Note**: As of 2024, the 10^25 FLOPs threshold may be updated by EU Commission based on technological developments.

---

## Integration with Result Tab

### Result Display for Block 4

**If 'Applies' (Provider without systemic risk):**
```
Block 4: GPAI Applicability
Status: Applies (Orange badge)

Your organization is a GPAI provider.

Obligations under Chapter V:
• Technical documentation (Art. 53)
• Copyright and data governance compliance
• Model evaluation and transparency
• Public disclosure of capabilities

Next steps:
→ Review Chapter V requirements
→ Prepare technical documentation
→ Ensure copyright compliance
```

**If 'Applies' (Provider with systemic risk):**
```
Block 4: GPAI Applicability
Status: Applies (Orange badge)

Your organization is a GPAI provider with SYSTEMIC RISK model.

Enhanced obligations under Chapter V:
• All standard provider obligations (Art. 53-54)
• Risk assessment and mitigation (Art. 55)
• Incident monitoring and reporting
• Cybersecurity protections
• Regular model evaluations

⚠ Additional oversight and requirements apply due to systemic risk classification.

Next steps:
→ Implement risk management system
→ Establish incident monitoring
→ Prepare for regulatory scrutiny
```

**If 'Not Applicable' (User/Deployer):**
```
Block 4: GPAI Applicability
Status: Not Applicable (Green badge)

Your organization uses GPAI but is not a provider.

Chapter V provider obligations do not apply.

Note: If your system is classified as high-risk (Block 2), 
you still have deployer obligations under Chapters III-IV.

Your responsibilities as GPAI user:
• Maintain contracts with GPAI provider
• Ensure provider compliance with Chapter V
• Document GPAI model used in system
```

**If 'Needs Review':**
```
Block 4: GPAI Applicability
Status: Needs Review (Yellow badge)

Manual review required to determine GPAI provider status.

Action items:
☐ Consult with legal/compliance team
☐ Review EU AI Act Chapter V definitions
☐ Assess relationship with GPAI model
☐ Document provider/user determination
☐ Update assessment with final decision
```

---

## Validation Rules

### Before Assessment
- Section 8, Q1 must be answered
- Cannot assess if `gpaiIntegration === ''`

### During Confirmation
- No additional validation needed
- Confirmation simply opens provider question

### Provider Question
- Must select one option
- Cannot proceed without answering if confirmed
- "Not sure" is valid answer (triggers review)

### Systemic Risk Question
- Optional (informational only)
- Does not block assessment completion
- Can be answered or left blank

---

## Evidence Requirements

**Note**: Block 4 does NOT require evidence upload.

**Rationale**: 
- Provider determination is binary (Yes/No/Not sure)
- Evidence maintained separately:
  - Contracts with GPAI providers (if user)
  - Technical documentation (if provider)
  - Model cards and specifications

**Alternative**: Evidence can be uploaded in Profile Section 8 or maintained in separate compliance documentation.

---

## Business Rules

### Automatic User Classification
**If `gpaiProviderAnswer === 'No'`:**
- System automatically classifies as GPAI user/deployer
- No provider obligations
- Focus compliance on deployer requirements (if high-risk)

### Provider Obligations Hierarchy
**Standard Provider** (`gpaiSystemicRisk === 'No'`):
- Articles 53-54 apply
- Moderate oversight level

**Systemic Risk Provider** (`gpaiSystemicRisk === 'Yes'`):
- Articles 53-55 apply
- Enhanced oversight
- Additional risk management requirements
- Regular reporting to authorities

### User Obligations (Outside Chapter V)
Even if Block 4 = 'Not Applicable':
- User may have deployer obligations (Chapters III-IV)
- User must ensure GPAI provider compliance
- User liable for system outputs and impacts

---

## Progressive Disclosure Behavior

### Collapsed State
- Header shows: "Block 4: GPAI Applicability"
- Current status badge visible
- Click to expand

### Expanded State
- GPAI integration answer visible
- Provider determination (if confirmed)
- Systemic risk answer (if provided)
- Can modify answers (triggers reset)

### Pending State
When status = 'Pending':
- Badge shows "Pending" in blue
- Message: "Please answer the provider question to complete assessment"
- Provider question section highlighted

---

## Data Persistence

### Fields Saved to System Record
- `gpaiIntegration`: 'Yes' | 'No' | 'Unknown' | ''
- `gpaiConfirmed`: Boolean
- `gpaiProviderAnswer`: 'Yes' | 'No' | 'Not sure' | ''
- `gpaiSystemicRisk`: 'Yes' | 'No' | 'Unknown' | '' (informational)
- Final status: Result of `getBlock4Status()`

### Audit Trail
Should log:
- Timestamp of confirmation
- User who confirmed
- Provider determination
- Systemic risk assessment
- Status changes

---

## Edge Cases

### 1. Unknown GPAI Integration
**Scenario**: `gpaiIntegration = 'Unknown'`
- Treated as 'Yes' for initial assessment
- Shows status: 'Applies' (Orange)
- Requires confirmation and provider determination
- "Not sure" answer for provider → 'Needs Review'

**Rationale**: Conservative approach - assume GPAI applies until proven otherwise

### 2. Provider Says "Not Sure"
**Scenario**: `gpaiProviderAnswer = 'Not sure'`
- Status: 'Needs Review' (Yellow)
- Does NOT block Result tab
- Flags for legal review
- Final determination made offline

### 3. No GPAI but Systemic Risk Answered
**Scenario**: 
- `gpaiIntegration = 'No'`
- User somehow answered systemic risk question

**Handling**: 
- Systemic risk answer ignored (not applicable)
- Status: 'Not Applicable'
- No impact on outcome

### 4. Provider Changes GPAI Integration Answer
**Scenario**:
- Initially answered 'Yes', confirmed, answered provider question
- Changes Profile answer to 'No'

**Effect**:
- State reset triggered
- `gpaiConfirmed` → false
- `gpaiProviderAnswer` → ''
- Status recalculated → 'Not Applicable'
- Previous answers cleared

---

## Regulatory Context

### EU AI Act Chapter V Structure

**Article 51**: Defines GPAI and GPAI model
**Article 52**: Defines GPAI with systemic risk
**Article 53**: Obligations for GPAI providers
**Article 54**: Transparency obligations
**Article 55**: Additional obligations for systemic risk models
**Article 56**: Codes of practice
**Article 57**: AI Office oversight

### Provider Obligations Summary

**All Providers (Art. 53):**
- Technical documentation of model
- Copyright compliance documentation
- Training data summary
- Evaluation procedures

**Systemic Risk Providers (Art. 55):**
- Model evaluation (adversarial testing, capability assessment)
- Risk assessment and mitigation
- Incident tracking and reporting
- Adequate cybersecurity protections
- Cooperation with AI Office

---

## Compliance Implications

### If Status = 'Applies' (Provider)
**Immediate Actions:**
1. Review Chapter V requirements
2. Establish technical documentation process
3. Implement copyright compliance measures
4. Develop model evaluation framework
5. Prepare for AI Office oversight

**If Systemic Risk:**
6. Implement risk management system
7. Set up incident monitoring
8. Establish security protocols
9. Prepare regular reporting

### If Status = 'Not Applicable' (User)
**Immediate Actions:**
1. Document GPAI model being used
2. Review contract with GPAI provider
3. Verify provider's EU AI Act compliance
4. Ensure appropriate license/access rights
5. Focus on deployer obligations (if high-risk)

### If Status = 'Needs Review'
**Immediate Actions:**
1. Engage legal/compliance team
2. Analyze GPAI model relationship
3. Review development vs. usage activities
4. Document decision-making process
5. Make final provider determination
6. Update assessment

---

## Assessment Completion

### Block 4 is Final Assessment Block
- No blocks follow Block 4
- Completing Block 4 finalizes entire Assessment tab
- User can proceed to Result tab after Block 4 completion

### Completion Criteria
**For 'Not Applicable' (No GPAI):**
- Status determined from Profile answer alone
- No confirmation needed
- ✓ Complete

**For 'Applies' or 'Not Applicable' (Yes GPAI):**
- Profile answer: 'Yes' or 'Unknown'
- Confirmation: ✓ Complete
- Provider question: Answered
- ✓ Complete

**For 'Needs Review':**
- Profile answer: Provided
- Confirmation: ✓ Complete
- Provider question: Answered ('Not sure')
- ✓ Complete (flagged for review)

**For 'Pending':**
- Profile answer: Provided
- Confirmation: ✓ Complete
- Provider question: ❌ Not answered
- ✗ Incomplete

---

## Result Tab Integration

### Final Assessment Summary
Result tab aggregates all 4 blocks:

```
ASSESSMENT RESULTS

Block 1: Prohibited Practices → [Status]
Block 2: High-Risk Classification → [Status]
Block 3: Transparency Obligation → [Status]
Block 4: GPAI Applicability → [Status]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Overall Compliance Profile:
• Risk Level: [High-risk / Not high-risk]
• Prohibited: [Yes / No]
• Transparency Required: [Yes / No]
• GPAI Provider: [Yes / No]

Applicable Requirements:
[List of relevant EU AI Act chapters and articles]

Next Steps:
[Action items based on assessment outcomes]
```

Block 4 contributes GPAI provider status to overall profile.

---

## Simplicity vs. Other Blocks

### Why Block 4 is Simpler

**Compared to Blocks 1-3:**
- **Single primary input** (GPAI integration)
- **Binary determination** (Provider or not)
- **No complex exemption tests** (like Block 2, 3)
- **No multi-case scenarios** (like Block 3)
- **Informational only** (systemic risk)

**Rationale**: 
GPAI applicability is more straightforward:
- Either you develop models (provider) or use them (deployer)
- Fewer gray areas than prohibited practices or transparency
- Chapter V obligations are clear-cut

### Still Important
Despite simplicity:
- Critical for foundational model providers
- Significant obligations if 'Applies'
- Affects entire AI industry supply chain
- New regulatory territory (Chapter V is novel)

---

## Future Considerations

### Potential Updates to Logic

**As EU AI Act Implementation Evolves:**
1. **FLOP threshold adjustments**: 10^25 FLOPs may be updated
2. **Clarifications on provider definition**: Edge cases resolved
3. **Systemic risk criteria refinement**: Additional factors added
4. **Code of practice requirements**: May affect assessment

**System should be flexible** to incorporate:
- Updated thresholds
- New guidelines from EU AI Office
- Case law and precedents
- Industry best practices

---

## Summary Table: Complete Block 4 Logic

| Profile Input | Confirmed | Provider Answer | Systemic Risk | Final Status | Color |
|---------------|-----------|-----------------|---------------|--------------|-------|
| '' | - | - | - | Not assessed | Gray |
| No | - | - | - | Not Applicable | Green |
| Yes | No | - | - | Applies (initial) | Orange |
| Yes | Yes | '' | - | Pending | Blue |
| Yes | Yes | Yes | No | Applies | Orange |
| Yes | Yes | Yes | Yes | Applies (enhanced) | Orange |
| Yes | Yes | No | - | Not Applicable | Green |
| Yes | Yes | Not sure | - | Needs Review | Yellow |
| Unknown | No | - | - | Applies (initial) | Orange |
| Unknown | Yes | '' | - | Pending | Blue |
| Unknown | Yes | Yes | - | Applies | Orange |
| Unknown | Yes | No | - | Not Applicable | Green |
| Unknown | Yes | Not sure | - | Needs Review | Yellow |

**Note**: Systemic risk value is informational and affects compliance details but not core status determination.

---

This completes the comprehensive logic documentation for Block 4: GPAI Applicability.
