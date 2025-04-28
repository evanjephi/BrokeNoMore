/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#000000'; // Black for light mode
const tintColorDark = '#FFFFFF'; // White for dark mode

export const Colors = {
  light: {
    text: '#000000', // Black text for light mode
    background: '#FFFFFF', // White background for light mode
    tint: tintColorLight,
    icon: '#6B7280', // Gray for icons
    tabIconDefault: '#9CA3AF', // Light gray for inactive tabs
    tabIconSelected: tintColorLight, // Black for active tabs
    primary: '#374151', // Dark gray for primary elements
    secondary: '#D1D5DB', // Light gray for secondary elements
  },
  dark: {
    text: '#FFFFFF', // White text for dark mode
    background: '#000000', // Black background for dark mode
    tint: tintColorDark,
    icon: '#9CA3AF', // Light gray for icons
    tabIconDefault: '#6B7280', // Gray for inactive tabs
    tabIconSelected: tintColorDark, // White for active tabs
    primary: '#4B5563', // Medium gray for primary elements
    secondary: '#1F2937', // Dark gray for secondary elements
  },
};
