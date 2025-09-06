import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, Animated, Platform } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

const Button = ({
  children,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'medium',
  borderRadius = 'light',
  style,
  textStyle,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isHovered) {
      Animated.loop(
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: Platform.OS !== 'web',
        })
      ).start();
    } else {
      animationValue.setValue(0);
    }
  }, [isHovered, animationValue]);

  const handlePressIn = () => {
    if (disabled || loading) return;
    setIsHovered(true);
  };

  const handlePressOut = () => {
    if (disabled || loading) return;
    setIsHovered(false);
  };

  const handlePress = () => {
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
  const handleMouseEnter = () => {
    if (Platform.OS === 'web' && !disabled && !loading) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (Platform.OS === 'web' && !disabled && !loading) {
      setIsHovered(false);
    }
  };

  const getButtonStyles = () => {
    const baseStyles = [styles.button, styles[`${variant}Button`]];
    
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

  const getTextStyles = () => {
    const baseTextStyles = [styles.buttonText, styles[`${variant}ButtonText`]];
    
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

  const getHoveredStyles = () => {
    if (!isHovered) return {};
    
    // Ensure variant exists and has the 500 shade
    const variantColors = colors[variant];
    if (!variantColors || !variantColors[500]) {
      console.warn(`Invalid variant: ${variant}. Using primary as fallback.`);
      return {
        backgroundColor: colors.primary[500],
        borderColor: colors.primary[500],
      };
    }
    
    return {
      backgroundColor: variantColors[500],
      borderColor: variantColors[500],
    };
  };

  const getHoveredTextStyles = () => {
    if (!isHovered) return {};
    
    return {
      color: colors.text.inverse,
    };
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <Animated.View
        style={[
          ...getButtonStyles(),
          getHoveredStyles(),
          style,
        ]}
      >
        {/* Animated diagonal lines background */}
        {isHovered && (
          <Animated.View
            style={[
              styles.animatedBackground,
              {
                transform: [
                  {
                    translateX: animationValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-100, 100],
                    }),
                  },
                ],
              },
            ]}
          />
        )}
        
        {loading ? (
          <ActivityIndicator 
            color={isHovered ? colors.text.inverse : (variant === 'primary' ? colors.text.inverse : (colors[variant]?.[700] || colors.primary[700]))} 
            size="small" 
          />
        ) : (
          <Text style={[...getTextStyles(), getHoveredTextStyles(), textStyle]}>
            {children}
          </Text>
        )}
      </Animated.View>
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
    overflow: 'hidden', // For animated background
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
  
  // Primary button (solid fill)
  primaryButton: {
    backgroundColor: colors.primary[500],
    borderWidth: 1,
    borderColor: colors.primary[500],
  },
  primaryButtonText: {
    color: colors.text.inverse,
  },
  
  // Secondary button (outline with primary colors)
  secondaryButton: {
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.primary[500],
  },
  secondaryButtonText: {
    color: colors.primary[500],
  },
  
  // Success button (outline)
  successButton: {
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.success[500],
  },
  successButtonText: {
    color: colors.success[500],
  },
  
  // Warning button (outline)
  warningButton: {
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.warning[500],
  },
  warningButtonText: {
    color: colors.warning[500],
  },
  
  // Danger button (outline)
  dangerButton: {
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.error[500],
  },
  dangerButtonText: {
    color: colors.error[500],
  },
  
  // Animated background for hover effect
  animatedBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    // Create diagonal lines effect using pseudo-elements
    // This is a simplified version - in a real app you might use a more complex pattern
  },
});

export default Button;
