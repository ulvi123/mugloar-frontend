import React, { useState, useCallback } from 'react';
import { GameProvider, useGame } from './GameContext';
import StartScreen from './components/StartScreen';
import Dashboard from './components/Dashboard';
import AdList from './components/AdList';
import Shop from './components/Shop';
import AutoPlayButton from './components/AutoPlayButton';
import ErrorBanner from './components/ErrorBanner';
import * as api from './api';

function GameScreen() {
    const { state, startNewGame, solve, openShop, purchase, runAutoplay } = useGame();
    const [shopOpen, setShopOpen] = useState(false);

    const handleSolve = useCallback((adId) => solve(state.gameId, adId), [solve, state.gameId]);

    const handleOpenShop = useCallback(async () => {
        await openShop(state.gameId);
        setShopOpen(true);
    }, [openShop, state.gameId]);

    const handleBuy = useCallback(
        async (itemId) => {
            const result = await api.buyItem(state.gameId, itemId).catch(() => null);
            await purchase(state.gameId, itemId);
            return result;
        },
        [purchase, state.gameId]
    );

    const handleAutoplay = useCallback(() => runAutoplay(state.gameId), [runAutoplay, state.gameId]);

    if (!state.gameId) {
        return <StartScreen onStart={startNewGame} loading={state.loading} />;
    }

    return (
        <div className="game-screen">
            <Dashboard
                score={state.score}
                gold={state.gold}
                lives={state.lives}
                highScore={state.highScore}
                turn={state.turn}
            />

            {state.gameOver && (
                <div className="game-over-banner">
                    Game over — final score {state.score}.
                    <button onClick={startNewGame}>Play again</button>
                </div>
            )}

            {!state.gameOver && (
                <>
                    <div className="game-controls">
                        <button onClick={handleOpenShop} disabled={state.loading}>🛒 Shop</button>
                        <AutoPlayButton onAutoplay={handleAutoplay} loading={state.loading} disabled={state.gameOver} />
                    </div>
                    <AdList ads={state.ads} onSolve={handleSolve} disabled={state.loading} />
                </>
            )}

            {shopOpen && (
                <Shop
                    items={state.shop}
                    gold={state.gold}
                    onBuy={handleBuy}
                    onClose={() => setShopOpen(false)}
                    loading={state.loading}
                />
            )}
        </div>
    );
}

export default function App() {
    return (
        <GameProvider>
            <GameInner />
        </GameProvider>
    );
}

function GameInner() {
    const { state, clearError } = useGame();
    return (
        <div className="app">
            <ErrorBanner message={state.error} onDismiss={clearError} />
            <GameScreen />
        </div>
    );
}

function useGame_internal() {
    const { state } = useGame();
    return { state, dispatch: () => {} };
}