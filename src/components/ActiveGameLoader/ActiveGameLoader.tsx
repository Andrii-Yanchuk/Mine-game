import "./ActiveGameLoader.css";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getActiveGame } from "../../api/client";
import { useGameStore } from "../../store/gameStore";

export function ActiveGameLoader() {
  const setActiveGame = useGameStore((state) => state.setActiveGame);

  const { data: activeGame, isPending } = useQuery({
    queryKey: ["activeGame"],
    queryFn: getActiveGame,
    retry: false,
  });

  useEffect(() => {
    if (activeGame) {
      setActiveGame(activeGame);
    }
  }, [activeGame, setActiveGame]);

  if (!isPending) {
    return null;
  }

  return (
    <div className="app-loader" role="status" aria-live="polite">
      <div className="app-loader__content">
        <div className="app-loader__dots" aria-hidden="true">
          <span className="app-loader__dot app-loader__dot--blue" />
          <span className="app-loader__dot app-loader__dot--green" />
          <span className="app-loader__dot app-loader__dot--yellow" />
        </div>

        <h1 className="app-loader__title">MINES</h1>
        <p className="app-loader__text">Loading game...</p>
      </div>
    </div>
  );
}
