import React from 'react';

export default function StartScreen({ onStart, loading }) {
    return (
        <div className="start-screen">
            <h1>🐉 Dragons of Mugloar</h1>
            <p>Take on jobs, manage your risk, and reach 1000 points before you run out of lives.</p>
            <button onClick={onStart} disabled={loading}>
                {loading ? 'Starting...' : 'Start Game'}
            </button>
        </div>
    );
}