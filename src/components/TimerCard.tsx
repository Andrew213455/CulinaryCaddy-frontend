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
  const { startTimer, timers, updateTimer, pauseTimer } =
    useContext(TimerContext);

  const [seconds, setSeconds] = useState(0);
  // console.log(seconds);

  const navigate = useNavigate();
  const id: string = useParams().id!;
  console.log(timers);
  useEffect(() => {
    if (timers.length !== 0) {
      if (timers[index]?.timerStarted && timers[index]?.timeLeftOffAtMs !== 0) {
        const timeLapsed = Math.floor(
          (new Date().getTime() - timers[index].timeLeftOffAtMs) / 1000
        );
        // console.log(timeLapsed);

        setSeconds(timers[index].secondsGoneBy + timeLapsed);
        updateTimer(index);
      } else {
        setSeconds(timers[index]?.secondsGoneBy);
      }
      // console.log(timers);
    }
  }, [timers[index]?.secondsGoneBy]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timers[index]?.timerStarted) {
        setSeconds((prev) => prev + 1);
      }
    }, 1000);

    return () => {
      // console.log(seconds);

      updateTimer(index);
      clearInterval(interval);
    };
  }, [timers[index]?.timerStarted]);

  return (
    <div className="TimerCard">
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
      <button onClick={() => pauseTimer(index)}>pause timer</button>
      <div>
        <p>{seconds}</p>
      </div>
      <button onClick={() => navigate(`/steps/${id}`)}>back to steps</button>
    </div>
  );
};
export default TimerCard;
