import useSound from "use-sound";
import betSound from "../assets/bet.mp3";
import cardFlipSound from "../assets/card-flip.mp3";
import loseSound from "../assets/lose.mp3";
import startGameSound from "../assets/start-game.mp3";
import winSound from "../assets/win.mp3";
import { useGameStore } from "../store/gameStore";

export function useGameSounds() {
  const isSoundEnabled = useGameStore((state) => state.isSoundEnabled);
  const soundOptions = { interrupt: true, soundEnabled: isSoundEnabled };
  const [playBetSound] = useSound(betSound, {
    ...soundOptions,
    volume: 0.45,
  });
  const [playCardFlipSound] = useSound(cardFlipSound, {
    ...soundOptions,
    volume: 0.55,
  });
  const [playLoseSound] = useSound(loseSound, {
    ...soundOptions,
    volume: 0.65,
  });
  const [playStartGameSound] = useSound(startGameSound, {
    ...soundOptions,
    volume: 0.55,
  });
  const [playWinSound] = useSound(winSound, {
    ...soundOptions,
    volume: 0.65,
  });

  return {
    playBetSound,
    playCardFlipSound,
    playLoseSound,
    playStartGameSound,
    playWinSound,
  };
}
