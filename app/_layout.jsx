import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'
import LoginScreen from '@/components/LoginScreen'
import * as SecureStore from "expo-secure-store";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);  // Retrieve token from secure storage
    } catch (err) {
      return null;  // Return null if an error occurs
    }
  },

  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);  // Save token securely
    } catch (err) {
      return;  // Silent failure, no error feedback
    }
  },
};

export default function RootLayout() {
  useFonts({
    'outfit': require('../assets/fonts/SpaceMono-Regular.ttf')
  })
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <Stack>
          <Stack.Screen name="(tabs)" options={{
            headerShown: false
          }}
          />
        </Stack>
      </SignedIn>
      <SignedOut>
        <LoginScreen />
      </SignedOut>
    </ClerkProvider>
  )
}