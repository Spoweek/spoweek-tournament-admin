import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors, typography } from '../styles';

export interface DescriptionProps {
  children: string;
  disabled?: boolean;
  style?: TextStyle;
}

const Description: React.FC<DescriptionProps> = ({
  children,
  disabled = false,
  style,
}) => {
  return (
    <Text style={[
      styles.description,
      disabled && styles.disabledDescription,
      style,
    ]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  description: {
    ...typography.body,
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  disabledDescription: {
    color: colors.neutral[500],
  },
});

export default Description;
