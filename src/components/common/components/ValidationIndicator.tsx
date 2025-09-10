import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../styles';

export interface ValidationIndicatorProps {
  isValid: boolean;
  show: boolean;
  size?: number;
  style?: any;
}

const ValidationIndicator: React.FC<ValidationIndicatorProps> = ({
  isValid,
  show,
  size = 20,
  style,
}) => {
  if (!show) {
    return null;
  }

  return (
    <View style={[styles.validationIcon, style]}>
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
    transform: [{ translateY: -10 }],
  },
});

export default ValidationIndicator;
