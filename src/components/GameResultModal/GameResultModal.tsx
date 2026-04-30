import "./GameResultModal.css";
import { useGameStore } from "../../store/gameStore";

function formatCurrency(value: number) {
  return `$${value.toFixed(2)}`;
}

function formatMultiplier(value: number) {
  return `${value.toFixed(2)}x`;
}

export function GameResultModal() {
  const gameResultModal = useGameStore((state) => state.gameResultModal);
  const closeGameResultModal = useGameStore(
    (state) => state.closeGameResultModal,
  );

  if (!gameResultModal) {
    return null;
  }

  const isWin = gameResultModal.type === "win";
  const title = isWin ? "Cashed Out!" : "Game Over";
  const emoji = isWin ? "💎" : "💣";
  const modalClassName = `game-result-modal ${
    isWin ? "game-result-modal--win" : "game-result-modal--loss"
  }`;
  const profitClassName =
    gameResultModal.profit >= 0
      ? "game-result-modal__profit game-result-modal__profit--win"
      : "game-result-modal__profit game-result-modal__profit--loss";
  const profitPrefix = gameResultModal.profit > 0 ? "+" : "";
  const displayedProfit = isWin
    ? gameResultModal.profit
    : Math.abs(gameResultModal.profit);
  const buttonText = isWin ? "PLAY AGAIN" : "TRY AGAIN";

  return (
    <div className="game-result-modal__overlay" role="presentation">
      <div
        className={modalClassName}
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-result-modal-title"
      >
        <div className="game-result-modal__emoji" aria-hidden="true">
          {emoji}
        </div>

        <h2 id="game-result-modal-title" className="game-result-modal__title">
          {isWin ? title : "Busted!"}
        </h2>

        {isWin && (
          <>
            <p className="game-result-modal__multiplier">
              {formatMultiplier(gameResultModal.multiplier)}
            </p>

            <p className="game-result-modal__amount">
              {formatCurrency(gameResultModal.amount)}
            </p>
          </>
        )}

        <p className={profitClassName}>
          {profitPrefix}
          {formatCurrency(displayedProfit)} {isWin ? "profit" : "lost"}
        </p>

        <button
          className="game-result-modal__button"
          onClick={closeGameResultModal}
          type="button"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
