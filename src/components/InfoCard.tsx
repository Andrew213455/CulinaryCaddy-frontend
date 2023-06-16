import { useEffect, useState } from "react";
import "./InfoCard.css";
import NutritionFacts from "../models/NutritionFacts";
import { getNutritionById } from "../services/recipeApiService";
import { Link, useParams } from "react-router-dom";

const InfoCard = () => {
  const [nutritionInfo, setNutritionInfo] = useState<NutritionFacts>({
    nutrients: [],
  });

  const id: string = useParams().id!;

  useEffect(() => {
    getNutritionById(id).then((res) => {
      setNutritionInfo(res);
    });
  }, []);

  return (
    <section className="InfoCard">
      <div className="nutrition-div">
        <h2>Nutrition Facts</h2>
      </div>
      <Link to={`/steps/${id}`}>
        <div className="step-by-step">
          <h2>Get your recipe step-by-step</h2>
        </div>
      </Link>

      <div className="items-needed">
        <h2>What you'll need</h2>
      </div>
      <div className="price-div">
        <h2>Price Breakdown</h2>
      </div>
    </section>
  );
};

export default InfoCard;
