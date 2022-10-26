import { FunctionComponent } from "react";
import rollTheDie from "./Utilities";
const Dice: FunctionComponent<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  return (
    <button className="dice" onClick={closeModal}>
      <div>{rollTheDie()}</div>
      (Tap to make me go away)
    </button>
  );
};

export default Dice;
