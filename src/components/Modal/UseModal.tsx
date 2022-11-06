import { Dispatch, useEffect, useState } from "react";
import {
  CalculatorData,
  DisplayActions,
  LogData,
  ModalActions,
} from "../../interfaces/DisplayTypes";
import Calculator from "../Calculator/Calculator";
import Coin from "../Coin/Coin";
import Dice from "../Dice/Dice";
import Log from "../Log/Log";
import Modal from "./Modal";

export default function UseModal(
  playerData: { player1: CalculatorData; player2: CalculatorData },
  { log, dispatch }: { log: LogData; dispatch: Dispatch<DisplayActions> }
) {
  const [modalVisible, setModalVisible] = useState<ModalActions>({
    player: "player1",
    view: "closed",
  });
  const [currentModal, setCurrentModal] = useState<JSX.Element | null>();

  const getPlayerData = () => playerData[modalVisible.player];
  useEffect(() => {
    console.log("oh pls no");
    if (modalVisible.view !== "closed") {
      setCurrentModal(modals[modalVisible.view]);
    } else {
      setCurrentModal(null);
    }
  }, [modalVisible.view]);

  const closeModal = () =>
    setModalVisible({ player: modalVisible.player, view: "closed" });

  const modals = {
    calculator: (
      <Modal>
        <Calculator
          calculationData={getPlayerData()}
          displayDispatch={dispatch}
          closeModal={closeModal}
        />
      </Modal>
    ),
    log: (
      <Modal>
        <Log logData={log} closeModal={closeModal} />
      </Modal>
    ),
    dice: (
      <Modal>
        <Dice closeModal={closeModal} dispatch={dispatch} />
      </Modal>
    ),
    coin: (
      <Modal>
        <Coin dispatch={dispatch} closeModal={closeModal} />
      </Modal>
    ),
  };

  return { currentModal, modalVisible, setModalVisible };
}
