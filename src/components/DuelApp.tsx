import { FunctionComponent, useReducer, useState } from "react";
import { CalculatorData, ModalViews } from "../interfaces/DisplayTypes";
import {
  duelDisplayState,
  initialCalculationState,
} from "../state/duelDisplayState";
import displayReducer from "../state/displayReducer";
import DuelistCounter from "./Counter/DuelistCounter";
import Calculator from "./Calculator/Calculator";
import Modal from "./Modal/Modal";
import Log from "./Log/Log";
import Dice from "./Dice/Dice";
import Coin from "./Coin/Coin";

const DuelApp: FunctionComponent = () => {
  const [{ player1, player2, log }, dispatch] = useReducer(
    displayReducer,
    duelDisplayState
  );
  //these strings will be used to determine which modal to render
  const [toggleModal, setToggleModal] = useState<ModalViews>("closed");

  //this state is passed to the DuelistCounter components, which only really uses updates the operand && currentLP for any given calculation (p1, p2)
  const [calculationData, setCalculationData] = useState<CalculatorData>(
    initialCalculationState
  );

  return (
    <div className="duel-grid-container">
      <DuelistCounter
        duelistName={player1.duelistName}
        className="duelist duelist-1"
        playerData={player1}
        calculatorData={calculationData}
        openModal={(calcData) => {
          setToggleModal("calculator");
          setCalculationData(calcData);
        }}
        halfLp={(data) => {
          setCalculationData(data);
          dispatch({ type: "HALF_LP", payload: data.player });
          dispatch({ type: "UPDATE_LOG", payload: data });
        }}
      />
      {/* {duelist[0]} */}
      <div className="displayArea-middle">
        <button onClick={() => setToggleModal("dice")}>Dice toss</button>
        <button onClick={() => setToggleModal("coin")}>Coin</button>
        <button
          onClick={() => dispatch({ type: "RESET_STATE", payload: true })}
        >
          Reset
        </button>
        <button onClick={() => setToggleModal("log")}>Logs</button>
        <div>timer</div>
      </div>
      {/* {duelist[1]} */}
      <DuelistCounter
        duelistName={player2.duelistName}
        className="duelist duelist-2 display-reverse"
        calculatorData={calculationData}
        playerData={player2}
        openModal={(calcData) => {
          setToggleModal("calculator");
          setCalculationData(calcData);
        }}
        halfLp={(data) => {
          setCalculationData(data);
          dispatch({ type: "HALF_LP", payload: data.player });
          dispatch({ type: "UPDATE_LOG", payload: data });
        }}
      />{" "}
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
