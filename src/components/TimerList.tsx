import { useContext, useEffect, useState } from "react";
import { Step } from "../models/Directions";
import StepCard from "./StepCard";
import TimerCard from "./TimerCard";
import "./TimerList.css";
import { getRecipeSteps } from "../services/recipeApiService";
import { useNavigate, useParams } from "react-router-dom";
import TimerContext from "../context/TimerContext";
import CurrentRecipeContext from "../context/CurrentRecipeContext";

const TimerList = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const id: string = useParams().id!;
  const { addTimers } = useContext(TimerContext);
  const { currentRecipeId, setCurrentRecipeId } =
    useContext(CurrentRecipeContext);
  const navigate = useNavigate();

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
    <div className="Timer">
      <div className="title">
        <h2>All Timers</h2>
        <button onClick={() => navigate(`/steps/${id}`)}>back to steps</button>
      </div>
      <div className="steps-container">
        {steps
          .filter((item) => {
            return item.length !== undefined;
          })
          .map((step, index) => {
            return <StepCard step={step} index={index} key={index} />;
          })}
      </div>
    </div>
  );
};

export default TimerList;
