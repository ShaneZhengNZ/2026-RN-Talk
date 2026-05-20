import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { useMMKVBoolean } from 'react-native-mmkv';
import { StyleSheet } from 'react-native-unistyles';
import { Button } from '@/components/button';
import { Form } from '@/components/form';
import { FormPicker } from '@/components/form-picker';
import { FormSection } from '@/components/form-section';
import { FormToggle } from '@/components/form-toggle';
import { mmkv } from '@/storage/mmkv';
import { useMMKVEnum } from '@/storage/use-mmkv-enum';
import { useSecureItem } from '@/storage/use-secure-item';

type ThemeChoice = 'system' | 'light' | 'dark';
type Region = 'auto' | 'us' | 'eu' | 'asia';

const THEME_VALUES = ['system', 'light', 'dark'] as const satisfies readonly ThemeChoice[];
const REGION_VALUES = ['auto', 'us', 'eu', 'asia'] as const satisfies readonly Region[];

const THEME_OPTIONS: readonly { label: string; value: ThemeChoice }[] = [
  { label: 'System', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
];

const REGION_OPTIONS: readonly { label: string; value: Region }[] = [
  { label: 'Automatic', value: 'auto' },
  { label: 'United States', value: 'us' },
  { label: 'Europe', value: 'eu' },
  { label: 'Asia', value: 'asia' },
];

const SECURE_TOKEN_KEY = 'api-token';

export default function SettingsScreen() {
  const [theme, setTheme] = useMMKVEnum<ThemeChoice>('settings.theme', 'system', THEME_VALUES);
  const [region, setRegion] = useMMKVEnum<Region>('settings.region', 'auto', REGION_VALUES);
  const [notifications = true, setNotifications] = useMMKVBoolean('settings.notifications');
  const [haptics = true, setHaptics] = useMMKVBoolean('settings.haptics');
  const [sounds = false, setSounds] = useMMKVBoolean('settings.sounds');
  const [analytics = false, setAnalytics] = useMMKVBoolean('settings.analytics');

  const resetAll = () => {
    Alert.alert('Reset stored settings?', 'This clears every MMKV key for this app.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: () => mmkv.clearAll(),
      },
    ]);
  };

  return (
    <Form>
      <FormSection title="Appearance">
        <FormPicker
          label="Theme"
          selection={theme}
          onSelectionChange={setTheme}
          options={THEME_OPTIONS}
        />
      </FormSection>

      <FormSection title="Region">
        <FormPicker
          label="Trending region"
          selection={region}
          onSelectionChange={setRegion}
          options={REGION_OPTIONS}
        />
      </FormSection>

      <FormSection
        title="Notifications"
        footer="Push notifications require a development build with notification entitlements."
      >
        <FormToggle
          label="Allow notifications"
          systemImage="bell.fill"
          value={notifications}
          onValueChange={setNotifications}
        />
        <FormToggle
          label="Sounds"
          systemImage="speaker.wave.2.fill"
          value={sounds}
          onValueChange={setSounds}
        />
        <FormToggle
          label="Haptics"
          systemImage="iphone.radiowaves.left.and.right"
          value={haptics}
          onValueChange={setHaptics}
        />
      </FormSection>

      <FormSection title="Privacy" footer="We never share data with third parties.">
        <FormToggle
          label="Share usage analytics"
          systemImage="chart.bar.fill"
          value={analytics}
          onValueChange={setAnalytics}
        />
      </FormSection>

      <SecureTokenSection />

      <FormSection
        title="Reset"
        footer="Toggles, pickers, and the secure token below are persisted across reloads."
      >
        <Button variant="danger" label="Reset stored settings" onPress={resetAll} />
      </FormSection>
    </Form>
  );
}

function SecureTokenSection() {
  const { value, loading, save, remove } = useSecureItem(SECURE_TOKEN_KEY);
  const [draft, setDraft] = useState('');

  const status = loading
    ? 'Loading…'
    : value
      ? `Saved (•••• ${value.slice(-4).padStart(4, '•')})`
      : 'Not set';

  return (
    <FormSection
      title="Secure storage"
      footer="Stored in the iOS Keychain via expo-secure-store. Survives reinstalls of the app."
    >
      <TextInput
        style={tokenStyles.input}
        placeholder="Paste an API token"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        value={draft}
        onChangeText={setDraft}
        accessibilityLabel="API token"
      />
      <View style={tokenStyles.statusRow}>
        <Text style={tokenStyles.statusLabel}>Status</Text>
        <Text style={tokenStyles.statusValue}>{status}</Text>
      </View>
      <Button
        label="Save token"
        onPress={() => {
          if (draft.length > 0) void save(draft);
        }}
      />
      {value !== null && !loading && (
        <Button
          variant="secondary"
          label="Show token"
          onPress={() => router.push('/token-modal')}
        />
      )}
      <Button
        variant="danger"
        label="Clear token"
        onPress={() => {
          void remove();
        }}
      />
    </FormSection>
  );
}

const tokenStyles = StyleSheet.create((theme) => ({
  input: {
    ...theme.typography.body,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xs,
  },
  statusLabel: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
  },
  statusValue: {
    ...theme.typography.bodyBold,
    color: theme.colors.text,
  },
}));
