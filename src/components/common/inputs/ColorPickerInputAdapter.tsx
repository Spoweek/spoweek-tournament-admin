import React, { useState, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Platform, ViewStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, typography, uiLayers } from '../styles';
import { useDropdown } from '../hooks';
import ModalOverlay from '../components/ModalOverlay';
import { Modal } from 'react-native';
import DropdownContainer from '../components/DropdownContainer';
import ClearButton from '../components/ClearButton';
import ChevronIcon from '../components/ChevronIcon';
import SimpleWrappedInput from '../components/SimpleWrappedInput';
import ColorScreen from './ColorScreen';
import HueSlider from './HueSlider';
import AlphaSlider from './AlphaSlider';
import type { InputAdapterProps } from './LabeledField';

export interface ColorPickerInputAdapterProps extends InputAdapterProps<string> {
  placeholder?: string;
  borderRadius?: 'light' | 'full';
  inline?: boolean;
  showClearButton?: boolean;
  onDropdownStateChange?: (isOpen: boolean) => void;
  containerRef?: React.RefObject<any>;
  id?: string;
  name?: string;
}

type ColorMode = 'hex' | 'rgb' | 'hsv' | 'hsl';

interface ColorValue {
  r: number;
  g: number;
  b: number;
  a: number;
}

// Color conversion utilities
const hexToRgb = (hex: string): ColorValue => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substr(0, 2), 16);
  const g = parseInt(cleanHex.substr(2, 2), 16);
  const b = parseInt(cleanHex.substr(4, 2), 16);
  const a = cleanHex.length === 8 ? parseInt(cleanHex.substr(6, 2), 16) / 255 : 1;
  return { r, g, b, a };
};

