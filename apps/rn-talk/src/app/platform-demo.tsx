import { Alert, Platform, ScrollView, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Button } from '@/components/button';
import { PlatformBadge } from '@/components/platform-badge';

// Pulled out of JSX so the demo reads like a lookup table on the slide.
const SHARE_LABEL = Platform.select({
  ios: 'Share via AirDrop',
  android: 'Share with intent',
  default: 'Share',
});

const ACCENT_SHADOW = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  android: { elevation: 6 },
  default: {},
});

export default function PlatformDemoScreen() {
  const onShare = () => {
    // Branch on behavior, not just style. Same intent, different platform API.
    if (Platform.OS === 'ios') {
      Alert.alert('iOS', 'Would present UIActivityViewController.');
      return;
    }
    if (Platform.OS === 'android') {
      Alert.alert('Android', 'Would fire ACTION_SEND intent.');
      return;
    }
    Alert.alert('Web', 'Would call navigator.share().');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Platform divergence</Text>
        <Text style={styles.subtitle}>
          Running on <Text style={styles.subtitleEmphasis}>{Platform.OS}</Text>
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>1. Inline — Platform.OS & Platform.select</Text>
        <Text style={styles.body}>
          Good for small forks: a one-line color tweak, an alternate label, a behavior branch that
          is two lines on each side. Keeps logic colocated.
        </Text>

        <View style={[styles.card, ACCENT_SHADOW]}>
          <Text style={styles.tag}>Platform.select</Text>
          <Text style={styles.title2}>{SHARE_LABEL}</Text>
          <Text style={styles.body}>
            The label, the shadow style, and the button behavior are all chosen by platform. Three
            different mechanisms, one component.
          </Text>
          <Button label={SHARE_LABEL} onPress={onShare} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>2. Per-platform files (.ios.tsx / .android.tsx)</Text>
        <Text style={styles.body}>
          When the divergence is large enough that inline branching hurts readability, split the
          file. Metro picks the right one at bundle time, and the import site below is identical on
          every platform.
        </Text>

        <View style={styles.importDemo}>
          <Text style={styles.code}>
            {"import { PlatformBadge } from '@/components/platform-badge';"}
          </Text>
        </View>

        <PlatformBadge />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    padding: theme.spacing.lg,
    gap: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },
  header: {
    gap: theme.spacing.xs,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.text,
  },
  title2: {
    ...theme.typography.bodyBold,
    color: theme.colors.text,
    fontSize: 18,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
  },
  subtitleEmphasis: {
    ...theme.typography.bodyBold,
    color: theme.colors.primary,
  },
  section: {
    gap: theme.spacing.sm,
  },
  sectionLabel: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  body: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  card: {
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.backgroundElevated,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  tag: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  importDemo: {
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.backgroundElevated,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  code: {
    ...theme.typography.small,
    color: theme.colors.text,
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
  },
}));
