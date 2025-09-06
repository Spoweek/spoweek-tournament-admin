import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ 
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
  const cardStyle = [
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
