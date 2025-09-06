import React, { useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

const TextInput = ({
  // Label configuration
  label,
  labelPosition = 'above', // 'above' or 'inside'
  placeholder,
  
  // Styling
  size = 'medium',
  borderRadius = 'light',
  variant = 'default',
  
  // State
  value,
  onChangeText,
  error,
  disabled = false,
  
  // Input props
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoCorrect = true,
  multiline = false,
  numberOfLines = 1,
  
  // Styling overrides
  style,
  inputStyle,
  labelStyle,
  errorStyle,
  
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getInputStyles = () => {
    const baseStyles = [styles.input];
    
    // Size variants
    if (size === 'small') {
      baseStyles.push(styles.smallInput);
    } else if (size === 'large') {
      baseStyles.push(styles.largeInput);
    }
    
    // Border radius variants
    if (borderRadius === 'full') {
      baseStyles.push(styles.fullRounded);
    }
    
    // State variants
    if (error) {
      baseStyles.push(styles.errorInput);
    } else if (isFocused) {
      baseStyles.push(styles.focusedInput);
    }
    
    if (disabled) {
      baseStyles.push(styles.disabledInput);
    }
    
    // Multiline adjustments
    if (multiline) {
      baseStyles.push(styles.multilineInput);
    }
    
    return baseStyles;
  };

  const getContainerStyles = () => {
    const baseStyles = [];
    
    // Border radius variants for container
    if (borderRadius === 'full') {
      baseStyles.push(styles.fullRoundedContainer);
    }
    
    // State variants for container
    if (error) {
      baseStyles.push(styles.errorContainer);
    } else if (isFocused) {
      baseStyles.push(styles.focusedContainer);
    }
    
    if (disabled) {
      baseStyles.push(styles.disabledContainer);
    }
    
    return baseStyles;
  };

  const getLabelStyles = () => {
    const baseStyles = [styles.label];
    
    // Size variants
    if (size === 'small') {
      baseStyles.push(styles.smallLabel);
    } else if (size === 'large') {
      baseStyles.push(styles.largeLabel);
    }
    
    // State variants
    if (error) {
      baseStyles.push(styles.errorLabel);
    } else if (isFocused) {
      baseStyles.push(styles.focusedLabel);
    }
    
    if (disabled) {
      baseStyles.push(styles.disabledLabel);
    }
    
    return baseStyles;
  };

  const getErrorStyles = () => {
    return [styles.errorText, errorStyle];
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Inside label (fixed left label with input on right)
  if (labelPosition === 'inside') {
    return (
      <View style={[styles.container, style]}>
        <View style={[styles.insideLabelContainer, ...getContainerStyles()]}>
          <View style={styles.insideLabelWrapper}>
            <Text
              style={[
                ...getLabelStyles(),
                styles.insideLabelFixed,
                labelStyle,
              ]}
            >
              {label}
            </Text>
          </View>
          <RNTextInput
            style={[
              ...getInputStyles(),
              styles.insideLabelInputField,
              Platform.OS === 'web' && styles.insideLabelInputFieldWeb,
              inputStyle,
            ]}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            placeholderTextColor={colors.text.tertiary}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            multiline={multiline}
            numberOfLines={numberOfLines}
            editable={!disabled}
            {...props}
          />
        </View>
        {error && (
          <Text style={getErrorStyles()}>
            {error}
          </Text>
        )}
      </View>
    );
  }

  // Above label (standard label above input)
  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[...getLabelStyles(), labelStyle]}>
          {label}
        </Text>
      )}
      <RNTextInput
        style={[
          ...getInputStyles(),
          inputStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        placeholderTextColor={colors.text.tertiary}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={!disabled}
        {...props}
      />
      {error && (
        <Text style={getErrorStyles()}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  
  inputContainer: {
    position: 'relative',
  },
  
  // Base input styles
  input: {
    backgroundColor: colors.background.primary,
    borderWidth: 1, // Clean 1px border
    borderColor: colors.neutral[300],
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14, // Reduced from 16px to 14px
    color: colors.text.primary,
    ...typography.input,
  },
  
  // Size variants
  smallInput: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12, // Reduced from 14px
  },
  largeInput: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16, // Reduced from 18px
  },
  
  // Border radius variants
  fullRounded: {
    borderRadius: 9999,
  },
  
  // State variants
  focusedInput: {
    borderColor: colors.primary[500],
    // Keep borderWidth: 1 (already set in base)
  },
  errorInput: {
    borderColor: colors.error[500],
    // Keep borderWidth: 1 (already set in base)
  },
  disabledInput: {
    backgroundColor: colors.neutral[100],
    borderColor: colors.neutral[200],
    color: colors.text.tertiary,
    // Keep borderWidth: 1 (already set in base)
  },
  
  // Multiline input
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  
  // Inside label container
  insideLabelContainer: {
    flexDirection: 'row',
    alignItems: 'stretch', // Changed from 'center' to 'stretch'
    backgroundColor: colors.background.primary,
    borderWidth: 1, // Clean 1px border
    borderColor: colors.neutral[300], // Light grey border
    borderRadius: 8,
    overflow: 'hidden',
    minHeight: 48, // Minimum height, can grow with content
  },
  
  // Container state variants
  focusedContainer: {
    borderColor: colors.primary[500],
    // Keep borderWidth: 1 (already set in base)
  },
  errorContainer: {
    borderColor: colors.error[500],
    // Keep borderWidth: 1 (already set in base)
  },
  disabledContainer: {
    backgroundColor: colors.neutral[100],
    borderColor: colors.neutral[200],
    // Keep borderWidth: 1 (already set in base)
  },
  
  // Container border radius variants
  fullRoundedContainer: {
    borderRadius: 9999,
  },
  
  // Inside label input field (right side)
  insideLabelInputField: {
    flex: 1,
    minHeight: 48, // Minimum height, grows with container
    borderWidth: 0,
    borderRadius: 0,
    paddingLeft: 12,
    paddingRight: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
    textAlignVertical: 'center',
    fontSize: 14, // Reduced from 16px to 14px
    color: colors.text.primary,
  },
  
  // Web-specific input field styles to remove focus highlighting
  insideLabelInputFieldWeb: {
    outline: 'none !important',
    boxShadow: 'none !important',
    border: 'none !important',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
  },
  
  // Label styles
  label: {
    ...typography.label,
    marginBottom: 8,
    color: colors.text.primary,
  },
  
  // Size variants for labels
  smallLabel: {
    fontSize: 12,
    marginBottom: 6,
  },
  largeLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  
  // State variants for labels
  focusedLabel: {
    color: colors.primary[500],
  },
  errorLabel: {
    color: colors.error[500],
  },
  disabledLabel: {
    color: colors.text.tertiary,
  },
  
  // Inside label wrapper
  insideLabelWrapper: {
    width: '20%',
    minHeight: 48, // Minimum height, can grow
    backgroundColor: colors.neutral[50],
    borderRightWidth: 1,
    borderRightColor: colors.neutral[300],
    justifyContent: 'center', // Vertical centering
    alignItems: 'flex-start', // Left alignment
    paddingLeft: 12,
    paddingRight: 8,
    paddingVertical: 12, // Add vertical padding for text wrapping
  },
  
  // Inside label (fixed left side)
  insideLabelFixed: {
    color: colors.text.primary,
    textAlign: 'left',
    fontSize: 12, // Reduced from 14px to match smaller text
    fontWeight: '500',
    marginBottom: 0, // Override base label marginBottom
    marginTop: 0, // Ensure no top margin either
    flexWrap: 'wrap', // Allow text wrapping
    lineHeight: 16, // Set line height for proper spacing
    // Word breaking for long text
    wordBreak: 'break-word', // Break long words
    overflowWrap: 'break-word', // Alternative word breaking
    hyphens: 'auto', // Add hyphens when breaking words
  },
  
  // Error text
  errorText: {
    ...typography.error,
    marginTop: 4,
  },
});

export default TextInput;
