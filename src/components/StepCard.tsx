import { useEffect, useState } from "react";
import Directions, { Step } from "../models/Directions";
import "./StepCard.css";
import TimerCard from "./TimerCard";
import {
  getIngredientsById,
  getRecipeSteps,
} from "../services/recipeApiService";
import { useParams } from "react-router-dom";

interface Props {
  index: number;
  step: Step;
}

const StepCard = ({ index, step }: Props) => {
  // const [theIndex, setTheIndex] = useState<Directions[]>([0])
  console.log(step);
  return (
    <section className="StepCard">
      <div className="Step-container">
        <h2>Step {step.number}</h2>
        <p>step: {step.step}</p>
      </div>
      <div className="ingredients">{step.ingredients.name}</div>
      <div className="timer-container">
        {step.length && (
          <div className="timer">
            <TimerCard step={step} index={index} />
          </div>
        )}
      </div>
    </section>
  );
};

export default StepCard;
