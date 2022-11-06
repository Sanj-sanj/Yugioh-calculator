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
  const [player1Data, setPlayer1Data] = useState<CalculatorData>(
    initialCalculationState.player1
  );
  const [player2Data, setPlayer2Data] = useState<CalculatorData>(
    initialCalculationState.player2
  );

  //used to determine which modal 'view' state to render, under which 'player' state to use
  const { currentModal, modalVisible, setModalVisible } = UseModal(
    { player1: player1Data, player2: player2Data },
    {
      log,
      dispatch,
    }
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
      <>{currentModal}</>
    </div>
  );
};

export default DuelApp;
