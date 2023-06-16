import { useContext, useEffect, useState } from "react";
import { Step } from "../models/Directions";
import StepCard from "./StepCard";
import TimerCard from "./TimerCard";
import "./TimerList.css";
import { getRecipeSteps } from "../services/recipeApiService";
import { useParams } from "react-router-dom";
import TimerContext from "../context/TimerContext";

const TimerList = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const id: string = useParams().id!;
  const { addTimers } = useContext(TimerContext);

  useEffect(() => {
    getRecipeSteps(id).then((res) => {
      setSteps(res[0].steps);
      addTimers(res[0].steps);
    });
  }, []);
  return (
    <div>
      {steps
        .filter((item) => {
          return item.length !== undefined;
        })
        .map((step, index) => {
          return <StepCard step={step} index={index} key={index} />;
        })}
    </div>
  );
};

export default TimerList;
