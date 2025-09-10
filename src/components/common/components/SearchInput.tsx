import React, { forwardRef } from 'react';
import { View, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, typography } from '../styles';

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  disabled?: boolean;
  autoFocus?: boolean;
}

export const SearchInput = forwardRef<TextInput, SearchInputProps>(({
  value,
  onChangeText,
  placeholder = 'Search...',
  placeholderTextColor = colors.neutral[500],
  style,
  inputStyle,
  disabled = false,
  autoFocus = false,
}, ref) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        ref={ref}
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        editable={!disabled}
        autoFocus={autoFocus}
      />
      <Ionicons name="search" size={16} color={colors.neutral[500]} style={styles.icon} />
    </View>
  );
});

SearchInput.displayName = 'SearchInput';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[300],
    backgroundColor: colors.background.primary,
  },
  input: {
    flex: 1,
    ...typography.body,
    fontSize: 14,
    color: colors.text.primary,
    minHeight: 40,
    paddingHorizontal: 16,
  },
  icon: {
    marginLeft: 8,
    marginRight: 16,
  },
});

export default SearchInput;
