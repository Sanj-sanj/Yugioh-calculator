import { DisplayActions, DisplayStates } from "../interfaces/DisplayTypes";
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
        const remainder = Math.round(
          state[player].lp + action.payload.operand2
        );
        return {
          ...state,
          [player]: {
            ...state[player],
            lp: remainder,
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
        const remainder = Math.round(
          state[player].lp - action.payload.operand2
        );
        return {
          ...state,
          [player]: {
            ...state[player],
            lp: remainder <= 0 ? 0 : remainder,
          },
        };
      }
      return state;
    case "RESET_STATE":
      if (typeof action.payload === "boolean" && action.payload === true) {
        return { ...duelDisplayState };
      }
      return state;
    case "UPDATE_LOG":
      state.log;
      return { ...state, log: [...state.log, ...action.payload] };
    case "HALF_LP": {
      const player = action.payload;
      const remainder = Math.round(state[player].lp / 2);
      return {
        ...state,
        [player]: { ...state[player], lp: remainder <= 0 ? 0 : remainder },
      };
    }
    case "UNDO": {
      const player = action.payload.name;
      return {
        ...state,
        [player]: { ...state[player], lp: action.payload.adjustedLP },
      };
    }

    default:
      return state;
  }
};
export default displayReducer;
