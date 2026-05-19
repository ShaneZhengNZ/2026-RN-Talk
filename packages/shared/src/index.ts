import { z } from 'zod';

export const TrendingSinceSchema = z.enum(['daily', 'weekly', 'monthly']);
export type TrendingSince = z.infer<typeof TrendingSinceSchema>;

export const TrendingQuerySchema = z.object({
  language: z
    .string()
    .trim()
    .min(1)
    .max(64)
    .regex(/^[A-Za-z0-9+#.\- ]+$/, 'language contains unsupported characters')
    .optional(),
  since: TrendingSinceSchema.default('daily'),
});
export type TrendingQuery = z.infer<typeof TrendingQuerySchema>;

export const RepoSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  fullName: z.string(),
  description: z.string().nullable(),
  language: z.string().nullable(),
  stars: z.number().int().nonnegative(),
  owner: z.object({
    login: z.string(),
    avatarUrl: z.string().url(),
  }),
  htmlUrl: z.string().url(),
});
export type Repo = z.infer<typeof RepoSchema>;

export const TrendingResponseSchema = z.object({
  repos: z.array(RepoSchema),
  cachedAt: z.string().datetime(),
  since: TrendingSinceSchema,
  language: z.string().nullable(),
});
export type TrendingResponse = z.infer<typeof TrendingResponseSchema>;
