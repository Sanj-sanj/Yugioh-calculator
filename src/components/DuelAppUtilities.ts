import { Dispatch } from "react";
import { CalculatorData, DisplayActions } from "../interfaces/DisplayTypes";

export default function undoPreviousCalculation(
  incomingData: CalculatorData,
  playerData: CalculatorData,
  dispatch: Dispatch<DisplayActions>
) {
  dispatch({
    type: "UNDO",
    payload: {
      name: playerData.player,
      adjustedLP: playerData.currentLP,
    },
  });
  dispatch({
    type: "UPDATE_LOG",
    payload: [
      incomingData,
      //   {
      //     ...playerData,
      //     currentLP: incomingData.remainder
      //       ? incomingData.remainder
      //       : playerData.currentLP,
      //     remainder: incomingData.currentLP,
      //     operand:
      //       incomingData.operand === "/"
      //         ? "*"
      //         : incomingData.operand === "+"
      //         ? "-"
      //         : "+",
      //   },
    ],
  });
}
