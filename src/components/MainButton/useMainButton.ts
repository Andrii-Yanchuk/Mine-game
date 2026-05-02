import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cashOutGame,
  createGame,
  getActiveGame,
  getBalance,
} from "../../api/client";
import { useGameSounds } from "../../hooks/useGameSounds";
import { useGameStore } from "../../store/gameStore";
import type { BalanceResponse } from "../../types/api";
import { getStartGameValidationError } from "../../utils/gameValidation";
import {
  getIsMainButtonDisabled,
  getMainButtonError,
  getMainButtonTitle,
} from "./mainButtonState";

export function useMainButton() {
  const queryClient = useQueryClient();
  const { playStartGameSound, playWinSound } = useGameSounds();
  const {
    betAmount,
    currentMultiplier,
    gameId,
    isGameActive,
    minesCount,
    revealedCells,
    setActiveGame,
    setCashOutResult,
  } = useGameStore();

  const { data: balanceData } = useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
  });

  const createGameMutation = useMutation({
    mutationFn: createGame,
    onSuccess: async (game) => {
      setActiveGame(game);

      queryClient.setQueryData<BalanceResponse>(["balance"], {
        balance: game.balance,
      });

      try {
        const activeGame = await queryClient.fetchQuery({
          queryKey: ["activeGame"],
          queryFn: getActiveGame,
        });

        if (activeGame) {
          setActiveGame(activeGame);
        }
      } catch {
        setActiveGame(game);
      }
    },
  });

  const cashOutMutation = useMutation({
    mutationFn: cashOutGame,
    onSuccess: (result) => {
      playWinSound();
      setCashOutResult(result);
      queryClient.setQueryData<BalanceResponse>(["balance"], {
        balance: result.balance,
      });
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });

  const validationError = getStartGameValidationError({
    betAmount,
    balance: balanceData?.balance,
  });

  const mainButtonState = {
    canCashOut: revealedCells.length > 0,
    cashOutAmount: betAmount * currentMultiplier,
    cashOutError: cashOutMutation.error?.message,
    createGameError: createGameMutation.error?.message,
    gameId,
    isCashOutPending: cashOutMutation.isPending,
    isCreateGamePending: createGameMutation.isPending,
    isGameActive,
    validationError,
  };

  const handleClick = () => {
    if (isGameActive) {
      if (gameId) {
        cashOutMutation.mutate(gameId);
      }

      return;
    }

    if (validationError) {
      return;
    }

    playStartGameSound();
    createGameMutation.mutate({
      betAmount,
      minesCount,
    });
  };

  return {
    errorMessage: getMainButtonError(mainButtonState),
    isDisabled: getIsMainButtonDisabled(mainButtonState),
    isCashOutMode: isGameActive,
    isStartingGame: createGameMutation.isPending,
    onClick: handleClick,
    title: getMainButtonTitle(mainButtonState),
  };
}
