import { FunctionComponent } from "react";
import { CalculatorData, PlayerData } from "../../interfaces/DisplayTypes";

type DISPLAY_DATA = {
  calculatorData: CalculatorData;
  playerData: PlayerData;
  halfLp: (data: CalculatorData) => void;
  openModal: (data: CalculatorData) => void;
  undoLastCalculation: (data: CalculatorData) => void;
};

const DuelistCounter: FunctionComponent<DISPLAY_DATA> = ({
  openModal,
  halfLp,
  calculatorData,
  playerData,
  undoLastCalculation,
}: DISPLAY_DATA) => {
  return (
    <div
      className={`duel-display-container ${
        playerData.playerName === "player2" ? "display-reverse" : ""
      }`}
    >
      <div
        className="
      display-area"
      >
        <div className="duel-display-name">{playerData.duelistName}</div>
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
        <button
          className="undo"
          onClick={() => undoLastCalculation(calculatorData)}
        >
          undo
        </button>
        {/*
  for "+" && "-" [button click] dispatch actions, omit {modifier, remainder} properties
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
