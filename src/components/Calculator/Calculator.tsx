import { Dispatch, FunctionComponent, useState } from "react";
import {
  CalculatorData,
  DisplayActions,
} from "../../interfaces/duelDisplayTypes";
import {
  calculatorContextSubmit,
  deleteLastInput,
  updateLP,
} from "./Utilities";

const Calculator: FunctionComponent<{
  calculationData: CalculatorData;
  displayDispatch: Dispatch<DisplayActions>;
  closeModal: () => void;
}> = ({ calculationData, displayDispatch, closeModal }) => {
  const [userLpInput, setUserLpInput] = useState("0");

  // ================================ UTILS TO EXTRACT =======================
  const calcRows = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["0", "00"],
  ].map((row) =>
    row.map((number) => (
      <button
        className="calc-button"
        onClick={(e) => updateLP(e, userLpInput, setUserLpInput)}
        key={number}
      >
        {number}
      </button>
    ))
  );
  // ========================        UTILS TO EXTRACT =======================

  return (
    <div className="calculator">
      <div className="calc-top">
        <div className="calc-screen">{`${calculationData.currentLP} ${calculationData.operand} ${userLpInput}`}</div>
        <button
          className="calc-button"
          onClick={() => deleteLastInput(userLpInput, setUserLpInput)}
        >
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
            calculatorContextSubmit(
              displayDispatch,
              calculationData,
              userLpInput
            );
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
