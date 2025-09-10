import { Platform, ViewStyle } from 'react-native';
import { colors } from './colors';

export interface ShadowConfig {
  color?: string;
  offset?: { width: number; height: number };
  opacity?: number;
  radius?: number;
  elevation?: number;
}

/**
 * Creates cross-platform shadow styles
 * @param config Shadow configuration
 * @returns Platform-appropriate shadow styles
 */
export const createShadow = (config: ShadowConfig = {}): ViewStyle => {
  const {
    color = colors.neutral[500],
    offset = { width: 0, height: 0 },
    opacity = 0.1,
    radius = 4,
    elevation = 2,
  } = config;

  if (Platform.OS === 'web') {
    // Web uses boxShadow - convert hex to rgba
    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };
    
    return {
      boxShadow: `${offset.width}px ${offset.height}px ${radius}px ${hexToRgba(color, opacity)}`,
    };
  }

  // Mobile platforms use elevation + iOS shadow properties
  return {
    elevation,
    // iOS shadow properties
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
  };
};

// Predefined shadow presets
export const shadows = {
  small: createShadow({
    color: colors.neutral[700],
    offset: { width: 0, height: 1 },
    opacity: 0.1,
    radius: 2,
    elevation: 2,
  }),
  medium: createShadow({
    color: colors.neutral[700],
    offset: { width: 0, height: 2 },
    opacity: 0.1,
    radius: 4,
    elevation: 3,
  }),
  large: createShadow({
    color: colors.neutral[700],
    offset: { width: 0, height: 4 },
    opacity: 0.15,
    radius: 8,
    elevation: 5,
  }),
  card: createShadow({
    color: colors.neutral[700],
    offset: { width: 0, height: 0 },
    opacity: 0.1,
    radius: 40,
    elevation: 3,
  }),
  flag: createShadow({
    color: colors.neutral[700],
    offset: { width: 0, height: 0 },
    opacity: 0.2,
    radius: 8,
    elevation: 2,
  }),
};
