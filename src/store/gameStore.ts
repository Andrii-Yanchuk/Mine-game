import { create } from "zustand";
import type { GameStore } from "../types/store";
import {
  getActiveGameState,
  getCashOutResultState,
  getRevealResultState,
  initialGameState,
} from "./gameStoreHelpers";

export const useGameStore = create<GameStore>((set) => ({
  ...initialGameState,
  setBetAmount: (betAmount) => set({ betAmount }),
  setMinesCount: (minesCount) => set({ minesCount }),
  setActiveGame: (game) => set(getActiveGameState(game)),
  setRevealResult: (result) =>
    set((state) => getRevealResultState(result, state)),
  setCashOutResult: (result) => set(getCashOutResultState(result)),
  closeGameResultModal: () => set({ gameResultModal: null }),
}));
