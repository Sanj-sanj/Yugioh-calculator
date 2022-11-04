import { CalculatorData, DisplayStates } from "../interfaces/DisplayTypes";

//these player properties are accessed using the playerName property of CalculationData
//playerName is for matching properties
//duelistName is for display purposes only
export const duelDisplayState: DisplayStates = {
  player1: {
    lp: 8000,
    playerName: "player1",
    duelistName: "Duelist 1",
  },
  player2: {
    lp: 8000,
    playerName: "player2",
    duelistName: "Duelist 2",
  },
  log: [],
};

//state that gets consumed by Calculator component once passed to each Duel display
export const initialCalculationState: {
  player1: CalculatorData;
  player2: CalculatorData;
} = {
  player1: {
    player: "player1",
    currentLP: 8000,
    operand: "+",
    modifier: 0,
    remainder: undefined,
  },
  player2: {
    player: "player2",
    currentLP: 8000,
    operand: "+",
    modifier: 0,
    remainder: undefined,
  },
};
