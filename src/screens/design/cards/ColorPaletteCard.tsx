import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../../../components/common/Card';
import { colors } from '../../../styles/colors';
import { typography } from '../../../styles/typography';
import { cardSpacing, createSpacingStyles } from '../../../styles/spacing';

const ColorPaletteCard: React.FC = () => {
  return (
    <Card width="100%" padding={16} style={styles.showcaseCard}>
      <Text style={[typography.h3, styles.cardTitle]}>Color Palette</Text>
      
      {/* Primary Colors */}
      <View style={styles.colorSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Primary Colors</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorSwatch, { backgroundColor: colors.primary[100] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.primary }]}>100</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.primary[300] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.primary }]}>300</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.primary[500] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>500</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.primary[700] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>700</Text>
          </View>
        </View>
      </View>

      {/* Secondary Colors */}
      <View style={styles.colorSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Secondary Colors</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorSwatch, { backgroundColor: colors.secondary[100] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.primary }]}>100</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.secondary[300] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.primary }]}>300</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.secondary[500] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>500</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.secondary[700] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>700</Text>
          </View>
        </View>
      </View>

      {/* Status Colors */}
      <View style={styles.colorSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Status Colors</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorSwatch, { backgroundColor: colors.success[500] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>success</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.warning[500] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>warning</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.error[500] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>error</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.neutral[500] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>neutral</Text>
          </View>
        </View>
      </View>

      {/* Gray Scale */}
      <View style={styles.colorSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Gray Scale</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorSwatch, { backgroundColor: colors.gray[50] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.primary }]}>50</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.gray[100] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.primary }]}>100</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.gray[300] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.primary }]}>300</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.gray[500] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>500</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.gray[700] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>700</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.gray[900] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>900</Text>
          </View>
        </View>
      </View>

      {/* Tournament Colors */}
      <View style={styles.colorSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Tournament Colors</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorSwatch, { backgroundColor: colors.tournament.gold }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.primary }]}>gold</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.tournament.silver }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.primary }]}>silver</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.tournament.bronze }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>bronze</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.tournament.participant }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>participant</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.tournament.spectator }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.primary }]}>spectator</Text>
          </View>
        </View>
      </View>

      {/* Text Colors */}
      <View style={styles.colorSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Text Colors</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorSwatch, { backgroundColor: colors.text.primary }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>primary</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.text.secondary }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>secondary</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.text.tertiary }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>tertiary</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.text.inverse }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.primary }]}>inverse</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.text.disabled }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>disabled</Text>
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
  colorSection: {
    ...spacingStyles.sectionSpacing,
  },
  subsectionTitle: {
    ...spacingStyles.subsectionSpacing,
    color: colors.text.secondary,
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: cardSpacing.sm,
  },
  colorSwatch: {
    width: 60,
    height: 60,
    borderRadius: cardSpacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  colorLabel: {
    fontWeight: '600',
    fontSize: 10,
  },
});

export default ColorPaletteCard;
