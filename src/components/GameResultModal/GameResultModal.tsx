import "./GameResultModal.css";
import { useGameStore } from "../../store/gameStore";
import { formatCurrency, formatMultiplier } from "../../utils/currency";

export function GameResultModal() {
  const gameResultModal = useGameStore((state) => state.gameResultModal);
  const closeGameResultModal = useGameStore(
    (state) => state.closeGameResultModal,
  );

  if (!gameResultModal) {
    return null;
  }

  const isWin = gameResultModal.type === "win";
  const resultView = isWin
    ? {
        title: "Cashed Out!",
        emoji: "💎",
        profitClassName:
          "game-result-modal__profit game-result-modal__profit--win",
        profitLabel: `+${formatCurrency(gameResultModal.profit)} profit`,
        buttonText: "PLAY AGAIN",
      }
    : {
        title: "Busted!",
        emoji: "💣",
        profitClassName:
          "game-result-modal__profit game-result-modal__profit--loss",
        profitLabel: `${formatCurrency(Math.abs(gameResultModal.profit))} lost`,
        buttonText: "TRY AGAIN",
      };
  const modalClassName = `game-result-modal ${
    isWin ? "game-result-modal--win" : "game-result-modal--loss"
  }`;

  return (
    <div className="game-result-modal__overlay" role="presentation">
      <div
        className={modalClassName}
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-result-modal-title"
      >
        <div className="game-result-modal__emoji" aria-hidden="true">
          {resultView.emoji}
        </div>

        <h2 id="game-result-modal-title" className="game-result-modal__title">
          {resultView.title}
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

        <p className={resultView.profitClassName}>{resultView.profitLabel}</p>

        <button
          className="game-result-modal__button"
          onClick={closeGameResultModal}
          type="button"
        >
          {resultView.buttonText}
        </button>
      </div>
    </div>
  );
}
