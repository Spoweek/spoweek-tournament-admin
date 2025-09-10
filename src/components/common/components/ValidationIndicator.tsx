import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../styles';

export interface ValidationIndicatorProps {
  isValid: boolean;
  show: boolean;
  size?: number;
  style?: any;
  absolute?: boolean; // Whether to use absolute positioning
}

const ValidationIndicator: React.FC<ValidationIndicatorProps> = ({
  isValid,
  show,
  size = 20,
  style,
  absolute = true,
}) => {
  if (!show) {
    return null;
  }

  return (
    <View style={[absolute ? styles.validationIcon : styles.validationIconInline, style]}>
      <Ionicons
        name={isValid ? 'checkmark-circle' : 'close-circle'}
        size={size}
        color={isValid ? colors.success[500] : colors.error[500]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  validationIcon: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: '-50%' }],
  },
  validationIconInline: {
    // No positioning - just inline in flex container
  },
});

export default ValidationIndicator;
