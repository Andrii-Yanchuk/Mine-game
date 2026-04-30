import "./GameProgress.css";
import { useGameStore } from "../../store/gameStore";

const BOARD_CELLS_COUNT = 25;

export function GameProgress() {
  const minesCount = useGameStore((state) => state.minesCount);
  const gemsFound = useGameStore((state) => state.gemsFound);
  const isGameActive = useGameStore((state) => state.isGameActive);
  const remainingGems = BOARD_CELLS_COUNT - minesCount - gemsFound;

  if (!isGameActive) {
    return null;
  }

  return (
    <p className="game-progress">
      {minesCount} Mines - {gemsFound} gems found - {remainingGems} remaining
    </p>
  );
}
