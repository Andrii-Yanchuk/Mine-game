import "./MinesGrid.css";
import { GRID_CELL_CONTENT } from "./minesGridConstants";
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
            <span className="grid__cell-inner">
              <span className="grid__cell-face grid__cell-face--front">
                {isLoading ? (
                  <span className="grid__spinner" aria-hidden="true" />
                ) : null}
              </span>

              <span className="grid__cell-face grid__cell-face--back">
                {contentType ? GRID_CELL_CONTENT[contentType] : null}
              </span>
            </span>
          </button>
        ))}
      </div>

      {errorMessage && <p className="grid__error">{errorMessage}</p>}
    </>
  );
}
