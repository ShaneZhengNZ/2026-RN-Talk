import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Button } from '@/components/button';
import { useSecureItem } from '@/storage/use-secure-item';

const SECURE_TOKEN_KEY = 'api-token';

export default function TokenModal() {
  const { value, loading } = useSecureItem(SECURE_TOKEN_KEY);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API token</Text>
      <Text style={styles.subtitle}>Read from the iOS Keychain via expo-secure-store.</Text>

      <View style={styles.tokenBox}>
        {loading ? (
          <Text style={styles.placeholder}>Loading…</Text>
        ) : value ? (
          <Text style={styles.token} selectable>
            {value}
          </Text>
        ) : (
          <Text style={styles.placeholder}>No token saved.</Text>
        )}
      </View>

      <View style={styles.actions}>
        <Button label="Done" variant="secondary" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.text,
    textAlign: 'center',
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  tokenBox: {
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.backgroundElevated,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginTop: theme.spacing.md,
  },
  token: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontFamily: 'Menlo',
    textAlign: 'center',
  },
  placeholder: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  actions: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
}));
