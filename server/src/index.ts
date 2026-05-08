import 'dotenv/config';
import app from './app';
import logger from './lib/logger';

const PORT = Number(process.env['PORT']) || 4000;

const server = app.listen(PORT, () => {
  logger.info({ port: PORT, env: process.env['NODE_ENV'] ?? 'development' }, 'AgroConnect API started');
});

/* Graceful shutdown */
process.on('SIGTERM', () => {
  logger.info('SIGTERM received — shutting down gracefully');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

process.on('uncaughtException', (err) => {
  logger.fatal({ err }, 'Uncaught exception — shutting down');
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.fatal({ reason }, 'Unhandled rejection — shutting down');
  process.exit(1);
});
