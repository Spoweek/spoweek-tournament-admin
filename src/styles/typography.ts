import { colors, type Colors } from './colors';
import { TextStyle } from 'react-native';

// Font families
export interface FontFamilies {
  primary: string;
  secondary: string;
  fallback: string;
}

export const fontFamilies: FontFamilies = {
  primary: 'NotoSansKR_400Regular',
  secondary: 'sans-serif',
  fallback: 'system',
};

// Font sizes
export interface FontSizes {
  xs: number;
  sm: number;
  base: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
  '5xl': number;
  '6xl': number;
}

export const fontSizes: FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
};

// Font weights - using React Native compatible types
export interface FontWeights {
  light: TextStyle['fontWeight'];
  normal: TextStyle['fontWeight'];
  medium: TextStyle['fontWeight'];
  semibold: TextStyle['fontWeight'];
  bold: TextStyle['fontWeight'];
  extrabold: TextStyle['fontWeight'];
  black: TextStyle['fontWeight'];
}

export const fontWeights: FontWeights = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: 'bold',
  extrabold: '800',
  black: '900',
};

// Line heights
export interface LineHeights {
  tight: number;
  normal: number;
  relaxed: number;
  loose: number;
}

export const lineHeights: LineHeights = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
};

// Typography style interface - extending React Native TextStyle
export interface TypographyStyle extends Partial<TextStyle> {
  fontFamily: string;
  fontSize: number;
  fontWeight: TextStyle['fontWeight'];
  lineHeight: number;
  color: string;
}

// Global default styles
export const globalStyles: TypographyStyle = {
  fontFamily: fontFamilies.primary,
  fontSize: fontSizes.base,
  fontWeight: fontWeights.normal,
  lineHeight: lineHeights.normal,
  color: colors.text.primary,
};

// Typography styles
export interface Typography {
  h1: TypographyStyle;
  h2: TypographyStyle;
  h3: TypographyStyle;
  h4: TypographyStyle;
  h5: TypographyStyle;
  h6: TypographyStyle;
  body: TypographyStyle;
  bodyLarge: TypographyStyle;
  bodySmall: TypographyStyle;
  label: TypographyStyle;
  caption: TypographyStyle;
  link: TypographyStyle;
  button: TypographyStyle;
  buttonSecondary: TypographyStyle;
  success: TypographyStyle;
  warning: TypographyStyle;
  error: TypographyStyle;
  input: TypographyStyle;
  placeholder: TypographyStyle;
}

export const typography: Typography = {
  // Headings
  h1: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes['5xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    color: colors.text.primary,
  },
  
  h2: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    color: colors.text.primary,
  },
  
  h3: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.normal,
    color: colors.text.primary,
  },
  
  h4: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.normal,
    color: colors.text.primary,
  },
  
  h5: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
    color: colors.text.primary,
  },
  
  h6: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
    color: colors.text.primary,
  },

  // Body text
  body: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
    color: colors.text.primary,
  },
  
  bodyLarge: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.relaxed,
    color: colors.text.primary,
  },
  
  bodySmall: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
    color: colors.text.secondary,
  },

  // Labels and captions
  label: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
    color: colors.text.primary,
  },
  
  caption: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
    color: colors.text.tertiary,
  },

  // Interactive text
  link: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
    color: colors.primary[500],
    textDecorationLine: 'underline',
  },
  
  button: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
    color: colors.text.inverse,
  },
  
  buttonSecondary: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
    color: colors.text.primary,
  },

  // Status text
  success: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
    color: colors.success[700],
  },
  
  warning: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
    color: colors.warning[700],
  },
  
  error: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
    color: colors.error[700],
  },

  // Input text
  input: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.sm, // Changed from base (16px) to sm (14px)
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
    color: colors.text.primary,
  },
  
  placeholder: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.sm, // Changed from base (16px) to sm (14px)
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
    color: colors.text.tertiary,
  },
};

// Spacing scale
export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
  '5xl': number;
}

export const spacing: Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
  '5xl': 128,
};

// Border radius scale
export interface BorderRadius {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  full: number;
}

export const borderRadius: BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

// Shadow styles
export interface ShadowStyle {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface Shadows {
  sm: ShadowStyle;
  md: ShadowStyle;
  lg: ShadowStyle;
}

export const shadows: Shadows = {
  sm: {
    shadowColor: colors.shadow.light,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  md: {
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  lg: {
    shadowColor: colors.shadow.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
};

export default typography;
