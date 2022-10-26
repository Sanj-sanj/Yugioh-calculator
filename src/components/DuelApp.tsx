import { FunctionComponent, useReducer, useState } from "react";
import {
  CalculatorData,
  ModalViews,
  PlayerData,
} from "../interfaces/duelDisplayTypes";
import {
  duelDisplayState,
  initialCalculationState,
} from "../state/duelDisplayState";
import displayReducer from "../state/displayReducer";
import DuelistCounter from "./DuelistCounter";
import Calculator from "./Calculator/Calculator";
import Modal from "./Modal/Modal";
import setupCalculatorModal from "./Modal/setupCalculatorModal";
import Log from "./Log/Log";
import Dice from "./Dice/Dice";
import Coin from "./Coin/Coin";

const DuelApp: FunctionComponent<{ players: string[] }> = ({ players }) => {
  const [{ player1, player2, log }, dispatch] = useReducer(
    displayReducer,
    duelDisplayState
  );

  //convert this state into a string, which will only accept strings of spcifc actions ex: calculator | Dice | logs | coin
  //these strings will be used to determine which modal to render
  const [toggleModal, setToggleModal] = useState<ModalViews>("closed");

  const [calculationData, setCalculationData] = useState<CalculatorData>(
    initialCalculationState
  );

  const itter = [player1, player2][Symbol.iterator]();
  const duelist = players.map((playerName, i) => {
    const player = itter.next().value as PlayerData;
    return (
      <DuelistCounter
        key={i}
        currentLP={player.lp}
        duelistName={player.playerName}
        openModal={(calcData: CalculatorData) =>
          setupCalculatorModal(calcData, { setToggleModal, setCalculationData })
        }
        id={player.playerName}
        className={`duelist duelist-${i + 1} ${
          (i === 1 && "display-reverse") || ""
        }`}
      />
    );
  });

  return (
    <div className="duel-grid-container">
      {duelist[0]}
      <div className="displayArea-middle">
        <div>
          <button onClick={() => setToggleModal("dice")}>Dice toss</button>
        </div>
        <div>
          <button onClick={() => setToggleModal("coin")}>Coin</button>
        </div>
        <div>
          <button
            onClick={() => dispatch({ type: "RESET_STATE", payload: true })}
          >
            Reset
          </button>
        </div>
        <div>
          <button onClick={() => setToggleModal("log")}>Logs</button>
        </div>
        <div>timer</div>
      </div>
      {duelist[1]}
      <>
        {toggleModal === "calculator" ? (
          <Modal>
            <Calculator
              calculationData={calculationData}
              displayDispatch={dispatch}
              closeModal={() => setToggleModal("closed")}
            />
          </Modal>
        ) : toggleModal === "log" ? (
          <Modal>
            <Log logData={log} closeModal={() => setToggleModal("closed")} />
          </Modal>
        ) : toggleModal === "dice" ? (
          <Modal>
            <Dice closeModal={() => setToggleModal("closed")} />
          </Modal>
        ) : toggleModal === "coin" ? (
          <Modal>
            <Coin closeModal={() => setToggleModal("closed")} />
          </Modal>
        ) : null}
      </>
    </div>
  );
};

export default DuelApp;
