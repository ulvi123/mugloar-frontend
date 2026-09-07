const BASE = '/api/game';

async function handleResponse(res, action) {
  if (!res.ok) {
    let detail = '';
    try {
      const body = await res.json();
      detail = body.detail || body.error || '';
    } catch (_) {
        // Ignore JSON parsing errors

    }
    throw new Error(`Failed to ${action}${detail ? `: ${detail}` : ''}`);
  }
  return res.json();
}

export async function startGame() {
  const res = await fetch(`${BASE}/start`, { method: 'POST' });
  return handleResponse(res, 'start game');
}

export async function fetchAds(gameId) {
  const res = await fetch(`${BASE}/${gameId}/ads`);
  return handleResponse(res, 'fetch ads');
}

export async function solveAd(gameId, adId) {
  const res = await fetch(`${BASE}/${gameId}/solve/${adId}`, { method: 'POST' });
  return handleResponse(res, 'solve ad');
}

export async function fetchShop(gameId) {
  const res = await fetch(`${BASE}/${gameId}/shop`);
  return handleResponse(res, 'fetch shop');
}

export async function buyItem(gameId, itemId) {
  const res = await fetch(`${BASE}/${gameId}/shop/buy/${itemId}`, { method: 'POST' });
  return handleResponse(res, 'buy item');
}

export async function autoplay(gameId, target = 1000) {
  const res = await fetch(`${BASE}/${gameId}/autoplay?target=${target}`, { method: 'POST' });
  return handleResponse(res, 'autoplay');
}