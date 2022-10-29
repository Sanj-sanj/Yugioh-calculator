import { CalculatorData, DisplayStates } from "../interfaces/DisplayTypes";

export const duelDisplayState: DisplayStates = {
  player1: {
    lp: 8000,
    playerName: "player1",
  },
  player2: {
    lp: 8000,
    playerName: "player2",
  },
  log: [],
};

//state that gets consumed by Calculator component once passed to each Duel display
export const initialCalculationState: CalculatorData = {
  player: "player1",
  currentLP: 8000,
  operand: "+",
  modifier: 0,
  remainder: undefined,
};
