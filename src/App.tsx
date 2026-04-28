import "./App.css";
import { History } from "./components/History/History";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";
import { MinesGrid } from "./components/MinesGrid/MinesGrid";
import { MainButton } from "./components/MainButton/MainButton";

function App() {
  return (
    <div>
      <History />
      <ControlPanel />
      <MinesGrid />
      <MainButton />
    </div>
  );
}

export default App;
