import { FunctionComponent } from "react";
import { DisplayActions, PlayerNames } from "../interfaces/duelDisplayTypes";

type DISPLAY_DATA = {
  currentLP: number;
  lpModifier: React.Dispatch<DisplayActions>;
  duelistName: string;
  id: PlayerNames;
  toggleModal: (operand: string) => void;
  className: string;
};

const DuelDisplay: FunctionComponent<DISPLAY_DATA> = ({
  currentLP,
  lpModifier,
  toggleModal,
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
        <button onClick={(e) => toggleModal(e.currentTarget.innerText)}>
          +
        </button>
        <button
          onClick={() =>
            lpModifier({
              type: "DECREMENT",
              payload: { player: id, operand2: 100 },
            })
          }
        >
          -
        </button>
      </div>
    </div>
  );
};
export default DuelDisplay;
