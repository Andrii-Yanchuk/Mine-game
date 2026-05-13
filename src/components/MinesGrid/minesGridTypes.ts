import type {
  FullBoard,
  RevealCellPayload,
  RevealCellResponse,
  RevealedCell,
} from "../../types/api";

export type GridCellPosition = {
  col: number;
  row: number;
};

export type GridCellContentType = "bomb" | "gem";

export type GridCellViewParams = {
  fullBoard: FullBoard | null;
  index: number;
  isGameActive: boolean;
  isRevealPending: boolean;
  pendingCell: GridCellPosition | null;
  revealedCells: RevealedCell[];
};

export type NextRevealedCellsParams = {
  result: RevealCellResponse;
  revealedCell: RevealCellPayload;
  revealedCells: RevealedCell[];
};
