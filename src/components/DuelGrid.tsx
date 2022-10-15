import { FunctionComponent } from "react";
import DuelDisplay from "./DuelDisplay";

const DuelGrid: FunctionComponent<{ players: string[] }> = ({ players }) => {
  const duelistsComponent = players.map((playerName, i) => (
    <DuelDisplay
      key={i}
      currentLP={8000}
      duelistName={playerName}
      id={i}
      className={`duelist duelist-${i + 1}`}
    />
  ));
  return (
    <section className="duel-grid-container">
      <div className="displayArea-edge">{duelistsComponent[0]}</div>
      <div className="displayArea-middle">
        <div>Dice toss</div>
        <div>Coin flip</div>
        <div>reset</div>
        <div>logs</div>
        <div>timer</div>
      </div>
      <div className="displayArea-edge">{duelistsComponent[1]}</div>
    </section>
  );
};

export default DuelGrid;
