// components/TextInputAdapter.tsx
import React from 'react';
import { TextInput, TextInputProps, View, StyleSheet } from 'react-native';
import ValidationIndicator from '../components/ValidationIndicator';
import type { InputAdapterProps } from './LabeledField';

// Create a type that omits the conflicting onChange from TextInputProps
type TextInputAdapterProps = Omit<TextInputProps, 'onChange'> & InputAdapterProps<string> & {
  id?: string;
  name?: string;
  doLiveValidation?: boolean;
  validationType?: 'email' | 'phone' | 'none';
};

const TextInputAdapter: React.FC<TextInputAdapterProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
  style,
  id,
  name,
  doLiveValidation = true,
  validationType = 'none',
  ...rest // <- this allows any extra TextInput props
}) => {
  // Email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Get validation state based on type
  const getValidationState = (): { isValid: boolean; show: boolean } => {
    if (!doLiveValidation || validationType === 'none' || !value) {
      return { isValid: false, show: false };
    }

    switch (validationType) {
      case 'email':
        return { isValid: isValidEmail(value), show: value.length > 0 };
      case 'phone':
        // Basic phone validation - you can make this more sophisticated
        return { isValid: value.length >= 10, show: value.length > 0 };
      default:
        return { isValid: false, show: false };
    }
  };

  const validationState = getValidationState();

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        editable={!disabled}
        style={[style, validationState.show && styles.inputWithValidation]}
        nativeID={id}
        accessibilityLabel={name}
        {...rest} // <- pass all extra props through
      />
      <ValidationIndicator
        isValid={validationState.isValid}
        show={validationState.show}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  inputWithValidation: {
    paddingRight: 30, // Make room for validation icon
  },
});

export default TextInputAdapter;
