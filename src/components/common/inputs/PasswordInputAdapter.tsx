import React, { useState, useMemo, useCallback } from 'react';
import { TextInput, TextInputProps, View, StyleSheet } from 'react-native';
import ValidationIndicator from '../components/ValidationIndicator';
import ToggleVisibility from '../components/ToggleVisibility';
import IconContainer from '../components/IconContainer';
import { colors } from '../styles';
import type { InputAdapterProps } from './LabeledField';

// Create a type that omits the conflicting onChange from TextInputProps
export type PasswordInputAdapterProps = Omit<TextInputProps, 'onChange'> & InputAdapterProps<string> & {
  id?: string;
  name?: string;
  doLiveValidation?: boolean;
  showPasswordToggle?: boolean;
  validationType?: 'password' | 'none';
};

const PasswordInputAdapter: React.FC<PasswordInputAdapterProps> = ({
  value,
  onChange,
  placeholder = 'Enter password',
  disabled,
  style,
  id,
  name,
  doLiveValidation = true,
  showPasswordToggle = true,
  validationType = 'none',
  ...rest // <- this allows any extra TextInput props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  // Password validation function
  const isValidPassword = (password: string): boolean => {
    if (password.length < 6) return false;
    
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    return hasLetter && hasNumber && hasSpecialChar;
  };

  // Get validation state
  const getValidationState = (): { isValid: boolean; show: boolean } => {
    if (!doLiveValidation || validationType === 'none' || !value) {
      return { isValid: false, show: false };
    }

    switch (validationType) {
      case 'password':
        return { isValid: isValidPassword(value), show: value.length > 0 };
      default:
        return { isValid: false, show: false };
    }
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

export default PasswordInputAdapter;
