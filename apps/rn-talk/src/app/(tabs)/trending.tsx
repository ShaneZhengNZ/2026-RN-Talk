import { StyleSheet, Text, View } from 'react-native';

export default function TrendingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending</Text>
      <Text style={styles.subtitle}>GitHub trending repositories</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.6,
  },
});
