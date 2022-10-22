import { Dispatch, SetStateAction } from "react";
import {
  CalculatorData,
  DisplayActions,
} from "../../interfaces/duelDisplayTypes";

export function calculatorContextSubmit(
  dispatch: React.Dispatch<DisplayActions>,
  calculationData: CalculatorData,
  userLpInput: string
) {
  if (calculationData.operand === "+") {
    dispatch({
      type: "INCREMENT",
      payload: {
        operand2: parseInt(userLpInput),
        player: calculationData.player,
      },
    });
  } else {
    dispatch({
      type: "DECREMENT",
      payload: {
        operand2: parseInt(userLpInput),
        player: calculationData.player,
      },
    });
  }
  dispatch({
    type: "UPDATE_LOG",
    payload: { ...calculationData, modifier: parseInt(userLpInput) },
  });
}

export function deleteLastInput(
  userLpInput: string,
  setState: Dispatch<SetStateAction<string>>
) {
  if (userLpInput.length <= 1) return setState("0");
  setState(userLpInput.slice(0, userLpInput.length - 1));
}

export function updateLP(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  userLpInput: string,
  setState: Dispatch<SetStateAction<string>>
) {
  const clickedNumber = e.currentTarget.innerText;
  if (
    (userLpInput === "0" && clickedNumber === "0") ||
    (userLpInput === "0" && clickedNumber === "00")
  )
    return;
  setState(
    userLpInput === "0"
      ? e.currentTarget.innerText
      : userLpInput + e.currentTarget.innerText
  );
}
