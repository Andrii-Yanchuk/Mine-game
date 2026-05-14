import {
  API_ENDPOINTS,
  BASE_URL,
  PLAYER_ID,
  PLAYER_ID_HEADER,
} from "../constants/api";
import type {
  ActiveGameResponse,
  BalanceResponse,
  CashOutResponse,
  CreateGamePayload,
  CreateGameResponse,
  HistoryResponse,
  RevealCellPayload,
  RevealCellResponse,
} from "../types/api";

function getAuthHeaders() {
  return {
    [PLAYER_ID_HEADER]: PLAYER_ID,
  };
}

export async function getBalance(): Promise<BalanceResponse> {
  const res = await fetch(`${BASE_URL}${API_ENDPOINTS.balance}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch balance");
  }

  return res.json();
}

export async function getHistory(): Promise<HistoryResponse> {
  const res = await fetch(`${BASE_URL}${API_ENDPOINTS.history}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch history");
  }

  return res.json();
}

export async function getActiveGame(): Promise<ActiveGameResponse | null> {
  const res = await fetch(`${BASE_URL}${API_ENDPOINTS.activeGame}`, {
    headers: getAuthHeaders(),
  });

  if (res.status === 204 || res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(await getErrorMessage(res, "Failed to fetch active game"));
  }

  return res.json();
}

async function getErrorMessage(res: Response, fallback: string) {
  try {
    const data = await res.json();

    if (typeof data?.message === "string") {
      return data.message;
    }

    if (typeof data?.error === "string") {
      return data.error;
    }
  } catch {
    // Ignore invalid or empty error responses and use the fallback below.
  }

  return fallback;
}

export async function createGame(
  payload: CreateGamePayload,
): Promise<CreateGameResponse> {
  const res = await fetch(`${BASE_URL}${API_ENDPOINTS.games}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res, "Failed to create game"));
  }

  return res.json();
}

export async function revealCell({
  gameId,
  ...payload
}: RevealCellPayload & { gameId: string }): Promise<RevealCellResponse> {
  const res = await fetch(`${BASE_URL}${API_ENDPOINTS.revealCell(gameId)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res, "Failed to reveal cell"));
  }

  return res.json();
}

export async function cashOutGame(gameId: string): Promise<CashOutResponse> {
  const res = await fetch(`${BASE_URL}${API_ENDPOINTS.cashOut(gameId)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res, "Failed to cash out"));
  }

  return res.json();
}
