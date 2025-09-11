import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../../../components/common/Card';
import { RadioInput, RadioOption } from '../../../components/common/inputs';
import { colors, typography, spacing } from '../../../components/common';

const RadioInputShowcaseCard: React.FC = () => {
  // Sample options for different use cases
  const tournamentTypeOptions: RadioOption[] = [
    { value: 'single-elimination', label: 'Single Elimination' },
    { value: 'double-elimination', label: 'Double Elimination' },
    { value: 'round-robin', label: 'Round Robin' },
    { value: 'swiss', label: 'Swiss System' },
  ];

  const skillLevelOptions: RadioOption[] = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' },
  ];

  const notificationOptions: RadioOption[] = [
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'push', label: 'Push Notifications' },
    { value: 'none', label: 'No Notifications' },
  ];

  const multipleChoiceOptions: RadioOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ];

  const disabledOptions: RadioOption[] = [
    { value: 'enabled', label: 'Enabled Option' },
    { value: 'disabled', label: 'Disabled Option', disabled: true },
    { value: 'another', label: 'Another Option' },
  ];

  // Internal state management
  const [radioValues, setRadioValues] = useState({
    tournamentType: 'single-elimination',
    skillLevel: 'intermediate',
    notifications: 'email',
    multipleChoice: ['option1'],
    horizontalLayout: 'option1',
    disabled: 'enabled',
    required: '',
  });

  // Internal handlers
  const handleRadioChange = (key: string) => (value: string | number | (string | number)[]) => {
    setRadioValues(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card width="100%" padding={16} style={styles.showcaseCard}>
      <Text style={[typography.h3, styles.cardTitle]}>Radio Input Components</Text>
      
      {/* Single Selection - Vertical Layout */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Single Selection (Vertical)</Text>
        
        <View style={styles.inputField}>
          <RadioInput
            label="Tournament Type"
            description="Choose the format for your tournament. Single elimination is the most common format."
            options={tournamentTypeOptions}
            value={radioValues.tournamentType}
            onChange={handleRadioChange('tournamentType')}
            layout="vertical"
            id="showcase-tournament-type-radio"
            name="showcase-tournament-type-radio"
          />
        </View>
        
        <View style={styles.inputField}>
          <RadioInput
            label="Skill Level"
            options={skillLevelOptions}
            value={radioValues.skillLevel}
            onChange={handleRadioChange('skillLevel')}
            layout="vertical"
            id="showcase-skill-level-radio"
            name="showcase-skill-level-radio"
          />
        </View>
      </View>
      
      {/* Single Selection - Horizontal Layout */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Single Selection (Horizontal)</Text>
        
        <View style={styles.inputField}>
          <RadioInput
            label="Quick Selection"
            options={multipleChoiceOptions}
            value={radioValues.horizontalLayout}
            onChange={handleRadioChange('horizontalLayout')}
            layout="horizontal"
            id="showcase-horizontal-radio"
            name="showcase-horizontal-radio"
          />
        </View>
      </View>
      
      {/* Multiple Selection */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Multiple Selection</Text>
        
        <View style={styles.inputField}>
          <RadioInput
            label="Notification Preferences"
            description="Select how you would like to receive updates about your tournaments. You can choose multiple options."
            options={notificationOptions}
            value={radioValues.multipleChoice}
            onChange={handleRadioChange('multipleChoice')}
            allowMultiple={true}
            layout="vertical"
            id="showcase-multiple-radio"
            name="showcase-multiple-radio"
          />
        </View>
      </View>
      
      {/* Disabled States */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Disabled States</Text>
        
        <View style={styles.inputField}>
          <RadioInput
            label="Options with Disabled Items"
            options={disabledOptions}
            value={radioValues.disabled}
            onChange={handleRadioChange('disabled')}
            layout="vertical"
            id="showcase-disabled-radio"
            name="showcase-disabled-radio"
          />
        </View>
      </View>
      
      {/* Required Fields */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Required Fields</Text>
        
        <View style={styles.inputField}>
          <RadioInput
            label="Required Selection"
            options={skillLevelOptions}
            value={radioValues.required}
            onChange={handleRadioChange('required')}
            layout="vertical"
            required={true}
            id="showcase-required-radio"
            name="showcase-required-radio"
          />
        </View>
      </View>
      
      {/* Real-world Examples */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Real-world Examples</Text>
        
        <View style={styles.inputField}>
          <RadioInput
            label="Tournament Format"
            options={[
              { value: 'bracket', label: 'Bracket Tournament' },
              { value: 'league', label: 'League Format' },
              { value: 'knockout', label: 'Knockout Stage' },
            ]}
            value={radioValues.tournamentType}
            onChange={handleRadioChange('tournamentType')}
            layout="vertical"
            id="showcase-tournament-format-radio"
            name="showcase-tournament-format-radio"
          />
        </View>
        
        <View style={styles.inputField}>
          <RadioInput
            label="Registration Type"
            options={[
              { value: 'individual', label: 'Individual' },
              { value: 'team', label: 'Team' },
              { value: 'both', label: 'Both Individual & Team' },
            ]}
            value={radioValues.skillLevel}
            onChange={handleRadioChange('skillLevel')}
            layout="horizontal"
            id="showcase-registration-type-radio"
            name="showcase-registration-type-radio"
          />
        </View>
      </View>
      
      {/* Form Examples */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Form Examples</Text>
        
        <View style={styles.inputField}>
          <RadioInput
            label="Payment Method"
            options={[
              { value: 'credit-card', label: 'Credit Card' },
              { value: 'paypal', label: 'PayPal' },
              { value: 'bank-transfer', label: 'Bank Transfer' },
              { value: 'cash', label: 'Cash on Site' },
            ]}
            value={radioValues.notifications}
            onChange={handleRadioChange('notifications')}
            layout="vertical"
            id="showcase-payment-method-radio"
            name="showcase-payment-method-radio"
          />
        </View>
        
        <View style={styles.inputField}>
          <RadioInput
            label="Communication Preferences"
            options={[
              { value: 'email', label: 'Email Only' },
              { value: 'sms', label: 'SMS Only' },
              { value: 'both', label: 'Email & SMS' },
              { value: 'none', label: 'No Communications' },
            ]}
            value={radioValues.multipleChoice}
            onChange={handleRadioChange('multipleChoice')}
            allowMultiple={true}
            layout="vertical"
            id="showcase-communication-preferences-radio"
            name="showcase-communication-preferences-radio"
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

export default RadioInputShowcaseCard;
