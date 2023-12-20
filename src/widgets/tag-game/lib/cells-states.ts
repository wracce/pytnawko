import { Cell } from "../model/cell";
import {
  getCellFromId,
  getCellFromPos,
  getIndexFromPos,
  getSizeOfCells,
} from "./cells-utils";

export function getEmptyCell(cells: Cell[]) {
  return getCellFromId(cells, cells.length);
}

export function checkOrderlyCells(cells: Cell[]) {
  return cells.every(
    (cell, index) => index === getIndexFromPos(cells, cell.pos),
  );
}

// Алгоритм из википедии
// export function isCanOrderly(cells: number[]) {
//   const order = getOrderOfCells(cells);
//   const emptyId = getEmptyCell(cells);
//   const N = cells.reduce((S, cellId, cellPos) => {
//     return (
//       S +
//       (cellId === emptyId
//         ? idToPosition(cellPos, order).y + 1
//         : cells.slice(cellPos + 1).filter((v) => v < cellId).length)
//     );
//   }, 0);

//   return N + ((order % 2 === 0 ? 0 : 1) % 2) === 0;
// }

export function getAvailableMoves(cells: Cell[]) {
  const availableMoves = Array<Cell>();
  const { x, y } = getEmptyCell(cells).pos;
  const N = getSizeOfCells(cells);
  // debugger
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
  // debugger
  return availableMoves;
}
