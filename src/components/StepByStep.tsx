import { useEffect, useState } from "react";
import "./StepByStep.css";
import { useParams } from "react-router-dom";
import { getRecipeSteps } from "../services/recipeApiService";
import { Step } from "../models/Directions";
import StepCard from "./StepCard";

const StepByStep = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const id: string = useParams().id!;

  console.log(id);

  useEffect(() => {
    getRecipeSteps(id).then((res) => {
      setSteps(res[0].steps);
    });
  }, []);

  console.log(steps);
  return (
    <section className="StepByStep">
      <div className="directions">
        <button
          onClick={() => {
            setCurrentStep(currentStep - 1);
          }}
        >
          previous step
        </button>
        <h2>Step #</h2>
        <div className="directions-container">
          {steps.map(
            (step, index) =>
              currentStep === index && (
                <StepCard key={index} index={index} step={step} />
              )
          )}
        </div>
        <div className="button-container">
          <button
            className="next"
            onClick={() => {
              setCurrentStep(currentStep + 1);
            }}
          >
            next step
          </button>
          <button className="start">set timer</button>
        </div>
      </div>
      <div className="timer"></div>
    </section>
  );
};

export default StepByStep;
