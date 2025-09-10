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

export interface CheckboxInputProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  text?: string;
  disabled?: boolean;
  required?: boolean;
  style?: any;
  onFocus?: () => void;
  onBlur?: () => void;
  id?: string;
  name?: string;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  value = false,
  onChange,
  label,
  text,
  disabled = false,
  required = false,
  style,
  onFocus,
  onBlur,
  id,
  name,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePress = useCallback(() => {
    if (disabled) return;
    
    onFocus?.();
    onChange(!value);
    onBlur?.();
  }, [disabled, onChange, value, onFocus, onBlur]);

  const getCheckboxStyle = () => {
    if (disabled) return [styles.checkbox, styles.checkboxDisabled];
    if (value) return [styles.checkbox, styles.checkboxChecked];
    if (isHovered) return [styles.checkbox, styles.checkboxHovered];
    return styles.checkbox;
  };

  const getIconStyle = () => {
    if (disabled) return [styles.icon, styles.iconDisabled];
    if (value) return [styles.icon, styles.iconChecked];
    if (isHovered) return [styles.icon, styles.iconHovered];
    return styles.icon;
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
      
      <TouchableOpacity
        style={[
          styles.checkboxContainer,
          disabled && styles.disabledContainer,
        ]}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={1}
        testID={id}
        accessibilityLabel={name}
        {...(Platform.OS === 'web' ? {
          onMouseEnter: () => setIsHovered(true),
          onMouseLeave: () => setIsHovered(false)
        } : {})}
      >
        <View style={getCheckboxStyle()}>
          <Ionicons
            name={value ? "checkmark" : "checkmark-outline"}
            style={getIconStyle()}
          />
        </View>
        
        {text && (
          <Text style={[
            styles.text,
            disabled && styles.disabledText,
            value && styles.checkedText
          ]}>
            {text}
          </Text>
        )}
      </TouchableOpacity>
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabledContainer: {
    opacity: 0.6,
  },
  checkbox: {
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
  checkboxChecked: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  checkboxHovered: {
    backgroundColor: colors.primary[300],
    borderColor: colors.primary[300],
  },
  checkboxDisabled: {
    // No additional styles needed for disabled state
  },
  icon: {
    fontSize: 16,
    color: 'white',
  },
  iconChecked: {
    color: 'white',
  },
  iconHovered: {
    color: 'white',
  },
  iconDisabled: {
    color: colors.neutral[300],
  },
  text: {
    ...typography.body,
    fontSize: 14,
    color: colors.text.primary,
    flex: 1,
  },
  disabledText: {
    color: colors.neutral[500],
  },
  checkedText: {
    color: colors.text.primary,
    fontWeight: '500',
  },
});

export default CheckboxInput;
