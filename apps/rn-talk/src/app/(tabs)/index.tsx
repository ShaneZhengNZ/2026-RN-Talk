import { type Href, Link, router } from 'expo-router';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Button } from '@/components/button';
import { toggleFavorite, useFavoritesStore } from '@/store/favorites';

export default function HomeScreen() {
  // Hook usage: a selector that derives a number from the store. Re-renders
  // only when the count actually changes (zustand uses Object.is by default).
  const favoriteCount = useFavoritesStore((state) => Object.keys(state.ids).length);

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.subtitle}>2026 RN Talk demo app</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Zustand</Text>
        <Text style={styles.body}>
          Favorites: <Text style={styles.bodyEmphasis}>{favoriteCount}</Text>
        </Text>
        <Button
          label="Favorite react imperatively"
          variant="secondary"
          // Imperative usage: no hook, no subscription. Reads/writes the
          // store from outside React via `getState()`. Useful in event
          // handlers, services, or anywhere a re-render isn't needed.
          onPress={() => toggleFavorite('facebook-react')}
        />
        <Button
          label="Clear favorites"
          variant="danger"
          onPress={() => useFavoritesStore.getState().clear()}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>react-hook-form + zod</Text>
        {/* `/form-demo` is added in this commit — typed routes regenerate on
            next `expo start`. Cast until then. */}
        <Button label="Open sign-up form" onPress={() => router.push('/form-demo' as Href)} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Platform divergence</Text>
        <Button label="Open platform demo" onPress={() => router.push('/platform-demo' as Href)} />
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
  body: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  bodyEmphasis: {
    ...theme.typography.bodyBold,
    color: theme.colors.primary,
  },
}));
