import { BOARD_SIZE } from "../../constants/game";
import type { RevealCellResponse } from "../../types/api";
import type {
  GridCellPosition,
  GridCellViewParams,
  NextRevealedCellsParams,
} from "./minesGridTypes";

export function getGridCellPosition(index: number): GridCellPosition {
  return {
    row: Math.floor(index / BOARD_SIZE),
    col: index % BOARD_SIZE,
  };
}

export function getGridCellView({
  fullBoard,
  index,
  isGameActive,
  isRevealPending,
  pendingCell,
  revealedCells,
}: GridCellViewParams) {
  const position = getGridCellPosition(index);
  const revealedCell = revealedCells.find(
    (cell) => cell.row === position.row && cell.col === position.col,
  );
  const boardCell = fullBoard?.[position.row]?.[position.col];
  const cellType = boardCell === "mine" ? "bomb" : boardCell;
  const isLoading =
    pendingCell?.row === position.row && pendingCell?.col === position.col;
  const isDisabled =
    !isGameActive ||
    isRevealPending ||
    Boolean(revealedCell) ||
    Boolean(fullBoard);
  const className = [
    "grid__cell",
    revealedCell ? `grid__cell--${revealedCell.type}` : "",
    cellType ? `grid__cell--${cellType}` : "",
    isDisabled ? "grid__cell--disabled" : "",
    isLoading ? "grid__cell--loading" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    className,
    contentType: revealedCell?.type ?? cellType,
    isDisabled,
    isLoading,
    position,
  };
}

export function getRevealedType(result: RevealCellResponse["result"]) {
  return result === "mine" ? "bomb" : result;
}

export function getNextRevealedCells({
  result,
  revealedCell,
  revealedCells,
}: NextRevealedCellsParams) {
  return (
    result.revealedCells ?? [
      ...revealedCells,
      {
        row: revealedCell.row,
        col: revealedCell.col,
        type: getRevealedType(result.result),
      },
    ]
  );
}
