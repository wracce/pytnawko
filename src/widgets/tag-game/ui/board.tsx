import { useCells } from "../model/cells-context";
import { useEffect, useRef, useState } from "react";

import Tile from "./tile";

import { getEmptyCell } from "../lib/cells-states";
import { getSizeOfCells } from "../lib/cells-utils";

import "./board.less";

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
            <Tile
              id={cell.id}
              width={cellSize.width}
              height={cellSize.height}
              x={cell.pos.x}
              y={cell.pos.y}
              key={cell.id}
            />
          ),
      )}
    </div>
  );
}
