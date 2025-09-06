import React from 'react';
import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import { globalStyles as typographyGlobalStyles } from '../../styles/typography';

// Global styles that apply to all text elements
export const globalStyles = StyleSheet.create({
  // Default text style that should be applied to all Text components
  text: {
    ...typographyGlobalStyles,
  },
  
  // Default input style
  input: {
    ...typographyGlobalStyles,
    fontSize: 16, // Slightly larger for inputs
  },
  
  // Default button text style
  buttonText: {
    ...typographyGlobalStyles,
    fontWeight: '500',
  },
});

// Component to apply global styles (for web)
export const GlobalStyles = ({ children }) => {
  return children;
};

export default globalStyles;
