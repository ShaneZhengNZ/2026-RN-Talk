import {
  type TrendingQuery,
  TrendingQuerySchema,
  type TrendingResponse,
  TrendingResponseSchema,
  type TrendingSince,
} from '@rn-talk/shared';
import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000';

interface TrendingInput {
  since?: TrendingSince;
  language?: string;
}

async function fetchTrending(query: TrendingQuery): Promise<TrendingResponse> {
  const url = new URL(`${API_BASE_URL}/api/repos/trending`);
  url.searchParams.set('since', query.since);
  if (query.language !== undefined) {
    url.searchParams.set('language', query.language);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Trending request failed: ${response.status} ${response.statusText}`);
  }
  const json = await response.json();
  // .parse() — a payload-shape mismatch must surface as a query error,
  // not be silently coerced.
  return TrendingResponseSchema.parse(json);
}

export function useTrendingRepos(input: TrendingInput = {}) {
  const query = TrendingQuerySchema.parse(input);
  return useQuery({
    queryKey: ['trending', query] as const,
    queryFn: () => fetchTrending(query),
  });
}
