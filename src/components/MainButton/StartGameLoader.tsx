export function StartGameLoader() {
  return (
    <div className="start-game-loader" role="status" aria-live="polite">
      <div className="start-game-loader__modal">
        <div className="start-game-loader__dots" aria-hidden="true">
          <span className="start-game-loader__dot start-game-loader__dot--blue" />
          <span className="start-game-loader__dot start-game-loader__dot--green" />
          <span className="start-game-loader__dot start-game-loader__dot--yellow" />
        </div>

        <p className="start-game-loader__text">STARTING GAME...</p>
      </div>
    </div>
  );
}
