import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useReducer,
  useState,
} from "react";
import {
  CalculatorData,
  Operands,
  PlayerData,
  PlayerNames,
} from "../interfaces/duelDisplayTypes";
import { duelDisplayState } from "../state/duelDisplayState";
import displayReducer from "../state/displayReducer";
import DuelDisplay from "./DuelDisplay";
import Modal from "./Modal";
import Calculator from "./Calculator";

const DuelGrid: FunctionComponent<{ players: string[] }> = ({ players }) => {
  const [{ player1, player2 }, dispatch] = useReducer(
    displayReducer,
    duelDisplayState
  );

  const [toggleModal, setToggleModal] = useState(false);

  function openModal(
    operand: Operands,
    player: PlayerNames,
    currentLP: number
  ) {
    setToggleModal(true);
    setCalculationData({
      player: player,
      currentLP: currentLP,
      operand: operand,
    });
  }

  const [calculationData, setCalculationData] = useState<CalculatorData>({
    player: "player1",
    currentLP: 8000,
    operand: "+",
  });

  const itter = [player1, player2][Symbol.iterator]();
  const duelist = players.map((playerName, i) => {
    const player = itter.next().value as PlayerData;
    return (
      <DuelDisplay
        key={i}
        currentLP={player.lp}
        duelistName={player.playerName}
        openModal={openModal}
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
        <div>reset</div>
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

export default DuelGrid;
