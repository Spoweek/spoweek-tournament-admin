import { useState, useCallback } from 'react';
import { Platform } from 'react-native';

export interface UseHoverOptions {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export interface UseHoverReturn {
  isHovered: boolean;
  hoverProps: {
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  };
}

export const useHover = (options: UseHoverOptions = {}): UseHoverReturn => {
  const { onMouseEnter, onMouseLeave } = options;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    onMouseEnter?.();
  }, [onMouseEnter]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    onMouseLeave?.();
  }, [onMouseLeave]);

  // Only provide hover props on web platform
  const hoverProps = Platform.OS === 'web' ? {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  } : {};

  return {
    isHovered,
    hoverProps,
  };
};
