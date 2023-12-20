import React, { createContext, useContext } from "react";
import { generateCells, moveCell, shuffleCells } from "../lib/cells-actions";
import { Cell } from "./cell";
import { checkOrderlyCells } from "../lib/cells-states";
import { getGodsNumber } from "../lib/cells-utils";

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
      // debugger;
      return moveCell(cells, action.cellId);
    }
    case "generate": {
      const { size } = action;
      let newCells: Cell[];

      // console.log(`old: ${cells}`);

      do {
        newCells = shuffleCells(
          generateCells(size),
          getGodsNumber(getGodsNumber(size)),
        );
      } while (checkOrderlyCells(newCells)); //checkOrderlyCells(newCells)

      // console.log(`arr: ${newCells} - ${isCanOrderly(newCells)}`);

      // if (!isCanOrderly(newCells)) {
      //   const emptyCellId = getEmptyCellId(newCells);
      //   const { length } = cells;
      //   let [cell1Id, cell2Id] = [0, 1];

      //   if (cell1Id === emptyCellId || cell2Id === emptyCellId) {
      //     [cell1Id, cell2Id] = [length - 2, length - 1];
      //   }
      //   newCells = swapCells(newCells, cell1Id, cell2Id);
      //   console.log(`fixArr: ${newCells} - ${isCanOrderly(newCells)}`);
      // }

      return newCells;
    }
    default: {
      return cells;
    }
  }
}

// type Props = { size: number };

// type State = {
//   emptyCell: Cell;
//   cells: Cell[];
//   steps: number;

//   ms: number;
// };

// export class TagGame extends Component<Props, State> {
//   private board!: Board;

//   private timerID?: number;

//   constructor(props: Props) {
//     super(props);

//     this.handleClickCell = this.handleClickCell.bind(this);

//     this.board = new Board();
//     this.board.init(props.size);
//     this.state = {
//       cells: [...this.board.getCells()],
//       steps: 0,
//       emptyCell: this.board.getEmptyCell(),
//       ms: 0,
//     };
//   }

//   componentDidMount(): void {
//     let { ms } = this.state;
//     if (this.timerID === undefined) {
//       this.timerID = setInterval(() => {
//         ms += 1;
//         this.setState({ ms });
//       }, 1000);
//     }
//   }

//   componentWillUnmount(): void {
//     clearInterval(this.timerID);
//   }

//   handleClickCell(cell: Cell) {
//     let { steps } = this.state;
//     const isUpdate = this.board.dragCell(cell);
//     if (isUpdate) {
//       steps += 1;
//       this.setState({ steps });
//       this.updateState();

//       if (this.board.isFinish()) {
//         clearInterval(this.timerID);
//       }
//     }
//   }

//   updateState() {
//     this.setState({
//       cells: [...this.board.getCells()],
//       emptyCell: this.board.getEmptyCell(),
//     });
//   }

//   render() {
//     const { cells, steps, emptyCell, ms } = this.state;
//     return (
//       <>
//         <TagBoard
//           cells={cells}
//           emptyCell={emptyCell}
//           onCellClick={(cell) => this.handleClickCell(cell)}
//         />
//         <div className="info">
//           <Score steps={steps} />
//           <Stopwatch seconds={ms} />
//         </div>
//       </>
//     );
//   }
// }

// export default TagGame;
