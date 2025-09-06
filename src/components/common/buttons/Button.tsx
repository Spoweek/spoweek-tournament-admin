import React, { useState, ReactNode } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  View,
  Text,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, type Colors } from '../../../styles/colors';
import { typography } from '../../../styles/typography'; 

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonBorderRadius = 'light' | 'full';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  children: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  colorName?: keyof Colors;
  size?: ButtonSize;
  borderRadius?: ButtonBorderRadius;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  colorName,
  size = 'medium',
  borderRadius = 'light',
  style,
  textStyle,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Function to get the correct colors based on colorName or fallback to variant
  const getButtonColors = () => {
    if (colorName && colors[colorName] && '500' in colors[colorName]) {
      return colors[colorName] as any;
    }
    
    // Fallback to variant if colorName is not provided or doesn't exist
    if (colors[variant] && '500' in colors[variant]) {
      return colors[variant] as any;
    }
    
    // Final fallback to primary
    console.warn(`Color not found for colorName: ${colorName} or variant: ${variant}. Using primary.`);
    return colors.primary as any;
  };

  const handlePressIn = (): void => {
    if (disabled || loading) return;
    setIsHovered(true);
  };

  const handlePressOut = (): void => {
    if (disabled || loading) return;
    setIsHovered(false);
  };

  const handlePress = (): void => {
    if (disabled || loading) return;
    // Keep the effect active during the entire press
    setIsHovered(true);
    // Call the original onPress
    if (onPress) {
      onPress();
    }
    // Reset after a short delay to show the effect
    setTimeout(() => {
      setIsHovered(false);
    }, 200);
  };

  // Web-specific hover handlers
  const handleMouseEnter = (): void => {
    if (Platform.OS === 'web' && !disabled && !loading) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = (): void => {
    if (Platform.OS === 'web' && !disabled && !loading) {
      setIsHovered(false);
    }
  };

  const getButtonStyles = (): ViewStyle[] => {
    const buttonColors = getButtonColors();
    const baseStyles: ViewStyle[] = [styles.button];
    
    // Apply color-specific styles
    if (variant === 'primary') {
      baseStyles.push({
        backgroundColor: buttonColors[500],
        borderColor: buttonColors[500],
        borderWidth: 1,
      });
    } else {
      baseStyles.push({
        backgroundColor: colors.background.primary,
        borderColor: buttonColors[500],
        borderWidth: 1,
      });
    }
    
    // Size styles
    if (size === 'small') {
      baseStyles.push(styles.smallButton);
    } else if (size === 'large') {
      baseStyles.push(styles.largeButton);
    }
    
    // Border radius styles
    if (borderRadius === 'full') {
      baseStyles.push(styles.fullRounded);
    }
    
    // Disabled styles
    if (disabled || loading) {
      baseStyles.push(styles.disabledButton);
    }
    
    return baseStyles;
  };

  const getTextStyles = (): TextStyle[] => {
    const buttonColors = getButtonColors();
    const baseTextStyles: TextStyle[] = [styles.buttonText];
    
    // Apply color-specific text styles
    if (variant === 'primary') {
      baseTextStyles.push({
        color: colors.text.inverse,
      });
    } else {
      baseTextStyles.push({
        color: buttonColors[500],
      });
    }
    
    // Size text styles
    if (size === 'small') {
      baseTextStyles.push(styles.smallButtonText);
    } else if (size === 'large') {
      baseTextStyles.push(styles.largeButtonText);
    }
    
    // Disabled text styles
    if (disabled || loading) {
      baseTextStyles.push(styles.disabledButtonText);
    }
    
    return baseTextStyles;
  };

  const getHoveredTextStyles = (): TextStyle => {
    if (!isHovered) return {};
    
    // Simple underline on hover
    return {
      textDecorationLine: 'underline',
    };
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      {...(Platform.OS === 'web' ? {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      } : {})}
      {...props}
    >
      <View
        style={[
          ...getButtonStyles(),
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator 
            color={variant === 'primary' ? colors.text.inverse : getButtonColors()[700]} 
            size="small" 
          />
        ) : (
          <Text style={[...getTextStyles(), getHoveredTextStyles(), textStyle]}>
            {children}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Base button styles
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    ...typography.button,
  },
  
  // Size variants
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 52,
  },
  
  // Border radius variants
  fullRounded: {
    borderRadius: 9999,
  },
  
  // Disabled styles
  disabledButton: {
    opacity: 0.6,
  },
  
  // Button text styles
  buttonText: {
    ...typography.button,
    textAlign: 'center',
  },
  smallButtonText: {
    fontSize: 14,
  },
  largeButtonText: {
    fontSize: 18,
  },
  disabledButtonText: {
    opacity: 0.7,
  },
});

export default Button;
