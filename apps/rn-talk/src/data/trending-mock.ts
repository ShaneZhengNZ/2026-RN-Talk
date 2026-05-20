export interface TrendingRepo {
  id: string;
  owner: string;
  name: string;
  description: string;
  stars: number;
  language: string;
}

export const TRENDING_REPOS: readonly TrendingRepo[] = [
  {
    id: 'facebook-react',
    owner: 'facebook',
    name: 'react',
    description: 'The library for web and native user interfaces.',
    stars: 230_000,
    language: 'JavaScript',
  },
  {
    id: 'expo-expo',
    owner: 'expo',
    name: 'expo',
    description: 'An open-source framework for making universal native apps.',
    stars: 34_000,
    language: 'TypeScript',
  },
  {
    id: 'vercel-next.js',
    owner: 'vercel',
    name: 'next.js',
    description: 'The React Framework for the Web.',
    stars: 125_000,
    language: 'JavaScript',
  },
  {
    id: 'tanstack-query',
    owner: 'TanStack',
    name: 'query',
    description: 'Powerful asynchronous state management for TS/JS.',
    stars: 42_000,
    language: 'TypeScript',
  },
  {
    id: 'jpudysz-react-native-unistyles',
    owner: 'jpudysz',
    name: 'react-native-unistyles',
    description: 'Level up your React Native StyleSheet.',
    stars: 3_000,
    language: 'TypeScript',
  },
];

export function findRepoById(id: string): TrendingRepo | undefined {
  return TRENDING_REPOS.find((r) => r.id === id);
}
