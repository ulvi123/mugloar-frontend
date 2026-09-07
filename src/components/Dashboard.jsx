import React from 'react';

export default function Dashboard({ score, gold, lives, highScore, turn }) {
  return (
      <div className="dashboard">
        <div className="dashboard__stat">
          <span className="dashboard__label">Score</span>
          <span className="dashboard__value">{score}</span>
        </div>
        <div className="dashboard__stat">
          <span className="dashboard__label">Gold</span>
          <span className="dashboard__value">💰 {gold}</span>
        </div>
        <div className="dashboard__stat">
          <span className="dashboard__label">Lives</span>
          <span className="dashboard__value">{'❤️'.repeat(Math.min(lives, 10))}{lives > 10 ? ` +${lives - 10}` : ''}</span>
        </div>
        <div className="dashboard__stat">
          <span className="dashboard__label">Turn</span>
          <span className="dashboard__value">{turn}</span>
        </div>
        <div className="dashboard__stat">
          <span className="dashboard__label">High score</span>
          <span className="dashboard__value">{highScore}</span>
        </div>
      </div>
  );
}