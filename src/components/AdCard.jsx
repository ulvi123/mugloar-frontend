import React from 'react';

const PROB_RANK = {
    'Piece of cake': 100, 'Sure thing': 90, 'Walk in the park': 80, 'Quite likely': 70,
    'Risky': 60, 'Gamble': 50, 'Rather detrimental': 40, 'Playing with fire': 30,
    'Suicide mission': 20, 'Impossible': 10,
};

function tier(probability) {
    const score = PROB_RANK[probability] ?? 0;
    if (score >= 70) return 'good';
    if (score >= 40) return 'medium';
    return 'bad';
}

export default function AdCard({ ad, onSolve, disabled }) {
    return (
        <li className={`ad-card ad-card--${tier(ad.probability)}`}>
            <p className="ad-card__message">{ad.message}</p>
            <div className="ad-card__meta">
                <span className="ad-card__reward">💰 {ad.reward}</span>
                <span className="ad-card__probability">{ad.probability}</span>
            </div>
            <button onClick={() => onSolve(ad.adId)} disabled={disabled}>
                Solve
            </button>
        </li>
    );
}