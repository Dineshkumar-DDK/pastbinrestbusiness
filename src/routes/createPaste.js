import { nanoid } from 'nanoid';
import { prisma } from '../lib/prisma.js';

export async function createPaste(req, res) {
  const { content, ttl_seconds, max_views } = req.body;
  
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Invalid content' });
  }
  if (ttl_seconds !== undefined && ttl_seconds < 1) {
    return res.status(400).json({ error: 'Invalid ttl_seconds' });
  }
  if (max_views !== undefined && max_views < 1) {
    return res.status(400).json({ error: 'Invalid max_views' });
  }

  const id = nanoid(8);
  const expiresAt = ttl_seconds
    ? new Date(Date.now() + ttl_seconds * 1000)
    : null;

  await prisma.paste.create({
    data: {
      id,
      content,
      expiresAt,
      maxViews: max_views ?? null
    }
  });

  res.status(201).json({
    id,
    url: `${process.env.BASE_URL}/p/${id}`
  });
}
