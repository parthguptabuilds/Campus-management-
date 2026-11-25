---
name: Futuristic Academic Minimalism
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#47464f'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#787680'
  outline-variant: '#c8c5d0'
  surface-tint: '#5b598c'
  primary: '#070235'
  on-primary: '#ffffff'
  primary-container: '#1e1b4b'
  on-primary-container: '#8683ba'
  inverse-primary: '#c4c1fb'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#000f07'
  on-tertiary: '#ffffff'
  tertiary-container: '#002819'
  on-tertiary-container: '#009d6c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e3dfff'
  primary-fixed-dim: '#c4c1fb'
  on-primary-fixed: '#181445'
  on-primary-fixed-variant: '#444173'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system delivers an advanced institutional interface balancing academic rigor with forward-looking precision. It serves university administrators, faculty, and students who require cognitive clarity under high data density.

The aesthetic is futuristic academic minimalism infused with controlled glassmorphism. It uses expansive, quiet light surfaces contrasted against deep authoritative tones, punctuated by electric energetic accents. The emotional tone is decisive, intelligent, frictionless, and prestigious.

## Colors
The palette leverages a pristine canvas to highlight mission-critical educational workflows.

- **Primary (`#1E1B4B` - Midnight Indigo):** Anchors primary brand touchpoints, structural navigation bars, executive summaries, and dominant typographic headers.
- **Secondary (`#3B82F6` - Electric Cobalt):** Guides user momentum through active interactions, primary buttons, timeline markers, and focus states.
- **Tertiary (`#10B981` - Emerald Green):** Signals validated criteria, completed course credits, successful grade submissions, and operational campus services.
- **Warning / Alert (`#F59E0B` - Warm Amber):** Highlights pending prerequisites, academic probation notices, registration deadlines, and schedule conflicts.
- **Neutral Canvas (`#F8FAFC` - Slate Off-White):** Provides a high-legibility, low-fatigue backdrop across analytical tables and dense administrative panels.
- **Surface Translucency:** Frosted glass panels utilize `rgba(255, 255, 255, 0.75)` over canvas gradients to define structural zones without visual heaviness.

## Typography
Plus Jakarta Sans renders structural headlines with modern authority and geometric balance. Inter handles dense transactional data, multi-line prose, forms, and analytical tables.

All quantitative tables, GPA tallies, schedule times, and room allocations must apply tabular lining figures (`font-variant-numeric: tabular-nums`) to maintain vertical columnar alignment.

## Layout & Spacing
The layout follows a 12-column responsive fluid grid anchored by clean mathematical hierarchy.

- **Desktop (1280px+):** 12-column grid with a fixed collapsible rail navigation (260px expanded, 72px collapsed). Canvas margins are `2rem` (`space-xl`), gutters are `1.5rem` (`space-lg`).
- **Tablet (768px - 1279px):** 8-column grid with a static iconic sidebar or compact drawer navigation. Canvas margins reduce to `1.5rem` (`space-lg`), gutters remain `1rem` (`space-md`).
- **Mobile (<768px):** 4-column single-column flow with persistent top app bar and optional bottom action sheet. Canvas margins and gutters collapse to `1rem` (`space-md`).
- **Content Blocks:** Complex academic dashboards group content in modular card clusters spanning 3, 4, 6, or 12 columns with standard gaps of `1.5rem`.

## Elevation & Depth
Depth is created through clean atmospheric layering rather than muddy drop shadows.

- **Level 0 (Base Canvas):** Background tone `#F8FAFC`, non-elevated.
- **Level 1 (Structural Glass Panels):** `background: rgba(255, 255, 255, 0.85)`, `backdrop-filter: blur(12px)`, bordered by `1px solid rgba(226, 232, 240, 0.8)`. Box shadow: `0 4px 20px -2px rgba(30, 27, 75, 0.04)`.
- **Level 2 (Hovered Cards & Actionable Modules):** `background: rgba(255, 255, 255, 0.95)`, `backdrop-filter: blur(16px)`, bordered by `1px solid rgba(59, 130, 246, 0.2)`. Box shadow: `0 10px 25px -3px rgba(30, 27, 75, 0.08)`.
- **Level 3 (Modals, Overlays & Command Palettes):** `background: #FFFFFF`, bordered by `1px solid rgba(226, 232, 240, 1)`. Box shadow: `0 20px 40px -8px rgba(30, 27, 75, 0.16)`.

## Shapes
Surfaces use a balanced `0.5rem` (8px) base radius, striking a balance between institutional clarity and contemporary software fluidity.

- Standard buttons, form fields, and dropdown containers use the default base radius `0.5rem`.
- Structural content cards, analytical dashboards, and modal viewports use `rounded-lg` (`1rem` / 16px).
- Status tags, role indicators, counter pills, and active filter chips strictly use fully rounded caps (`9999px` / pill-shaped) to clearly delineate metadata badges from interactive rectangular targets.

## Components

### Buttons
- **Primary:** Solid `#1E1B4B` background, white label text, `0.5rem` radius. On hover, background shifts to `#3B82F6` with subtle translateY(-1px) translation and a soft cobalt glow.
- **Secondary / Subtle:** `rgba(59, 130, 246, 0.08)` fill, `#3B82F6` text, no border. On hover, fills to `rgba(59, 130, 246, 0.15)`.
- **Ghost:** Transparent fill, `#1E1B4B` text. On hover, fills to `rgba(30, 27, 75, 0.04)`.

### Chips & Badges
- **Status Pills:** Fully rounded (`rounded-full`), `space-xs` vertical padding, `space-sm` horizontal padding. Font: `label-sm`.
- **Types:**
  - *Active / Success:* Tinted `#ECFDF5` background with `#10B981` text.
  - *Warning / Urgent:* Tinted `#FFFBEB` background with `#F59E0B` text.
  - *System / Informational:* Tinted `#EFF6FF` background with `#3B82F6` text.

### Form Inputs & Selectors
- Background: `#FFFFFF` with a crisp `1px solid #CBD5E1` border.
- Radius: `0.5rem`. Text: `body-md`. Padding: `0.625rem 0.875rem`.
- Focus State: Border transitions to `#3B82F6` accompanied by an electric ring `0 0 0 3px rgba(59, 130, 246, 0.18)`.
- Trailing Icons: Monochrome `#64748B` for calendar pickers, search loupes, and clear buttons.

### Checkboxes & Radios
- Size: 18x18px. Border: `1.5px solid #94A3B8`.
- Checked State: Solid `#3B82F6` fill with an optical-white SVG checkmark or radio dot. Radius: Checkboxes use 4px (`rounded-sm`), radio buttons use 50% circle.

### Cards & Analytical Panels
- Composed using Level 1 Glassmorphism: `rgba(255, 255, 255, 0.85)` fill, 16px corner radius (`rounded-lg`), subtle hairline stroke `#E2E8F0`.
- Padding: Internal `space-lg` (`1.5rem`).
- Header: Divided by a low-opacity `1px solid rgba(226, 232, 240, 0.6)` border with uppercase tracking-wide section subheadings (`label-sm`).

### Specialized Domain Components
- **Academic Schedule Timetable:** Sticky left-axis hours with translucent course blocks shaded according to department color-codes, featuring tabular start/end indicators.
- **Student Profile Snapshot:** Header card containing an elevated avatar frame, cohort pill, dynamic GPA radial gauge, and electric cobalt quick-action toolbar.