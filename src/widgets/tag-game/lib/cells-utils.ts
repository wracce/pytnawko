import { Cell } from "../model/cell";
import { Point } from "../model/point";
// export function getPosFromIndex(index: number, size: number) {
//   return { x: index % size, y: Math.floor(index / size) } as Point;
// }

export function getSizeOfCells(cells: Cell[]) {
  return Math.sqrt(cells.length);
}

export function getIndexFromPos(cells: Cell[], { x, y }: Point) {
  const size = getSizeOfCells(cells);
  return y * size + x;
}

export function getIndexFromId(_cells: Cell[], cellId: number) {
  return cellId - 1;
}

export function getIndexFromCell(cells: Cell[], cell: Cell) {
  return getIndexFromId(cells, cell.id);
}

export function getCellFromId(cells: Cell[], cellId: number) {
  return cells[getIndexFromId(cells, cellId)];
}

export function getCellFromPos(cells: Cell[], pnt: Point) {
  return cells.find((v) => v.pos.x === pnt.x && v.pos.y === pnt.y);
}

export function getGodsNumber(size: number) {
  switch (size) {
    case 2:
      return 6;
    case 3:
      return 31;
    case 4:
      return 80;
    case 5:
      return 209;
    case 6:
      return 889;
    case 7:
      return 3315;
    default:
      return 13799;
  }
}
