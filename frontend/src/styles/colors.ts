// Centralized color system for the entire website
export const colors = {
  // Background colors
  bg: {
    primary: '#fcfcfb',      // Main header background
    secondary: '#f0eee9',    // Navigation background  
    modal: '#f9fafb',        // Modal/sidebar background (gray-50)
    white: '#ffffff',        // Pure white
    overlay: 'rgba(0, 0, 0, 0.2)', // Modal overlay
  },
  
  // Text colors
  text: {
    primary: '#000000',      // Black text
    secondary: '#6b7280',    // Gray-500 for secondary text
    muted: '#9ca3af',        // Gray-400 for muted text
    white: '#ffffff',        // White text
  },
  
  // Border colors
  border: {
    primary: '#000000',      // Black borders
    secondary: '#e5e7eb',    // Gray-200 for light borders
    hover: '#d1d5db',        // Gray-300 for hover states
  },
  
  // Interactive colors
  interactive: {
    black: '#000000',        // Black buttons/accents
    blackHover: 'rgba(0, 0, 0, 0.8)', // Black hover state
    transparent: 'transparent',
  }
} as const

// Tailwind class mappings for consistent usage
export const bgClasses = {
  primary: 'bg-[#fcfcfb]',
  secondary: 'bg-[#f0eee9]', 
  modal: 'bg-gray-50',
  white: 'bg-white',
  overlay: 'bg-black/20',
} as const