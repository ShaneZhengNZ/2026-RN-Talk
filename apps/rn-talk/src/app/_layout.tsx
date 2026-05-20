import { Stack } from 'expo-router';
import { StrictMode } from 'react';

export default function RootLayout() {
  return (
    <StrictMode>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
            headerShown: true,
            title: 'Modal',
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </StrictMode>
  );
}
