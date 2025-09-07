// components/LabeledField.tsx
import React, { useState } from 'react';
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
};

export type LabeledFieldProps<T = any> = {
  label: string;
  inline?: boolean;
  borderRadius?: 'light' | 'full';

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
  const [elementHeight, setElementHeight] = useState(44); // Default height
  
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
      <Text style={[
        styles.label, 
        inline && styles.inlineLabel, 
        labelStyle,
        { 
          borderBottomLeftRadius: radius,
          borderTopLeftRadius: radius,
        },
        isFocused && styles.focused,
        isDropdownOpen && {
          borderColor: colors.primary[500],
        },
      ]}>{label}</Text>

      <View
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
          },
          (!inline && isDropdownOpen) && {
            borderBottomWidth: 0,
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
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  fullRounded: {
    borderRadius: 9999,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  inlineLabel: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 0,
    width: '30%',
    fontWeight: '400',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    display: 'flex',
    borderColor: colors.gray[300],
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderRightColor: colors.gray[300],
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
  },
  disabled: {
    opacity: 0.6,
  },
  input: {
    minHeight: 40,
    height: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  focused: {
    borderColor: colors.primary[500],
  },
  dropdownOpen: {
    borderColor: colors.primary[500],
  },
});

export default LabeledField;
