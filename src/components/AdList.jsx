import React from 'react';
import AdCard from './AdCard';

const PROB_RANK = {
  'Piece of cake': 100, 'Sure thing': 90, 'Walk in the park': 80, 'Quite likely': 70,
  'Risky': 60, 'Gamble': 50, 'Rather detrimental': 40, 'Playing with fire': 30,
  'Suicide mission': 20, 'Impossible': 10,
};

export default function AdList({ ads, onSolve, disabled }) {
  if (!ads || ads.length === 0) {
    return <p className="ad-list__empty">No ads available right now.</p>;
  }

  const sorted = [...ads].sort(
      (a, b) => (PROB_RANK[b.probability] ?? 0) - (PROB_RANK[a.probability] ?? 0)
  );

  return (
      <ul className="ad-list">
        {sorted.map((ad) => (
            <AdCard key={ad.adId} ad={ad} onSolve={onSolve} disabled={disabled} />
        ))}
      </ul>
  );
}