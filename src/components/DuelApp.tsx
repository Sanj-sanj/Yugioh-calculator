import { FunctionComponent, useReducer, useState } from "react";
import { CalculatorData } from "../interfaces/DisplayTypes";
import {
  duelDisplayState,
  initialCalculationState,
} from "../state/duelDisplayState";
import displayReducer from "../state/displayReducer";
import DuelistCounter from "./Counter/DuelistCounter";
import undoPreviousCalculation from "./DuelAppUtilities";
import UseModal from "./Modal/UseModal";

const DuelApp: FunctionComponent = () => {
  const [{ player1, player2, log }, dispatch] = useReducer(
    displayReducer,
    duelDisplayState
  );
  /*
   * this state is passed to the DuelistCounter & Calculator components,
   * this data is used throughout to handle many utility functions
   */
  const [playersData, setPlayersData] = useState<{
    player1: CalculatorData;
    player2: CalculatorData;
  }>(initialCalculationState);

  //used to determine which modal 'view' state to render, under which 'player' state to use
  const { currentModal, modalVisible, setModalVisible } = UseModal(
    playersData,
    { log, dispatch, setPlayersData }
  );

  return (
    <div className="duel-grid-container">
      {/* {duelist[0]} */}
      <DuelistCounter
        playerData={player1}
        calculatorData={playersData.player1}
        openModal={(calcData) => {
          setModalVisible({ player: "player1", view: "calculator" });
          setPlayersData({ ...playersData, player1: calcData });
        }}
        halfLp={(data) => {
          setPlayersData({ ...playersData, player1: data });
          dispatch({ type: "HALF_LP", payload: data.player });
          dispatch({ type: "UPDATE_LOG", payload: [data] });
        }}
        undoLastCalculation={(data) =>
          undoPreviousCalculation(data, playersData.player1, dispatch)
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
        calculatorData={playersData.player2}
        playerData={player2}
        openModal={(calcData) => {
          setModalVisible({ player: "player2", view: "calculator" });
          setPlayersData({ ...playersData, player2: calcData });
        }}
        halfLp={(data) => {
          setPlayersData({ ...playersData, player2: data });
          dispatch({ type: "HALF_LP", payload: data.player });
          dispatch({ type: "UPDATE_LOG", payload: [data] });
        }}
        undoLastCalculation={(data) =>
          undoPreviousCalculation(data, playersData.player2, dispatch)
        }
      />
      <>{currentModal}</>
    </div>
  );
};

export default DuelApp;
