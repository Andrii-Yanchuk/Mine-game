import { memo, type ChangeEvent } from "react";
import { BET_AMOUNTS } from "../../constants/game";
import { useGameSounds } from "../../hooks/useGameSounds";
import { formatCurrencyAmount } from "../../utils/currency";

type BetAmountControlProps = {
  betAmount: number;
  isGameActive: boolean;
  maxBetAmount: number;
  setBetAmount: (betAmount: number) => void;
};

function BetAmountControlComponent({
  betAmount,
  isGameActive,
  maxBetAmount,
  setBetAmount,
}: BetAmountControlProps) {
  const { playBetSound } = useGameSounds();

  const selectBetAmount = (value: number) => {
    if (isGameActive) {
      return;
    }

    playBetSound();
    setBetAmount(value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.valueAsNumber;

    setBetAmount(Number.isNaN(value) ? 0 : value);
  };

  return (
    <div className="bet">
      <p className="bet__title">BET AMOUNT</p>

      <div className="bet__input">
        <span className="bet__currency">$</span>
        <input
          className="bet__field"
          type="number"
          value={formatCurrencyAmount(betAmount, { trimInteger: true })}
          onChange={handleInputChange}
          min={0}
          step={0.01}
          disabled={isGameActive}
        />
      </div>

      <div className="bet__buttons">
        {BET_AMOUNTS.map((value) => (
          <button
            key={value}
            onClick={() => selectBetAmount(value)}
            disabled={isGameActive}
            className={`bet__button ${
              value === betAmount ? "bet__button--active" : ""
            }`}
            type="button"
          >
            ${value}
          </button>
        ))}
      </div>

      <div className="bet__quick-actions">
        <button
          className="bet__button"
          onClick={() => selectBetAmount(betAmount / 2)}
          disabled={isGameActive}
          type="button"
        >
          1/2
        </button>
        <button
          className="bet__button"
          onClick={() => selectBetAmount(betAmount * 2)}
          disabled={isGameActive}
          type="button"
        >
          x2
        </button>
        <button
          className="bet__button"
          onClick={() => selectBetAmount(maxBetAmount)}
          disabled={isGameActive}
          type="button"
        >
          Max
        </button>
      </div>
    </div>
  );
}

export const BetAmountControl = memo(BetAmountControlComponent);
