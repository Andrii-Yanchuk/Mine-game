import "./History.css";
import { Games } from "../../data/mockData";

export function History() {
  return (
    <div className="container">
      <h2 className="history-title">recent games</h2>

      <div className="history-list">
        {Games.map((game) => (
          <div
            key={game.id}
            className={`history-card ${
              game.result === "win" ? "history-card--win" : "history-card--lose"
            }`}
          >
            <div className="history-card_top">
              <p className="history_bet">${game.bet.toFixed(2)}</p>

              {game.multiplier ? (
                <p className="history_multiplier">{game.multiplier}x</p>
              ) : (
                <p className="history_icon">💣</p>
              )}
            </div>

            <div className="history-card_bottom">
              <p className="history_result">
                {game.result === "win" ? "WIN" : "BUST"}
              </p>

              <p className="history_profit">
                {game.profit > 0 ? "+" : ""}${game.profit.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
