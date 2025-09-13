import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LabeledField, ColorPickerInputAdapter } from '../../common/inputs';
import Card from '../../common/Card';
import { colors, typography } from '../../common/styles';

const ColorPickerShowcaseCard: React.FC = () => {
  const [colorValue, setColorValue] = useState('#3e72fbff');
  const [colorValue2, setColorValue2] = useState('#ff6b6bff');
  const [colorValue3, setColorValue3] = useState('');

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Color Picker Input</Text>
      <Text style={styles.description}>
        A comprehensive color picker with interactive color screen, alpha slider, 
        and support for multiple color formats (HEX, RGB, HSV, HSL).
      </Text>

      <View style={styles.examples}>
        <LabeledField
          label="Primary Color"
          value={colorValue}
          onChange={setColorValue}
          placeholder="#00000000"
          InputComponent={ColorPickerInputAdapter}
          description="8-digit hex format with alpha channel"
        />

        <LabeledField
          label="Secondary Color"
          value={colorValue2}
          onChange={setColorValue2}
          placeholder="#00000000"
          InputComponent={ColorPickerInputAdapter}
          description="Interactive color selection with dropdown"
        />

        <LabeledField
          label="Empty Color"
          value={colorValue3}
          onChange={setColorValue3}
          placeholder="#00000000"
          InputComponent={ColorPickerInputAdapter}
          description="Shows placeholder when empty"
        />
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>Features:</Text>
        <View style={styles.featureList}>
          <Text style={styles.featureItem}>• Paint palette icon with color swatch display</Text>
          <Text style={styles.featureItem}>• Interactive color screen for visual selection</Text>
          <Text style={styles.featureItem}>• Hue slider for color wheel navigation</Text>
          <Text style={styles.featureItem}>• Alpha slider for transparency control</Text>
          <Text style={styles.featureItem}>• Manual input with format validation</Text>
          <Text style={styles.featureItem}>• Support for HEX, RGB, HSV, and HSL formats</Text>
          <Text style={styles.featureItem}>• 8-digit hex output with alpha channel</Text>
          <Text style={styles.featureItem}>• Clear button for easy reset</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 24,
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: 8,
  },
  description: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: 24,
    lineHeight: 20,
  },
  examples: {
    gap: 20,
    marginBottom: 24,
  },
  features: {
    backgroundColor: colors.background.secondary,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  featuresTitle: {
    ...typography.body,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  featureList: {
    gap: 4,
  },
  featureItem: {
    ...typography.body,
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 18,
  },
});

export default ColorPickerShowcaseCard;
