// Spacing utilities for consistent spacing throughout the app

export const spacing = {
  // Base spacing unit (4px)
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

// Common spacing patterns
export const cardSpacing = {
  // Spacing between sections within a card
  section: spacing['2xl'], // 24px
  // Spacing between individual elements within a section
  element: spacing.lg, // 16px
  // Spacing between subsections
  subsection: spacing.md, // 12px
  // Spacing around the card itself
  card: spacing.lg, // 16px
  // Additional spacing values
  xs: spacing.xs, // 4px
  sm: spacing.sm, // 8px
  md: spacing.md, // 12px
  lg: spacing.lg, // 16px
  xl: spacing.xl, // 20px
  '2xl': spacing['2xl'], // 24px
} as const;

// Utility function to create consistent spacing styles
export const createSpacingStyles = () => ({
  // Card spacing
  cardSpacing: {
    marginBottom: cardSpacing.card,
  },
  // Section spacing
  sectionSpacing: {
    marginBottom: cardSpacing.section,
  },
  // Element spacing
  elementSpacing: {
    marginBottom: cardSpacing.element,
  },
  // Subsection spacing
  subsectionSpacing: {
    marginBottom: cardSpacing.subsection,
  },
});

export default spacing;
