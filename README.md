# Mine Game

A React + TypeScript implementation of a Mines-style betting game. The app lets a player choose a bet amount and mine count, start an active game, reveal cells on a 5x5 board, cash out after finding gems, and review recent game results.

## Features

- 5x5 mines board with gem and mine reveal states
- Configurable bet amount and mine count
- Balance loading and bet validation
- Active game restore on page load
- Cash out flow with win/loss result modal
- Recent completed games history
- Server state handled with TanStack Query
- Local UI/game state handled with Zustand

## Tech Stack

- React 19
- TypeScript
- Vite
- Zustand
- TanStack Query
- ESLint

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## API Configuration

The frontend currently uses a hosted backend configured in [src/constants/api.ts](src/constants/api.ts):

```ts
export const BASE_URL = "https://mines-be.vercel.app";
export const PLAYER_ID = "admin";
export const PLAYER_ID_HEADER = "X-Player-Id";
```

Available API calls are wrapped in [src/api/client.ts](src/api/client.ts):

- `GET /api/balance`
- `GET /api/history`
- `GET /api/games/active`
- `POST /api/games`
- `POST /api/games/:gameId/reveal`
- `POST /api/games/:gameId/cashout`

## Project Structure

```text
src/
  api/                 API client functions
  components/          Game UI components
    ActiveGameLoader/  Restores active game state
    ControlPanel/      Balance, bet, mines, and action controls
    GameProgress/      Active game progress summary
    GameResultModal/   Win/loss result dialog
    History/           Completed game history
    MainButton/        Start game and cash out button logic
    MinesGrid/         5x5 board and reveal behavior
  constants/           API and game constants
  store/               Zustand game store and state helpers
  types/               API and store TypeScript types
  utils/               Formatting and validation helpers
```

## Game Rules

- The board contains 25 cells.
- Supported mine counts are `1`, `3`, `5`, `10`, and `24`.
- The maximum bet is `$10,000`.
- A game starts after submitting a valid bet and mine count.
- Revealing a gem keeps the game active and updates the multiplier.
- Revealing a mine ends the game as a loss.
- Cashing out after at least one revealed gem ends the game as a win.

## Notes

- The app is private and has no publish configuration.
- API base URL and player ID are currently hardcoded rather than read from environment variables.
- React Query Devtools are mounted in development for inspecting query state.
