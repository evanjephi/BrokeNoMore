import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Platform, useColorScheme } from 'react-native'; // Use built-in useColorScheme
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors'; 

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const ICON_SIZE = 28; // Set a consistent icon size

export default function RootLayout() {
  const colorScheme = useColorScheme(); // Use React Native's built-in hook

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
              backgroundColor: Colors[colorScheme ?? 'light'].background, 
            },
            default: { backgroundColor: Colors[colorScheme ?? 'light'].background }, // Dynamically adapt to theme
          }),
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
          name="itemAdd"
          options={{
            title: 'Add Spending',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'cash' : 'cash-outline'}
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
              <TabBarIcon 
                name={focused ? 'calendar' : 'calendar-outline'}
                color={color}
                size={ICON_SIZE}
                accessibilityLabel="Monthly Payment Tab"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: 'Analytics',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'analytics' : 'analytics-outline'}
                color={color}
                size={ICON_SIZE}
                accessibilityLabel="Analytics Tab"
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
