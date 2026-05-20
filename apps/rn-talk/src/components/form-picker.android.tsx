import { Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type PickerValue = string | number;
type PickerStyleType = 'menu' | 'segmented' | 'wheel' | 'inline';

interface FormPickerProps<T extends PickerValue> {
  label?: string;
  selection: T;
  onSelectionChange: (value: T) => void;
  options: readonly { label: string; value: T }[];
  pickerStyle?: PickerStyleType;
}

export function FormPicker<T extends PickerValue>({
  label,
  selection,
  onSelectionChange,
  options,
}: FormPickerProps<T>) {
  return (
    <View style={styles.field}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.options}>
        {options.map((opt) => {
          const isSelected = opt.value === selection;
          return (
            <Pressable
              key={String(opt.value)}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              android_ripple={{ color: 'rgba(0,0,0,0.12)' }}
              onPress={() => onSelectionChange(opt.value)}
              style={[styles.option, isSelected && styles.optionSelected]}
            >
              <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  field: {
    gap: theme.spacing.xs,
  },
  label: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  option: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.background,
    elevation: 1,
  },
  optionSelected: {
    backgroundColor: theme.colors.primary,
    elevation: 3,
  },
  optionLabel: {
    ...theme.typography.small,
    color: theme.colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  optionLabelSelected: {
    color: theme.colors.background,
    fontWeight: '700',
  },
}));
