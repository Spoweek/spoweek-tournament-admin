import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';

// Conditional import for expo-document-picker
let DocumentPicker: any = null;
try {
  DocumentPicker = require('expo-document-picker');
} catch (error) {
  console.warn('expo-document-picker not available:', error);
}
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../../../styles/colors';
import { typography } from '../../../styles/typography';
import type { InputAdapterProps } from './LabeledField';

// File type presets for common use cases
export const FILE_TYPE_PRESETS = {
  images: ['image/*'],
  documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  excel: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  zip: ['application/zip', 'application/x-zip-compressed'],
  text: ['text/plain', 'text/csv'],
  all: ['*/*'],
} as const;

export type FileTypePreset = keyof typeof FILE_TYPE_PRESETS;

export interface FileInputAdapterProps extends InputAdapterProps<any[] | null> {
  placeholder?: string;
  borderRadius?: 'light' | 'full';
  inline?: boolean;
  allowMultiple?: boolean;
  accept?: string[] | FileTypePreset; // MIME types to accept or preset name
  maxFiles?: number; // Maximum number of files when allowMultiple is true
}

const FileInputAdapter: React.FC<FileInputAdapterProps> = ({
  value = null,
  onChange,
  placeholder = 'Please choose a file',
  disabled = false,
  borderRadius = 'light',
  style,
  onFocus,
  onBlur,
  inline = false,
  allowMultiple = false,
  accept = 'all',
  maxFiles = 10,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Resolve accept types - either use preset or custom array
  const getAcceptTypes = useCallback(() => {
    if (typeof accept === 'string') {
      return FILE_TYPE_PRESETS[accept] || FILE_TYPE_PRESETS.all;
    }
    return accept.length > 0 ? accept : FILE_TYPE_PRESETS.all;
  }, [accept]);

  const handleFilePick = useCallback(async () => {
    if (disabled) return;

    if (!DocumentPicker) {
      Alert.alert('Error', 'File picker is not available on this platform.');
      return;
    }

    try {
      onFocus?.();
      setIsFocused(true);

      const acceptTypes = getAcceptTypes();
      const result = await DocumentPicker.getDocumentAsync({
        type: acceptTypes,
        multiple: allowMultiple,
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const files = result.assets;
        
        // Check max files limit
        if (allowMultiple && files.length > maxFiles) {
          Alert.alert(
            'Too many files',
            `Please select no more than ${maxFiles} files.`
          );
          return;
        }

        // Convert to File-like objects (for compatibility)
        const fileObjects = files.map((file: any) => ({
          name: file.name,
          uri: file.uri,
          size: file.size,
          mimeType: file.mimeType,
        }));

        onChange?.(fileObjects);
      }
    } catch (error) {
      console.error('Error picking file:', error);
      Alert.alert('Error', 'Failed to pick file. Please try again.');
    } finally {
      setIsFocused(false);
      onBlur?.();
    }
  }, [disabled, onFocus, onBlur, onChange, getAcceptTypes, allowMultiple, maxFiles]);

  const handleClear = useCallback(() => {
    if (disabled) return;
    onChange?.(null);
  }, [disabled, onChange]);

  const getDisplayText = () => {
    if (!value || value.length === 0) {
      return placeholder;
    }

    if (value.length === 1) {
      return value[0].name;
    }

    return `${value.length} files chosen`;
  };

  const hasFiles = value && value.length > 0;

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[
          styles.inputContainer,
          disabled && styles.disabledInput,
          isFocused && styles.focusedInput,
        ]}
        onPress={handleFilePick}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Ionicons 
          name="document-outline" 
          size={16} 
          color={colors.text.primary} 
          style={styles.icon} 
        />
        <Text style={[
          styles.inputText,
          !hasFiles && styles.placeholderText,
          disabled && styles.disabledText
        ]}>
          {getDisplayText()}
        </Text>
        {hasFiles && (
          <TouchableOpacity
            style={[
              styles.clearButton,
              isHovered && styles.hoveredClearButton
            ]}
            onPress={handleClear}
            disabled={disabled}
            activeOpacity={0.7}
            {...(Platform.OS === 'web' ? {
              onMouseEnter: () => setIsHovered(true),
              onMouseLeave: () => setIsHovered(false)
            } : {})}
          >
            <Ionicons 
              name="close" 
              size={16} 
              color={disabled ? colors.neutral[300] : colors.text.secondary} 
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  disabledInput: {
    backgroundColor: colors.neutral[100],
    opacity: 0.6,
  },
  focusedInput: {
    // Focus styles will be handled by parent LabeledField
  },
  icon: {
    marginRight: 8,
  },
  inputText: {
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
  clearButton: {
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  hoveredClearButton: {
    backgroundColor: colors.primary[100],
  },
});

export default FileInputAdapter;
