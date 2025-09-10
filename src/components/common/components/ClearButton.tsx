import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../styles';
import { useHover } from '../hooks';

export interface ClearButtonProps {
  onPress: () => void;
  disabled?: boolean;
  size?: number;
  color?: string;
  style?: ViewStyle;
  hitSlop?: { top: number; bottom: number; left: number; right: number };
}

export const ClearButton: React.FC<ClearButtonProps> = ({
  onPress,
  disabled = false,
  size = 14,
  color = colors.neutral[500],
  style,
  hitSlop = { top: 8, bottom: 8, left: 8, right: 8 },
}) => {
  const { isHovered, hoverProps } = useHover();

  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.button,
        isHovered && styles.buttonHovered,
        { pointerEvents: 'auto' },
        style,
      ]}
      hitSlop={hitSlop}
      disabled={disabled}
      {...hoverProps}
    >
      <Ionicons 
        name="close" 
        size={size} 
        color={isHovered ? 'white' : (disabled ? colors.neutral[300] : color)} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  buttonHovered: {
    backgroundColor: colors.primary[300],
  },
});

export default ClearButton;
