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

  return (
    <section className="StepCard">
      <div className="Step-container">
        <h2>Step {step.number}</h2>
        <p>step: {step.step}</p>
      </div>
      <div className="ingredients">
        <p>
          Ingredients:{" "}
          {step.ingredients.map((item, index) => {
            return step.ingredients.length === index + 1 ? (
              <span> {item.name} </span>
            ) : (
              <span> {item.name} | </span>
            );
          })}{" "}
          {step.ingredients.length === 0 && (
            <span>No ingredients needed for this step</span>
          )}
        </p>
      </div>
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
