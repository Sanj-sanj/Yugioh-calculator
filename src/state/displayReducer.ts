import { DisplayActions, DisplayStates } from "../interfaces/duelDisplayTypes";
import { duelDisplayState } from "./duelDisplayState";

const displayReducer = (
  state: DisplayStates,
  action: DisplayActions
): DisplayStates => {
  switch (action.type) {
    case "INCREMENT":
      if (
        typeof action.payload === "object" &&
        typeof action.payload.operand2 === "number"
      ) {
        const player = action.payload.player;

        return {
          ...state,
          [player]: {
            ...state[player],
            lp: state[player].lp + action.payload.operand2,
          },
        };
      }
      return state;
    case "DECREMENT":
      if (
        typeof action.payload === "object" &&
        typeof action.payload.operand2 === "number"
      ) {
        const player = action.payload.player;
        return {
          ...state,
          [player]: {
            ...state[player],
            lp: state[player].lp - action.payload.operand2,
          },
        };
      }
      return state;
    case "RESET_STATE":
      if (typeof action.payload === "boolean" && action.payload === true) {
        console.log(duelDisplayState);
        return { ...duelDisplayState };
      }
      return state;

    default:
      return state;
  }
};
export default displayReducer;
