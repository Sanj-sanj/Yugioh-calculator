import { DisplayActions, DisplayStates } from "../interfaces/duelDisplayTypes";

const displayReducer = (state: DisplayStates, action: DisplayActions): DisplayStates => {
    switch (action.type) {
      case "INCREMENT":
        if (typeof action.payload === 'number') {
          return { ...state, lp: state.lp + action.payload };
        }
        return state;
      case "DECREMENT":
        if (typeof action.payload === 'number') {
          return { ...state, lp: state.lp - action.payload };
        }
        return state;

      default:
        return state;
    }
  };
export default displayReducer