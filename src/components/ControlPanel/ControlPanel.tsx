import "./ControlPanel.css";
import { useQuery } from "@tanstack/react-query";
import { getBalance } from "../../api/client";
import { VALID_MINES_COUNTS } from "../../constants/game";
import { useGameStore } from "../../store/gameStore";

export function ControlPanel() {
  const betAmount = useGameStore((state) => state.betAmount);
  const minesCount = useGameStore((state) => state.minesCount);
  const currentMultiplier = useGameStore((state) => state.currentMultiplier);
  const nextMultiplier = useGameStore((state) => state.nextMultiplier);
  const gemsFound = useGameStore((state) => state.gemsFound);
  const setBetAmount = useGameStore((state) => state.setBetAmount);
  const setMinesCount = useGameStore((state) => state.setMinesCount);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
  });
  const balance = data?.balance;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <aside className="container control-panel">
      <div className="balance">
        <p className="balance__title">Balance</p>
        <span className="balance__value">💰 ${balance}</span>
      </div>

      <div className="bet">
        <p className="bet__title">BET AMOUNT</p>

        <div className="bet__input">
          <span className="bet__currency">$</span>
          <input
            className="bet__field"
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value) || 0)}
          />
        </div>

        <div className="bet__buttons">
          {[10, 25, 50, 100, 250, 500, 1000, 2500].map((value) => (
            <button
              key={value}
              onClick={() => setBetAmount(value)}
              className={`bet__button ${value === betAmount ? "bet__button--active" : ""}`}
            >
              ${value}
            </button>
          ))}
        </div>

        <div className="bet__quick-actions">
          <button
            className="bet__button"
            onClick={() => setBetAmount(betAmount / 2)}
          >
            1/2
          </button>
          <button
            className="bet__button"
            onClick={() => setBetAmount(betAmount * 2)}
          >
            x2
          </button>
          <button
            className="bet__button"
            onClick={() => setBetAmount(balance ?? 0)}
          >
            Max
          </button>
        </div>
      </div>

      <div className="mines">
        <p className="mines__title">MINES</p>

        <div className="mines__buttons">
          {VALID_MINES_COUNTS.map((value) => (
            <button
              key={value}
              onClick={() => setMinesCount(value)}
              className={`mines__button ${value === minesCount ? "mines__button--active" : ""}`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="active-game">
        <div className="active-game__row">
          <span className="active-game__label">Current multiplier</span>
          <span className="active-game__value active-game__value--profit">
            {currentMultiplier}x
          </span>
        </div>

        <div className="active-game__row">
          <span className="active-game__label">Profit</span>
          <span
            className={`active-game__value ${
              betAmount * currentMultiplier - betAmount > 0
                ? "active-game__value--profit"
                : ""
            }`}
          >
            ${(betAmount * currentMultiplier - betAmount).toFixed(2)}
          </span>
        </div>

        <div className="active-game__row">
          <span className="active-game__label">Gems found</span>
          <span className="active-game__value">{gemsFound}</span>
        </div>

        <div className="active-game__row">
          <span className="active-game__label">Next multiplier</span>
          <span className="active-game__value active-game__value--next-multiplier">
            {nextMultiplier}x
          </span>
        </div>
      </div>
    </aside>
  );
}
