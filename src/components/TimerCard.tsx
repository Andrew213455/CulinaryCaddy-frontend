import { useEffect, useState } from "react";
import { Step } from "../models/Directions";
import "./TimerCard.css";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  step: Step;
}
const TimerCard = ({ step }: Props) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [trigger, setTrigger] = useState(false);
  let interval: NodeJS.Timer | undefined;
  const navigate = useNavigate();
  const id: string = useParams().id!;

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
  if (minutes > 59) {
    setMinutes(0);
    setHours(hours + 1);
  }

  const pauseTimer = () => {
    clearInterval(interval);
    setTrigger(false);
  };

  const resetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    pauseTimer();
  };

  return (
    <div className="TimerCard">
      <p>step number: {step.number}</p>
      <p>step: {step.step}</p>
      <button className="start" onClick={() => setTrigger(true)}>
        start timer
      </button>
      <div>
        <p>
          {" "}
          {hours > 9 ? hours : "0" + hours} :{" "}
          {minutes > 9 ? minutes : "0" + minutes} :{" "}
          {seconds > 9 ? seconds : "0" + seconds}
        </p>
        <button onClick={() => pauseTimer()}>Pause</button>
        <button onClick={() => resetTimer()}>Reset</button>
      </div>
      <button onClick={() => navigate(`/steps/${id}`)}>back to steps</button>
    </div>
  );
};
export default TimerCard;
