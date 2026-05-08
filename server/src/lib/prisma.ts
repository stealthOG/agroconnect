// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck — Prisma 7 generated client types are not fully TS-compatible yet
import { PrismaClient } from '../generated/prisma/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma: PrismaClient = globalForPrisma.prisma ?? new PrismaClient({
  datasourceUrl: process.env['DATABASE_URL'],
});

if (process.env['NODE_ENV'] !== 'production') {
  globalForPrisma.prisma = prisma;
}
