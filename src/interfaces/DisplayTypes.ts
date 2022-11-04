// REDUCER & 'GLOBAL' STATE RELATED
export type PlayerData = {
  lp: number;
  playerName: PlayerNames;
  duelistName: string;
};
export type PlayerNames = "player1" | "player2";

export type LogData = (CalculatorData | MiniGameData)[];

export type DisplayStates = {
  player1: PlayerData;
  player2: PlayerData;
  log: LogData;
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
      payload: [CalculatorData] | [minigame: MiniGameData];
    }
  | {
      type: "HALF_LP";
      payload: PlayerNames;
    }
  | {
      type: "UNDO";
      payload: {
        name: PlayerNames;
        adjustedLP: number;
      };
    };

export type CalculatorData = {
  player: PlayerNames;
  currentLP: number;
  modifier: number;
  operand: "+" | "-" | "/" | "*";
  remainder: undefined | number;
};
export type MiniGameData =
  | {
      game: "dice";
      outcome: number;
    }
  | {
      game: "coin";
      outcome: "heads" | "tails";
    };
export type ModalViews = "closed" | "calculator" | "log" | "dice" | "coin";
export type ModalActions = { player: PlayerNames; view: ModalViews };
