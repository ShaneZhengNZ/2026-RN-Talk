import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useTrendingRepos } from '@/api/trending';
import { Button } from '@/components/button';
import { useFavoritesStore } from '@/store/favorites';

export default function RepoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError, error } = useTrendingRepos();

  // Hook usage: subscribe to whether this repo is favorited.
  const isFavorite = useFavoritesStore((state) => Boolean(state.ids[id]));
  // Pulling actions via a selector keeps them stable across renders.
  const toggle = useFavoritesStore((state) => state.toggle);

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Couldn&apos;t load repo</Text>
        <Text style={styles.description}>{error.message}</Text>
      </View>
    );
  }

  const repo = data.repos.find((r) => String(r.id) === id);

  if (!repo) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Repo not found</Text>
        <Text style={styles.description}>id: {id}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: repo.name }} />

      <Text style={styles.owner}>{repo.owner.login}</Text>
      <Text style={styles.title}>{repo.name}</Text>
      {repo.description !== null && <Text style={styles.description}>{repo.description}</Text>}

      <View style={styles.meta}>
        <Stat label="Stars" value={repo.stars.toLocaleString()} />
        {repo.language !== null && <Stat label="Language" value={repo.language} />}
      </View>

      <View style={styles.actions}>
        <Button
          label={isFavorite ? '★ Favorited' : '☆ Favorite'}
          variant={isFavorite ? 'primary' : 'secondary'}
          onPress={() => toggle(id)}
        />
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
  center: {
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
  actions: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
}));
