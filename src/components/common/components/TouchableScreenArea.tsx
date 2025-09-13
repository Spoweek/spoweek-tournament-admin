import React, { useState } from 'react';
import { Pressable, ViewStyle, Platform } from 'react-native';

interface TouchableScreenAreaProps {
  style?: ViewStyle;
  onPress?: (event: any) => void;
  onDrag?: (event: any) => void;
  children?: React.ReactNode;
}

const TouchableScreenArea: React.FC<TouchableScreenAreaProps> = ({
  style,
  onPress,
  onDrag,
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handlePress = (event: any) => {
    if (onPress) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.nativeEvent.pageX - rect.left;
      const y = event.nativeEvent.pageY - rect.top;
      const currentTarget = event.currentTarget;
      onPress({ ...event, x, y, currentTarget });
    }
  };

  const handlePressIn = (event: any) => {
    setIsDragging(true);
  };

  const handlePressOut = (event: any) => {
    setIsDragging(false);
  };

  const handleMove = (event: any) => {
    if (isDragging && onDrag) {
      const x = event.nativeEvent.locationX;
      const y = event.nativeEvent.locationY;
      onDrag({ ...event, x, y });
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        style,
        pressed && { opacity: 0.8 }
      ]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...({ onPressMove: handleMove } as any)}
    >
      {children}
    </Pressable>
  );
};

export default TouchableScreenArea;
