import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

// iOS-specific implementation. Metro resolves `platform-badge` to this file
// when bundling for iOS. The import site stays `from '@/components/platform-badge'`.
export function PlatformBadge() {
  return (
    <View style={styles.card}>
      <Text style={styles.tag}>platform-badge.ios.tsx</Text>
      <Text style={styles.title}>Hello from iOS</Text>
      <Text style={styles.body}>
        Rounded corners, soft fill, body copy that leans into Apple HIG language. The same import
        name, a totally different file.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  card: {
    padding: theme.spacing.lg,
    gap: theme.spacing.xs,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.backgroundElevated,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  tag: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.text,
    fontSize: 22,
    lineHeight: 28,
  },
  body: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
  },
}));
