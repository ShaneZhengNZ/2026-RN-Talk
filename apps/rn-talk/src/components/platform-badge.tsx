import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

// Default / fallback implementation. Metro prefers `platform-badge.ios.tsx`
// or `platform-badge.android.tsx` at bundle time when those exist; this file
// is what TypeScript resolves against, and what runs on web.
export function PlatformBadge() {
  return (
    <View style={styles.card}>
      <Text style={styles.tag}>default</Text>
      <Text style={styles.title}>Generic platform badge</Text>
      <Text style={styles.body}>
        This is the fallback. It renders because the current platform has no dedicated sibling file.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  card: {
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
  },
  tag: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    ...theme.typography.bodyBold,
    color: theme.colors.text,
  },
  body: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
  },
}));
