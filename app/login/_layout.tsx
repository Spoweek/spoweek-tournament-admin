import React from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function LoginLayout() {
  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false, contentStyle: styles.stack }}>
        <Stack.Screen name="index" options={{ contentStyle: styles.stack }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stack: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
