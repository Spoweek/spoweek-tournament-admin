// Z-Index Layer System
// Centralized z-index values to prevent conflicts and maintain proper layering

export const zIndex = {
  // Base layers (0-99)
  base: 0,
  behind: -1,
  
  // Content layers (100-999)
  content: 100,
  card: 200,
  sidebar: 300,
  
  // Interactive elements (1000-4999)
  button: 1000,
  input: 1100,
  form: 1200,
  
  // Overlays and dropdowns (5000-8999)
  dropdown: 5000,
  popover: 6000,
  tooltip: 7000,
  
  // Navigation (9000-9999)
  header: 9000,
  navigation: 9100,
  
  // Modals and overlays (10000-19999)
  overlay: 10000,
  modal: 15000,
  modalOverlay: 14999, // Just below modal content
  
  // Critical system UI (20000+)
  notification: 20000,
  alert: 25000,
  emergency: 30000,
} as const;

// Type for z-index keys
export type ZIndexLayer = keyof typeof zIndex;

// Helper function to get z-index value with optional offset
export const getZIndex = (layer: ZIndexLayer, offset: number = 0): number => {
  return zIndex[layer] + offset;
};

// Specific z-index values for common UI patterns
export const uiLayers = {
  // Select dropdown system
  selectDropdown: zIndex.dropdown,
  selectOverlay: zIndex.dropdown - 1,
  
  // Button states
  buttonHover: zIndex.button + 1,
  buttonActive: zIndex.button + 2,
  
  // Input focus states
  inputFocused: zIndex.input + 1,
  
  // Card hover states
  cardHover: zIndex.card + 1,
} as const;

export default zIndex;
