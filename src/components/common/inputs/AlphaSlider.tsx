import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import TouchableScreenArea from '../components/TouchableScreenArea';
import { colors, shadows } from '../styles';

interface AlphaSliderProps {
  alpha: number;
  color: { r: number; g: number; b: number };
  onAlphaChange: (alpha: number) => void;
  width?: number;
  height?: number;
}

const AlphaSlider: React.FC<AlphaSliderProps> = ({
  alpha: initialAlpha,
  color,
  onAlphaChange,
  width = 200,
  height = 20,
}) => {
  const [alpha, setAlpha] = useState(initialAlpha);

  // Update internal state when props change
  useEffect(() => {
    setAlpha(initialAlpha);
  }, [initialAlpha]);

  // Create dynamic alpha gradient style
  const alphaGradientStyle = Platform.OS === 'web' ? {
    ...styles.alphaGradient,
    backgroundImage: `linear-gradient(to right, 
      rgba(${color.r}, ${color.g}, ${color.b}, 0) 0%, 
      rgba(${color.r}, ${color.g}, ${color.b}, 1) 100%)`,
  } as any : styles.alphaGradient;


  const handlePress = (event: any) => {
    const x = event.x;
    const newAlpha = Math.max(0, Math.min(1, x / width));
    console.log('Alpha slider click:', { x, newAlpha });
    setAlpha(newAlpha);
    onAlphaChange(newAlpha);
  };

  return (
    <View style={[styles.container, styles.shadow]}>
      <TouchableScreenArea
        style={StyleSheet.flatten([
          styles.alphaSlider,
          { width, height }
        ])}
        onPress={handlePress}
        onDrag={handlePress}
      >
        {/* Checkerboard background */}
        <View style={styles.checkerboardBackground}>
        </View>
        {/* Alpha gradient on top */}
        <View style={alphaGradientStyle}>
        </View>
        {/* React Native fallback - black to white gradient segments */}
        {Platform.OS !== 'web' && (
          <View style={styles.fallbackGradient}>
            {Array.from({ length: 20 }, (_, i) => {
              const opacity = i / 19;
              const segmentColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
              return (
                <View
                  key={i}
                  style={[
                    styles.gradientSegment,
                    {
                      backgroundColor: segmentColor,
                      left: `${(i / 19) * 100}%`,
                    },
                  ]}
                />
              );
            })}
          </View>
        )}
        <View
          style={[
            styles.alphaSliderThumb,
            { left: alpha * width }
          ]}
        />
      </TouchableScreenArea>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    ...(Platform.OS === 'web' ? {
      width: 'fit-content',
    } as any : {}),
  },
  alphaSlider: {
    height: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  checkerboardBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...(Platform.OS === 'web' ? {
      backgroundImage: 'repeating-conic-gradient(#ccc 0deg 90deg, transparent 90deg 180deg)',
      backgroundRepeat: 'repeat',
      backgroundSize: '12px 12px',
    } as any : {
      backgroundColor: '#f0f0f0',
    }),
  },
  alphaGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  alphaSliderThumb: {
    position: 'absolute',
    top: -2,
    width: 4,
    height: 24,
    backgroundColor: 'white',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.border.light,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  shadow: shadows.small,
  fallbackGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  gradientSegment: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '5%',
  },
});

export default AlphaSlider;
