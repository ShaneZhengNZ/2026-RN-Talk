import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Button } from '@/components/button';

export default function Modal() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal screen</Text>
      <Text style={styles.subtitle}>
        Presented with `presentation: &apos;modal&apos;` in the root Stack.
      </Text>
      <View style={styles.actions}>
        <Button label="Dismiss" variant="secondary" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.text,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  actions: {
    marginTop: theme.spacing.lg,
  },
}));
