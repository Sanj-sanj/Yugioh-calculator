import { FunctionComponent } from "react";
import { CalculatorData, PlayerData } from "../../interfaces/DisplayTypes";

type DISPLAY_DATA = {
  calculatorData: CalculatorData;
  duelistName: string;
  className: string;
  playerData: PlayerData;
  divideLp: (data: CalculatorData) => void;
  openModal: (data: CalculatorData) => void;
};

const DuelistCounter: FunctionComponent<DISPLAY_DATA> = ({
  openModal,
  duelistName,
  className,
  divideLp,
  calculatorData,
  playerData,
}: DISPLAY_DATA) => {
  return (
    <div className={`duel-display-container ${className}`}>
      <div className="duel-display">
        <div className="duel-display-name">{duelistName}</div>
        <div className="life-bar">
          <div
            className={`life-bar-fill ${playerData.lp}`}
            style={{ width: `${(playerData.lp / 8000) * 100}%` }}
          ></div>
          <span className="lp-ammount">{playerData.lp}</span>
        </div>
      </div>
      <div className="display-interact">
        {/* { passing back the operand and Lp values so the modal has the updated with knowledge of which button } */}
        {/* { modifier && remainder is not assigned yet, default: 'zero'. Then, it will be updated in the reducer by the calc component } */}
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
            divideLp({
              operand: "/",
              player: playerData.playerName,
              currentLP: playerData.lp,
              modifier: 2,
              remainder: playerData.lp / 2,
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
