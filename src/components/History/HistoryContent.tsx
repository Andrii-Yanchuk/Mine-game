import type { HistoryGame } from "../../types/api";
import { HistoryCard } from "./HistoryCard";

type HistoryContentProps = {
  games: HistoryGame[];
  isError: boolean;
  isLoading: boolean;
};

export function HistoryContent({
  games,
  isError,
  isLoading,
}: HistoryContentProps) {
  if (isLoading) {
    return <p className="history-message">Loading...</p>;
  }

  if (isError) {
    return <p className="history-message">Failed to load history.</p>;
  }

  if (games.length === 0) {
    return <p className="history-message">No games yet.</p>;
  }

  return games.map((game) => <HistoryCard key={game.gameId} game={game} />);
}
