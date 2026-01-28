
export function now(req) {
  if (process.env.TEST_MODE === '1') {
    const t = req.headers['x-test-now-ms'];
    if (t !== undefined) {
      const parsed = Number(t);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
  }
  return Date.now();
}
