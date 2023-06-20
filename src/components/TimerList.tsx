import { useContext, useEffect, useState } from "react";
import { Step } from "../models/Directions";
import StepCard from "./StepCard";
import TimerCard from "./TimerCard";
import "./TimerList.css";
import { getRecipeSteps } from "../services/recipeApiService";
import { useNavigate, useParams } from "react-router-dom";
import TimerContext from "../context/TimerContext";

const TimerList = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const id: string = useParams().id!;
  const { addTimers } = useContext(TimerContext);
  const navigate = useNavigate();

  useEffect(() => {
    getRecipeSteps(id).then((res) => {
      setSteps(res[0].steps);
      addTimers(res[0].steps);
    });
  }, []);
  return (
    <div>
      <button onClick={() => navigate(`/steps/${id}`)}>back to steps</button>
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
