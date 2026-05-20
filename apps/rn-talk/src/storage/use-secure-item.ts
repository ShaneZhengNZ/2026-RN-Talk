import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect, useState } from 'react';

interface SecureItemState {
  value: string | null;
  loading: boolean;
  save: (next: string) => Promise<void>;
  remove: () => Promise<void>;
}

/**
 * Hook for reading and writing a single key in the device keychain via
 * expo-secure-store. Initial load is async so callers should render a
 * loading state for the first paint.
 */
export function useSecureItem(key: string): SecureItemState {
  const [value, setValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    SecureStore.getItemAsync(key)
      .then((stored) => {
        if (!cancelled) {
          setValue(stored);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(`[useSecureItem] failed to read ${key}`, error);
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [key]);

  const save = useCallback(
    async (next: string) => {
      await SecureStore.setItemAsync(key, next);
      setValue(next);
    },
    [key]
  );

  const remove = useCallback(async () => {
    await SecureStore.deleteItemAsync(key);
    setValue(null);
  }, [key]);

  return { value, loading, save, remove };
}
