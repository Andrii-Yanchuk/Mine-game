import type { CreateGameResponse, GameStatus } from "./api";

export type GameStore = {
  betAmount: number;
  minesCount: number;
  gameId: string | null;
  status: GameStatus;
  currentMultiplier: number;
  revealedCells: number[];
  isGameActive: boolean;
  setBetAmount: (betAmount: number) => void;
  setMinesCount: (minesCount: number) => void;
  setActiveGame: (game: CreateGameResponse) => void;
  clearGame: () => void;
};
