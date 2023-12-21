import { useRef } from "react";
import { useCellsDispatch } from "../model/cells-context";

import { CSSTransition } from "react-transition-group";

import "./tile.less";

type Props = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export default function Tile({ id, width, height, x, y }: Props) {
  const cellRef = useRef(null);
  const dispatchCells = useCellsDispatch();
  function handleCellClick() {
    dispatchCells?.({
      type: "move",
      cellId: id,
    });
  }

  return (
    <CSSTransition
      classNames="cell"
      timeout={0}
      nodeRef={cellRef}
      in={width !== 0 && height !== 0}
      mountOnEnter
    >
      <button
        ref={cellRef}
        type="button"
        className="cell"
        onClick={handleCellClick}
        style={{
          top: y * height,
          left: x * width,
          width,
          height,
        }}
      >
        <div className="cell_content">
          <span>{id}</span>
        </div>
      </button>
    </CSSTransition>
  );
}
