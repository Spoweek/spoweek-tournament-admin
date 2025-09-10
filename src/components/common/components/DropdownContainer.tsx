import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, uiLayers } from '../styles';

export interface DropdownLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DropdownContainerProps {
  layout: DropdownLayout;
  children: React.ReactNode;
  borderRadius?: number;
  style?: ViewStyle;
  maxHeight?: number;
  height?: number; // Allow explicit height setting
  dynamicHeight?: boolean; // Enable dynamic height based on content
  contentHeight?: number; // Height calculated from content (used with dynamicHeight)
}

export const DropdownContainer: React.FC<DropdownContainerProps> = ({
  layout,
  children,
  borderRadius = 8,
  style,
  maxHeight = 200,
  height,
  dynamicHeight = false,
  contentHeight,
}) => {
  // Determine the height to use
  const containerHeight = height || (dynamicHeight && contentHeight ? contentHeight : undefined);
  const containerMaxHeight = dynamicHeight ? maxHeight : undefined;

  return (
    <View style={[
      styles.dropdown,
      {
        position: 'absolute',
        left: layout.x,
        top: layout.y,
        width: layout.width,
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
        height: containerHeight,
        maxHeight: containerMaxHeight,
        // Ensure pixel-perfect rendering
        transform: [{ translateX: 0 }, { translateY: 0 }],
      },
      style,
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.primary[500],
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    zIndex: uiLayers.selectDropdown,
    overflow: 'hidden', // Clip scrollbar to dropdown bounds
  },
});

export default DropdownContainer;
