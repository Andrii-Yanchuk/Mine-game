export type BalanceResponse = {
  balance: number;
};

export type CreateGamePayload = {
  betAmount: number;
  minesCount: number;
};

export type HistoryGame = {
  gameId: string;
  betAmount: number;
  minesCount: number;
  status: "active" | "won" | "lost" | "cashed_out";
  multiplier: number;
  profit: number;
  gemsFound: number;
  createdAt: string;
};

export type HistoryResponse = {
  games: HistoryGame[];
};
