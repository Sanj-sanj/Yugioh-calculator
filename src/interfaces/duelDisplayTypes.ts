import { SetStateAction } from "react";

type DisplayActionTypes = "INCREMENT" | "DECREMENT";

export type PlayerData = {
  lp: number;
  playerName: PlayerNames;
};
export type PlayerNames = "player1" | "player2";

export type DisplayStates = {
  player1: PlayerData;
  player2: PlayerData;
};

export type DisplayActions =
  | {
      type: DisplayActionTypes;
      payload: {
        operand2: number;
        player: PlayerNames;
      };
    }
  | {
      type: "RESET_STATE";
      payload: boolean;
    };
export type Operands = "+" | "-";

export type CalculatorData = {
  player: PlayerNames;
  currentLP: number;
  operand: Operands;
};

export type ModalStateModifiers = {
  setToggleModal: (v: SetStateAction<boolean>) => void;
  setCalculationData: (v: SetStateAction<CalculatorData>) => void;
};
