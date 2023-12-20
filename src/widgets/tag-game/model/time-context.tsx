import { createContext, useContext } from "react";

export const TimeContext = createContext<number | null>(null);
export function useTime() {
  return useContext(TimeContext);
}

interface TimeActionTick {
  type: "tick";
}
interface TimeActionReset {
  type: "reset";
}
type TimeAction = TimeActionTick | TimeActionReset;

export function timeReducer(time: number, action: TimeAction) {
  switch (action.type) {
    case "tick": {
      return time + 1;
    }
    case "reset": {
      return 0;
    }
    default: {
      return time;
    }
  }
}
