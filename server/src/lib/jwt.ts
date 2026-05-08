import jwt from 'jsonwebtoken';

const ACCESS_SECRET  = process.env['JWT_ACCESS_SECRET']  ?? 'dev_access_secret_change_in_prod';
const REFRESH_SECRET = process.env['JWT_REFRESH_SECRET'] ?? 'dev_refresh_secret_change_in_prod';
const ACCESS_TTL     = process.env['JWT_ACCESS_EXPIRES_IN']  ?? '15m';
const REFRESH_TTL    = process.env['JWT_REFRESH_EXPIRES_IN'] ?? '7d';

export interface JwtPayload {
  userId: string;
  role:   string;
  email:  string;
}

export function signAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_TTL } as jwt.SignOptions);
}

export function signRefreshToken(payload: Pick<JwtPayload, 'userId'>): string {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_TTL } as jwt.SignOptions);
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
}

export function verifyRefreshToken(token: string): Pick<JwtPayload, 'userId'> {
  return jwt.verify(token, REFRESH_SECRET) as Pick<JwtPayload, 'userId'>;
}
