import { FunctionComponent } from "react";
import { CalculatorData } from "../../interfaces/duelDisplayTypes";

const Log: FunctionComponent<{ logData: CalculatorData[] }> = ({ logData }) => {
  return (
    <div>
      <pre>{JSON.stringify(logData, null, 2)}</pre>
    </div>
  );
};
export default Log;
