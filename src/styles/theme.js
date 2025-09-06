import colors from './colors';
import typography from './typography';

// Main theme object
export const theme = {
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
        backgroundColor: colors.input.background,
        borderWidth: 1,
        borderColor: colors.input.border,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        ...typography.input,
      },
      focused: {
        borderColor: colors.input.borderFocus,
      },
      error: {
        borderColor: colors.error[500],
      },
    },
    
    // Card styles
    card: {
      default: {
        backgroundColor: colors.card.background,
        borderRadius: 12,
        padding: 16,
        ...typography.shadows.md,
      },
    },
    
    // Alert styles
    alert: {
      success: {
        backgroundColor: colors.success[50],
        borderColor: colors.success[200],
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        ...typography.success,
      },
      error: {
        backgroundColor: colors.error[50],
        borderColor: colors.error[200],
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        ...typography.error,
      },
      warning: {
        backgroundColor: colors.warning[50],
        borderColor: colors.warning[200],
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
