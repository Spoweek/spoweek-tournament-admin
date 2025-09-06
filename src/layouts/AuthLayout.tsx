import React, { useEffect, ReactNode } from 'react';
import { View, ScrollView, StyleSheet, Platform, ViewStyle } from 'react-native';

export interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  // Fix body overflow on web
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Store original overflow value
      const originalOverflow = document.body.style.overflow;
      
      // Enable scrolling
      document.body.style.overflow = 'auto';
      
      // Cleanup: restore original overflow on unmount
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, []);

  // Use different components for web vs native
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webContainer}>
        <View style={styles.webContent}>
          {children}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        alwaysBounceVertical={false}
      >
        <View style={styles.content}>
          {children}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  // Web-specific styles (body scrolling enabled)
  webContainer: {
    ...Platform.select({
      web: {
        minHeight: '100vh' as any,
        display: 'flex' as any,
      },
      default: {
        minHeight: '100%',
      },
    }),
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webContent: {
    width: '100%',
    maxWidth: 700,
  },
  scrollView: {
    flex: 1,
    // Web-specific styles for better scrolling
    ...Platform.select({
      web: {
        overflow: 'auto' as any,
        WebkitOverflowScrolling: 'touch' as any,
      },
      default: {},
    }),
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 40,
    ...Platform.select({
      web: {
        minHeight: '100vh' as any, // Ensure full viewport height on web
      },
      default: {
        minHeight: '100%',
      },
    }),
  },
  content: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
  },
});

export default AuthLayout;
