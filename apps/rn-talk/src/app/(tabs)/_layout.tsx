import { NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabsLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" drawable="ic_menu_home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="trending">
        <NativeTabs.Trigger.Label>Trending</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="flame.fill" drawable="ic_menu_view" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="gearshape.fill" drawable="ic_menu_preferences" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
