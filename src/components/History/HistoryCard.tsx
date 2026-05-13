import {
  HISTORY_STATUS_CLASS,
  HISTORY_STATUS_LABEL,
} from "../../constants/game";
import type { HistoryGame } from "../../types/api";
import { formatCurrency, formatMultiplier } from "../../utils/currency";

type HistoryCardProps = {
  game: HistoryGame;
};

function getHistoryGameProfit(game: HistoryGame) {
  if (game.status === "lost") {
    return -Math.abs(game.profit ?? game.betAmount);
  }

  return game.profit ?? 0;
}

function formatHistoryProfit(profit: number) {
  const prefix = profit > 0 ? "+" : "";

  return `${prefix}${formatCurrency(profit)}`;
}

export function HistoryCard({ game }: HistoryCardProps) {
  const isLoss = game.status === "lost";
  const profit = getHistoryGameProfit(game);
  const multiplierClassName = `history_multiplier ${
    isLoss ? "history_multiplier--bomb" : ""
  }`;
  const multiplierLabel = isLoss ? "💣" : formatMultiplier(game.multiplier);

  return (
    <div
      className={`history-card ${HISTORY_STATUS_CLASS[game.status]}`}
      title={`${game.minesCount} mines, ${game.gemsFound} gems found`}
    >
      <div className="history-card_top">
        <p className="history_bet">{formatCurrency(game.betAmount)}</p>

        <p className={multiplierClassName}>{multiplierLabel}</p>
      </div>

      <div className="history-card_bottom">
        <p className="history_result">{HISTORY_STATUS_LABEL[game.status]}</p>

        <p className="history_profit">{formatHistoryProfit(profit)}</p>
      </div>
    </div>
  );
}
