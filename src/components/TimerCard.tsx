import { useContext, useEffect, useState } from "react";
import { Step } from "../models/Directions";
import "./TimerCard.css";
import { useNavigate, useParams } from "react-router-dom";
import TimerContext from "../context/TimerContext";
import CurrentRecipeContext from "../context/CurrentRecipeContext";
interface Props {
  step: Step;
  index: number;
}
const TimerCard = ({ step, index }: Props) => {
  const { startTimer, timers, pauseTimer, resetTimer } =
    useContext(TimerContext);
  const [seconds, setSeconds] = useState(0);
  // console.log(seconds);
  const navigate = useNavigate();
  const id: string = useParams().id!;
  useEffect(() => {
    setSeconds(timers[index]?.secondsGoneBy);
  }, [timers[index]?.secondsGoneBy]);

  const formatTime = (second: number): string => {
    let minutes = 0;
    let hours = 0;
    while (second > 59) {
      if (second > 59) {
        minutes++;
        second -= 60;
      }
      if (minutes > 59) {
        hours++;
        minutes -= 60;
      }
    }
    return `${hours <= 9 ? `0${hours}` : hours} : ${
      minutes <= 9 ? `0${minutes}` : minutes
    } : ${second <= 9 ? `0${second}` : second}`;
  };

  return (
    <section className="TimerCard">
      <div className="timer-right">
        <p>{formatTime(seconds)}</p>
      </div>
      <div className="timer-left">
        {step.length?.number && (
          <div
            className={
              seconds >= step.length.number * 60
                ? "red status"
                : seconds >= step.length.number * 60 - 60
                ? "yellow status"
                : seconds < step.length.number * 60 - 60
                ? "green status"
                : "green status"
            }
          ></div>
        )}
        <button
          className="start"
          onClick={() => {
            // console.log(step.number);
            // console.log(index);
            startTimer(index);
          }}
        >
          start timer
        </button>
        <button onClick={() => resetTimer(index)}>Reset Timer</button>
        <button onClick={() => pauseTimer(index)}>pause timer</button>
      </div>
    </section>
  );
};
export default TimerCard;
