import { Router } from 'express';
import { z } from 'zod';
import {
  TrendingQuerySchema,
  type TrendingResponse,
} from '@rn-talk/shared';
import { TtlCache } from '../cache.js';
import { config } from '../config.js';
import { fetchTrendingRepos, UpstreamError } from '../github.js';

export const createTrendingRouter = (): Router => {
  const router = Router();
  const cache = new TtlCache<TrendingResponse>(config.cacheTtlMs);

  router.get('/trending', async (req, res, next) => {
    const parsed = TrendingQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({
        error: 'bad_request',
        issues: parsed.error.issues,
      });
      return;
    }

    const query = parsed.data;
    const cacheKey = `${query.since}|${query.language ?? ''}`;
    const cached = cache.get(cacheKey);
    if (cached !== undefined) {
      res.set('Cache-Control', `public, max-age=${Math.floor(config.cacheTtlMs / 1000)}`);
      res.set('X-Cache', 'HIT');
      res.json(cached);
      return;
    }

    try {
      const repos = await fetchTrendingRepos(query);
      const payload: TrendingResponse = {
        repos,
        cachedAt: new Date().toISOString(),
        since: query.since,
        language: query.language ?? null,
      };
      cache.set(cacheKey, payload);
      res.set('Cache-Control', `public, max-age=${Math.floor(config.cacheTtlMs / 1000)}`);
      res.set('X-Cache', 'MISS');
      res.json(payload);
    } catch (error) {
      if (error instanceof UpstreamError) {
        res.status(error.status).json({ error: 'upstream', message: error.message });
        return;
      }
      if (error instanceof z.ZodError) {
        res.status(502).json({
          error: 'upstream_shape_mismatch',
          message: 'GitHub returned an unexpected payload',
        });
        return;
      }
      next(error);
    }
  });

  return router;
};
