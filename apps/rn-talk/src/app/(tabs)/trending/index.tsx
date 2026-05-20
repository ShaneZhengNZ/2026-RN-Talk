import { Link } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { TRENDING_REPOS, type TrendingRepo } from '@/data/trending-mock';
import { useFavoritesStore } from '@/store/favorites';

export default function TrendingListScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      {TRENDING_REPOS.map((repo) => (
        <RepoRow key={repo.id} repo={repo} />
      ))}
    </ScrollView>
  );
}

function RepoRow({ repo }: { repo: TrendingRepo }) {
  // Hook usage: a selector subscribes the row to just this repo's favorite
  // state, so other repos' toggles don't re-render this row.
  const isFavorite = useFavoritesStore((state) => Boolean(state.ids[repo.id]));

  return (
    <Link href={{ pathname: '/trending/[id]', params: { id: repo.id } }} asChild>
      <Pressable
        style={styles.row}
        accessibilityRole="button"
        accessibilityLabel={`${repo.owner}/${repo.name}`}
      >
        <Text style={styles.title}>
          {isFavorite ? '★ ' : ''}
          {repo.owner} / {repo.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {repo.description}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.metaItem}>★ {repo.stars.toLocaleString()}</Text>
          <Text style={styles.metaItem}>{repo.language}</Text>
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
}));
