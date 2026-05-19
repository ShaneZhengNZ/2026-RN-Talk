import { ScrollView, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Button } from '@/components/button';

export default function GalleryScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gallery</Text>
      <Text style={styles.subtitle}>Unistyles variants demo</Text>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>variant</Text>
        <View style={styles.row}>
          <Button label="Primary" variant="primary" />
          <Button label="Secondary" variant="secondary" />
          <Button label="Danger" variant="danger" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>size</Text>
        <View style={styles.row}>
          <Button label="Small" size="sm" />
          <Button label="Medium" size="md" />
          <Button label="Large" size="lg" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>disabled (boolean variant)</Text>
        <View style={styles.row}>
          <Button label="Enabled" />
          <Button label="Disabled" disabled />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>compound variants</Text>
        <Text style={styles.sectionHint}>
          danger + lg adds a lifted shadow; secondary + disabled switches to a dashed border.
        </Text>
        <View style={styles.row}>
          <Button label="Delete account" variant="danger" size="lg" />
          <Button label="Inert" variant="secondary" disabled />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>default keys</Text>
        <Text style={styles.sectionHint}>
          No variant or size prop — the `default` keys take over.
        </Text>
        <View style={styles.row}>
          <Button label="Defaults" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  scroll: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    padding: theme.spacing.lg,
    gap: theme.spacing.xl,
    flexGrow: 1,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.text,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
    marginTop: -theme.spacing.lg,
  },
  section: {
    gap: theme.spacing.sm,
  },
  sectionLabel: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionHint: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    alignItems: 'center',
  },
}));
