import { Picker, Text } from '@expo/ui/swift-ui';
import { pickerStyle as pickerStyleModifier, tag } from '@expo/ui/swift-ui/modifiers';

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
  pickerStyle = 'menu',
}: FormPickerProps<T>) {
  return (
    <Picker
      label={label}
      selection={selection}
      onSelectionChange={onSelectionChange}
      modifiers={[pickerStyleModifier(pickerStyle)]}
    >
      {options.map((opt) => (
        <Text key={String(opt.value)} modifiers={[tag(opt.value)]}>
          {opt.label}
        </Text>
      ))}
    </Picker>
  );
}
