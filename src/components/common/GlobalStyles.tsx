import React, { ReactNode, useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { globalStyles as typographyGlobalStyles } from './styles';

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

export interface GlobalStylesProps {
  children: ReactNode;
}

// Component to apply global styles (for web)
export const GlobalStyles: React.FC<GlobalStylesProps> = ({ children }) => {
  // Set global font for web
  if (Platform.OS === 'web') {
    useEffect(() => {
      const style = document.createElement('style');
      style.textContent = `
        * {
          font-family: 'NotoSansKR_400Regular', 'Noto Sans KR', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          font-smooth: always;
        }
        input:focus {
          outline: none !important;
          box-shadow: none !important;
          border: none !important;
        }
        input {
          outline: none !important;
          box-shadow: none !important;
        }
        /* Disable browser autofill highlighting/background */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active,
        input:-internal-autofill-selected {
          -webkit-box-shadow: 0 0 0 1000px white inset !important;
          -webkit-text-fill-color: inherit !important;
          background-color: transparent !important;
          background-image: none !important;
          transition: background-color 5000s ease-in-out 0s !important;
          animation: none !important;
          border-radius: 9999px !important;
        }
        /* Fix React Native Web's default transition behavior */
        div[role="button"] {
          transition: none !important;
          transition-duration: 0s !important;
        }
        /* Target Pressable elements specifically */
        div[style*="position: absolute"] {
          transition: none !important;
          transition-duration: 0s !important;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }, []);
  }

  return <>{children}</>;
};

export default globalStyles;
