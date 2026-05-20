import { Stack } from 'expo-router';

export default function TrendingStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Trending', headerShown: false }} />
      <Stack.Screen name="[id]" options={{ title: 'Repository', headerShown: false }} />
    </Stack>
  );
}
