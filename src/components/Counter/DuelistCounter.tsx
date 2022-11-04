import { FunctionComponent } from "react";
import { CalculatorData, PlayerData } from "../../interfaces/DisplayTypes";

type DISPLAY_DATA = {
  calculatorData: CalculatorData;
  duelistName: string;
  className: string;
  playerData: PlayerData;
  halfLp: (data: CalculatorData) => void;
  openModal: (data: CalculatorData) => void;
  undo: (data: CalculatorData) => void;
};

const DuelistCounter: FunctionComponent<DISPLAY_DATA> = ({
  openModal,
  duelistName,
  className,
  halfLp,
  calculatorData,
  playerData,
  undo,
}: DISPLAY_DATA) => {
  console.log(duelistName, calculatorData);
  return (
    <div className={`duel-display-container ${className}`}>
      <div
        className="
      display-area"
      >
        <div className="duel-display-name">{duelistName}</div>
        <div className="life-bar-container">
          <div className="life-bar">
            <div
              className="life-bar-fill"
              style={{ width: `${(playerData.lp / 8000) * 100}%` }}
            ></div>
          </div>
          <span className="lp-ammount">{playerData.lp}</span>
        </div>
      </div>
      <div className="display-interact">
        {/* { passing back the operand and Lp values so the modal has the updated with knowledge of which button } */}
        {/* { modifier && remainder is not assigned yet, default: 'zero'. Then, it will be updated in the reducer by the calc component } */}
        <button className="undo" onClick={() => undo(calculatorData)}>
          undo
        </button>
        {/*
  for + && - dispatch actions, omit {modifier, remainder} properties
  */}
        <button
          onClick={() =>
            openModal({
              ...calculatorData,
              operand: "+",
              player: playerData.playerName,
              currentLP: playerData.lp,
            })
          }
        >
          +
        </button>
        <button
          onClick={() =>
            openModal({
              ...calculatorData,
              operand: "-",
              player: playerData.playerName,
              currentLP: playerData.lp,
            })
          }
        >
          -
        </button>
        <button
          onClick={() =>
            halfLp({
              operand: "/",
              player: playerData.playerName,
              currentLP: playerData.lp,
              modifier: 2,
              remainder: Math.round(playerData.lp / 2),
            })
          }
        >
          /
        </button>
      </div>
    </div>
  );
};
export default DuelistCounter;
