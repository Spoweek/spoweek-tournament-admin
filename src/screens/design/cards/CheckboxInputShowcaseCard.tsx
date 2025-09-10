import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../../../components/common/Card';
import { CheckboxInput } from '../../../components/common/inputs';
import { colors, typography, spacing } from '../../../components/common';

const CheckboxInputShowcaseCard: React.FC = () => {
  // Internal state management
  const [checkboxValues, setCheckboxValues] = useState({
    basic: false,
    withText: false,
    withLabel: false,
    disabled: false,
    disabledChecked: true,
    multiple: {
      option1: false,
      option2: true,
      option3: false,
    },
    terms: false,
    newsletter: true,
    notifications: false,
    required: {
      terms: false,
      privacy: false,
      marketing: true,
    },
  });

  // Internal handler
  const handleCheckboxChange = (key: string) => (value: boolean) => {
    console.log('Checkbox changed:', key, value);
    setCheckboxValues(prev => ({ ...prev, [key]: value }));
  };

  const handleMultipleChange = (key: string) => (value: boolean) => {
    setCheckboxValues(prev => ({
      ...prev,
      multiple: { ...prev.multiple, [key]: value }
    }));
  };

  const handleRequiredChange = (key: string) => (value: boolean) => {
    setCheckboxValues(prev => ({
      ...prev,
      required: { ...prev.required, [key]: value }
    }));
  };

  return (
    <Card width="100%" padding={16} style={styles.showcaseCard}>
      <Text style={[typography.h3, styles.cardTitle]}>Checkbox Input Components</Text>
      
      {/* Basic Checkboxes */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Basic Checkboxes</Text>
        
        <View style={styles.inputField}>
          <CheckboxInput
            value={checkboxValues.basic}
            onChange={handleCheckboxChange('basic')}
            id="showcase-basic-checkbox"
            name="showcase-basic-checkbox"
          />
        </View>
        
        <View style={styles.inputField}>
          <CheckboxInput
            value={checkboxValues.withText}
            onChange={handleCheckboxChange('withText')}
            text="I agree to the terms and conditions"
            id="showcase-with-text-checkbox"
            name="showcase-with-text-checkbox"
          />
        </View>
        
        <View style={styles.inputField}>
          <CheckboxInput
            value={checkboxValues.withLabel}
            onChange={handleCheckboxChange('withLabel')}
            label="Preferences"
            text="Enable dark mode"
            id="showcase-with-label-checkbox"
            name="showcase-with-label-checkbox"
          />
        </View>
      </View>
      
      {/* Disabled States */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Disabled States</Text>
        
        <View style={styles.inputField}>
          <CheckboxInput
            value={checkboxValues.disabled}
            onChange={handleCheckboxChange('disabled')}
            text="This checkbox is disabled"
            disabled={true}
            id="showcase-disabled-checkbox"
            name="showcase-disabled-checkbox"
          />
        </View>
        
        <View style={styles.inputField}>
          <CheckboxInput
            value={checkboxValues.disabledChecked}
            onChange={handleCheckboxChange('disabledChecked')}
            text="This checkbox is disabled and checked"
            disabled={true}
            id="showcase-disabled-checked-checkbox"
            name="showcase-disabled-checked-checkbox"
          />
        </View>
      </View>
      
      {/* Multiple Options */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Multiple Options</Text>
        
        <View style={styles.inputField}>
          <CheckboxInput
            value={checkboxValues.multiple.option1}
            onChange={handleMultipleChange('option1')}
            text="Option 1"
            id="showcase-multiple-option1-checkbox"
            name="showcase-multiple-option1-checkbox"
          />
        </View>
        
        <View style={styles.inputField}>
          <CheckboxInput
            value={checkboxValues.multiple.option2}
            onChange={handleMultipleChange('option2')}
            text="Option 2 (pre-selected)"
            id="showcase-multiple-option2-checkbox"
            name="showcase-multiple-option2-checkbox"
          />
        </View>
        
        <View style={styles.inputField}>
          <CheckboxInput
            value={checkboxValues.multiple.option3}
            onChange={handleMultipleChange('option3')}
            text="Option 3"
            id="showcase-multiple-option3-checkbox"
            name="showcase-multiple-option3-checkbox"
          />
        </View>
      </View>
      
      {/* Real-world Examples */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Real-world Examples</Text>
        
        <View style={styles.inputField}>
          <CheckboxInput
            value={checkboxValues.terms}
            onChange={handleCheckboxChange('terms')}
            text="I have read and agree to the Terms of Service and Privacy Policy"
            id="showcase-terms-checkbox"
            name="showcase-terms-checkbox"
          />
        </View>
        
        <View style={styles.inputField}>
          <CheckboxInput
            value={checkboxValues.newsletter}
            onChange={handleCheckboxChange('newsletter')}
            text="Subscribe to our newsletter for updates"
            id="showcase-newsletter-checkbox"
            name="showcase-newsletter-checkbox"
          />
        </View>
        
        <View style={styles.inputField}>
          <CheckboxInput
            value={checkboxValues.notifications}
            onChange={handleCheckboxChange('notifications')}
            text="Enable push notifications"
            id="showcase-notifications-checkbox"
            name="showcase-notifications-checkbox"
          />
        </View>
      </View>
      
      {/* Required Fields */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Required Fields</Text>
        
        <View style={styles.inputField}>
          <CheckboxInput
            label="Terms & Conditions"
            value={checkboxValues.required.terms}
            onChange={handleRequiredChange('terms')}
            text="I agree to the terms and conditions"
            required={true}
            id="showcase-required-terms-checkbox"
            name="showcase-required-terms-checkbox"
          />
        </View>
        
        <View style={styles.inputField}>
          <CheckboxInput
            label="Privacy Policy"
            value={checkboxValues.required.privacy}
            onChange={handleRequiredChange('privacy')}
            text="I have read and understood the privacy policy"
            required={true}
            id="showcase-required-privacy-checkbox"
            name="showcase-required-privacy-checkbox"
          />
        </View>
        
        <View style={styles.inputField}>
          <CheckboxInput
            label="Marketing Preferences"
            value={checkboxValues.required.marketing}
            onChange={handleRequiredChange('marketing')}
            text="I consent to receive marketing communications"
            required={false}
            id="showcase-required-marketing-checkbox"
            name="showcase-required-marketing-checkbox"
          />
        </View>
      </View>
      
      {/* Form Examples */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Form Examples</Text>
        
        <View style={styles.inputField}>
          <CheckboxInput
            label="Tournament Settings"
            value={checkboxValues.multiple.option1}
            onChange={handleMultipleChange('option1')}
            text="Allow late registrations"
            id="showcase-tournament-settings-checkbox"
            name="showcase-tournament-settings-checkbox"
          />
        </View>
        
        <View style={styles.inputField}>
          <CheckboxInput
            label="Privacy Settings"
            value={checkboxValues.multiple.option2}
            onChange={handleMultipleChange('option2')}
            text="Make my profile public"
            id="showcase-privacy-settings-checkbox"
            name="showcase-privacy-settings-checkbox"
          />
        </View>
        
        <View style={styles.inputField}>
          <CheckboxInput
            label="Communication"
            value={checkboxValues.multiple.option3}
            onChange={handleMultipleChange('option3')}
            text="Send me email reminders"
            id="showcase-communication-checkbox"
            name="showcase-communication-checkbox"
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

export default CheckboxInputShowcaseCard;
