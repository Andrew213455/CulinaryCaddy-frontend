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
    setSeconds(timers[index].secondsGoneBy);
  }, [timers[index].secondsGoneBy]);

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
      <button onClick={() => resetTimer(index)}>Reset Timer</button>
      <button onClick={() => pauseTimer(index)}>pause timer</button>
      <div>
        <p>{seconds}</p>
      </div>
      <button onClick={() => navigate(`/steps/${id}`)}>back to steps</button>
    </div>
  );
};
export default TimerCard;
