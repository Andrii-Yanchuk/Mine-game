import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getActiveGame } from "../../api/client";
import { useGameStore } from "../../store/gameStore";

export function ActiveGameLoader() {
  const setActiveGame = useGameStore((state) => state.setActiveGame);

  const { data: activeGame } = useQuery({
    queryKey: ["activeGame"],
    queryFn: getActiveGame,
    retry: false,
  });

  useEffect(() => {
    if (activeGame) {
      setActiveGame(activeGame);
    }
  }, [activeGame, setActiveGame]);

  return null;
}
