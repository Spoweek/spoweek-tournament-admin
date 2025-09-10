import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../styles';

interface ToggleVisibilityProps {
  isVisible: boolean;
  onToggle: () => void;
  disabled?: boolean;
  size?: number;
  style?: any;
  absolute?: boolean; // Whether to use absolute positioning
}

const ToggleVisibility: React.FC<ToggleVisibilityProps> = ({
  isVisible,
  onToggle,
  disabled = false,
  size = 20,
  style,
  absolute = true,
}) => {
  const iconName = isVisible ? 'eye' : 'eye-off';
  const iconColor = disabled ? colors.text.disabled : colors.text.secondary;

  return (
    <Pressable
      style={[absolute ? styles.toggleIcon : styles.toggleIconInline, style]}
      onPress={onToggle}
      disabled={disabled}
    >
      <Ionicons name={iconName} size={size} color={iconColor} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  toggleIcon: {
    position: 'absolute',
    right: 30,
    top: '50%',
    transform: [{ translateY: '-50%' }],
  },
  toggleIconInline: {
    // No positioning - just inline in flex container
  },
});

export default ToggleVisibility;
