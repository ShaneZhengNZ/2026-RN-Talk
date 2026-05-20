import type { Repo } from '@rn-talk/shared';
import { Link } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useTrendingRepos } from '@/api/trending';
import { useFavoritesStore } from '@/store/favorites';

export default function TrendingListScreen() {
  const { data, isPending, isError, error, refetch, isRefetching } = useTrendingRepos();

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
        <Text style={styles.errorTitle}>Couldn&apos;t load trending</Text>
        <Text style={styles.errorDetail}>{error.message}</Text>
        <Pressable
          onPress={() => refetch()}
          style={styles.retry}
          accessibilityRole="button"
          accessibilityLabel="Retry"
        >
          <Text style={styles.retryLabel}>{isRefetching ? 'Retrying…' : 'Retry'}</Text>
        </Pressable>
      </View>
    );
  }

  if (data.repos.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyTitle}>No trending repos right now</Text>
        <Text style={styles.emptyDetail}>Try again later.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      {data.repos.map((repo) => (
        <RepoRow key={repo.id} repo={repo} />
      ))}
    </ScrollView>
  );
}

function RepoRow({ repo }: { repo: Repo }) {
  // Hook usage: a selector subscribes the row to just this repo's favorite
  // state, so other repos' toggles don't re-render this row.
  const repoKey = String(repo.id);
  const isFavorite = useFavoritesStore((state) => Boolean(state.ids[repoKey]));

  return (
    <Link href={{ pathname: '/trending/[id]', params: { id: repoKey } }} asChild>
      <Pressable style={styles.row} accessibilityRole="button" accessibilityLabel={repo.fullName}>
        <Text style={styles.title}>
          {isFavorite ? '★ ' : ''}
          {repo.fullName}
        </Text>
        {repo.description !== null && (
          <Text style={styles.description} numberOfLines={2}>
            {repo.description}
          </Text>
        )}
        <View style={styles.meta}>
          <Text style={styles.metaItem}>★ {repo.stars.toLocaleString()}</Text>
          {repo.language !== null && <Text style={styles.metaItem}>{repo.language}</Text>}
        </View>
      </Pressable>
    </Link>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  row: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.backgroundElevated,
    gap: theme.spacing.xs,
  },
  title: {
    ...theme.typography.bodyBold,
    color: theme.colors.text,
  },
  description: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
  },
  meta: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.xs,
  },
  metaItem: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
  errorTitle: {
    ...theme.typography.bodyBold,
    color: theme.colors.text,
  },
  errorDetail: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  retry: {
    marginTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
  },
  retryLabel: {
    ...theme.typography.bodyBold,
    color: theme.colors.background,
  },
  emptyTitle: {
    ...theme.typography.bodyBold,
    color: theme.colors.text,
  },
  emptyDetail: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
  },
}));
