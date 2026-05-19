import { config } from './config.js';
import { createServer } from './server.js';

if (config.githubToken === undefined) {
  console.warn(
    '[api] GITHUB_TOKEN is not set — using unauthenticated GitHub access (60 req/hour).',
  );
}

const app = createServer();
app.listen(config.port, () => {
  console.log(`[api] listening on http://localhost:${config.port}`);
});
