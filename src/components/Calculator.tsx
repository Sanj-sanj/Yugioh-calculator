import { FunctionComponent, MouseEventHandler, useState } from "react";

const Calculator: FunctionComponent<{ modalOperand: string }> = ({
  modalOperand,
}) => {
  const [lpOperand2, setLpOperand2] = useState("0");

  const updateOperand = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setLpOperand2(
      lpOperand2 === "0"
        ? e.currentTarget.innerText
        : lpOperand2 + e.currentTarget.innerText
    );
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

  return (
    <div className="calculator">
      <div className="calc-top">
        <div className="calc-screen">{`${modalOperand} ${lpOperand2}`}</div>
        <button className="calc-button">del</button>
      </div>

      <div className="calc-row">{calcRows[0]}</div>
      <div className="calc-row">{calcRows[1]}</div>
      <div className="calc-row">{calcRows[2]}</div>
      <div className="calc-row">
        {calcRows[3]}
        <button className="calc-button">Return</button>
      </div>
    </div>
  );
};
export default Calculator;
