import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../../../components/common/Card';
import { LabeledField, PhoneInputAdapter } from '../../../components/common/inputs';
import { colors, typography, spacing } from '../../../components/common';
import { PhoneValue } from '../../../components/common/inputs/PhoneInputAdapter';

// Wrapper components for different phone input modes
const InternationalPhoneInput: React.FC<{
  value: PhoneValue;
  onChange: (value: PhoneValue) => void;
  placeholder?: string;
  disabled?: boolean;
  onDropdownStateChange?: (isOpen: boolean) => void;
  containerRef?: React.RefObject<any>;
  calculatedRadius?: number;
}> = (props) => (
  <PhoneInputAdapter {...props} mode="international" />
);

const LocalKoreanPhoneInput: React.FC<{
  value: PhoneValue;
  onChange: (value: PhoneValue) => void;
  placeholder?: string;
  disabled?: boolean;
  onDropdownStateChange?: (isOpen: boolean) => void;
  containerRef?: React.RefObject<any>;
  calculatedRadius?: number;
}> = (props) => (
  <PhoneInputAdapter {...props} mode="local" localCountryCode="KR" />
);

const LocalUSPhoneInput: React.FC<{
  value: PhoneValue;
  onChange: (value: PhoneValue) => void;
  placeholder?: string;
  disabled?: boolean;
  onDropdownStateChange?: (isOpen: boolean) => void;
  containerRef?: React.RefObject<any>;
  calculatedRadius?: number;
}> = (props) => (
  <PhoneInputAdapter {...props} mode="local" localCountryCode="US" />
);

const PhoneInputShowcaseCard: React.FC = () => {
  const [phoneValues, setPhoneValues] = useState({
    international: { countryCode: 'KR', phoneNumber: '' },
    internationalUS: { countryCode: 'US', phoneNumber: '' },
    localKorean: { countryCode: 'KR', phoneNumber: '' },
    localUS: { countryCode: 'US', phoneNumber: '' },
  });

  const handlePhoneChange = (key: string) => (value: { countryCode: string; phoneNumber: string }) => {
    setPhoneValues(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card width="100%" padding={16} style={styles.showcaseCard}>
      <Text style={[typography.h3, styles.cardTitle]}>Phone Input Components</Text>
      <Text style={[typography.body, styles.description]}>
        Phone number inputs with country code selection, validation, and formatting for both international and local modes.
      </Text>
      
      {/* International Mode Examples */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>International Mode</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="International Phone (Korea Default)"
            value={phoneValues.international}
            onChange={handlePhoneChange('international')}
            placeholder="Enter phone number"
            InputComponent={InternationalPhoneInput}
            required={true}
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="International Phone (US Default)"
            value={phoneValues.internationalUS}
            onChange={handlePhoneChange('internationalUS')}
            placeholder="Enter phone number"
            InputComponent={InternationalPhoneInput}
            required={true}
          />
        </View>
      </View>

      {/* Local Mode Examples */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Local Mode</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Korean Phone Number"
            value={phoneValues.localKorean}
            onChange={handlePhoneChange('localKorean')}
            placeholder="Enter Korean phone number"
            InputComponent={LocalKoreanPhoneInput}
            required={true}
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="US Phone Number"
            value={phoneValues.localUS}
            onChange={handlePhoneChange('localUS')}
            placeholder="Enter US phone number"
            InputComponent={LocalUSPhoneInput}
            required={true}
          />
        </View>
      </View>

      {/* Validation Examples */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Validation Examples</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Valid Korean Number"
            value={{ countryCode: 'KR', phoneNumber: '010-1234-5678' }}
            onChange={() => {}}
            InputComponent={LocalKoreanPhoneInput}
            disabled={true}
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Invalid Korean Number"
            value={{ countryCode: 'KR', phoneNumber: '123-456-789' }}
            onChange={() => {}}
            InputComponent={LocalKoreanPhoneInput}
            disabled={true}
          />
        </View>
      </View>

      {/* Current Values Display */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Current Values</Text>
        
        <View style={styles.valuesContainer}>
          <View style={styles.valueItem}>
            <Text style={styles.valueLabel}>International (Korea):</Text>
            <Text style={styles.valueText}>
              {phoneValues.international.countryCode} - {phoneValues.international.phoneNumber || 'Empty'}
            </Text>
          </View>
          
          <View style={styles.valueItem}>
            <Text style={styles.valueLabel}>International (US):</Text>
            <Text style={styles.valueText}>
              {phoneValues.internationalUS.countryCode} - {phoneValues.internationalUS.phoneNumber || 'Empty'}
            </Text>
          </View>
          
          <View style={styles.valueItem}>
            <Text style={styles.valueLabel}>Local Korean:</Text>
            <Text style={styles.valueText}>
              {phoneValues.localKorean.phoneNumber || 'Empty'}
            </Text>
          </View>
          
          <View style={styles.valueItem}>
            <Text style={styles.valueLabel}>Local US:</Text>
            <Text style={styles.valueText}>
              {phoneValues.localUS.phoneNumber || 'Empty'}
            </Text>
          </View>
        </View>
      </View>

      {/* Inline Examples */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Inline Examples</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="International Phone (Inline)"
            value={phoneValues.international}
            onChange={handlePhoneChange('international')}
            placeholder="Enter phone number"
            InputComponent={InternationalPhoneInput}
            inline={true}
            required={true}
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Korean Phone (Inline)"
            value={phoneValues.localKorean}
            onChange={handlePhoneChange('localKorean')}
            placeholder="Enter Korean phone number"
            InputComponent={LocalKoreanPhoneInput}
            inline={true}
            required={true}
          />
        </View>
      </View>

      {/* Features List */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Features</Text>
        
        <View style={styles.featuresList}>
          <Text style={styles.featureItem}>✓ Country code dropdown with search</Text>
          <Text style={styles.featureItem}>✓ Real-time phone number validation</Text>
          <Text style={styles.featureItem}>✓ Automatic formatting (Korean: ###-####-####, US: (###) ###-####)</Text>
          <Text style={styles.featureItem}>✓ International and local modes</Text>
          <Text style={styles.featureItem}>✓ Visual validation indicators</Text>
          <Text style={styles.featureItem}>✓ Required field support</Text>
          <Text style={styles.featureItem}>✓ Disabled state support</Text>
          <Text style={styles.featureItem}>✓ Inline and normal LabeledField support</Text>
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
  description: {
    marginBottom: spacing.md,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  inputSection: {
    marginBottom: 16,
  },
  subsectionTitle: {
    marginBottom: spacing.sm,
    color: colors.text.secondary,
  },
  inputField: {
    marginBottom: spacing.md,
  },
  valuesContainer: {
    backgroundColor: colors.neutral[100],
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.neutral[300],
  },
  valueItem: {
    marginBottom: 8,
  },
  valueLabel: {
    ...typography.body,
    color: colors.text.secondary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  valueText: {
    ...typography.body,
    color: colors.text.primary,
    fontSize: 14,
    fontFamily: 'monospace',
  },
  featuresList: {
    backgroundColor: colors.neutral[100],
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.neutral[300],
  },
  featureItem: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: 4,
    fontSize: 14,
  },
});

export default PhoneInputShowcaseCard;
