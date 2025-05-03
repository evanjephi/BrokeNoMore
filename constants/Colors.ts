/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#003366';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C', // Darker text for better contrast when using light mode
    background: '#fff', // White background for light mode
    backgroundDark: '#F0F0F0', // Slightly darker background for better contrast
    backgroundLight: '#e3e1e1',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    error: '#FF3B30',
    success: '#4CD964',
  },
  dark: {
    text: '#ECEDEE', // Lighter text for better contrast when using dark mode
    background: '#121212', // Dark background for dark mode
    backgroundLight: '#1F1F1F', // Slightly lighter background for better contrast
    backgroundDark: '#1F1F1F', // Darker background for better contrast
    tint: tintColorDark,  
    icon: '#9BA1A6', // Lighter icon color for better contrast
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    error: '#FF3B30',
    success: '#4CD964',
  },
};
