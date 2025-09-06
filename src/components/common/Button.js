import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, ActivityIndicator, Animated, Platform } from 'react-native';
import ThemedText from './ThemedText';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

const Button = ({
  children,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  colorName, // New prop to specify the actual color to use
  size = 'medium',
  borderRadius = 'light',
  // Animation customization props
  animationSpeed = 2000, // Duration in milliseconds
  animationColors = ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.5)'], // Array of colors for lines
  animationAngle = 45, // Angle in degrees
  animationLines = 3, // Number of diagonal lines
  style,
  textStyle,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationValue] = useState(new Animated.Value(0));

  // Function to get the correct colors based on colorName or fallback to variant
  const getButtonColors = () => {
    if (colorName && colors[colorName]) {
      return colors[colorName];
    }
    
    // Fallback to variant if colorName is not provided or doesn't exist
    if (colors[variant]) {
      return colors[variant];
    }
    
    // Final fallback to primary
    console.warn(`Color not found for colorName: ${colorName} or variant: ${variant}. Using primary.`);
    return colors.primary;
  };

  useEffect(() => {
    if (isHovered) {
      Animated.loop(
        Animated.timing(animationValue, {
          toValue: 1,
          duration: animationSpeed,
          useNativeDriver: Platform.OS !== 'web',
        })
      ).start();
    } else {
      animationValue.setValue(0);
    }
  }, [isHovered, animationValue, animationSpeed]);

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
    const buttonColors = getButtonColors();
    const baseStyles = [styles.button];
    
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

  const getTextStyles = () => {
    const buttonColors = getButtonColors();
    const baseTextStyles = [styles.buttonText];
    
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

  const getHoveredStyles = () => {
    if (!isHovered) return {};
    
    const buttonColors = getButtonColors();
    
    return {
      backgroundColor: buttonColors[500],
      borderColor: buttonColors[500],
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
          <View style={styles.animatedContainer}>
            {Array.from({ length: animationLines }, (_, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.animatedLine,
                  {
                    backgroundColor: animationColors[index % animationColors.length],
                    transform: [
                      {
                        translateX: animationValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-150, 150],
                        }),
                      },
                      {
                        rotate: `${animationAngle}deg`,
                      },
                    ],
                    // Stagger the animation for each line
                    opacity: animationValue.interpolate({
                      inputRange: [0, 0.2, 0.8, 1],
                      outputRange: [0, 1, 1, 0],
                    }),
                  },
                ]}
              />
            ))}
          </View>
        )}
        
        {loading ? (
          <ActivityIndicator 
            color={isHovered ? colors.text.inverse : (variant === 'primary' ? colors.text.inverse : getButtonColors()[700])} 
            size="small" 
          />
                        ) : (
                          <ThemedText style={[...getTextStyles(), getHoveredTextStyles(), textStyle]}>
                            {children}
                          </ThemedText>
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
  
  // Animated background container
  animatedContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  
  // Individual animated line
  animatedLine: {
    position: 'absolute',
    top: '50%',
    left: -150,
    width: 400,
    height: 3,
    marginTop: -1.5,
  },
});

export default Button;
