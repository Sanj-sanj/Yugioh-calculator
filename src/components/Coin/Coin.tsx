import { Dispatch, FunctionComponent } from "react";
import { DisplayActions } from "../../interfaces/DisplayTypes";
import flipTheCoin from "./Utilities";

const Coin: FunctionComponent<{
  closeModal: () => void;
  dispatch: Dispatch<DisplayActions>;
}> = ({ closeModal, dispatch }) => {
  const flippedCoin = flipTheCoin();

  return (
    <button
      className="dice"
      onClick={() => {
        dispatch({
          type: "UPDATE_LOG",
          payload: [
            {
              game: "coin",
              outcome: flippedCoin.toLowerCase() as "heads" | "tails",
            },
          ],
        });
        closeModal();
      }}
    >
      <div>{flippedCoin}</div>
      (Tap to make me go away)
    </button>
  );
};

export default Coin;
