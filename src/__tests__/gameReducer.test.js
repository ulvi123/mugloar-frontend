import { gameReducer, initialState } from '../gameReducer';

test('GAME_STARTED resets state and sets gameId', () => {
  const state = gameReducer(initialState, {
    type: 'GAME_STARTED',
    payload: { gameId: 'g1', score: 0, gold: 0, lives: 3, highScore: 0, turn: 0 },
  });
  expect(state.gameId).toBe('g1');
  expect(state.lives).toBe(3);
  expect(state.gameOver).toBe(false);
});

test('SOLVE_RESULT sets gameOver when lives reach zero', () => {
  const state = gameReducer(initialState, {
    type: 'SOLVE_RESULT',
    payload: { score: 500, gold: 100, lives: 0, highScore: 500, turn: 10 },
  });
  expect(state.gameOver).toBe(true);
});

test('SOLVE_RESULT does not set gameOver while lives remain', () => {
  const state = gameReducer(initialState, {
    type: 'SOLVE_RESULT',
    payload: { score: 100, gold: 50, lives: 2, highScore: 100, turn: 3 },
  });
  expect(state.gameOver).toBe(false);
});

test('ERROR sets error message and clears loading', () => {
  const state = gameReducer({ ...initialState, loading: true }, {
    type: 'ERROR',
    payload: 'Something failed',
  });
  expect(state.error).toBe('Something failed');
  expect(state.loading).toBe(false);
});