import { create } from "zustand";
import type { GameStore } from "../types/store";

export const useGameStore = create<GameStore>((set) => ({
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
  setBetAmount: (betAmount) => set({ betAmount }),
  setMinesCount: (minesCount) => set({ minesCount }),
  setActiveGame: (game) =>
    set({
      gameId: game.gameId,
      betAmount: game.betAmount,
      minesCount: game.minesCount,
      status: game.status,
      currentMultiplier: game.currentMultiplier,
      nextMultiplier:
        "nextMultiplier" in game ? game.nextMultiplier : game.currentMultiplier,
      revealedCells: game.revealedCells,
      fullBoard: null,
      gemsFound: "gemsFound" in game ? game.gemsFound : 0,
      isGameActive: game.status === "active",
    }),
  setRevealResult: (result) =>
    set((state) => ({
      status: result.status,
      currentMultiplier: result.currentMultiplier ?? state.currentMultiplier,
      nextMultiplier:
        result.nextMultiplier ??
        result.currentMultiplier ??
        state.nextMultiplier,
      revealedCells: result.revealedCells ?? state.revealedCells,
      fullBoard:
        result.fullBoard ?? (result.status === "active" ? null : state.fullBoard),
      gemsFound: result.gemsFound ?? state.gemsFound,
      isGameActive: result.status === "active",
    })),
  setCashOutResult: (result) =>
    set({
      status: result.status,
      currentMultiplier: result.cashedOutMultiplier,
      nextMultiplier: result.cashedOutMultiplier,
      fullBoard: result.fullBoard,
      isGameActive: false,
    }),
  clearGame: () =>
    set({
      gameId: null,
      status: "idle",
      currentMultiplier: 1,
      nextMultiplier: 1,
      revealedCells: [],
      fullBoard: null,
      gemsFound: 0,
      isGameActive: false,
    }),
}));
