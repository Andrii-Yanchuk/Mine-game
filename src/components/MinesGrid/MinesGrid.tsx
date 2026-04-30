import "./MinesGrid.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revealCell } from "../../api/client";
import { useGameStore } from "../../store/gameStore";

export function MinesGrid() {
  const queryClient = useQueryClient();
  const gameId = useGameStore((state) => state.gameId);
  const revealedCells = useGameStore((state) => state.revealedCells);
  const fullBoard = useGameStore((state) => state.fullBoard);
  const isGameActive = useGameStore((state) => state.isGameActive);
  const setRevealResult = useGameStore((state) => state.setRevealResult);
  const cells = Array.from({ length: 25 });

  const revealMutation = useMutation({
    mutationFn: revealCell,
    onSuccess: (result, revealedCell) => {
      const revealedType = result.result === "mine" ? "bomb" : result.result;
      const nextRevealedCells = result.revealedCells ?? [
        ...revealedCells,
        {
          row: revealedCell.row,
          col: revealedCell.col,
          type: revealedType,
        },
      ];

      setRevealResult({
        ...result,
        revealedCells: nextRevealedCells,
      });

      if (result.status !== "active") {
        if (typeof result.balance === "number") {
          queryClient.setQueryData(["balance"], {
            balance: result.balance,
          });
        }

        queryClient.invalidateQueries({ queryKey: ["balance"] });
        queryClient.invalidateQueries({ queryKey: ["history"] });
      }
    },
  });

  const handleCellClick = (index: number) => {
    if (!gameId || !isGameActive || revealMutation.isPending) {
      return;
    }

    const row = Math.floor(index / 5);
    const col = index % 5;
    const isRevealed = revealedCells.some(
      (cell) => cell.row === row && cell.col === col,
    );

    if (isRevealed) {
      return;
    }

    revealMutation.mutate({ gameId, row, col });
  };

  return (
    <>
      <div className="grid">
        {cells.map((_, index) => {
          const row = Math.floor(index / 5);
          const col = index % 5;
          const revealedCell = revealedCells.find(
            (cell) => cell.row === row && cell.col === col,
          );
          const boardCell = fullBoard?.[row]?.[col];
          const cellType = boardCell === "mine" ? "bomb" : boardCell;
          const isDisabled =
            !isGameActive ||
            revealMutation.isPending ||
            Boolean(revealedCell) ||
            Boolean(fullBoard);
          const className = [
            "grid__cell",
            revealedCell ? `grid__cell--${revealedCell.type}` : "",
            cellType ? `grid__cell--${cellType}` : "",
            isDisabled ? "grid__cell--disabled" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={index}
              className={className}
              disabled={isDisabled}
              onClick={() => handleCellClick(index)}
              type="button"
            >
              {(revealedCell?.type === "gem" || cellType === "gem") && "G"}
              {(revealedCell?.type === "bomb" || cellType === "bomb") && "!"}
            </button>
          );
        })}
      </div>

      {revealMutation.isError && (
        <p className="grid__error">{revealMutation.error.message}</p>
      )}
    </>
  );
}
