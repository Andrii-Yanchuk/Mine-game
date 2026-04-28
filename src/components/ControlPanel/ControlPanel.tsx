import "./ControlPanel.css";

export function ControlPanel() {
  return (
    <aside className="container control-panel">
      <div className="balance">
        <p className="balance__title">Balance</p>
        <span className="balance__value">💰 $10000.00</span>
      </div>

      <div className="bet">
        <p className="bet__title">BET AMOUNT</p>

        <div className="bet__input">
          <span className="bet__currency">$</span>
          <input className="bet__field" type="number" defaultValue={100} />
        </div>

        <div className="bet__buttons">
          {[10, 25, 50, 100, 250, 500, 1000, 2500].map((value) => (
            <button
              key={value}
              className={`bet__button ${value === 100 ? "bet__button--active" : ""}`}
            >
              ${value}
            </button>
          ))}
        </div>

        <div className="bet__quick-actions">
          <button className="bet__button">1/2</button>
          <button className="bet__button">x2</button>
          <button className="bet__button">Max</button>
        </div>
      </div>

      <div className="mines">
        <p className="mines__title">MINES</p>

        <div className="mines__buttons">
          {[1, 3, 5, 10, 15].map((value) => (
            <button
              key={value}
              className={`mines__button ${value === 3 ? "mines__button--active" : ""}`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
