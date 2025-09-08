import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../../../components/common/Card';
import { LabeledField } from '../../../components/common/inputs';
import TextInputAdapter from '../../../components/common/inputs/TextInputAdapter';
import { colors } from '../../../styles/colors';
import { typography } from '../../../styles/typography';
import { cardSpacing, createSpacingStyles } from '../../../styles/spacing';

const InputShowcaseCard: React.FC = () => {
  // Internal state management
  const [email, setEmail] = useState<string>('');
  const [inputValues, setInputValues] = useState({
    standard: '',
    pill: '',
    small: '',
    large: '',
    floating: '',
    pillFloating: '',
    smallFloating: '',
    largeFloating: '',
  });
  // Internal handlers
  const handleInputChange = (key: string) => (value: string) => {
    setInputValues(prev => ({ ...prev, [key]: value }));
  };
  return (
    <Card width="100%" padding={16} style={styles.showcaseCard}>
      <Text style={[typography.h3, styles.cardTitle]}>Text Input Components</Text>
      
      {/* Above Label Inputs */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Above Label Inputs</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Standard Input"
            value={email}
            onChange={setEmail}
            placeholder="Enter text here"
            InputComponent={TextInputAdapter}
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Pill Input"
            value={inputValues.pill}
            onChange={(value) => setInputValues(prev => ({ ...prev, pill: value }))}
            borderRadius="full"
            placeholder="Rounded corners"
            InputComponent={TextInputAdapter}
          />
        </View>
      </View>
      
      {/* Inside Label Inputs */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Inside Label Inputs (Floating)</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Floating Label"
            value={inputValues.floating}
            onChange={(value) => setInputValues(prev => ({ ...prev, floating: value }))}
            inline={true}
            placeholder="Enter text here"
            InputComponent={TextInputAdapter}
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Pill Floating"
            value={inputValues.pillFloating}
            onChange={(value) => setInputValues(prev => ({ ...prev, pillFloating: value }))}
            inline={true}
            borderRadius="full"
            placeholder="Rounded corners"
            InputComponent={TextInputAdapter}
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
  inlineInputsContainer: {
    flexDirection: 'row',
    gap: cardSpacing.md,
  },
});

export default InputShowcaseCard;
