export const initialState = {
  gameId: null,
  score: 0,
  gold: 0,
  lives: 0,
  highScore: 0,
  turn: 0,
  ads: [],
  shop: [],
  loading: false,
  error: null,
  gameOver: false,
};

export function gameReducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: action.payload, error: null };

    case 'ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'GAME_STARTED':
      return {
        ...initialState,
        gameId: action.payload.gameId,
        score: action.payload.score,
        gold: action.payload.gold,
        lives: action.payload.lives,
        highScore: action.payload.highScore,
        turn: action.payload.turn,
      };

    case 'ADS_LOADED':
      return { ...state, ads: action.payload, loading: false };

    case 'SOLVE_RESULT': {
      const gameOver = action.payload.lives <= 0;
      return {
        ...state,
        score: action.payload.score,
        gold: action.payload.gold,
        lives: action.payload.lives,
        highScore: action.payload.highScore,
        turn: action.payload.turn,
        loading: false,
        gameOver,
      };
    }

    case 'SHOP_LOADED':
      return { ...state, shop: action.payload, loading: false };

    case 'PURCHASE_RESULT':
      return {
        ...state,
        gold: action.payload.gold,
        lives: action.payload.lives,
        turn: action.payload.turn,
        loading: false,
      };

    default:
      return state;
  }
}