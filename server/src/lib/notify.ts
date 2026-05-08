import { prisma } from './prisma';
import { emitToUser } from './stream';

export async function notify(
  userId: string,
  title: string,
  body: string,
  link?: string,
): Promise<void> {
  const notif = await prisma.notification.create({
    data: { userId, title, body, link: link ?? null },
  } as Parameters<typeof prisma.notification.create>[0]) as {
    id: string; userId: string; title: string; body: string;
    isRead: boolean; link: string | null; createdAt: Date;
  };

  emitToUser(userId, 'notification', {
    id:        notif.id,
    title:     notif.title,
    body:      notif.body,
    link:      notif.link,
    createdAt: notif.createdAt,
  });
}
