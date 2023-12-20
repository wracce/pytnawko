/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-param-reassign */
import getRandomElement from "../../../shared/lib/get-random-element";
import { Cell } from "../model/cell";
import { getAvailableMoves, getEmptyCell } from "./cells-states";
import { getCellFromId, getCellFromPos, getIndexFromCell } from "./cells-utils";

/**
 *  Generate an ordered array of Cell`s matrix elements
 * @param size order of square matrix
 * @returns 1D array of cells from 1 to size^2
 */
export function generateCells(size: number) {
  const cells = Array<Cell>();

  for (let i = 0; i < size; i += 1)
    for (let j = 0; j < size; j += 1) {
      const id = i * size + j + 1;
      const pos = { x: j, y: i };
      cells.push({ id, pos });
    }

  return cells;
}

export function updateCells(cells: Cell[], cell: Cell) {
  const oldCell = getCellFromId(cells, cell.id);

  if (!oldCell) return false;

  const cellIndex = getIndexFromCell(cells, oldCell);
  cells.splice(cellIndex, 1, cell);

  return true;
}

export function swapCellsPosition(
  cells: Cell[],
  cell1Id: number,
  cell2Id: number,
) {
  const cell1 = getCellFromId(cells, cell1Id);
  const cell2 = getCellFromId(cells, cell2Id);

  if (!cell1 || !cell2) return cells;

  const newCell1 = { id: cell1.id, pos: { ...cell2.pos } } as Cell;
  const newCell2 = { id: cell2.id, pos: { ...cell1.pos } } as Cell;

  const newCells = [...cells];
  updateCells(newCells, newCell1);
  updateCells(newCells, newCell2);

  return newCells;
}

export function moveCell(cells: Cell[], cellId: number): Cell[] {
  const emptyCell = getEmptyCell(cells);
  const cell = getCellFromId(cells, cellId);

  if (!cell || !emptyCell) return cells;

  const dx = emptyCell.pos.x - cell.pos.x;
  const dy = emptyCell.pos.y - cell.pos.y;
  const dxAbs = Math.abs(dx);
  const dyAbs = Math.abs(dy);
  // debugger
  if (!(dxAbs >= 1 && dyAbs === 0) && !(dyAbs >= 1 && dxAbs === 0))
    return cells;

  if (dxAbs === 1 || dyAbs === 1)
    return swapCellsPosition(cells, emptyCell.id, cell.id);

  const recursionCell = getCellFromPos(cells, {
    x: cell.pos.x + Math.sign(dx),
    y: cell.pos.y + Math.sign(dy),
  });

  // debugger;

  // console.log(`next cellId ${recursionCell?.id}`);
  if (!recursionCell) return cells;
  return swapCellsPosition(
    moveCell(cells, recursionCell.id),
    cell.id,
    emptyCell.id,
  );
}

export function shuffleCells(cells: Cell[], count: number) {
  let newCells = [...cells];
  let prevPos = getEmptyCell(newCells).pos;
  while (count > 0) {
    const cell = getRandomElement(
      getAvailableMoves(newCells).filter(
        (v) => v.pos.y !== prevPos.y || v.pos.x !== prevPos.x,
      ),
    );
    prevPos = getEmptyCell(newCells).pos;
    newCells = moveCell(newCells, cell.id);
    count -= 1;
    // debugger;
  }
  return newCells;
}
