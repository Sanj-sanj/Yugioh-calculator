import { FunctionComponent, useReducer } from "react";
import displayReducer from "../state/displayReducer";
import { duelDisplayState } from "../state/duelDisplayState";
import DuelDisplay from "./DuelDisplay";

const DuelGrid: FunctionComponent<{ players: string[] }> = ({ players }) => {
  const [{ lp }] = useReducer(displayReducer, duelDisplayState);

  const duelist = players.map((playerName, i) => (
    <DuelDisplay
      key={i}
      currentLP={lp}
      duelistName={playerName}
      id={i}
      className={`duelist duelist-${i + 1} ${
        (i === 1 && "display-reverse") || ""
      }`}
    />
  ));
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
