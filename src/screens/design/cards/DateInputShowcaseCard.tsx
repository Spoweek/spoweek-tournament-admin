import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../../../components/common/Card';
import { LabeledField } from '../../../components/common/inputs';
import DateInputAdapter from '../../../components/common/inputs/DateInputAdapter';
import { colors, typography, spacing } from '../../../components/common';

const DateInputShowcaseCard: React.FC = () => {
  // Internal state management
  const [dateValues, setDateValues] = useState({
    standard: '',
    pill: '',
    floating: '',
    pillFloating: '',
  });

  // Internal handler
  const handleDateChange = (key: string) => (value: string) => {
    setDateValues(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card width="100%" padding={16} style={styles.showcaseCard}>
      <Text style={[typography.h3, styles.cardTitle]}>Date Input Components</Text>
      
      {/* Standard Date Inputs */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Standard Date Inputs</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Standard Date"
            value={dateValues.standard}
            onChange={handleDateChange('standard')}
            InputComponent={DateInputAdapter}
            id="showcase-standard-date"
            name="showcase-standard-date"
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Pill Date Input"
            value={dateValues.pill}
            onChange={handleDateChange('pill')}
            borderRadius="full"
            InputComponent={DateInputAdapter}
            id="showcase-pill-date"
            name="showcase-pill-date"
          />
        </View>
      </View>
      
      {/* Floating Date Inputs */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Floating Date Inputs</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Floating Date"
            value={dateValues.floating}
            onChange={handleDateChange('floating')}
            inline={true}
            InputComponent={DateInputAdapter}
            id="showcase-floating-date"
            name="showcase-floating-date"
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Pill Floating Date"
            value={dateValues.pillFloating}
            onChange={handleDateChange('pillFloating')}
            inline={true}
            borderRadius="full"
            InputComponent={DateInputAdapter}
            id="showcase-pill-floating-date"
            name="showcase-pill-floating-date"
          />
        </View>
      </View>
      
      {/* Fixed Width Examples */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Fixed Width Examples</Text>
        
        <View style={styles.inputField}>
          <View style={{ width: 200 }}>
            <LabeledField
              label="200px Width"
              value={dateValues.standard}
              onChange={handleDateChange('standard')}
              InputComponent={DateInputAdapter}
              id="showcase-200px-width-date"
              name="showcase-200px-width-date"
            />
          </View>
        </View>
        
        <View style={styles.inputField}>
          <View style={{ width: 300 }}>
            <LabeledField
              label="300px Width (Pill)"
              value={dateValues.pill}
              onChange={handleDateChange('pill')}
              borderRadius="full"
              InputComponent={DateInputAdapter}
              id="showcase-300px-width-date"
              name="showcase-300px-width-date"
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

export default DateInputShowcaseCard;
