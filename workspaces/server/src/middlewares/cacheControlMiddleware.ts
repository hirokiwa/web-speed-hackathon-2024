import { createMiddleware } from 'hono/factory';

export const cacheControlMiddleware = createMiddleware(async (c, next) => {
  await next();
  c.res.headers.append('Cache-Control', 'max-age=0');
  c.res.headers.append('Cache-Control', 'max-age=0');
});
