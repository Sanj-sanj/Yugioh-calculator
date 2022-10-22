import { FunctionComponent } from "react";
import { CalculatorData, PlayerNames } from "../interfaces/duelDisplayTypes";

type DISPLAY_DATA = {
  currentLP: number;
  duelistName: string;
  id: PlayerNames;
  openModal: (data: CalculatorData) => void;
  className: string;
};

const DuelDisplay: FunctionComponent<DISPLAY_DATA> = ({
  currentLP,
  openModal,
  duelistName,
  id,
  className,
}: DISPLAY_DATA) => {
  return (
    <div className={`duel-display-container ${className}`}>
      <div className="duel-display">
        <div className="duel-display-name">{duelistName}</div>
        <div className="life-bar">
          <div
            className={`life-bar-fill ${id}`}
            style={{ width: `${(currentLP / 8000) * 100}%` }}
          ></div>
          <span className="lp-ammount">{currentLP}</span>
        </div>
      </div>
      <div className="display-interact">
        {/* {passing back the operand and Lp values so the modal has the updated with knowledge of which button} */}
        <button
          onClick={() =>
            openModal({ operand: "+", player: id, currentLP, modifier: 0 })
          }
        >
          +
        </button>
        <button
          onClick={() =>
            openModal({ operand: "-", player: id, currentLP, modifier: 0 })
          }
        >
          -
        </button>
      </div>
    </div>
  );
};
export default DuelDisplay;
