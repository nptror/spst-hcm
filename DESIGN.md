---
name: Ethos Academy
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#44474e'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#465f88'
  primary: '#000a1e'
  on-primary: '#ffffff'
  primary-container: '#002147'
  on-primary-container: '#708ab5'
  inverse-primary: '#aec7f6'
  secondary: '#904d00'
  on-secondary: '#ffffff'
  secondary-container: '#fd8b00'
  on-secondary-container: '#603100'
  tertiary: '#070b0d'
  on-tertiary: '#ffffff'
  tertiary-container: '#1e2224'
  on-tertiary-container: '#85898c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#aec7f6'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#2d476f'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#e0e3e6'
  tertiary-fixed-dim: '#c3c7ca'
  on-tertiary-fixed: '#181c1e'
  on-tertiary-fixed-variant: '#43474a'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  blockquote:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 32px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

This design system centers on the core Vietnamese ethical values of **Cần - Kiệm - Liêm - Chính**. The brand personality is scholarly, disciplined, and purposeful. It rejects superficial decoration in favor of functional clarity and structural integrity, reflecting the virtue of *Frugality (Kiệm)*. 

The design style is **Academic Minimalism**. It utilizes generous whitespace to represent *Purity (Liêm)* and sharp, intentional layouts to represent *Righteousness (Chính)*. The emotional response should be one of quiet confidence, intellectual rigor, and accessible authority. The interface acts as a silent mentor—providing a focused environment for students to transition from theory to "Ethics in Action."

## Colors

The palette is rooted in institutional trust and youthful vitality.

*   **Deep Navy (#002147):** Used for primary branding, navigation backgrounds, and high-level headings. It signifies depth of knowledge and the stability of *Integrity*.
*   **Vibrant Orange (#FF8C00):** Used sparingly for call-to-actions, progress indicators, and interactive highlights. It represents the "Fire of Youth" and the energy required for *Diligence*.
*   **Clean White (#FFFFFF):** The dominant background color. It provides the "void" necessary for deep focus and represents *Purity*.
*   **Soft Slate (#F4F7FA):** A subtle tertiary neutral used for section grounding and card backgrounds to prevent eye strain during long study sessions.

## Typography

The design system utilizes **Inter** for its exceptional legibility and systematic feel. 

*   **Headlines:** Use tight letter-spacing and bold weights in Deep Navy to establish a strong hierarchical "voice."
*   **Body Copy:** Prioritize readability with a generous 1.5x line height. Use the "Body-LG" variant for educational content to reduce cognitive load.
*   **Labels:** All-caps labeling is used for metadata and category tags to differentiate supplementary info from core text.
*   **Ethical Blockquotes:** A specialized style for highlighting the four core virtues, featuring a left-border accent in Vibrant Orange.

## Layout & Spacing

The design system employs a **Fixed Grid** model for desktop to ensure content remains readable and scholarly, while transitioning to a **Fluid Grid** for mobile.

*   **Desktop:** 12-column grid with a 1200px max-width. Large 64px outer margins create a "frame" that focuses the eye inward.
*   **Tablet:** 8-column grid with 32px margins.
*   **Mobile:** 4-column grid with 20px margins.
*   **Rhythm:** All spacing (padding, margins, gaps) must be multiples of the 8px base unit. Vertical rhythm is strictly maintained to reflect the order and discipline of *Righteousness*.

## Elevation & Depth

This system avoids heavy shadows to remain "frugal" and flat. Depth is communicated through **Tonal Layers** and **Low-Contrast Outlines**.

*   **Level 0 (Surface):** The main background (#FFFFFF).
*   **Level 1 (Content):** Subtle light-grey containers (#F4F7FA) or 1px borders in a muted Navy (10% opacity).
*   **Interaction (Hover):** When a user interacts with a card, apply a "Lift" effect—a very soft, diffused shadow (0px 10px 20px rgba(0, 33, 71, 0.05))—to signal the element is active. 
*   **Separators:** Use thin, 1px horizontal lines rather than drop shadows to divide content sections.

## Shapes

The shape language is **Soft (0.25rem)**. 

While the brand is traditional, the slight rounding of corners makes the educational material feel approachable rather than intimidating. 
*   **Standard Elements:** 4px radius (Buttons, Inputs).
*   **Container Elements:** 8px radius (Cards, Modals).
*   **Interactive Accents:** Avoid pill shapes; maintain a structured, rectangular foundation to reflect the "straightness" of *Righteousness (Chính)*.

## Components

*   **Buttons:** Primary buttons are solid Deep Navy with White text. Secondary buttons are outlined Navy. The Vibrant Orange is reserved for "Action-Oriented" buttons like "Start Quiz" or "Submit."
*   **Interactive Cards:** Cards use a white background with a 1px #E5E9F0 border. On hover, the border color shifts to Deep Navy and the card lifts slightly.
*   **Blockquotes:** Academic quotes feature a 4px thick vertical line in Vibrant Orange on the left, set against a very faint #FFF9F2 (Orange tint) background.
*   **Input Fields:** Minimalist design with a bottom-only border that thickens and turns Deep Navy when focused. 
*   **Progress Indicators:** Vertical steppers reflect a student's journey through the "Action" modules, using Vibrant Orange to show completed tasks.
*   **Ethics Tags:** Small, square-cornered chips that label content under the four virtues (Cần, Kiệm, Liêm, Chính).