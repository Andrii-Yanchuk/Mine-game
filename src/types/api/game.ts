import type { RevealedCell } from "./common";

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
