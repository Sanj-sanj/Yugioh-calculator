import { FunctionComponent } from "react";
import { CalculatorData } from "../../interfaces/duelDisplayTypes";

const Log: FunctionComponent<{
  logData: CalculatorData[];
  closeModal: () => void;
}> = ({ logData, closeModal }) => {
  return (
    <button className="log" onClick={closeModal}>
      {logData.length === 0 ? (
        <>
          <div>Start dueling to fill up the log!</div>
          <div>Tap/Click on the log to close this dialogue.</div>
        </>
      ) : (
        logData.map((data, i) => (
          <div key={i} className="log-entry">
            <h6>{data.player}</h6>
            <div>
              {data.currentLP} {data.operand} {data.modifier} ={" "}
              {data.operand === "+"
                ? data.currentLP + data.modifier
                : data.currentLP - data.modifier}
            </div>
          </div>
        ))
      )}
    </button>
  );
};
export default Log;
