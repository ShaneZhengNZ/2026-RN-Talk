import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

interface FormSectionProps {
  title?: string;
  footer?: string;
  children: ReactNode;
}

export function FormSection({ title, footer, children }: FormSectionProps) {
  return (
    <View style={styles.section}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.card}>{children}</View>
      {footer ? <Text style={styles.footer}>{footer}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  section: {
    gap: theme.spacing.xs,
  },
  title: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  card: {
    backgroundColor: theme.colors.backgroundElevated,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    elevation: 2,
  },
  footer: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs,
  },
}));
