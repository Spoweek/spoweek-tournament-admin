import React from 'react';
import { View, StyleSheet } from 'react-native';

interface IconContainerProps {
  children: React.ReactNode;
  style?: any;
}

const IconContainer: React.FC<IconContainerProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: '-50%' }],
    gap: 8, // Space between validation and toggle icons
  },
});

export default IconContainer;
