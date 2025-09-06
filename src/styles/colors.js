// Color palette for Spoweek Tournament Admin
export const colors = {
  // Primary Colors (4 shades)
  primary: {
    100: '#E3F2FD', // Lightest
    300: '#90CAF9', // Light
    500: '#3e72fb', // Main
    700: '#1e5ce8', // Dark
  },

  // Secondary Colors (4 shades) - Purple complement
  secondary: {
    100: '#F3E5F5', // Lightest
    300: '#CE93D8', // Light
    500: '#9C27B0', // Main
    700: '#7B1FA2', // Dark
  },

  // Success Colors (4 shades) - Green complement
  success: {
    100: '#E8F5E8', // Lightest
    300: '#A5D6A7', // Light
    500: '#4CAF50', // Main
    700: '#2E7D32', // Dark
  },

  // Warning Colors (4 shades) - Orange complement
  warning: {
    100: '#FFF3E0', // Lightest
    300: '#FFB74D', // Light
    500: '#FF9800', // Main
    700: '#F57C00', // Dark
  },

  // Error Colors (4 shades) - Red complement
  error: {
    100: '#FFEBEE', // Lightest
    300: '#EF9A9A', // Light
    500: '#F44336', // Main
    700: '#C62828', // Dark
  },

  // Neutral Colors (4 shades)
  neutral: {
    100: '#F5F5F5', // Lightest
    300: '#E0E0E0', // Light
    500: '#9E9E9E', // Main
    700: '#616161', // Dark
  },

  // Gray Scale
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA',
    tertiary: '#F1F3F4',
    dark: '#121212',
  },

  // Text Colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    tertiary: '#9E9E9E',
    inverse: '#FFFFFF',
    disabled: '#BDBDBD',
  },

  // Border Colors
  border: {
    light: '#E0E0E0',
    medium: '#BDBDBD',
    dark: '#757575',
    focus: '#2196F3',
  },

  // Shadow Colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.15)',
    dark: 'rgba(0, 0, 0, 0.25)',
  },

  // Status Colors
  status: {
    active: '#4CAF50',
    inactive: '#9E9E9E',
    pending: '#FF9800',
    completed: '#2196F3',
    cancelled: '#F44336',
  },

  // Tournament Specific Colors
  tournament: {
    gold: '#FFD700',
    silver: '#C0C0C0',
    bronze: '#CD7F32',
    participant: '#2196F3',
    spectator: '#9E9E9E',
  },
};

// Common color combinations for quick access
export const colorCombinations = {
  // Primary combinations
  primary: {
    background: colors.primary[500],
    text: colors.text.inverse,
    border: colors.primary[600],
  },
  
  // Success combinations
  success: {
    background: colors.success[50],
    text: colors.success[800],
    border: colors.success[200],
  },
  
  // Error combinations
  error: {
    background: colors.error[50],
    text: colors.error[800],
    border: colors.error[200],
  },
  
  // Warning combinations
  warning: {
    background: colors.warning[50],
    text: colors.warning[800],
    border: colors.warning[200],
  },
  
  // Neutral combinations
  neutral: {
    background: colors.neutral[50],
    text: colors.neutral[800],
    border: colors.neutral[200],
  },
};

// Semantic color mappings
export const semanticColors = {
  // Interactive elements
  button: {
    primary: colors.primary[500],
    secondary: colors.neutral[200],
    success: colors.success[500],
    warning: colors.warning[500],
    error: colors.error[500],
    disabled: colors.neutral[300],
  },
  
  // Form elements
  input: {
    background: colors.background.primary,
    border: colors.border.light,
    borderFocus: colors.border.focus,
    text: colors.text.primary,
    placeholder: colors.text.tertiary,
  },
  
  // Cards and containers
  card: {
    background: colors.background.primary,
    border: colors.border.light,
    shadow: colors.shadow.light,
  },
  
  // Navigation
  navigation: {
    background: colors.background.primary,
    text: colors.text.primary,
    textActive: colors.primary[500],
    border: colors.border.light,
  },
};

export default colors;
