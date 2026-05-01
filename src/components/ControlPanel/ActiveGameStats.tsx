import { formatMultiplier } from "../../utils/currency";

type ActiveGameStatsProps = {
  currentMultiplier: number;
  gemsFound: number;
  nextMultiplier: number;
  profit: number;
  totalGems: number;
};

export function ActiveGameStats({
  currentMultiplier,
  gemsFound,
  nextMultiplier,
  profit,
  totalGems,
}: ActiveGameStatsProps) {
  return (
    <div className="active-game">
      <div className="active-game__metric">
        <span className="active-game__label">Current Multiplier</span>
        <span className="active-game__value active-game__value--profit">
          {formatMultiplier(currentMultiplier)}
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
          {formatMultiplier(nextMultiplier)}
        </span>
      </div>
    </div>
  );
}
