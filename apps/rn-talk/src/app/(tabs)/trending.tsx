import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export default function TrendingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending</Text>
      <Text style={styles.subtitle}>GitHub trending repositories</Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.text,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
  },
}));
