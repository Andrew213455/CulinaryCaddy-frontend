import { useContext, useEffect, useState } from "react";
import { Step } from "../models/Directions";
import "./TimerCard.css";
import { useNavigate, useParams } from "react-router-dom";
import TimerContext from "../context/TimerContext";

interface Props {
  step: Step;
  index: number;
}
const TimerCard = ({ step, index }: Props) => {
  const { startTimer, timers } = useContext(TimerContext);
  const [seconds, setSeconds] = useState(0);
  const [trigger, setTrigger] = useState(false);
  let interval: NodeJS.Timer | undefined;
  const navigate = useNavigate();
  const id: string = useParams().id!;

  useEffect(() => {
    if (trigger === true) {
      interval = setInterval(() => {
        setSeconds(timers[index]?.secondsGoneBy);
      }, 1000);
    }
  }, [timers[index]?.secondsGoneBy]);

  const pauseTimer = () => {
    clearInterval(interval);
    setTrigger(false);
  };

  const resetTimer = () => {
    setSeconds(0);
    pauseTimer();
  };

  return (
    <div className="TimerCard">
      <button
        className="start"
        onClick={() => {
          setTrigger(true);
          startTimer(index);
        }}
      >
        start timer
      </button>
      <div>
        <p>{seconds}</p>
        <button onClick={() => pauseTimer()}>Pause</button>
        <button onClick={() => resetTimer()}>Reset</button>
      </div>
      <button onClick={() => navigate(`/steps/${id}`)}>back to steps</button>
    </div>
  );
};
export default TimerCard;
