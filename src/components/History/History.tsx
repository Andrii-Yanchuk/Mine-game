import "./History.css";
import { useQuery } from "@tanstack/react-query";
import { getHistory } from "../../api/client";
import type { HistoryGame, HistoryResponse } from "../../types/api";

const historyQuery = {
  queryKey: ["history"],
  queryFn: getHistory,
  select: (data: HistoryResponse) => data.games,
};

function getGameResult(game: HistoryGame) {
  if (game.status === "lost") return "BUST";
  if (game.status === "active") return "ACTIVE";

  return "WIN";
}

function getCardClass(game: HistoryGame) {
  if (game.status === "lost") return "history-card--lose";
  if (game.status === "active") return "history-card--active";

  return "history-card--win";
}

function formatCurrency(value: number) {
  return `$${value.toFixed(2)}`;
}

export function History() {
  const { data: games = [], isLoading, isError } = useQuery(historyQuery);

  const content = (() => {
    if (isLoading) {
      return <p className="history-message">Loading...</p>;
    }

    if (isError) {
      return <p className="history-message">Failed to load history.</p>;
    }

    if (games.length === 0) {
      return <p className="history-message">No games yet.</p>;
    }

    return games.map((game) => {
      const isLoss = game.status === "lost";
      const profitPrefix = game.profit > 0 ? "+" : "";

      return (
        <div
          key={game.gameId}
          className={`history-card ${getCardClass(game)}`}
          title={`${game.minesCount} mines, ${game.gemsFound} gems found`}
        >
          <div className="history-card_top">
            <p className="history_bet">{formatCurrency(game.betAmount)}</p>

            {isLoss ? (
              <p className="history_multiplier">BUST</p>
            ) : (
              <p className="history_multiplier">{game.multiplier}x</p>
            )}
          </div>

          <div className="history-card_bottom">
            <p className="history_result">{getGameResult(game)}</p>

            <p className="history_profit">
              {profitPrefix}
              {formatCurrency(game.profit)}
            </p>
          </div>
        </div>
      );
    });
  })();

  return (
    <div className="container">
      <h2 className="history-title">recent games</h2>

      <div className="history-list">{content}</div>
    </div>
  );
}
