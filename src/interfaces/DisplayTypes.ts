// REDUCER & 'GLOBAL' STATE RELATED
export type PlayerData = {
  lp: number;
  playerName: PlayerNames;
};
export type PlayerNames = "player1" | "player2";

export type DisplayStates = {
  player1: PlayerData;
  player2: PlayerData;
  log: CalculatorData[];
};

// CALCULATIONS RELATED
export type DisplayActions =
  | {
      type: "INCREMENT" | "DECREMENT";
      payload: {
        operand2: number;
        player: PlayerNames;
      };
    }
  | {
      type: "RESET_STATE";
      payload: boolean;
    }
  | {
      type: "UPDATE_LOG";
      payload: CalculatorData;
    }
  | {
      type: "HALF_LP";
      payload: PlayerNames;
    };

export type CalculatorData = {
  player: PlayerNames;
  currentLP: number;
  modifier: number;
  operand: "+" | "-" | "/";
  remainder: undefined | number;
};

export type ModalViews = "closed" | "calculator" | "log" | "dice" | "coin";
