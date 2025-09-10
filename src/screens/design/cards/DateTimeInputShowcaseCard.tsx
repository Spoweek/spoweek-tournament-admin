import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../../../components/common/Card';
import { LabeledField } from '../../../components/common/inputs';
import DateTimeInputAdapter from '../../../components/common/inputs/DateTimeInputAdapter';
import { colors, typography, spacing } from '../../../components/common';

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
            InputComponent={DateTimeInputAdapter}
            id="showcase-standard-datetime"
            name="showcase-standard-datetime"
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Pill DateTime Input"
            value={dateTimeValues.pill}
            onChange={handleDateTimeChange('pill')}
            borderRadius="full"
            InputComponent={DateTimeInputAdapter}
            id="showcase-pill-datetime"
            name="showcase-pill-datetime"
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
            InputComponent={DateTimeInputAdapter}
            id="showcase-floating-datetime"
            name="showcase-floating-datetime"
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Pill Floating DateTime"
            value={dateTimeValues.pillFloating}
            onChange={handleDateTimeChange('pillFloating')}
            inline={true}
            borderRadius="full"
            InputComponent={DateTimeInputAdapter}
            id="showcase-pill-floating-datetime"
            name="showcase-pill-floating-datetime"
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
            InputComponent={DateTimeInputAdapter}
            inputProps={{ showSeconds: true }}
            id="showcase-datetime-with-seconds"
            name="showcase-datetime-with-seconds"
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="12-Hour Format"
            value={dateTimeValues.twelveHour}
            onChange={handleDateTimeChange('twelveHour')}
            InputComponent={DateTimeInputAdapter}
            inputProps={{ use24Hour: false }}
            id="showcase-12hour-datetime"
            name="showcase-12hour-datetime"
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="12-Hour with Seconds (Pill)"
            value={dateTimeValues.twelveHour}
            onChange={handleDateTimeChange('twelveHour')}
            borderRadius="full"
            InputComponent={DateTimeInputAdapter}
            inputProps={{ use24Hour: false, showSeconds: true }}
            id="showcase-12hour-seconds-pill-datetime"
            name="showcase-12hour-seconds-pill-datetime"
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
              InputComponent={DateTimeInputAdapter}
              id="showcase-300px-width-datetime"
              name="showcase-300px-width-datetime"
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
              InputComponent={DateTimeInputAdapter}
              id="showcase-400px-width-pill-datetime"
              name="showcase-400px-width-pill-datetime"
            />
          </View>
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

export default DateTimeInputShowcaseCard;
