import "./MainButton.css";
import { memo } from "react";
import { StartGameLoader } from "./StartGameLoader";
import { useMainButton } from "./useMainButton";

function MainButtonComponent() {
  const {
    errorMessage,
    isCashOutMode,
    isDisabled,
    isStartingGame,
    onClick,
    title,
  } =
    useMainButton();
  const className = `main-button ${isCashOutMode ? "main-button--cash-out" : ""}`;

  return (
    <div className="main-button-wrapper">
      {isStartingGame && <StartGameLoader />}

      <button
        className={className}
        disabled={isDisabled}
        onClick={onClick}
        type="button"
      >
        <p className="main-button__title">{title}</p>
      </button>

      {errorMessage && <p className="main-button__error">{errorMessage}</p>}
    </div>
  );
}

export const MainButton = memo(MainButtonComponent);
