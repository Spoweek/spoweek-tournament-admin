import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../../../components/common/Card';
import { LabeledField, PasswordInputAdapter, PasswordCreationInput } from '../../../components/common/inputs';
import { colors, typography, spacing } from '../../../components/common';

const PasswordInputShowcaseCard: React.FC = () => {
  // Internal state management
  const [passwordValues, setPasswordValues] = useState({
    passwordWithValidation: '',
    passwordWithoutValidation: '',
    passwordWithoutToggle: '',
    passwordCreation: '',
    passwordConfirmation: '',
  });

  // Internal handlers
  const handlePasswordChange = (key: string) => (value: string) => {
    setPasswordValues(prev => ({ ...prev, [key]: value }));
  };

  const handlePasswordCreationChange = (password: string) => {
    setPasswordValues(prev => ({ ...prev, passwordCreation: password }));
  };

  const handlePasswordConfirmationChange = (passwordConfirmation: string) => {
    setPasswordValues(prev => ({ ...prev, passwordConfirmation: passwordConfirmation }));
  };

  return (
    <Card width="100%" padding={16} style={styles.showcaseCard}>
      <Text style={[typography.h3, styles.cardTitle]}>Password Input Components</Text>
      
      {/* Password Creation */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Password Creation</Text>
        
        <View style={styles.inputField}>
          <PasswordCreationInput
            password={passwordValues.passwordCreation}
            passwordConfirmation={passwordValues.passwordConfirmation}
            onPasswordChange={handlePasswordCreationChange}
            onPasswordConfirmationChange={handlePasswordConfirmationChange}
            passwordLabel="Create Password"
            passwordConfirmationLabel="Confirm Password"
            description="Your password must be at least 6 characters long and contain at least one letter, number, and special character"
            doLiveValidation={true}
            showPasswordToggle={true}
            id="showcase-password-creation"
            name="showcase-password-creation"
          />
        </View>
      </View>
      
      {/* Password Input with Validation */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Password Input with Validation</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Password with Validation"
            value={passwordValues.passwordWithValidation}
            onChange={handlePasswordChange('passwordWithValidation')}
            placeholder="Enter password with validation"
            InputComponent={PasswordInputAdapter}
            inputProps={{
              validationType: 'password',
              doLiveValidation: true,
            }}
            id="showcase-password-with-validation"
            name="showcase-password-with-validation"
          />
        </View>
      </View>
      
      {/* Password Input without Validation */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Password Input without Validation</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Password without Validation"
            value={passwordValues.passwordWithoutValidation}
            onChange={handlePasswordChange('passwordWithoutValidation')}
            placeholder="Enter password without validation"
            InputComponent={PasswordInputAdapter}
            inputProps={{
              validationType: 'password',
              doLiveValidation: false,
            }}
            id="showcase-password-without-validation"
            name="showcase-password-without-validation"
          />
        </View>
      </View>
      
      {/* Password Input without Toggle and Validation */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Password Input without Toggle and Validation</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Password without Toggle and Validation"
            value={passwordValues.passwordWithoutToggle}
            onChange={handlePasswordChange('passwordWithoutToggle')}
            placeholder="Enter password without toggle and validation"
            InputComponent={PasswordInputAdapter}
            inputProps={{
              validationType: 'password',
              doLiveValidation: false,
              showPasswordToggle: false,
            }}
            id="showcase-password-without-toggle"
            name="showcase-password-without-toggle"
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  showcaseCard: {
    marginBottom: spacing.md,
  },
  cardTitle: {
    marginBottom: spacing.md,
    color: colors.text.primary,
  },
  inputSection: {
    marginBottom: spacing.lg,
  },
  subsectionTitle: {
    marginBottom: spacing.sm,
    color: colors.text.secondary,
  },
  inputField: {
    marginBottom: spacing.md,
  },
});

export default PasswordInputShowcaseCard;
