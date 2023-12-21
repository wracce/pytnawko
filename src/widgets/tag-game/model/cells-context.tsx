import React, { createContext, useContext } from "react";

import { Cell } from "./cell";
import { getGodsNumber } from "../lib/cells-utils";
import { checkOrderlyCells } from "../lib/cells-states";
import { generateCells, moveCell, shuffleCells } from "../lib/cells-actions";

export const CellsContext = createContext<Cell[] | null>(null);

export const CellsDispatchContext =
  createContext<React.Dispatch<CellsAction> | null>(null);

export function useCells() {
  return useContext(CellsContext);
}

export function useCellsDispatch() {
  return useContext(CellsDispatchContext);
}

interface CellsActionMove {
  type: "move";
  cellId: number;
}

interface CellsActionRefresh {
  type: "refresh";
}

interface CellsActionGenerate {
  type: "generate";
  size: number;
}

export type CellsAction =
  | CellsActionMove
  | CellsActionRefresh
  | CellsActionGenerate;

export function cellsReducer(cells: Cell[], action: CellsAction) {
  switch (action.type) {
    case "move": {
      return moveCell(cells, action.cellId);
    }
    case "generate": {
      const { size } = action;
      let newCells: Cell[];

      do {
        newCells = shuffleCells(
          generateCells(size),
          getGodsNumber(getGodsNumber(size)),
        );
      } while (checkOrderlyCells(newCells));

      return newCells;
    }
    default: {
      return cells;
    }
  }
}
