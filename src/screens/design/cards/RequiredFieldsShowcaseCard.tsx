import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../../../components/common/Card';
import { 
  LabeledField, 
  TextInputAdapter, 
  SelectInputAdapter, 
  DateInputAdapter, 
  CheckboxInput 
} from '../../../components/common/inputs';
import { colors } from '../../../styles/colors';
import { typography } from '../../../styles/typography';
import { createSpacingStyles } from '../../../styles/spacing';

const RequiredFieldsShowcaseCard: React.FC = () => {
  // Internal state management
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    role: '',
    birthDate: '',
    terms: false,
    privacy: false,
    // Inline examples
    inlineName: '',
    inlineEmail: '',
    inlineRole: '',
  });

  // Internal handlers
  const handleTextChange = (key: string) => (value: string | number) => {
    setFormValues(prev => ({ ...prev, [key]: String(value) }));
  };

  const handleCheckboxChange = (key: string) => (value: boolean) => {
    setFormValues(prev => ({ ...prev, [key]: value }));
  };

  const roleOptions = [
    { label: 'Administrator', value: 'admin' },
    { label: 'Moderator', value: 'moderator' },
    { label: 'Participant', value: 'participant' },
    { label: 'Spectator', value: 'spectator' },
  ];

  return (
    <Card width="100%" padding={16} style={styles.showcaseCard}>
      <Text style={[typography.h3, styles.cardTitle]}>Required Fields Showcase</Text>
      <Text style={[typography.body, styles.description]}>
        Examples of form fields with required indicators (red circles) to show mandatory fields.
      </Text>
      
      {/* Text Inputs */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Text Inputs</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Full Name"
            value={formValues.name}
            onChange={handleTextChange('name')}
            placeholder="Enter your full name"
            InputComponent={TextInputAdapter}
            required={true}
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Email Address"
            value={formValues.email}
            onChange={handleTextChange('email')}
            placeholder="Enter your email"
            InputComponent={TextInputAdapter}
            required={true}
          />
        </View>
      </View>
      
      {/* Select Input */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Select Input</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="User Role"
            value={formValues.role}
            onChange={handleTextChange('role')}
            InputComponent={SelectInputAdapter}
            inputProps={{
              options: roleOptions,
            }}
            required={true}
          />
        </View>
      </View>
      
      {/* Date Input */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Date Input</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Date of Birth"
            value={formValues.birthDate}
            onChange={handleTextChange('birthDate')}
            InputComponent={DateInputAdapter}
            required={true}
          />
        </View>
      </View>
      
      {/* Checkbox Inputs */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Checkbox Inputs</Text>
        
        <View style={styles.inputField}>
          <CheckboxInput
            label="Terms & Conditions"
            value={formValues.terms}
            onChange={handleCheckboxChange('terms')}
            text="I agree to the terms and conditions"
            required={true}
          />
        </View>
        
        <View style={styles.inputField}>
          <CheckboxInput
            label="Privacy Policy"
            value={formValues.privacy}
            onChange={handleCheckboxChange('privacy')}
            text="I have read and understood the privacy policy"
            required={true}
          />
        </View>
      </View>
      
      {/* Inline Examples */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Inline Required Fields</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Full Name"
            value={formValues.inlineName}
            onChange={handleTextChange('inlineName')}
            placeholder="Enter your full name"
            InputComponent={TextInputAdapter}
            inline={true}
            required={true}
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Email Address"
            value={formValues.inlineEmail}
            onChange={handleTextChange('inlineEmail')}
            placeholder="Enter your email"
            InputComponent={TextInputAdapter}
            inline={true}
            required={true}
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="User Role"
            value={formValues.inlineRole}
            onChange={handleTextChange('inlineRole')}
            InputComponent={SelectInputAdapter}
            placeholder="Select a role"
            inputProps={{
              options: roleOptions,
            }}
            inline={true}
            required={true}
          />
        </View>
      </View>
    </Card>
  );
};

const spacingStyles = createSpacingStyles();

const styles = StyleSheet.create({
  showcaseCard: {
    ...spacingStyles.cardSpacing,
  },
  cardTitle: {
    ...spacingStyles.elementSpacing,
    color: colors.text.primary,
  },
  description: {
    ...spacingStyles.elementSpacing,
    color: colors.text.secondary,
  },
  inputSection: {
    marginBottom: 16,
  },
  subsectionTitle: {
    ...spacingStyles.subsectionSpacing,
    color: colors.text.secondary,
  },
  inputField: {
    ...spacingStyles.elementSpacing,
  },
});

export default RequiredFieldsShowcaseCard;
