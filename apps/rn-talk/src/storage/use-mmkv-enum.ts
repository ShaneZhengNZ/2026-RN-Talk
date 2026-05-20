import { useMMKVString } from 'react-native-mmkv';

/**
 * Typed wrapper around useMMKVString for a closed set of string values.
 * Returns the fallback if storage is empty or holds a value outside `allowed`.
 */
export function useMMKVEnum<T extends string>(
  key: string,
  fallback: T,
  allowed: readonly T[]
): [T, (value: T) => void] {
  const [raw, setRaw] = useMMKVString(key);
  const isAllowed = raw !== undefined && (allowed as readonly string[]).includes(raw);
  const value: T = isAllowed ? (raw as T) : fallback;
  return [value, (next: T) => setRaw(next)];
}
