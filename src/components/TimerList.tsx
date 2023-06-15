import { Step } from "../models/Directions";
import TimerCard from "./TimerCard";
import "./TimerList.css";

interface Props {
  step: Step;
}

const TimerList = ({ step }: Props) => {
  return (
    <div>
      <TimerCard step={step} />
      <button className="start">set timer</button>
    </div>
  );
};

export default TimerList;
