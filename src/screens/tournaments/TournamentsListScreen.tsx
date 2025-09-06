import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  ListRenderItem
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../layouts/MainLayout';

interface Tournament {
  id: number;
  name: string;
  status: 'Active' | 'Upcoming' | 'Completed';
  participants: number;
}

const TournamentsListScreen: React.FC = () => {
  const navigation = useNavigation();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadTournaments();
  }, []);

  const loadTournaments = async (): Promise<void> => {
    try {
      // Mock data for now - replace with actual API call
      const mockTournaments: Tournament[] = [
        { id: 1, name: 'Summer Championship 2024', status: 'Active', participants: 32 },
        { id: 2, name: 'Winter League 2024', status: 'Upcoming', participants: 16 },
        { id: 3, name: 'Spring Tournament 2024', status: 'Completed', participants: 24 },
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTournaments(mockTournaments);
    } catch (error) {
      console.error('Error loading tournaments:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTournament: ListRenderItem<Tournament> = ({ item }) => (
    <TouchableOpacity 
      style={styles.tournamentItem}
      onPress={() => navigation.navigate('TournamentDetail' as never, { tournamentId: item.id } as never)}
    >
      <View style={styles.tournamentInfo}>
        <Text style={styles.tournamentName}>{item.name}</Text>
        <Text style={styles.tournamentParticipants}>{item.participants} participants</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  const getStatusColor = (status: Tournament['status']): string => {
    switch (status) {
      case 'Active': return '#4CAF50';
      case 'Upcoming': return '#FF9800';
      case 'Completed': return '#9E9E9E';
      default: return '#9E9E9E';
    }
  };

  if (loading) {
    return (
      <MainLayout title="Tournaments">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading tournaments...</Text>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Tournaments">
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateTournament' as never)}
        >
          <Text style={styles.addButtonText}>+ Create New Tournament</Text>
        </TouchableOpacity>
        
        <FlatList
          data={tournaments}
          renderItem={renderTournament}
          keyExtractor={(item) => item.id.toString()}
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
  tournamentItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tournamentInfo: {
    flex: 1,
  },
  tournamentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  tournamentParticipants: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default TournamentsListScreen;
