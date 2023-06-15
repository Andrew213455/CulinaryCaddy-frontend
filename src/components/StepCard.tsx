import Directions, { Step } from "../models/Directions";
import "./StepCard.css";

interface Props {
  index: number;
  step: Step;
}

const StepCard = ({ index, step }: Props) => {
  // const [theIndex, setTheIndex] = useState<Directions[]>([0])
  console.log(step);

  return (
    <div className="StepCard">
      <h2>Step {step.number}</h2>
      <p>{step.step}</p>
    </div>
  );
};

export default StepCard;
