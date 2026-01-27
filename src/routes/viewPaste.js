import escapeHtml from 'escape-html';
import { prisma } from '../lib/prisma.js';
import { now } from '../lib/time.js';

export async function viewPaste(req, res) {
  const { id } = req.params;
  const currentTime = now(req);

  const paste = await prisma.paste.findUnique({ where: { id } });

  if (
    !paste ||
    (paste.expiresAt && paste.expiresAt <= currentTime) ||
    (paste.maxViews && paste.viewCount >= paste.maxViews)
  ) {
    return res.status(404).send('Not found');
  }

  await prisma.paste.update({
    where: { id },
    data: { viewCount: { increment: 1 } }
  });

  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <html>
      <body>
        <pre>${escapeHtml(paste.content)}</pre>
      </body>
    </html>
  `);
}
