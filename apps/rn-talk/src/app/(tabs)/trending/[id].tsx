import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { findRepoById } from '@/data/trending-mock';

export default function RepoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const repo = findRepoById(id);

  if (!repo) {
    return (
      <View style={styles.missing}>
        <Text style={styles.title}>Repo not found</Text>
        <Text style={styles.description}>id: {id}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: repo.name }} />

      <Text style={styles.owner}>{repo.owner}</Text>
      <Text style={styles.title}>{repo.name}</Text>
      <Text style={styles.description}>{repo.description}</Text>

      <View style={styles.meta}>
        <Stat label="Stars" value={repo.stars.toLocaleString()} />
        <Stat label="Language" value={repo.language} />
      </View>
    </ScrollView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  scroll: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  missing: {
    flex: 1,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  owner: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.text,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  meta: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
    marginTop: theme.spacing.md,
  },
  stat: {
    gap: theme.spacing.xs,
  },
  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statValue: {
    ...theme.typography.bodyBold,
    color: theme.colors.text,
  },
}));
