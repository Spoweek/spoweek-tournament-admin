import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CountryFlag from 'react-native-country-flag';
import { colors } from '../../../styles/colors';
import { typography } from '../../../styles/typography';
import SelectInputAdapter from './SelectInputAdapter';
import { SelectOption } from './SelectInputAdapter';
import { getCountriesAlphabetically, getCountryByCode, CountryData } from '../../../data/countries';
import type { InputAdapterProps } from './LabeledField';

export interface PhoneValue {
  countryCode: string;
  phoneNumber: string;
}

export interface PhoneInputAdapterProps extends InputAdapterProps<PhoneValue> {
  mode: 'international' | 'local';
  localCountryCode?: string; // Required when mode is 'local'
  onDropdownStateChange?: (isOpen: boolean) => void;
  containerRef?: React.RefObject<any>;
  calculatedRadius?: number;
}

const PhoneInputAdapter: React.FC<PhoneInputAdapterProps> = ({
  value,
  onChange,
  placeholder = 'Enter phone number',
  disabled = false,
  mode,
  localCountryCode,
  onDropdownStateChange,
  containerRef,
  calculatedRadius,
  style,
}) => {
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);

  // Get country options based on mode
  const countryOptions: CountryData[] = useMemo(() => {
    if (mode === 'local' && localCountryCode) {
      const country = getCountryByCode(localCountryCode);
      return country ? [country] : [];
    }
    return getCountriesAlphabetically();
  }, [mode, localCountryCode]);

  // Get current country data
  const currentCountry: CountryData | undefined = useMemo(() => {
    return getCountryByCode(value.countryCode) || countryOptions[0];
  }, [value.countryCode, countryOptions]);

  // Convert country data to select options
  const countrySelectOptions: SelectOption[] = useMemo(() => {
    return countryOptions.map(country => ({
      value: country.code,
      label: country.dialCode, // This will be the dial code like "+82"
      searchTerms: [country.name, country.code, country.dialCode, ...country.searchTerms],
      customData: country,
    }));
  }, [countryOptions]);

  // Validate phone number
  const isValidPhone = useMemo(() => {
    if (!value.phoneNumber || !currentCountry) return false;
    // Clean the phone number to remove formatting (dashes, parentheses, spaces)
    const cleanedPhone = value.phoneNumber.replace(/\D/g, '');
    const regex = new RegExp(currentCountry.phonePattern);
    return regex.test(cleanedPhone);
  }, [value.phoneNumber, currentCountry]);

  // Format phone number for display
  const formatPhoneNumber = useCallback((phone: string, countryCode: string) => {
    const country = getCountryByCode(countryCode);
    if (!country) return phone;

    // Korean formatting: ###-####-####
    if (countryCode === 'KR') {
      const cleaned = phone.replace(/\D/g, '');
      if (cleaned.length <= 3) return cleaned;
      if (cleaned.length <= 7) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
    }

    // US/Canada formatting: (###) ###-####
    if (countryCode === 'US' || countryCode === 'CA') {
      const cleaned = phone.replace(/\D/g, '');
      if (cleaned.length <= 3) return cleaned;
      if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }

    return phone;
  }, []);

  const handleCountryChange = useCallback((selectedValue: string | number) => {
    const countryCode = String(selectedValue);
    onChange({
      countryCode,
      phoneNumber: value.phoneNumber,
    });
  }, [onChange, value.phoneNumber]);

  const handleCountryDropdownStateChange = useCallback((isOpen: boolean) => {
    onDropdownStateChange?.(isOpen);
  }, [onDropdownStateChange]);

  const handlePhoneChange = useCallback((text: string) => {
    // Remove non-numeric characters for processing
    const cleaned = text.replace(/\D/g, '');
    
    // Apply country-specific formatting
    const formatted = formatPhoneNumber(cleaned, value.countryCode);
    
    onChange({
      countryCode: value.countryCode,
      phoneNumber: formatted,
    });
  }, [onChange, value.countryCode, formatPhoneNumber]);

  const handlePhoneFocus = useCallback(() => {
    setIsPhoneFocused(true);
  }, []);

  const handlePhoneBlur = useCallback(() => {
    setIsPhoneFocused(false);
  }, []);

  // Custom render function for country options (flag + dial code)
  const renderCountryOption = useCallback((option: SelectOption, isSelected: boolean, isHovered: boolean) => {
    return (
      <View style={styles.countryOptionContent}>
        <View style={styles.countryFlagContainer}>
          <CountryFlag 
            isoCode={option.customData?.code || option.value as string} 
            size={20}
          />
        </View>
        <Text style={styles.countryDialCode}>{option.label}</Text>
      </View>
    );
  }, []);

  // Custom render function for selected country option (flag + dial code)
  const renderSelectedCountryOption = useCallback((option: SelectOption) => {
    return (
      <View style={styles.countryOptionContent}>
        <View style={styles.countryFlagContainer}>
          <CountryFlag 
            isoCode={option.customData?.code || option.value as string} 
            size={20}
          />
        </View>
        <Text style={styles.countryDialCode}>{option.label}</Text>
      </View>
    );
  }, []);

  return (
    <View style={[styles.container, style]}>
      {/* Country Code Dropdown */}
      {mode === 'international' && (
        <View style={styles.countrySection}>
          <SelectInputAdapter
            value={value.countryCode}
            onChange={handleCountryChange}
            options={countrySelectOptions}
            placeholder="+##"
            disabled={disabled}
            searchable={true}
            searchPlaceholder="Search countries..."
            renderOption={renderCountryOption}
            renderSelectedOption={renderSelectedCountryOption}
            showClearButton={false}
            style={styles.countrySelect}
            onDropdownStateChange={handleCountryDropdownStateChange}
            containerRef={containerRef}
            calculatedRadius={calculatedRadius}
          />
        </View>
      )}

      {/* Phone Number Input */}
      <View style={styles.phoneSection}>
        <TextInput
          style={[
            styles.phoneInput,
            isPhoneFocused && styles.phoneInputFocused,
            disabled && styles.phoneInputDisabled,
            isValidPhone && styles.phoneInputValid,
            !isValidPhone && value.phoneNumber && styles.phoneInputInvalid,
          ]}
          value={value.phoneNumber}
          onChangeText={handlePhoneChange}
          onFocus={handlePhoneFocus}
          onBlur={handlePhoneBlur}
          placeholder={placeholder}
          placeholderTextColor={colors.text.tertiary}
          editable={!disabled}
          keyboardType="phone-pad"
          autoComplete="tel"
        />
        
        {/* Validation Icon */}
        {value.phoneNumber && (
          <View style={styles.validationIcon}>
            <Ionicons
              name={isValidPhone ? 'checkmark-circle' : 'close-circle'}
              size={20}
              color={isValidPhone ? colors.success[500] : colors.error[500]}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  countrySection: {
    width: 100,
    marginRight: 8,
  },
  countrySelect: {
    // Minimal styling - let LabeledField handle borders/background
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  countryOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  countryDialCode: {
    ...typography.body,
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  phoneSection: {
    flex: 1,
    position: 'relative',
  },
  phoneInput: {
    // Minimal styling - let LabeledField handle borders/background
    backgroundColor: 'transparent',
    borderWidth: 0,
    ...typography.body,
    color: colors.text.primary,
    fontSize: 14,
  },
  phoneInputFocused: {
    // No additional styling needed
  },
  phoneInputDisabled: {
    color: colors.text.tertiary,
  },
  phoneInputValid: {
    // Validation styling handled by parent
  },
  phoneInputInvalid: {
    // Validation styling handled by parent
  },
  validationIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  countryFlagContainer: {
    shadowColor: colors.neutral[700],
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    // Web-specific shadow - using same color as mobile
    ...(Platform.OS === 'web' ? {
      boxShadow: `0 0 5px ${colors.neutral[700]}40`, // 20 = 0.1 opacity in hex
    } : {}),
  },
});

export default PhoneInputAdapter;