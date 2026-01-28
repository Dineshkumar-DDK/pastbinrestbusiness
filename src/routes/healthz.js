import { prisma } from '../lib/prisma.js';

export async function healthz(req, res) {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false });
  }
}
