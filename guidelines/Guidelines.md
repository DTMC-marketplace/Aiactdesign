**Add your own guidelines here**
<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->



## Overview
This folder contains the Multi-Agent AI governance dashboard templates.
You are an experienced UI/UX designer and front-end developer designing a dashboard for digital compliance reporting incuding EU AI Act, Data Act, GDPR and DSA
Your role is building the most comprehensive design for DPO or chief compliance/data protection officer to manage and report on digital compliance.
You will always check other files in governance_test and templates folder to get the latest design and update your design accordingly as well similar html files that you can use to inspire from.
DO NEVER Modify governance_test folder as it is the origin design

Access login
admin / mE3YAn7CpbsGTM4w26DkhrQjuFdXPfVK

## Files
- `photos/` - Assets folder containing SVG icons and images
Check the Project Structure for the file structure

## Design and output
Based on Figma designs from the CBP project.
Generate HTML, CSS, and JavaScript files exactly as shown in the Figma designs under tailwind framework

## Header Structure
The header consists of two sections matching Figma node 271:11012:

### Breadcrumb Navigation (Top Bar)
- Background: #FFFFFF
- Padding: 10px 24px
- Contains:
  - Left (#F13D30) and right (#B5BCC4) arrow icons (16x16px, 50% opacity)
  - "AI use cases" breadcrumb text in red `#F13D30`
- Font: Montserrat, 14px, SemiBold (600)

### Header Content (Main Section)
- Background: #FFFFFF
- Padding: 16px 24px
- Left side:
  - Title: "Sola Multi Agent AI"
    - Font: Montserrat, 24px, Bold (700)
    - Letter-spacing: -1px
    - Color: `#1a1a2e`
  - Verified badge icon (16x16px)
  - Subtitle: "Review data and information of Sola"
    - Font: Montserrat, 16px, Regular (400)
    - Color: `#565F6C`
- Right side:
  - Avatar image (48x48px, rounded, 1px border)

## Color Palette

### Red/Accent Colors
- #FEEDEC
- #FCD7D4
- #F9B3AE
- #F78B83
- #F46258
- #F13D30 (Primary accent)
- #DC180A
- #A2150B
- #7D1109
- #580B05
- #3F0803

### Text Colors
- #464E58
- #565F6C

### Base Colors
- #FFFFFF
- #000000
- #B5BCC4

### Brand Primary (Red)
- #EEF3FD
- #DDEAF4
- #A6CCE9
- #5FA3D7
- #2C78B1
- #1A417C
- #163769
- #132F59
- #0F2648
- #081A36
- #071426

## Typography
- Font Family: **Montserrat**
- Styles:
  - DISPLAY XS/Bold: 24px, 700, line-height 32px, letter-spacing -1px
  - TEXT SM/Semibold: 14px, 600, line-height 20px
  - TEXT MD/Regular: 16px, 400, line-height 24px

## Deliverables
- A modern, responsive, and user-friendly dashboard
- SVG icons and images for the dashboard
- HTML, CSS files matching Figma design

## 🎨 Design System

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Primary Red | `#F13D30` | Accent, active states |
| Dark Red | `#DC180A` | Borders, icons |
| Light Red BG | `#FEEDEC` | Icon backgrounds |
| Text Primary | `#22262A` | Headers |
| Text Secondary | `#565F6C` | Body text |
| Border | `#E5E7EB` | Dividers, cards |
| Background | `#F5F6F8` | Page background |

### Typography
- **Font**: Montserrat
- **Weights**: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)


  
