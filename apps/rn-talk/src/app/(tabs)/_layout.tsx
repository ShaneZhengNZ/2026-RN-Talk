import { Tabs } from 'expo-router';

// Web-only fallback. `_layout.native.tsx` (NativeTabs) is iOS/Android-only
// because it relies on a native view manager; Metro picks this `.tsx` file
// for web. Same route names, regular cross-platform Tabs.
export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="trending" options={{ title: 'Trending' }} />
      <Tabs.Screen name="gallery" options={{ title: 'Gallery' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
