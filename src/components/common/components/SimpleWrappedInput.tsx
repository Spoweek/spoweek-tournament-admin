import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, typography } from '../styles';

interface SimpleWrappedInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string; 
  label?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  maxLength?: number;
  style?: any;
  textAlign?: 'left' | 'center' | 'right';
}

const SimpleWrappedInput: React.FC<SimpleWrappedInputProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  keyboardType = 'default',
  maxLength,
  style,
  textAlign = 'left',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label != '' && <Text style={styles.label}>{label}</Text>}
      <View style={[
        styles.inputWrapper,
        isFocused && styles.inputWrapperFocused
      ]}>
        <TextInput
          style={[
            styles.input,
            style,
            { textAlign }
          ]}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={colors.text.tertiary}
          keyboardType={keyboardType}
          maxLength={maxLength}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: 4,
    backgroundColor: colors.background.primary,
    flex: 1,
  },
  inputWrapperFocused: {
    borderColor: colors.primary[500],
    borderWidth: 1,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: colors.text.primary,
    backgroundColor: 'transparent',
    fontFamily: 'monospace',
    borderWidth: 0,
  },
  label: {
    ...typography.body,
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
});

export default SimpleWrappedInput;
