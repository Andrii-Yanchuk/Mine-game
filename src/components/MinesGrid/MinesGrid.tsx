import "./MinesGrid.css";
import { GRID_CELL_CONTENT } from "./minesGridHelpers";
import { useMinesGrid } from "./useMinesGrid";

export function MinesGrid() {
  const { cells, errorMessage, revealGridCell } = useMinesGrid();

  return (
    <>
      <div className="grid">
        {cells.map(({ className, contentType, index, isDisabled, isLoading }) => (
          <button
            key={index}
            className={className}
            disabled={isDisabled}
            onClick={() => revealGridCell(index)}
            type="button"
          >
            {isLoading ? (
              <span className="grid__spinner" aria-hidden="true" />
            ) : (
              contentType ? GRID_CELL_CONTENT[contentType] : null
            )}
          </button>
        ))}
      </div>

      {errorMessage && <p className="grid__error">{errorMessage}</p>}
    </>
  );
}
