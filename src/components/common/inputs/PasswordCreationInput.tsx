import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LabeledField, PasswordInputAdapter, PasswordConfirmationInputAdapter } from './index';
import { colors, typography, spacing } from '../styles';

export interface PasswordCreationInputProps {
  password: string;
  passwordConfirmation: string;
  onPasswordChange: (password: string) => void;
  onPasswordConfirmationChange: (passwordConfirmation: string) => void;
  passwordLabel?: string;
  passwordConfirmationLabel?: string;
  passwordPlaceholder?: string;
  passwordConfirmationPlaceholder?: string;
  description?: string;
  disabled?: boolean;
  showPasswordToggle?: boolean;
  doLiveValidation?: boolean;
  id?: string;
  name?: string;
  style?: any;
}

const PasswordCreationInput: React.FC<PasswordCreationInputProps> = ({
  password,
  passwordConfirmation,
  onPasswordChange,
  onPasswordConfirmationChange,
  passwordLabel = 'Password',
  passwordConfirmationLabel = 'Password Confirmation',
  passwordPlaceholder = 'Enter your password',
  passwordConfirmationPlaceholder = 'Confirm your password',
  description = 'Your password must be at least 6 characters long and contain at least one letter, number, and special character',
  disabled = false,
  showPasswordToggle = true,
  doLiveValidation = true,
  id,
  name,
  style,
}) => {

  return (
    <View style={[styles.container, style]}>
      {/* Password Field */}
      <View style={styles.passwordField}>
        <LabeledField
          label={passwordLabel}
          description={description}
          value={password}
          onChange={onPasswordChange}
          InputComponent={PasswordInputAdapter}
          inputProps={{
            placeholder: passwordPlaceholder,
            showPasswordToggle: showPasswordToggle,
            validationType: 'password',
            doLiveValidation: doLiveValidation,
          }}
          disabled={disabled}
          id={`${id}-password`}
          name={`${name}-password`}
        />
      </View>

      {/* Password Confirmation Field */}
      <View style={styles.passwordConfirmationField}>
        <LabeledField
          label={passwordConfirmationLabel}
          value={passwordConfirmation}
          onChange={onPasswordConfirmationChange}
          InputComponent={PasswordConfirmationInputAdapter}
          inputProps={{
            placeholder: passwordConfirmationPlaceholder,
            showPasswordToggle: showPasswordToggle,
            doLiveValidation: doLiveValidation,
            passwordToMatch: password,
          }}
          disabled={disabled}
          id={`${id}-confirmation`}
          name={`${name}-confirmation`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  passwordField: {
    marginBottom: spacing.sm,
  },
  passwordConfirmationField: {
    marginBottom: spacing.sm,
  },
});

export default PasswordCreationInput;
