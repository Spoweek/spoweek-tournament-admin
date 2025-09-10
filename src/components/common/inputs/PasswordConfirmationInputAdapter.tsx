import React, { useState, useMemo, useCallback } from 'react';
import { TextInput, TextInputProps, View, StyleSheet } from 'react-native';
import ValidationIndicator from '../components/ValidationIndicator';
import ToggleVisibility from '../components/ToggleVisibility';
import IconContainer from '../components/IconContainer';
import { colors } from '../styles';
import type { InputAdapterProps } from './LabeledField';

// Create a type that omits the conflicting onChange from TextInputProps
export type PasswordConfirmationInputAdapterProps = Omit<TextInputProps, 'onChange'> & InputAdapterProps<string> & {
  id?: string;
  name?: string;
  doLiveValidation?: boolean;
  showPasswordToggle?: boolean;
  passwordToMatch?: string; // The password to match against
};

const PasswordConfirmationInputAdapter: React.FC<PasswordConfirmationInputAdapterProps> = ({
  value,
  onChange,
  placeholder = 'Confirm your password',
  disabled,
  style,
  id,
  name,
  doLiveValidation = true,
  showPasswordToggle = true,
  passwordToMatch,
  ...rest // <- this allows any extra TextInput props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  // Password confirmation validation
  const isValidPasswordConfirmation = (password: string, confirmation: string): boolean => {
    return password === confirmation && confirmation.length > 0;
  };

  // Get validation state
  const getValidationState = (): { isValid: boolean; show: boolean } => {
    if (!doLiveValidation || !value || !passwordToMatch) {
      return { isValid: false, show: false };
    }
    return { 
      isValid: isValidPasswordConfirmation(passwordToMatch, value), 
      show: value.length > 0 
    };
  };

  const validationState = getValidationState();

  return (
    <View style={[styles.container, styles.wrapper]}>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          editable={!disabled}
          secureTextEntry={!showPassword}
          style={[styles.input, validationState.show && styles.inputWithValidation, style]}
          nativeID={id}
          accessibilityLabel={name}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="password"
          {...rest} // <- pass all extra props through
        />
        {useMemo(() => (
          <IconContainer>
            <ValidationIndicator
              isValid={validationState.isValid}
              show={validationState.show}
              absolute={false}
            />
            {showPasswordToggle && (
              <ToggleVisibility
                isVisible={showPassword}
                onToggle={handleTogglePassword}
                disabled={disabled}
                absolute={false}
              />
            )}
          </IconContainer>
        ), [validationState.isValid, validationState.show, showPasswordToggle, showPassword, disabled])}
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
  inputContainer: {
    position: 'relative',
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingRight: 30, // Make room for toggle button and validation icon
  },
  inputWithValidation: {
    paddingRight: 50, // Extra room for both toggle and validation
  },
});

export default PasswordConfirmationInputAdapter;
