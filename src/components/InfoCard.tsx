import { useEffect, useState } from "react";
import "./InfoCard.css";
import NutritionFacts from "../models/NutritionFacts";
import { getNutritionById } from "../services/recipeApiService";
import { useParams } from "react-router-dom";

const InfoCard = () => {
  const [nutritionInfo, setNutritionInfo] = useState<NutritionFacts>({
    nutrients: [],
  });

  const id: string = useParams().id!;
  console.log(nutritionInfo.nutrients);

  useEffect(() => {
    getNutritionById(id).then((res) => {
      setNutritionInfo(res);
    });
  }, []);

  return (
    <section className="InfoCard">
      <div className="nutrition-div">
        <h2>Nutrition Facts</h2>
        {/* <p>{nutritionInfo.nutrients.}</p> */}
      </div>
      <div className="setp-by-step">
        <h2>Get your recipe step-by-step</h2>
      </div>
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
