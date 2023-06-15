import { useEffect, useState } from "react";
import { Step } from "../models/Directions";
import StepCard from "./StepCard";
import TimerCard from "./TimerCard";
import "./TimerList.css";
import { getRecipeSteps } from "../services/recipeApiService";
import { useParams } from "react-router-dom";

const TimerList = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const id: string = useParams().id!;

  useEffect(() => {
    getRecipeSteps(id).then((res) => {
      setSteps(res[0].steps);
    });
  }, []);
  return (
    <div>
      {steps.map((step, index) => {
        return step.length !== undefined ? (
          <StepCard step={step} index={index} />
        ) : (
          <></>
        );
      })}
    </div>
  );
};

export default TimerList;
