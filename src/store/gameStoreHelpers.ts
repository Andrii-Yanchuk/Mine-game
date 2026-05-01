import type {
  ActiveGameResponse,
  CashOutResponse,
  CreateGameResponse,
  RevealCellResponse,
} from "../types/api";
import type { GameState } from "../types/store";

export const initialGameState: GameState = {
  betAmount: 100,
  minesCount: 3,
  gameId: null,
  status: "idle",
  currentMultiplier: 1,
  nextMultiplier: 1,
  revealedCells: [],
  fullBoard: null,
  gemsFound: 0,
  isGameActive: false,
  gameResultModal: null,
};

export function getActiveGameState(
  game: ActiveGameResponse | CreateGameResponse,
): GameState {
  return {
    ...initialGameState,
    gameId: game.gameId,
    betAmount: game.betAmount,
    minesCount: game.minesCount,
    status: game.status,
    currentMultiplier: game.currentMultiplier,
    nextMultiplier:
      "nextMultiplier" in game ? game.nextMultiplier : game.currentMultiplier,
    revealedCells: game.revealedCells,
    gemsFound: "gemsFound" in game ? game.gemsFound : 0,
    isGameActive: game.status === "active",
  };
}

export function getRevealResultState(
  result: RevealCellResponse,
  state: GameState,
): Partial<GameState> {
  const currentMultiplier = result.currentMultiplier ?? state.currentMultiplier;

  return {
    status: result.status,
    currentMultiplier,
    nextMultiplier: result.nextMultiplier ?? currentMultiplier,
    revealedCells: result.revealedCells ?? state.revealedCells,
    fullBoard:
      result.fullBoard ?? (result.status === "active" ? null : state.fullBoard),
    gemsFound: result.gemsFound ?? state.gemsFound,
    isGameActive: result.status === "active",
    gameResultModal:
      result.status === "lost"
        ? {
            type: "loss",
            multiplier: currentMultiplier,
            amount: 0,
            profit: -state.betAmount,
          }
        : state.gameResultModal,
  };
}

export function getCashOutResultState(result: CashOutResponse): Partial<GameState> {
  return {
    status: result.status,
    currentMultiplier: result.cashedOutMultiplier,
    nextMultiplier: result.cashedOutMultiplier,
    fullBoard: result.fullBoard,
    isGameActive: false,
    gameResultModal: {
      type: "win",
      multiplier: result.cashedOutMultiplier,
      amount: result.winAmount,
      profit: result.profit,
    },
  };
}
