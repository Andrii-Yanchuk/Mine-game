import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cashOutGame, createGame, getBalance } from "../../api/client";
import { VALID_MINES_COUNTS } from "../../constants/game";
import { useGameStore } from "../../store/gameStore";
import type { BalanceResponse } from "../../types/api";
import "./MainButton.css";

const MAX_BET = 2500;

function getStartGameValidationError(
  betAmount: number,
  minesCount: number,
  balance?: number,
) {
  if (betAmount <= 0) {
    return "Bet amount must be greater than 0.";
  }

  if (betAmount > MAX_BET) {
    return `Max bet is $${MAX_BET}.`;
  }

  if (balance !== undefined && betAmount > balance) {
    return "Bet amount cannot be greater than your balance.";
  }

  if (!VALID_MINES_COUNTS.includes(minesCount)) {
    return "Invalid mines count.";
  }

  return null;
}

export function MainButton() {
  const queryClient = useQueryClient();
  const betAmount = useGameStore((state) => state.betAmount);
  const gameId = useGameStore((state) => state.gameId);
  const revealedCells = useGameStore((state) => state.revealedCells);
  const minesCount = useGameStore((state) => state.minesCount);
  const currentMultiplier = useGameStore((state) => state.currentMultiplier);
  const isGameActive = useGameStore((state) => state.isGameActive);
  const setActiveGame = useGameStore((state) => state.setActiveGame);
  const setCashOutResult = useGameStore((state) => state.setCashOutResult);

  const { data: balanceData } = useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
  });

  const createGameMutation = useMutation({
    mutationFn: createGame,
    onSuccess: (game) => {
      setActiveGame(game);
      queryClient.setQueryData<BalanceResponse>(["balance"], {
        balance: game.balance,
      });
    },
  });

  const cashOutMutation = useMutation({
    mutationFn: cashOutGame,
    onSuccess: (result) => {
      setCashOutResult(result);
      queryClient.setQueryData<BalanceResponse>(["balance"], {
        balance: result.balance,
      });
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });

  const validationError = getStartGameValidationError(
    betAmount,
    minesCount,
    balanceData?.balance,
  );

  const handleStartGame = () => {
    if (isGameActive) {
      if (gameId) {
        cashOutMutation.mutate(gameId);
      }

      return;
    }

    if (validationError) {
      return;
    }

    createGameMutation.mutate({
      betAmount,
      minesCount,
    });
  };

  const cashOutAmount = betAmount * currentMultiplier;
  const canCashOut = revealedCells.length > 0;
  const isDisabled =
    createGameMutation.isPending ||
    cashOutMutation.isPending ||
    (isGameActive && !gameId) ||
    (isGameActive && !canCashOut) ||
    (!isGameActive && validationError !== null);
  const className = `main-button ${isGameActive ? "main-button--cash-out" : ""}`;
  const title = createGameMutation.isPending
    ? "starting..."
    : cashOutMutation.isPending
      ? "cashing out..."
    : isGameActive
      ? `cash out - $${cashOutAmount.toFixed(2)}`
      : "start game";

  return (
    <div className="main-button-wrapper">
      <button
        className={className}
        disabled={isDisabled}
        onClick={handleStartGame}
        type="button"
      >
        <p className="main-button__title">{title}</p>
      </button>

      {!isGameActive && validationError && (
        <p className="main-button__error">{validationError}</p>
      )}

      {!validationError && createGameMutation.isError && (
        <p className="main-button__error">
          {createGameMutation.error.message}
        </p>
      )}

      {cashOutMutation.isError && (
        <p className="main-button__error">{cashOutMutation.error.message}</p>
      )}
    </div>
  );
}
