import { useEffect, useState } from "react";
import "./StepByStep.css";
import { useParams } from "react-router-dom";
import { getRecipeSteps } from "../services/recipeApiService";
import Directions from "../models/Directions";

const StepByStep = () => {
  const [steps, setSteps] = useState<Directions[]>([]);

  const id: string = useParams().id!;

  console.log(id);

  useEffect(() => {
    getRecipeSteps(id).then((res) => {
      setSteps(res);
    });
  }, []);

  console.log(steps);
  return (
    <section className="StepByStep">
      <div className="directions">
        <button>previous step</button>
        <h2>Step #</h2>
        <div className="directions-container">
          <p>Direction: </p>
        </div>
        <div className="button-container">
          <button className="next">next step</button>
          <button className="start">set timer</button>
        </div>
      </div>
      <div className="timer"></div>
    </section>
  );
};

export default StepByStep;
