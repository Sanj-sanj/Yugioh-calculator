import { FunctionComponent, useReducer, useState } from "react";
import { CalculatorData, ModalActions } from "../interfaces/DisplayTypes";
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
  const [modalVisible, setModalVisible] = useState<ModalActions>({
    player: "player1",
    view: "closed",
  });

  //this state is passed to the DuelistCounter components, which only really uses updates the operand && currentLP for any given calculation (p1, p2)
  const [player1Data, setPlayer1Data] = useState<CalculatorData>(
    initialCalculationState.player1
  );
  const [player2Data, setPlayer2Data] = useState<CalculatorData>(
    initialCalculationState.player2
  );

  return (
    <div className="duel-grid-container">
      <DuelistCounter
        duelistName={player1.duelistName}
        className="duelist duelist-1"
        playerData={player1}
        calculatorData={player1Data}
        openModal={(calcData) => {
          setModalVisible({ player: "player1", view: "calculator" });
          setPlayer1Data(calcData);
        }}
        halfLp={(data) => {
          setPlayer1Data(data);
          dispatch({ type: "HALF_LP", payload: data.player });
          dispatch({ type: "UPDATE_LOG", payload: [data] });
        }}
        undo={() => {
          dispatch({
            type: "UNDO",
            payload: {
              name: player1Data.player,
              adjustedLP: player1Data.currentLP,
            },
          });
        }}
      />
      {/* {duelist[0]} */}
      <div className="displayArea-middle">
        <button
          onClick={() =>
            setModalVisible({ player: modalVisible.player, view: "dice" })
          }
        >
          Dice toss
        </button>
        <button
          onClick={() =>
            setModalVisible({ player: modalVisible.player, view: "coin" })
          }
        >
          Coin
        </button>
        <button
          onClick={() => dispatch({ type: "RESET_STATE", payload: true })}
        >
          Reset
        </button>
        <button
          onClick={() =>
            setModalVisible({ player: modalVisible.player, view: "log" })
          }
        >
          Logs
        </button>
        <div>timer</div>
      </div>
      {/* {duelist[1]} */}
      {/* maybe my approach to dispatching actions are wrong
      I could create dispatch functions for addition, subtraction and division and 
      pass each indivually as a prop item instead of handling it at the component level */}
      <DuelistCounter
        duelistName={player2.duelistName}
        className="duelist duelist-2 display-reverse"
        calculatorData={player2Data}
        playerData={player2}
        openModal={(calcData) => {
          setModalVisible({ player: "player2", view: "calculator" });
          setPlayer2Data(calcData);
        }}
        halfLp={(data) => {
          setPlayer2Data(data);
          dispatch({ type: "HALF_LP", payload: data.player });
          dispatch({ type: "UPDATE_LOG", payload: [data] });
        }}
        undo={(data) => {
          dispatch({
            type: "UNDO",
            payload: {
              name: player2Data.player,
              adjustedLP: player2Data.currentLP,
            },
          });
          dispatch({
            type: "UPDATE_LOG",
            payload: [
              {
                ...player2Data,
                currentLP: data.remainder
                  ? data.remainder
                  : player2Data.currentLP,
                remainder: data.currentLP,
                operand:
                  data.operand === "/" ? "*" : data.operand === "+" ? "-" : "+",
              },
            ],
          });
        }}
      />{" "}
      <>
        {modalVisible.view === "calculator" ? (
          <Modal>
            <Calculator
              calculationData={
                modalVisible.player === "player1" ? player1Data : player2Data
              }
              displayDispatch={dispatch}
              closeModal={() =>
                setModalVisible({ player: modalVisible.player, view: "closed" })
              }
            />
          </Modal>
        ) : modalVisible.view === "log" ? (
          <Modal>
            <Log
              logData={log}
              closeModal={() =>
                setModalVisible({ player: modalVisible.player, view: "closed" })
              }
            />
          </Modal>
        ) : modalVisible.view === "dice" ? (
          <Modal>
            <Dice
              closeModal={() =>
                setModalVisible({ player: modalVisible.player, view: "closed" })
              }
              dispatch={dispatch}
            />
          </Modal>
        ) : modalVisible.view === "coin" ? (
          <Modal>
            <Coin
              dispatch={dispatch}
              closeModal={() =>
                setModalVisible({ player: modalVisible.player, view: "closed" })
              }
            />
          </Modal>
        ) : null}
      </>
    </div>
  );
};

export default DuelApp;
