import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Animated,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
  animationSpeed = 200, // Duration in milliseconds
  animationColors = ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.3)'], // Array of colors for gradient
  animationAngle = 45, // Angle in degrees
  style,
  textStyle,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationValue] = useState(new Animated.Value(0));
  const [textColor, setTextColor] = useState(null);

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
      // Two-stage animation: fill then solidify
      Animated.sequence([
        // Stage 1: Gradient sweeps across (0 to 0.7)
        Animated.timing(animationValue, {
          toValue: 0.7,
          duration: animationSpeed * 0.6, // 60% of total time for fill
          useNativeDriver: Platform.OS !== 'web',
        }),
        // Stage 2: Solidify to solid color (0.7 to 1)
        Animated.timing(animationValue, {
          toValue: 1,
          duration: animationSpeed * 0.4, // 40% of total time for solidify
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start();
    } else {
      animationValue.setValue(0);
    }
  }, [isHovered, animationValue, animationSpeed]);

  // Listen to animation value changes to update text color
  useEffect(() => {
    const listener = animationValue.addListener(({ value }) => {
      const buttonColors = getButtonColors();
      
      if (value < 0.7) {
        // Stay button color until 0.7
        setTextColor(buttonColors[500]);
      } else {
        // Fade from button color to white between 0.7 and 1.0
        const fadeProgress = (value - 0.7) / 0.3; // 0 to 1 between 0.7 and 1.0
        
        // Fade smoothly from button color to white between 0.7 and 1.0
        // fadeProgress goes from 0 to 1 as value goes from 0.7 to 1.0
        // Use multiple steps for smoother transition
        if (fadeProgress < 0.33) {
          setTextColor(buttonColors[500]); // 0.7 to 0.8
        } else if (fadeProgress < 0.66) {
          setTextColor(buttonColors[500]); // 0.8 to 0.9
        } else {
          setTextColor(colors.text.inverse); // 0.9 to 1.0
        }
      }
    });

    return () => {
      animationValue.removeListener(listener);
    };
  }, [animationValue, getButtonColors]);

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
    
    // Only apply solid fill after 0.7 (70% of animation)
    return {
      backgroundColor: animationValue.interpolate({
        inputRange: [0, 0.7, 0.7, 1],
        outputRange: [colors.background.primary, colors.background.primary, buttonColors[500], buttonColors[500]], // Stay white until 0.7, then instantly fill
      }),
      borderColor: buttonColors[500],
    };
  };

  const getHoveredTextStyles = () => {
    if (!isHovered) return {};
    
    // Use the state-based text color
    return {
      color: textColor,
    };
  };

  // Create a sweeping gradient effect by animating the gradient's position
  const angle = animationAngle;
  const radians = (angle * Math.PI) / 180;
  
  // Calculate the gradient sweep position
  const sweepPosition = animationValue.interpolate({
    inputRange: [0, 0.7],
    outputRange: [-200, 200], // Move from left to right across the button
  });
  
  // Create gradient points for diagonal sweep
  const gradientPoints = {
    start: { x: Math.sin(radians), y: -Math.cos(radians) },
    end: { x: -Math.sin(radians), y: Math.cos(radians) },
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
        {/* Simple gradient background */}
        {isHovered && (
          <Animated.View style={styles.animatedGradient}>
            <Animated.View
              style={[
                styles.gradientContainer,
                {
                  width: animationValue.interpolate({
                    inputRange: [0, 0.7],
                    outputRange: ['0%', '100%'], // Animate width from 0% to 100%
                  }),
                  opacity: animationValue.interpolate({
                    inputRange: [0.7, 1],
                    outputRange: [1, 0], // Fade out gradient after 0.7
                  }),
                },
              ]}
            >
              <LinearGradient
                colors={[getButtonColors()[300], 'white']} // Use lighter shade (300 instead of 500)
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientFill}
              />
            </Animated.View>
          </Animated.View>
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
  
  // Animated background container
  animatedContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  
  // Simple gradient
  animatedGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  
  gradientContainer: {
    height: '100%',
  },
  
  gradientFill: {
    width: '100%',
    height: '100%',
  },
});

export default Button;