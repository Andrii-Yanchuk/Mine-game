import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revealCell } from "../../api/client";
import { BOARD_CELLS_COUNT } from "../../constants/game";
import { useGameSounds } from "../../hooks/useGameSounds";
import { useGameStore } from "../../store/gameStore";
import {
  getGridCellPosition,
  getGridCellView,
  getNextRevealedCells,
  type GridCellPosition,
} from "./minesGridHelpers";

export function useMinesGrid() {
  const [pendingCell, setPendingCell] = useState<GridCellPosition | null>(null);
  const queryClient = useQueryClient();
  const { playCardFlipSound, playLoseSound } = useGameSounds();
  const {
    fullBoard,
    gameId,
    isGameActive,
    revealedCells,
    setRevealResult,
  } = useGameStore();

  const syncFinishedGameQueries = (balance?: number) => {
    if (typeof balance === "number") {
      queryClient.setQueryData(["balance"], {
        balance,
      });
    }

    queryClient.invalidateQueries({ queryKey: ["balance"] });
    queryClient.invalidateQueries({ queryKey: ["history"] });
  };

  const revealMutation = useMutation({
    mutationFn: revealCell,
    onMutate: ({ row, col }) => {
      setPendingCell({ row, col });
    },
    onSuccess: (result, revealedCell) => {
      playCardFlipSound();

      if (result.status === "lost") {
        playLoseSound();
      }

      setRevealResult({
        ...result,
        revealedCells: getNextRevealedCells({
          result,
          revealedCell,
          revealedCells,
        }),
      });

      if (result.status !== "active") {
        syncFinishedGameQueries(result.balance);
      }
    },
    onSettled: () => {
      setPendingCell(null);
    },
  });

  const revealGridCell = (index: number) => {
    const position = getGridCellPosition(index);
    const isRevealed = revealedCells.some(
      (cell) => cell.row === position.row && cell.col === position.col,
    );
    const canRevealCell =
      gameId && isGameActive && !revealMutation.isPending && !isRevealed;

    if (!canRevealCell) {
      return;
    }

    revealMutation.mutate({ gameId, ...position });
  };

  const cells = Array.from({ length: BOARD_CELLS_COUNT }, (_, index) => ({
    index,
    ...getGridCellView({
      fullBoard,
      index,
      isGameActive,
      isRevealPending: revealMutation.isPending,
      pendingCell,
      revealedCells,
    }),
  }));

  return {
    cells,
    errorMessage: revealMutation.error?.message ?? null,
    revealGridCell,
  };
}
