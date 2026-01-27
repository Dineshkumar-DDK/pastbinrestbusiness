import { prisma } from '../lib/prisma.js';
import { now } from '../lib/time.js';

export async function fetchPaste(req, res) {
  const { id } = req.params;
  const currentTime = now(req);

  const paste = await prisma.$transaction(async tx => {
    const p = await tx.paste.findUnique({ where: { id } });
    if (!p) return null;

    if (p.expiresAt && p.expiresAt <= currentTime) return null;
    if (p.maxViews && p.viewCount >= p.maxViews) return null;

    return tx.paste.update({
      where: { id },
      data: { viewCount: { increment: 1 } }
    });
  });

  if (!paste) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.json({
    content: paste.content,
    remaining_views: paste.maxViews
      ? paste.maxViews - paste.viewCount
      : null,
    expires_at: paste.expiresAt
  });
}
