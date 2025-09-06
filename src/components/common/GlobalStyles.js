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
  // Set global font for web
  if (Platform.OS === 'web') {
    React.useEffect(() => {
      const style = document.createElement('style');
      style.textContent = `
        * {
          font-family: 'NotoSansKR_400Regular', 'Noto Sans KR', sans-serif !important;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }, []);
  }

  return children;
};

export default globalStyles;
