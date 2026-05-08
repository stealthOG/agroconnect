import type { Request, Response } from 'express';
import { verifyAccessToken } from '../lib/jwt';
import { registerClient, removeClient } from '../lib/stream';

/* GET /api/v1/notifications/stream?token=<accessToken> */
export function sseStream(req: Request, res: Response): void {
  const token = req.query['token'] as string | undefined;

  if (!token) {
    res.status(401).json({ success: false, error: 'Token required' });
    return;
  }

  let userId: string;
  try {
    const payload = verifyAccessToken(token);
    userId = payload.userId;
  } catch {
    res.status(401).json({ success: false, error: 'Invalid token' });
    return;
  }

  /* SSE headers */
  res.setHeader('Content-Type',  'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection',    'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');  // nginx proxy buffering off
  res.flushHeaders();

  registerClient(userId, res);

  /* Send a connected confirmation and a heartbeat every 25s */
  res.write(`event: connected\ndata: {"userId":"${userId}"}\n\n`);

  const heartbeat = setInterval(() => {
    if (res.writableEnded) {
      clearInterval(heartbeat);
      return;
    }
    res.write(': heartbeat\n\n');
  }, 25_000);

  req.on('close', () => {
    clearInterval(heartbeat);
    removeClient(userId);
  });
}
