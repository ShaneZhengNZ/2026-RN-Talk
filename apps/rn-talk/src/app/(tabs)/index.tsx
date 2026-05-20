import { type Href, Link, router } from 'expo-router';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Button } from '@/components/button';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.subtitle}>2026 RN Talk demo app</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Expo Router demos</Text>

        <Button label="Open modal (router.push)" onPress={() => router.push('/modal')} />

        <Link href="/modal" asChild>
          <Button label="Open modal (<Link>)" variant="secondary" />
        </Link>

        {/* Deliberately invalid route — typed routes would reject this, so
            we cast through Href to demonstrate the +not-found fallback. */}
        <Link href={'/this-route-does-not-exist' as Href} asChild>
          <Button label="Trigger +not-found" variant="danger" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    gap: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },
  hero: {
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.xxl,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.text,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
  },
  section: {
    gap: theme.spacing.sm,
  },
  sectionLabel: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: theme.spacing.xs,
  },
}));
