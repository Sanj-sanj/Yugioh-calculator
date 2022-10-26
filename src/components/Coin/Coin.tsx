import { FunctionComponent } from "react";
import flipTheCoin from "./Utilities";

const Coin: FunctionComponent<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  return (
    <button className="dice" onClick={closeModal}>
      <div>{flipTheCoin()}</div>
      (Tap to make me go away)
    </button>
  );
};

export default Coin;
