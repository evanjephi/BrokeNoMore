import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Image } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors'; // Centralized color constants

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const ICON_SIZE = 30; // Set a consistent icon size

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

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
            title: 'Recurring Payment',
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../assets/images/recurring-payment-icon.png')} // Ensure this path is correct
                style={{
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  tintColor: focused ? Colors.light.primary : Colors.light.secondary,
                }}
                accessibilityLabel="Recurring Payment Tab"
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
