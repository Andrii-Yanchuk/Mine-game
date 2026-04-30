import type {
  ActiveGameResponse,
  CreateGameResponse,
  CashOutResponse,
  FullBoard,
  GameStatus,
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
  setActiveGame: (game: ActiveGameResponse | CreateGameResponse) => void;
  setRevealResult: (result: RevealCellResponse) => void;
  setCashOutResult: (result: CashOutResponse) => void;
  clearGame: () => void;
};
