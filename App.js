import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { GlobalStyles } from './src/components/common/GlobalStyles';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
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