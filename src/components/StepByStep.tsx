import { useContext, useEffect, useState } from "react";
import "./StepByStep.css";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeSteps } from "../services/recipeApiService";
import { Step } from "../models/Directions";
import StepCard from "./StepCard";
import TimerContext from "../context/TimerContext";
import CurrentRecipeContext from "../context/CurrentRecipeContext";

const StepByStep = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const navigate = useNavigate();
  const id: string = useParams().id!;
  const { addTimers, timers } = useContext(TimerContext);
  const { currentRecipeId, setCurrentRecipeId } =
    useContext(CurrentRecipeContext);

  useEffect(() => {
    getRecipeSteps(id).then((res) => {
      setSteps(res[0].steps);
      if ((currentRecipeId && id !== currentRecipeId) || !currentRecipeId) {
        setCurrentRecipeId(id);
        addTimers(id);
      }
    });
  }, [id]);
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
        <div className="directions-container">
          {steps.map((step, index) => {
            return (
              currentStep === index && (
                <StepCard
                  key={index}
                  index={
                    timers.findIndex((timer) => timer.step === step.number) || 0
                  }
                  step={step}
                />
              )
            );
          })}
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
            <button onClick={() => navigate(`/${id}`)}>
              Back to Info Page
            </button>
          )}
          <button onClick={() => navigate(`/`)}>Back to Home Page</button>

          <button onClick={() => navigate(`/steps/all/${id}`)}>
            See all Timers
          </button>
        </div>
      </div>
      {/* <div className="timer">
        <TimerList step={steps[currentStep]} steps={steps} />
      </div> */}
    </section>
  );
};

export default StepByStep;
