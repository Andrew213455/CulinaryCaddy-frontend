import { useEffect, useState } from "react";
import "./InfoCard.css";
import NutritionFacts, { NutrientObjects } from "../models/NutritionFacts";
import {
  getIngredientsById,
  getNutritionById,
} from "../services/recipeApiService";
import { Link, useParams } from "react-router-dom";
import Ingredient from "../models/Ingredient";

const InfoCard = () => {
  const [nutritionInfo, setNutritionInfo] = useState<NutritionFacts>({
    nutrients: [],
  });
  const [ingredients, setingredients] = useState<Ingredient>({
    name: "",
    amount: {
      measurment: {
        value: 0,
        unit: "",
      },
    },
  });

  const id: string = useParams().id!;

  useEffect(() => {
    getNutritionById(id).then((res) => {
      setNutritionInfo(res);
    });
    getIngredientsById(id).then((res) => {
      setingredients(res);
    });
  }, []);

  console.log(ingredients);

  const nutritionArray: NutrientObjects[] = nutritionInfo.nutrients.filter(
    (nutrient) => {
      if (
        nutrient.name === "Calories" ||
        nutrient.name === "Fat" ||
        nutrient.name === "Cholesterol" ||
        nutrient.name === "Sodium" ||
        nutrient.name === "Protein" ||
        nutrient.name === "Sugar" ||
        nutrient.name === "Net Carbohydrates" ||
        nutrient.name === "Vitamin D" ||
        nutrient.name === "Iron" ||
        nutrient.name === "Potassium" ||
        nutrient.name === "Calcium"
      ) {
        return nutrient;
      }
    }
  );

  return (
    <section className="InfoCard">
      <div className="nutrition-div">
        <h2>Nutrition Facts</h2>
        <p>
          Calories: {nutritionArray[0]?.amount || 0}
          {nutritionArray[0]?.unit || ""}
        </p>
        <p>
          Fat: {nutritionArray[1]?.amount || 0}
          {nutritionArray[1]?.unit || ""}
        </p>
        <p>
          Cholestorol: {nutritionArray[2]?.amount || 0}
          {nutritionArray[2]?.unit || ""}
        </p>
        <p>
          Sodium: {nutritionArray[3]?.amount || 0}
          {nutritionArray[3]?.unit || ""}
        </p>
        <p>
          Protein: {nutritionArray[4]?.amount || 0}
          {nutritionArray[4]?.unit || ""}
        </p>
        <p>
          Sugar: {nutritionArray[5]?.amount || 0}
          {nutritionArray[5]?.unit || ""}
        </p>
        <p>
          Net Carbohydrates: {nutritionArray[6]?.amount || 0}
          {nutritionArray[6]?.unit || ""}
        </p>
        <p>
          Vitamin D: {nutritionArray[7]?.amount || 0}
          {nutritionArray[7]?.unit || ""}
        </p>
        <p>
          Iron: {nutritionArray[8]?.amount || 0}
          {nutritionArray[8]?.unit || ""}
        </p>
        <p>
          Potassium: {nutritionArray[9]?.amount || 0}
          {nutritionArray[9]?.unit || ""}
        </p>
        <p>
          Calcium: {nutritionArray[10]?.amount || 0}
          {nutritionArray[10]?.unit || ""}
        </p>
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
