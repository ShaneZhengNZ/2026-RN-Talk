import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StrictMode } from 'react';
import { queryClient } from '@/api/query-client';

export default function RootLayout() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
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
          <Stack.Screen
            name="token-modal"
            options={{
              presentation: 'modal',
              headerShown: true,
              title: 'Token',
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </QueryClientProvider>
    </StrictMode>
  );
}
