import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

// Android-specific implementation. Metro resolves `platform-badge` to this
// file when bundling for Android. The import site is unchanged.
export function PlatformBadge() {
  return (
    <View style={styles.card}>
      <Text style={styles.tag}>platform-badge.android.tsx</Text>
      <Text style={styles.title}>Hello from Android</Text>
      <Text style={styles.body}>
        Sharper corners, an elevation shadow, Material-leaning hierarchy. Same import, a
        platform-native shape.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  card: {
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.backgroundElevated,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
    elevation: 4,
  },
  tag: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  title: {
    ...theme.typography.bodyBold,
    color: theme.colors.text,
    fontSize: 20,
    lineHeight: 26,
  },
  body: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
  },
}));
