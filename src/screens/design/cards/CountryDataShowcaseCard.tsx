import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from '../../../components/common/Card';
import { LabeledField } from '../../../components/common/inputs';
import SelectInputAdapter from '../../../components/common/inputs/SelectInputAdapter';
import { getCountrySelectOptions, searchCountries, getCountryByCode, getCountriesAlphabetically, getCountriesByPriority } from '../../../data/countries';
import { colors } from '../../../styles/colors';
import { typography } from '../../../styles/typography';
import { createSpacingStyles } from '../../../styles/spacing';

const CountryDataShowcaseCard: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'alphabetical' | 'priority'>('alphabetical');

  const countryOptions = getCountrySelectOptions(sortBy);
  const searchResults = searchQuery ? searchCountries(searchQuery, sortBy) : [];
  const selectedCountryData = selectedCountry ? getCountryByCode(selectedCountry) : null;

  const handleCountryChange = (value: string | number) => {
    setSelectedCountry(String(value));
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <Card width="100%" padding={16} style={styles.showcaseCard}>
      <Text style={[typography.h3, styles.cardTitle]}>Country Data Showcase</Text>
      <Text style={[typography.body, styles.description]}>
        Demonstrating comprehensive country data with search functionality, phone patterns, and internationalization.
      </Text>
      
      {/* Country Selection */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Country Selection</Text>
        
        <View style={styles.inputField}>
          <LabeledField
            label="Select Country"
            value={selectedCountry}
            onChange={handleCountryChange}
            placeholder="Search for a country..."
            InputComponent={SelectInputAdapter}
            inputProps={{ 
              options: countryOptions,
              searchable: true,
              searchPlaceholder: "Type country name, code, or dial code..."
            }}
          />
        </View>
        
        <View style={styles.sortControls}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <View style={styles.sortButtons}>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'alphabetical' && styles.sortButtonActive]}
              onPress={() => setSortBy('alphabetical')}
            >
              <Text style={[styles.sortButtonText, sortBy === 'alphabetical' && styles.sortButtonTextActive]}>
                A-Z
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'priority' && styles.sortButtonActive]}
              onPress={() => setSortBy('priority')}
            >
              <Text style={[styles.sortButtonText, sortBy === 'priority' && styles.sortButtonTextActive]}>
                Priority
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Selected Country Info */}
      {selectedCountryData && (
        <View style={styles.inputSection}>
          <Text style={[typography.h4, styles.subsectionTitle]}>Selected Country Information</Text>
          
          <View style={styles.countryInfo}>
            <Text style={styles.countryName}>{selectedCountryData.name}</Text>
            <Text style={styles.countryCode}>Code: {selectedCountryData.code}</Text>
            <Text style={styles.dialCode}>Dial Code: {selectedCountryData.dialCode}</Text>
            <Text style={styles.phoneExample}>Example: {selectedCountryData.phoneExample}</Text>
            <Text style={styles.pattern}>Pattern: {selectedCountryData.phonePattern}</Text>
            <Text style={styles.searchTerms}>
              Search Terms: {selectedCountryData.searchTerms.join(', ')}
            </Text>
          </View>
        </View>
      )}

      {/* Search Results */}
      {searchQuery && (
        <View style={styles.inputSection}>
          <Text style={[typography.h4, styles.subsectionTitle]}>
            Search Results for "{searchQuery}" ({searchResults.length} countries)
          </Text>
          
          <View style={styles.searchResults}>
            {searchResults.slice(0, 10).map((country) => (
              <View key={country.code} style={styles.searchResultItem}>
                <Text style={styles.resultName}>
                  {country.flagIcon} {country.name}
                </Text>
                <Text style={styles.resultCode}>{country.dialCode}</Text>
              </View>
            ))}
            {searchResults.length > 10 && (
              <Text style={styles.moreResults}>
                ... and {searchResults.length - 10} more countries
              </Text>
            )}
          </View>
        </View>
      )}

      {/* Statistics */}
      <View style={styles.inputSection}>
        <Text style={[typography.h4, styles.subsectionTitle]}>Data Statistics</Text>
        
        <View style={styles.stats}>
          <Text style={styles.statItem}>Total Countries: {countryOptions.length}</Text>
          <Text style={styles.statItem}>High Priority: {countryOptions.filter(c => c.customData?.priority <= 20).length}</Text>
          <Text style={styles.statItem}>Search Terms: {countryOptions.reduce((acc, c) => acc + c.searchTerms.length, 0)}</Text>
          <Text style={styles.statItem}>Languages: Multiple (English, Korean, Chinese, Spanish, French, etc.)</Text>
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
  description: {
    ...spacingStyles.elementSpacing,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  inputSection: {
    marginBottom: 16,
  },
  subsectionTitle: {
    ...spacingStyles.subsectionSpacing,
    color: colors.text.secondary,
  },
  inputField: {
    ...spacingStyles.elementSpacing,
  },
  countryInfo: {
    backgroundColor: colors.neutral[100],
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.neutral[300],
  },
  countryName: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: 8,
  },
  countryCode: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  dialCode: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  phoneExample: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  pattern: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  searchTerms: {
    ...typography.body,
    color: colors.text.secondary,
    fontSize: 12,
    fontStyle: 'italic',
  },
  searchResults: {
    backgroundColor: colors.neutral[100],
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    maxHeight: 200,
  },
  searchResultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  resultName: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
  },
  resultCode: {
    ...typography.body,
    color: colors.primary[500],
    fontWeight: '600',
  },
  moreResults: {
    ...typography.body,
    color: colors.text.secondary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
  stats: {
    backgroundColor: colors.neutral[100],
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.neutral[300],
  },
  statItem: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  sortControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  sortLabel: {
    ...typography.body,
    color: colors.text.secondary,
    marginRight: 12,
    fontSize: 14,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    backgroundColor: 'transparent',
  },
  sortButtonActive: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  sortButtonText: {
    ...typography.body,
    color: colors.text.secondary,
    fontSize: 12,
    fontWeight: '500',
  },
  sortButtonTextActive: {
    color: 'white',
  },
});

export default CountryDataShowcaseCard;
