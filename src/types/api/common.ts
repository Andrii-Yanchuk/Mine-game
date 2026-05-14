export type GameStatus = "idle" | "active" | "won" | "lost";

export type RevealedCell = {
  row: number;
  col: number;
  type: "gem" | "bomb";
};

export type BoardCell = "gem" | "mine";

export type FullBoard = BoardCell[][];
