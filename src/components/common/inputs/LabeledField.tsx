// components/LabeledField.tsx
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';
import { colors } from '../../../styles/colors';
export type InputAdapterProps<T = any> = {
  value: T;
  onChange: (val: T) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  placeholderTextColor?: string;
  disabled?: boolean;
  style?: any;
  onDropdownStateChange?: (isOpen: boolean) => void;
  inline?: boolean;
  calculatedRadius?: number;
  containerRef?: React.RefObject<any>;
};

export type LabeledFieldProps<T = any> = {
  label: string;
  inline?: boolean;
  borderRadius?: 'light' | 'full';
  required?: boolean;

  value: T;
  onChange: (val: T) => void;
  placeholder?: string;
  disabled?: boolean;

  InputComponent: React.ComponentType<InputAdapterProps<T>>;

  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputContainerStyle?: ViewStyle;
  
  // Additional props to pass to InputComponent
  inputProps?: Record<string, any>;
};

const BORDER_RADIUS = {
  light: 8,
  full: 9999,
} as const;

export function LabeledField<T = any>({
  label,
  inline = false,
  borderRadius = 'light',
  required = false,
  value,
  onChange,
  placeholder,
  disabled = false,
  InputComponent,
  containerStyle,
  labelStyle,
  inputContainerStyle,
  inputProps = {},
}: LabeledFieldProps<T>) {
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [elementHeight, setElementHeight] = useState(40); // Default height
  const inputWrapperRef = useRef<any>(null);
  
  const radius = borderRadius === 'full' ? elementHeight / 2 : BORDER_RADIUS[borderRadius];

  // Handle dropdown state changes from SelectInputAdapter
  const handleDropdownStateChange = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
  };

  // Handle layout to get actual height for pill calculation
  const handleLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setElementHeight(height);
  };

  return (
    <View style={[
      styles.container, 
      inline && styles.inlineContainer, 
      containerStyle, 
    ]}>
      <View style={[
        styles.labelContainer,
        inline && styles.inlineLabelContainer,
        { 
          borderBottomLeftRadius: radius,
          borderTopLeftRadius: radius,
        },
        isFocused && styles.focused,
        isDropdownOpen && {
          borderColor: colors.primary[500],
        },
      ]}>
        <Text style={[
          styles.label, 
          inline && styles.inlineLabel, 
          labelStyle,
        ]}>{label}</Text>
        {required && <View style={styles.requiredIndicator} />}
      </View>

      <View
        ref={inputWrapperRef}
        style={[
          styles.inputWrapper,
          { borderRadius: radius },
          inline && styles.inlineInputWrapper,
          disabled && styles.disabled,
          inputContainerStyle,
          isFocused && styles.focused,
          inline && 
          { 
            borderBottomRightRadius: radius,
            borderTopRightRadius: radius,
          },
          isDropdownOpen && {
            borderBottomRightRadius: 0,
            borderColor: colors.primary[500],
            borderBottomColor: 'white',
          },
          (!inline && isDropdownOpen) && {
            borderBottomLeftRadius: 0,
          }
        ]}
        onLayout={handleLayout}
      >
        <InputComponent
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={colors.gray[400]}
          disabled={disabled}
          style={styles.input}
          {...inputProps}
          inline={inline}
          onDropdownStateChange={handleDropdownStateChange}
          calculatedRadius={radius}
          containerRef={inputWrapperRef}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 40, // Ensure minimum height for proper centering
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    minHeight: 40, // Ensure minimum height for proper centering
  },
  fullRounded: {
    borderRadius: 9999,
  },
  labelContainer: {
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineLabelContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 0,
    width: '30%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    borderColor: colors.gray[300],
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderRightColor: colors.gray[300],
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  inlineLabel: {
    fontWeight: '400',
  },
  requiredIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.error[500],
    marginLeft: 4,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    backgroundColor: '#FFF',
  },
  inlineInputWrapper: {
    flex: 1,
    borderWidth: 0,
    borderColor: colors.gray[300],
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 0,
    justifyContent: 'center', // Center input content vertically
  },
  disabled: {
    opacity: 0.6,
  },
  input: {
    minHeight: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  focused: {
    borderColor: colors.primary[500],
  },
  dropdownOpen: {
    borderColor: colors.primary[500],
  },
});

export default LabeledField;
