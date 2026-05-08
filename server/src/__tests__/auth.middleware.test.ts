import './setup';
import type { Response, NextFunction } from 'express';
import { requireAuth, requireRole, type AuthRequest } from '../middleware/auth';
import { signAccessToken } from '../lib/jwt';

function mockRes() {
  const res = {
    status: jest.fn().mockReturnThis(),
    json:   jest.fn().mockReturnThis(),
  } as unknown as Response;
  return res;
}

const next: NextFunction = jest.fn();

describe('requireAuth middleware', () => {

  beforeEach(() => jest.clearAllMocks());

  it('calls next() with a valid Bearer token', () => {
    const token = signAccessToken({ userId: 'user-1', role: 'farmer', email: 'a@b.com' });
    const req   = { headers: { authorization: `Bearer ${token}` } } as AuthRequest;
    const res   = mockRes();

    requireAuth(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.user?.userId).toBe('user-1');
    expect(req.user?.role).toBe('farmer');
  });

  it('returns 401 when Authorization header is missing', () => {
    const req = { headers: {} } as AuthRequest;
    const res = mockRes();

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 401 for an expired / invalid token', () => {
    const req = { headers: { authorization: 'Bearer invalid.token.here' } } as AuthRequest;
    const res = mockRes();

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});

describe('requireRole middleware', () => {

  beforeEach(() => jest.clearAllMocks());

  it('calls next() when user has an allowed role', () => {
    const req = { user: { userId: 'u1', role: 'supplier', email: 'x@y.com' } } as AuthRequest;
    const res = mockRes();

    requireRole('supplier', 'admin')(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('returns 403 when user role is not allowed', () => {
    const req = { user: { userId: 'u1', role: 'farmer', email: 'x@y.com' } } as AuthRequest;
    const res = mockRes();

    requireRole('supplier')(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 401 when no user on request', () => {
    const req = {} as AuthRequest;
    const res = mockRes();

    requireRole('supplier')(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });
});
