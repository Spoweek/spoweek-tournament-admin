// components/LabeledField.tsx
import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

export type Roundness = 'small' | 'pill';

export type InputAdapterProps<T = any> = {
  value: T;
  onChange: (val: T) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: any;
};

export type LabeledFieldProps<T = any> = {
  label: string;
  inline?: boolean;
  roundness?: Roundness;

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
  small: 8,
  pill: 9999,
} as const;

export function LabeledField<T = any>({
  label,
  inline = false,
  roundness = 'small',
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
  const radius = BORDER_RADIUS[roundness];

  return (
    <View style={[styles.container, inline && styles.inlineContainer, containerStyle]}>
      <Text style={[styles.label, inline && styles.inlineLabel, labelStyle]}>{label}</Text>

      <View
        style={[
          styles.inputWrapper,
          { borderRadius: radius },
          inline && styles.inlineInputWrapper,
          disabled && styles.disabled,
          inputContainerStyle,
        ]}
      >
        <InputComponent
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          style={styles.input}
          {...inputProps}
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
    alignItems: 'center',
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  inlineLabel: {
    marginBottom: 0,
    width: '20%',
    paddingRight: 8,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inlineInputWrapper: {
    flex: 1,
  },
  disabled: {
    opacity: 0.6,
  },
  input: {
    minHeight: 20,
  },
});

export default LabeledField;
