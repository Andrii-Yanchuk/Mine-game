import { BET_AMOUNTS } from "../../constants/game";
import { formatCurrencyAmount } from "../../utils/currency";

type BetAmountControlProps = {
  betAmount: number;
  maxBetAmount: number;
  setBetAmount: (betAmount: number) => void;
};

export function BetAmountControl({
  betAmount,
  maxBetAmount,
  setBetAmount,
}: BetAmountControlProps) {
  return (
    <div className="bet">
      <p className="bet__title">BET AMOUNT</p>

      <div className="bet__input">
        <span className="bet__currency">$</span>
        <input
          className="bet__field"
          type="number"
          value={formatCurrencyAmount(betAmount, { trimInteger: true })}
          onChange={(e) => {
            const value = e.currentTarget.valueAsNumber;

            setBetAmount(Number.isNaN(value) ? 0 : value);
          }}
          min={0}
          step={0.01}
        />
      </div>

      <div className="bet__buttons">
        {BET_AMOUNTS.map((value) => (
          <button
            key={value}
            onClick={() => setBetAmount(value)}
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
          onClick={() => setBetAmount(betAmount / 2)}
          type="button"
        >
          1/2
        </button>
        <button
          className="bet__button"
          onClick={() => setBetAmount(betAmount * 2)}
          type="button"
        >
          x2
        </button>
        <button
          className="bet__button"
          onClick={() => setBetAmount(maxBetAmount)}
          type="button"
        >
          Max
        </button>
      </div>
    </div>
  );
}
