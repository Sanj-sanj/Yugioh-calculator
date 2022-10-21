import { Dispatch, FunctionComponent, useState } from "react";
import { CalculatorData, DisplayActions } from "../interfaces/duelDisplayTypes";

const Calculator: FunctionComponent<{
  calculationData: CalculatorData;
  lpModifier: Dispatch<DisplayActions>;
  closeModal: () => void;
}> = ({ calculationData, lpModifier, closeModal }) => {
  const [userLpInput, setUserLpInput] = useState("0");
  // =========                        UTILS TO EXTRACT =======================

  function convertAndDispatch() {
    if (calculationData.operand === "+") {
      lpModifier({
        type: "INCREMENT",
        payload: {
          operand2: parseInt(userLpInput),
          player: calculationData.player,
        },
      });
    } else {
      lpModifier({
        type: "DECREMENT",
        payload: {
          operand2: parseInt(userLpInput),
          player: calculationData.player,
        },
      });
    }
  }

  function deleteLastInput() {
    if (userLpInput.length <= 1) return setUserLpInput("0");
    setUserLpInput(userLpInput.slice(0, userLpInput.length - 1));
  }

  function updateOperand(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const clickedNumber = e.currentTarget.innerText;
    if (
      (userLpInput === "0" && clickedNumber === "0") ||
      (userLpInput === "0" && clickedNumber === "00")
    )
      return;
    setUserLpInput(
      userLpInput === "0"
        ? e.currentTarget.innerText
        : userLpInput + e.currentTarget.innerText
    );
  }
  const calcRows = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["0", "00"],
  ].map((row) =>
    row.map((number) => (
      <button className="calc-button" onClick={updateOperand} key={number}>
        {number}
      </button>
    ))
  );
  // ========================        UTILS TO EXTRACT =======================

  return (
    <div className="calculator">
      <div className="calc-top">
        <div className="calc-screen">{`${calculationData.currentLP} ${calculationData.operand} ${userLpInput}`}</div>
        <button className="calc-button" onClick={() => deleteLastInput()}>
          del
        </button>
      </div>
      <div className="calc-row">{calcRows[0]}</div>
      <div className="calc-row">{calcRows[1]}</div>
      <div className="calc-row">{calcRows[2]}</div>
      <div className="calc-row">
        {calcRows[3]}
        <button
          className="calc-button"
          onClick={() => {
            convertAndDispatch();
            closeModal();
          }}
        >
          Return
        </button>
      </div>
    </div>
  );
};
export default Calculator;
