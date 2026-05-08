/* ═══════════════════════════════════════════════════════════
   STRUCTURED LOGGER — Pino
   ───────────────────────────────────────────────────────────
   Dev:  colourised human-readable output via pino-pretty
   Prod: JSON lines (ship to Datadog / CloudWatch / Loki)
   ═══════════════════════════════════════════════════════════ */

import pino from 'pino';

const isDev = process.env['NODE_ENV'] !== 'production';

const logger = pino(
  {
    level:     process.env['LOG_LEVEL'] ?? 'info',
    base:      { service: 'agroconnect-api' },
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
      paths:   ['req.headers.authorization', 'body.password', 'body.passwordHash'],
      censor:  '[REDACTED]',
    },
  },
  isDev
    ? pino.transport({ target: 'pino-pretty', options: { colorize: true, ignore: 'pid,hostname' } })
    : undefined,
);

export default logger;
