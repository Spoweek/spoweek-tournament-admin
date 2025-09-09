import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../../../components/common/Card';
import { LabeledField } from '../../../components/common/inputs';
import DateTimeInputAdapter from '../../../components/common/inputs/DateTimeInputAdapter';
import { colors } from '../../../styles/colors';
import { typography } from '../../../styles/typography';
import { cardSpacing, createSpacingStyles } from '../../../styles/spacing';

const DateTimeInputShowcaseCard: React.FC = () => {
  // Internal state management
  const [dateTimeValues, setDateTimeValues] = useState({
    standard: '',
    pill: '',
    floating: '',
    pillFloating: '',
    withSeconds: '',
    twelveHour: '',
  });

  // Internal handler
  const handleDateTimeChange = (key: string) => (value: string) => {
    console.log('DateTime changed:', key, value);
    setDateTimeValues(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card width="100%" padding={16} style={styles.showcaseCard}>
      <Text style={[typography.h3, styles.cardTitle]}>DateTime Input Components</Text>
      
      {/* Standard DateTime Inputs */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Standard DateTime Inputs</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Standard DateTime"
            value={dateTimeValues.standard}
            onChange={handleDateTimeChange('standard')}
            placeholder="Select date and time"
            InputComponent={DateTimeInputAdapter}
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Pill DateTime Input"
            value={dateTimeValues.pill}
            onChange={handleDateTimeChange('pill')}
            borderRadius="full"
            placeholder="Select date and time"
            InputComponent={DateTimeInputAdapter}
          />
        </View>
      </View>
      
      {/* Floating DateTime Inputs */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Floating DateTime Inputs</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Floating DateTime"
            value={dateTimeValues.floating}
            onChange={handleDateTimeChange('floating')}
            inline={true}
            placeholder="Select date and time"
            InputComponent={DateTimeInputAdapter}
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Pill Floating DateTime"
            value={dateTimeValues.pillFloating}
            onChange={handleDateTimeChange('pillFloating')}
            inline={true}
            borderRadius="full"
            placeholder="Select date and time"
            InputComponent={DateTimeInputAdapter}
          />
        </View>
      </View>
      
      {/* Advanced Options */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Advanced Options</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="With Seconds"
            value={dateTimeValues.withSeconds}
            onChange={handleDateTimeChange('withSeconds')}
            placeholder="Select date and time with seconds"
            InputComponent={DateTimeInputAdapter}
            inputProps={{ showSeconds: true }}
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="12-Hour Format"
            value={dateTimeValues.twelveHour}
            onChange={handleDateTimeChange('twelveHour')}
            placeholder="Select date and time (12h)"
            InputComponent={DateTimeInputAdapter}
            inputProps={{ use24Hour: false }}
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="12-Hour with Seconds (Pill)"
            value={dateTimeValues.twelveHour}
            onChange={handleDateTimeChange('twelveHour')}
            borderRadius="full"
            placeholder="Select date and time (12h with seconds)"
            InputComponent={DateTimeInputAdapter}
            inputProps={{ use24Hour: false, showSeconds: true }}
          />
        </View>
      </View>
      
      {/* Fixed Width Examples */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Fixed Width Examples</Text>
        
        <View style={styles.inputField}>
          <View style={{ width: 300 }}>
            <LabeledField
              label="300px Width"
              value={dateTimeValues.standard}
              onChange={handleDateTimeChange('standard')}
              placeholder="300px width"
              InputComponent={DateTimeInputAdapter}
            />
          </View>
        </View>
        
        <View style={styles.inputField}>
          <View style={{ width: 400 }}>
            <LabeledField
              label="400px Width (Pill)"
              value={dateTimeValues.pill}
              onChange={handleDateTimeChange('pill')}
              borderRadius="full"
              placeholder="400px width"
              InputComponent={DateTimeInputAdapter}
            />
          </View>
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
  inputSection: {
    ...spacingStyles.sectionSpacing,
  },
  subsectionTitle: {
    ...spacingStyles.subsectionSpacing,
    color: colors.text.secondary,
  },
  inputField: {
    ...spacingStyles.elementSpacing,
  },
});

export default DateTimeInputShowcaseCard;
