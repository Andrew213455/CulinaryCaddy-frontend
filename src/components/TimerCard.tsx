import { useState } from "react";
import { Step } from "../models/Directions";
import "./TimerCard.css";

interface Props {
  step: Step;
}

const TimerCard = ({ step }: Props) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const getTime = () => {
    // const time = Date.parse(deadline) - Date.now();
  };

  if (step?.length !== undefined) {
    console.log(step?.length.number);
  }

  return (
    <div className="TimerCard">
      <table>
        <thead>
          <tr>
            <td>
              <span>Show Timer</span>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>blah</td>
          </tr>
        </tbody>
      </table>
      {step?.length !== undefined ? <p>{step.length.number}</p> : <p>derp</p>}
    </div>
  );
};

export default TimerCard;
