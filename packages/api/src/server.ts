/**
 * TestForge API Server entry point.
 *
 * This minimal HTTP server uses only Node.js built-ins to avoid
 * adding heavy framework dependencies. In production, wrap with
 * an Express/Fastify/NestJS adapter.
 */
import http from 'http';
import { healthHandler } from './routes/health';

const PORT = parseInt(process.env['PORT'] ?? '3000', 10);

export function createServer(): http.Server {
  return http.createServer((req, res) => {
    const url = req.url ?? '/';

    if (url === '/health' && req.method === 'GET') {
      const body = JSON.stringify(healthHandler());
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(body);
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  });
}

/* istanbul ignore next */
if (require.main === module) {
  const server = createServer();
  server.listen(PORT, () => {
    console.log(`TestForge API running on port ${PORT}`);
  });
}
