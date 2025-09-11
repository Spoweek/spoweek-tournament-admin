import React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { colors } from '../styles';

export interface LabelProps {
  children: string;
  required?: boolean;
  disabled?: boolean;
  inline?: boolean;
  style?: TextStyle;
  containerStyle?: ViewStyle;
}

const Label: React.FC<LabelProps> = ({
  children,
  required = false,
  disabled = false,
  inline = false,
  style,
  containerStyle,
}) => {
  return (
    <View style={[
      styles.labelContainer,
      inline && styles.inlineLabelContainer,
      containerStyle,
    ]}>
      <Text style={[
        styles.label,
        inline && styles.inlineLabel,
        disabled && styles.disabledLabel,
        style,
      ]}>
        {children}
      </Text>
      {required && <View style={styles.requiredIndicator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineLabelContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    marginBottom: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  inlineLabel: {
    fontWeight: '400',
  },
  disabledLabel: {
    color: colors.neutral[500],
  },
  requiredIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.error[500],
    marginLeft: 4,
  },
});

export default Label;
