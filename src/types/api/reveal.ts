import type { FullBoard, RevealedCell } from "./common";

export type RevealCellPayload = {
  row: number;
  col: number;
};

export type RevealCellResponse = {
  result: "gem" | "bomb" | "mine";
  currentMultiplier?: number;
  revealedCells?: RevealedCell[];
  status: "active" | "won" | "lost";
  gemsFound?: number;
  nextMultiplier?: number;
  fullBoard?: FullBoard;
  balance?: number;
};
