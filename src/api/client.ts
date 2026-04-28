import { BASE_URL } from "../constants/api";
import type {
  BalanceResponse,
  CreateGamePayload,
  HistoryResponse,
} from "../types/api";

function getPlayerId() {
  let id = localStorage.getItem("playerId");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("playerId", id);
  }

  return id;
}

export async function getBalance(): Promise<BalanceResponse> {
  const res = await fetch(`${BASE_URL}/api/balance`, {
    headers: {
      "x-player-id": getPlayerId(),
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch balance");
  }

  return res.json();
}

export async function getHistory(): Promise<HistoryResponse> {
  const res = await fetch(`${BASE_URL}/api/history`, {
    headers: {
      "x-player-id": getPlayerId(),
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch history");
  }

  return res.json();
}

export async function createGame(payload: CreateGamePayload) {
  const res = await fetch(`${BASE_URL}/api/games`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create game");
  }

  return res.json();
}
