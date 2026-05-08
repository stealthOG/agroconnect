import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

import logger from './lib/logger';
import { initSentry, captureException } from './lib/sentry';
import { prisma } from './lib/prisma';

import authRoutes    from './routes/auth';
import userRoutes    from './routes/users';
import productRoutes from './routes/products';
import orderRoutes   from './routes/orders';
import walletRoutes  from './routes/wallet';
import paymentRoutes      from './routes/payments';
import uploadRoutes       from './routes/uploads';
import produceRoutes      from './routes/produce';
import coursesRoutes      from './routes/courses';
import loansRoutes        from './routes/loans';
import notificationsRoutes from './routes/notifications';
import adminRoutes         from './routes/admin';
import analyticsRoutes    from './routes/analytics';
import coopRoutes         from './routes/coop';
import expertsRoutes      from './routes/experts';
import consultationsRoutes from './routes/consultations';
import whatsappRoutes      from './routes/whatsapp';
import { handleWebhook } from './controllers/payments.controller';

/* ── Init error tracking early ── */
initSentry();

const app = express();

/* ── Security headers ── */
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:     ["'self'"],
      scriptSrc:      ["'self'", 'https://js.paystack.co', 'https://api.mapbox.com',
                       'https://cdnjs.cloudflare.com', 'https://cdn.jsdelivr.net'],
      styleSrc:       ["'self'", "'unsafe-inline'",   // inline styles still exist — tighten in Phase 7
                       'https://api.mapbox.com', 'https://fonts.googleapis.com'],
      fontSrc:        ["'self'", 'https://fonts.gstatic.com'],
      imgSrc:         ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com',
                       'https://placehold.co', 'https://api.mapbox.com'],
      connectSrc:     ["'self'", 'https://api.paystack.co', 'https://api.mapbox.com',
                       'https://api.ng.termii.com', 'https://api.sendgrid.com'],
      frameSrc:       ["'none'"],
      objectSrc:      ["'none'"],
      upgradeInsecureRequests: process.env['NODE_ENV'] === 'production' ? [] : null,
    },
  },
  hsts: {
    maxAge:            31536000,
    includeSubDomains: true,
    preload:           true,
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}));

/* ── CORS ── */
const allowedOrigins = (process.env['FRONTEND_URL'] ?? 'http://localhost:3000').split(',').map(s => s.trim());
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
  maxAge:       86400,  // 24h preflight cache
}));

/* ── Webhooks — raw/urlencoded body BEFORE JSON parser ── */
app.post('/api/v1/payments/webhook', express.raw({ type: 'application/json' }), handleWebhook);
app.use('/api/v1/whatsapp', whatsappRoutes);

/* ── Body parsing ── */
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

/* ── Global rate limit ── */
app.use(rateLimit({
  windowMs: 60 * 1000,
  max:      100,
  standardHeaders: true,
  legacyHeaders:   false,
  message: { success: false, error: 'Too many requests — please slow down' },
}));

/* ── Request logging ── */
app.use((req, _res, next) => {
  logger.info({ method: req.method, url: req.url }, 'incoming request');
  next();
});

/* ── Health check ── */
app.get('/api/health', async (_req, res) => {
  let dbStatus: 'ok' | 'error' = 'error';
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = 'ok';
  } catch { /* db unavailable */ }

  const status = dbStatus === 'ok' ? 200 : 503;
  res.status(status).json({
    success: dbStatus === 'ok',
    uptime:  process.uptime(),
    db:      dbStatus,
    env:     process.env['NODE_ENV'],
    version: process.env['npm_package_version'] ?? '0.1.0',
  });
});

/* ── Routes ── */
app.use('/api/v1/auth',     authRoutes);
app.use('/api/v1/users',    userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders',   orderRoutes);
app.use('/api/v1/wallet',   walletRoutes);
app.use('/api/v1/payments',      paymentRoutes);
app.use('/api/v1/uploads',       uploadRoutes);
app.use('/api/v1/produce',       produceRoutes);
app.use('/api/v1/courses',       coursesRoutes);
app.use('/api/v1/loans',         loansRoutes);
app.use('/api/v1/notifications', notificationsRoutes);
app.use('/api/v1/admin',         adminRoutes);
app.use('/api/v1/analytics',     analyticsRoutes);
app.use('/api/v1/coop/members',  coopRoutes);
app.use('/api/v1/experts',       expertsRoutes);
app.use('/api/v1/consultations', consultationsRoutes);

/* ── 404 handler ── */
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

/* ── Global error handler ── */
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const status = (err as { status?: number }).status ?? 500;

  logger.error({ err, method: req.method, url: req.url, status }, 'request error');

  if (status >= 500) {
    captureException(err, { method: req.method, url: req.url });
  }

  res.status(status).json({
    success: false,
    error:   process.env['NODE_ENV'] === 'production' ? 'Internal server error' : err.message,
  });
});

export default app;
