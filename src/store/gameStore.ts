import { create } from "zustand";
import type { GameStore } from "../types/store";

export const useGameStore = create<GameStore>((set) => ({
  betAmount: 100,
  minesCount: 3,
  gameId: null,
  status: "idle",
  currentMultiplier: 1,
  revealedCells: [],
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
      revealedCells: game.revealedCells,
      isGameActive: game.status === "active",
    }),
  clearGame: () =>
    set({
      gameId: null,
      status: "idle",
      currentMultiplier: 1,
      revealedCells: [],
      isGameActive: false,
    }),
}));
