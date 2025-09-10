import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, ViewProps, DimensionValue } from 'react-native';
import { shadows } from './styles';

export interface CardProps extends Omit<ViewProps, 'style'> {
  children: ReactNode;
  width?: DimensionValue;
  height?: DimensionValue;
  backgroundColor?: string;
  borderRadius?: number;
  shadow?: boolean;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  padding?: number;
  margin?: DimensionValue;
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  width, 
  height, 
  backgroundColor = '#FFFFFF',
  borderRadius = 30,
  shadow = true,
  alignItems = 'stretch',
  justifyContent = 'flex-start',
  padding = 30,
  margin,
  style,
  ...props 
}) => {
  const cardStyle: ViewStyle[] = [
    styles.card,
    {
      width,
      height,
      backgroundColor,
      borderRadius,
      padding,
      alignItems,
      justifyContent,
      ...(margin && { margin }),
    },
    ...(shadow ? [styles.shadow] : []),
    ...(style ? [style] : []),
  ];

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // Base card styles
    flexDirection: 'column', // Default vertical flow
    gap: 16,
  },
  shadow: shadows.card,
});

export default Card;
