import { FunctionComponent, useReducer, useState } from "react";
import { CalculatorData, PlayerData } from "../interfaces/duelDisplayTypes";
import { duelDisplayState } from "../state/duelDisplayState";
import displayReducer from "../state/displayReducer";
import DuelDisplay from "./DuelDisplay";
import Calculator from "./Calculator";
import Modal from "./Modal/Modal";
import openModal from "./Modal/openModal";

const DuelApp: FunctionComponent<{ players: string[] }> = ({ players }) => {
  const [{ player1, player2 }, dispatch] = useReducer(
    displayReducer,
    duelDisplayState
  );
  const [toggleModal, setToggleModal] = useState(false);
  //state that gets consumed by Calculator component once passed to each Duel display
  const initialCalculationState: CalculatorData = {
    player: "player1",
    currentLP: 8000,
    operand: "+",
  };
  const [calculationData, setCalculationData] = useState<CalculatorData>(
    initialCalculationState
  );

  const itter = [player1, player2][Symbol.iterator]();
  const duelist = players.map((playerName, i) => {
    const player = itter.next().value as PlayerData;
    return (
      <DuelDisplay
        key={i}
        currentLP={player.lp}
        duelistName={player.playerName}
        openModal={(calcData: CalculatorData) =>
          openModal(calcData, { setToggleModal, setCalculationData })
        }
        id={player.playerName}
        className={`duelist duelist-${i + 1} ${
          (i === 1 && "display-reverse") || ""
        }`}
      />
    );
  });

  return (
    <section className="duel-grid-container">
      {duelist[0]}
      <div className="displayArea-middle">
        <div>Dice toss</div>
        <div>Coin flip</div>
        <div>
          <button
            onClick={() => dispatch({ type: "RESET_STATE", payload: true })}
          >
            Reset
          </button>
        </div>
        <div>logs</div>
        <div>timer</div>
      </div>
      {duelist[1]}
      <>
        {toggleModal ? (
          <Modal>
            <Calculator
              calculationData={calculationData}
              lpModifier={dispatch}
              closeModal={() => setToggleModal(false)}
            />
          </Modal>
        ) : null}
      </>
    </section>
  );
};

export default DuelApp;
