import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import TouchableScreenArea from '../../components/TouchableScreenArea';
import { colors, shadows } from '../../styles';

interface HueSliderProps {
  hue: number;
  onHueChange: (hue: number) => void;
  width?: number;
  height?: number;
}

const HueSlider: React.FC<HueSliderProps> = ({
  hue: initialHue,
  onHueChange,
  width = 200,
  height = 20,
}) => {
  const [hue, setHue] = useState(initialHue);

  // Update internal state when props change
  useEffect(() => {
    setHue(initialHue);
  }, [initialHue]);

  const handlePress = (event: any) => {
    const x = event.x;
    const newHue = Math.max(0, Math.min(360, (x / width) * 360));
    setHue(newHue);
    onHueChange(newHue);
  };

  return (
    <View style={[styles.container, 
        styles.shadow]}>
      <TouchableScreenArea
        style={StyleSheet.flatten([
          styles.hueSlider,
          { width, height }
        ])}
        onPress={handlePress}
        onDrag={handlePress}
      >
        {/* Rainbow gradient using CSS linear-gradient for web */}
        <View style={styles.hueSliderGradient}>
        </View>
        <View
          style={[
            styles.hueSliderThumb,
            { left: (hue / 360) * width }
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
  hueSlider: {
    height: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  hueSliderGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...(Platform.OS === 'web' ? {
      backgroundImage: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
    } as any : {
      backgroundColor: colors.background.primary,
    }),
  },
  hueSliderThumb: {
    position: 'absolute',
    top: -2,
    width: 8,
    height: 24,
    transform: [{ translateX: -4 }],
    backgroundColor: 'black',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'white',
  },
  shadow: shadows.small,
});

export default HueSlider;
