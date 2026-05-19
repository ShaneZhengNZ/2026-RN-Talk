import { StyleSheet } from 'react-native-unistyles';

const palette = {
  white: '#ffffff',
  black: '#000000',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  blue500: '#3b82f6',
  blue600: '#2563eb',
  red500: '#ef4444',
} as const;

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  pill: 999,
} as const;

const typography = {
  body: { fontSize: 16, lineHeight: 24 },
  bodyBold: { fontSize: 16, lineHeight: 24, fontWeight: '600' },
  small: { fontSize: 13, lineHeight: 18 },
  title: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
  caption: { fontSize: 12, lineHeight: 16 },
} as const;

const lightTheme = {
  colors: {
    background: palette.white,
    backgroundElevated: palette.gray50,
    border: palette.gray200,
    text: palette.gray900,
    textMuted: palette.gray500,
    primary: palette.blue600,
    danger: palette.red500,
  },
  spacing,
  radius,
  typography,
} as const;

const darkTheme = {
  colors: {
    background: palette.black,
    backgroundElevated: palette.gray800,
    border: palette.gray700,
    text: palette.white,
    textMuted: palette.gray400,
    primary: palette.blue500,
    danger: palette.red500,
  },
  spacing,
  radius,
  typography,
} as const;

const breakpoints = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
} as const;

type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

type AppBreakpoints = typeof breakpoints;

declare module 'react-native-unistyles' {
  // Module augmentation requires `interface extends` to merge with the library's types.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends AppThemes {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  breakpoints,
  settings: {
    adaptiveThemes: true,
  },
});
