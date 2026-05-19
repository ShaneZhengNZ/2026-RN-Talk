import { Pressable, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}

export function Button({ label, onPress, variant, size, disabled }: ButtonProps) {
  // `variant` and `size` are deliberately not defaulted here — when undefined,
  // Unistyles' `default` variant keys take over inside the stylesheet.
  styles.useVariants({ variant, size, disabled: disabled ?? false });

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={styles.button}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: disabled ?? false }}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  button: {
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    // `rt.fontScale` keeps tap target ≥ 44pt even when the user has bumped up
    // the system font size — a runtime concern variants can't express alone.
    minHeight: 44 * Math.max(1, rt.fontScale),
    variants: {
      variant: {
        // `default` is selected when `variant` is undefined.
        default: { backgroundColor: theme.colors.primary },
        primary: { backgroundColor: theme.colors.primary },
        secondary: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        danger: { backgroundColor: theme.colors.danger },
      },
      size: {
        default: {
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.sm,
        },
        sm: {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.xs,
        },
        md: {
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.sm,
        },
        lg: {
          paddingHorizontal: theme.spacing.xl,
          paddingVertical: theme.spacing.md,
        },
      },
      // Boolean variant — keys are the literal strings 'true' / 'false'.
      disabled: {
        true: { opacity: 0.4 },
        false: {},
      },
    },
    compoundVariants: [
      // A large danger button gets a CTA-style shadow — only when *both*
      // conditions match. Plain variants can't express this kind of
      // cross-axis override.
      {
        variant: 'danger',
        size: 'lg',
        styles: {
          shadowColor: theme.colors.danger,
          shadowOpacity: 0.4,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 8,
        },
      },
      // A disabled secondary button switches to a dashed border so it reads
      // as inert beyond just being faded.
      {
        variant: 'secondary',
        disabled: true,
        styles: {
          borderStyle: 'dashed',
        },
      },
    ],
  },
  label: {
    variants: {
      variant: {
        default: { color: theme.colors.background },
        primary: { color: theme.colors.background },
        secondary: { color: theme.colors.text },
        danger: { color: theme.colors.background },
      },
      size: {
        default: { ...theme.typography.bodyBold },
        sm: { ...theme.typography.small, fontWeight: '600' },
        md: { ...theme.typography.bodyBold },
        lg: { ...theme.typography.bodyBold, fontSize: 18 },
      },
      disabled: {
        true: {},
        false: {},
      },
    },
    compoundVariants: [
      // When the danger CTA is large, tighten letter-spacing for a more
      // confident feel — matches the lifted shadow above.
      {
        variant: 'danger',
        size: 'lg',
        styles: { letterSpacing: 0.5 },
      },
    ],
  },
}));
