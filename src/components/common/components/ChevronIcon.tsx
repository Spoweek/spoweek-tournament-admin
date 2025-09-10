import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../styles';

export interface ChevronIconProps {
  isOpen: boolean;
  disabled?: boolean;
  size?: number;
  style?: ViewStyle;
}

export const ChevronIcon: React.FC<ChevronIconProps> = ({
  isOpen,
  disabled = false,
  size = 16,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons 
        name={isOpen ? "chevron-up" : "chevron-down"} 
        size={size} 
        color={disabled ? colors.neutral[300] : colors.neutral[500]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChevronIcon;
