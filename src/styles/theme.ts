import { colors, type Colors } from './colors';
import { typography, type Typography } from './typography';

// Component style interfaces
export interface ButtonStyle {
  backgroundColor: string;
  paddingVertical: number;
  paddingHorizontal: number;
  borderRadius: number;
  alignItems: 'center';
  justifyContent: 'center';
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  lineHeight: number;
  color: string;
}

export interface InputStyle {
  backgroundColor: string;
  borderWidth: number;
  borderColor: string;
  borderRadius: number;
  paddingHorizontal: number;
  paddingVertical: number;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  lineHeight: number;
  color: string;
}

export interface CardStyle {
  backgroundColor: string;
  borderRadius: number;
  padding: number;
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface AlertStyle {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  padding: number;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  lineHeight: number;
  color: string;
}

export interface ComponentStyles {
  button: {
    primary: ButtonStyle;
    secondary: ButtonStyle;
    disabled: ButtonStyle;
  };
  input: {
    default: InputStyle;
    focused: Partial<InputStyle>;
    error: Partial<InputStyle>;
  };
  card: {
    default: CardStyle;
  };
  alert: {
    success: AlertStyle;
    error: AlertStyle;
    warning: AlertStyle;
  };
}

export interface Layout {
  containerPadding: number;
  screenPadding: number;
  cardSpacing: number;
  sectionSpacing: number;
}

export interface Breakpoints {
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface Theme {
  colors: Colors;
  typography: Typography;
  components: ComponentStyles;
  layout: Layout;
  breakpoints: Breakpoints;
}

// Main theme object
export const theme: Theme = {
  colors,
  typography,
  
  // Common component styles
  components: {
    // Button styles
    button: {
      primary: {
        backgroundColor: colors.primary[500],
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        ...typography.button,
      },
      secondary: {
        backgroundColor: colors.neutral[200],
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        ...typography.buttonSecondary,
      },
      disabled: {
        backgroundColor: colors.neutral[300],
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        ...typography.button,
        color: colors.text.disabled,
      },
    },
    
    // Input styles
    input: {
      default: {
        backgroundColor: colors.background.primary,
        borderWidth: 1,
        borderColor: colors.neutral[300],
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        ...typography.input,
      },
      focused: {
        borderColor: colors.primary[500],
      },
      error: {
        borderColor: colors.error[500],
      },
    },
    
    // Card styles
    card: {
      default: {
        backgroundColor: colors.background.primary,
        borderRadius: 12,
        padding: 16,
        shadowColor: colors.neutral[700],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
    },
    
    // Alert styles
    alert: {
      success: {
        backgroundColor: colors.success[100],
        borderColor: colors.success[300],
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        ...typography.success,
      },
      error: {
        backgroundColor: colors.error[100],
        borderColor: colors.error[300],
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        ...typography.error,
      },
      warning: {
        backgroundColor: colors.warning[100],
        borderColor: colors.warning[300],
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        ...typography.warning,
      },
    },
  },
  
  // Layout constants
  layout: {
    containerPadding: 16,
    screenPadding: 20,
    cardSpacing: 16,
    sectionSpacing: 24,
  },
  
  // Breakpoints (for responsive design)
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
};

export default theme;
