import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  RefreshControl,
  ViewStyle,
  TextStyle,
  ListRenderItem
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../layouts/MainLayout';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UsersListScreen: React.FC = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async (): Promise<void> => {
    try {
      // Mock data for now - replace with actual API call
      const mockUsers: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator' },
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(mockUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = (): void => {
    setRefreshing(true);
    loadUsers();
  };

  const renderUser: ListRenderItem<User> = ({ item }) => (
    <TouchableOpacity 
      style={styles.userItem}
      onPress={() => navigation.navigate('UserDetail' as never, { userId: item.id } as never)}
    >
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userRole}>{item.role}</Text>
      </View>
      <View style={styles.userActions}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = (): React.ReactElement => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No users found</Text>
    </View>
  );

  if (loading) {
    return (
      <MainLayout title="Users">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading users...</Text>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Users">
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateUser' as never)}
        >
          <Text style={styles.addButtonText}>+ Add New User</Text>
        </TouchableOpacity>
        
        <FlatList
          data={users}
          renderItem={renderUser}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={renderEmpty}
          style={styles.list}
        />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  userItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  userActions: {
    paddingLeft: 10,
  },
  arrow: {
    fontSize: 20,
    color: '#ccc',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default UsersListScreen;
