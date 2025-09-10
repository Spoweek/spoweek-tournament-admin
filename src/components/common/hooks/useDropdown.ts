import { useState, useRef, useCallback } from 'react';

export interface DropdownLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface UseDropdownOptions {
  onDropdownStateChange?: (isOpen: boolean) => void;
  containerRef?: React.RefObject<any>;
  borderRadius?: 'light' | 'full';
  elementHeight?: number;
}

export interface UseDropdownReturn {
  isOpen: boolean;
  dropdownLayout: DropdownLayout;
  openDropdown: () => void;
  closeDropdown: () => void;
  toggleDropdown: () => void;
}

export const useDropdown = (options: UseDropdownOptions = {}): UseDropdownReturn => {
  const { onDropdownStateChange, containerRef, borderRadius = 'light', elementHeight = 40 } = options;
  
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState<DropdownLayout>({ x: 0, y: 0, width: 0, height: 0 });
  const elementRef = useRef<any>(null);

  const openDropdown = useCallback(() => {
    // Use container ref if available for more precise measurements
    const elementToMeasure = containerRef?.current || elementRef.current;
    
    elementToMeasure?.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
      let adjustedX, adjustedWidth, adjustedY;
      
      if (containerRef?.current) {
        // If we have container ref, we're measuring the bordered container directly
        // Round to avoid sub-pixel issues
        adjustedX = Math.round(pageX);
        adjustedWidth = Math.round(width);
        adjustedY = Math.round(pageY + height - 1); // Overlap by 1px for seamless connection
      } else {
        // Fallback to measuring element with border adjustments
        const borderWidth = 1;
        adjustedX = Math.round(pageX - borderWidth);
        adjustedWidth = Math.round(width + (borderWidth * 2));
        adjustedY = Math.round(pageY + height - 1);
      }
      
      setDropdownLayout({ 
        x: adjustedX, 
        y: adjustedY - 1, 
        width: adjustedWidth, 
        height 
      });
      
      setIsOpen(true);
      onDropdownStateChange?.(true);
    });
  }, [containerRef, onDropdownStateChange]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    onDropdownStateChange?.(false);
  }, [onDropdownStateChange]);

  const toggleDropdown = useCallback(() => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }, [isOpen, openDropdown, closeDropdown]);

  return {
    isOpen,
    dropdownLayout,
    openDropdown,
    closeDropdown,
    toggleDropdown,
  };
};
