import "./App.css";
import { ActiveGameLoader } from "./components/ActiveGameLoader/ActiveGameLoader";
import { History } from "./components/History/History";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";
import { GameResultModal } from "./components/GameResultModal/GameResultModal";
import { GameProgress } from "./components/GameProgress/GameProgress";
import { MinesGrid } from "./components/MinesGrid/MinesGrid";

function App() {
  return (
    <div className="app">
      <ActiveGameLoader />

      <div className="app__layout">
        <aside className="app__panel">
          <ControlPanel />
        </aside>

        <main className="app__game">
          <GameProgress />
          <MinesGrid />
        </main>

        <aside className="app__history">
          <History />
        </aside>
      </div>

      <GameResultModal />
    </div>
  );
}

export default App;
