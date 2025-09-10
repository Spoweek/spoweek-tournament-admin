import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../styles';

export interface InputIconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  style?: ViewStyle;
  marginRight?: number;
}

export const InputIcon: React.FC<InputIconProps> = ({
  name,
  size = 16,
  color = colors.text.primary,
  style,
  marginRight = 8,
}) => {
  return (
    <View style={[styles.container, { marginRight }, style]}>
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InputIcon;
