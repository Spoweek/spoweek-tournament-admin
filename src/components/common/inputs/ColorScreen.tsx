import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import TouchableScreenArea from '../components/TouchableScreenArea';
import { colors, shadows } from '../styles';

interface ColorScreenProps {
  hue: number;
  saturation: number;
  value: number;
  onSaturationValueChange: (saturation: number, value: number) => void;
  size?: number;
}

interface ColorScreenState {
  saturation: number;
  value: number;
}

const ColorScreen: React.FC<ColorScreenProps> = ({
  hue,
  saturation: initialSaturation,
  value: initialValue,
  onSaturationValueChange,
  size = 200,
}) => {
  const [saturation, setSaturation] = useState(initialSaturation);
  const [value, setValue] = useState(initialValue);

  // Update internal state when props change
  useEffect(() => {
    setSaturation(initialSaturation);
    setValue(initialValue);
  }, [initialSaturation, initialValue]);

  const handlePress = (event: any) => {
    const x = event.x;
    const y = event.y;
    
    // Calculate saturation and value based on position
    const newSaturation = Math.max(0, Math.min(1, x / size));
    const newValue = Math.max(0, Math.min(1, 1 - (y / size)));
    
    setSaturation(newSaturation);
    setValue(newValue);
    onSaturationValueChange(newSaturation, newValue);
  };

  return (
    <View style={[styles.container, styles.shadow]}>
      <TouchableScreenArea
        style={StyleSheet.flatten([
          styles.colorScreen,
          { 
            backgroundColor: `hsl(${hue}, 100%, 50%)`,
            width: size,
            height: size
          }
        ])}
        onPress={handlePress}
        onDrag={handlePress}
      >
        <View style={styles.colorScreenOverlay}>
          <View 
            style={[
              styles.colorScreenGradient,
              Platform.OS === 'web' ? {
                background: `linear-gradient(to right, 
                  hsl(${hue}, 0%, 100%) 0%, 
                  hsl(${hue}, 100%, 50%) 100%
                )`
              } as any : {}
            ]} 
          />
          <View 
            style={[
              styles.colorScreenValueGradient,
              Platform.OS === 'web' ? {
                background: `linear-gradient(to top,
                  rgba(0,0,0,1) 0%,
                  rgba(0,0,0,0) 100%
                )`
              } as any : {
                backgroundColor: 'rgba(0,0,0,0.5)'
              }
            ]} 
          />
        </View>
        <View
          style={[
            styles.colorScreenSelector,
            {
              left: saturation * size,
              top: (1 - value) * size,
            }
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
  colorScreen: {
    width: 200,
    height: 200,
    position: 'relative',
    overflow: 'hidden',
  },
  colorScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  colorScreenGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  colorScreenValueGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  colorScreenSelector: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
    transform: [{ translateX: -6 }, { translateY: -6 }],
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  debugInfo: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 4,
    borderRadius: 4,
  },
  debugText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  shadow: shadows.large,
});

export default ColorScreen;
