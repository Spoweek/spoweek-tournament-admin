import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, ViewProps } from 'react-native';

export interface CardProps extends Omit<ViewProps, 'style'> {
  children: ReactNode;
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
  borderRadius?: number;
  shadow?: boolean;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  padding?: number;
  margin?: number | string;
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  width, 
  height, 
  backgroundColor = '#FFFFFF',
  borderRadius = 12,
  shadow = true,
  alignItems = 'stretch',
  justifyContent = 'flex-start',
  padding = 16,
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
    shadow && styles.shadow,
    style,
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
  },
  shadow: {
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Android shadow
    elevation: 3,
  },
});

export default Card;
