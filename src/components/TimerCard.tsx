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
      <div className="timerContainer">
        <div className="time-left">
          <p>00</p>
          <div>:</div>
          <p>{seconds < 10 ? "0" + seconds : seconds}</p>
        </div>
        <div className="time-right">
          <div className="time-status"></div>
          <button className="reset" onClick={() => resetTimer()}>
            Reset
          </button>
          <button className="pause" onClick={() => pauseTimer()}>
            Pause
          </button>
          <button
            className="start"
            onClick={() => {
              setTrigger(true);
              startTimer(index);
            }}
          >
            start
          </button>
        </div>
      </div>
    </div>
  );
};
export default TimerCard;
