import { useEffect, useState } from "react";
import { Step } from "../models/Directions";
import "./TimerCard.css";
interface Props {
  step: Step;
}
const TimerCard = ({ step }: Props) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [trigger, setTrigger] = useState(false);
  let interval: NodeJS.Timer | undefined;
  const getTime = () => {
    // const time = Date.parse(deadline) - Date.now();
  };
  useEffect(() => {
    if (trigger) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [trigger]);
  if (seconds > 59) {
    setSeconds(0);
    setMinutes(minutes + 1);
  }
  if (step?.length !== undefined) {
    console.log(step?.length.number);
  }
  return (
    <div className="TimerCard">
      <button className="start" onClick={() => setTrigger(true)}>
        set timer
      </button>
      <div>
        <p>
          {" "}
          {hours} : {minutes} : {seconds}
        </p>
      </div>
      {/* {step?.length !== undefined ? <p>{step.length.number}</p> : <p>derp</p>} */}
    </div>
  );
};
export default TimerCard;
