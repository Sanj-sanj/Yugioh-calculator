import { FunctionComponent } from "react";
import { Operands, PlayerNames } from "../interfaces/duelDisplayTypes";

type DISPLAY_DATA = {
  currentLP: number;
  duelistName: string;
  id: PlayerNames;
  openModal: (
    operand: Operands,
    player: PlayerNames,
    currentLP: number
  ) => void;
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
          <div>{currentLP}</div>
        </div>
      </div>
      <div className="display-interact">
        <button onClick={() => openModal("+", id, currentLP)}>+</button>
        <button onClick={() => openModal("-", id, currentLP)}>-</button>
      </div>
    </div>
  );
};
export default DuelDisplay;
