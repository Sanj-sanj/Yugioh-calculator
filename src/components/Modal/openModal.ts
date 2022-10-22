import {
  CalculatorData,
  ModalStateModifiers,
} from "../../interfaces/duelDisplayTypes";

function openModal(incomingData: CalculatorData, state: ModalStateModifiers) {
  state.setToggleModal(true);
  state.setCalculationData({
    player: incomingData.player,
    currentLP: incomingData.currentLP,
    operand: incomingData.operand,
    modifier: incomingData.modifier,
  });
}

export default openModal;
