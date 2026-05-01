import { formatCurrency } from "../../utils/currency";

export type MainButtonState = {
  canCashOut: boolean;
  cashOutAmount: number;
  cashOutError?: string;
  createGameError?: string;
  gameId: string | null;
  isCashOutPending: boolean;
  isCreateGamePending: boolean;
  isGameActive: boolean;
  validationError: string | null;
};

export function getMainButtonTitle({
  cashOutAmount,
  isCashOutPending,
  isCreateGamePending,
  isGameActive,
}: MainButtonState) {
  if (isCreateGamePending) {
    return "starting...";
  }

  if (isCashOutPending) {
    return "cashing out...";
  }

  if (isGameActive) {
    return `cash out - ${formatCurrency(cashOutAmount)}`;
  }

  return "start game";
}

export function getMainButtonError({
  cashOutError,
  createGameError,
  isGameActive,
  validationError,
}: MainButtonState) {
  if (!isGameActive && validationError) {
    return validationError;
  }

  if (!validationError && createGameError) {
    return createGameError;
  }

  return cashOutError ?? null;
}

export function getIsMainButtonDisabled({
  canCashOut,
  gameId,
  isCashOutPending,
  isCreateGamePending,
  isGameActive,
  validationError,
}: MainButtonState) {
  return (
    isCreateGamePending ||
    isCashOutPending ||
    (isGameActive && !gameId) ||
    (isGameActive && !canCashOut) ||
    (!isGameActive && validationError !== null)
  );
}
