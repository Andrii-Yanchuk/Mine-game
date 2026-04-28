import "./MinesGrid.css";

export function MinesGrid() {
  const cells = Array.from({ length: 25 });

  return (
    <div className="grid">
      {cells.map((_, index) => (
        <div
          key={index}
          className="grid__cell"
          onClick={() => console.log("click", index)}
        ></div>
      ))}
    </div>
  );
}
