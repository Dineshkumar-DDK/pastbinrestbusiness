import { prisma } from '../lib/prisma.js';
import { now } from '../lib/time.js';

export async function fetchPaste(req, res) {
  const { id } = req.params;
  const currentTime = now(req); 

  const paste = await prisma.paste.findUnique({ where: { id } });

  if (!paste) {
    return res.status(404).json({ error: 'Not found' });
  }

  if (paste.expiresAt && paste.expiresAt.getTime() <= currentTime) {
    return res.status(404).json({ error: 'Not found' });
  }

  if (paste.maxViews !== null && paste.viewCount >= paste.maxViews) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.json({
    content: paste.content,
    remaining_views:
      paste.maxViews !== null
        ? paste.maxViews - paste.viewCount
        : null,
    expires_at: paste.expiresAt
  });
}