const rgbToHex = (color: ColorValue): string => {
  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
  const alpha = Math.round(color.a * 255).toString(16).padStart(2, '0');
  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}${alpha}`;
};

const rgbToHsv = (color: ColorValue): { h: number; s: number; v: number; a: number } => {
  const { r, g, b, a } = color;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  
  let h = 0;
  if (diff !== 0) {
    if (max === r) h = ((g - b) / diff) % 6;
    else if (max === g) h = (b - r) / diff + 2;
    else h = (r - g) / diff + 4;
  }
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  
  const s = max === 0 ? 0 : diff / max;
  const v = max / 255;
  
  return { h, s, v, a };
};

const hsvToRgb = (hsv: { h: number; s: number; v: number; a: number }): ColorValue => {
  const { h, s, v, a } = hsv;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  
  let r = 0, g = 0, b = 0;
  
  if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
  else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
  else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
  else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
  else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
  else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }
  
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
    a
  };
};

const rgbToHsl = (color: ColorValue): { h: number; s: number; l: number; a: number } => {
  const { r, g, b, a } = color;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  
  let h = 0;
  if (diff !== 0) {
    if (max === r) h = ((g - b) / diff) % 6;
    else if (max === g) h = (b - r) / diff + 2;
    else h = (r - g) / diff + 4;
  }
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  
  const l = (max + min) / 2;
  const s = l === 0 || l === 1 ? 0 : diff / (1 - Math.abs(2 * l - 1));
  
  return { h, s, l, a };
};

const hslToRgb = (hsl: { h: number; s: number; l: number; a: number }): ColorValue => {
  const { h, s, l, a } = hsl;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  
  let r = 0, g = 0, b = 0;
  
  if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
  else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
  else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
  else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
  else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
  else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }
  
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
    a
  };
};

const ColorPickerInputAdapter: React.FC<ColorPickerInputAdapterProps> = ({
  value,
  onChange,
  placeholder = '#00000000',
  disabled = false,
  borderRadius = 'light',
  style,
  onFocus,
  onBlur,
  onDropdownStateChange,
  inline = false,
  showClearButton = true,
  calculatedRadius,
  containerRef,
  id,
  name,
}) => {
  const [colorMode, setColorMode] = useState<ColorMode>('hex');
  const [manualInput, setManualInput] = useState('');
  
  const colorPickerRef = useRef<any>(null);
  const dropdownContentRef = useRef<any>(null);

  // Use shared hooks
  const { isOpen, dropdownLayout, openDropdown, closeDropdown } = useDropdown({
    onDropdownStateChange,
    containerRef,
    borderRadius,
  });

  // Parse current color value
  const currentColor = useMemo(() => {
    if (!value || value === '') return { r: 0, g: 0, b: 0, a: 1 };
    try {
      return hexToRgb(value);
    } catch {
      return { r: 0, g: 0, b: 0, a: 1 };
    }
  }, [value]);

  // Update HSV values when color changes
  // Calculate HSV and HSL values from current color
  const hsv = useMemo(() => rgbToHsv(currentColor), [currentColor]);
  const hsl = useMemo(() => rgbToHsl(currentColor), [currentColor]);

  // Get current color in different formats
  const getCurrentColorInMode = (mode: ColorMode): string => {
    switch (mode) {
      case 'hex':
        return rgbToHex(currentColor);
      case 'rgb':
        return `rgb(${Math.round(currentColor.r)}, ${Math.round(currentColor.g)}, ${Math.round(currentColor.b)})`;
      case 'hsv':
        const hsv = rgbToHsv(currentColor);
        return `hsv(${Math.round(hsv.h)}, ${Math.round(hsv.s * 100)}%, ${Math.round(hsv.v * 100)}%)`;
      case 'hsl':
        const hsl = rgbToHsl(currentColor);
        return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`;
      default:
        return rgbToHex(currentColor);
    }
  };

  const handleOpen = () => {
    if (!disabled) {
      setManualInput(getCurrentColorInMode(colorMode));
      openDropdown();
    }
  };

  const handleClose = () => {
    closeDropdown();
    onBlur?.();
  };


  const handleClear = () => {
    onChange('');
    onBlur?.();
  };

  const handleColorChange = (newColor: ColorValue) => {
    const hexValue = rgbToHex(newColor);
    onChange(hexValue);
  };

  const handleModeChange = (mode: ColorMode) => {
    setColorMode(mode);
    setManualInput(getCurrentColorInMode(mode));
  };

  const handleModeButtonPress = (mode: ColorMode) => {
    handleModeChange(mode);
  };

  const handleManualInputChange = (text: string) => {
    setManualInput(text);
    
    // Try to parse the input and update color
    try {
      if (colorMode === 'hex') {
        const newColor = hexToRgb(text);
        handleColorChange(newColor);
      }
    } catch (error) {
      // Invalid input, don't update color
    }
  };

  const handleRgbInputChange = (channel: 'r' | 'g' | 'b', text: string) => {
    const value = Math.max(0, Math.min(255, parseInt(text) || 0));
    const newColor = {
      ...currentColor,
      [channel]: value
    };
    handleColorChange(newColor);
  };

  const handleHsvInputChange = (channel: 'h' | 's' | 'v', text: string) => {
    let value = parseInt(text) || 0;
    if (channel === 'h') {
      value = Math.max(0, Math.min(360, value));
    } else {
      value = Math.max(0, Math.min(100, value)) / 100;
    }
    const newHsv = {
      ...hsv,
      [channel]: value
    };
    const newColor = hsvToRgb(newHsv);
    handleColorChange(newColor);
  };

  const handleHslInputChange = (channel: 'h' | 's' | 'l', text: string) => {
    let value = parseInt(text) || 0;
    if (channel === 'h') {
      value = Math.max(0, Math.min(360, value));
    } else {
      value = Math.max(0, Math.min(100, value)) / 100;
    }
    const newHsl = {
      ...hsl,
      [channel]: value
    };
    const newColor = hslToRgb(newHsl);
    handleColorChange(newColor);
  };


  const handleAlphaChange = (alpha: number) => {
    const newColor = { ...currentColor, a: alpha };
    handleColorChange(newColor);
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity
        ref={colorPickerRef}
        style={[
          styles.colorPickerContainer,
          disabled && styles.disabledContainer,
          { pointerEvents: 'auto' },
          style
        ]}
        onPress={handleOpen}
        disabled={disabled}
        activeOpacity={1}
        testID={id}
        accessibilityLabel={name}
      >
        <View style={styles.colorDisplay}>
          <View style={[styles.colorSwatch, { backgroundColor: value || '#000000' }]} />
          <Text style={[
            styles.colorText,
            !value && styles.placeholderText,
            disabled && styles.disabledText
          ]}>
            {value || placeholder}
          </Text>
        </View>
        
        <View style={styles.iconContainer}>
          {(value != '' && !disabled && showClearButton) && (
            <ClearButton 
              onPress={handleClear}
              disabled={disabled}
            />
          )}
          
          <Ionicons name="color-palette" size={20} color={colors.text.secondary} />
          
          <ChevronIcon 
            isOpen={isOpen}
            disabled={disabled}
          />
        </View>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="none"
        onRequestClose={handleClose}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleClose}
        >
          <TouchableOpacity 
            activeOpacity={1}
            onPress={(event) => event.stopPropagation()}
          >
            <DropdownContainer
              layout={dropdownLayout}
              borderRadius={calculatedRadius || 8}
              maxHeight={400}
            >
              <View ref={dropdownContentRef} style={styles.colorPickerDropdown}>
                <View style={styles.colorPickerContent}>

            {/* Color Screen */}
            <ColorScreen
              hue={hsv.h}
              saturation={hsv.s}
              value={hsv.v}
              onSaturationValueChange={(newSaturation, newValue) => {
                const newHsv = { h: hsv.h, s: newSaturation, v: newValue, a: currentColor.a };
                const newColor = hsvToRgb(newHsv);
                handleColorChange(newColor);
              }}
            />
              
              {/* Hue Slider */}
              <HueSlider
                hue={hsv.h}
                onHueChange={(newHue) => {
                  const newHsv = { h: newHue, s: hsv.s, v: hsv.v, a: currentColor.a };
                  const newColor = hsvToRgb(newHsv);
                  handleColorChange(newColor);
                }}
              />
            </View>

            {/* Alpha Slider */}
            <AlphaSlider
              alpha={currentColor.a}
              color={{ r: currentColor.r, g: currentColor.g, b: currentColor.b }}
              onAlphaChange={(newAlpha) => {
                const newColor = { ...currentColor, a: newAlpha };
                handleColorChange(newColor);
              }}
            />

            {/* Color Mode Selector */}
            <View style={styles.modeSelector}>
              {(['hex', 'rgb', 'hsv', 'hsl'] as ColorMode[]).map((mode) => (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.modeButton,
                    colorMode === mode && styles.activeModeButton
                  ]}
                  onPress={() => handleModeButtonPress(mode)}
                >
                  <Text style={[
                    styles.modeButtonText,
                    colorMode === mode && styles.activeModeButtonText
                  ]}>
                    {mode.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Manual Input Fields */}
            <View style={styles.manualInputSection}>
              {/* HEX Input */}
              {colorMode === 'hex' && (
                <View style={styles.inputFieldContainer}>

                    <SimpleWrappedInput
                        value={manualInput.replace('#', '')}
                        onChangeText={(text) => handleManualInputChange('#' + text)}
                        label="#"
                        placeholder="00000000"
                        maxLength={8}
                    />
                </View>
              )}

              {/* RGB Input */}
              {colorMode === 'rgb' && (
                <View style={styles.inputFieldContainer}>
                    <SimpleWrappedInput
                        value={Math.round(currentColor.r).toString()}
                        onChangeText={(text) => handleRgbInputChange('r', text)}
                        label="R"
                        placeholder="0"
                        keyboardType="numeric"
                        maxLength={3}
                        textAlign="center"
                    />
                    <SimpleWrappedInput
                        value={Math.round(currentColor.g).toString()}
                        onChangeText={(text) => handleRgbInputChange('g', text)}
                        label="G"
                        placeholder="0"
                        keyboardType="numeric"
                        maxLength={3}
                        textAlign="center"
                    />
                    <SimpleWrappedInput
                        value={Math.round(currentColor.b).toString()}
                        onChangeText={(text) => handleRgbInputChange('b', text)}
                        label="B"
                        placeholder="0"
                        keyboardType="numeric"
                        maxLength={3}
                        textAlign="center"
                    />
                </View>
              )}

              {/* HSV Input */}
              {colorMode === 'hsv' && (
                <View style={styles.inputFieldContainer}>
                    <SimpleWrappedInput
                        value={Math.round(hsv.h).toString()}
                        onChangeText={(text) => handleHsvInputChange('h', text)}
                        label="H"
                        placeholder="0"
                        keyboardType="numeric"
                        maxLength={3}
                        textAlign="center"
                    />
                    <SimpleWrappedInput
                        value={Math.round(hsv.s * 100).toString()}
                        onChangeText={(text) => handleHsvInputChange('s', text)}
                        label="S"
                        placeholder="0"
                        keyboardType="numeric"
                        maxLength={3}
                        textAlign="center"
                    />
                    <SimpleWrappedInput
                        value={Math.round(hsv.v * 100).toString()}
                        onChangeText={(text) => handleHsvInputChange('v', text)}
                        label="V"
                        placeholder="0"
                        keyboardType="numeric"
                        maxLength={3}
                        textAlign="center"
                    />
                </View>
              )}

              {/* HSL Input */}
              {colorMode === 'hsl' && (
                <View style={styles.inputFieldContainer}>
                    <SimpleWrappedInput
                        value={Math.round(hsl.h).toString()}
                        onChangeText={(text) => handleHslInputChange('h', text)}
                        label="H"
                        placeholder="0"
                        keyboardType="numeric"
                        maxLength={3}
                        textAlign="center"
                    />
                    <SimpleWrappedInput
                        value={Math.round(hsl.s * 100).toString()}
                        onChangeText={(text) => handleHslInputChange('s', text)}
                        label="S"
                        placeholder="0"
                        keyboardType="numeric"
                        maxLength={3}
                        textAlign="center"
                    />
                    <SimpleWrappedInput
                        value={Math.round(hsl.l * 100).toString()}
                        onChangeText={(text) => handleHslInputChange('l', text)}
                        label="L"
                        placeholder="0"
                        keyboardType="numeric"
                        maxLength={3}
                        textAlign="center"
                    />
                </View>
              )}
            </View>
                </View>
            </DropdownContainer>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  colorPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  disabledContainer: {
    backgroundColor: colors.neutral[100],
    opacity: 0.6,
  },
  colorDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  colorSwatch: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.neutral[300],
  },
  colorText: {
    ...typography.body,
    fontSize: 14,
    color: colors.text.primary,
    fontFamily: 'monospace',
  },
  placeholderText: {
    color: colors.text.tertiary,
    fontSize: 14,
  },
  disabledText: {
    color: colors.neutral[500],
    fontSize: 14,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  colorPickerDropdown: {
    padding: 16,
    minHeight: 400,
  },
  colorPickerContent: {
    flex: 1,
  },
  modeSelector: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 4,
  },
  modeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: colors.neutral[100],
  },
  activeModeButton: {
    backgroundColor: colors.primary[500],
  },
  modeButtonText: {
    ...typography.body,
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  activeModeButtonText: {
    color: colors.text.inverse,
  },
  manualInputSection: {
    marginBottom: 8,
  },
  inputFieldContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  inputWithPrefix: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputPrefix: {
    backgroundColor: colors.neutral[100],
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRightWidth: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputPrefixText: {
    ...typography.body,
    fontSize: 14,
    color: colors.text.tertiary,
    fontFamily: 'monospace',
  },
  hexInput: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});

export default ColorPickerInputAdapter;
