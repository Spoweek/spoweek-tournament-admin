// Utility to suppress specific React Native Web warnings
// This is useful for deprecation warnings that don't affect functionality

export const suppressPointerEventsWarning = () => {
  if (typeof console !== 'undefined' && console.warn) {
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      // Check if the warning is about pointerEvents deprecation
      const message = args[0];
      if (typeof message === 'string' && message.includes('props.pointerEvents is deprecated')) {
        // Suppress this specific warning
        return;
      }
      // Allow all other warnings to pass through
      originalWarn.apply(console, args);
    };
  }
};

// Alternative: More targeted suppression
export const suppressSpecificWarnings = () => {
  if (typeof console !== 'undefined' && console.warn) {
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      const message = args[0];
      
      // List of warnings to suppress
      const suppressedWarnings = [
        'props.pointerEvents is deprecated. Use style.pointerEvents',
        'pointerEvents is deprecated',
      ];
      
      // Check if this warning should be suppressed
      const shouldSuppress = suppressedWarnings.some(suppressedWarning => 
        typeof message === 'string' && message.includes(suppressedWarning)
      );
      
      if (shouldSuppress) {
        return;
      }
      
      // Allow all other warnings to pass through
      originalWarn.apply(console, args);
    };
  }
};
