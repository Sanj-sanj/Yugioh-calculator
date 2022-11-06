import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useReducer,
  useState,
} from "react";
import {
  CalculatorData,
  DisplayActions,
  ModalActions,
} from "../interfaces/DisplayTypes";
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
import undoPreviousCalculation from "./DuelAppUtilities";

const DuelApp: FunctionComponent = () => {
  const [{ player1, player2, log }, dispatch] = useReducer(
    displayReducer,
    duelDisplayState
  );
  //used to determine which modal 'view' state to render, under which 'player' state to use
  const [modalVisible, setModalVisible] = useState<ModalActions>({
    player: "player1",
    view: "closed",
  });
  /*
   * this state is passed to the DuelistCounter & Calculator components,
   * this data is used throughout to handle many utility functions
   */
  const [player1Data, setPlayer1Data] = useState<CalculatorData>(
    initialCalculationState.player1
  );
  const [player2Data, setPlayer2Data] = useState<CalculatorData>(
    initialCalculationState.player2
  );

  return (
    <div className="duel-grid-container">
      {/* {duelist[0]} */}
      <DuelistCounter
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
        undoLastCalculation={(data) =>
          undoPreviousCalculation(data, player1Data, dispatch)
        }
      />
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
      <DuelistCounter
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
        undoLastCalculation={(data) =>
          undoPreviousCalculation(data, player2Data, dispatch)
        }
      />
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
