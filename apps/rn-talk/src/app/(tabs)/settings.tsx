import { useState } from 'react';
import { Form } from '@/components/form';
import { FormPicker } from '@/components/form-picker';
import { FormSection } from '@/components/form-section';
import { FormToggle } from '@/components/form-toggle';

type ThemeChoice = 'system' | 'light' | 'dark';
type Region = 'auto' | 'us' | 'eu' | 'asia';

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

export default function SettingsScreen() {
  const [theme, setTheme] = useState<ThemeChoice>('system');
  const [region, setRegion] = useState<Region>('auto');
  const [notifications, setNotifications] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [sounds, setSounds] = useState(false);
  const [analytics, setAnalytics] = useState(false);

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
    </Form>
  );
}
