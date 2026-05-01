export const BASE_URL = "https://mines-be.vercel.app";
export const PLAYER_ID = "admin";
export const PLAYER_ID_HEADER = "X-Player-Id";

export const API_ENDPOINTS = {
  balance: "/api/balance",
  history: "/api/history",
  activeGame: "/api/games/active",
  games: "/api/games",
  revealCell: (gameId: string) => `/api/games/${gameId}/reveal`,
  cashOut: (gameId: string) => `/api/games/${gameId}/cashout`,
};
