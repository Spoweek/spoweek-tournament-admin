import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ViewStyle, TextStyle } from 'react-native';
import { Link } from 'expo-router';
import { shadows } from '../../src/components/common';

interface MenuItem {
  title: string;
  description: string;
  href: string;
  color: string;
}

export default function DashboardScreen() {
  const menuItems: MenuItem[] = [
    {
      title: 'Manage Users',
      description: 'View, add, and manage user accounts',
      href: '/users',
      color: '#4CAF50',
    },
    {
      title: 'Manage Tournaments',
      description: 'Create and manage tournaments',
      href: '/tournaments',
      color: '#2196F3',
    },
    {
      title: 'Reports',
      description: 'View analytics and reports',
      href: '/reports',
      color: '#FF9800',
    },
    {
      title: 'Design System',
      description: 'View and test UI components',
      href: '/design',
      color: '#9C27B0',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Tournament Admin</Text>
      <Text style={styles.subtitle}>Choose an option below to get started</Text>
      
      <View style={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href} asChild>
            <TouchableOpacity
              style={[styles.menuItem, { borderLeftColor: item.color }]}
            >
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
              <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                <Text style={styles.menuIconText}>{item.title.charAt(0)}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

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
    ...shadows.large,
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
