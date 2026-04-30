export type BalanceResponse = {
  balance: number;
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

export type GameStatus = "idle" | "active" | "won" | "lost";

export type RevealedCell = {
  row: number;
  col: number;
  type: "gem" | "bomb";
};

export type BoardCell = "gem" | "mine";

export type FullBoard = BoardCell[][];

export type CreateGamePayload = {
  betAmount: number;
  minesCount: number;
};

export type CreateGameResponse = {
  gameId: string;
  minesCount: number;
  betAmount: number;
  currentMultiplier: number;
  status: "active";
  revealedCells: RevealedCell[];
  balance: number;
};

export type ActiveGameResponse = {
  gameId: string;
  minesCount: number;
  betAmount: number;
  currentMultiplier: number;
  status: "active";
  revealedCells: RevealedCell[];
  gemsFound: number;
  nextMultiplier: number;
};

export type RevealCellPayload = {
  row: number;
  col: number;
};

export type RevealCellResponse = {
  result: "gem" | "bomb" | "mine";
  currentMultiplier?: number;
  revealedCells?: RevealedCell[];
  status: "active" | "won" | "lost";
  gemsFound?: number;
  nextMultiplier?: number;
  fullBoard?: FullBoard;
  balance?: number;
};

export type CashOutResponse = {
  status: "won";
  cashedOutMultiplier: number;
  winAmount: number;
  profit: number;
  fullBoard: FullBoard;
  balance: number;
};
