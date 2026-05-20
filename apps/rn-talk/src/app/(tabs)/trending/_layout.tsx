import { Stack } from 'expo-router';

export default function TrendingStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Trending' }} />
      <Stack.Screen name="[id]" options={{ title: 'Repository' }} />
    </Stack>
  );
}
