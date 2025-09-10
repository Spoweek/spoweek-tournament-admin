import { useState, useCallback } from 'react';

export interface UseFocusOptions {
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface UseFocusReturn {
  isFocused: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
}

export const useFocus = (options: UseFocusOptions = {}): UseFocusReturn => {
  const { onFocus, onBlur } = options;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  return {
    isFocused,
    handleFocus,
    handleBlur,
  };
};
