export type HistoryGame = {
  gameId: string;
  betAmount: number;
  minesCount: number;
  status: "active" | "won" | "lost" | "cashed_out";
  multiplier: number;
  profit: number | null;
  gemsFound: number;
  createdAt: string;
};

export type HistoryResponse = {
  games: HistoryGame[];
};
