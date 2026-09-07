import { startGame, fetchAds, solveAd } from '../api';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

test('startGame returns parsed JSON on success', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ gameId: 'abc123', lives: 3, gold: 0, score: 0, turn: 0, highScore: 0 }),
  });

  const result = await startGame();
  expect(result.gameId).toBe('abc123');
  expect(fetch).toHaveBeenCalledWith('/api/game/start', { method: 'POST' });
});

test('startGame throws with server detail on failure', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: false,
    json: async () => ({ error: 'Upstream game API unreachable', detail: 'timeout' }),
  });

  await expect(startGame()).rejects.toThrow('Failed to start game: timeout');
});

test('fetchAds calls the correct gameId-scoped endpoint', async () => {
  global.fetch.mockResolvedValueOnce({ ok: true, json: async () => [] });
  await fetchAds('game1');
  expect(fetch).toHaveBeenCalledWith('/api/game/game1/ads');
});

test('solveAd posts to the correct path', async () => {
  global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) });
  await solveAd('game1', 'ad1');
  expect(fetch).toHaveBeenCalledWith('/api/game/game1/solve/ad1', { method: 'POST' });
});