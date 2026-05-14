import "./GameProgress.css";
import { BOARD_CELLS_COUNT } from "../../constants/game";
import { useGameStore } from "../../store/gameStore";

export function GameProgress() {
  const { minesCount, gemsFound, isGameActive } = useGameStore();
  const remainingGems = BOARD_CELLS_COUNT - minesCount - gemsFound;

  if (!isGameActive) {
    return null;
  }

  return (
    <div className="game-progress">
      <span>{minesCount} mines</span>
      <span>{gemsFound} gems found</span>
      <span>{remainingGems} remaining</span>
    </div>
  );
}
