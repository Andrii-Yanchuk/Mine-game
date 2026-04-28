import { create } from "zustand";
import type { GameStore } from "../types/store";

export const useGameStore = create<GameStore>((set) => ({
  betAmount: 100,
  minesCount: 3,
  setBetAmount: (betAmount) => set({ betAmount }),
  setMinesCount: (minesCount) => set({ minesCount }),
}));
