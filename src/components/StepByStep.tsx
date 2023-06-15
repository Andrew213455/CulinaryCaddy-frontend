import { useEffect, useState } from "react";
import "./StepByStep.css";
import { Link, useParams } from "react-router-dom";
import { getRecipeSteps } from "../services/recipeApiService";
import { Step } from "../models/Directions";
import StepCard from "./StepCard";

import TimerList from "./TimerList";

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
          disabled={currentStep <= 0 ? true : false}
          onClick={() => {
            setCurrentStep(currentStep - 1);
          }}
        >
          previous step
        </button>

        <div className="directions-container">
          {steps.map(
            (step, index) =>
              currentStep === index && (
                <StepCard key={index} index={index} step={step} />
              )
          )}
        </div>
        <div className="button-container">
          {currentStep !== steps.length ? (
            <button
              className="next"
              onClick={() => {
                setCurrentStep(currentStep + 1);
              }}
            >
              next step
            </button>
          ) : (
            <Link to={`/${id}`}>
              <button>Back to Info Page</button>
            </Link>
          )}
          <Link to="/">
            <button>Back to Home Page</button>
          </Link>
        </div>
      </div>
      <div className="timer">
        <TimerList step={steps[currentStep]} />
      </div>
    </section>
  );
};

export default StepByStep;
