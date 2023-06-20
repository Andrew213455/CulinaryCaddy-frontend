import { useEffect, useState } from "react";
import "./InfoCard.css";
import NutritionFacts, { NutrientObjects } from "../models/NutritionFacts";
import {
  getIngredientsById,
  getNutritionById,
  getPriceById,
} from "../services/recipeApiService";
import { Link, useParams } from "react-router-dom";
import Ingredient from "../models/Ingredient";
import Price from "../models/Price";
const InfoCard = () => {
  const [nutritionInfo, setNutritionInfo] = useState<NutritionFacts>({
    nutrients: [],
  });
  const [priceInfo, setPriceInfo] = useState<Price>({
    ingredients: [],
    totalCost: 0,
    totalCostPerServing: 0,
  });
  const [ingredients, setingredients] = useState<Ingredient>({
    name: "",
    amount: {
      us: {
        value: 0,
        unit: "",
      },
    },
  });

  console.log(ingredients);
  const id: string = useParams().id!;
  useEffect(() => {
    getNutritionById(id).then((res) => {
      setNutritionInfo(res);
    });
    getPriceById(id).then((res) => {
      setPriceInfo(res);
    });
    getIngredientsById(id).then((res) => {
      setingredients(res);
    });
  }, []);
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
        <div className="nutrition">
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
      </div>
      <Link className="step-by-step" to={`/steps/${id}`}>
        <div>
          <h2>Get your recipe step-by-step</h2>
        </div>
      </Link>
      <div className="items-needed">
        <h2>What you'll need</h2>
        <div className="ingredients"></div>
      </div>
      <div className="price-div">
        <h2>Price Breakdown</h2>
        <ul>
          {priceInfo.ingredients.map((items) => {
            return `Measurement: ${items.amount.us.value} ${
              items.amount.us.unit
            } Ingredient: ${items.name} Cost: $${(items.price / 100).toFixed(
              2
            )}`;
          })}
        </ul>
        <p></p>
        <p>Total Cost: ${(priceInfo.totalCost / 100).toFixed(2)}</p>
        <p>
          Total Cost Per Serving: $
          {(priceInfo.totalCostPerServing / 100).toFixed(2)}
        </p>
      </div>
    </section>
  );
};
export default InfoCard;
