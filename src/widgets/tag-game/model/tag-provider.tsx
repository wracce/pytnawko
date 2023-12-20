import { useEffect, useReducer, useState } from "react";
import {
  CellsContext,
  CellsDispatchContext,
  cellsReducer,
} from "./cells-context";
import { ScoreContext, scoreReducer } from "./score-context";
import { TimeContext, timeReducer } from "./time-context";
import { checkOrderlyCells } from "../lib/cells-states";

enum State {
  INIT,
  GENERATED,
  PROCESS,
  FINISHED,
  END,
}

type Props = {
  children: React.ReactNode;
  size: number;
  onFinish: (time: number, score: number) => void;
  onDrag: () => void;
};

export default function TagProvider({
  children,
  size,
  onFinish,
  onDrag,
}: Props) {
  const [state, setState] = useState(State.INIT);
  const [timerID, setTimerID] = useState<number | undefined>();
  const [cells, dispatchCells] = useReducer(cellsReducer, []);
  const [score, dispatchScore] = useReducer(scoreReducer, 0);
  const [time, dispatchTime] = useReducer(timeReducer, 0);

  useEffect(() => {
    switch (state) {
      case State.INIT:
        dispatchCells?.({ type: "generate", size });
        setState(State.GENERATED);
        break;
      case State.GENERATED:
        setTimerID(
          setInterval(() => {
            dispatchTime?.({ type: "tick" });
          }, 1000),
        );

        setState(State.PROCESS);
        break;
      case State.PROCESS:
        dispatchScore?.({ type: "increment" });
        onDrag();
        if (checkOrderlyCells(cells)) {
          clearInterval(timerID);
          onFinish(time, score + 1);
        }
        break;
      default:
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cells]);

  useEffect(() => {
    return () => {
      clearInterval(timerID);
    };
  }, [timerID]);

  return (
    <CellsContext.Provider value={cells}>
      <CellsDispatchContext.Provider value={dispatchCells}>
        <ScoreContext.Provider value={score}>
          <TimeContext.Provider value={time}>{children}</TimeContext.Provider>
        </ScoreContext.Provider>
      </CellsDispatchContext.Provider>
    </CellsContext.Provider>
  );
}
