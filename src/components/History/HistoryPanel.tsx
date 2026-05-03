import { memo } from "react";
import { SoundToggle } from "../SoundToggle/SoundToggle";
import { History } from "./History";

function HistoryPanelComponent() {
  return (
    <aside className="app__history">
      <div className="app__history-header">
        <SoundToggle />
      </div>
      <History />
    </aside>
  );
}

export const HistoryPanel = memo(HistoryPanelComponent);
