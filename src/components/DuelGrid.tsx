import { FunctionComponent, useReducer } from "react";
import { PlayerData } from "../interfaces/duelDisplayTypes";
import displayReducer from "../state/displayReducer";
import { duelDisplayState } from "../state/duelDisplayState";
import DuelDisplay from "./DuelDisplay";

const DuelGrid: FunctionComponent<{ players: string[] }> = ({ players }) => {
  const [{ player1, player2 }, dispatch] = useReducer(
    displayReducer,
    duelDisplayState
  );
  const itter = [player1, player2][Symbol.iterator]();

  const duelist = players.map((playerName, i) => {
    const player = itter.next().value as PlayerData;

    return (
      <DuelDisplay
        key={i}
        currentLP={player.lp}
        lpModifier={dispatch}
        duelistName={playerName}
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
    </section>
  );
};

export default DuelGrid;
