import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Platform, Dimensions, Modal } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../../../styles/colors';
import { typography } from '../../../styles/typography';
import { uiLayers } from '../../../styles/zIndex';
import type { InputAdapterProps } from './LabeledField';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectInputAdapterProps extends InputAdapterProps<string | number> {
  options?: SelectOption[];
  placeholder?: string;
  borderRadius?: 'light' | 'full';
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | number | null>(null);
  const [dropdownLayout, setDropdownLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const selectRef = useRef<any>(null);

  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (selectedValue: string | number) => {
    onChange(selectedValue);
    setIsOpen(false);
    onBlur?.();
  };

  const handleOpen = () => {
    if (!disabled) {
      selectRef.current?.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
        setDropdownLayout({ x: pageX, y: pageY + height, width, height });
        setIsOpen(true);
        // Don't call onFocus to prevent blinking from focus state changes
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onBlur?.();
  };

  const renderOption = ({ item }: { item: SelectOption }) => (
    <TouchableOpacity
      style={[
        styles.option,
        item.value === value && styles.selectedOption,
        hoveredOption === item.value && styles.hoveredOption
      ]}
      onPress={() => handleSelect(item.value)}
      {...(Platform.OS === 'web' ? {
        onMouseEnter: () => setHoveredOption(item.value),
        onMouseLeave: () => setHoveredOption(null)
      } : {})}
    >
      <Text style={[
        styles.optionText,
        item.value === value && styles.selectedOptionText
      ]}>
        {item.label}
      </Text>
      {item.value === value && (
        <Ionicons name="checkmark" size={16} color={colors.primary[500]} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        ref={selectRef}
        style={[
          styles.selectContainer,
          disabled && styles.disabledContainer,
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
        <Ionicons 
          name={isOpen ? "chevron-up" : "chevron-down"} 
          size={16} 
          color={disabled ? colors.neutral[300] : colors.neutral[500]} 
        />
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
              borderBottomLeftRadius: borderRadius === 'full' ? 9999 : 8,
              borderBottomRightRadius: borderRadius === 'full' ? 9999 : 8,
            }
          ]}>
            <FlatList
              data={options}
              renderItem={renderOption}
              keyExtractor={(item) => item.value.toString()}
              style={styles.optionsList}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
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
  },
  disabledText: {
    color: colors.neutral[500],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  dropdown: {
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderTopWidth: 0,
    maxHeight: 200,
    zIndex: uiLayers.selectDropdown,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
      },
    }),
  },
  optionsList: {
    maxHeight: 200,
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
  },
});

export default SelectInputAdapter;
