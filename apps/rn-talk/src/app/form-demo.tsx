import { router } from 'expo-router';
import { Controller, type Resolver, useForm } from 'react-hook-form';
import { Alert, Text, TextInput, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { z } from 'zod';
import { Button } from '@/components/button';

const SignUpSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().toLowerCase().email('Enter a valid email'),
  age: z.coerce
    .number({ message: 'Age must be a number' })
    .int('Age must be a whole number')
    .min(13, 'You must be 13 or older')
    .max(120, 'Enter a realistic age'),
  password: z
    .string()
    .min(8, 'At least 8 characters')
    .regex(/[A-Z]/, 'At least one uppercase letter')
    .regex(/[0-9]/, 'At least one number'),
});

type SignUpInput = z.input<typeof SignUpSchema>;
type SignUpValues = z.output<typeof SignUpSchema>;

// Local zod resolver — avoids pulling in @hookform/resolvers for a single form.
// If we add more zod-validated forms, swap this for `zodResolver` from that package.
const signUpResolver: Resolver<SignUpInput, unknown, SignUpValues> = (values) => {
  const result = SignUpSchema.safeParse(values);
  if (result.success) {
    return { values: result.data, errors: {} };
  }
  const errors: Record<string, { type: string; message: string }> = {};
  for (const issue of result.error.issues) {
    const path = issue.path.join('.');
    if (path && !errors[path]) {
      errors[path] = { type: issue.code, message: issue.message };
    }
  }
  return { values: {}, errors };
};

const DEFAULT_VALUES: SignUpInput = {
  name: '',
  email: '',
  // `age` is typed as a number at the output but the input is the raw string
  // from the TextInput; zod's `coerce.number` bridges the two.
  age: '' as unknown as number,
  password: '',
};

export default function FormDemoScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpInput, unknown, SignUpValues>({
    resolver: signUpResolver,
    defaultValues: DEFAULT_VALUES,
    mode: 'onBlur',
  });

  const onSubmit = async (values: SignUpValues) => {
    // Pretend network call so `isSubmitting` actually flickers.
    await new Promise((resolve) => setTimeout(resolve, 600));
    Alert.alert('Submitted', JSON.stringify(values, null, 2), [
      {
        text: 'OK',
        onPress: () => {
          reset();
          router.back();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.subtitle}>react-hook-form + zod demo</Text>

      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange, onBlur } }) => (
          <Field
            label="Name"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.name?.message}
            autoCapitalize="words"
            autoComplete="name"
            textContentType="name"
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange, onBlur } }) => (
          <Field
            label="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.email?.message}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
        )}
      />

      <Controller
        control={control}
        name="age"
        render={({ field: { value, onChange, onBlur } }) => (
          <Field
            label="Age"
            value={value === undefined || value === null ? '' : String(value)}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.age?.message}
            keyboardType="number-pad"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange, onBlur } }) => (
          <Field
            label="Password"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.password?.message}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="new-password"
            textContentType="newPassword"
          />
        )}
      />

      <View style={styles.actions}>
        <Button
          label={isSubmitting ? 'Submitting…' : 'Create account'}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        />
        <Button label="Cancel" variant="secondary" onPress={() => router.back()} />
      </View>
    </View>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  error?: string | undefined;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: 'name' | 'email' | 'new-password';
  textContentType?: 'name' | 'emailAddress' | 'newPassword';
  keyboardType?: 'default' | 'email-address' | 'number-pad';
}

function Field({ label, value, onChangeText, onBlur, error, ...inputProps }: FieldProps) {
  styles.useVariants({ invalid: error !== undefined });
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        accessibilityLabel={label}
        {...inputProps}
      />
      {error !== undefined && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.text,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
  },
  field: {
    gap: theme.spacing.xs,
  },
  label: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    ...theme.typography.body,
    color: theme.colors.text,
    backgroundColor: theme.colors.backgroundElevated,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    variants: {
      invalid: {
        true: { borderColor: theme.colors.danger },
        false: { borderColor: theme.colors.border },
      },
    },
  },
  error: {
    ...theme.typography.small,
    color: theme.colors.danger,
  },
  actions: {
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
}));
