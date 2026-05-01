import { MAX_BET_AMOUNT } from "../constants/game";

type StartGameValidationParams = {
  balance?: number;
  betAmount: number;
};

export function getStartGameValidationError({
  balance,
  betAmount,
}: StartGameValidationParams) {
  if (betAmount <= 0) {
    return "Bet amount must be greater than 0.";
  }

  if (betAmount > MAX_BET_AMOUNT) {
    return `Max bet is $${MAX_BET_AMOUNT}.`;
  }

  if (balance !== undefined && betAmount > balance) {
    return "Bet amount cannot be greater than your balance.";
  }

  return null;
}
