const parsePort = (raw: string | undefined): number => {
  if (raw === undefined) return 4000;
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed) || parsed <= 0 || parsed > 65535) {
    throw new Error(`PORT must be a number between 1 and 65535, got "${raw}"`);
  }
  return parsed;
};

export const config = {
  port: parsePort(process.env.PORT),
  githubToken: process.env.GITHUB_TOKEN?.trim() || undefined,
  cacheTtlMs: 90_000,
  upstreamTimeoutMs: 8_000,
} as const;
