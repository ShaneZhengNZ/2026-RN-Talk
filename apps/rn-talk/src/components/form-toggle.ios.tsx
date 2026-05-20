import { Toggle } from '@expo/ui/swift-ui';
import type { SFSymbol } from 'sf-symbols-typescript';

interface FormToggleProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  systemImage?: SFSymbol;
}

export function FormToggle({ label, value, onValueChange, systemImage }: FormToggleProps) {
  return (
    <Toggle label={label} isOn={value} onIsOnChange={onValueChange} systemImage={systemImage} />
  );
}
