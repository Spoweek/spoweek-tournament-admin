import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';

export default function LoginLayout() {
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
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    justifyContent: 'center',
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
    alignItems: 'center',
  },
});
