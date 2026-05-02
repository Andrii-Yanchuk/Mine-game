import { VALID_MINES_COUNTS } from "../../constants/game";
import { useGameSounds } from "../../hooks/useGameSounds";

type MinesControlProps = {
  minesCount: number;
  isGameActive: boolean;
  setMinesCount: (minesCount: number) => void;
};

export function MinesControl({
  minesCount,
  isGameActive,
  setMinesCount,
}: MinesControlProps) {
  const { playBetSound } = useGameSounds();

  const selectMinesCount = (value: number) => {
    playBetSound();
    setMinesCount(value);
  };

  return (
    <div className="mines">
      <p className="mines__title">MINES</p>

      <div className="mines__buttons">
        {VALID_MINES_COUNTS.map((value) => (
          <button
            key={value}
            onClick={() => selectMinesCount(value)}
            disabled={isGameActive}
            className={`mines__button ${
              value === minesCount ? "mines__button--active" : ""
            }`}
            type="button"
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
