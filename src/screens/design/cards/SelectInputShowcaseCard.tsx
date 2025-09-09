import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../../../components/common/Card';
import { LabeledField } from '../../../components/common/inputs';
import SelectInputAdapter from '../../../components/common/inputs/SelectInputAdapter';
import { colors } from '../../../styles/colors';
import { typography } from '../../../styles/typography';
import { cardSpacing, createSpacingStyles } from '../../../styles/spacing';

// Sample data for select inputs
const countryOptions = [
  { label: 'United States', value: 'us', searchTerms: ['USA', 'America', 'US'] },
  { label: 'Canada', value: 'ca', searchTerms: ['CA'] },
  { label: 'United Kingdom', value: 'uk', searchTerms: ['UK', 'Britain', 'England'] },
  { label: 'Germany', value: 'de', searchTerms: ['Deutschland'] },
  { label: 'France', value: 'fr', searchTerms: ['Français'] },
  { label: 'Japan', value: 'jp', searchTerms: ['Nihon', 'Nippon'] },
  { label: 'Australia', value: 'au', searchTerms: ['Aussie', 'Oz'] },
  { label: 'South Korea', value: 'kr', searchTerms: ['Korea', '한국'] },
  { label: 'Brazil', value: 'br', searchTerms: ['Brasil'] },
  { label: 'India', value: 'in', searchTerms: ['Bharat'] },
  { label: 'China', value: 'cn', searchTerms: ['中国', 'PRC'] },
  { label: 'Russia', value: 'ru', searchTerms: ['Россия', 'Russian Federation'] },
];

const categoryOptions = [
  { label: 'Technology', value: 'tech' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'Support', value: 'support' },
];

const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Critical', value: 'critical' },
];

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' },
];

const SelectInputShowcaseCard: React.FC = () => {
  // Internal state management
  const [selectValues, setSelectValues] = useState({
    country: '',
    category: '',
    priority: '',
    status: '',
    searchableCountry: '',
  });

  // Internal handler
  const handleSelectChange = (key: string) => (value: string | number) => {
    setSelectValues(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card width="100%" padding={16} style={styles.showcaseCard}>
      <Text style={[typography.h3, styles.cardTitle]}>Select Input Components</Text>
      
      {/* Standard Select Inputs */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Standard Select Inputs</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Country"
            value={selectValues.country}
            onChange={handleSelectChange('country')}
            placeholder="Choose your country"
            InputComponent={SelectInputAdapter}
            inputProps={{ options: countryOptions }}
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Category (Pill)"
            value={selectValues.category}
            onChange={handleSelectChange('category')}
            borderRadius="full"
            placeholder="Select category"
            InputComponent={SelectInputAdapter}
            inputProps={{ options: categoryOptions }}
          />
        </View>
      </View>
      
      {/* Floating Select Inputs */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Floating Select Inputs</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Priority Level"
            value={selectValues.priority}
            onChange={handleSelectChange('priority')}
            inline={true}
            placeholder="Set priority"
            InputComponent={SelectInputAdapter}
            inputProps={{ options: priorityOptions }}
          />
        </View>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Status (Pill Floating)"
            value={selectValues.status}
            onChange={handleSelectChange('status')}
            inline={true}
            borderRadius="full"
            placeholder="Choose status"
            InputComponent={SelectInputAdapter}
            inputProps={{ options: statusOptions }}
          />
        </View>
      </View>
      
      {/* Searchable Examples */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Searchable Examples</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Searchable Countries"
            value={selectValues.searchableCountry}
            onChange={handleSelectChange('searchableCountry')}
            placeholder="Search for a country..."
            InputComponent={SelectInputAdapter}
            inputProps={{ 
              options: countryOptions,
              searchable: true,
              searchPlaceholder: "Type to search countries..."
            }}
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
              value={selectValues.country}
              onChange={handleSelectChange('country')}
              placeholder="Clean 200px width"
              InputComponent={SelectInputAdapter}
              inputProps={{ options: countryOptions }}
            />
          </View>
        </View>
        
        <View style={styles.inputField}>
          <View style={{ width: 300 }}>
            <LabeledField
              label="300px Width (Pill)"
              value={selectValues.category}
              onChange={handleSelectChange('category')}
              borderRadius="full"
              placeholder="Clean 300px width"
              InputComponent={SelectInputAdapter}
              inputProps={{ options: categoryOptions }}
            />
          </View>
        </View>
        
        <View style={styles.inputField}>
          <View style={{ width: 250, flexDirection: 'row' }}>
            <LabeledField
              label="250px Inline"
              value={selectValues.priority}
              onChange={handleSelectChange('priority')}
              inline={true}
              placeholder="250px inline"
              InputComponent={SelectInputAdapter}
              inputProps={{ options: priorityOptions }}
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

export default SelectInputShowcaseCard;
