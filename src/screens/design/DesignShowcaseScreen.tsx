import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native';
import Card from '../../components/common/Card';
import { PrimaryButton, SecondaryButton, SuccessButton, WarningButton, DangerButton } from '../../components/common/buttons';
import { LabeledField } from '../../components/common/inputs';
import TextInputAdapter from '../../components/common/inputs/TextInputAdapter';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { globalStyles } from '../../components/common/GlobalStyles';


const DesignShowcaseScreen: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
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

  // Listen for screen size changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
    });

    return () => subscription?.remove();
  }, []);

  // Calculate responsive grid columns based on screen width
  const getGridColumns = () => {
    if (screenWidth >= 1200) return 3;
    if (screenWidth >= 768) return 2;
    return 1;
  };

  const gridColumns = getGridColumns();


  const handleInputChange = (key: string) => (value: string) => {
    setInputValues(prev => ({ ...prev, [key]: value }));
  };

  const handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === 'Enter') {
      // Handle enter key if needed
    }
  };


  const ColorPaletteCard = () => (
    <Card width="100%" padding={16} style={styles.showcaseCard}>
      <Text style={[typography.h3, styles.cardTitle]}>Color Palette</Text>
      
      {/* Primary Colors */}
      <View style={styles.colorSection}>
        <Text style={[typography.label, styles.colorSectionTitle]}>Primary</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorSwatch, { backgroundColor: colors.primary[100] }]}>
            <Text style={[typography.caption, styles.colorLabel]}>primary.100</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.primary[300] }]}>
            <Text style={[typography.caption, styles.colorLabel]}>primary.300</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.primary[500] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>primary.500</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.primary[700] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>primary.700</Text>
          </View>
        </View>
      </View>
      
      {/* Secondary Colors */}
      <View style={styles.colorSection}>
        <Text style={[typography.label, styles.colorSectionTitle]}>Secondary</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorSwatch, { backgroundColor: colors.secondary[100] }]}>
            <Text style={[typography.caption, styles.colorLabel]}>secondary.100</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.secondary[300] }]}>
            <Text style={[typography.caption, styles.colorLabel]}>secondary.300</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.secondary[500] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>secondary.500</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.secondary[700] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>secondary.700</Text>
          </View>
        </View>
      </View>
      
      {/* Status Colors */}
      <View style={styles.colorSection}>
        <Text style={[typography.label, styles.colorSectionTitle]}>Status</Text>
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
        </View>
      </View>
      
      {/* Tournament Colors */}
      <View style={styles.colorSection}>
        <Text style={[typography.label, styles.colorSectionTitle]}>Tournament</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorSwatch, { backgroundColor: colors.tournament.gold }]}>
            <Text style={[typography.caption, styles.colorLabel]}>gold</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.tournament.silver }]}>
            <Text style={[typography.caption, styles.colorLabel]}>silver</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.tournament.bronze }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>bronze</Text>
          </View>
        </View>
      </View>
      
      {/* Neutral Colors */}
      <View style={styles.colorSection}>
        <Text style={[typography.label, styles.colorSectionTitle]}>Neutral</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorSwatch, { backgroundColor: colors.neutral[100] }]}>
            <Text style={[typography.caption, styles.colorLabel]}>neutral.100</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.neutral[300] }]}>
            <Text style={[typography.caption, styles.colorLabel]}>neutral.300</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.neutral[500] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>neutral.500</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.neutral[700] }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>neutral.700</Text>
          </View>
        </View>
      </View>
      
      {/* Text Colors */}
      <View style={styles.colorSection}>
        <Text style={[typography.label, styles.colorSectionTitle]}>Text</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorSwatch, { backgroundColor: colors.text.primary }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>text.primary</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.text.secondary }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>text.secondary</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: colors.text.tertiary }]}>
            <Text style={[typography.caption, styles.colorLabel, { color: colors.text.inverse }]}>text.tertiary</Text>
          </View>
        </View>
      </View>
    </Card>
  );

  const ButtonShowcaseCard = () => (
    <Card width="100%" padding={16} style={styles.showcaseCard}>
      <Text style={[typography.h3, styles.cardTitle]}>Button Components</Text>
      
      {/* Light Rounded Buttons */}
      <View style={styles.buttonSection}>
        <Text style={[typography.label, styles.buttonSectionTitle]}>Light Rounded</Text>
        <View style={styles.buttonRow}>
          <PrimaryButton onPress={() => Alert.alert('Primary')}>
            Primary
          </PrimaryButton>
          <SecondaryButton onPress={() => Alert.alert('Secondary')}>
            Secondary
          </SecondaryButton>
        </View>
        <View style={styles.buttonRow}>
          <SuccessButton onPress={() => Alert.alert('Success')}>
            Success
          </SuccessButton>
          <WarningButton onPress={() => Alert.alert('Warning')}>
            Warning
          </WarningButton>
        </View>
        <View style={styles.buttonRow}>
          <DangerButton onPress={() => Alert.alert('Danger')}>
            Danger
          </DangerButton>
        </View>
      </View>
      
      {/* Full Rounded (Pill) Buttons */}
      <View style={styles.buttonSection}>
        <Text style={[typography.label, styles.buttonSectionTitle]}>Full Rounded (Pill)</Text>
        <View style={styles.buttonRow}>
          <PrimaryButton borderRadius="full" onPress={() => Alert.alert('Primary Pill')}>
            Primary
          </PrimaryButton>
          <SecondaryButton borderRadius="full" onPress={() => Alert.alert('Secondary Pill')}>
            Secondary
          </SecondaryButton>
        </View>
        <View style={styles.buttonRow}>
          <SuccessButton borderRadius="full" onPress={() => Alert.alert('Success Pill')}>
            Success
          </SuccessButton>
          <WarningButton borderRadius="full" onPress={() => Alert.alert('Warning Pill')}>
            Warning
          </WarningButton>
        </View>
        <View style={styles.buttonRow}>
          <DangerButton borderRadius="full" onPress={() => Alert.alert('Danger Pill')}>
            Danger
          </DangerButton>
        </View>
      </View>
      
      {/* Different Sizes */}
      <View style={styles.buttonSection}>
        <Text style={[typography.label, styles.buttonSectionTitle]}>Different Sizes</Text>
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
      
      {/* Disabled and Loading States */}
      <View style={styles.buttonSection}>
        <Text style={[typography.label, styles.buttonSectionTitle]}>States</Text>
        <View style={styles.buttonRow}>
          <PrimaryButton disabled onPress={() => Alert.alert('Disabled')}>
            Disabled
          </PrimaryButton>
          <PrimaryButton loading onPress={() => Alert.alert('Loading')}>
            Loading
          </PrimaryButton>
        </View>
      </View>
    </Card>
  );

  const InputShowcaseCard = () => (
    <Card width="100%" padding={16} style={styles.showcaseCard}>
      <Text style={[typography.h3, styles.cardTitle]}>Text Input Components</Text>
      
      {/* Above Label Inputs */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Above Label Inputs</Text>
        
        <LabeledField
          label="Standard Input"
          value={inputValues.standard}
          onChange={handleInputChange('standard')}
          placeholder="Enter text here"
          InputComponent={TextInputAdapter}
        />
        
        <LabeledField
          label="Pill Input"
          value={inputValues.pill}
          onChange={handleInputChange('pill')}
          borderRadius="full"
          placeholder="Rounded corners"
          InputComponent={TextInputAdapter}
        />
        
        <LabeledField
          label="Small Input"
          value={inputValues.small}
          onChange={handleInputChange('small')}
          borderRadius="light"
          placeholder="Compact size"
          InputComponent={TextInputAdapter}
        />
        
        <LabeledField
          label="Large Input"
          value={inputValues.large}
          onChange={handleInputChange('large')}
          borderRadius="light"
          placeholder="Larger size"
          InputComponent={TextInputAdapter}
        />
      </View>
      
      {/* Inside Label Inputs */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Inside Label Inputs (Floating)</Text>
        
        <LabeledField
          label="Floating Label"
          value={inputValues.floating}
          onChange={handleInputChange('floating')}
          inline={true}
          placeholder="Enter text here"
          InputComponent={TextInputAdapter}
        />
        
        <LabeledField
          label="Pill Floating"
          value={inputValues.pillFloating}
          onChange={handleInputChange('pillFloating')}
          inline={true}
          borderRadius="full"
          placeholder="Rounded corners"
          InputComponent={TextInputAdapter}
        />
        
        <LabeledField
          label="Small Floating with Long Label Text"
          value={inputValues.smallFloating}
          onChange={handleInputChange('smallFloating')}
          inline={true}
          borderRadius="light"
          placeholder="Compact size"
          InputComponent={TextInputAdapter}
        />
        
        <LabeledField
          label="Large Floating"
          value={inputValues.largeFloating}
          onChange={handleInputChange('largeFloating')}
          inline={true}
          borderRadius="light"
          placeholder="Larger size"
          InputComponent={TextInputAdapter}
        />
      </View>
    </Card>
  );


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={[typography.h1, styles.title]}>Design Showcase</Text>
        <Text style={[typography.body, styles.subtitle]}>
          A comprehensive view of all design system components
        </Text>
      </View>
      
      <View style={styles.grid}>
        <View style={[styles.gridItem, { 
          width: gridColumns === 1 ? '100%' : `${100 / gridColumns}%`,
          paddingHorizontal: 6,
          paddingBottom: 16
        }]}>
          <ColorPaletteCard />
        </View>
        
        <View style={[styles.gridItem, { 
          width: gridColumns === 1 ? '100%' : `${100 / gridColumns}%`,
          paddingHorizontal: 6,
          paddingBottom: 16
        }]}>
          <ButtonShowcaseCard />
        </View>
        
        <View style={[styles.gridItem, { 
          width: gridColumns === 1 ? '100%' : `${100 / gridColumns}%`,
          paddingHorizontal: 6,
          paddingBottom: 16
        }]}>
          <InputShowcaseCard />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
    paddingTop: 20,
    position: 'relative',
    zIndex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '700',
  },
  subtitle: {
    textAlign: 'center',
    color: colors.text.secondary,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  gridItem: {
    flexDirection: 'column',
  },
  showcaseCard: {
    marginBottom: 0,
    height: '100%',
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  
  // Color palette styles
  colorSection: {
    marginBottom: 16,
  },
  colorSectionTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  colorSwatch: {
    width: 60,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  colorLabel: {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  
  // Button showcase styles
  buttonSection: {
    marginBottom: 20,
  },
  buttonSectionTitle: {
    marginBottom: 12,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  
  // Input showcase styles
  inputSection: {
    marginBottom: 24,
  },
  subsectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  
});

export default DesignShowcaseScreen;
