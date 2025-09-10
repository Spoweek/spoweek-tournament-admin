import React from 'react';
import { TextInput, TextInputProps, View, StyleSheet } from 'react-native';
import ValidationIndicator from '../components/ValidationIndicator';
import type { InputAdapterProps } from './LabeledField';

// Create a type that omits the conflicting onChange from TextInputProps
export type EmailInputAdapterProps = Omit<TextInputProps, 'onChange'> & InputAdapterProps<string> & {
  id?: string;
  name?: string;
  doLiveValidation?: boolean;
};

const EmailInputAdapter: React.FC<EmailInputAdapterProps> = ({
  value,
  onChange,
  placeholder = 'example@email.com',
  disabled,
  style,
  id,
  name,
  doLiveValidation = true,
  ...rest // <- this allows any extra TextInput props
}) => {
  // Email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Get validation state
  const getValidationState = (): { isValid: boolean; show: boolean } => {
    if (!doLiveValidation || !value) {
      return { isValid: false, show: false };
    }

    return { 
      isValid: isValidEmail(value), 
      show: value.length > 0 
    };
  };

  const validationState = getValidationState();

  return (
    <View style={[styles.container, styles.wrapper]}>
        <View style={styles.container}>
        <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            editable={!disabled}
            style={[styles.input, validationState.show && styles.inputWithValidation, style]}
            nativeID={id}
            accessibilityLabel={name}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            {...rest} // <- pass all extra props through
        />
        <ValidationIndicator
            isValid={validationState.isValid}
            show={validationState.show}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    wrapper: {
        paddingRight: 16,
    },
    container: {
        position: 'relative',
        flex: 1,
    },
    input: {
        flex: 1,
    },
    inputWithValidation: {
        paddingRight: 30, // Make room for validation icon
    },
});

export default EmailInputAdapter;
