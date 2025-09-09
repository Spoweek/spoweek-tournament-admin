import React, { useState, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Platform, Dimensions, Modal, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../../../styles/colors';
import { typography } from '../../../styles/typography';
import { uiLayers } from '../../../styles/zIndex';
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
  calculatedRadius,
  containerRef,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | number | null>(null);
  const [isClearHovered, setIsClearHovered] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const selectRef = useRef<any>(null);
  const searchInputRef = useRef<TextInput>(null);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery.trim()) {
      return options;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return options.filter(option => {
      // Search in label
      if (option.label.toLowerCase().includes(query)) {
        return true;
      }
      
      // Search in additional search terms
      if (option.searchTerms) {
        return option.searchTerms.some(term => 
          term.toLowerCase().includes(query)
        );
      }
      
      return false;
    });
  }, [options, searchQuery, searchable]);

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
    setIsOpen(false);
    onDropdownStateChange?.(false);
    onBlur?.();
  };

  const handleOpen = () => {
    if (!disabled) {
      // Clear search when opening
      setSearchQuery('');
      
      // Use container ref if available for more precise measurements
      const elementToMeasure = containerRef?.current || selectRef.current;
      
      elementToMeasure?.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
        let adjustedX, adjustedWidth, adjustedY;
        
        if (containerRef?.current) {
          // If we have container ref, we're measuring the bordered container directly
          // Round to avoid sub-pixel issues
          adjustedX = Math.round(pageX);
          adjustedWidth = Math.round(width);
          adjustedY = Math.round(pageY + height - 1); // Overlap by 1px for seamless connection
        } else {
          // Fallback to measuring SelectInputAdapter with border adjustments
          const borderWidth = 1;
          adjustedX = Math.round(pageX - borderWidth);
          adjustedWidth = Math.round(width + (borderWidth * 2));
          adjustedY = Math.round(pageY + height - 1);
        }
        
        setDropdownLayout({ 
          x: adjustedX, 
          y: adjustedY - 1, 
          width: adjustedWidth, 
          height 
        });
        
        setIsOpen(true);
        onDropdownStateChange?.(true);
        // Don't call onFocus to prevent blinking from focus state changes
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery(''); // Clear search when closing
    onDropdownStateChange?.(false);
    onBlur?.();
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
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
        <Text style={[
          styles.selectText,
          !selectedOption && styles.placeholderText,
          disabled && styles.disabledText
        ]}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        
        <View style={styles.iconContainer}>
          {selectedOption && !disabled && (
            <TouchableOpacity 
              onPress={handleClear}
              style={[
                styles.clearButton,
                isClearHovered && styles.clearButtonHovered
              ]}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              {...(Platform.OS === 'web' ? {
                onMouseEnter: () => setIsClearHovered(true),
                onMouseLeave: () => setIsClearHovered(false)
              } : {})}
            >
              <Ionicons 
                name="close" 
                size={14} 
                color={isClearHovered ? 'white' : (disabled ? colors.neutral[300] : colors.neutral[500])} 
              />
            </TouchableOpacity>
          )}
          
          <Ionicons 
            name={isOpen ? "chevron-up" : "chevron-down"} 
            size={16} 
            color={disabled ? colors.neutral[300] : colors.neutral[500]} 
          />
        </View>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="none"
        onRequestClose={handleClose}
        presentationStyle="overFullScreen"
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={handleClose}
        >
          <View style={[
              styles.dropdown,
              { 
                position: 'absolute',
                left: dropdownLayout.x,
                top: dropdownLayout.y,
                width: dropdownLayout.width,
                borderBottomLeftRadius: getDropdownRadius(),
                borderBottomRightRadius: getDropdownRadius(),
                // Ensure pixel-perfect rendering
                transform: [{ translateX: 0 }, { translateY: 0 }],
              }
            ]}>
            {searchable && (
              <View style={styles.searchContainer}>
                <TextInput
                  ref={searchInputRef}
                  style={styles.searchInput}
                  placeholder={searchPlaceholder}
                  placeholderTextColor={colors.neutral[500]}
                  value={searchQuery}
                  onChangeText={handleSearchChange}
                  autoFocus={true}
                />
                <Ionicons name="search" size={16} color={colors.neutral[500]} style={styles.searchIcon} />
              </View>
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
          </View>
        </TouchableOpacity>
      </Modal>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
    borderWidth: 0,
    minHeight: 44,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  dropdown: {
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.primary[500],
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: 200,
    zIndex: uiLayers.selectDropdown,
    overflow: 'hidden', // Clip scrollbar to dropdown bounds
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[300],
    backgroundColor: colors.background.primary,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    fontSize: 14,
    color: colors.text.primary,
    paddingVertical: 8,
    paddingRight: 8,
  },
  searchIcon: {
    marginLeft: 8,
  },
  optionsList: {
    maxHeight: 200,
    paddingRight: Platform.OS === 'web' ? 0 : 2, // Add padding for scrollbar on native
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
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
  clearButton: {
    padding: 2,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  clearButtonHovered: {
    backgroundColor: colors.primary[300],
  },
});

export default SelectInputAdapter;
