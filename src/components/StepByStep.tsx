import { useContext, useEffect, useState } from "react";
import "./StepByStep.css";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeSteps } from "../services/recipeApiService";
import { Step } from "../models/Directions";
import StepCard from "./StepCard";
import TimerContext from "../context/TimerContext";

const StepByStep = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const navigate = useNavigate();
  const id: string = useParams().id!;
  const { addTimers } = useContext(TimerContext);

  useEffect(() => {
    getRecipeSteps(id).then((res) => {
      setSteps(res[0].steps);
      addTimers(res[0].steps);
    });
  }, []);

  return (
    <section className="StepByStep">
      <div className="directions">
        <div className="directions-container">
          {steps.map(
            (step, index) =>
              currentStep === index && (
                <StepCard key={index} index={index} step={step} />
              )
          )}
        </div>
      </div>
      <div className="button-container">
        <button
          onClick={() => {
            setCurrentStep(currentStep - 1);
          }}
        >
          previous step
        </button>
        <button onClick={() => navigate(`/steps/all/${id}`)}>
          See all Timers
        </button>
        <button onClick={() => navigate(`/`)}>Back to Home Page</button>
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
          <button onClick={() => navigate(`/${id}`)}>Back to Info Page</button>
        )}
      </div>
      {/* <div className="timer">
        <TimerList step={steps[currentStep]} steps={steps} />
      </div> */}
    </section>
  );
};

export default StepByStep;
