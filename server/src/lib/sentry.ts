/* ═══════════════════════════════════════════════════════════
   ERROR TRACKING — Sentry
   ───────────────────────────────────────────────────────────
   TO CONNECT: Add to server/.env
     SENTRY_DSN=https://...@sentry.io/...
   ═══════════════════════════════════════════════════════════ */

import * as Sentry from '@sentry/node';
import logger from './logger';

export function initSentry(): void {
  const dsn = process.env['SENTRY_DSN'];
  if (!dsn) {
    logger.info('[sentry] No DSN configured — error tracking disabled');
    return;
  }

  Sentry.init({
    dsn,
    environment:      process.env['NODE_ENV'] ?? 'development',
    tracesSampleRate: process.env['NODE_ENV'] === 'production' ? 0.1 : 1.0,
    beforeSend(event) {
      // Strip PII from breadcrumbs before sending
      if (event.request?.headers?.['authorization']) {
        event.request.headers['authorization'] = '[REDACTED]';
      }
      return event;
    },
  });

  logger.info('[sentry] Error tracking initialised');
}

export function captureException(err: unknown, context?: Record<string, unknown>): void {
  if (!process.env['SENTRY_DSN']) {
    logger.error({ err, ...context }, 'Captured exception');
    return;
  }
  Sentry.withScope(scope => {
    if (context) scope.setExtras(context);
    Sentry.captureException(err);
  });
}

export function captureMessage(message: string, sentryLevel: 'info' | 'warning' | 'error' = 'info'): void {
  if (!process.env['SENTRY_DSN']) {
    const pinoLevel = sentryLevel === 'warning' ? 'warn' : sentryLevel;
    logger[pinoLevel]('[sentry msg] ' + message);
    return;
  }
  Sentry.captureMessage(message, sentryLevel);
}
