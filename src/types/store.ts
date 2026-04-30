import type {
  CreateGameResponse,
  CashOutResponse,
  FullBoard,
  GameStatus,
  HistoryGame,
  RevealCellResponse,
  RevealedCell,
} from "./api";

export type GameStore = {
  betAmount: number;
  minesCount: number;
  gameId: string | null;
  status: GameStatus;
  currentMultiplier: number;
  nextMultiplier: number;
  revealedCells: RevealedCell[];
  fullBoard: FullBoard | null;
  gemsFound: number;
  isGameActive: boolean;
  setBetAmount: (betAmount: number) => void;
  setMinesCount: (minesCount: number) => void;
  setActiveGame: (game: CreateGameResponse) => void;
  setActiveGameFromHistory: (game: HistoryGame) => void;
  setRevealResult: (result: RevealCellResponse) => void;
  setCashOutResult: (result: CashOutResponse) => void;
  clearGame: () => void;
};
