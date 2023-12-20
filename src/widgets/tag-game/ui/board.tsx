import { useEffect, useRef, useState } from "react";
import { useCells } from "../model/cells-context";
import Tile from "./tile";
import "./board.less";
import { getEmptyCell } from "../lib/cells-states";
import { getSizeOfCells } from "../lib/cells-utils";

export default function Board() {
  const cells = useCells();
  const boardRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState({ width: 0, height: 0 });
  const size = cells ? getSizeOfCells(cells) : 1;

  useEffect(() => {
    const currentBoardRef = boardRef.current;

    if (!currentBoardRef || size === 0) return () => {};

    const resizeObserver = new ResizeObserver(() => {
      const width = currentBoardRef.clientWidth / size;
      const height = currentBoardRef.clientHeight / size;
      setCellSize({ width, height });
    });

    resizeObserver.observe(currentBoardRef);

    return () => {
      resizeObserver.disconnect();
    };
  }, [size]);

  return (
    <div className="tag-game" ref={boardRef}>
      {cells?.map(
        (cell) =>
          getEmptyCell(cells) !== cell && (
            // <CSSTransition
            //   classNames="cell"
            //   timeout={200}
            //   in={size > 0}
            //   key={cell.id}
            // >
            <Tile
              id={cell.id}
              width={cellSize.width}
              height={cellSize.height}
              x={cell.pos.x}
              y={cell.pos.y}
              key={cell.id}
            />
            // </CSSTransition>
          ),
      )}
    </div>
  );
}
