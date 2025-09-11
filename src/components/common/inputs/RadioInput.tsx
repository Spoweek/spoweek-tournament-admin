import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../styles';
import { typography } from '../styles';

export interface RadioOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface RadioInputProps {
  options: RadioOption[];
  value: string | number | (string | number)[];
  onChange: (value: string | number | (string | number)[]) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  style?: any;
  onFocus?: () => void;
  onBlur?: () => void;
  id?: string;
  name?: string;
  allowMultiple?: boolean;
  layout?: 'horizontal' | 'vertical';
}

const RadioInput: React.FC<RadioInputProps> = ({
  options = [],
  value,
  onChange,
  label,
  description,
  disabled = false,
  required = false,
  style,
  onFocus,
  onBlur,
  id,
  name,
  allowMultiple = false,
  layout = 'vertical',
}) => {
  const [hoveredOption, setHoveredOption] = useState<string | number | null>(null);

  const isSelected = useCallback((optionValue: string | number) => {
    if (allowMultiple) {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  }, [value, allowMultiple]);

  const handleOptionPress = useCallback((optionValue: string | number) => {
    if (disabled) return;
    
    onFocus?.();
    
    if (allowMultiple) {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.includes(optionValue)) {
        // Remove from selection
        onChange(currentValues.filter(v => v !== optionValue));
      } else {
        // Add to selection
        onChange([...currentValues, optionValue]);
      }
    } else {
      // Single selection - replace current value
      onChange(optionValue);
    }
    
    onBlur?.();
  }, [disabled, onChange, value, allowMultiple, onFocus, onBlur]);

  const getRadioStyle = (optionValue: string | number) => {
    const isOptionSelected = isSelected(optionValue);
    const isOptionHovered = hoveredOption === optionValue;
    
    if (disabled) return [styles.radio, styles.radioDisabled];
    if (isOptionSelected) return [styles.radio, styles.radioSelected];
    if (isOptionHovered) return [styles.radio, styles.radioHovered];
    return styles.radio;
  };

  const getIconStyle = (optionValue: string | number) => {
    const isOptionSelected = isSelected(optionValue);
    
    if (disabled) return [styles.icon, styles.iconDisabled];
    if (isOptionSelected) return [styles.icon, styles.iconSelected];
    if (hoveredOption === optionValue) return [styles.icon, styles.iconHovered];
    return styles.icon;
  };

  const getIconName = (optionValue: string | number) => {
    const isOptionSelected = isSelected(optionValue);
    return isOptionSelected ? "checkmark" : "checkmark-outline";
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, disabled && styles.disabledLabel]}>
            {label}
          </Text>
          {required && <View style={styles.requiredIndicator} />}
        </View>
      )}

      {description !== '' && (
        <Text style={[styles.description, disabled && styles.disabledDescription]}>
          {description}
        </Text>
      )}
      
      <View style={[
        styles.optionsContainer,
        layout === 'horizontal' && styles.horizontalLayout
      ]}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={`${option.value}-${index}`}
            style={[
              styles.optionContainer,
              layout === 'horizontal' && styles.horizontalOption,
              disabled && styles.disabledContainer,
            ]}
            onPress={() => handleOptionPress(option.value)}
            disabled={disabled || option.disabled}
            activeOpacity={1}
            testID={`${id}-option-${option.value}`}
            accessibilityLabel={`${name}-option-${option.label}`}
            {...(Platform.OS === 'web' ? {
              onMouseEnter: () => setHoveredOption(option.value),
              onMouseLeave: () => setHoveredOption(null)
            } : {})}
          >
            <View style={getRadioStyle(option.value)}>
              <Ionicons
                name={getIconName(option.value)}
                style={getIconStyle(option.value)}
              />
            </View>
            
            <Text style={[
              styles.optionText,
              disabled && styles.disabledText,
              isSelected(option.value) && styles.selectedText
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    ...typography.body,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  disabledLabel: {
    color: colors.neutral[500],
  },
  requiredIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.error[500],
    marginLeft: 4,
  },
  description: {
    ...typography.body,
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  disabledDescription: {
    color: colors.neutral[500],
  },
  optionsContainer: {
    gap: 12,
  },
  horizontalLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalOption: {
    marginRight: 16,
  },
  disabledContainer: {
    opacity: 0.6,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: '100%',
    backgroundColor: colors.neutral[500],
    borderWidth: 1,
    borderColor: colors.neutral[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  radioHovered: {
    backgroundColor: colors.primary[300],
    borderColor: colors.primary[300],
  },
  radioDisabled: {
    // No additional styles needed for disabled state
  },
  icon: {
    fontSize: 16,
    color: 'white',
  },
  iconSelected: {
    color: 'white',
  },
  iconHovered: {
    color: 'white',
  },
  iconDisabled: {
    color: colors.neutral[300],
  },
  optionText: {
    ...typography.body,
    fontSize: 14,
    color: colors.text.primary,
    flex: 1,
  },
  disabledText: {
    color: colors.neutral[500],
  },
  selectedText: {
    color: colors.text.primary,
    fontWeight: '500',
  },
});

export default RadioInput;
