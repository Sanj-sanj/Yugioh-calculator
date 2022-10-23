import {
  CalculatorData,
  ModalStateModifiers,
} from "../../interfaces/duelDisplayTypes";

function setupCalculatorModal(
  incomingData: CalculatorData,
  state: ModalStateModifiers
) {
  state.setToggleModal("calculator");
  state.setCalculationData({
    player: incomingData.player,
    currentLP: incomingData.currentLP,
    operand: incomingData.operand,
    modifier: incomingData.modifier,
  });
}

export default setupCalculatorModal;
