import "./ControlPanel.css";
import { useQuery } from "@tanstack/react-query";
import { getBalance } from "../../api/client";
import { VALID_MINES_COUNTS } from "../../constants/game";
import { useGameStore } from "../../store/gameStore";
import { MainButton } from "../MainButton/MainButton";

export function ControlPanel() {
  const betAmount = useGameStore((state) => state.betAmount);
  const minesCount = useGameStore((state) => state.minesCount);
  const currentMultiplier = useGameStore((state) => state.currentMultiplier);
  const nextMultiplier = useGameStore((state) => state.nextMultiplier);
  const gemsFound = useGameStore((state) => state.gemsFound);
  const isGameActive = useGameStore((state) => state.isGameActive);
  const setBetAmount = useGameStore((state) => state.setBetAmount);
  const setMinesCount = useGameStore((state) => state.setMinesCount);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
  });
  const balance = data?.balance;
  const profit = betAmount * currentMultiplier - betAmount;
  const balanceLabel = isLoading
    ? "Loading..."
    : isError
      ? "Error"
      : `💰 $${balance}`;
  const totalGems = 25 - minesCount;

  return (
    <aside
      className={`container control-panel ${
        isGameActive ? "control-panel--active-game" : ""
      }`}
    >
      <div className="balance">
        <p className="balance__title">Balance</p>
        <span className="balance__value">{balanceLabel}</span>
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
            inputMode="none"
          />
        </div>

        <div className="bet__buttons">
          {[10, 25, 50, 100, 250, 500, 1000, 2500].map((value) => (
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
            onClick={() => setBetAmount(balance ?? 0)}
            type="button"
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

      <MainButton />

      {isGameActive && (
        <div className="active-game">
          <div className="active-game__metric">
            <span className="active-game__label">Current Multiplier</span>
            <span className="active-game__value active-game__value--profit">
              {currentMultiplier.toFixed(2)}x
            </span>
          </div>

          <div className="active-game__metric">
            <span className="active-game__label">Profit</span>
            <span className="active-game__value active-game__value--profit">
              +${profit.toFixed(2)}
            </span>
          </div>

          <div className="active-game__metric active-game__metric--desktop-only">
            <span className="active-game__label">Gems Found</span>
            <span className="active-game__value">
              {gemsFound} / {totalGems}
            </span>
          </div>

          <div className="active-game__metric active-game__metric--desktop-only">
            <span className="active-game__label">Next Multiplier</span>
            <span className="active-game__value active-game__value--muted">
              {nextMultiplier.toFixed(2)}x
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
