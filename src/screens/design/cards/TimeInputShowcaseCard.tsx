import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../../../components/common/Card';
import { LabeledField } from '../../../components/common/inputs';
import TimeInputAdapter from '../../../components/common/inputs/TimeInputAdapter';
import { colors, typography, spacing } from '../../../components/common';

const TimeInputShowcaseCard: React.FC = () => {
  // Internal state management
  const [timeValues, setTimeValues] = useState({
    time24: '',
    time12: '',
    timeWithSeconds: '',
    timeFloating: '',
  });

  // Internal handler
  const handleTimeChange = (key: string) => (value: string) => {
    console.log('Time changed:', key, value);
    setTimeValues(prev => ({ ...prev, [key]: value }));
  };
  return (
    <Card width="100%" padding={16} style={styles.showcaseCard}>
      <Text style={[typography.h3, styles.cardTitle]}>Time Input Components</Text>
      
      {/* 24-Hour Format */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>24-Hour Format</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="24-Hour Time"
            value={timeValues.time24}
            onChange={handleTimeChange('time24')}
            placeholder="Select time (24h)"
            InputComponent={TimeInputAdapter}
            inputProps={{ use24Hour: true }}
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="24-Hour with Seconds"
            value={timeValues.timeWithSeconds}
            onChange={handleTimeChange('timeWithSeconds')}
            placeholder="Select time with seconds"
            InputComponent={TimeInputAdapter}
            inputProps={{ use24Hour: true, showSeconds: true }}
          />
        </View>
      </View>
      
      {/* 12-Hour Format */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>12-Hour Format</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="12-Hour Time"
            value={timeValues.time12}
            onChange={handleTimeChange('time12')}
            placeholder="Select time (12h)"
            InputComponent={TimeInputAdapter}
            inputProps={{ use24Hour: false }}
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="12-Hour with Seconds (Pill)"
            value={timeValues.timeWithSeconds}
            onChange={handleTimeChange('timeWithSeconds')}
            borderRadius="full"
            placeholder="Select time with seconds"
            InputComponent={TimeInputAdapter}
            inputProps={{ use24Hour: false, showSeconds: true }}
          />
        </View>
      </View>
      
      {/* Floating/Inline Format */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Inline Time Inputs</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Floating 24h"
            value={timeValues.timeFloating}
            onChange={handleTimeChange('timeFloating')}
            inline={true}
            placeholder="Select time"
            InputComponent={TimeInputAdapter}
            inputProps={{ use24Hour: true }}
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Floating 12h (Pill)"
            value={timeValues.time12}
            onChange={handleTimeChange('time12')}
            inline={true}
            borderRadius="full"
            placeholder="Select time"
            InputComponent={TimeInputAdapter}
            inputProps={{ use24Hour: false }}
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

export default TimeInputShowcaseCard;
