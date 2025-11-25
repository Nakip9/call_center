# GOOD TEAM CRM - Design Style Guide

## Design Philosophy

### Visual Language
- **Professional Efficiency**: Clean, modern interface optimized for high-volume call center operations
- **Data-Driven Clarity**: Information hierarchy that prioritizes actionable insights and quick decision-making
- **Trust & Reliability**: Professional color palette and typography that instills confidence in the system
- **Accessibility First**: High contrast ratios and clear visual indicators for all user types

### Color Palette
- **Primary**: Deep Navy (#1e293b) - Professional, trustworthy foundation
- **Secondary**: Soft Blue (#3b82f6) - Interactive elements, links, buttons
- **Accent**: Emerald Green (#10b981) - Success states, positive metrics, paid status
- **Warning**: Amber (#f59e0b) - Pending items, attention needed
- **Error**: Red (#ef4444) - Failed states, urgent attention required
- **Neutral**: Gray Scale (#f8fafc to #0f172a) - Backgrounds, text, borders

### Typography
- **Display Font**: Inter Bold - Headers, titles, important metrics
- **Body Font**: Inter Regular - Body text, forms, descriptions
- **Monospace**: JetBrains Mono - Code, IDs, timestamps
- **Font Sizes**: 
  - H1: 2.5rem (40px) - Page titles
  - H2: 2rem (32px) - Section headers
  - H3: 1.5rem (24px) - Card titles
  - Body: 1rem (16px) - Standard text
  - Small: 0.875rem (14px) - Labels, captions

## Visual Effects & Styling

### Used Libraries
- **Anime.js**: Smooth micro-interactions and state transitions
- **ECharts.js**: Professional data visualization with consistent color theming
- **Pixi.js**: Subtle particle effects for background ambiance
- **Splitting.js**: Text animation effects for headers and notifications
- **Splide.js**: Smooth carousels for dashboard widgets

### Animation & Effects
- **Micro-interactions**: Subtle hover states, button presses, form validation
- **Data Transitions**: Smooth chart updates, number counting animations
- **Loading States**: Skeleton screens, progress indicators
- **Notification Animations**: Slide-in alerts, pulse effects for urgent items
- **Background**: Subtle particle system with floating geometric shapes

### Header Effect
- **Gradient Background**: Animated gradient flow from navy to deep blue
- **Floating Elements**: Subtle geometric shapes moving in parallax
- **Typography Animation**: Split-letter stagger effect on main title
- **Logo Treatment**: "GOOD TEAM" with subtle glow and scale animation

### Component Styling
- **Cards**: Clean white backgrounds with subtle shadows and rounded corners
- **Buttons**: Solid colors with smooth hover transitions and appropriate sizing
- **Forms**: Clear labels, proper spacing, validation states with color coding
- **Tables**: Alternating row colors, hover states, sortable headers
- **Modals**: Centered overlays with backdrop blur and smooth entry animations

### Dashboard Layout
- **Grid System**: Responsive 12-column grid with proper gutters
- **Widget Areas**: Flexible card-based layout for different data types
- **Navigation**: Fixed top navigation with role-based menu items
- **Sidebar**: Collapsible sidebar for secondary actions and filters
- **Footer**: Minimal footer with system status and version info

### Mobile Responsiveness
- **Breakpoints**: 
  - Mobile: 320px - 768px
  - Tablet: 768px - 1024px
  - Desktop: 1024px+
- **Touch Targets**: Minimum 44px for all interactive elements
- **Gestures**: Swipe navigation, pull-to-refresh on mobile
- **Typography**: Scalable font sizes maintaining readability

### Dark Mode Support
- **Color Inversion**: Smart color mapping for dark theme
- **Contrast Maintenance**: Ensuring 4.5:1 contrast ratio in both modes
- **Image Handling**: Proper image filtering for dark backgrounds
- **Toggle Animation**: Smooth theme transition with fade effect

### Russian Language Support
- **Font Compatibility**: Cyrillic character support in all typography
- **Text Direction**: Proper RTL handling for mixed content
- **Form Labels**: Russian translations with proper field sizing
- **Cultural UI**: Appropriate color associations and iconography

## Interactive Elements

### Hover Effects
- **Cards**: Subtle lift with shadow increase
- **Buttons**: Color shift and slight scale increase
- **Table Rows**: Background color change with smooth transition
- **Icons**: Rotation or color change effects

### Click Feedback
- **Button Press**: Brief scale down animation
- **Form Submission**: Loading spinner with success/error states
- **Navigation**: Active state indicators with smooth transitions
- **Data Actions**: Confirmation modals with backdrop blur

### State Indicators
- **Online Status**: Green dot with pulse animation
- **Notifications**: Red badge with bounce effect
- **Loading States**: Skeleton screens with shimmer effect
- **Empty States**: Illustrated placeholders with call-to-action

This design system ensures a cohesive, professional, and highly functional interface that supports the demanding environment of call center operations while maintaining visual appeal and user satisfaction.