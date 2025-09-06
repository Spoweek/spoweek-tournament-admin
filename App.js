import React from 'react';
import { View, Text } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { GlobalStyles } from './src/components/common/GlobalStyles';
import { useAppFonts } from './src/utils/fonts';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return null; // Don't show anything while fonts load
  }

  return (
    <GlobalStyles>
      <ThemeProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </ThemeProvider>
    </GlobalStyles>
  );
}