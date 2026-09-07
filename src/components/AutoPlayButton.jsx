import React from 'react';

export default function AutoPlayButton({ onAutoplay, loading, disabled }) {
  return (
      <button
          className="autoplay-button"
          onClick={onAutoplay}
          disabled={disabled || loading}
      >
        {loading ? 'Playing...' : '⚡ Auto-play to 1000'}
      </button>
  );
}