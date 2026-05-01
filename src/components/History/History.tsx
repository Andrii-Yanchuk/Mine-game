import "./History.css";
import { useQuery } from "@tanstack/react-query";
import { getHistory } from "../../api/client";
import type { HistoryResponse } from "../../types/api";
import { HistoryContent } from "./HistoryContent";

const historyQuery = {
  queryKey: ["history"],
  queryFn: getHistory,
  select: (data: HistoryResponse) =>
    data.games.filter((game) => game.status !== "active"),
};

export function History() {
  const { data: games = [], isLoading, isError } = useQuery(historyQuery);

  return (
    <div className="container history">
      <h2 className="history-title">recent games</h2>

      <div className="history-list">
        <HistoryContent games={games} isLoading={isLoading} isError={isError} />
      </div>
    </div>
  );
}
