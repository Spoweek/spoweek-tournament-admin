import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ViewStyle, TextStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../layouts/MainLayout';

interface MenuItem {
  title: string;
  description: string;
  screen: string;
  color: string;
}

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation();

  const menuItems: MenuItem[] = [
    {
      title: 'Manage Users',
      description: 'View, add, and manage user accounts',
      screen: 'Users',
      color: '#4CAF50',
    },
    {
      title: 'Manage Tournaments',
      description: 'Create and manage tournaments',
      screen: 'Tournaments',
      color: '#2196F3',
    },
    {
      title: 'Reports',
      description: 'View analytics and reports',
      screen: 'Reports',
      color: '#FF9800',
    },
    {
      title: 'Settings',
      description: 'Configure application settings',
      screen: 'Settings',
      color: '#9C27B0',
    },
  ];

  const handleNavigate = (screen: string): void => {
    navigation.navigate(screen as never);
  };

  return (
    <MainLayout title="Dashboard">
      <ScrollView style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to Tournament Admin</Text>
        <Text style={styles.subtitle}>Choose an option below to get started</Text>
        
        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { borderLeftColor: item.color }]}
              onPress={() => handleNavigate(item.screen)}
            >
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
              <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                <Text style={styles.menuIconText}>{item.title.charAt(0)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  menuGrid: {
    gap: 16,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: '#666',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  menuIconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
