import { FunctionComponent } from "react";
import { LogData } from "../../interfaces/DisplayTypes";

const Log: FunctionComponent<{
  logData: LogData;
  closeModal: () => void;
}> = ({ logData, closeModal }) => {
  return (
    <section className="log">
      <button onClick={closeModal}>
        {logData.length === 0 ? (
          <>
            <div>Start dueling to fill up the log!</div>
            <div>Tap/Click on the log to close this dialogue.</div>
          </>
        ) : (
          logData.map((data, i) => {
            return "player" in data ? (
              <div key={i} className="log-entry">
                <h6>Player {data.player.slice(-1)}</h6>
                <div>
                  {data.currentLP} {data.operand} {data.modifier} ={" "}
                  {data.remainder}
                </div>
              </div>
            ) : (
              <div key={i} className="log-entry">
                <h6>Mini-Game: {data.game}</h6>
                <div>{data.outcome}</div>
              </div>
            );
          })
        )}
      </button>
    </section>
  );
};
export default Log;
