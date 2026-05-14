import type { FullBoard } from "./common";

export type CashOutResponse = {
  status: "won";
  cashedOutMultiplier: number;
  winAmount: number;
  profit: number;
  fullBoard: FullBoard;
  balance: number;
};
