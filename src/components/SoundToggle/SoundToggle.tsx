import "./SoundToggle.css";
import { useGameStore } from "../../store/gameStore";

export function SoundToggle() {
  const isSoundEnabled = useGameStore((state) => state.isSoundEnabled);
  const toggleSound = useGameStore((state) => state.toggleSound);
  const label = isSoundEnabled ? "Mute sounds" : "Unmute sounds";

  return (
    <button
      className="sound-toggle"
      type="button"
      onClick={toggleSound}
      aria-label={label}
      title={label}
    >
      <img
        className="sound-toggle__icon"
        src={isSoundEnabled ? "/sound-on.svg" : "/sound-off.svg"}
        alt=""
        aria-hidden="true"
      />
    </button>
  );
}
