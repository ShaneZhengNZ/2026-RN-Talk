import { Section, Text } from '@expo/ui/swift-ui';
import type { ReactNode } from 'react';

interface FormSectionProps {
  title?: string;
  footer?: string;
  children: ReactNode;
}

export function FormSection({ title, footer, children }: FormSectionProps) {
  // Section's footer prop is typed as ReactNode — passing a raw string trips
  // RN's "Text strings must be rendered within a <Text>" check, so wrap it.
  return (
    <Section title={title} footer={footer ? <Text>{footer}</Text> : undefined}>
      {children}
    </Section>
  );
}
