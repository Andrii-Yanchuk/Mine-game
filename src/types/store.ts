export type GameStore = {
  betAmount: number;
  minesCount: number;
  setBetAmount: (betAmount: number) => void;
  setMinesCount: (minesCount: number) => void;
};
