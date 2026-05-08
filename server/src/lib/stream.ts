import type { Response } from 'express';

/* In-memory map: userId → active SSE response */
const _clients = new Map<string, Response>();

export function registerClient(userId: string, res: Response): void {
  /* Close any existing connection for this user (single active stream per user) */
  const existing = _clients.get(userId);
  if (existing && !existing.writableEnded) {
    existing.end();
  }
  _clients.set(userId, res);
}

export function removeClient(userId: string): void {
  _clients.delete(userId);
}

export function emitToUser(userId: string, event: string, data: unknown): void {
  const res = _clients.get(userId);
  if (!res || res.writableEnded) {
    _clients.delete(userId);
    return;
  }
  res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

export function connectedCount(): number {
  return _clients.size;
}
