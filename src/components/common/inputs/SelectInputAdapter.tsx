import React, { useState, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, typography, uiLayers } from '../styles';
import { useDropdown, useSearch, useHover } from '../hooks';
import { ModalOverlay, DropdownContainer, SearchInput, ClearButton, ChevronIcon } from '../components';
import type { InputAdapterProps } from './LabeledField';

export interface SelectOption {
  label: string;
  value: string | number;
  searchTerms?: string[]; // Additional search terms for filtering
  icon?: string; // Icon name for custom rendering
  customData?: any; // Additional data for custom rendering
}

export interface SelectInputAdapterProps extends InputAdapterProps<string | number> {
  options?: SelectOption[];
  placeholder?: string;
  borderRadius?: 'light' | 'full';
  inline?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  renderOption?: (option: SelectOption, isSelected: boolean, isHovered: boolean) => React.ReactNode;
  renderSelectedOption?: (option: SelectOption) => React.ReactNode;
  showClearButton?: boolean;
  onDropdownStateChange?: (isOpen: boolean) => void;
  containerRef?: React.RefObject<any>;
}

const SelectInputAdapter: React.FC<SelectInputAdapterProps> = ({
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  disabled = false,
  borderRadius = 'light',
  style,
  onFocus,
  onBlur,
  onDropdownStateChange,
  inline = false,
  searchable = false,
  searchPlaceholder = 'Search...',
  renderOption,
  renderSelectedOption,
  showClearButton = true,
  calculatedRadius,
  containerRef,
}) => {
  const [hoveredOption, setHoveredOption] = useState<string | number | null>(null);
  const selectRef = useRef<any>(null);
  const searchInputRef = useRef<any>(null);

  // Use shared hooks
  const { isOpen, dropdownLayout, openDropdown, closeDropdown } = useDropdown({
    onDropdownStateChange,
    containerRef,
    borderRadius,
  });

  const { searchQuery, setSearchQuery, filteredItems: filteredOptions, clearSearch } = useSearch({
    items: options,
    searchKeys: ['label'],
  });

  // Use the calculated radius from LabeledField for perfect matching
  const getDropdownRadius = () => {
    // Use the radius calculated by LabeledField if available
    if (calculatedRadius !== undefined) {
      return calculatedRadius;
    }
    // Fallback to original logic
    if (borderRadius === 'full') {
      return dropdownLayout.height / 2;
    }
    return 8; // Default light radius
  };

  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (selectedValue: string | number) => {
    onChange(selectedValue);
    closeDropdown();
    onBlur?.();
  };

  const handleOpen = () => {
    if (!disabled) {
      clearSearch();
      openDropdown();
    }
  };

  const handleClose = () => {
    closeDropdown();
    clearSearch();
    onBlur?.();
  };

  const handleClear = () => {
    onChange(''); // Clear the selection
    onBlur?.();
  };

  const renderOptionItem = ({ item, index }: { item: SelectOption; index: number }) => {
    const isSelected = item.value === value;
    const isHovered = hoveredOption === item.value;
    
    // Use custom render function if provided
    if (renderOption) {
      return (
        <TouchableOpacity
          style={[
            styles.option,
            isSelected && styles.selectedOption,
            isHovered && styles.hoveredOption,
            index === filteredOptions.length - 1 && styles.lastOption
          ]}
          onPress={() => handleSelect(item.value)}
          {...(Platform.OS === 'web' ? {
            onMouseEnter: () => setHoveredOption(item.value),
            onMouseLeave: () => setHoveredOption(null)
          } : {})}
        >
          {renderOption(item, isSelected, isHovered)}
        </TouchableOpacity>
      );
    }
    
    // Default rendering
    return (
      <TouchableOpacity
        style={[
          styles.option,
          isSelected && styles.selectedOption,
          isHovered && styles.hoveredOption,
          index === filteredOptions.length - 1 && styles.lastOption
        ]}
        onPress={() => handleSelect(item.value)}
        {...(Platform.OS === 'web' ? {
          onMouseEnter: () => setHoveredOption(item.value),
          onMouseLeave: () => setHoveredOption(null)
        } : {})}
      >
        <Text style={[
          styles.optionText,
          isSelected && styles.selectedOptionText
        ]}>
          {item.label}
        </Text>
        {isSelected && (
          <Ionicons name="checkmark" size={16} color={colors.primary[500]} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        ref={selectRef}
        style={[
          styles.selectContainer,
          disabled && styles.disabledContainer,
          isOpen && styles.dropdownOpenContainer,
          style
        ]}
        onPress={handleOpen}
        disabled={disabled}
        activeOpacity={1}
      >
        {selectedOption && renderSelectedOption ? (
          renderSelectedOption(selectedOption)
        ) : (
          <Text style={[
            styles.selectText,
            !selectedOption && styles.placeholderText,
            disabled && styles.disabledText
          ]}>
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
        )}
        
        <View style={styles.iconContainer}>
          {selectedOption && selectedOption.label && !disabled && showClearButton && (
            <ClearButton 
              onPress={handleClear}
              disabled={disabled}
            />
          )}
          
          <ChevronIcon 
            isOpen={isOpen}
            disabled={disabled}
          />
        </View>
      </TouchableOpacity>

      <ModalOverlay
        visible={isOpen}
        onClose={handleClose}
      >
        <DropdownContainer
          layout={dropdownLayout}
          borderRadius={getDropdownRadius()}
          maxHeight={200}
        >
          {searchable && (
            <SearchInput
              ref={searchInputRef}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={searchPlaceholder}
              autoFocus={true}
            />
          )}
          <FlatList
            data={filteredOptions}
            renderItem={renderOptionItem}
            keyExtractor={(item) => item.value.toString()}
            style={styles.optionsList}
            showsVerticalScrollIndicator={true}
            indicatorStyle="default"
            scrollIndicatorInsets={{ right: 2, top: 0, bottom: 0 }}
            nestedScrollEnabled={true}
            contentContainerStyle={{ paddingRight: Platform.OS === 'web' ? 0 : 4 }}
          />
        </DropdownContainer>
      </ModalOverlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  dropdownOpenContainer: {
    // This style will be applied when dropdown is open
    // The parent LabeledField will handle the border styling
  },
  disabledContainer: {
    backgroundColor: colors.neutral[100],
    opacity: 0.6,
  },
  selectText: {
    ...typography.body,
    fontSize: 14,
    color: colors.text.primary,
    flex: 1,
  },
  placeholderText: {
    color: colors.text.tertiary,
    fontSize: 14,
  },
  disabledText: {
    color: colors.neutral[500],
    fontSize: 14,
  },
  optionsList: {
    maxHeight: 200,
    paddingRight: Platform.OS === 'web' ? 0 : 2, // Add padding for scrollbar on native
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
    minHeight: 40,
    paddingHorizontal: 16,
  },
  selectedOption: {
    backgroundColor: colors.primary[100],
  },
  hoveredOption: {
    backgroundColor: colors.primary[100],
  },
  optionText: {
    ...typography.body,
    fontSize: 14,
    color: colors.text.primary,
    flex: 1,
  },
  selectedOptionText: {
    color: colors.primary[700],
    fontWeight: '400',
    fontSize: 14,
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default SelectInputAdapter;
