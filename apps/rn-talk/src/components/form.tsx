import { Host, Form as NativeForm } from '@expo/ui/swift-ui';
import type { ReactNode } from 'react';

interface FormProps {
  children: ReactNode;
}

export function Form({ children }: FormProps) {
  return (
    <Host style={{ flex: 1 }}>
      <NativeForm>{children}</NativeForm>
    </Host>
  );
}
