import Directions, { Step } from "../models/Directions";
import "./StepCard.css";
import TimerCard from "./TimerCard";

interface Props {
  index: number;
  step: Step;
}

const StepCard = ({ index, step }: Props) => {
  // const [theIndex, setTheIndex] = useState<Directions[]>([0])

  return (
    <div className="StepCard">
      <h2>Step {step.number}</h2>
      <p>step: {step.step}</p>
      {step.length && (
        <div>
          <TimerCard step={step} index={index} />
        </div>
      )}
    </div>
  );
};

export default StepCard;
