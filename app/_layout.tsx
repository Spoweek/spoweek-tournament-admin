import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../src/context/AuthContext';
import { ThemeProvider } from '../src/context/ThemeContext';
import { GlobalStyles } from '../src/components/common/GlobalStyles';
import { useAppFonts } from '../src/components/common';
import { suppressSpecificWarnings } from '../src/components/common';
import { StyleSheet } from 'react-native';

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
            <Stack screenOptions={{ headerShown: false, contentStyle: styles.stack }}>
              <Stack.Screen name="index" options={{ contentStyle: styles.stack }} />
              <Stack.Screen name="login" options={{ contentStyle: styles.stack }} />
              <Stack.Screen name="dashboard" />
              <Stack.Screen name="design" />
            </Stack>
          </AuthProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </GlobalStyles>
  );
}

const styles = StyleSheet.create({
  stack: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#ffffff',
    overflowY: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  }
});