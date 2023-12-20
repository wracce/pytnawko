import { createContext, useContext } from "react";

export const ScoreContext = createContext<number | null>(null);
export function useScore() {
  return useContext(ScoreContext);
}

interface ScoreActionIncrement {
  type: "increment";
}
interface ScoreActionReset {
  type: "reset";
}
type ScoreAction = ScoreActionIncrement | ScoreActionReset;

export function scoreReducer(score: number, action: ScoreAction) {
  switch (action.type) {
    case "increment": {
      return score + 1;
    }
    case "reset": {
      return 0;
    }
    default: {
      return score;
    }
  }
}
