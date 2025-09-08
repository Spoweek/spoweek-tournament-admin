import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Card from '../../../components/common/Card';
import { PrimaryButton, SecondaryButton, SuccessButton, WarningButton, DangerButton } from '../../../components/common/buttons';
import { colors } from '../../../styles/colors';
import { typography } from '../../../styles/typography';
import { cardSpacing, createSpacingStyles } from '../../../styles/spacing';

const ButtonShowcaseCard: React.FC = () => {
  return (
    <Card width="100%" padding={16} style={styles.showcaseCard}>
      <Text style={[typography.h3, styles.cardTitle]}>Button Components</Text>
      
      {/* Basic Buttons */}
      <View style={styles.buttonSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Basic Buttons</Text>
        <View style={styles.buttonRow}>
          <PrimaryButton onPress={() => Alert.alert('Primary')}>
            Primary
          </PrimaryButton>
          <SecondaryButton onPress={() => Alert.alert('Secondary')}>
            Secondary
          </SecondaryButton>
          <SuccessButton onPress={() => Alert.alert('Success')}>
            Success
          </SuccessButton>
          <WarningButton onPress={() => Alert.alert('Warning')}>
            Warning
          </WarningButton>
          <DangerButton onPress={() => Alert.alert('Danger')}>
            Danger
          </DangerButton>
        </View>
      </View>

      {/* Pill Buttons */}
      <View style={styles.buttonSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Pill Buttons</Text>
        <View style={styles.buttonRow}>
          <PrimaryButton borderRadius="full" onPress={() => Alert.alert('Primary Pill')}>
            Primary
          </PrimaryButton>
          <SecondaryButton borderRadius="full" onPress={() => Alert.alert('Secondary Pill')}>
            Secondary
          </SecondaryButton>
          <SuccessButton borderRadius="full" onPress={() => Alert.alert('Success Pill')}>
            Success
          </SuccessButton>
          <WarningButton borderRadius="full" onPress={() => Alert.alert('Warning Pill')}>
            Warning
          </WarningButton>
          <DangerButton borderRadius="full" onPress={() => Alert.alert('Danger Pill')}>
            Danger
          </DangerButton>
        </View>
      </View>

      {/* Size Variants */}
      <View style={styles.buttonSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Size Variants</Text>
        <View style={styles.buttonRow}>
          <PrimaryButton size="small" onPress={() => Alert.alert('Small')}>
            Small
          </PrimaryButton>
          <PrimaryButton size="medium" onPress={() => Alert.alert('Medium')}>
            Medium
          </PrimaryButton>
          <PrimaryButton size="large" onPress={() => Alert.alert('Large')}>
            Large
          </PrimaryButton>
        </View>
      </View>

      {/* States */}
      <View style={styles.buttonSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Button States</Text>
        <View style={styles.buttonRow}>
          <PrimaryButton disabled onPress={() => Alert.alert('Disabled')}>
            Disabled
          </PrimaryButton>
          <PrimaryButton loading onPress={() => Alert.alert('Loading')}>
            Loading
          </PrimaryButton>
        </View>
      </View>

      {/* Icon Buttons */}
      <View style={styles.buttonSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Icon Buttons</Text>
        <View style={styles.buttonRow}>
          <PrimaryButton
            leftIcon={<Ionicons name="add" size={16} />}
            onPress={() => Alert.alert('Add')}
          />
          <SecondaryButton
            rightIcon={<Ionicons name="arrow-forward" size={14} />}
            onPress={() => Alert.alert('Next')}
          />
          <SuccessButton
            leftIcon={<Ionicons name="checkmark" size={14} />}
            rightIcon={<Ionicons name="arrow-forward" size={12} />}
            onPress={() => Alert.alert('Save & Continue')}
          />
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Action Buttons</Text>
        <View style={styles.buttonRow}>
          <PrimaryButton
            leftIcon={<Ionicons name="add" size={16} />}
            onPress={() => Alert.alert('Add')}
          >
            Add Item
          </PrimaryButton>
          <SecondaryButton
            leftIcon={<Ionicons name="pencil" size={16} />}
            onPress={() => Alert.alert('Edit')}
          >
            Edit
          </SecondaryButton>
          <DangerButton
            leftIcon={<Ionicons name="trash" size={16} />}
            onPress={() => Alert.alert('Delete')}
          >
            Delete
          </DangerButton>
          <SuccessButton
            leftIcon={<Ionicons name="heart" size={16} />}
            onPress={() => Alert.alert('Like')}
          >
            Like
          </SuccessButton>
          <WarningButton
            leftIcon={<Ionicons name="warning" size={16} />}
            onPress={() => Alert.alert('Warning')}
          >
            Warning
          </WarningButton>
          <PrimaryButton
            leftIcon={<Ionicons name="checkmark" size={16} />}
            onPress={() => Alert.alert('Confirm')}
          >
            Confirm
          </PrimaryButton>
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
  buttonSection: {
    ...spacingStyles.sectionSpacing,
  },
  subsectionTitle: {
    ...spacingStyles.subsectionSpacing,
    color: colors.text.secondary,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: cardSpacing.sm,
  },
});

export default ButtonShowcaseCard;
