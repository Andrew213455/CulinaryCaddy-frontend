import "./Rundown.css";
import { useEffect, useState } from "react";
import { getRecipeSteps } from "../services/recipeApiService";
import { useNavigate, useParams } from "react-router-dom";
import { Step } from "../models/Directions";

const Rundown = () => {
  const [recipe, setRecipe] = useState<Step[]>([]);
  const id: string = useParams().id!;
  const navigate = useNavigate();
  useEffect(() => {
    getRecipeSteps(id).then((res) => {
      setRecipe(res[0].steps);
    });
  });

  return (
    <section className="Rundown">
      <h3>Full Recipe</h3>
      {recipe.map((item) => {
        return (
          <div>
            Step {item.number}: {item.step}
          </div>
        );
      })}
      <button onClick={() => navigate(`/${id}`)}>Back to Info Page</button>
    </section>
  );
};

export default Rundown;
