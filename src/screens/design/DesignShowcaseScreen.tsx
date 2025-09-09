import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { globalStyles } from '../../components/common/GlobalStyles';
import { ColorPaletteCard, ButtonShowcaseCard, InputShowcaseCard, SelectInputShowcaseCard, TimeInputShowcaseCard, DateInputShowcaseCard, DateTimeInputShowcaseCard, FileInputShowcaseCard, CheckboxInputShowcaseCard } from './cards';


const DesignShowcaseScreen: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  // Listen for screen size changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
    });

    return () => subscription?.remove();
  }, []);

  // Calculate responsive grid columns based on screen width
  const getGridColumns = () => {
    if (screenWidth >= 1200) return 3;
    if (screenWidth >= 768) return 2;
    return 1;
  };

  const gridColumns = getGridColumns();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={[typography.h1, styles.title]}>Design Showcase</Text>
        <Text style={[typography.body, styles.subtitle]}>
          A comprehensive view of all design system components
        </Text>
      </View>
      
      <View style={styles.grid}>
        <View style={[styles.gridItem, { 
          width: gridColumns === 1 ? '100%' : `${100 / gridColumns}%`,
          paddingHorizontal: 6,
          paddingBottom: 16
        }]}>
          <ColorPaletteCard />
        </View>
        
        <View style={[styles.gridItem, { 
          width: gridColumns === 1 ? '100%' : `${100 / gridColumns}%`,
          paddingHorizontal: 6,
          paddingBottom: 16
        }]}>
          <ButtonShowcaseCard />
        </View>
        
        <View style={[styles.gridItem, { 
          width: gridColumns === 1 ? '100%' : `${100 / gridColumns}%`,
          paddingHorizontal: 6,
          paddingBottom: 16
        }]}>
          <InputShowcaseCard />
        </View>
        
        <View style={[styles.gridItem, { 
          width: gridColumns === 1 ? '100%' : `${100 / gridColumns}%`,
          paddingHorizontal: 6,
          paddingBottom: 16
        }]}>
          <SelectInputShowcaseCard />
        </View>
        
        <View style={[styles.gridItem, { 
          width: gridColumns === 1 ? '100%' : `${100 / gridColumns}%`,
          paddingHorizontal: 6,
          paddingBottom: 16
        }]}>
          <TimeInputShowcaseCard />
        </View>
        
        <View style={[styles.gridItem, { 
          width: gridColumns === 1 ? '100%' : `${100 / gridColumns}%`,
          paddingHorizontal: 6,
          paddingBottom: 16
        }]}>
          <DateInputShowcaseCard />
        </View>
        
        <View style={[styles.gridItem, { 
          width: gridColumns === 1 ? '100%' : `${100 / gridColumns}%`,
          paddingHorizontal: 6,
          paddingBottom: 16
        }]}>
          <DateTimeInputShowcaseCard />
        </View>
        
        <View style={[styles.gridItem, { 
          width: gridColumns === 1 ? '100%' : `${100 / gridColumns}%`,
          paddingHorizontal: 6,
          paddingBottom: 16
        }]}>
          <FileInputShowcaseCard />
        </View>
        
        <View style={[styles.gridItem, { 
          width: gridColumns === 1 ? '100%' : `${100 / gridColumns}%`,
          paddingHorizontal: 6,
          paddingBottom: 16
        }]}>
          <CheckboxInputShowcaseCard />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
    paddingTop: 20,
    position: 'relative',
    zIndex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '700',
  },
  subtitle: {
    textAlign: 'center',
    color: colors.text.secondary,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  gridItem: {
    flexDirection: 'column',
  },
  showcaseCard: {
    marginBottom: 0,
    height: '100%',
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  
  // Color palette styles
  colorSection: {
    marginBottom: 16,
  },
  colorSectionTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  colorSwatch: {
    width: 60,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  colorLabel: {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  
  // Button showcase styles
  buttonSection: {
    marginBottom: 20,
  },
  buttonSectionTitle: {
    marginBottom: 12,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  
  // Input showcase styles
  inputSection: {
    marginBottom: 24,
  },
  subsectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  
});

export default DesignShowcaseScreen;
