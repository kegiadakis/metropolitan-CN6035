// app/(tabs)/layout.tsx
import { router, Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { Pressable } from 'react-native';

export default function TabsLayout() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };
  
  return (
    <Tabs
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'movies') {
              iconName = focused ? 'film' : 'film-outline';
            } else if (route.name === 'cinemas') {
              iconName = focused ? 'business' : 'business-outline';
            } else if (route.name === 'my-reservations') {
              iconName = focused ? 'ticket' : 'ticket-outline';
            } else {
              iconName = 'stop-circle'
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerRight: () => (
            <Pressable onPress={handleLogout} style={{ paddingRight: 16 }}>
              <Ionicons name="log-out-outline" size={24} color="tomato" />
            </Pressable>
          ),
        })}
      >
      <Tabs.Screen name="movies" options={{ title: 'Movies' }} />
      <Tabs.Screen name="cinemas" options={{ title: 'Cinemas' }} />
      <Tabs.Screen name="my-reservations" options={{ title: 'My Reservations' }} />
    </Tabs>
  );
}