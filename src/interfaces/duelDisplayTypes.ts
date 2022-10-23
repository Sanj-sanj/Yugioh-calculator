import { SetStateAction } from "react";

type CalculatorActionTypes = "INCREMENT" | "DECREMENT";

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

export type DisplayActions =
  | {
      type: CalculatorActionTypes;
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
    };

export type Operands = "+" | "-";

export type CalculatorData = {
  player: PlayerNames;
  currentLP: number;
  modifier: number;
  operand: Operands;
};

export type ModalStateModifiers = {
  setToggleModal: (v: SetStateAction<ModalViews>) => void;
  setCalculationData: (v: SetStateAction<CalculatorData>) => void;
};

export type ModalViews = "closed" | "calculator" | "log";
