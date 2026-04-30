import "./App.css";
import { ActiveGameLoader } from "./components/ActiveGameLoader/ActiveGameLoader";
import { History } from "./components/History/History";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";
import { GameResultModal } from "./components/GameResultModal/GameResultModal";
import { MinesGrid } from "./components/MinesGrid/MinesGrid";
import { MainButton } from "./components/MainButton/MainButton";

function App() {
  return (
    <div>
      <ActiveGameLoader />
      <History />
      <ControlPanel />
      <MinesGrid />
      <MainButton />
      <GameResultModal />
    </div>
  );
}

export default App;
