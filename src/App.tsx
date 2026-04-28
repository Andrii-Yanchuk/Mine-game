import "./App.css";
import { History } from "./components/History/History";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";

function App() {
  return (
    <div>
      <History />
      <ControlPanel />
      <MinesGrid />
    </div>
  );
}

export default App;
