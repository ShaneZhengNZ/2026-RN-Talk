import type { Repo, TrendingQuery, TrendingSince } from '@rn-talk/shared';
import { z } from 'zod';
import { config } from './config.js';

const GitHubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  html_url: z.string().url(),
  owner: z.object({
    login: z.string(),
    avatar_url: z.string().url(),
  }),
});

const GitHubSearchResponseSchema = z.object({
  total_count: z.number(),
  incomplete_results: z.boolean(),
  items: z.array(GitHubRepoSchema),
});

export class UpstreamError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = 'UpstreamError';
  }
}

const sinceToWindowStart = (since: TrendingSince, now: Date): string => {
  const start = new Date(now);
  switch (since) {
    case 'daily':
      start.setUTCDate(start.getUTCDate() - 1);
      break;
    case 'weekly':
      start.setUTCDate(start.getUTCDate() - 7);
      break;
    case 'monthly':
      start.setUTCMonth(start.getUTCMonth() - 1);
      break;
  }
  return start.toISOString().slice(0, 10);
};

const buildQuery = (query: TrendingQuery, now: Date): string => {
  const parts: string[] = [`created:>${sinceToWindowStart(query.since, now)}`];
  if (query.language !== undefined) {
    parts.push(`language:${query.language}`);
  }
  return parts.join(' ');
};

export const fetchTrendingRepos = async (
  query: TrendingQuery,
  now: Date = new Date()
): Promise<Repo[]> => {
  const url = new URL('https://api.github.com/search/repositories');
  url.searchParams.set('q', buildQuery(query, now));
  url.searchParams.set('sort', 'stars');
  url.searchParams.set('order', 'desc');
  url.searchParams.set('per_page', '30');

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'rn-talk-bff',
  };
  if (config.githubToken !== undefined) {
    headers.Authorization = `Bearer ${config.githubToken}`;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.upstreamTimeoutMs);
  let response: Response;
  try {
    response = await fetch(url, { headers, signal: controller.signal });
  } catch (cause) {
    const message =
      cause instanceof Error && cause.name === 'AbortError'
        ? 'GitHub request timed out'
        : 'GitHub request failed';
    throw new UpstreamError(504, message);
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    const message =
      response.status === 403 && body.includes('rate limit')
        ? 'GitHub rate limit exceeded'
        : `GitHub responded ${response.status}`;
    throw new UpstreamError(response.status === 403 ? 429 : 502, message);
  }

  const json = await response.json();
  const parsed = GitHubSearchResponseSchema.parse(json);

  return parsed.items.map((item) => ({
    id: item.id,
    name: item.name,
    fullName: item.full_name,
    description: item.description,
    language: item.language,
    stars: item.stargazers_count,
    htmlUrl: item.html_url,
    owner: {
      login: item.owner.login,
      avatarUrl: item.owner.avatar_url,
    },
  }));
};
