import { Switch, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { SFSymbol } from 'sf-symbols-typescript';

interface FormToggleProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  systemImage?: SFSymbol;
}

export function FormToggle({ label, value, onValueChange }: FormToggleProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} thumbColor={value ? '#fff' : '#f4f3f4'} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
  },
  label: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
}));
