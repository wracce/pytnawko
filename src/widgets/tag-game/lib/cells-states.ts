import {
  getCellFromId,
  getCellFromPos,
  getIndexFromPos,
  getSizeOfCells,
} from "./cells-utils";
import { Cell } from "../model/cell";

export function getEmptyCell(cells: Cell[]) {
  return getCellFromId(cells, cells.length);
}

export function checkOrderlyCells(cells: Cell[]) {
  return cells.every(
    (cell, index) => index === getIndexFromPos(cells, cell.pos),
  );
}

export function getAvailableMoves(cells: Cell[]) {
  const availableMoves = Array<Cell>();
  const { x, y } = getEmptyCell(cells).pos;
  const N = getSizeOfCells(cells);

  if (x - 1 >= 0) {
    const cell = getCellFromPos(cells, { x: x - 1, y });
    if (cell) availableMoves.push(cell);
  }
  if (y - 1 >= 0) {
    const cell = getCellFromPos(cells, { x, y: y - 1 });
    if (cell) availableMoves.push(cell);
  }
  if (x + 1 < N) {
    const cell = getCellFromPos(cells, { x: x + 1, y });
    if (cell) availableMoves.push(cell);
  }
  if (y + 1 < N) {
    const cell = getCellFromPos(cells, { x, y: y + 1 });
    if (cell) availableMoves.push(cell);
  }

  return availableMoves;
}
