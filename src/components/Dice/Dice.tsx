import { FunctionComponent } from "react";
import { DisplayActions } from "../../interfaces/DisplayTypes";
import rollTheDie from "./Utilities";

const Dice: FunctionComponent<{
  closeModal: () => void;
  dispatch: React.Dispatch<DisplayActions>;
}> = ({ closeModal, dispatch }) => {
  const diceRoll = rollTheDie();

  return (
    <button
      className="dice"
      onClick={() => {
        dispatch({
          type: "UPDATE_LOG",
          payload: [{ game: "dice", outcome: diceRoll }],
          //  minigame: { game: "dice", outcome: diceRoll } },
        });
        closeModal();
      }}
    >
      <div>{diceRoll}</div>
      (Tap to make me go away)
    </button>
  );
};

export default Dice;
