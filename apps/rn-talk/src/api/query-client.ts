import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Trending data refreshes server-side every cacheTtlMs (90s), so a
      // 60s client-side stale time keeps the UI snappy without spamming
      // the BFF on every tab switch.
      staleTime: 60_000,
      retry: 2,
    },
  },
});
