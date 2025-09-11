import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../src/context/AuthContext';
import { ThemeProvider } from '../src/context/ThemeContext';
import { GlobalStyles } from '../src/components/common/GlobalStyles';
import { useAppFonts } from '../src/components/common';
import { suppressSpecificWarnings } from '../src/components/common';

// Suppress specific React Native Web warnings
suppressSpecificWarnings();

export default function RootLayout() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return null; // Don't show anything while fonts load
  }

  return (
    <GlobalStyles>
      <ThemeProvider>
        <SafeAreaProvider>
          <AuthProvider>
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="login" />
              <Stack.Screen name="dashboard" />
              <Stack.Screen name="design" />
            </Stack>
          </AuthProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </GlobalStyles>
  );
}
