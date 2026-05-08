import './setup';
import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } from '../lib/jwt';

const payload = { userId: 'user-abc', role: 'farmer', email: 'farmer@test.com' };

describe('JWT library', () => {

  describe('access tokens', () => {
    it('signs and verifies a valid payload', () => {
      const token    = signAccessToken(payload);
      const verified = verifyAccessToken(token);
      expect(verified.userId).toBe(payload.userId);
      expect(verified.role).toBe(payload.role);
      expect(verified.email).toBe(payload.email);
    });

    it('throws on a tampered token', () => {
      const token   = signAccessToken(payload);
      const tampered = token.slice(0, -4) + 'xxxx';
      expect(() => verifyAccessToken(tampered)).toThrow();
    });
  });

  describe('refresh tokens', () => {
    it('signs and verifies a refresh token', () => {
      const token    = signRefreshToken({ userId: 'user-abc' });
      const verified = verifyRefreshToken(token);
      expect(verified.userId).toBe('user-abc');
    });

    it('throws when verifying an access token as refresh', () => {
      const access = signAccessToken(payload);
      expect(() => verifyRefreshToken(access)).toThrow();
    });
  });
});
