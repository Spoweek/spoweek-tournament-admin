import React, { useState, ReactNode, useRef } from 'react';
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
  Animated,
} from 'react-native';
import { colors, typography, type Colors } from '../styles'; 

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonBorderRadius = 'light' | 'full';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  children?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  colorName?: keyof Colors;
  size?: ButtonSize;
  borderRadius?: ButtonBorderRadius;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
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
  leftIcon,
  rightIcon,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const fillAnimation = useRef(new Animated.Value(0)).current;

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

  const animateFill = (toValue: number, instant = false) => {
    if (instant) {
      fillAnimation.setValue(toValue);
    } else {
      Animated.timing(fillAnimation, {
        toValue,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  };

  const handlePressIn = (): void => {
    if (disabled || loading) return;
    setIsHovered(true);
    animateFill(1);
  };

  const handlePressOut = (): void => {
    if (disabled || loading) return;
    setIsHovered(false);
    animateFill(0, true); // Instant hide
  };

  const handlePress = (): void => {
    if (disabled || loading) return;
    // Keep the effect active during the entire press
    setIsHovered(true);
    animateFill(1);
    // Call the original onPress
    if (onPress) {
      onPress();
    }
    // Reset after a short delay to show the effect
    setTimeout(() => {
      setIsHovered(false);
      animateFill(0, true); // Instant hide
    }, 200);
  };

  // Web-specific hover handlers
  const handleMouseEnter = (): void => {
    if (Platform.OS === 'web' && !disabled && !loading) {
      setIsHovered(true);
      animateFill(1);
    }
  };

  const handleMouseLeave = (): void => {
    if (Platform.OS === 'web' && !disabled && !loading) {
      setIsHovered(false);
      animateFill(0, true); // Instant hide
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
    // No text decoration for the new fill animation
    return {};
  };

  const getIconSpacing = () => {
    if (size === 'small') return 6;
    if (size === 'large') return 10;
    return 8; // medium
  };

  const getIconColor = () => {
    if (variant === 'primary') {
      return colors.text.inverse;
    } else {
      return getButtonColors()[500];
    }
  };

  const cloneIconWithColor = (icon: ReactNode) => {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement<any>, {
        color: getIconColor(),
      });
    }
    return icon;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator 
          color={variant === 'primary' ? colors.text.inverse : getButtonColors()[700]} 
          size="small" 
        />
      );
    }

    const hasText = children != null;
    const hasLeftIcon = leftIcon != null;
    const hasRightIcon = rightIcon != null;
    const iconSpacing = getIconSpacing();

    // Icon-only button
    if (!hasText && (hasLeftIcon || hasRightIcon)) {
      const iconToRender = hasLeftIcon ? leftIcon : rightIcon;
      return cloneIconWithColor(iconToRender);
    }

    // Text-only button
    if (hasText && !hasLeftIcon && !hasRightIcon) {
      return (
        <Text style={[...getTextStyles(), getHoveredTextStyles(), textStyle]}>
          {children}
        </Text>
      );
    }

    // Button with text and icons
    if (hasText) {
      return (
        <View style={styles.contentContainer}>
          {hasLeftIcon && (
            <View style={[styles.iconContainer, { marginRight: iconSpacing }]}>
              {cloneIconWithColor(leftIcon)}
            </View>
          )}
          <Text style={[...getTextStyles(), getHoveredTextStyles(), textStyle]}>
            {children}
          </Text>
          {hasRightIcon && (
            <View style={[styles.iconContainer, { marginLeft: iconSpacing }]}>
              {cloneIconWithColor(rightIcon)}
            </View>
          )}
        </View>
      );
    }

    // Fallback to text if no icons
    return (
      <Text style={[...getTextStyles(), getHoveredTextStyles(), textStyle]}>
        {children}
      </Text>
    );
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
        {/* Animated fill overlay */}
        <Animated.View
          style={[
            styles.fillOverlay,
            {
              backgroundColor: variant === 'primary' 
                ? colors.text.inverse 
                : getButtonColors()[500],
              opacity: fillAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.1],
              }),
              transform: [
                {
                  scale: fillAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
              borderRadius: borderRadius === 'full' ? 9999 : 8,
            },
          ]}
        />
        
        {renderContent()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Base button styles
  button: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    ...typography.button,
    overflow: 'hidden', // Ensure the fill animation stays within bounds
  },
  
  // Fill overlay for hover animation
  fillOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8, // Match button border radius
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
  
  // Icon layout styles
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Button;
