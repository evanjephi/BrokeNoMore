/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#003366';
const tintColorDark = '#fff';
const yellowTitleColorLight = '#003366'; //yelowish color for light mode
const greenTitleColorDark = '#77d19e'; // greenish color for dark mode
const bgDark = '#121212'; // Dark background color for dark mode
const bgLight = '#fff'; // Light background color for light mode

export const Colors = {
  light: {
    text: '#11181C', // Darker text for better contrast when using light mode
    background: bgLight, // White background for light mode
    subTitleColor: yellowTitleColorLight, // Light gray background for secondary elements
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    error: '#FF3B30',
    success: '#4CD964',
    inputBackground: bgLight,
  },
  dark: {
    text: '#ECEDEE', // Lighter text for better contrast when using dark mode
    background: bgDark, // Dark background for dark mode
    subTitleColor: greenTitleColorDark, // Light gray background for secondary elements
    tint: tintColorDark,  
    icon: '#9BA1A6', // Lighter icon color for better contrast
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    error: '#FF3B30',
    success: '#4CD964',
    inputBackground: bgDark,
  },
};
