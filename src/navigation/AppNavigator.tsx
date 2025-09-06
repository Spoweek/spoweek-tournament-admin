import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View, StyleSheet, ViewStyle } from 'react-native';

// Import screens
import LoginScreen from '../screens/auth/LoginScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import UsersListScreen from '../screens/users/UsersListScreen';
import TournamentsListScreen from '../screens/tournaments/TournamentsListScreen';
import DesignShowcaseScreen from '../screens/design/DesignShowcaseScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main authenticated navigation with tabs
const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#e0e0e0',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
        }}
      />
      <Tab.Screen 
        name="Users" 
        component={UsersListScreen}
        options={{
          tabBarLabel: 'Users',
        }}
      />
      <Tab.Screen 
        name="Tournaments" 
        component={TournamentsListScreen}
        options={{
          tabBarLabel: 'Tournaments',
        }}
      />
      <Tab.Screen 
        name="Design" 
        component={DesignShowcaseScreen}
        options={{
          tabBarLabel: 'Design',
        }}
      />
    </Tab.Navigator>
  );
};

// Auth navigation (login, register, etc.)
const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

// Loading component
const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

// Main app navigator
const AppNavigator: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  // Check URL for design page
  const isDesignPage = typeof window !== 'undefined' && 
    window.location.pathname === '/design';

  if (isDesignPage) {
    return <DesignShowcaseScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName={isAuthenticated ? "Main" : "Auth"}
      >
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default AppNavigator;
