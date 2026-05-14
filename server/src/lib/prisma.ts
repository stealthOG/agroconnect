// @ts-nocheck — Prisma 7 generated client types are not fully TS-compatible yet
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

function createClient() {
  const pool = new Pool({
    connectionString: process.env['DATABASE_URL'],
    options: '--no-prepared-statements', // required for PgBouncer transaction mode
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma: PrismaClient = globalForPrisma.prisma ?? createClient();

if (process.env['NODE_ENV'] !== 'production') {
  globalForPrisma.prisma = prisma;
}
