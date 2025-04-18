import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Image } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors'; // Centralized color constants

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const ICON_SIZE = 28; // Set a consistent icon size

export default function RootLayout() {
  const colorScheme = useColorScheme();


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.light.primary, // Use centralized color
          tabBarInactiveTintColor: Colors.light.secondary, // Use centralized color
          tabBarStyle: { backgroundColor: Colors.light.background }, // Consistent background color
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'home' : 'home-outline'}
                color={color}
                size={ICON_SIZE}
                accessibilityLabel="Home Tab"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Monthly Payment',
            tabBarIcon: ({ color, focused }) => (
              // <Image
              //   source={require('../../assets/images/recurring-payment-icon.png')} // Ensure this path is correct
              //   style={{
              //     width: ICON_SIZE,
              //     height: ICON_SIZE,
              //     tintColor: focused ? Colors.light.primary : Colors.light.secondary,
              //   }}
              <TabBarIcon 
                name={focused ? 'calendar' : 'calendar-outline'}
                color={color}
                size={ICON_SIZE}
                accessibilityLabel="Monthly Payment Tab"
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
