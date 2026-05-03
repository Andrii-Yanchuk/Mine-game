import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import {
  cashOutGame,
  createGame,
  getActiveGame,
} from "../../api/client";
import { useGameSounds } from "../../hooks/useGameSounds";
import { useGameStore } from "../../store/gameStore";
import type { BalanceResponse } from "../../types/api";
import { getStartGameValidationError } from "../../utils/gameValidation";
import {
  getIsMainButtonDisabled,
  getMainButtonError,
  getMainButtonTitle,
  type MainButtonState,
} from "./mainButtonState";

export function useMainButton() {
  const queryClient = useQueryClient();
  const { playStartGameSound, playWinSound } = useGameSounds();
  const [validationError, setValidationError] = useState<string | null>(null);
  const {
    currentMultiplier,
    gameId,
    isGameActive,
    revealedCells,
    setActiveGame,
    setCashOutResult,
  } = useGameStore(
    useShallow((state) => ({
      currentMultiplier: state.currentMultiplier,
      gameId: state.gameId,
      isGameActive: state.isGameActive,
      revealedCells: state.revealedCells,
      setActiveGame: state.setActiveGame,
      setCashOutResult: state.setCashOutResult,
    })),
  );

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

  const mainButtonState: MainButtonState = {
    canCashOut: revealedCells.length > 0,
    cashOutAmount: useGameStore.getState().betAmount * currentMultiplier,
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

    const { betAmount, minesCount } = useGameStore.getState();
    const balance = queryClient.getQueryData<BalanceResponse>(["balance"])
      ?.balance;
    const nextValidationError = getStartGameValidationError({
      betAmount,
      balance,
    });

    if (nextValidationError) {
      setValidationError(nextValidationError);

      return;
    }

    setValidationError(null);
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
