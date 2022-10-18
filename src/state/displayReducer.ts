import { DisplayActions, DisplayStates } from "../interfaces/duelDisplayTypes";

const displayReducer = (state: DisplayStates, action: DisplayActions): DisplayStates => {
    switch (action.type) {
      case "INCREMENT":
        if (typeof action.payload.operand2 === 'number') {
          const player = action.payload.player
          
          return { ...state, [player]: {...state[player], lp : state[player].lp + action.payload.operand2} };
        }
        return state;
      case "DECREMENT":
        if (typeof action.payload.operand2 === 'number') {
          const player = action.payload.player
          return { ...state, [player]: {...state[player], lp : state[player].lp - action.payload.operand2} };
        }
        return state;

      default:
        return state;
    }
  };
export default displayReducer