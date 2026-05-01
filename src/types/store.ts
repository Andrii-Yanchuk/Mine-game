import type {
  ActiveGameResponse,
  CashOutResponse,
  CreateGameResponse,
  FullBoard,
  GameStatus,
  RevealCellResponse,
  RevealedCell,
} from "./api";

export type GameResultModal =
  | {
      type: "win";
      multiplier: number;
      amount: number;
      profit: number;
    }
  | {
      type: "loss";
      multiplier: number;
      amount: number;
      profit: number;
    };

export type GameState = {
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
  gameResultModal: GameResultModal | null;
};

export type GameActions = {
  setBetAmount: (betAmount: number) => void;
  setMinesCount: (minesCount: number) => void;
  setActiveGame: (game: ActiveGameResponse | CreateGameResponse) => void;
  setRevealResult: (result: RevealCellResponse) => void;
  setCashOutResult: (result: CashOutResponse) => void;
  closeGameResultModal: () => void;
};

export type GameStore = GameState & GameActions;
