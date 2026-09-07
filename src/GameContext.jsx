import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { gameReducer, initialState } from './gameReducer';
import * as api from './api';

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const startNewGame = useCallback(async () => {
    dispatch({ type: 'LOADING', payload: true });
    try {
      const data = await api.startGame();
      dispatch({ type: 'GAME_STARTED', payload: data });
      const ads = await api.fetchAds(data.gameId);
      dispatch({ type: 'ADS_LOADED', payload: ads });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
    }
  }, []);

  const refreshAds = useCallback(async (gameId) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
      const ads = await api.fetchAds(gameId);
      dispatch({ type: 'ADS_LOADED', payload: ads });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
    }
  }, []);

  const solve = useCallback(async (gameId, adId) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
      const result = await api.solveAd(gameId, adId);
      dispatch({ type: 'SOLVE_RESULT', payload: result });
      if (result.lives > 0) {
        const ads = await api.fetchAds(gameId);
        dispatch({ type: 'ADS_LOADED', payload: ads });
      }
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
    }
  }, []);

  const openShop = useCallback(async (gameId) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
      const shop = await api.fetchShop(gameId);
      dispatch({ type: 'SHOP_LOADED', payload: shop });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
    }
  }, []);

  const purchase = useCallback(async (gameId, itemId) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
      const result = await api.buyItem(gameId, itemId);
      dispatch({ type: 'PURCHASE_RESULT', payload: result });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
    }
  }, []);

  const runAutoplay = useCallback(async (gameId) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
      const result = await api.autoplay(gameId);
      dispatch({ type: 'SOLVE_RESULT', payload: result });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
    }
  }, []);

  const value = { state, startNewGame, refreshAds, solve, openShop, purchase, runAutoplay };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within a GameProvider');
  return ctx;
}